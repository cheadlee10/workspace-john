"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PRICING_PLANS } from "@/lib/billing/stripe-billing";

interface PricingSectionProps {
  accentColor?: string;
  dark?: boolean;
}

export function PricingSection({
  accentColor = "#D4A574",
  dark = false,
}: PricingSectionProps) {
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
          clientEmail: "",
          clientName: "",
          successUrl: `${window.location.origin}/pricing?success=true`,
          cancelUrl: `${window.location.origin}/pricing`,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        window.location.href = "mailto:hello@northstarsynergy.com";
      }
    } catch {
      window.location.href = "mailto:hello@northstarsynergy.com";
    } finally {
      setLoadingPlan(null);
    }
  }

  // Theme-aware colors
  const bg = dark ? "bg-transparent" : "bg-gray-50";
  const headingColor = dark ? "text-white" : "text-gray-900";
  const subColor = dark ? "text-slate-400" : "text-gray-500";
  const toggleBg = dark
    ? "bg-slate-800/60 border border-slate-700/40"
    : "bg-white shadow-sm";
  const toggleInactive = dark ? "text-slate-400" : "text-gray-600";
  const cardBg = dark
    ? "bg-slate-800/30 backdrop-blur-sm"
    : "bg-white";
  const cardBorder = dark ? "border-slate-700/40" : "border-gray-200";
  const cardHover = dark ? "hover:bg-slate-800/50" : "hover:shadow-md";
  const priceColor = dark ? "text-white" : "text-gray-900";
  const featureColor = dark ? "text-slate-400" : "text-gray-600";
  const annualColor = dark ? "text-slate-500" : "text-gray-400";
  const outlineBtnBg = dark
    ? "bg-transparent hover:bg-slate-700/50"
    : "bg-white hover:bg-gray-50";
  const legalColor = dark ? "text-slate-500" : "text-gray-400";
  const linkColor = dark
    ? "text-emerald-400 hover:text-emerald-300"
    : "text-teal-600 hover:text-teal-700";
  const tableBg = dark ? "bg-slate-800/30" : "bg-white";
  const tableBorder = dark ? "border-slate-700/40" : "border-gray-200";
  const tableHeaderBg = dark ? "bg-slate-800/60" : "bg-gray-50";
  const tableHeaderColor = dark ? "text-slate-300" : "text-gray-700";
  const tableRowBorder = dark ? "border-slate-700/20" : "border-gray-50";
  const tableCellColor = dark ? "text-slate-400" : "text-gray-600";
  const tableCellDim = dark ? "text-slate-500" : "text-gray-500";
  const faqBorder = dark ? "border-slate-700/40" : "border-gray-200";
  const faqBg = dark ? "bg-slate-800/30" : "bg-white";
  const faqSummary = dark ? "text-white" : "text-gray-900";
  const faqArrow = dark ? "text-slate-500" : "text-gray-400";
  const faqAnswer = dark ? "text-slate-400" : "text-gray-500";

  return (
    <section id="pricing" className={`${bg} py-16 sm:py-24`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <h2 className={`mb-3 text-3xl font-bold ${headingColor} sm:text-4xl`}>
            Simple, Transparent Pricing
          </h2>
          <p className={`mx-auto max-w-2xl text-lg ${subColor}`}>
            No setup fees. No contracts. No hidden costs. Cancel anytime.
          </p>

          {/* Annual Toggle */}
          <div
            className={`mt-6 inline-flex items-center gap-3 rounded-full p-1 ${toggleBg}`}
          >
            <button
              onClick={() => setIsAnnual(false)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                !isAnnual ? "text-white" : toggleInactive
              }`}
              style={!isAnnual ? { backgroundColor: accentColor } : undefined}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                isAnnual ? "text-white" : toggleInactive
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
            const price = isAnnual
              ? Math.round(plan.price * 0.8)
              : plan.price;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col rounded-2xl border p-5 shadow-sm transition-shadow sm:p-8 ${cardHover} ${cardBg} ${
                  isPopular
                    ? "border-2 shadow-lg"
                    : cardBorder
                }`}
                style={
                  isPopular ? { borderColor: accentColor } : undefined
                }
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
                  <h3 className={`text-xl font-bold ${headingColor}`}>
                    {plan.name}
                  </h3>
                  <div className="mt-3 flex items-baseline">
                    <span className={`text-4xl font-bold ${priceColor}`}>
                      ${price}
                    </span>
                    <span className={`ml-1 ${subColor}`}>/mo</span>
                  </div>
                  {isAnnual && (
                    <p className={`mt-1 text-sm ${annualColor}`}>
                      <span className="line-through">
                        ${plan.price}/mo
                      </span>{" "}
                      billed annually
                    </p>
                  )}
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2 text-sm ${featureColor}`}
                    >
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
                      : `border-2 ${outlineBtnBg}`
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

        <p className={`mt-6 text-center text-xs ${legalColor}`}>
          By subscribing, you agree to our{" "}
          <Link
            href="/legal/terms"
            className={`underline ${linkColor}`}
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/legal/privacy"
            className={`underline ${linkColor}`}
          >
            Privacy Policy
          </Link>
          . Subscriptions are billed monthly or annually and can be cancelled
          anytime.
        </p>

        {/* Comparison to competitors */}
        <div className="mt-16 text-center">
          <h3 className={`mb-4 text-lg font-bold ${headingColor}`}>
            How We Compare
          </h3>
          <div
            className={`mx-auto max-w-3xl overflow-x-auto rounded-xl border ${tableBorder} ${tableBg}`}
          >
            <table className="w-full text-left text-sm">
              <thead>
                <tr
                  className={`border-b ${tableRowBorder} ${tableHeaderBg}`}
                >
                  <th
                    className={`px-3 py-3 font-semibold ${tableHeaderColor} sm:px-6`}
                  >
                    Platform
                  </th>
                  <th
                    className={`px-3 py-3 text-center font-semibold ${tableHeaderColor} sm:px-6`}
                  >
                    Monthly
                  </th>
                  <th
                    className={`hidden px-3 py-3 text-center font-semibold ${tableHeaderColor} sm:table-cell sm:px-6`}
                  >
                    Setup Fee
                  </th>
                  <th
                    className={`hidden px-3 py-3 text-center font-semibold ${tableHeaderColor} sm:table-cell sm:px-6`}
                  >
                    Commission
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  className={`border-b ${tableRowBorder}`}
                  style={{
                    backgroundColor: dark
                      ? `${accentColor}10`
                      : `${accentColor}08`,
                  }}
                >
                  <td
                    className="px-3 py-3 font-bold sm:px-6"
                    style={{ color: accentColor }}
                  >
                    NorthStar Synergy
                  </td>
                  <td
                    className={`px-3 py-3 text-center font-bold ${priceColor} sm:px-6`}
                  >
                    $49-149
                  </td>
                  <td
                    className={`hidden px-3 py-3 text-center font-bold ${priceColor} sm:table-cell sm:px-6`}
                  >
                    $0
                  </td>
                  <td
                    className={`hidden px-3 py-3 text-center font-bold ${priceColor} sm:table-cell sm:px-6`}
                  >
                    0%
                  </td>
                </tr>
                {[
                  {
                    name: "BentoBox",
                    monthly: "$199-499",
                    setup: "$500+",
                    commission: "0%",
                  },
                  {
                    name: "Popmenu",
                    monthly: "$179-499",
                    setup: "$499",
                    commission: "0%",
                  },
                  {
                    name: "Owner.com",
                    monthly: "$499",
                    setup: "$500",
                    commission: "0%",
                  },
                  {
                    name: "DoorDash",
                    monthly: "$0",
                    setup: "$0",
                    commission: "15-30%",
                  },
                  {
                    name: "UberEats",
                    monthly: "$0",
                    setup: "$0",
                    commission: "15-30%",
                  },
                ].map((row) => (
                  <tr
                    key={row.name}
                    className={`border-b ${tableRowBorder} last:border-b-0`}
                  >
                    <td className={`px-3 py-3 ${tableCellColor} sm:px-6`}>
                      {row.name}
                    </td>
                    <td
                      className={`px-3 py-3 text-center ${tableCellColor} sm:px-6`}
                    >
                      {row.monthly}
                    </td>
                    <td
                      className={`hidden px-3 py-3 text-center ${tableCellDim} sm:table-cell sm:px-6`}
                    >
                      {row.setup}
                    </td>
                    <td
                      className={`hidden px-3 py-3 text-center ${tableCellDim} sm:table-cell sm:px-6`}
                    >
                      {row.commission}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h3 className={`mb-8 text-center text-lg font-bold ${headingColor}`}>
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
                className={`group rounded-xl border ${faqBorder} ${faqBg}`}
              >
                <summary
                  className={`flex cursor-pointer items-center justify-between px-4 py-4 text-sm font-semibold ${faqSummary} sm:px-6 [&::-webkit-details-marker]:hidden`}
                >
                  {q}
                  <svg
                    className={`h-4 w-4 shrink-0 ${faqArrow} transition-transform group-open:rotate-180`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <p
                  className={`px-4 pb-4 text-sm leading-relaxed ${faqAnswer} sm:px-6`}
                >
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
