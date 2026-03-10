import { NextRequest, NextResponse } from "next/server";
import { addExpense, getAllExpenses, addRevenue, getAllRevenue, calculatePnL, getMonthlyTrend } from "@/lib/finance/pnl-store";
import type { ExpenseCategory } from "@/types/business";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const view = searchParams.get("view"); // "expenses", "revenue", "pnl", "trend"
    const period = searchParams.get("period"); // "2026-03"
    const months = parseInt(searchParams.get("months") || "6");

    if (view === "expenses") {
      const response = NextResponse.json({ expenses: await getAllExpenses() });
      response.headers.set("Cache-Control", "private, no-store");
      return response;
    }

    if (view === "revenue") {
      const response = NextResponse.json({ revenue: await getAllRevenue() });
      response.headers.set("Cache-Control", "private, no-store");
      return response;
    }

    if (view === "trend") {
      const response = NextResponse.json({ trend: await getMonthlyTrend(months) });
      response.headers.set("Cache-Control", "private, no-store");
      return response;
    }

    // Default: PnL for current or specified period
    const pnlPeriod = period || `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
    const response = NextResponse.json(await calculatePnL(pnlPeriod));
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  } catch (error) {
    console.error("[Finance API]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type } = body;

    if (typeof body.amount !== "number" || !isFinite(body.amount) || body.amount <= 0) {
      return NextResponse.json({ error: "amount must be a positive finite number" }, { status: 400 });
    }
    if (body.description && (typeof body.description !== "string" || body.description.length > 1000)) {
      return NextResponse.json({ error: "description must be a string of 1000 characters or fewer" }, { status: 400 });
    }

    if (type === "expense") {
      const expense = await addExpense({
        description: body.description,
        amount: body.amount,
        category: body.category as ExpenseCategory,
        isRecurring: body.isRecurring,
        recurringInterval: body.recurringInterval,
        date: body.date,
      });
      return NextResponse.json({ expense }, { status: 201 });
    }

    if (type === "revenue") {
      const revenue = await addRevenue({
        clientId: body.clientId,
        clientName: body.clientName,
        amount: body.amount,
        type: body.revenueType || "subscription",
        date: body.date,
        stripeInvoiceId: body.stripeInvoiceId,
      });
      return NextResponse.json({ revenue }, { status: 201 });
    }

    return NextResponse.json({ error: "type must be 'expense' or 'revenue'" }, { status: 400 });
  } catch (err) {
    console.error("[Finance POST]", err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
