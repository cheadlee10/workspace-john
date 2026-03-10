import { getPipelineStats } from "@/lib/crm/lead-store";
import { getPortfolioStats } from "@/lib/crm/client-store";
import { calculatePnL } from "@/lib/finance/pnl-store";
import { getTicketStats } from "@/lib/support/ticket-store";
import { getRecentActivities } from "@/lib/activity/activity-store";
import type { LeadStage } from "@/types/business";

const STAGE_LABELS: Record<LeadStage, string> = {
  prospect: "Prospects",
  outreach: "Outreach",
  demo: "Demo",
  proposal: "Proposal",
  close: "Closed",
  onboarding: "Onboarding",
  active: "Active",
  churned: "Churned",
};

const STAGE_COLORS: Record<LeadStage, string> = {
  prospect: "bg-gray-200",
  outreach: "bg-blue-200",
  demo: "bg-purple-200",
  proposal: "bg-amber-200",
  close: "bg-emerald-200",
  onboarding: "bg-cyan-200",
  active: "bg-emerald-400",
  churned: "bg-red-200",
};

export default async function DashboardPage() {
  const now = new Date();
  const currentPeriod = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const [pipeline, portfolio, pnl, tickets, activities] = await Promise.all([
    getPipelineStats(),
    getPortfolioStats(),
    calculatePnL(currentPeriod),
    getTicketStats(),
    getRecentActivities(15),
  ]);

  const funnelStages: LeadStage[] = ["prospect", "outreach", "demo", "proposal", "close", "onboarding"];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">NorthStar Synergy Business Overview</p>
      </div>

      {/* Top Metrics */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <MetricCard
          label="MRR"
          value={`$${pnl.mrr.toLocaleString()}`}
          sub={`${portfolio.active} active clients`}
          color="text-emerald-600"
        />
        <MetricCard
          label="Pipeline"
          value={String(pipeline.total - pipeline.byStage.active - pipeline.byStage.churned)}
          sub={`${pipeline.conversionRate}% conversion`}
          color="text-blue-600"
        />
        <MetricCard
          label="Net Profit"
          value={`$${pnl.netProfit.toLocaleString()}`}
          sub={`${pnl.margin.toFixed(0)}% margin`}
          color={pnl.netProfit >= 0 ? "text-emerald-600" : "text-red-600"}
        />
        <MetricCard
          label="Open Tickets"
          value={String(tickets.open + tickets.inProgress)}
          sub={tickets.byPriority.urgent > 0 ? `${tickets.byPriority.urgent} urgent` : "All normal"}
          color={tickets.byPriority.urgent > 0 ? "text-red-600" : "text-gray-600"}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Pipeline Funnel */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Pipeline Funnel</h2>
            <a href="/admin/pipeline" className="text-xs font-medium text-blue-600 hover:underline">View All</a>
          </div>
          <div className="space-y-2">
            {funnelStages.map((stage) => {
              const count = pipeline.byStage[stage];
              const maxCount = Math.max(...funnelStages.map((s) => pipeline.byStage[s]), 1);
              const width = Math.max((count / maxCount) * 100, 4);
              return (
                <div key={stage} className="flex items-center gap-3">
                  <span className="w-20 text-xs text-gray-500">{STAGE_LABELS[stage]}</span>
                  <div className="flex-1">
                    <div
                      className={`h-6 rounded ${STAGE_COLORS[stage]} flex items-center px-2 text-xs font-medium text-gray-700 transition-all`}
                      style={{ width: `${width}%` }}
                    >
                      {count}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Activity Feed */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold text-gray-900">Recent Activity</h2>
          <div className="space-y-3">
            {activities.length === 0 ? (
              <p className="text-sm text-gray-400">No recent activity</p>
            ) : (
              activities.slice(0, 10).map((event) => (
                <div key={event.id} className="flex gap-3">
                  <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                    event.type === "lead" ? "bg-blue-400" :
                    event.type === "outreach" ? "bg-purple-400" :
                    event.type === "client" ? "bg-emerald-400" :
                    event.type === "revenue" ? "bg-amber-400" :
                    event.type === "support" ? "bg-red-400" :
                    "bg-gray-400"
                  }`} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs text-gray-700">{event.description}</p>
                    <p className="text-[10px] text-gray-400">
                      {timeSince(event.createdAt)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Revenue Breakdown */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Revenue This Month</h2>
            <a href="/admin/finance" className="text-xs font-medium text-blue-600 hover:underline">Full P&L</a>
          </div>
          {pnl.revenueByClient.length === 0 ? (
            <p className="text-sm text-gray-400">No revenue data yet</p>
          ) : (
            <div className="space-y-2">
              {pnl.revenueByClient.map((rc) => (
                <div key={rc.clientId} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{rc.name}</span>
                  <span className="font-medium text-gray-900">${rc.amount.toFixed(0)}</span>
                </div>
              ))}
              <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2 text-sm font-bold">
                <span className="text-gray-900">Total</span>
                <span className="text-emerald-600">${pnl.totalRevenue.toFixed(0)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Client Health */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">Client Health</h2>
            <a href="/admin/clients" className="text-xs font-medium text-blue-600 hover:underline">All Clients</a>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">{portfolio.healthSummary.healthy}</p>
              <p className="text-xs text-gray-500">Healthy</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-600">{portfolio.healthSummary.degraded}</p>
              <p className="text-xs text-gray-500">Degraded</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{portfolio.healthSummary.down}</p>
              <p className="text-xs text-gray-500">Down</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 border-t border-gray-100 pt-4">
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">{portfolio.byPlan.starter}</p>
              <p className="text-xs text-gray-500">Starter</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">{portfolio.byPlan.growth}</p>
              <p className="text-xs text-gray-500">Growth</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">{portfolio.byPlan.pro}</p>
              <p className="text-xs text-gray-500">Pro</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${color}`}>{value}</p>
      <p className="mt-0.5 text-xs text-gray-400">{sub}</p>
    </div>
  );
}

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
