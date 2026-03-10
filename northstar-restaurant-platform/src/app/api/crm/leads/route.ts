import { NextRequest, NextResponse } from "next/server";
import { createLead, getAllLeads, searchLeads, getLeadsByStage, getPipelineStats } from "@/lib/crm/lead-store";
import type { LeadStage, LeadSource } from "@/types/business";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const stage = searchParams.get("stage") as LeadStage | null;
    const stats = searchParams.get("stats");

    if (stats === "true") {
      const response = NextResponse.json(await getPipelineStats());
      response.headers.set("Cache-Control", "private, no-store");
      return response;
    }

    let leads;
    if (query) {
      leads = await searchLeads(query);
    } else if (stage) {
      leads = await getLeadsByStage(stage);
    } else {
      leads = await getAllLeads();
    }

    const response = NextResponse.json({ leads });
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  } catch (error) {
    console.error("[Leads API]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { restaurantName, contactName, email, phone, website, address, city, state, source, score, tags, value } = body;

    if (!restaurantName || !address || !city || !state) {
      return NextResponse.json({ error: "restaurantName, address, city, and state are required" }, { status: 400 });
    }

    const lengthChecks: [unknown, string, number][] = [
      [restaurantName, "restaurantName", 200],
      [contactName, "contactName", 200],
      [email, "email", 254],
      [phone, "phone", 20],
      [address, "address", 500],
      [city, "city", 100],
      [state, "state", 50],
      [website, "website", 500],
    ];
    for (const [val, field, max] of lengthChecks) {
      if (val && typeof val === "string" && val.length > max) {
        return NextResponse.json({ error: `${field} must be ${max} characters or fewer` }, { status: 400 });
      }
    }

    const lead = await createLead({
      restaurantName,
      contactName,
      email,
      phone,
      website,
      address,
      city,
      state,
      source: (source as LeadSource) || "manual",
      score,
      tags,
      value,
    });

    return NextResponse.json({ lead }, { status: 201 });
  } catch (err) {
    console.error("[Leads POST]", err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
