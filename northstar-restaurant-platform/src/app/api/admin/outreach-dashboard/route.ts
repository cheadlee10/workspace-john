import { NextResponse } from "next/server";
import { getAllLeads } from "@/lib/crm/lead-store";
import { getOutreachTrackerData } from "@/lib/outreach/outreach-tracker";
import { getWarmupStatus } from "@/lib/outreach/send-throttle";
import { getRecentActivities } from "@/lib/activity/activity-store";
import { calculatePnL } from "@/lib/finance/pnl-store";
import { getAllRestaurants } from "@/lib/tenant/restaurant-store";
import type { Lead, LeadStage, OutreachEvent } from "@/types/business";
import type { Restaurant } from "@/types/restaurant";

// ── Types ────────────────────────────────────────────────────────────

interface FunnelStage {
  id: string;
  label: string;
  count: number;
  pct: number;
}

interface LeadRow {
  id: string;
  restaurantName: string;
  city: string;
  state: string;
  stage: LeadStage;
  emailsSent: number;
  lastAction: "opened" | "clicked" | "replied" | "sent" | "none";
  lastActionDate: string | null;
  postcardStatus: "sent" | "delivered" | "none";
  demoLink: string | null;
  onboardingLink: string | null;
}

interface ActivityItem {
  id: string;
  time: string;
  description: string;
  type: "email" | "click" | "reply" | "postcard" | "meeting" | "system";
}

interface SiteRow {
  slug: string;
  name: string;
  city: string;
  state: string;
  cuisine: string[];
  type: string;
  tier: string;
  logoUrl: string | null;
  heroImage: string | null;
  googleRating: number | null;
  totalReviews: number;
  featuredReviewCount: number;
  menuSections: number;
  menuItems: number;
  hasOnlineOrdering: boolean;
  hasReservations: boolean;
  hasCatering: boolean;
  phone: string;
  email: string | null;
  instagram: string | null;
  facebook: string | null;
  siteUrl: string;
  onboardingUrl: string;
  createdAt: string;
  updatedAt: string;
}

// ── Helpers ──────────────────────────────────────────────────────────

function countEmails(lead: Lead): number {
  return lead.outreachHistory.filter((e) => e.type === "email").length;
}

