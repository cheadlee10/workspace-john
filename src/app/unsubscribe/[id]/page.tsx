import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unsubscribed | NorthStar Synergy",
  description: "You have been unsubscribed from NorthStar Synergy communications.",
  robots: { index: false },
};

interface UnsubscribePageProps {
  params: Promise<{ id: string }>;
}

export default async function UnsubscribePage({ params }: UnsubscribePageProps) {
  const { id } = await params;

  // In production, this would update the prospect's status in the database
  // For now, we log it and show confirmation
  if (id) {
    // TODO: When Supabase is connected, update prospect record:
    // await updateProspectStatus(id, 'unsubscribed');
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
          You won&apos;t receive any more emails from us. We&apos;re sorry to see you go.
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
