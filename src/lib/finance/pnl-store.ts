/**
 * P&L / Finance Store
 *
 * Tracks revenue and expenses. Calculates profit/loss summaries.
 * Supports Supabase database with in-memory fallback.
 */

import type { Expense, RevenueEntry, PnLSummary, ExpenseCategory } from "@/types/business";
import { logActivity } from "@/lib/activity/activity-store";
import { isDbEnabled, getSupabase, isTableNotFoundError, markSchemaUnavailable } from "@/lib/db/supabase";

// === In-memory fallback ===
const memExpenses = new Map<string, Expense>();
const memRevenue = new Map<string, RevenueEntry>();

function generateId(): string {
  return "fin-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

// === DB helpers ===
function toDbExpense(e: Expense) {
  return {
    id: e.id,
    description: e.description,
    amount: e.amount,
    category: e.category,
    is_recurring: e.isRecurring,
    recurring_interval: e.recurringInterval || null,
    date: e.date,
    created_at: e.createdAt,
  };
}

function fromDbExpense(row: Record<string, unknown>): Expense {
  return {
    id: row.id as string,
    description: row.description as string,
    amount: Number(row.amount),
    category: row.category as ExpenseCategory,
    isRecurring: row.is_recurring as boolean,
    recurringInterval: (row.recurring_interval as "monthly" | "annual") || undefined,
    date: row.date as string,
    createdAt: row.created_at as string,
  };
}

function toDbRevenue(r: RevenueEntry) {
  return {
    id: r.id,
    client_id: r.clientId,
    client_name: r.clientName,
    amount: r.amount,
    type: r.type,
    date: r.date,
    stripe_invoice_id: r.stripeInvoiceId || null,
  };
}

function fromDbRevenue(row: Record<string, unknown>): RevenueEntry {
  return {
    id: row.id as string,
    clientId: row.client_id as string,
    clientName: row.client_name as string,
    amount: Number(row.amount),
    type: row.type as RevenueEntry["type"],
    date: row.date as string,
    stripeInvoiceId: (row.stripe_invoice_id as string) || undefined,
  };
}

// === EXPENSES ===

export async function addExpense(params: {
  description: string;
  amount: number;
  category: ExpenseCategory;
  isRecurring?: boolean;
  recurringInterval?: "monthly" | "annual";
  date?: string;
}): Promise<Expense> {
  const id = generateId();
  const now = new Date().toISOString();
  const expense: Expense = {
    id,
    description: params.description,
    amount: params.amount,
    category: params.category,
    isRecurring: params.isRecurring || false,
    recurringInterval: params.recurringInterval,
    date: params.date || now.split("T")[0],
    createdAt: now,
  };

  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { error } = await db.from("expenses").insert(toDbExpense(expense));
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        memExpenses.set(id, expense);
      } else {
        throw new Error(`Failed to add expense: ${error.message}`);
      }
    }
  } else {
    memExpenses.set(id, expense);
  }

  logActivity({
    type: "revenue",
    action: "expense_added",
    description: `Expense: ${params.description} ($${params.amount.toFixed(2)})`,
    entityId: id,
  });

  return expense;
}

export async function getExpense(id: string): Promise<Expense | undefined> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { data, error } = await db.from("expenses").select("*").eq("id", id).single();
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return undefined;
      }
    } else if (data) {
      return fromDbExpense(data);
    } else {
      return undefined;
    }
  }
  return memExpenses.get(id);
}

export async function updateExpense(id: string, updates: Partial<Expense>): Promise<Expense | undefined> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const existing = await getExpense(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    const { error } = await db.from("expenses").update(toDbExpense(updated)).eq("id", id);
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return undefined;
      }
    } else {
      return updated;
    }
  }
  const expense = memExpenses.get(id);
  if (!expense) return undefined;
  const updated = { ...expense, ...updates };
  memExpenses.set(id, updated);
  return updated;
}

export async function deleteExpense(id: string): Promise<boolean> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { error } = await db.from("expenses").delete().eq("id", id);
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  return memExpenses.delete(id);
}

