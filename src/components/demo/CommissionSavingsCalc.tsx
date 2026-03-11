"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface CommissionSavingsCalcProps {
  accentColor?: string;
  bookingUrl?: string;
}

export function CommissionSavingsCalc({
  accentColor = "#D4A574",
  bookingUrl = "#",
}: CommissionSavingsCalcProps) {
  const [monthlySpend, setMonthlySpend] = useState(2000);
  const savings = Math.round(monthlySpend * 0.25);
  const yearlySavings = savings * 12;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mx-auto max-w-xl px-4 py-12 sm:px-6"
    >
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <h3 className="mb-1 text-lg font-semibold text-gray-900">
          How much are delivery apps costing you?
        </h3>
        <p className="mb-6 text-sm text-gray-500">
          See how much you could save with direct ordering.
        </p>

        <label className="mb-2 block text-sm font-medium text-gray-700">
          Monthly delivery app spend
        </label>
        <div className="mb-2 flex items-center gap-3">
          <span className="text-sm font-medium text-gray-500">$0</span>
          <input
            type="range"
            min={0}
            max={10000}
            step={100}
            value={monthlySpend}
            onChange={(e) => setMonthlySpend(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
            style={{
              accentColor,
            }}
          />
          <span className="text-sm font-medium text-gray-500">$10k</span>
        </div>
        <p className="mb-6 text-center text-2xl font-bold text-gray-900">
          ${monthlySpend.toLocaleString()}/mo
        </p>

        {monthlySpend > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 rounded-xl p-5 text-center"
            style={{ backgroundColor: `${accentColor}10` }}
          >
            <p className="mb-1 text-sm text-gray-600">
              With direct ordering, you&apos;d save
            </p>
            <p className="text-3xl font-bold" style={{ color: accentColor }}>
              ${savings.toLocaleString()}/month
            </p>
            <p className="mt-1 text-sm text-gray-500">
              That&apos;s ${yearlySavings.toLocaleString()}/year back in your pocket
            </p>
          </motion.div>
        )}

        <a
          href={bookingUrl}
          className="block w-full rounded-lg py-3 text-center text-sm font-semibold text-white transition-all hover:shadow-md"
          style={{ backgroundColor: accentColor }}
        >
          Start Saving &rarr;
        </a>
      </div>
    </motion.section>
  );
}
