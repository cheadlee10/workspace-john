#!/usr/bin/env node
/**
 * Continuous Pipeline Loop Runner
 *
 * Runs the NorthStar pipeline in a continuous loop, building high-quality
 * restaurant demo sites 24/7 without human intervention.
 *
 * Usage:
 *   node scripts/run-pipeline-loop.js
 *   node scripts/run-pipeline-loop.js --batch-size 3
 *   node scripts/run-pipeline-loop.js --cooldown 120
 *   node scripts/run-pipeline-loop.js --max-sites 50
 *   node scripts/run-pipeline-loop.js --dry-run
 *
 * Options:
 *   --batch-size N    Sites per batch (default: 5)
 *   --cooldown N      Seconds between batches (default: 60)
 *   --max-sites N     Stop after N total sites (default: unlimited)
 *   --max-hours N     Stop after N hours (default: 24)
 *   --dry-run         Build sites but don't send outreach
 *   --report-every N  Send summary report every N batches (default: 10)
 *
 * Environment: reads from .env.local in the project root.
 *
 * Rate limit safety:
 *   - 60s cooldown between batches (configurable)
 *   - OpenRouter: ~2 calls/site → 10 calls/batch → within any tier's RPM
 *   - Resend: tracked by send-throttle (warmup schedule enforced)
 *   - Google Places: 100 QPS (never a bottleneck)
 *   - Cloudinary: 1 upload/site → well within limits
 */

const path = require("path");
const fs = require("fs");

// Load .env.local
const envPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
}

// Parse CLI args
const args = process.argv.slice(2);
function getArg(name, defaultVal) {
  const idx = args.indexOf(`--${name}`);
  if (idx === -1) return defaultVal;
  if (typeof defaultVal === "boolean") return true;
  return args[idx + 1] ? (typeof defaultVal === "number" ? Number(args[idx + 1]) : args[idx + 1]) : defaultVal;
}

const BATCH_SIZE = getArg("batch-size", 5);
const COOLDOWN_SECS = getArg("cooldown", 60);
const MAX_SITES = getArg("max-sites", Infinity);
const MAX_HOURS = getArg("max-hours", 24);
const DRY_RUN = getArg("dry-run", false);
const REPORT_EVERY = getArg("report-every", 10);

// Hit the cron pipeline endpoint
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://northstar-restaurant-platform.vercel.app";
const CRON_SECRET = process.env.CRON_SECRET;

if (!CRON_SECRET) {
  console.error("ERROR: CRON_SECRET not found in .env.local");
  process.exit(1);
}

// Aggregated stats
const totals = {
  batches: 0,
  discovered: 0,
  sitesBuilt: 0,
  emailsSent: 0,
  postcardsQueued: 0,
  followUpsProcessed: 0,
  errors: 0,
  startedAt: new Date().toISOString(),
};

function pad(n) {
  return String(n).padStart(2, "0");
}

