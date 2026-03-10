/**
 * Resend Webhook Handler
 *
 * Handles email delivery events from Resend:
 * - email.delivered: log delivery
 * - email.opened: log open with timestamp
 * - email.clicked: log click with timestamp
 * - email.bounced: mark lead as bounced, stop all outreach, flag postcard-only
 * - email.complained: same as bounce (spam complaint)
 *
 * Verifies HMAC-SHA256 signature using RESEND_WEBHOOK_SECRET.
 */

import { NextRequest, NextResponse } from "next/server";
import { updateLead, getAllLeads } from "@/lib/crm/lead-store";
import { logActivity } from "@/lib/activity/activity-store";
import { logEmailEvent } from "@/lib/outreach/email-event-store";
import { getEnrollmentsForLead } from "@/lib/outreach/sequence-store";
import { getSupabase, isDbEnabled } from "@/lib/db/supabase";

// Resend webhook event types
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

/**
 * Find lead by recipient email address
 */
async function findLeadByEmail(email: string) {
  const allLeads = await getAllLeads();
  return allLeads.find((lead) => lead.email?.toLowerCase() === email.toLowerCase());
}

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

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;

  // Read raw body for signature verification
  const rawBody = await request.text();

  // Verify signature if secret is configured
  if (webhookSecret) {
    const signature = request.headers.get("resend-signature") || request.headers.get("svix-signature");
    const isValid = await verifySignature(rawBody, signature, webhookSecret);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  let event: ResendWebhookEvent;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const recipientEmail = event.data?.to?.[0];
  if (!recipientEmail) {
    return NextResponse.json({ ok: true, message: "No recipient found" });
  }

  const lead = await findLeadByEmail(recipientEmail);
  if (!lead) {
    // Not a tracked lead, acknowledge anyway
    return NextResponse.json({ ok: true, message: "Lead not found" });
  }

  const now = new Date().toISOString();

  switch (event.type) {
    case "email.delivered": {
      logActivity({
        type: "outreach",
        action: "email_delivered",
        description: `Email delivered to ${lead.restaurantName} (${recipientEmail})`,
        entityId: lead.id,
        entityName: lead.restaurantName,
        metadata: { emailId: event.data.email_id },
      });
      break;
    }

    case "email.opened": {
      const openEnrollments = await getEnrollmentsForLead(lead.id);
      const openSeqId = openEnrollments.find((e) => e.status === "active")?.sequenceId;

      logEmailEvent(lead.id, openSeqId, "opened", {
        emailId: event.data.email_id,
        timestamp: now,
      });

      logActivity({
        type: "outreach",
        action: "email_opened",
        description: `${lead.restaurantName} opened email`,
        entityId: lead.id,
        entityName: lead.restaurantName,
        metadata: { emailId: event.data.email_id, openedAt: now },
      });
      break;
    }

    case "email.clicked": {
      const clickEnrollments = await getEnrollmentsForLead(lead.id);
      const clickSeqId = clickEnrollments.find((e) => e.status === "active")?.sequenceId;

      logEmailEvent(lead.id, clickSeqId, "clicked", {
        emailId: event.data.email_id,
        timestamp: now,
      });

      logActivity({
        type: "outreach",
        action: "email_clicked",
        description: `${lead.restaurantName} clicked a link in email`,
        entityId: lead.id,
        entityName: lead.restaurantName,
        metadata: { emailId: event.data.email_id, clickedAt: now },
      });
      break;
    }

    case "email.bounced": {
      // Mark lead as bounced
      await updateLead(lead.id, {
        stage: "churned",
        tags: [...lead.tags.filter((t) => t !== "bounced" && t !== "postcard-only"), "bounced", "postcard-only"],
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
          emailId: event.data.email_id,
          bounceType: event.data.bounce?.type || "unknown",
          bounceMessage: event.data.bounce?.message || "",
        },
      });
      break;
    }

    case "email.complained": {
      // Spam complaint — treat same as bounce
      await updateLead(lead.id, {
        stage: "churned",
        tags: [...lead.tags.filter((t) => t !== "complained" && t !== "postcard-only"), "complained", "postcard-only"],
      });

      await stopAllSequences(lead.id);

      logActivity({
        type: "outreach",
        action: "email_complained",
        description: `Spam complaint from ${lead.restaurantName} (${recipientEmail}) — all outreach stopped`,
        entityId: lead.id,
        entityName: lead.restaurantName,
        metadata: { emailId: event.data.email_id },
      });
      break;
    }

    default: {
      // Unknown event type, acknowledge
      logActivity({
        type: "system",
        action: "webhook_unknown",
        description: `Unknown Resend webhook event: ${event.type}`,
        metadata: { eventType: event.type },
      });
    }
  }

  return NextResponse.json({ ok: true, event: event.type });
}
