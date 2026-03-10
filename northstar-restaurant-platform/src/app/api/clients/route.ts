import { NextRequest, NextResponse } from "next/server";
import { createClient, getAllClients, getClientsByStatus, getClientsByPlan, getPortfolioStats } from "@/lib/crm/client-store";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const plan = searchParams.get("plan");
    const stats = searchParams.get("stats");

    if (stats === "true") {
      return NextResponse.json(await getPortfolioStats());
    }

    let clients;
    if (status) {
      clients = await getClientsByStatus(status as "active" | "trial" | "past_due" | "cancelled");
    } else if (plan) {
      clients = await getClientsByPlan(plan as "starter" | "growth" | "pro");
    } else {
      clients = await getAllClients();
    }

    return NextResponse.json({ clients });
  } catch (error) {
    console.error("[Clients API]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name) {
      return NextResponse.json({ error: "name is required" }, { status: 400 });
    }
    if (typeof body.name !== "string" || body.name.length > 200) {
      return NextResponse.json({ error: "name must be a string of 200 characters or fewer" }, { status: 400 });
    }
    if (body.email && (typeof body.email !== "string" || body.email.length > 254)) {
      return NextResponse.json({ error: "email must be a string of 254 characters or fewer" }, { status: 400 });
    }

    const client = await createClient(body);
    return NextResponse.json({ client }, { status: 201 });
  } catch (err) {
    console.error("[Clients POST]", err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