function timestamp() {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function elapsed() {
  const ms = Date.now() - new Date(totals.startedAt).getTime();
  const hrs = Math.floor(ms / 3600000);
  const mins = Math.floor((ms % 3600000) / 60000);
  return `${hrs}h${pad(mins)}m`;
}

async function runBatch(batchNum) {
  const url = `${BASE_URL}/api/cron/pipeline`;
  console.log(`\n[${ timestamp()}] === BATCH #${batchNum} (${elapsed()} elapsed) ===`);
  console.log(`[${timestamp()}] Requesting ${BATCH_SIZE} sites from ${url}...`);

  try {
    // Override PIPELINE_DAILY_LIMIT for this batch
    const requestUrl = new URL(url);
    if (DRY_RUN) requestUrl.searchParams.set("dryRun", "true");

    const res = await fetch(requestUrl.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${CRON_SECRET}`,
        "X-Pipeline-Limit": String(BATCH_SIZE), // Custom header to override limit
      },
      signal: AbortSignal.timeout(300_000), // 5 minute timeout per batch
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`[${timestamp()}] ERROR: HTTP ${res.status} — ${text.slice(0, 200)}`);
      totals.errors++;
      return null;
    }

    const data = await res.json();
    const r = data.result || data;

    // Update totals
    totals.batches++;
    totals.discovered += r.discovered || 0;
    totals.sitesBuilt += r.sitesBuilt || 0;
    totals.emailsSent += r.emailsSent || 0;
    totals.postcardsQueued += r.postcardsQueued || 0;
    totals.followUpsProcessed += r.followUpsProcessed || 0;
    totals.errors += (r.errors?.length || 0);

    // Print batch results
    console.log(`[${timestamp()}] Batch #${batchNum} complete in ${((r.durationMs || 0) / 1000).toFixed(1)}s`);
    console.log(`  Discovered: ${r.discovered || 0}`);
    console.log(`  Sites built: ${r.sitesBuilt || 0}`);
    console.log(`  Emails sent: ${r.emailsSent || 0}`);
    console.log(`  Postcards: ${r.postcardsQueued || 0}`);
    console.log(`  Follow-ups: ${r.followUpsProcessed || 0}`);
    if (r.errors?.length > 0) {
      console.log(`  Errors: ${r.errors.length}`);
      for (const e of r.errors.slice(0, 3)) {
        console.log(`    - ${e.slice(0, 120)}`);
      }
    }

    // QA summary
    if (r.qaResults?.length > 0) {
      const passed = r.qaResults.filter((q) => q.passed).length;
      const failed = r.qaResults.filter((q) => !q.passed).length;
      console.log(`  QA: ${passed} passed, ${failed} failed`);
    }

    return r;
  } catch (err) {
    console.error(`[${timestamp()}] BATCH ERROR: ${err.message}`);
    totals.errors++;
    return null;
  }
}

function printSummary() {
  const rate = totals.sitesBuilt > 0
    ? ((Date.now() - new Date(totals.startedAt).getTime()) / totals.sitesBuilt / 1000).toFixed(0)
    : "N/A";

  console.log("\n" + "=".repeat(60));
  console.log("  PIPELINE LOOP SUMMARY");
  console.log("=".repeat(60));
  console.log(`  Running since: ${totals.startedAt}`);
  console.log(`  Elapsed:       ${elapsed()}`);
  console.log(`  Batches:       ${totals.batches}`);
  console.log(`  Discovered:    ${totals.discovered}`);
  console.log(`  Sites Built:   ${totals.sitesBuilt}`);
  console.log(`  Emails Sent:   ${totals.emailsSent}`);
  console.log(`  Postcards:     ${totals.postcardsQueued}`);
  console.log(`  Follow-ups:    ${totals.followUpsProcessed}`);
  console.log(`  Errors:        ${totals.errors}`);
  console.log(`  Avg time/site: ${rate}s`);
  console.log(`  Projected 24h: ~${rate !== "N/A" ? Math.floor(86400 / Number(rate)) : "?"} sites`);
  console.log("=".repeat(60));
}

async function sleep(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

async function main() {
  console.log("=".repeat(60));
  console.log("  NORTHSTAR PIPELINE — CONTINUOUS LOOP");
  console.log("=".repeat(60));
  console.log(`  Batch size:    ${BATCH_SIZE} sites`);
  console.log(`  Cooldown:      ${COOLDOWN_SECS}s between batches`);
  console.log(`  Max sites:     ${MAX_SITES === Infinity ? "unlimited" : MAX_SITES}`);
  console.log(`  Max hours:     ${MAX_HOURS}`);
  console.log(`  Dry run:       ${DRY_RUN}`);
  console.log(`  Report every:  ${REPORT_EVERY} batches`);
  console.log(`  Target:        ${BASE_URL}`);
  console.log("=".repeat(60));

  const startMs = Date.now();
  const maxMs = MAX_HOURS * 3600 * 1000;
  let batchNum = 0;

  while (true) {
    batchNum++;

    // Check stop conditions
    if (totals.sitesBuilt >= MAX_SITES) {
      console.log(`\n[${timestamp()}] Reached max sites (${MAX_SITES}). Stopping.`);
      break;
    }
    if (Date.now() - startMs >= maxMs) {
      console.log(`\n[${timestamp()}] Reached max hours (${MAX_HOURS}). Stopping.`);
      break;
    }

    // Run batch
    await runBatch(batchNum);

    // Periodic summary
    if (batchNum % REPORT_EVERY === 0) {
      printSummary();
    }

    // Cooldown
    console.log(`[${timestamp()}] Cooling down ${COOLDOWN_SECS}s...`);
    await sleep(COOLDOWN_SECS);
  }

  // Final summary
  printSummary();
}

main().catch((err) => {
  console.error("FATAL:", err);
  process.exit(1);
});
