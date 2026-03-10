import { NextRequest, NextResponse } from "next/server";
import { getRecentActivities, getActivities } from "@/lib/activity/activity-store";
import type { ActivityEvent } from "@/types/business";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const type = searchParams.get("type") as ActivityEvent["type"] | null;
    const entityId = searchParams.get("entityId");
    const since = searchParams.get("since");

    if (type || entityId || since) {
      const activities = await getActivities({
        type: type || undefined,
        entityId: entityId || undefined,
        since: since || undefined,
        limit,
      });
      return NextResponse.json({ activities });
    }

    return NextResponse.json({ activities: await getRecentActivities(limit) });
  } catch (error) {
    console.error("[Activity API]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
