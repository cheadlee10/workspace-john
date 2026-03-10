import Link from "next/link";
import type { Metadata } from "next";
import { getLead, updateLead } from "@/lib/crm/lead-store";
import { addToDnc } from "@/lib/outreach/dnc-store";
import { getSupabase, isDbEnabled } from "@/lib/db/supabase";

export const metadata: Metadata = {
  title: "Unsubscribed | NorthStar Synergy",
  description: "You have been unsubscribed from NorthStar Synergy communications.",
  robots: { index: false },
};

interface UnsubscribePageProps {
  params: Promise<{ id: string }>;
}

async function stopAllOutreach(leadId: string): Promise<void> {
  if (isDbEnabled()) {
    const sb = getSupabase();
    if (sb) {
      await sb
        .from("enrollments")
        .update({ status: "unsubscribed", next_step_at: null })
        .eq("lead_id", leadId)
        .eq("status", "active");
    }
  }
}

export default async function UnsubscribePage({ params }: UnsubscribePageProps) {
  const { id } = await params;

  if (id) {
    const lead = await getLead(id);
    if (lead) {
      // Add to DNC list — blocks all future contact (email, postcard, voice)
      await addToDnc({
        email: lead.email,
        phone: lead.phone,
        address: lead.address ? `${lead.address}, ${lead.city}, ${lead.state}` : undefined,
        reason: "unsubscribed",
      });

      // Update lead stage
      await updateLead(id, { stage: "churned" });

      // Stop all active email sequences
      await stopAllOutreach(id);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
          <svg className="h-8 w-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900">You&apos;ve been unsubscribed</h1>
        <p className="mb-8 text-gray-500">
          You won&apos;t receive any more emails, postcards, or calls from us. We&apos;re sorry to see you go.
        </p>
        <p className="mb-8 text-sm text-gray-400">
          If this was a mistake, or if you change your mind, feel free to reach out at{" "}
          <a href="mailto:hello@northstarsynergy.com" className="text-teal-600 hover:underline">
            hello@northstarsynergy.com
          </a>
        </p>
        <Link
          href="/"
          className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800"
        >
          Visit NorthStar Synergy
        </Link>
      </div>
    </div>
  );
}
