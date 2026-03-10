"use client";

import { useState, useEffect } from "react";
import type { Client } from "@/types/business";

const HEALTH_CONFIG = {
  healthy: { label: "Healthy", dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" },
  degraded: { label: "Degraded", dot: "bg-amber-500", text: "text-amber-700", bg: "bg-amber-50" },
  down: { label: "Down", dot: "bg-red-500", text: "text-red-700", bg: "bg-red-50" },
};

const STATUS_CONFIG = {
  active: { label: "Active", color: "text-emerald-700 bg-emerald-50" },
  trial: { label: "Trial", color: "text-blue-700 bg-blue-50" },
  past_due: { label: "Past Due", color: "text-red-700 bg-red-50" },
  cancelled: { label: "Cancelled", color: "text-gray-500 bg-gray-100" },
};

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [stats, setStats] = useState({ total: 0, active: 0, trial: 0, pastDue: 0, cancelled: 0, mrr: 0, healthSummary: { healthy: 0, degraded: 0, down: 0 }, byPlan: { starter: 0, growth: 0, pro: 0 } });
  const [filter, setFilter] = useState<"all" | "active" | "trial" | "past_due">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/clients").then((r) => r.json()),
      fetch("/api/clients?stats=true").then((r) => r.json()),
    ]).then(([clientData, statsData]) => {
      setClients(clientData.clients || []);
      setStats(statsData);
      setLoading(false);
    });
  }, []);

  const filtered = filter === "all" ? clients : clients.filter((c) => c.status === filter);

  if (loading) {
    return (
      <div className="p-6 animate-pulse">
        {/* Header */}
        <div className="mb-6">
          <div className="h-6 w-40 rounded bg-gray-200" />
          <div className="mt-2 h-4 w-52 rounded bg-gray-100" />
        </div>
        {/* Filter buttons */}
        <div className="mb-4 flex gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-9 w-24 rounded-lg bg-gray-200" />
          ))}
        </div>
        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          {/* Table header */}
          <div className="flex gap-4 border-b border-gray-100 bg-gray-50 px-4 py-3">
            <div className="h-3 w-24 rounded bg-gray-200" />
            <div className="h-3 w-12 rounded bg-gray-200" />
            <div className="h-3 w-14 rounded bg-gray-200" />
            <div className="h-3 w-14 rounded bg-gray-200" />
            <div className="h-3 w-20 rounded bg-gray-200" />
            <div className="ml-auto h-3 w-12 rounded bg-gray-200" />
          </div>
          {/* Table rows */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 border-b border-gray-50 px-4 py-3">
              <div>
                <div className="h-4 w-32 rounded bg-gray-200" />
                <div className="mt-1 h-3 w-44 rounded bg-gray-100" />
              </div>
              <div className="h-5 w-16 rounded-full bg-gray-100" />
              <div className="h-5 w-14 rounded-full bg-gray-100" />
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-gray-200" />
                <div className="h-3 w-14 rounded bg-gray-100" />
              </div>
              <div className="h-3 w-24 rounded bg-gray-100" />
              <div className="ml-auto h-4 w-12 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Client Portfolio</h1>
          <p className="text-sm text-gray-500">{stats.total} clients &middot; ${stats.mrr.toLocaleString()} MRR</p>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex gap-2">
        {(["all", "active", "trial", "past_due"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              filter === f ? "bg-gray-900 text-white" : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {f === "all" ? "All" : f === "past_due" ? "Past Due" : f.charAt(0).toUpperCase() + f.slice(1)}
            {f === "all" && ` (${stats.total})`}
            {f === "active" && ` (${stats.active})`}
          </button>
        ))}
      </div>

      {/* Client Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Restaurant</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Plan</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Health</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Domain</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">MRR</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((client) => {
              const health = HEALTH_CONFIG[client.hostingHealth];
              const status = STATUS_CONFIG[client.status];
              return (
                <tr key={client.id} className="border-b border-gray-50 transition-colors hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{client.restaurantName}</p>
                      <p className="text-xs text-gray-400">{client.contactName} &middot; {client.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium capitalize text-gray-600">
                      {client.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${status.color}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${health.dot}`} />
                      <span className={`text-xs font-medium ${health.text}`}>{health.label}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {client.domain ? (
                      <a
                        href={`https://${client.domain}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        {client.domain}
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm font-semibold text-gray-900">${client.monthlyRevenue}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
