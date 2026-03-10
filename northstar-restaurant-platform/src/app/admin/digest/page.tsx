"use client";

import { useState, useEffect } from "react";
import type { WeeklyDigest } from "@/types/business";

export default function DigestPage() {
  const [digests, setDigests] = useState<WeeklyDigest[]>([]);
  const [currentDigest, setCurrentDigest] = useState<WeeklyDigest | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [sendingEmail, setSendingEmail] = useState("");
  const [sendStatus, setSendStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    fetch("/api/digest")
      .then((r) => r.json())
      .then((data) => {
        setDigests(data.digests || []);
        setLoading(false);
      });
  }, []);

  const generateDigest = async () => {
    setGenerating(true);
    const res = await fetch("/api/digest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "generate" }),
    });
    const data = await res.json();
    setCurrentDigest(data.digest);
    setDigests((prev) => [data.digest, ...prev.filter((d) => d.id !== data.digest.id)]);
    setGenerating(false);
  };

  const sendDigest = async () => {
    if (!currentDigest || !sendingEmail) return;
    setSendStatus(null);
    try {
      const res = await fetch("/api/digest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send", email: sendingEmail, weekOf: currentDigest.weekOf }),
      });
      if (res.ok) {
        setSendStatus({ type: "success", message: "Digest sent successfully!" });
      } else {
        setSendStatus({ type: "error", message: "Failed to send digest. Please try again." });
      }
    } catch {
      setSendStatus({ type: "error", message: "Failed to send digest. Please try again." });
    }
  };

  if (loading) {
    return (
      <div className="p-6 animate-pulse">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="h-6 w-36 rounded bg-gray-200" />
            <div className="mt-2 h-4 w-56 rounded bg-gray-100" />
          </div>
          <div className="h-10 w-40 rounded-lg bg-gray-200" />
        </div>

        {/* Digest Header Card */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="h-4 w-32 rounded bg-gray-200" />
              <div className="mt-2 h-3 w-48 rounded bg-gray-100" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-40 rounded-lg bg-gray-200" />
              <div className="h-8 w-16 rounded-lg bg-gray-200" />
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-3 h-4 w-20 rounded bg-gray-200" />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="h-8 w-24 rounded bg-gray-200" />
              <div className="mt-1 h-3 w-12 rounded bg-gray-100" />
            </div>
            <div>
              <div className="h-8 w-24 rounded bg-gray-200" />
              <div className="mt-1 h-3 w-28 rounded bg-gray-100" />
            </div>
          </div>
        </div>

        {/* Pipeline Card */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-3 h-4 w-20 rounded bg-gray-200" />
          <div className="grid grid-cols-3 gap-4 text-center">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="mx-auto h-6 w-10 rounded bg-gray-200" />
                <div className="mx-auto mt-1 h-3 w-16 rounded bg-gray-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Clients Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-3 h-4 w-16 rounded bg-gray-200" />
          <div className="grid grid-cols-3 gap-4 text-center">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <div className="mx-auto h-6 w-10 rounded bg-gray-200" />
                <div className="mx-auto mt-1 h-3 w-12 rounded bg-gray-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const digest = currentDigest || digests[0];

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Weekly Digest</h1>
          <p className="text-sm text-gray-500">Business summary for your weekly review</p>
        </div>
        <button
          onClick={generateDigest}
          disabled={generating}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {generating ? "Generating..." : "Generate This Week"}
        </button>
      </div>

      {digest ? (
        <div className="space-y-6">
          {/* Digest Header */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-gray-900">Week of {digest.weekOf}</h2>
                <p className="text-xs text-gray-400">Generated {new Date(digest.generatedAt).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <label htmlFor="digest-email" className="sr-only">Email address</label>
                <input
                  id="digest-email"
                  type="email"
                  value={sendingEmail}
                  onChange={(e) => setSendingEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm"
                />
                <button
                  onClick={sendDigest}
                  disabled={!sendingEmail}
                  className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </div>
            {sendStatus && (
              <div
                role="status"
                className={`mt-3 rounded-lg px-4 py-2.5 text-sm font-medium ${
                  sendStatus.type === "success"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {sendStatus.message}
              </div>
            )}
          </div>

          {/* Revenue */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Revenue</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold text-emerald-600">${digest.sections.revenue.mrr.toLocaleString()}</p>
                <p className="text-xs text-gray-500">MRR</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">${digest.sections.revenue.thisWeek.toLocaleString()}</p>
                <p className="text-xs text-gray-500">This Week Revenue</p>
              </div>
            </div>
          </div>

          {/* Pipeline */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Pipeline</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div><p className="text-lg font-bold text-blue-600">{digest.sections.pipeline.newLeads}</p><p className="text-xs text-gray-500">New Leads</p></div>
              <div><p className="text-lg font-bold text-purple-600">{digest.sections.pipeline.emailsSent}</p><p className="text-xs text-gray-500">Emails Sent</p></div>
              <div><p className="text-lg font-bold text-emerald-600">{digest.sections.pipeline.closedWon}</p><p className="text-xs text-gray-500">Closed Won</p></div>
            </div>
          </div>

          {/* Clients */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">Clients</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div><p className="text-lg font-bold text-gray-900">{digest.sections.clients.total}</p><p className="text-xs text-gray-500">Total</p></div>
              <div><p className="text-lg font-bold text-emerald-600">{digest.sections.clients.newThisWeek}</p><p className="text-xs text-gray-500">New</p></div>
              <div><p className="text-lg font-bold text-red-600">{digest.sections.clients.healthIssues.length}</p><p className="text-xs text-gray-500">Health Issues</p></div>
            </div>
          </div>

          {/* Action Items */}
          {digest.sections.actionItems.length > 0 && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5">
              <h3 className="mb-3 text-sm font-semibold text-red-800">Action Items</h3>
              <ul className="space-y-1">
                {digest.sections.actionItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-red-700">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Highlights */}
          {digest.sections.highlights.length > 0 && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
              <h3 className="mb-3 text-sm font-semibold text-emerald-800">Highlights</h3>
              <ul className="space-y-1">
                {digest.sections.highlights.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-emerald-700">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white py-16 text-center">
          <p className="text-gray-400">No digests generated yet</p>
          <p className="mt-1 text-sm text-gray-400">Click &ldquo;Generate This Week&rdquo; to create your first digest</p>
        </div>
      )}
    </div>
  );
}
