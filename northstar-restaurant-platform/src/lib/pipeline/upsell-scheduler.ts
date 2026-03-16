/**
 * Upsell Scheduler
 *
 * Checks for clients who are ready to be upsold based on how long
 * they've been in an active/onboarding_complete stage. Generates
 * opportunities at 30, 60, and 90 day milestones and can send a
 * summary notification via Resend.
 *
 * Called during the daily pipeline to surface upsell opportunities
 * for Craig and John to act on.
 */

import { getAllLeads } from "@/lib/crm/lead-store";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface UpsellOpportunity {
  leadId: string;
  restaurantName: string;
  currentStage: string;
  daysSinceOnboarding: number;
  trigger: "day_30_checkin" | "day_60_upsell" | "day_90_review";
  suggestedAction: string;
}

// ---------------------------------------------------------------------------
// Trigger windows and suggested actions
// ---------------------------------------------------------------------------

interface TriggerConfig {
  trigger: UpsellOpportunity["trigger"];
  minDays: number;
  maxDays: number;
  suggestedAction: string;
}

const TRIGGER_CONFIGS: TriggerConfig[] = [
  {
    trigger: "day_30_checkin",
    minDays: 25,
    maxDays: 35,
    suggestedAction:
      "Call to check satisfaction. Ask about online ordering needs.",
  },
  {
    trigger: "day_60_upsell",
    minDays: 55,
    maxDays: 65,
    suggestedAction:
      "Pitch Growth plan ($149/mo) with online ordering. They've been live 60 days.",
  },
  {
    trigger: "day_90_review",
    minDays: 85,
    maxDays: 95,
    suggestedAction:
      "Review their site analytics. Pitch Pro plan ($249/mo) with marketing.",
  },
];

/** Stages eligible for upsell checks */
const UPSELL_STAGES = ["onboarding_complete", "active"];

// ---------------------------------------------------------------------------
// Core logic
// ---------------------------------------------------------------------------

/**
 * Scan all leads and return those that fall within an upsell trigger window.
 *
 * Uses `updatedAt` as the proxy for when the lead moved into their current
 * stage, since stage transitions always update this timestamp.
 */
export async function checkUpsellOpportunities(): Promise<UpsellOpportunity[]> {
  const opportunities: UpsellOpportunity[] = [];

  let allLeads;
  try {
    allLeads = await getAllLeads();
  } catch (err) {
    console.warn(
      "[UpsellScheduler] Failed to fetch leads:",
      err instanceof Error ? err.message : String(err)
    );
    return [];
  }

  const now = Date.now();
  const MS_PER_DAY = 24 * 60 * 60 * 1000;

  for (const lead of allLeads) {
    // Only check leads in eligible stages
    if (!UPSELL_STAGES.includes(lead.stage)) {
      continue;
    }

    // Calculate days since they moved to this stage
    const updatedAtMs = new Date(lead.updatedAt).getTime();
    if (Number.isNaN(updatedAtMs)) {
      console.warn(
        `[UpsellScheduler] Invalid updatedAt for lead ${lead.id} (${lead.restaurantName}) -- skipping`
      );
      continue;
    }

    const daysSinceUpdate = Math.floor((now - updatedAtMs) / MS_PER_DAY);

    // Check each trigger window
    for (const config of TRIGGER_CONFIGS) {
      if (daysSinceUpdate >= config.minDays && daysSinceUpdate <= config.maxDays) {
        opportunities.push({
          leadId: lead.id,
          restaurantName: lead.restaurantName,
          currentStage: lead.stage,
          daysSinceOnboarding: daysSinceUpdate,
          trigger: config.trigger,
          suggestedAction: config.suggestedAction,
        });
        // Only one trigger per lead (take the first matching window)
        break;
      }
    }
  }

  if (opportunities.length > 0) {
    console.warn(
      `[UpsellScheduler] Found ${opportunities.length} upsell opportunities`
    );
  }

  return opportunities;
}

// ---------------------------------------------------------------------------
// Notification
// ---------------------------------------------------------------------------

/**
 * Send a summary email listing all upsell opportunities for the week.
 * Uses Resend via RESEND_API_KEY. If no opportunities exist, does nothing.
 */
export async function sendUpsellNotification(
  opportunities: UpsellOpportunity[]
): Promise<void> {
  if (opportunities.length === 0) {
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[UpsellScheduler] RESEND_API_KEY not set, skipping notification email"
    );
    return;
  }

  const recipientEmail =
    process.env.PIPELINE_REPORT_EMAIL || "chead@me.com";

  const subject = `NorthStar: ${opportunities.length} upsell opportunit${opportunities.length === 1 ? "y" : "ies"} this week`;

  const triggerLabels: Record<UpsellOpportunity["trigger"], string> = {
    day_30_checkin: "30-Day Check-In",
    day_60_upsell: "60-Day Upsell",
    day_90_review: "90-Day Review",
  };

  const lines: string[] = [];
  lines.push("=".repeat(50));
  lines.push("  NORTHSTAR UPSELL OPPORTUNITIES");
  lines.push("=".repeat(50));
  lines.push("");

  for (let i = 0; i < opportunities.length; i++) {
    const opp = opportunities[i];
    lines.push(`${i + 1}. ${opp.restaurantName}`);
    lines.push(`   Stage:    ${opp.currentStage}`);
    lines.push(`   Days:     ${opp.daysSinceOnboarding} days active`);
    lines.push(`   Trigger:  ${triggerLabels[opp.trigger]}`);
    lines.push(`   Action:   ${opp.suggestedAction}`);
    lines.push("");
  }

  lines.push("=".repeat(50));
  lines.push(
    "  Dashboard: https://northstar-restaurant-platform.vercel.app/admin/pipeline"
  );
  lines.push("=".repeat(50));

  const textBody = lines.join("\n");

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
        subject,
        text: textBody,
      }),
    });

    if (response.ok) {
      console.warn(
        `[UpsellScheduler] Notification sent to ${recipientEmail} (${opportunities.length} opportunities)`
      );
    } else {
      const err = await response.text();
      console.warn(
        `[UpsellScheduler] Notification email failed: ${response.status} ${err}`
      );
    }
  } catch (err) {
    console.warn(
      "[UpsellScheduler] Notification email error:",
      err instanceof Error ? err.message : String(err)
    );
  }
}
