"use client";

import { useEffect, useState, useCallback } from "react";
import type { LeadStage } from "@/types/business";

// ── Types ────────────────────────────────────────────────────────────

interface Metrics {
  emailsSentToday: number;
  emailsSentTotal: number;
  openRate: number;
  clickRate: number;
  replies: number;
  meetingsBooked: number;
  closedWon: number;
  mrr: number;
  warmupDay: number;
  warmupLimit: number;
  warmupRemaining: number;
}

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

interface DashboardData {
  metrics: Metrics;
  funnel: FunnelStage[];
  leads: LeadRow[];
  activityFeed: ActivityItem[];
  sites: SiteRow[];
  generatedAt: string;
}

// ── Constants ────────────────────────────────────────────────────────

const STAGE_COLORS: Record<string, { bg: string; text: string }> = {
  discovered: { bg: "bg-sky-100", text: "text-sky-700" },
  prospect: { bg: "bg-gray-100", text: "text-gray-700" },
  outreach: { bg: "bg-blue-100", text: "text-blue-700" },
  demo: { bg: "bg-purple-100", text: "text-purple-700" },
  proposal: { bg: "bg-amber-100", text: "text-amber-700" },
  close: { bg: "bg-emerald-100", text: "text-emerald-700" },
  onboarding: { bg: "bg-cyan-100", text: "text-cyan-700" },
  onboarding_complete: { bg: "bg-teal-100", text: "text-teal-700" },
  active: { bg: "bg-emerald-200", text: "text-emerald-800" },
  churned: { bg: "bg-red-100", text: "text-red-700" },
};

const STAGE_LABELS: Record<string, string> = {
  discovered: "Discovered",
  prospect: "Prospect",
  outreach: "Outreach",
  demo: "Demo",
  proposal: "Proposal",
  close: "Closed",
  onboarding: "Onboarding",
  onboarding_complete: "Onboarded",
  active: "Active",
  churned: "Churned",
};

const ACTION_COLORS: Record<string, string> = {
  replied: "text-emerald-600",
  clicked: "text-blue-600",
  opened: "text-amber-600",
  sent: "text-gray-500",
  none: "text-gray-300",
};

