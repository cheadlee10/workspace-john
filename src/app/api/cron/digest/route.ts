import { NextRequest, NextResponse } from "next/server";
import { generateWeeklyDigest, sendDigestEmail } from "@/lib/digest/digest-generator";

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
    const digest = await generateWeeklyDigest();

    let sendStatus: { sent: boolean; recipient?: string; error?: string } = {
      sent: false,
    };

    const recipientEmail = process.env.DIGEST_RECIPIENT_EMAIL;
    if (recipientEmail) {
      const result = await sendDigestEmail(digest, recipientEmail);
      sendStatus = {
        sent: result.success,
        recipient: recipientEmail,
        error: result.error,
      };
    }

    return NextResponse.json({
      digest: {
        id: digest.id,
        weekOf: digest.weekOf,
        generatedAt: digest.generatedAt,
        highlights: digest.sections.highlights,
        actionItems: digest.sections.actionItems,
        concerns: digest.sections.concerns,
      },
      sendStatus,
    });
  } catch (error) {
    console.error("[cron/digest] Error:", error);
    return NextResponse.json(
      { error: "Failed to generate digest" },
      { status: 500 }
    );
  }
}
