"use client";

import { useEffect, useState } from "react";
import type { LeadStage } from "@/types/business";
import type { OutreachTrackerData, OutreachTrackerRow } from "@/lib/outreach/outreach-tracker";

const STAGE_STYLES: Record<LeadStage, string> = {
  prospect: "bg-gray-100 text-gray-700",
  outreach: "bg-blue-50 text-blue-700",
  demo: "bg-purple-50 text-purple-700",
  proposal: "bg-amber-50 text-amber-700",
  close: "bg-emerald-50 text-emerald-700",
  onboarding: "bg-cyan-50 text-cyan-700",
  onboarding_complete: "bg-teal-50 text-teal-700",
  active: "bg-emerald-100 text-emerald-800",
  churned: "bg-red-50 text-red-700",
};

function stageLabel(stage: LeadStage): string {
  if (stage === "close") {
    return "Closed";
  }
  if (stage === "onboarding_complete") {
    return "Onboarding Done";
  }

  return stage.charAt(0).toUpperCase() + stage.slice(1);
}

function formatDate(value: string | null): string {
  if (!value) return "—";

  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function normalizeUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `https://${url}`;
}

function EmptyValue() {
  return <span className="text-gray-400">—</span>;
}

function LoadingSkeleton() {
  return (
    <div className="p-6 animate-pulse">
      <div className="mb-6">
        <div className="h-7 w-44 rounded bg-gray-200" />
        <div className="mt-2 h-4 w-56 rounded bg-gray-100" />
      </div>

      <div className="mb-4 flex gap-4">
        <div className="h-20 w-48 rounded-xl bg-gray-200" />
        <div className="h-20 w-48 rounded-xl bg-gray-100" />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
          <div className="h-4 w-64 rounded bg-gray-200" />
        </div>
        <div className="space-y-3 p-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-12 rounded bg-gray-100" />
          ))}
        </div>
      </div>
    </div>
  );
}

function TrackerRowView({ row }: { row: OutreachTrackerRow }) {
  return (
    <tr className="border-b border-gray-50 align-top transition-colors hover:bg-gray-50">
      <td className="px-4 py-3 text-sm font-semibold text-gray-900">{row.restaurantName}</td>
      <td className="px-4 py-3">
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STAGE_STYLES[row.stage]}`}>
          {stageLabel(row.stage)}
        </span>
      </td>
      <td className="px-4 py-3 text-sm">
        {row.demoSiteLink ? (
          <a
            href={normalizeUrl(row.demoSiteLink)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {row.demoSiteLink}
          </a>
        ) : (
          <EmptyValue />
        )}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{formatDate(row.email1Sent)}</td>
      <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.email1Opened}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{formatDate(row.email2Sent)}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{formatDate(row.postcardSent)}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{formatDate(row.callMade)}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{row.callOutcome ?? "—"}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{formatDate(row.lastActivity)}</td>
    </tr>
  );
}

export default function OutreachPage() {
  const [data, setData] = useState<OutreachTrackerData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadTracker() {
      try {
        const response = await fetch("/api/outreach?view=tracker");
        const payload = await response.json() as OutreachTrackerData | { error?: string };

        if (!response.ok) {
          throw new Error("error" in payload && payload.error ? payload.error : "Failed to load outreach tracker");
        }

        if (!cancelled) {
          setData(payload as OutreachTrackerData);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load outreach tracker");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadTracker();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error || !data) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <h1 className="text-lg font-semibold text-red-800">Outreach Tracker</h1>
          <p className="mt-1 text-sm text-red-700">{error ?? "Failed to load outreach tracker."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Outreach Tracker</h1>
          <p className="text-sm text-gray-500">Prospect-by-prospect outreach status across email, postcard, and calls.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
            <p className="text-xs font-medium text-gray-500">Prospects</p>
            <p className="mt-1 text-xl font-bold text-gray-900">{data.summary.prospectCount}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
            <p className="text-xs font-medium text-gray-500">Emails Sent Today</p>
            <p className="mt-1 text-xl font-bold text-gray-900">{data.summary.emailsSentToday}</p>
            <p className="text-[11px] text-gray-400">Daily send log</p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Restaurant Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Stage</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Demo Site Link</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Email 1 Sent (date)</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Email 1 Opened (y/n)</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Email 2 Sent</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Postcard Sent (date)</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Call Made (date)</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Call Outcome</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {data.rows.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-sm text-gray-400">
                    No prospects found.
                  </td>
                </tr>
              ) : (
                data.rows.map((row) => <TrackerRowView key={row.leadId} row={row} />)
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
