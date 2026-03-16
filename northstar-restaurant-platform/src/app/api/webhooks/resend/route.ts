/**
 * Resend Webhook Handler
 *
 * Handles email delivery events AND inbound reply detection from Resend:
 *
 * Delivery events:
 * - email.delivered: log delivery
 * - email.opened: log open with timestamp
 * - email.clicked: log click with timestamp
 * - email.bounced: mark lead as bounced, stop all outreach, flag postcard-only
 * - email.complained: same as bounce (spam complaint)
 *
 * Inbound reply handling:
 * - Parses sender email, subject, body from inbound webhook
 * - Matches sender to a CRM lead
 * - Classifies intent via keyword matching (interested, pricing, changes, not interested, wants call)
 * - Logs the reply as an outreach event
 * - Moves lead stage if appropriate (interested → proposal, not_interested → DNC)
 * - Sends notification email to Craig & John with suggested response
 * - Logs activity
 *
 * Verifies HMAC-SHA256 signature using RESEND_WEBHOOK_SECRET.
 */

import { NextRequest, NextResponse } from "next/server";
import {
  searchLeads,
  updateLead,
  addOutreachEvent,
  getAllLeads,
} from "@/lib/crm/lead-store";
import { addToDnc } from "@/lib/outreach/dnc-store";
import {
  replyYesIWantIt,
  replyHowMuch,
  replyCanISeeChanges,
  replyNeedToThink,
  replyCanITalkToSomeone,
  replyNotInterested,
} from "@/lib/outreach/response-templates";
import { logActivity } from "@/lib/activity/activity-store";
import { logEmailEvent } from "@/lib/outreach/email-event-store";
import { getEnrollmentsForLead } from "@/lib/outreach/sequence-store";
import { getSupabase, isDbEnabled } from "@/lib/db/supabase";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Standard Resend delivery/engagement webhook event */
interface ResendWebhookEvent {
  type: string;
  created_at: string;
  data: {
    email_id: string;
    from: string;
    to: string[];
    subject?: string;
    created_at: string;
    // bounce-specific
    bounce?: {
      message: string;
      type: string;
    };
  };
}

/** Resend inbound email webhook payload */
interface ResendInboundEvent {
  type: "email.received";
  created_at: string;
  data: {
    email_id: string;
    from: string;
    to: string[];
    subject: string;
    text?: string;
    html?: string;
    headers?: Record<string, string>;
  };
}

type ReplyIntent =
  | "interested"
  | "pricing_question"
  | "wants_changes"
  | "not_interested"
  | "wants_call"
  | "other";

// ---------------------------------------------------------------------------
// Signature verification
// ---------------------------------------------------------------------------

/**
 * Verify Resend webhook signature (HMAC-SHA256)
 */
