"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Lead, LeadStage } from "@/types/business";

const STAGES: { key: LeadStage; label: string; color: string; bg: string }[] = [
  { key: "prospect", label: "Prospects", color: "text-gray-700", bg: "bg-gray-50" },
  { key: "outreach", label: "Outreach", color: "text-blue-700", bg: "bg-blue-50" },
  { key: "demo", label: "Demo", color: "text-purple-700", bg: "bg-purple-50" },
  { key: "proposal", label: "Proposal", color: "text-amber-700", bg: "bg-amber-50" },
  { key: "close", label: "Closed Won", color: "text-emerald-700", bg: "bg-emerald-50" },
  { key: "onboarding", label: "Onboarding", color: "text-cyan-700", bg: "bg-cyan-50" },
  { key: "onboarding_complete", label: "Onboarding Done", color: "text-teal-700", bg: "bg-teal-50" },
];

export default function PipelinePage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const fetchLeads = useCallback(async () => {
    const res = await fetch(search ? `/api/crm/leads?q=${encodeURIComponent(search)}` : "/api/crm/leads");
    const data = await res.json();
    setLeads(data.leads || []);
    setLoading(false);
  }, [search]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  // Debounce search input by 300ms
  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const moveToStage = async (leadId: string, stage: LeadStage) => {
    const res = await fetch(`/api/crm/leads/${leadId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stage }),
    });
    if (res.ok) {
      const data = await res.json();
      setLeads((prev) => prev.map((l) => (l.id === leadId ? data.lead : l)));
      if (selectedLead?.id === leadId) setSelectedLead(data.lead);
    }
  };

  const groupedByStage = STAGES.map((stage) => ({
    ...stage,
    leads: leads.filter((l) => l.stage === stage.key),
  }));

  if (loading) {
    return (
      <div className="flex h-full flex-col">
        {/* Header placeholder */}
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 animate-pulse">
          <div>
            <div className="h-6 w-28 rounded bg-gray-200" />
            <div className="mt-2 h-4 w-16 rounded bg-gray-100" />
          </div>
          <div className="h-9 w-44 rounded-lg bg-gray-200" />
        </div>
        {/* Kanban columns */}
        <div className="flex flex-1 gap-4 overflow-x-auto p-6 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-72 shrink-0">
              <div className="mb-3 h-9 w-full rounded-lg bg-gray-200" />
              <div className="space-y-2">
                {[...Array(i % 2 === 0 ? 3 : 2)].map((_, j) => (
                  <div key={j} className="rounded-lg border border-gray-200 bg-white p-3">
                    <div className="h-4 w-36 rounded bg-gray-200" />
                    <div className="mt-2 h-3 w-24 rounded bg-gray-100" />
                    <div className="mt-2 flex justify-between">
                      <div className="h-3 w-20 rounded bg-gray-100" />
                      <div className="h-4 w-8 rounded-full bg-gray-100" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Pipeline</h1>
          <p className="text-sm text-gray-500">{leads.length} leads</p>
        </div>
        <label htmlFor="pipeline-search" className="sr-only">Search leads</label>
        <input
          id="pipeline-search"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search leads..."
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>

      {/* Kanban Board */}
      <div className="flex flex-1 gap-4 overflow-x-auto p-6">
        {groupedByStage.map((col) => (
          <div key={col.key} className="flex w-72 shrink-0 flex-col">
            <div className={`mb-3 flex items-center justify-between rounded-lg ${col.bg} px-3 py-2`}>
              <span className={`text-sm font-semibold ${col.color}`}>{col.label}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${col.color} ${col.bg}`}>
                {col.leads.length}
              </span>
            </div>
            <div className="flex-1 space-y-2 overflow-y-auto">
              <AnimatePresence>
                {col.leads.map((lead) => (
                  <motion.div
                    key={lead.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    onClick={() => setSelectedLead(lead)}
                    className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <h3 className="text-sm font-semibold text-gray-900">{lead.restaurantName}</h3>
                    <p className="text-xs text-gray-500">{lead.city}, {lead.state}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-400">{lead.contactName || "No contact"}</span>
                      <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
                        lead.score >= 80 ? "bg-emerald-50 text-emerald-700" :
                        lead.score >= 60 ? "bg-amber-50 text-amber-700" :
                        "bg-gray-50 text-gray-500"
                      }`}>
                        {lead.score}
                      </span>
                    </div>
                    {/* Quick move buttons */}
                    <div className="mt-2 flex gap-1">
                      {STAGES.filter((s) => s.key !== col.key).slice(0, 3).map((s) => (
                        <button
                          key={s.key}
                          onClick={(e) => { e.stopPropagation(); moveToStage(lead.id, s.key); }}
                          className="rounded bg-gray-50 px-1.5 py-0.5 text-[10px] text-gray-500 hover:bg-gray-100"
                          title={`Move to ${s.label}`}
                        >
                          {s.label.slice(0, 4)}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {/* Lead Detail Panel */}
      <AnimatePresence>
        {selectedLead && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/30"
              onClick={() => setSelectedLead(null)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`Lead details: ${selectedLead.restaurantName}`}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-lg overflow-y-auto bg-white shadow-2xl"
            >
              <div className="border-b border-gray-100 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">{selectedLead.restaurantName}</h2>
                  <button onClick={() => setSelectedLead(null)} aria-label="Close panel" className="rounded-full p-2 hover:bg-gray-100">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="space-y-4 p-6">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-400">Contact</span><p className="font-medium">{selectedLead.contactName || "—"}</p></div>
                  <div><span className="text-gray-400">Email</span><p className="font-medium">{selectedLead.email || "—"}</p></div>
                  <div><span className="text-gray-400">Phone</span><p className="font-medium">{selectedLead.phone || "—"}</p></div>
                  <div><span className="text-gray-400">Score</span><p className="font-medium">{selectedLead.score}</p></div>
                  <div><span className="text-gray-400">Source</span><p className="font-medium capitalize">{selectedLead.source.replace("_", " ")}</p></div>
                  <div><span className="text-gray-400">Value</span><p className="font-medium">${selectedLead.value}/mo</p></div>
                </div>

                {/* Stage Selector */}
                <div>
                  <p className="mb-2 text-xs font-medium text-gray-500">Move to Stage</p>
                  <div className="flex flex-wrap gap-1">
                    {STAGES.map((s) => (
                      <button
                        key={s.key}
                        onClick={() => moveToStage(selectedLead.id, s.key)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                          selectedLead.stage === s.key
                            ? "bg-gray-900 text-white"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                {selectedLead.notes.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-medium text-gray-500">Notes</p>
                    {selectedLead.notes.map((n) => (
                      <div key={n.id} className="mb-2 rounded-lg bg-gray-50 p-3 text-sm text-gray-700">{n.content}</div>
                    ))}
                  </div>
                )}

                {/* Outreach History */}
                {selectedLead.outreachHistory.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs font-medium text-gray-500">Outreach History</p>
                    {selectedLead.outreachHistory.map((o) => (
                      <div key={o.id} className="mb-2 flex items-center justify-between rounded-lg bg-gray-50 p-3 text-sm">
                        <div>
                          <span className="font-medium capitalize">{o.type}</span>
                          {o.subject && <span className="text-gray-500"> — {o.subject}</span>}
                        </div>
                        <span className={`text-xs ${o.status === "opened" ? "text-emerald-600" : "text-gray-400"}`}>{o.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
