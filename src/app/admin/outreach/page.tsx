"use client";

import { useState, useEffect } from "react";
import type { EmailSequence, EmailEnrollment } from "@/types/business";

interface SequenceWithStats extends EmailSequence {
  stats: { enrolled: number; active: number; completed: number; emailsSent: number };
}

export default function OutreachPage() {
  const [sequences, setSequences] = useState<SequenceWithStats[]>([]);
  const [enrollments, setEnrollments] = useState<EmailEnrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [lastProcessResult, setLastProcessResult] = useState<{ processed: number; emails: Array<{ restaurantName: string; subject: string }> } | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/outreach").then((r) => r.json()),
      fetch("/api/outreach?view=enrollments").then((r) => r.json()),
    ]).then(([seqData, enrData]) => {
      setSequences(seqData.sequences || []);
      setEnrollments(enrData.enrollments || []);
      setLoading(false);
    });
  }, []);

  const processOutreach = async () => {
    setProcessing(true);
    const res = await fetch("/api/outreach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "process" }),
    });
    const data = await res.json();
    setLastProcessResult(data);
    setProcessing(false);
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <svg className="h-8 w-8 animate-spin text-gray-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Outreach</h1>
          <p className="text-sm text-gray-500">Email sequences and automated outreach</p>
        </div>
        <button
          onClick={processOutreach}
          disabled={processing}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {processing ? "Processing..." : "Process Pending Emails"}
        </button>
      </div>

      {/* Process Result */}
      {lastProcessResult && (
        <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-semibold text-emerald-700">
            Processed {lastProcessResult.processed} email{lastProcessResult.processed !== 1 ? "s" : ""}
          </p>
          {lastProcessResult.emails.length > 0 && (
            <div className="mt-2 space-y-1">
              {lastProcessResult.emails.map((e, i) => (
                <p key={i} className="text-xs text-emerald-600">
                  {e.restaurantName}: &ldquo;{e.subject}&rdquo;
                </p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Email Sequences */}
      <div className="mb-8">
        <h2 className="mb-4 text-sm font-semibold text-gray-900">Email Sequences</h2>
        <div className="space-y-3">
          {sequences.map((seq) => (
            <div key={seq.id} className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{seq.name}</h3>
                  <p className="text-xs text-gray-500">{seq.description}</p>
                </div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  seq.isActive ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500"
                }`}>
                  {seq.isActive ? "Active" : "Paused"}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
                <div>
                  <p className="text-lg font-bold text-gray-900">{seq.steps.length}</p>
                  <p className="text-xs text-gray-500">Steps</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-blue-600">{seq.stats.enrolled}</p>
                  <p className="text-xs text-gray-500">Enrolled</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-amber-600">{seq.stats.active}</p>
                  <p className="text-xs text-gray-500">Active</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-emerald-600">{seq.stats.emailsSent}</p>
                  <p className="text-xs text-gray-500">Sent</p>
                </div>
              </div>

              {/* Steps Preview */}
              <div className="mt-4 space-y-2">
                {seq.steps.map((step, i) => (
                  <div key={step.id} className="flex items-center gap-3 rounded-lg bg-gray-50 px-3 py-2 text-sm">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600">
                      {i + 1}
                    </span>
                    <span className="text-gray-600">Day {step.dayOffset}:</span>
                    <span className="truncate text-gray-900">{step.subject}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Enrollments */}
      <div>
        <h2 className="mb-4 text-sm font-semibold text-gray-900">Active Enrollments ({enrollments.length})</h2>
        {enrollments.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white py-8 text-center">
            <p className="text-sm text-gray-400">No active enrollments</p>
            <p className="mt-1 text-xs text-gray-400">Enroll leads from the Pipeline page</p>
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white">
            {enrollments.map((enr) => (
              <div key={enr.id} className="flex items-center justify-between border-b border-gray-50 px-4 py-3 last:border-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">Lead: {enr.leadId}</p>
                  <p className="text-xs text-gray-500">Step {enr.currentStep + 1} &middot; {enr.status}</p>
                </div>
                {enr.nextStepAt && (
                  <span className="text-xs text-gray-400">
                    Next: {new Date(enr.nextStepAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