const ACTIVITY_ICONS: Record<string, { color: string; icon: string }> = {
  email: { color: "bg-blue-400", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8" },
  click: { color: "bg-purple-400", icon: "M15 15l-2 5L9 9l11 4-5 2z" },
  reply: { color: "bg-emerald-400", icon: "M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" },
  postcard: { color: "bg-amber-400", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  meeting: { color: "bg-cyan-400", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  system: { color: "bg-gray-400", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
};

const FUNNEL_COLORS = [
  "bg-indigo-500",
  "bg-blue-500",
  "bg-cyan-500",
  "bg-teal-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-orange-500",
  "bg-rose-500",
];

// ── Helpers ──────────────────────────────────────────────────────────

function timeSince(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function shortDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

type SortKey = "restaurantName" | "stage" | "emailsSent" | "lastAction" | "lastActionDate" | "city";
type SortDir = "asc" | "desc";

// ── Main Component ───────────────────────────────────────────────────

export default function OutreachDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("lastActionDate");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [stageFilter, setStageFilter] = useState<string>("all");

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/outreach-dashboard");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30_000); // refresh every 30s
    return () => clearInterval(interval);
  }, [fetchData]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  if (loading && !data) {
    return (
      <div className="flex h-full items-center justify-center p-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm text-red-700">Failed to load dashboard: {error}</p>
          <button onClick={fetchData} className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { metrics, funnel, leads, activityFeed, sites } = data;

  // Sort & filter leads
  const filteredLeads = stageFilter === "all" ? leads : leads.filter((l) => l.stage === stageFilter);
  const sortedLeads = [...filteredLeads].sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1;
    switch (sortKey) {
      case "restaurantName":
        return dir * a.restaurantName.localeCompare(b.restaurantName);
      case "city":
        return dir * a.city.localeCompare(b.city);
      case "stage":
        return dir * a.stage.localeCompare(b.stage);
      case "emailsSent":
        return dir * (a.emailsSent - b.emailsSent);
      case "lastAction": {
        const order = { replied: 4, clicked: 3, opened: 2, sent: 1, none: 0 };
        return dir * ((order[a.lastAction] || 0) - (order[b.lastAction] || 0));
      }
      case "lastActionDate": {
        const at = a.lastActionDate ? new Date(a.lastActionDate).getTime() : 0;
        const bt = b.lastActionDate ? new Date(b.lastActionDate).getTime() : 0;
        return dir * (at - bt);
      }
      default:
        return 0;
    }
  });

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Outreach Command Center</h1>
          <p className="text-sm text-gray-500">
            Real-time pipeline & outreach performance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-gray-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            Live — refreshes every 30s
          </span>
          <button
            onClick={fetchData}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* ── TOP ROW: Key Metrics ──────────────────────────────────── */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
        <MetricCard label="Emails Sent" value={`${metrics.emailsSentToday}`} sub={`${metrics.emailsSentTotal} total`} color="text-blue-600" />
        <MetricCard label="Open Rate" value={`${metrics.openRate}%`} sub="unique leads" color="text-amber-600" />
        <MetricCard label="Click Rate" value={`${metrics.clickRate}%`} sub="unique leads" color="text-purple-600" />
        <MetricCard label="Replies" value={`${metrics.replies}`} sub="responded" color="text-emerald-600" />
        <MetricCard label="Meetings" value={`${metrics.meetingsBooked}`} sub="booked" color="text-cyan-600" />
        <MetricCard label="Deals Won" value={`${metrics.closedWon}`} sub="clients" color="text-emerald-700" />
        <MetricCard label="MRR" value={`$${metrics.mrr.toLocaleString()}`} sub="monthly" color="text-emerald-600" />
        <MetricCard
          label="Warmup Day"
          value={`${Math.min(metrics.warmupDay, 28)}`}
          sub={`of 28 · ${metrics.warmupRemaining} left today`}
          color={metrics.warmupDay >= 28 ? "text-emerald-600" : "text-orange-600"}
        />
      </div>

      {/* ── MIDDLE ROW: Funnel + Activity Feed ────────────────────── */}
      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        {/* Pipeline Funnel */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold text-gray-900">Pipeline Funnel</h2>
          <div className="space-y-2.5">
            {funnel.map((stage, i) => {
              const maxCount = Math.max(...funnel.map((s) => s.count), 1);
              const width = Math.max((stage.count / maxCount) * 100, 6);
              return (
                <div key={stage.id} className="group flex items-center gap-3">
                  <span className="w-28 text-right text-xs text-gray-500 sm:w-32">{stage.label}</span>
                  <div className="flex-1">
                    <div
                      className={`${FUNNEL_COLORS[i]} flex h-8 items-center justify-between rounded-md px-3 text-xs font-semibold text-white transition-all`}
                      style={{ width: `${width}%`, minWidth: "60px" }}
                    >
                      <span>{stage.count}</span>
                      {i > 0 && <span className="text-white/70">{stage.pct}%</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold text-gray-900">Activity Feed</h2>
          <div className="max-h-[400px] space-y-2.5 overflow-y-auto pr-1">
            {activityFeed.length === 0 ? (
              <p className="py-8 text-center text-sm text-gray-400">No recent outreach activity</p>
            ) : (
              activityFeed.map((event) => {
                const cfg = ACTIVITY_ICONS[event.type] || ACTIVITY_ICONS.system;
                return (
                  <div key={event.id} className="flex items-start gap-2.5">
                    <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${cfg.color}`}>
                      <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cfg.icon} />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs text-gray-700">{event.description}</p>
                      <p className="text-[10px] text-gray-400">{timeSince(event.time)}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* ── LEAD TABLE ────────────────────────────────────────────── */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-sm font-semibold text-gray-900">
            All Leads <span className="font-normal text-gray-400">({filteredLeads.length})</span>
          </h2>
          <div className="flex items-center gap-2">
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600"
            >
              <option value="all">All Stages</option>
              {Object.entries(STAGE_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs text-gray-500">
                <SortHeader label="Restaurant" sortKey="restaurantName" current={sortKey} dir={sortDir} onSort={handleSort} />
                <SortHeader label="City" sortKey="city" current={sortKey} dir={sortDir} onSort={handleSort} />
                <SortHeader label="Stage" sortKey="stage" current={sortKey} dir={sortDir} onSort={handleSort} />
                <SortHeader label="Emails" sortKey="emailsSent" current={sortKey} dir={sortDir} onSort={handleSort} />
                <SortHeader label="Last Action" sortKey="lastAction" current={sortKey} dir={sortDir} onSort={handleSort} />
                <SortHeader label="Action Date" sortKey="lastActionDate" current={sortKey} dir={sortDir} onSort={handleSort} />
                <th className="px-4 py-3 font-medium">Postcard</th>
                <th className="px-4 py-3 font-medium">Links</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sortedLeads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-sm text-gray-400">
                    No leads match the current filter
                  </td>
                </tr>
              ) : (
                sortedLeads.map((lead) => (
                  <tr key={lead.id} className="transition-colors hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-gray-900">{lead.restaurantName}</td>
                    <td className="px-4 py-3 text-gray-500">{lead.city}, {lead.state}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${(STAGE_COLORS[lead.stage] || STAGE_COLORS.prospect).bg} ${(STAGE_COLORS[lead.stage] || STAGE_COLORS.prospect).text}`}>
                        {STAGE_LABELS[lead.stage] || lead.stage}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center tabular-nums text-gray-600">{lead.emailsSent}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium capitalize ${ACTION_COLORS[lead.lastAction]}`}>
                        {lead.lastAction === "none" ? "—" : lead.lastAction}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs tabular-nums text-gray-500">{shortDate(lead.lastActionDate)}</td>
                    <td className="px-4 py-3">
                      <PostcardBadge status={lead.postcardStatus} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {lead.demoLink && (
                          <a
                            href={lead.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600 transition-colors hover:bg-blue-100"
                          >
                            Demo
                          </a>
                        )}
                        {lead.onboardingLink && (
                          <a
                            href={lead.onboardingLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600 transition-colors hover:bg-emerald-100"
                          >
                            Onboard
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── BUILT SITES ───────────────────────────────────────────── */}
      {sites && sites.length > 0 && (
        <div className="mt-6 rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 px-5 py-4">
            <h2 className="text-sm font-semibold text-gray-900">
              Built Sites <span className="font-normal text-gray-400">({sites.length} restaurants)</span>
            </h2>
            <p className="mt-0.5 text-xs text-gray-400">Live websites we&apos;ve built — click any site to preview</p>
          </div>

          <div className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-3">
            {sites.map((site) => (
              <div key={site.slug} className="group rounded-xl border border-gray-150 bg-gray-50/50 transition-all hover:border-gray-300 hover:shadow-sm">
                {/* Hero / Logo header */}
                <div className="relative flex h-28 items-center justify-center overflow-hidden rounded-t-xl bg-gradient-to-br from-gray-100 to-gray-200">
                  {site.heroImage ? (
                    <img src={site.heroImage} alt={site.name} className="absolute inset-0 h-full w-full object-cover" />
                  ) : null}
                  {site.heroImage && <div className="absolute inset-0 bg-black/40" />}
                  {site.logoUrl ? (
                    <img
                      src={site.logoUrl.includes("res.cloudinary.com") ? site.logoUrl.replace("/image/upload/", "/image/upload/e_background_removal/w_200/") : site.logoUrl}
                      alt={`${site.name} logo`}
                      className="relative z-10 h-16 w-auto object-contain drop-shadow-lg"
                    />
                  ) : (
                    <span className="relative z-10 text-lg font-bold text-gray-600">{site.name}</span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">{site.name}</h3>
                      <p className="text-xs text-gray-500">{site.city}, {site.state}</p>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      site.tier === "pro" ? "bg-purple-100 text-purple-700" :
                      site.tier === "growth" ? "bg-blue-100 text-blue-700" :
                      "bg-gray-100 text-gray-600"
                    }`}>
                      {site.tier}
                    </span>
                  </div>

                  {/* Cuisine tags */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {site.cuisine.slice(0, 3).map((c) => (
                      <span key={c} className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] capitalize text-gray-500">{c}</span>
                    ))}
                    <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] capitalize text-gray-500">{site.type}</span>
                  </div>

                  {/* Stats grid */}
                  <div className="mt-3 grid grid-cols-3 gap-2 border-t border-gray-100 pt-3">
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-900">{site.googleRating ? site.googleRating.toFixed(1) : "—"}</p>
                      <p className="text-[10px] text-gray-400">Rating</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-900">{site.totalReviews}</p>
                      <p className="text-[10px] text-gray-400">Reviews</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-900">{site.menuItems}</p>
                      <p className="text-[10px] text-gray-400">Menu Items</p>
                    </div>
                  </div>

                  {/* Feature pills */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {site.menuSections > 0 && <FeaturePill label={`${site.menuSections} menu sections`} active />}
                    {site.featuredReviewCount > 0 && <FeaturePill label={`${site.featuredReviewCount} featured reviews`} active />}
                    {site.hasOnlineOrdering && <FeaturePill label="Online ordering" active />}
                    {site.hasReservations && <FeaturePill label="Reservations" active />}
                    {site.hasCatering && <FeaturePill label="Catering" active />}
                    {site.logoUrl && <FeaturePill label="Logo" active />}
                    {site.heroImage && <FeaturePill label="Hero image" active />}
                    {site.instagram && <FeaturePill label="Instagram" active />}
                    {site.facebook && <FeaturePill label="Facebook" active />}
                  </div>

                  {/* Contact */}
                  <div className="mt-3 space-y-1 border-t border-gray-100 pt-3 text-xs text-gray-500">
                    <p>{site.phone}</p>
                    {site.email && <p>{site.email}</p>}
                  </div>

                  {/* Actions */}
                  <div className="mt-3 flex gap-2">
                    <a
                      href={site.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-lg bg-gray-900 px-3 py-1.5 text-center text-xs font-medium text-white transition-colors hover:bg-gray-800"
                    >
                      View Site
                    </a>
                    <a
                      href={site.onboardingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-center text-xs font-medium text-gray-700 transition-colors hover:bg-gray-50"
                    >
                      Onboarding
                    </a>
                  </div>

                  {/* Meta */}
                  <p className="mt-2 text-[10px] text-gray-300">
                    Created {shortDate(site.createdAt)} · Updated {shortDate(site.updatedAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Sub-components ───────────────────────────────────────────────────

function FeaturePill({ label, active }: { label: string; active: boolean }) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${active ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-400"}`}>
      {label}
    </span>
  );
}

function MetricCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
      <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">{label}</p>
      <p className={`mt-1 text-xl font-bold sm:text-2xl ${color}`}>{value}</p>
      <p className="mt-0.5 truncate text-[10px] text-gray-400">{sub}</p>
    </div>
  );
}

function SortHeader({
  label,
  sortKey: key,
  current,
  dir,
  onSort,
}: {
  label: string;
  sortKey: SortKey;
  current: SortKey;
  dir: SortDir;
  onSort: (key: SortKey) => void;
}) {
  const isActive = current === key;
  return (
    <th
      className="cursor-pointer select-none px-4 py-3 font-medium transition-colors hover:text-gray-900"
      onClick={() => onSort(key)}
    >
      <span className="flex items-center gap-1">
        {label}
        {isActive && (
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={dir === "asc" ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
          </svg>
        )}
      </span>
    </th>
  );
}

function PostcardBadge({ status }: { status: "sent" | "delivered" | "none" }) {
  if (status === "none") return <span className="text-xs text-gray-300">—</span>;
  const color = status === "delivered"
    ? "bg-emerald-50 text-emerald-600"
    : "bg-amber-50 text-amber-600";
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium capitalize ${color}`}>
      {status}
    </span>
  );
}
