import { PricingSection } from "@/components/pricing/PricingSection";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | NorthStar Synergy - Restaurant Website Platform",
  description:
    "Simple, transparent pricing for restaurant websites. Starting at $49/mo with no setup fees, no contracts, and zero ordering commissions.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="border-b border-gray-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold text-gray-900">
            NorthStar Synergy
          </Link>
          <Link
            href="/demo"
            className="rounded-full bg-gray-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
          >
            See Demo
          </Link>
        </div>
      </header>

      <PricingSection accentColor="#0f766e" />

      {/* CTA */}
      <section className="bg-gray-900 py-16 text-center text-white">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="mb-4 text-3xl font-bold">Ready to get started?</h2>
          <p className="mb-8 text-lg text-gray-400">
            We&apos;ll build your website for free. You only pay when you love it.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/demo"
              className="rounded-full bg-white px-8 py-3 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-100"
            >
              See a Live Demo
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-gray-600 px-8 py-3 text-sm font-bold text-white transition-colors hover:border-gray-400"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-8 text-center text-sm text-gray-400">
        <p>NorthStar Synergy LLC &middot; Woodinville, WA</p>
      </footer>
    </div>
  );
}
