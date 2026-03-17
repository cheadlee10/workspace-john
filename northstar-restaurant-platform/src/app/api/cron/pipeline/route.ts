import { NextRequest, NextResponse } from "next/server";
import { runDailyPipeline } from "@/lib/pipeline/orchestrator";
import type { PipelineConfig } from "@/lib/pipeline/orchestrator";
import { formatDailyReport, formatOneLiner } from "@/lib/pipeline/daily-report";
import { logActivity } from "@/lib/activity/activity-store";
import { checkUpsellOpportunities, sendUpsellNotification } from "@/lib/pipeline/upsell-scheduler";

/**
 * Cron endpoint for the daily autonomous pipeline.
 *
 * Schedule: 0 16 * * * (4 PM UTC = 9 AM PT)
 * Auth: Bearer CRON_SECRET header (matches existing cron pattern)
 *
 * Flow:
 *   1. Verify CRON_SECRET
 *   2. Build config from env vars
 *   3. Run daily pipeline
 *   4. Process scheduled follow-ups
 *   5. Send daily report email
 *   6. Return JSON result
 */
export async function GET(request: NextRequest) {
  // -----------------------------------------------------------------------
  // Auth: same pattern as /api/cron/sequences
  // -----------------------------------------------------------------------
  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    return NextResponse.json(
      { error: "CRON_SECRET not configured" },
      { status: 503 }
    );
  }

  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // -------------------------------------------------------------------
    // Build pipeline config from environment variables
    // -------------------------------------------------------------------
    const targetAreasRaw = process.env.PIPELINE_TARGET_AREAS || "Seattle WA,Bellevue WA,Tacoma WA,Spokane WA,Olympia WA,Everett WA,Kent WA,Renton WA,Kirkland WA,Redmond WA,Kennewick WA,Yakima WA,Bellingham WA,Vancouver WA";
    const targetAreas = targetAreasRaw.split(",").map((a) => a.trim()).filter(Boolean);

    // Allow overrides from loop runner or query params
    const limitOverride = request.headers.get("x-pipeline-limit");
    const dryRunParam = request.nextUrl.searchParams.get("dryRun");

    const config: PipelineConfig = {
      googleApiKey: process.env.GOOGLE_PLACES_API_KEY || undefined,
      resendApiKey: process.env.RESEND_API_KEY || undefined,
      lobApiKey: process.env.LOB_API_KEY || undefined,
      openRouterApiKey: process.env.OPENROUTER_API_KEY || undefined,
      targetAreas,
      dailyProspectLimit: limitOverride ? Number(limitOverride) : (Number(process.env.PIPELINE_DAILY_LIMIT) || 5),
      dryRun: dryRunParam === "true" || process.env.PIPELINE_DRY_RUN === "true",
      reportEmail: process.env.PIPELINE_REPORT_EMAIL || process.env.ADMIN_EMAIL || "john@northstarsynergy.org",
      baseUrl:
        process.env.NEXT_PUBLIC_BASE_URL ||
        (process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "https://northstar-restaurant-platform.vercel.app"),
      senderEmail: process.env.OUTREACH_SENDER_EMAIL || "hello@northstarsynergy.org",
      senderName: process.env.OUTREACH_SENDER_NAME || "John",
      companyAddress: process.env.OUTREACH_COMPANY_ADDRESS || "NorthStar Synergy, Seattle, WA",
    };

    // -------------------------------------------------------------------
    // Run pipeline
    // -------------------------------------------------------------------
    console.warn("[cron/pipeline] Starting daily pipeline...");
    const result = await runDailyPipeline(config);

    console.warn(`[cron/pipeline] ${formatOneLiner(result)}`);

    // -------------------------------------------------------------------
    // Send daily report email (if Resend key and report email are set)
    // -------------------------------------------------------------------
    if (config.resendApiKey && config.reportEmail) {
      try {
        const report = formatDailyReport(result);

        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${config.resendApiKey}`,
          },
          body: JSON.stringify({
            from: `NorthStar Pipeline <${config.senderEmail}>`,
            to: [config.reportEmail],
            subject: report.subject,
            text: report.body,
          }),
        });

        if (emailResponse.ok) {
          console.warn(`[cron/pipeline] Daily report sent to ${config.reportEmail}`);
        } else {
          const errText = await emailResponse.text();
          console.warn(`[cron/pipeline] Report email failed: ${emailResponse.status} ${errText}`);
        }
      } catch (err) {
        console.warn(
          "[cron/pipeline] Failed to send daily report:",
          err instanceof Error ? err.message : err
        );
      }
    }

    // -------------------------------------------------------------------
    // Check upsell opportunities
    // -------------------------------------------------------------------
    let upsellCount = 0;
    try {
      const opportunities = await checkUpsellOpportunities();
      upsellCount = opportunities.length;
      if (opportunities.length > 0) {
        await sendUpsellNotification(opportunities);
        console.warn(`[cron/pipeline] ${opportunities.length} upsell opportunities found and notified`);
      }
    } catch (err) {
      console.warn("[cron/pipeline] Upsell check failed:", err instanceof Error ? err.message : err);
    }

    // -------------------------------------------------------------------
    // Log activity
    // -------------------------------------------------------------------
    await logActivity({
      type: "system",
      action: "cron_pipeline",
      description: formatOneLiner(result),
    });

    // -------------------------------------------------------------------
    // Return result
    // -------------------------------------------------------------------
    return NextResponse.json({
      success: true,
      ...result,
      upsellOpportunities: upsellCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[cron/pipeline] Fatal error:", error);

    try {
      await logActivity({
        type: "system",
        action: "cron_pipeline_error",
        description: `Pipeline cron fatal error: ${error instanceof Error ? error.message : String(error)}`,
      });
    } catch {
      // Best effort
    }

    return NextResponse.json(
      {
        error: "Pipeline execution failed",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
