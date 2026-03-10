import { NextRequest, NextResponse } from "next/server";
import { getLead, updateLead, deleteLead, moveLeadToStage, addLeadNote } from "@/lib/crm/lead-store";
import type { LeadStage } from "@/types/business";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const lead = await getLead(id);
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    return NextResponse.json({ lead });
  } catch (error) {
    console.error("[Leads API]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Handle stage change
    if (body.stage) {
      const lead = await moveLeadToStage(id, body.stage as LeadStage);
      if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
      return NextResponse.json({ lead });
    }

    // Handle note addition
    if (body.note) {
      const lead = await addLeadNote(id, body.note);
      if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
      return NextResponse.json({ lead });
    }

    // General update
    const lead = await updateLead(id, body);
    if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    return NextResponse.json({ lead });
  } catch (error) {
    console.error("[Leads API]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const deleted = await deleteLead(id);
    if (!deleted) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Leads API]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
