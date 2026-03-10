import { NextRequest, NextResponse } from "next/server";
import { generateWeeklyDigest, getDigestHistory, sendDigestEmail } from "@/lib/digest/digest-generator";

export async function GET() {
  try {
    return NextResponse.json({ digests: await getDigestHistory() });
  } catch (error) {
    console.error("[Digest API]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, weekOf, email } = body;

    if (action === "generate") {
      const digest = await generateWeeklyDigest(weekOf);
      return NextResponse.json({ digest }, { status: 201 });
    }

    if (action === "send" && email) {
      const digest = await generateWeeklyDigest(weekOf);
      const result = await sendDigestEmail(digest, email);
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