function getLastAction(lead: Lead): { action: LeadRow["lastAction"]; date: string | null } {
  const events = [...lead.outreachHistory].sort(
    (a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime()
  );

  for (const e of events) {
    if (e.repliedAt) return { action: "replied", date: e.repliedAt };
    if (e.clickedAt) return { action: "clicked", date: e.clickedAt };
    if (e.openedAt) return { action: "opened", date: e.openedAt };
    if (e.status === "replied") return { action: "replied", date: e.sentAt };
    if (e.status === "clicked") return { action: "clicked", date: e.sentAt };
    if (e.status === "opened") return { action: "opened", date: e.sentAt };
  }

  if (events.length > 0) return { action: "sent", date: events[0].sentAt };
  return { action: "none", date: null };
}

function getPostcardStatus(lead: Lead): LeadRow["postcardStatus"] {
  const postcards = lead.outreachHistory.filter((e) => e.type === "postcard");
  if (postcards.length === 0) return "none";
  const last = postcards[postcards.length - 1];
  return last.status === "delivered" ? "delivered" : "sent";
}

function countByStatus(leads: Lead[], status: OutreachEvent["status"]): number {
  return leads.filter((l) =>
    l.outreachHistory.some((e) => e.type === "email" && e.status === status)
  ).length;
}

function countByField(leads: Lead[], field: "openedAt" | "clickedAt" | "repliedAt"): number {
  return leads.filter((l) =>
    l.outreachHistory.some((e) => e.type === "email" && e[field])
  ).length;
}

// ── Main handler ─────────────────────────────────────────────────────

export async function GET() {
  try {
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    const currentPeriod = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    // Fetch each independently to isolate failures
    const [leads, trackerData, warmup, activities, pnl, restaurants] = await Promise.all([
      getAllLeads().catch((e) => { console.error("[OD] getAllLeads failed:", e.message); return [] as Lead[]; }),
      getOutreachTrackerData().catch((e) => { console.error("[OD] getOutreachTrackerData failed:", e.message); return { rows: [], summary: { prospectCount: 0, emailsSentToday: 0, lastSendDate: null } }; }),
      getWarmupStatus().catch((e) => { console.error("[OD] getWarmupStatus failed:", e.message); return { dailyLimit: 5, sentToday: 0, remaining: 5, warmupDay: 1, startDate: null }; }),
      getRecentActivities(50).catch((e) => { console.error("[OD] getRecentActivities failed:", e.message); return []; }),
      calculatePnL(currentPeriod).catch((e) => { console.error("[OD] calculatePnL failed:", e.message); return { period: currentPeriod, totalRevenue: 0, totalExpenses: 0, netProfit: 0, margin: 0, revenueByClient: [], expensesByCategory: [], mrr: 0, activeClients: 0, newClients: 0, churnedClients: 0 }; }),
      getAllRestaurants().catch((e) => { console.error("[OD] getAllRestaurants failed:", e.message); return [] as Restaurant[]; }),
    ]);

    // ── Top-row metrics ──────────────────────────────────────────────

    const allEmails = leads.flatMap((l) =>
      l.outreachHistory.filter((e) => e.type === "email")
    );
    const emailsSentTotal = allEmails.length;
    const emailsSentToday = allEmails.filter(
      (e) => e.sentAt.slice(0, 10) === todayStr
    ).length;

    const leadsWithEmail = leads.filter((l) =>
      l.outreachHistory.some((e) => e.type === "email")
    );
    const opened = countByField(leads, "openedAt") + countByStatus(leads, "opened");
    const clicked = countByField(leads, "clickedAt") + countByStatus(leads, "clicked");
    const replied = countByField(leads, "repliedAt") + countByStatus(leads, "replied");

    // De-duplicate: use unique lead counts for rate calculation
    const uniqueOpened = new Set(
      leads.filter((l) =>
        l.outreachHistory.some((e) => e.type === "email" && (e.openedAt || e.status === "opened"))
      ).map((l) => l.id)
    ).size;
    const uniqueClicked = new Set(
      leads.filter((l) =>
        l.outreachHistory.some((e) => e.type === "email" && (e.clickedAt || e.status === "clicked"))
      ).map((l) => l.id)
    ).size;
    const uniqueReplied = new Set(
      leads.filter((l) =>
        l.outreachHistory.some((e) => e.type === "email" && (e.repliedAt || e.status === "replied"))
      ).map((l) => l.id)
    ).size;

    const emailBase = leadsWithEmail.length || 1;
    const openRate = Math.round((uniqueOpened / emailBase) * 100);
    const clickRate = Math.round((uniqueClicked / emailBase) * 100);

    const meetingsBooked = leads.filter((l) =>
      l.outreachHistory.some((e) => e.type === "meeting")
    ).length;

    const closedWon = leads.filter(
      (l) => l.stage === "active" || l.stage === "onboarding" || l.stage === "onboarding_complete"
    ).length;

    const metrics = {
      emailsSentToday,
      emailsSentTotal,
      openRate,
      clickRate,
      replies: uniqueReplied,
      meetingsBooked,
      closedWon,
      mrr: pnl.mrr,
      warmupDay: warmup.warmupDay,
      warmupLimit: warmup.dailyLimit,
      warmupRemaining: warmup.remaining,
    };

    // ── Pipeline funnel ──────────────────────────────────────────────

    const sitesBuilt = leads.filter((l) => l.previewUrl).length;
    const emailsSentLeads = leadsWithEmail.length;

    const funnelRaw = [
      { id: "discovered", label: "Leads Discovered", count: leads.length },
      { id: "sites_built", label: "Sites Built", count: sitesBuilt },
      { id: "emails_sent", label: "Emails Sent", count: emailsSentLeads },
      { id: "opened", label: "Opened", count: uniqueOpened },
      { id: "clicked", label: "Clicked", count: uniqueClicked },
      { id: "replied", label: "Replied", count: uniqueReplied },
      { id: "meeting", label: "Meeting", count: meetingsBooked },
      { id: "closed_won", label: "Closed Won", count: closedWon },
    ];

    const funnel: FunnelStage[] = funnelRaw.map((stage, i) => ({
      ...stage,
      pct: i === 0 ? 100 : funnelRaw[i - 1].count > 0
        ? Math.round((stage.count / funnelRaw[i - 1].count) * 100)
        : 0,
    }));

    // ── Lead table rows ──────────────────────────────────────────────

    const leadRows: LeadRow[] = leads
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .map((lead) => {
        const { action, date } = getLastAction(lead);
        const slug = lead.restaurantName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

        return {
          id: lead.id,
          restaurantName: lead.restaurantName,
          city: lead.city,
          state: lead.state,
          stage: lead.stage,
          emailsSent: countEmails(lead),
          lastAction: action,
          lastActionDate: date,
          postcardStatus: getPostcardStatus(lead),
          demoLink: lead.previewUrl || `/demo/${slug}`,
          onboardingLink: `/onboarding/${slug}`,
        };
      });

    // ── Activity feed ────────────────────────────────────────────────

    const activityFeed: ActivityItem[] = activities
      .filter((a) => a.type === "outreach" || a.type === "lead")
      .slice(0, 30)
      .map((a) => ({
        id: a.id,
        time: a.createdAt,
        description: a.description,
        type: a.description.toLowerCase().includes("click")
          ? "click"
          : a.description.toLowerCase().includes("open")
            ? "email"
            : a.description.toLowerCase().includes("repl")
              ? "reply"
              : a.description.toLowerCase().includes("postcard")
                ? "postcard"
                : a.description.toLowerCase().includes("meeting")
                  ? "meeting"
                  : "system",
      }));

    // ── Built sites ─────────────────────────────────────────────────

    const baseUrl = "https://northstar-restaurant-platform.vercel.app";
    const sites: SiteRow[] = restaurants.map((r) => {
      const totalMenuItems = r.menu.sections.reduce((sum, s) => sum + s.items.length, 0);
      return {
        slug: r.slug,
        name: r.name,
        city: r.location.city,
        state: r.location.state,
        cuisine: r.cuisine,
        type: r.type,
        tier: r.features.tier,
        logoUrl: r.branding.logo || null,
        heroImage: r.branding.heroImage || null,
        googleRating: r.reviews?.googleRating ?? r.reviews?.averageRating ?? null,
        totalReviews: r.reviews?.totalReviews ?? 0,
        featuredReviewCount: r.reviews?.featuredReviews?.length ?? 0,
        menuSections: r.menu.sections.length,
        menuItems: totalMenuItems,
        hasOnlineOrdering: r.features.onlineOrdering,
        hasReservations: r.features.reservations,
        hasCatering: r.features.cateringPortal,
        phone: r.contact.phone,
        email: r.contact.email || null,
        instagram: r.socialMedia.instagram || null,
        facebook: r.socialMedia.facebook || null,
        siteUrl: `${baseUrl}/demo/${r.slug}`,
        onboardingUrl: `${baseUrl}/onboarding/${r.slug}`,
        createdAt: r.createdAt,
        updatedAt: r.updatedAt,
      };
    });

    const response = NextResponse.json({
      metrics,
      funnel,
      leads: leadRows,
      activityFeed,
      sites,
      trackerSummary: trackerData.summary,
      generatedAt: now.toISOString(),
    });

    response.headers.set("Cache-Control", "private, no-store");
    return response;
  } catch (error) {
    console.error("[Outreach Dashboard API]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