async function verifySignature(
  payload: string,
  signature: string | null,
  secret: string
): Promise<boolean> {
  if (!signature) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBytes = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const computedSignature = Array.from(new Uint8Array(signatureBytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return computedSignature === signature;
}

// ---------------------------------------------------------------------------
// Lead lookup helpers
// ---------------------------------------------------------------------------

/**
 * Find lead by recipient email address (for delivery events)
 */
async function findLeadByEmail(email: string) {
  const allLeads = await getAllLeads();
  return allLeads.find((lead) => lead.email?.toLowerCase() === email.toLowerCase());
}

/**
 * Find lead by sender email (for inbound replies)
 * Uses searchLeads first for DB-optimized lookup, then falls back to full scan.
 */
async function findLeadBySenderEmail(senderEmail: string) {
  const normalized = senderEmail.toLowerCase();

  // Try searchLeads first (uses DB ilike query when available)
  const searchResults = await searchLeads(normalized);
  const match = searchResults.find(
    (lead) => lead.email?.toLowerCase() === normalized
  );
  if (match) return match;

  // Fallback: scan all leads (covers edge cases where email stored differently)
  const allLeads = await getAllLeads();
  return allLeads.find((lead) => lead.email?.toLowerCase() === normalized);
}

// ---------------------------------------------------------------------------
// Sequence management
// ---------------------------------------------------------------------------

/**
 * Stop all outreach sequences for a lead
 */
async function stopAllSequences(leadId: string): Promise<void> {
  if (isDbEnabled()) {
    const sb = getSupabase();
    if (sb) {
      await sb
        .from("enrollments")
        .update({ status: "unsubscribed", next_step_at: null })
        .eq("lead_id", leadId)
        .eq("status", "active");
      return;
    }
  }

  // In-memory fallback: get enrollments and pause them
  const enrollments = await getEnrollmentsForLead(leadId);
  for (const enrollment of enrollments) {
    if (enrollment.status === "active") {
      if (isDbEnabled()) {
        const sb = getSupabase();
        if (sb) {
          await sb
            .from("enrollments")
            .update({ status: "unsubscribed", next_step_at: null })
            .eq("id", enrollment.id);
        }
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Intent classifier (keyword-based, no AI)
// ---------------------------------------------------------------------------

/**
 * Classify the intent of a prospect's reply using keyword matching.
 * Checks subject + body combined. First match wins (ordered by specificity).
 */
function classifyReplyIntent(subject: string, body: string): ReplyIntent {
  const text = `${subject} ${body}`.toLowerCase();

  // Check "not_interested" first (more specific phrases that include "not")
  const notInterestedPatterns = [
    "not interested",
    "no thanks",
    "no thank you",
    "remove me",
    "remove us",
    "stop emailing",
    "stop contacting",
    "unsubscribe",
    "take me off",
    "don't contact",
    "do not contact",
    "leave me alone",
    "not for us",
    "we're not",
    "we are not",
  ];
  if (notInterestedPatterns.some((p) => text.includes(p))) {
    return "not_interested";
  }

  // Check "interested" (positive intent)
  const interestedPatterns = [
    "interested",
    "sign up",
    "sign me up",
    "let's do it",
    "lets do it",
    "let's go",
    "lets go",
    "i want",
    "we want",
    "yes",
    "sounds great",
    "sounds good",
    "love it",
    "looks great",
    "looks good",
    "how do i start",
    "how do we start",
    "get started",
    "ready to",
    "count me in",
    "i'm in",
    "im in",
    "we're in",
  ];
  if (interestedPatterns.some((p) => text.includes(p))) {
    return "interested";
  }

  // Check "pricing_question"
  const pricingPatterns = [
    "how much",
    "pricing",
    "cost",
    "price",
    "plans",
    "subscription",
    "monthly",
    "per month",
    "what does it cost",
    "rates",
    "fee",
    "budget",
    "affordable",
  ];
  if (pricingPatterns.some((p) => text.includes(p))) {
    return "pricing_question";
  }

  // Check "wants_changes"
  const changesPatterns = [
    "change",
    "update",
    "different",
    "modify",
    "tweak",
    "adjust",
    "edit",
    "fix",
    "wrong",
    "incorrect",
    "not right",
    "can you make",
    "could you change",
    "i'd like to see",
    "can we change",
  ];
  if (changesPatterns.some((p) => text.includes(p))) {
    return "wants_changes";
  }

  // Check "wants_call"
  const callPatterns = [
    "call me",
    "call us",
    "give me a call",
    "talk to someone",
    "talk to you",
    "phone",
    "speak with",
    "speak to",
    "meet",
    "meeting",
    "schedule a call",
    "set up a call",
    "can we talk",
    "let's talk",
    "lets talk",
    "chat about",
    "discuss",
  ];
  if (callPatterns.some((p) => text.includes(p))) {
    return "wants_call";
  }

  return "other";
}

// ---------------------------------------------------------------------------
// Suggested response generator
// ---------------------------------------------------------------------------

/**
 * Get a suggested response template based on the classified intent.
 */
function getSuggestedResponse(
  intent: ReplyIntent,
  restaurantName: string,
  previewUrl?: string
): string {
  switch (intent) {
    case "interested": {
      const template = replyYesIWantIt({
        restaurantName,
        previewUrl,
      });
      return `SUBJECT: ${template.subject}\n\n${template.body}`;
    }
    case "pricing_question":
      return replyHowMuch();
    case "wants_changes":
      return replyCanISeeChanges();
    case "wants_call":
      return replyCanITalkToSomeone();
    case "not_interested": {
      const ni = replyNotInterested();
      return ni.body;
    }
    case "other":
      return replyNeedToThink();
    default:
      return replyNeedToThink();
  }
}

// ---------------------------------------------------------------------------
// Notification email
// ---------------------------------------------------------------------------

/**
 * Send a notification email to Craig and John about a prospect reply.
 */
async function sendReplyNotification(params: {
  restaurantName: string;
  senderEmail: string;
  subject: string;
  bodyPreview: string;
  intent: ReplyIntent;
  suggestedResponse: string;
  leadId: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[Webhook/Reply] RESEND_API_KEY not set, skipping notification email");
    return;
  }

  const recipientEmail =
    process.env.PIPELINE_REPORT_EMAIL || "chead@me.com";

  const dashboardLink = `https://northstar-restaurant-platform.vercel.app/admin/pipeline`;

  const intentLabel: Record<ReplyIntent, string> = {
    interested: "INTERESTED (wants to sign up)",
    pricing_question: "PRICING QUESTION",
    wants_changes: "WANTS CHANGES to preview",
    not_interested: "NOT INTERESTED (added to DNC)",
    wants_call: "WANTS A CALL",
    other: "OTHER (needs manual review)",
  };

  const urgencyNote =
    params.intent === "interested"
      ? "\n*** HIGH PRIORITY: This prospect wants to sign up. Respond ASAP. ***\n"
      : params.intent === "not_interested"
        ? "\n(Auto-handled: added to DNC, sequences stopped)\n"
        : "";

  const textBody = [
    "=".repeat(50),
    "  PROSPECT REPLIED TO OUTREACH EMAIL",
    "=".repeat(50),
    "",
    `Restaurant:  ${params.restaurantName}`,
    `From:        ${params.senderEmail}`,
    `Subject:     ${params.subject}`,
    `Intent:      ${intentLabel[params.intent]}`,
    urgencyNote,
    "THEIR REPLY:",
    "-".repeat(40),
    params.bodyPreview,
    "-".repeat(40),
    "",
    "SUGGESTED RESPONSE:",
    "-".repeat(40),
    params.suggestedResponse,
    "-".repeat(40),
    "",
    `View in dashboard: ${dashboardLink}`,
    "",
    "=".repeat(50),
    "  NorthStar Synergy -- Reply Webhook",
    "=".repeat(50),
  ].join("\n");

  const priorityTag =
    params.intent === "interested" ? "[HOT LEAD] " : "";

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "NorthStar Pipeline <pipeline@northstarsynergy.com>",
        to: [recipientEmail],
        subject: `${priorityTag}Reply from ${params.restaurantName}: ${intentLabel[params.intent]}`,
        text: textBody,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.warn(`[Webhook/Reply] Notification email failed: ${response.status} ${err}`);
    }
  } catch (err) {
    console.warn(
      "[Webhook/Reply] Notification email error:",
      err instanceof Error ? err.message : String(err)
    );
  }
}

// ---------------------------------------------------------------------------
// Inbound reply handler
// ---------------------------------------------------------------------------

/**
 * Handle an inbound email reply from a prospect.
 */
async function handleInboundReply(event: ResendInboundEvent): Promise<void> {
  const senderEmail = event.data.from;
  const subject = event.data.subject || "(no subject)";
  const bodyText = event.data.text || "";
  const bodyPreview = bodyText.slice(0, 500);

  console.warn(
    `[Webhook/Reply] Inbound reply from ${senderEmail}, subject: "${subject}"`
  );

  // 1. Find the lead by sender email
  const lead = await findLeadBySenderEmail(senderEmail);
  if (!lead) {
    console.warn(
      `[Webhook/Reply] No lead found for sender ${senderEmail} -- logging and acknowledging`
    );

    // Still log the activity for visibility
    await logActivity({
      type: "outreach",
      action: "reply_unmatched",
      description: `Inbound reply from unknown sender: ${senderEmail} — "${subject}"`,
      metadata: {
        senderEmail,
        subject,
        bodyPreview: bodyPreview.slice(0, 200),
      },
    });

    return;
  }

  console.warn(
    `[Webhook/Reply] Matched reply to lead: ${lead.restaurantName} (${lead.id})`
  );

  // 2. Classify the intent
  const intent = classifyReplyIntent(subject, bodyText);
  console.warn(`[Webhook/Reply] Classified intent: ${intent}`);

  // 3. Log the reply as an outreach event
  const now = new Date().toISOString();
  try {
    await addOutreachEvent(lead.id, {
      type: "email",
      subject: `Reply: ${subject}`,
      status: "replied",
      sentAt: now,
      repliedAt: now,
      metadata: {
        intent,
        senderEmail,
        bodyPreview: bodyPreview.slice(0, 200),
      },
    });
  } catch (err) {
    console.warn(
      "[Webhook/Reply] Failed to log outreach event:",
      err instanceof Error ? err.message : String(err)
    );
  }

  // 4. Move lead stage if appropriate
  try {
    if (intent === "interested") {
      await updateLead(lead.id, {
        stage: "proposal",
        tags: [
          ...lead.tags.filter((t) => t !== "replied"),
          "replied",
          "hot-lead",
        ],
      });
      console.warn(
        `[Webhook/Reply] Moved ${lead.restaurantName} to "proposal" stage`
      );
    } else if (intent === "not_interested") {
      // Add to DNC list
      if (lead.email) {
        await addToDnc({
          email: lead.email,
          reason: "prospect_not_interested",
        });
      }

      // Stop all sequences
      await stopAllSequences(lead.id);

      // Clear follow-ups and mark as churned
      await updateLead(lead.id, {
        stage: "churned",
        nextFollowUpAt: undefined,
        tags: [
          ...lead.tags.filter(
            (t) => t !== "replied" && t !== "dnc"
          ),
          "replied",
          "dnc",
        ],
      });
      console.warn(
        `[Webhook/Reply] ${lead.restaurantName} not interested -- added to DNC, cleared follow-ups`
      );
    } else {
      // Other intents: tag as replied but keep current stage
      await updateLead(lead.id, {
        tags: [...lead.tags.filter((t) => t !== "replied"), "replied"],
      });
    }
  } catch (err) {
    console.warn(
      "[Webhook/Reply] Failed to update lead stage:",
      err instanceof Error ? err.message : String(err)
    );
  }

  // 5. Log activity
  await logActivity({
    type: "outreach",
    action: "reply_received",
    description: `${lead.restaurantName} replied to outreach email — intent: ${intent}`,
    entityId: lead.id,
    entityName: lead.restaurantName,
    metadata: {
      intent,
      senderEmail,
      subject,
      bodyPreview: bodyPreview.slice(0, 200),
    },
  });

  // 6. Send notification email to Craig & John
  const suggestedResponse = getSuggestedResponse(
    intent,
    lead.restaurantName,
    lead.previewUrl
  );

  try {
    await sendReplyNotification({
      restaurantName: lead.restaurantName,
      senderEmail,
      subject,
      bodyPreview,
      intent,
      suggestedResponse,
      leadId: lead.id,
    });
  } catch (err) {
    console.warn(
      "[Webhook/Reply] Failed to send notification:",
      err instanceof Error ? err.message : String(err)
    );
  }
}

// ---------------------------------------------------------------------------
// Main webhook handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;

  // Read raw body for signature verification
  const rawBody = await request.text();

  // Verify signature if secret is configured
  if (webhookSecret) {
    const signature =
      request.headers.get("resend-signature") ||
      request.headers.get("svix-signature");
    const isValid = await verifySignature(rawBody, signature, webhookSecret);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      );
    }
  }

  let event: ResendWebhookEvent | ResendInboundEvent;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // ---------------------------------------------------------------------------
  // Handle inbound reply (email.received)
  // ---------------------------------------------------------------------------
  if (event.type === "email.received") {
    try {
      await handleInboundReply(event as ResendInboundEvent);
    } catch (err) {
      console.warn(
        "[Webhook/Reply] Unhandled error in reply handler:",
        err instanceof Error ? err.message : String(err)
      );
    }
    // Always return 200 for webhooks
    return NextResponse.json({ ok: true, event: event.type });
  }

  // ---------------------------------------------------------------------------
  // Handle delivery/engagement events (existing behavior)
  // ---------------------------------------------------------------------------
  const deliveryEvent = event as ResendWebhookEvent;
  const recipientEmail = deliveryEvent.data?.to?.[0];
  if (!recipientEmail) {
    return NextResponse.json({ ok: true, message: "No recipient found" });
  }

  const lead = await findLeadByEmail(recipientEmail);
  if (!lead) {
    // Not a tracked lead, acknowledge anyway
    return NextResponse.json({ ok: true, message: "Lead not found" });
  }

  const now = new Date().toISOString();

  switch (deliveryEvent.type) {
    case "email.delivered": {
      logActivity({
        type: "outreach",
        action: "email_delivered",
        description: `Email delivered to ${lead.restaurantName} (${recipientEmail})`,
        entityId: lead.id,
        entityName: lead.restaurantName,
        metadata: { emailId: deliveryEvent.data.email_id },
      });
      break;
    }

    case "email.opened": {
      const openEnrollments = await getEnrollmentsForLead(lead.id);
      const openSeqId = openEnrollments.find(
        (e) => e.status === "active"
      )?.sequenceId;

      logEmailEvent(lead.id, openSeqId, "opened", {
        emailId: deliveryEvent.data.email_id,
        timestamp: now,
      });

      logActivity({
        type: "outreach",
        action: "email_opened",
        description: `${lead.restaurantName} opened email`,
        entityId: lead.id,
        entityName: lead.restaurantName,
        metadata: { emailId: deliveryEvent.data.email_id, openedAt: now },
      });
      break;
    }

    case "email.clicked": {
      const clickEnrollments = await getEnrollmentsForLead(lead.id);
      const clickSeqId = clickEnrollments.find(
        (e) => e.status === "active"
      )?.sequenceId;

      logEmailEvent(lead.id, clickSeqId, "clicked", {
        emailId: deliveryEvent.data.email_id,
        timestamp: now,
      });

      logActivity({
        type: "outreach",
        action: "email_clicked",
        description: `${lead.restaurantName} clicked a link in email`,
        entityId: lead.id,
        entityName: lead.restaurantName,
        metadata: {
          emailId: deliveryEvent.data.email_id,
          clickedAt: now,
        },
      });
      break;
    }

    case "email.bounced": {
      // Mark lead as bounced
      await updateLead(lead.id, {
        stage: "churned",
        tags: [
          ...lead.tags.filter(
            (t) => t !== "bounced" && t !== "postcard-only"
          ),
          "bounced",
          "postcard-only",
        ],
      });

      // Stop all outreach sequences
      await stopAllSequences(lead.id);

      logActivity({
        type: "outreach",
        action: "email_bounced",
        description: `Email bounced for ${lead.restaurantName} (${recipientEmail}) — all sequences stopped, marked postcard-only`,
        entityId: lead.id,
        entityName: lead.restaurantName,
        metadata: {
          emailId: deliveryEvent.data.email_id,
          bounceType: deliveryEvent.data.bounce?.type || "unknown",
          bounceMessage: deliveryEvent.data.bounce?.message || "",
        },
      });
      break;
    }

    case "email.complained": {
      // Spam complaint — treat same as bounce
      await updateLead(lead.id, {
        stage: "churned",
        tags: [
          ...lead.tags.filter(
            (t) => t !== "complained" && t !== "postcard-only"
          ),
          "complained",
          "postcard-only",
        ],
      });

      await stopAllSequences(lead.id);

      logActivity({
        type: "outreach",
        action: "email_complained",
        description: `Spam complaint from ${lead.restaurantName} (${recipientEmail}) — all outreach stopped`,
        entityId: lead.id,
        entityName: lead.restaurantName,
        metadata: { emailId: deliveryEvent.data.email_id },
      });
      break;
    }

    default: {
      // Unknown event type, acknowledge
      logActivity({
        type: "system",
        action: "webhook_unknown",
        description: `Unknown Resend webhook event: ${deliveryEvent.type}`,
        metadata: { eventType: deliveryEvent.type },
      });
    }
  }

  return NextResponse.json({ ok: true, event: deliveryEvent.type });
}
