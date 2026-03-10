import { NextRequest, NextResponse } from "next/server";
import { getAllSequences, createSequence, enrollLead, processEnrollments, getActiveEnrollments, getSequenceStats } from "@/lib/outreach/sequence-store";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const view = searchParams.get("view"); // "sequences", "enrollments", "stats"

    if (view === "enrollments") {
      return NextResponse.json({ enrollments: await getActiveEnrollments() });
    }

    const allSequences = await getAllSequences();
    const sequences = await Promise.all(allSequences.map(async (seq) => ({
      ...seq,
      stats: await getSequenceStats(seq.id),
    })));

    return NextResponse.json({ sequences });
  } catch (error) {
    console.error("[Outreach API]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === "create_sequence") {
      const sequence = await createSequence({
        name: body.name,
        description: body.description,
        steps: body.steps,
      });
      return NextResponse.json({ sequence }, { status: 201 });
    }

    if (action === "enroll") {
      const enrollment = await enrollLead(body.leadId, body.sequenceId);
      if (!enrollment) {
        return NextResponse.json({ error: "Lead or sequence not found" }, { status: 404 });
      }
      return NextResponse.json({ enrollment }, { status: 201 });
    }

    if (action === "process") {
      const result = await processEnrollments();
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
