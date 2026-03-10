"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PRICING_PLANS } from "@/lib/billing/stripe-billing";

interface PricingSectionProps {
  accentColor?: string;
}

export function PricingSection({ accentColor = "#D4A574" }: PricingSectionProps) {
  const [isAnnual, setIsAnnual] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  async function handleGetStarted(planId: string) {
    setLoadingPlan(planId);
    try {
      const res = await fetch("/api/billing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "checkout",
          plan: planId,
          clientEmail: "", // Will be collected by Stripe Checkout
          clientName: "",
          successUrl: `${window.location.origin}/pricing?success=true`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        // Billing not configured yet — scroll to contact or show message
        window.location.href = "mailto:hello@northstarsynergy.com";
      }
    } catch {
      // Stripe not configured — fall back to contact
      window.location.href = "mailto:hello@northstarsynergy.com";
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <section id="pricing" className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-500">
            No setup fees. No contracts. No hidden costs. Cancel anytime.
          </p>

          {/* Annual Toggle */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-white p-1 shadow-sm">
            <button
              onClick={() => setIsAnnual(false)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                !isAnnual ? "text-white" : "text-gray-600"
              }`}
              style={!isAnnual ? { backgroundColor: accentColor } : undefined}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                isAnnual ? "text-white" : "text-gray-600"
              }`}
              style={isAnnual ? { backgroundColor: accentColor } : undefined}
            >
              Annual
              <span className="ml-1 text-xs opacity-75">(Save 20%)</span>
            </button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRICING_PLANS.map((plan, i) => {
            const isPopular = plan.id === "growth";
            const price = isAnnual ? Math.round(plan.price * 0.8) : plan.price;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col rounded-2xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-8 ${
                  isPopular
                    ? "border-2 shadow-lg"
                    : "border-gray-200"
                }`}
                style={isPopular ? { borderColor: accentColor } : undefined}
              >
                {isPopular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white"
                    style={{ backgroundColor: accentColor }}
                  >
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <div className="mt-3 flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">${price}</span>
                    <span className="ml-1 text-gray-500">/mo</span>
                  </div>
                  {isAnnual && (
                    <p className="mt-1 text-sm text-gray-400">
                      <span className="line-through">${plan.price}/mo</span>
                      {" "}billed annually
                    </p>
                  )}
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg
                        className="mt-0.5 h-4 w-4 shrink-0"
                        fill="none"
                        stroke={accentColor}
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleGetStarted(plan.id)}
                  disabled={loadingPlan === plan.id}
                  className={`w-full rounded-xl py-3.5 text-sm font-bold transition-all active:scale-[0.98] disabled:opacity-70 ${
                    isPopular
                      ? "text-white shadow-lg hover:shadow-xl"
                      : "border-2 bg-white hover:bg-gray-50"
                  }`}
                  style={
                    isPopular
                      ? { backgroundColor: accentColor }
                      : { borderColor: accentColor, color: accentColor }
                  }
                >
                  {loadingPlan === plan.id ? "Loading..." : "Get Started"}
                </button>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          By subscribing, you agree to our{" "}
          <Link href="/legal/terms" className="text-teal-600 underline hover:text-teal-700">Terms of Service</Link>{" "}
          and{" "}
          <Link href="/legal/privacy" className="text-teal-600 underline hover:text-teal-700">Privacy Policy</Link>.
          Subscriptions are billed monthly or annually and can be cancelled anytime.
        </p>

        {/* Comparison to competitors */}
        <div className="mt-16 text-center">
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            How We Compare
          </h3>
          <div className="mx-auto max-w-3xl overflow-x-auto rounded-xl border border-gray-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-3 py-3 font-semibold text-gray-700 sm:px-6">Platform</th>
                  <th className="px-3 py-3 text-center font-semibold text-gray-700 sm:px-6">Monthly</th>
                  <th className="hidden px-3 py-3 text-center font-semibold text-gray-700 sm:table-cell sm:px-6">Setup Fee</th>
                  <th className="hidden px-3 py-3 text-center font-semibold text-gray-700 sm:table-cell sm:px-6">Commission</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50" style={{ backgroundColor: `${accentColor}08` }}>
                  <td className="px-3 py-3 font-bold sm:px-6" style={{ color: accentColor }}>
                    NorthStar Synergy
                  </td>
                  <td className="px-3 py-3 text-center font-bold text-gray-900 sm:px-6">$49-149</td>
                  <td className="hidden px-3 py-3 text-center font-bold text-gray-900 sm:table-cell sm:px-6">$0</td>
                  <td className="hidden px-3 py-3 text-center font-bold text-gray-900 sm:table-cell sm:px-6">0%</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="px-3 py-3 text-gray-600 sm:px-6">BentoBox</td>
                  <td className="px-3 py-3 text-center text-gray-600 sm:px-6">$199-499</td>
                  <td className="hidden px-3 py-3 text-center text-gray-500 sm:table-cell sm:px-6">$500+</td>
                  <td className="hidden px-3 py-3 text-center text-gray-600 sm:table-cell sm:px-6">0%</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="px-3 py-3 text-gray-600 sm:px-6">Popmenu</td>
                  <td className="px-3 py-3 text-center text-gray-600 sm:px-6">$179-499</td>
                  <td className="hidden px-3 py-3 text-center text-gray-500 sm:table-cell sm:px-6">$499</td>
                  <td className="hidden px-3 py-3 text-center text-gray-600 sm:table-cell sm:px-6">0%</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="px-3 py-3 text-gray-600 sm:px-6">Owner.com</td>
                  <td className="px-3 py-3 text-center text-gray-600 sm:px-6">$499</td>
                  <td className="hidden px-3 py-3 text-center text-gray-500 sm:table-cell sm:px-6">$500</td>
                  <td className="hidden px-3 py-3 text-center text-gray-600 sm:table-cell sm:px-6">0%</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="px-3 py-3 text-gray-600 sm:px-6">DoorDash</td>
                  <td className="px-3 py-3 text-center text-gray-600 sm:px-6">$0</td>
                  <td className="hidden px-3 py-3 text-center text-gray-600 sm:table-cell sm:px-6">$0</td>
                  <td className="hidden px-3 py-3 text-center text-gray-500 sm:table-cell sm:px-6">15-30%</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 text-gray-600 sm:px-6">UberEats</td>
                  <td className="px-3 py-3 text-center text-gray-600 sm:px-6">$0</td>
                  <td className="hidden px-3 py-3 text-center text-gray-600 sm:table-cell sm:px-6">$0</td>
                  <td className="hidden px-3 py-3 text-center text-gray-500 sm:table-cell sm:px-6">15-30%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h3 className="mb-8 text-center text-lg font-bold text-gray-900">
            Frequently Asked Questions
          </h3>
          <div className="mx-auto max-w-2xl space-y-4">
            {[
              {
                q: "Is there a setup fee?",
                a: "No. We build your website for free. You only pay the monthly subscription once you approve and want to go live.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Absolutely. No contracts, no cancellation fees. Cancel whenever you want from your dashboard.",
              },
              {
                q: "Do you take a commission on orders?",
                a: "Never. 100% of your revenue stays with you. We only charge the flat monthly subscription. Payment processing fees (2.6% + $0.10) go to Square, not us.",
              },
              {
                q: "What if I already have a POS system?",
                a: "We integrate with Square, Toast, Clover, and more. Your online orders show up right in your existing POS system.",
              },
              {
                q: "Do I need to update the menu myself?",
                a: "We can sync your menu from your POS system automatically. Or you can update it yourself through our simple dashboard. We're also happy to make changes for you.",
              },
              {
                q: "How long does it take to launch?",
                a: "Most restaurants go live within 24-48 hours after approving their preview. If you have online ordering, add another 1-2 days for POS integration.",
              },
            ].map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-xl border border-gray-200 bg-white"
              >
                <summary className="flex cursor-pointer items-center justify-between px-4 py-4 text-sm font-semibold text-gray-900 sm:px-6 [&::-webkit-details-marker]:hidden">
                  {q}
                  <svg
                    className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-4 pb-4 text-sm leading-relaxed text-gray-500 sm:px-6">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
