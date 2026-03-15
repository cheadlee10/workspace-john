#!/usr/bin/env node
/**
 * CLI Script: Run Daily Pipeline Manually
 *
 * Triggers the pipeline cron endpoint on your running local or deployed server.
 * This avoids needing tsx/ts-node and path alias resolution.
 *
 * Usage:
 *   node scripts/run-pipeline.js                        # hit localhost:3000
 *   node scripts/run-pipeline.js --dry-run              # set PIPELINE_DRY_RUN=true first
 *   node scripts/run-pipeline.js --url https://northstar-restaurant-platform.vercel.app
 *
 * Environment:
 *   CRON_SECRET  - Required. Must match the server's CRON_SECRET.
 *   Reads from .env.local automatically.
 */

require("dotenv").config({ path: ".env.local" });

const DEFAULT_URL = "http://localhost:3000";

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const urlIdx = args.indexOf("--url");
  const baseUrl =
    urlIdx !== -1 && args[urlIdx + 1]
      ? args[urlIdx + 1]
      : DEFAULT_URL;

  const cronSecret = process.env.CRON_SECRET;
  if (!cronSecret) {
    console.error("ERROR: CRON_SECRET not set. Add it to .env.local");
    process.exit(1);
  }

  if (dryRun) {
    console.log("NOTE: --dry-run flag detected.");
    console.log("      Make sure PIPELINE_DRY_RUN=true is set on the server.");
  }

  const endpoint = `${baseUrl}/api/cron/pipeline`;

  console.log("========================================");
  console.log("  NorthStar Pipeline - Manual Trigger");
  console.log("========================================");
  console.log(`  Target: ${endpoint}`);
  console.log(`  Dry run: ${dryRun ? "YES (server-side)" : "NO"}`);
  console.log("========================================");
  console.log("");
  console.log("Sending request...");

  const startMs = Date.now();

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cronSecret}`,
        Accept: "application/json",
      },
    });

    const elapsed = ((Date.now() - startMs) / 1000).toFixed(1);

    if (!response.ok) {
      const text = await response.text();
      console.error(`\nERROR: HTTP ${response.status}`);
      console.error(text);
      process.exit(1);
    }

    const result = await response.json();

    console.log(`\nCompleted in ${elapsed}s\n`);
    console.log("========================================");
    console.log("  RESULTS");
    console.log("========================================");
    console.log(`  Discovered:        ${result.discovered ?? "N/A"}`);
    console.log(`  Sites built:       ${result.sitesBuilt ?? "N/A"}`);
    console.log(`  Emails sent:       ${result.emailsSent ?? "N/A"}`);
    console.log(`  Postcards queued:  ${result.postcardsQueued ?? "N/A"}`);
    console.log(`  Follow-ups:        ${result.followUpsProcessed ?? "N/A"}`);
    console.log(`  Errors:            ${(result.errors || []).length}`);
    console.log(`  Duration:          ${result.durationMs ? (result.durationMs / 1000).toFixed(1) + "s" : "N/A"}`);

    // QA results
    if (result.qaResults && result.qaResults.length > 0) {
      console.log("");
      console.log("  QA Results:");
      for (const qa of result.qaResults) {
        const status = qa.passed ? "PASS" : "FAIL";
        console.log(`    [${status}] ${qa.slug}`);
        if (!qa.passed && qa.issues) {
          for (const issue of qa.issues) {
            console.log(`           - ${issue}`);
          }
        }
      }
    }

    // Errors
    if (result.errors && result.errors.length > 0) {
      console.log("");
      console.log("  Errors:");
      for (let i = 0; i < result.errors.length; i++) {
        console.log(`    ${i + 1}. ${result.errors[i]}`);
      }
    }

    console.log("========================================");

    // Exit with error code if critical failures
    if (
      result.errors &&
      result.errors.length > 0 &&
      result.sitesBuilt === 0 &&
      result.discovered > 0
    ) {
      process.exit(1);
    }
  } catch (err) {
    const elapsed = ((Date.now() - startMs) / 1000).toFixed(1);
    console.error(`\nFATAL ERROR after ${elapsed}s:`, err.message || err);

    if (baseUrl === DEFAULT_URL) {
      console.error(
        "\nIs the dev server running? Start it with: npm run dev"
      );
    }

    process.exit(2);
  }
}

main();
