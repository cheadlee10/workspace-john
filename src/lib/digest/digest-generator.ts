/**
 * Weekly Digest Generator
 *
 * Pulls from all stores to create a comprehensive weekly business summary.
 */

import type { WeeklyDigest } from "@/types/business";
import { getPipelineStats } from "@/lib/crm/lead-store";
import { getPortfolioStats, getAllClients } from "@/lib/crm/client-store";
import { calculatePnL } from "@/lib/finance/pnl-store";
import { getTicketStats } from "@/lib/support/ticket-store";
import { getActivitiesForWeek } from "@/lib/activity/activity-store";

const digests = new Map<string, WeeklyDigest>();

function generateId(): string {
  return "dig-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

export async function generateWeeklyDigest(weekOf?: string): Promise<WeeklyDigest> {
  const now = new Date();
  const startOfWeek = weekOf ? new Date(weekOf) : getMonday(now);
  const weekStr = startOfWeek.toISOString().split("T")[0];

  // Check if already generated
  const existing = Array.from(digests.values()).find((d) => d.weekOf === weekStr);
  if (existing) return existing;

  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const [pipeline, portfolio, pnl, ticketStats, weekActivities] = await Promise.all([
    getPipelineStats(),
    getPortfolioStats(),
    calculatePnL(currentMonth),
    getTicketStats(),
    getActivitiesForWeek(weekStr),
  ]);

  // Count outreach emails this week
  const emailsSent = weekActivities.filter(
    (a) => a.type === "outreach" && (a.action === "email" || a.action === "sequences_processed")
  ).length;

  // Count responses
  const responses = weekActivities.filter(
    (a) => a.type === "outreach" && a.action === "replied"
  ).length;

  // Count meetings
  const meetings = weekActivities.filter(
    (a) => a.type === "lead" && a.action === "stage_changed" && a.metadata?.to === "demo"
  ).length;

  // Count closed
  const closedWon = weekActivities.filter(
    (a) => a.type === "lead" && a.action === "stage_changed" && a.metadata?.to === "close"
  ).length;

  // Health issues
  const allClients = await getAllClients();
  const healthIssues = allClients
    .filter((c) => c.hostingHealth !== "healthy")
    .map((c) => ({
      clientId: c.id,
      name: c.restaurantName,
      issue: c.hostingHealth === "down" ? "Website is down" : "Performance degraded",
    }));

  // Generate action items
  const actionItems: string[] = [];
  if (pipeline.byStage.prospect > 5) actionItems.push(`${pipeline.byStage.prospect} prospects need outreach`);
  if (portfolio.pastDue > 0) actionItems.push(`${portfolio.pastDue} clients have past-due payments`);
  if (ticketStats.open > 3) actionItems.push(`${ticketStats.open} open support tickets need attention`);
  if (healthIssues.length > 0) actionItems.push(`${healthIssues.length} client sites have health issues`);

  // Generate highlights
  const highlights: string[] = [];
  if (closedWon > 0) highlights.push(`Closed ${closedWon} new client${closedWon > 1 ? "s" : ""} this week`);
  if (pnl.mrr > 0) highlights.push(`MRR: $${pnl.mrr.toFixed(0)}`);
  if (portfolio.active > 0) highlights.push(`${portfolio.active} active clients`);

  // Generate concerns
  const concerns: string[] = [];
  if (pnl.margin < 50 && pnl.totalRevenue > 0) concerns.push(`Profit margin is ${pnl.margin.toFixed(0)}% — target is 50%+`);
  if (portfolio.pastDue > 0) concerns.push(`${portfolio.pastDue} past-due accounts risk churn`);
  if (ticketStats.byPriority.urgent > 0) concerns.push(`${ticketStats.byPriority.urgent} urgent ticket${ticketStats.byPriority.urgent > 1 ? "s" : ""} unresolved`);

  const digest: WeeklyDigest = {
    id: generateId(),
    weekOf: weekStr,
    generatedAt: now.toISOString(),
    sections: {
      revenue: {
        thisWeek: pnl.totalRevenue,
        lastWeek: 0, // Would need previous week's data
        changePercent: 0,
        mrr: pnl.mrr,
      },
      pipeline: {
        newLeads: weekActivities.filter((a) => a.type === "lead" && a.action === "created").length,
        emailsSent,
        responses,
        meetings,
        closedWon,
        closedLost: 0,
      },
      clients: {
        total: portfolio.total,
        newThisWeek: weekActivities.filter((a) => a.type === "client" && a.action === "onboarded").length,
        churnedThisWeek: 0,
        healthIssues,
      },
      support: {
        ticketsOpened: weekActivities.filter((a) => a.type === "support" && a.action === "ticket_opened").length,
        ticketsResolved: weekActivities.filter((a) => a.type === "support" && a.action === "ticket_resolved").length,
        avgResponseTime: ticketStats.avgResponseTimeMs,
      },
      actionItems,
      highlights,
      concerns,
    },
  };

  digests.set(digest.id, digest);
  return digest;
}

export function getDigest(id: string): WeeklyDigest | undefined {
  return digests.get(id);
}

export function getDigestHistory(): WeeklyDigest[] {
  return Array.from(digests.values()).sort(
    (a, b) => new Date(b.weekOf).getTime() - new Date(a.weekOf).getTime()
  );
}

export async function sendDigestEmail(
  digest: WeeklyDigest,
  recipientEmail: string
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[Digest] Would send digest to", recipientEmail);
    return { success: true };
  }

  const { sections } = digest;
  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto">
      <h1 style="font-size:24px;margin:0 0 4px">NorthStar Synergy</h1>
      <p style="color:#888;margin:0 0 24px">Weekly Digest — Week of ${digest.weekOf}</p>

      <div style="background:#f0fdf4;border-radius:12px;padding:20px;margin-bottom:16px">
        <h2 style="font-size:16px;margin:0 0 12px;color:#166534">Revenue</h2>
        <p style="font-size:28px;font-weight:700;margin:0">$${sections.revenue.mrr.toFixed(0)} MRR</p>
      </div>

      <div style="background:#eff6ff;border-radius:12px;padding:20px;margin-bottom:16px">
        <h2 style="font-size:16px;margin:0 0 12px;color:#1e40af">Pipeline</h2>
        <p style="margin:4px 0;font-size:14px">${sections.pipeline.newLeads} new leads</p>
        <p style="margin:4px 0;font-size:14px">${sections.pipeline.emailsSent} emails sent</p>
        <p style="margin:4px 0;font-size:14px">${sections.pipeline.closedWon} closed won</p>
      </div>

      <div style="background:#fefce8;border-radius:12px;padding:20px;margin-bottom:16px">
        <h2 style="font-size:16px;margin:0 0 12px;color:#854d0e">Clients</h2>
        <p style="margin:4px 0;font-size:14px">${sections.clients.total} total clients</p>
        <p style="margin:4px 0;font-size:14px">${sections.clients.newThisWeek} new this week</p>
        ${sections.clients.healthIssues.length > 0 ? `<p style="margin:4px 0;font-size:14px;color:#dc2626">${sections.clients.healthIssues.length} health issues</p>` : ""}
      </div>

      ${sections.actionItems.length > 0 ? `
        <div style="background:#fef2f2;border-radius:12px;padding:20px;margin-bottom:16px">
          <h2 style="font-size:16px;margin:0 0 12px;color:#991b1b">Action Items</h2>
          <ul style="margin:0;padding-left:20px">${sections.actionItems.map((a) => `<li style="font-size:14px;margin:4px 0">${a}</li>`).join("")}</ul>
        </div>
      ` : ""}

      ${sections.highlights.length > 0 ? `
        <div style="margin-bottom:16px">
          <h2 style="font-size:16px;margin:0 0 8px">Highlights</h2>
          <ul style="margin:0;padding-left:20px;color:#666">${sections.highlights.map((h) => `<li style="font-size:14px;margin:4px 0">${h}</li>`).join("")}</ul>
        </div>
      ` : ""}

      <p style="font-size:11px;color:#bbb;text-align:center;margin-top:24px">NorthStar Synergy Business Digest</p>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "NorthStar Synergy <digest@northstarsynergy.com>",
        to: recipientEmail,
        subject: `Weekly Digest — ${digest.weekOf}`,
        html,
      }),
    });

    if (response.ok) {
      const updated = { ...digest, sentTo: recipientEmail, sentAt: new Date().toISOString() };
      digests.set(digest.id, updated);
      return { success: true };
    }
    return { success: false, error: "Failed to send" };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

function getMonday(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}
