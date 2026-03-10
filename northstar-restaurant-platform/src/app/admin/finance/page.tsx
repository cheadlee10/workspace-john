"use client";

import { useState, useEffect } from "react";
import type { PnLSummary, Expense } from "@/types/business";

export default function FinancePage() {
  const [pnl, setPnl] = useState<PnLSummary | null>(null);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [trend, setTrend] = useState<PnLSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddExpense, setShowAddExpense] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/finance").then((r) => r.json()),
      fetch("/api/finance?view=expenses").then((r) => r.json()),
      fetch("/api/finance?view=trend&months=4").then((r) => r.json()),
    ]).then(([pnlData, expData, trendData]) => {
      setPnl(pnlData);
      setExpenses(expData.expenses || []);
      setTrend(trendData.trend || []);
      setLoading(false);
    });
  }, []);

  const handleAddExpense = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/finance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "expense",
        description: form.get("description"),
        amount: parseFloat(form.get("amount") as string),
        category: form.get("category"),
        isRecurring: form.get("recurring") === "on",
      }),
    });
    if (res.ok) {
      const data = await res.json();
      setExpenses((prev) => [data.expense, ...prev]);
      setShowAddExpense(false);
      // Refresh PnL
      const pnlRes = await fetch("/api/finance");
      setPnl(await pnlRes.json());
    }
  };

  if (loading || !pnl) {
    return (
      <div className="p-6 animate-pulse">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="h-6 w-32 rounded bg-gray-200" />
            <div className="mt-2 h-4 w-20 rounded bg-gray-100" />
          </div>
          <div className="h-10 w-28 rounded-lg bg-gray-200" />
        </div>

        {/* Top Metrics */}
        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="h-3 w-16 rounded bg-gray-200" />
              <div className="mt-3 h-7 w-20 rounded bg-gray-200" />
            </div>
          ))}
        </div>

        {/* Two-column cards */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Revenue by Client */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-4 h-4 w-28 rounded bg-gray-200" />
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="h-4 w-28 rounded bg-gray-100" />
                  <div className="h-4 w-12 rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </div>

          {/* Expenses by Category */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="mb-4 h-4 w-36 rounded bg-gray-200" />
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="h-4 w-24 rounded bg-gray-100" />
                  <div className="h-4 w-14 rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Trend Table */}
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-4 h-4 w-28 rounded bg-gray-200" />
          <div className="space-y-3">
            <div className="flex gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-3 w-16 rounded bg-gray-200" />
              ))}
            </div>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-4">
                {[...Array(5)].map((_, j) => (
                  <div key={j} className="h-4 w-16 rounded bg-gray-100" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Profit & Loss</h1>
          <p className="text-sm text-gray-500">{pnl.period}</p>
        </div>
        <button
          onClick={() => setShowAddExpense(!showAddExpense)}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Add Expense
        </button>
      </div>

      {/* Top Metrics */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">Revenue</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">${pnl.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">Expenses</p>
          <p className="mt-1 text-2xl font-bold text-red-500">${pnl.totalExpenses.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">Net Profit</p>
          <p className={`mt-1 text-2xl font-bold ${pnl.netProfit >= 0 ? "text-emerald-600" : "text-red-600"}`}>
            ${pnl.netProfit.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs text-gray-500">Margin</p>
          <p className={`mt-1 text-2xl font-bold ${pnl.margin >= 50 ? "text-emerald-600" : "text-amber-600"}`}>
            {pnl.margin.toFixed(0)}%
          </p>
        </div>
      </div>

      {/* Add Expense Form */}
      {showAddExpense && (
        <form onSubmit={handleAddExpense} className="mb-6 rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">New Expense</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label htmlFor="expense-desc" className="mb-1 block text-xs font-medium text-gray-500">Description</label>
              <input id="expense-desc" name="description" required placeholder="Description" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="expense-amount" className="mb-1 block text-xs font-medium text-gray-500">Amount</label>
              <input id="expense-amount" name="amount" type="number" step="0.01" required placeholder="0.00" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm" />
            </div>
            <div>
              <label htmlFor="expense-category" className="mb-1 block text-xs font-medium text-gray-500">Category</label>
              <select id="expense-category" name="category" className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm">
                <option value="hosting">Hosting</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="software">Software</option>
                <option value="marketing">Marketing</option>
                <option value="payment_processing">Payment Processing</option>
                <option value="tax">Tax</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex items-end gap-3">
              <label className="flex items-center gap-1.5 text-sm text-gray-600">
                <input type="checkbox" name="recurring" /> Recurring
              </label>
              <button type="submit" className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white">Add</button>
            </div>
          </div>
        </form>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue by Client */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold text-gray-900">Revenue by Client</h2>
          <div className="space-y-2">
            {pnl.revenueByClient.map((rc) => (
              <div key={rc.clientId} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{rc.name}</span>
                <span className="text-sm font-medium text-gray-900">${rc.amount.toFixed(0)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expenses by Category */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold text-gray-900">Expenses by Category</h2>
          <div className="space-y-2">
            {pnl.expensesByCategory.map((ec) => (
              <div key={ec.category} className="flex items-center justify-between">
                <span className="text-sm capitalize text-gray-600">{ec.category.replace("_", " ")}</span>
                <span className="text-sm font-medium text-gray-900">${ec.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      {trend.length > 0 && (
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="mb-4 text-sm font-semibold text-gray-900">Monthly Trend</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-3 py-2 text-left text-xs text-gray-500">Period</th>
                  <th className="px-3 py-2 text-right text-xs text-gray-500">Revenue</th>
                  <th className="px-3 py-2 text-right text-xs text-gray-500">Expenses</th>
                  <th className="px-3 py-2 text-right text-xs text-gray-500">Net</th>
                  <th className="px-3 py-2 text-right text-xs text-gray-500">Margin</th>
                </tr>
              </thead>
              <tbody>
                {trend.map((month) => (
                  <tr key={month.period} className="border-b border-gray-50">
                    <td className="px-3 py-2 font-medium text-gray-900">{month.period}</td>
                    <td className="px-3 py-2 text-right text-emerald-600">${month.totalRevenue.toFixed(0)}</td>
                    <td className="px-3 py-2 text-right text-red-500">${month.totalExpenses.toFixed(0)}</td>
                    <td className={`px-3 py-2 text-right font-medium ${month.netProfit >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                      ${month.netProfit.toFixed(0)}
                    </td>
                    <td className="px-3 py-2 text-right text-gray-600">{month.margin.toFixed(0)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
