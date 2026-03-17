/**
 * Reset Geo-Expansion — Unblock the Pipeline
 *
 * Resets all exhausted/active cities back to "pending" so the daily pipeline
 * can discover new restaurants again. Also seeds Oregon and Idaho cities
 * if they haven't been touched yet.
 *
 * Usage:
 *   node scripts/reset-geo-expansion.js                 # Reset Ring 1 (WA, OR, ID)
 *   node scripts/reset-geo-expansion.js --state WA      # Reset just Washington
 *   node scripts/reset-geo-expansion.js --ring 2        # Reset Ring 2 (CA, NV, MT, WY)
 *   node scripts/reset-geo-expansion.js --all           # Reset everything
 *   node scripts/reset-geo-expansion.js --status        # Just show current status
 */

require("dotenv").config({ path: ".env.local" });

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = `https://${process.env.SUPABASE_PROJECT_REF || "huqqrxdkvikbjozotous"}.supabase.co`;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseKey) {
  console.error("Missing SUPABASE_SERVICE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const RINGS = [
  ["WA", "OR", "ID"],
  ["CA", "NV", "MT", "WY"],
  ["AZ", "UT", "CO", "NM"],
  ["TX", "OK", "KS", "NE", "SD", "ND"],
  ["MN", "IA", "MO", "AR", "LA", "WI", "IL", "MI", "IN", "OH"],
  ["MS", "AL", "GA", "FL", "SC", "NC", "TN", "KY", "WV", "VA"],
  ["PA", "NY", "NJ", "CT", "RI", "MA", "VT", "NH", "ME", "MD", "DE", "DC"],
  ["HI", "AK"],
];

async function getStatus() {
  const { data, error } = await supabase
    .from("geo_progress")
    .select("*")
    .order("id");

  if (error) {
    // Table might not exist yet
    if (error.code === "42P01" || error.message?.includes("does not exist")) {
      console.log("\n  geo_progress table does not exist yet.");
      console.log("  The pipeline will create it on first run, OR you can create it with:\n");
      console.log("  CREATE TABLE geo_progress (");
      console.log("    id TEXT PRIMARY KEY,");
      console.log("    state TEXT NOT NULL,");
      console.log("    city TEXT NOT NULL,");
      console.log("    status TEXT DEFAULT 'pending',");
      console.log("    prospects_found INTEGER DEFAULT 0,");
      console.log("    sites_built INTEGER DEFAULT 0,");
      console.log("    last_prospected_at TIMESTAMPTZ,");
      console.log("    created_at TIMESTAMPTZ DEFAULT now()");
      console.log("  );\n");
      return null;
    }
    console.error("Error querying geo_progress:", error.message);
    return null;
  }

  return data || [];
}

async function showStatus() {
  const data = await getStatus();
  if (!data) return;

  if (data.length === 0) {
    console.log("\n  geo_progress table is empty — pipeline has fresh cities to work with.\n");
    return;
  }

  const byStatus = { pending: 0, active: 0, exhausted: 0, skipped: 0 };
  const byState = {};

  for (const row of data) {
    byStatus[row.status] = (byStatus[row.status] || 0) + 1;
    if (!byState[row.state]) byState[row.state] = { total: 0, exhausted: 0, active: 0, pending: 0, prospects: 0, sites: 0 };
    byState[row.state].total++;
    byState[row.state][row.status] = (byState[row.state][row.status] || 0) + 1;
    byState[row.state].prospects += row.prospects_found || 0;
    byState[row.state].sites += row.sites_built || 0;
  }

  console.log("\n  === Geo-Expansion Status ===\n");
  console.log(`  Total cities tracked: ${data.length}`);
  console.log(`  Pending:   ${byStatus.pending || 0}`);
  console.log(`  Active:    ${byStatus.active || 0}`);
  console.log(`  Exhausted: ${byStatus.exhausted || 0}`);
  console.log(`  Skipped:   ${byStatus.skipped || 0}`);
  console.log("\n  By state:");

  for (const [state, stats] of Object.entries(byState).sort()) {
    const s = stats;
    console.log(`    ${state}: ${s.total} cities (${s.exhausted} exhausted, ${s.active} active, ${s.pending} pending) — ${s.prospects} prospects, ${s.sites} sites`);
  }
  console.log();
}

async function resetStates(stateCodes) {
  console.log(`\n  Resetting cities in: ${stateCodes.join(", ")}...\n`);

  const { data, error } = await supabase
    .from("geo_progress")
    .update({
      status: "pending",
      prospects_found: 0,
      sites_built: 0,
      last_prospected_at: null,
    })
    .in("state", stateCodes)
    .select();

  if (error) {
    if (error.code === "42P01" || error.message?.includes("does not exist")) {
      console.log("  geo_progress table doesn't exist — nothing to reset. Pipeline will start fresh.\n");
      return;
    }
    console.error("  Error:", error.message);
    return;
  }

  const count = data?.length || 0;
  if (count > 0) {
    console.log(`  Reset ${count} cities back to "pending".\n`);
  } else {
    console.log(`  No cities found for ${stateCodes.join(", ")} — they haven't been prospected yet (good, pipeline will pick them up).\n`);
  }
}

async function resetAll() {
  console.log("\n  Resetting ALL cities...\n");

  const { data, error } = await supabase
    .from("geo_progress")
    .update({
      status: "pending",
      prospects_found: 0,
      sites_built: 0,
      last_prospected_at: null,
    })
    .neq("status", "___never_match___")
    .select();

  if (error) {
    if (error.code === "42P01" || error.message?.includes("does not exist")) {
      console.log("  geo_progress table doesn't exist — nothing to reset.\n");
      return;
    }
    console.error("  Error:", error.message);
    return;
  }

  console.log(`  Reset ${data?.length || 0} cities back to "pending".\n`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--status")) {
    await showStatus();
    return;
  }

  // Show status first
  await showStatus();

  if (args.includes("--all")) {
    await resetAll();
  } else if (args.includes("--state")) {
    const stateIdx = args.indexOf("--state");
    const stateCode = args[stateIdx + 1]?.toUpperCase();
    if (!stateCode) {
      console.error("  Usage: --state WA");
      process.exit(1);
    }
    await resetStates([stateCode]);
  } else if (args.includes("--ring")) {
    const ringIdx = args.indexOf("--ring");
    const ringNum = parseInt(args[ringIdx + 1]);
    if (!ringNum || ringNum < 1 || ringNum > RINGS.length) {
      console.error(`  Usage: --ring <1-${RINGS.length}>`);
      process.exit(1);
    }
    const states = RINGS[ringNum - 1];
    console.log(`  Ring ${ringNum}: ${states.join(", ")}`);
    await resetStates(states);
  } else {
    // Default: reset Ring 1 (WA, OR, ID)
    console.log("  Defaulting to Ring 1 reset (WA, OR, ID)...");
    await resetStates(RINGS[0]);
  }

  // Show status after
  console.log("  --- After Reset ---");
  await showStatus();
}

main().catch(console.error);
