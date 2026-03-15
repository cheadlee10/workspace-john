/**
 * Daily Pipeline Report Formatter
 *
 * Converts a PipelineResult into a clean, scannable plain-text email
 * for Craig. No fluff, just the numbers and any issues that need attention.
 */

import type { PipelineResult, QaCheckResult } from "./orchestrator";

/**
 * Format a PipelineResult into a plain-text email body.
 */
export function formatDailyReport(result: PipelineResult): {
  subject: string;
  body: string;
} {
  const date = new Date(result.startedAt).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const durationSec = (result.durationMs / 1000).toFixed(1);
  const hasErrors = result.errors.length > 0;
  const qaFailures = result.qaResults.filter((q) => !q.passed);

  // Subject line: green if clean, yellow if warnings
  const statusEmoji = hasErrors ? "[!]" : "[OK]";
  const subject = `${statusEmoji} Pipeline Report ${date} -- ${result.sitesBuilt} built, ${result.emailsSent} sent`;

  const lines: string[] = [];

  // Header
  lines.push("=".repeat(60));
  lines.push(`  NORTHSTAR DAILY PIPELINE REPORT`);
  lines.push(`  ${date}`);
  lines.push("=".repeat(60));
  lines.push("");

  // Summary
  lines.push("SUMMARY");
  lines.push("-".repeat(40));
  lines.push(`  Prospects discovered:  ${result.discovered}`);
  lines.push(`  Sites built:           ${result.sitesBuilt}`);
  lines.push(`  Emails sent:           ${result.emailsSent}`);
  lines.push(`  Postcards queued:      ${result.postcardsQueued}`);
  lines.push(`  Follow-ups processed:  ${result.followUpsProcessed}`);
  lines.push(`  Duration:              ${durationSec}s`);
  lines.push(`  Errors:                ${result.errors.length}`);
  lines.push("");

  // QA Results
  if (result.qaResults.length > 0) {
    lines.push("QA RESULTS");
    lines.push("-".repeat(40));

    const passed = result.qaResults.filter((q) => q.passed);
    const failed = result.qaResults.filter((q) => !q.passed);

    if (passed.length > 0) {
      lines.push(`  Passed (${passed.length}):`);
      for (const qa of passed) {
        lines.push(`    [PASS] ${qa.slug}`);
      }
    }

    if (failed.length > 0) {
      lines.push(`  Failed (${failed.length}):`);
      for (const qa of failed) {
        lines.push(`    [FAIL] ${qa.slug}`);
        for (const issue of qa.issues) {
          lines.push(`           - ${issue}`);
        }
      }
    }

    lines.push("");
  }

  // Geographic Expansion
  if (result.expansionStatus) {
    const geo = result.expansionStatus;
    const ringNames = ["Greater Seattle", "Washington State", "Pacific Northwest", "West Coast", "National"];
    const ringLabel = ringNames[geo.currentRing] ?? `Ring ${geo.currentRing}`;

    lines.push("GEOGRAPHIC EXPANSION");
    lines.push("-".repeat(40));
    lines.push(`  Current ring:       ${geo.currentRing} (${ringLabel})`);
    lines.push(`  Current state:      ${geo.currentState}`);
    lines.push(`  Cities prospected:  ${geo.citiesProspected}`);
    lines.push(`  Cities remaining:   ${geo.citiesRemaining}`);

    if (result.citiesTargeted && result.citiesTargeted.length > 0) {
      lines.push(`  Targeted this run:  ${result.citiesTargeted.join(", ")}`);
    }

    if (result.citiesExhausted && result.citiesExhausted.length > 0) {
      lines.push(`  Newly exhausted:    ${result.citiesExhausted.join(", ")}`);
    }

    lines.push("");
  }

  // Errors
  if (hasErrors) {
    lines.push("ERRORS (need attention)");
    lines.push("-".repeat(40));
    for (let i = 0; i < result.errors.length; i++) {
      lines.push(`  ${i + 1}. ${result.errors[i]}`);
    }
    lines.push("");
  }

  // Timing
  lines.push("TIMING");
  lines.push("-".repeat(40));
  lines.push(`  Started:   ${formatTime(result.startedAt)}`);
  lines.push(`  Completed: ${formatTime(result.completedAt)}`);
  lines.push(`  Duration:  ${durationSec} seconds`);
  lines.push("");

  // Footer
  lines.push("=".repeat(60));
  lines.push("  NorthStar Synergy -- Autonomous Pipeline");
  lines.push("  https://northstar-restaurant-platform.vercel.app/admin/dashboard");
  lines.push("=".repeat(60));

  return {
    subject,
    body: lines.join("\n"),
  };
}

/**
 * Format a follow-up processing result for inclusion in reports.
 */
export function formatFollowUpSummary(result: {
  processed: number;
  errors: string[];
}): string {
  const lines: string[] = [];
  lines.push(`Follow-ups processed: ${result.processed}`);
  if (result.errors.length > 0) {
    lines.push(`Follow-up errors: ${result.errors.length}`);
    for (const err of result.errors) {
      lines.push(`  - ${err}`);
    }
  }
  return lines.join("\n");
}

/**
 * Generate a condensed one-line summary for logging.
 */
export function formatOneLiner(result: PipelineResult): string {
  return (
    `Pipeline: ${result.discovered} found, ` +
    `${result.sitesBuilt} built, ` +
    `${result.emailsSent} emails, ` +
    `${result.postcardsQueued} postcards, ` +
    `${result.followUpsProcessed} follow-ups, ` +
    `${result.errors.length} errors ` +
    `(${(result.durationMs / 1000).toFixed(1)}s)`
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatTime(iso: string): string {
  if (!iso) return "N/A";
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "America/Los_Angeles",
    }) + " PT";
  } catch {
    return iso;
  }
}
