import { NextRequest, NextResponse } from "next/server";
import { processEnrollments } from "@/lib/outreach/sequence-store";
import { logActivity } from "@/lib/activity/activity-store";

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json({ error: "CRON_SECRET not configured" }, { status: 503 });
  }

  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await processEnrollments();
    const timestamp = new Date().toISOString();

    await logActivity({
      type: "outreach",
      action: "cron_sequences",
      description: `Cron: processed ${result.processed} enrollments, sent ${result.emails.length} emails`,
    });

    return NextResponse.json({
      processed: result.processed,
      emails: result.emails,
      timestamp,
    });
  } catch (error) {
    console.error("[cron/sequences] Error:", error);
    return NextResponse.json(
      { error: "Failed to process enrollments" },
      { status: 500 }
    );
  }
}