export async function getAllExpenses(): Promise<Expense[]> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { data, error } = await db.from("expenses").select("*").order("date", { ascending: false });
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return [];
      }
    } else {
      return (data || []).map(fromDbExpense);
    }
  }
  return Array.from(memExpenses.values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// === REVENUE ===

export async function addRevenue(params: {
  clientId: string;
  clientName: string;
  amount: number;
  type: RevenueEntry["type"];
  date?: string;
  stripeInvoiceId?: string;
}): Promise<RevenueEntry> {
  const id = generateId();
  const entry: RevenueEntry = {
    id,
    clientId: params.clientId,
    clientName: params.clientName,
    amount: params.amount,
    type: params.type,
    date: params.date || new Date().toISOString().split("T")[0],
    stripeInvoiceId: params.stripeInvoiceId,
  };

  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { error } = await db.from("revenue").insert(toDbRevenue(entry));
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        memRevenue.set(id, entry);
      } else {
        throw new Error(`Failed to add revenue: ${error.message}`);
      }
    }
  } else {
    memRevenue.set(id, entry);
  }

  logActivity({
    type: "revenue",
    action: "payment_received",
    description: `Payment: $${params.amount.toFixed(2)} from ${params.clientName}`,
    entityId: params.clientId,
    entityName: params.clientName,
  });

  return entry;
}

export async function getAllRevenue(): Promise<RevenueEntry[]> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { data, error } = await db.from("revenue").select("*").order("date", { ascending: false });
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return [];
      }
    } else {
      return (data || []).map(fromDbRevenue);
    }
  }
  return Array.from(memRevenue.values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// === P&L CALCULATIONS ===

export async function getExpensesForPeriod(year: number, month: number): Promise<Expense[]> {
  const prefix = `${year}-${String(month).padStart(2, "0")}`;
  const all = await getAllExpenses();

  const direct = all.filter((e) => e.date.startsWith(prefix));
  const recurring = all.filter((e) => {
    if (!e.isRecurring) return false;
    if (e.date.startsWith(prefix)) return false;
    return e.date <= `${prefix}-31`;
  });

  return [...direct, ...recurring];
}

export async function getRevenueForPeriod(year: number, month: number): Promise<RevenueEntry[]> {
  const prefix = `${year}-${String(month).padStart(2, "0")}`;
  const all = await getAllRevenue();
  return all.filter((r) => r.date.startsWith(prefix));
}

export async function calculatePnL(period: string): Promise<PnLSummary> {
  const [yearStr, monthStr] = period.split("-");
  const year = parseInt(yearStr);
  const month = parseInt(monthStr);

  const periodExpenses = await getExpensesForPeriod(year, month);
  const periodRevenue = await getRevenueForPeriod(year, month);

  const totalRevenue = periodRevenue.reduce((sum, r) => sum + r.amount, 0);
  const totalExpenses = periodExpenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalRevenue - totalExpenses;
  const margin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  const revenueByClientMap = new Map<string, { name: string; amount: number }>();
  for (const r of periodRevenue) {
    const existing = revenueByClientMap.get(r.clientId) || { name: r.clientName, amount: 0 };
    existing.amount += r.amount;
    revenueByClientMap.set(r.clientId, existing);
  }
  const revenueByClient = Array.from(revenueByClientMap.entries()).map(([clientId, data]) => ({
    clientId,
    name: data.name,
    amount: data.amount,
  }));

  const expByCatMap = new Map<ExpenseCategory, number>();
  for (const e of periodExpenses) {
    expByCatMap.set(e.category, (expByCatMap.get(e.category) || 0) + e.amount);
  }
  const expensesByCategory = Array.from(expByCatMap.entries()).map(([category, amount]) => ({
    category,
    amount,
  }));

  const mrr = periodRevenue
    .filter((r) => r.type === "subscription")
    .reduce((sum, r) => sum + r.amount, 0);

  return {
    period,
    totalRevenue: Math.round(totalRevenue * 100) / 100,
    totalExpenses: Math.round(totalExpenses * 100) / 100,
    netProfit: Math.round(netProfit * 100) / 100,
    margin: Math.round(margin * 10) / 10,
    revenueByClient,
    expensesByCategory,
    mrr: Math.round(mrr * 100) / 100,
    activeClients: revenueByClient.length,
    newClients: 0,
    churnedClients: 0,
  };
}

export async function getMonthlyTrend(months: number = 6): Promise<PnLSummary[]> {
  const results: PnLSummary[] = [];
  const now = new Date();

  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const period = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    results.push(await calculatePnL(period));
  }

  return results;
}
