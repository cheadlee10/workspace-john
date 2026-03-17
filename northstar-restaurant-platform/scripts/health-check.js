#!/usr/bin/env node
/**
 * NorthStar Synergy — Integration Health Check
 *
 * Tests every external service connection and prints RED/GREEN status.
 * Run before every deploy: node scripts/health-check.js
 */

require("dotenv").config({ path: ".env.local" });

const results = [];

function ok(name, detail) {
  results.push({ name, status: "OK", detail });
  console.log(`  \x1b[32m✓ ${name}\x1b[0m — ${detail}`);
}

function fail(name, detail) {
  results.push({ name, status: "FAIL", detail });
  console.log(`  \x1b[31m✗ ${name}\x1b[0m — ${detail}`);
}

function skip(name, detail) {
  results.push({ name, status: "SKIP", detail });
  console.log(`  \x1b[33m○ ${name}\x1b[0m — ${detail}`);
}

async function checkEnvVar(name, label) {
  const val = process.env[name];
  if (val && val.trim().length > 0) {
    ok(label, `${name} is set (${val.length} chars)`);
    return true;
  } else {
    fail(label, `${name} is EMPTY or missing`);
    return false;
  }
}

async function checkSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) { fail("Supabase", "Missing URL or service role key"); return; }

  try {
    const res = await fetch(`${url}/rest/v1/restaurants?select=id&limit=1`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    if (res.ok) {
      const data = await res.json();
      ok("Supabase", `Connected — ${data.length >= 0 ? "query OK" : "empty"}`);
    } else {
      fail("Supabase", `HTTP ${res.status}: ${res.statusText}`);
    }
  } catch (e) {
    fail("Supabase", `Connection error: ${e.message}`);
  }
}

async function checkResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) { fail("Resend", "RESEND_API_KEY is empty"); return; }

  try {
    const res = await fetch("https://api.resend.com/domains", {
      headers: { Authorization: `Bearer ${key}` },
    });
    if (res.ok) {
      const data = await res.json();
      const domains = data.data || [];
      ok("Resend", `API key valid — ${domains.length} domain(s) verified`);
      for (const d of domains) {
        console.log(`         domain: ${d.name} (${d.status})`);
      }
    } else {
      fail("Resend", `HTTP ${res.status}: ${await res.text()}`);
    }
  } catch (e) {
    fail("Resend", `Connection error: ${e.message}`);
  }
}

async function checkLob() {
  const key = process.env.LOB_API_KEY;
  if (!key) { fail("Lob", "LOB_API_KEY is empty"); return; }

  try {
    const auth = Buffer.from(`${key}:`).toString("base64");
    const res = await fetch("https://api.lob.com/v1/addresses?limit=1", {
      headers: { Authorization: `Basic ${auth}` },
    });
    if (res.ok) {
      const isLive = key.startsWith("live_");
      ok("Lob", `API key valid (${isLive ? "LIVE — real mail" : "TEST — no real mail"})`);
    } else {
      fail("Lob", `HTTP ${res.status}: ${await res.text()}`);
    }
  } catch (e) {
    fail("Lob", `Connection error: ${e.message}`);
  }
}

async function checkStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) { fail("Stripe", "STRIPE_SECRET_KEY is empty"); return; }

  try {
    const auth = Buffer.from(`${key}:`).toString("base64");
    const res = await fetch("https://api.stripe.com/v1/products?limit=1", {
      headers: { Authorization: `Basic ${auth}` },
    });
    if (res.ok) {
      const isLive = key.startsWith("sk_live_");
      ok("Stripe", `API key valid (${isLive ? "LIVE" : "TEST mode"})`);
    } else {
      fail("Stripe", `HTTP ${res.status}: ${await res.text()}`);
    }
  } catch (e) {
    fail("Stripe", `Connection error: ${e.message}`);
  }
}

async function checkOpenRouter() {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) { fail("OpenRouter", "OPENROUTER_API_KEY is empty"); return; }

  try {
    const res = await fetch("https://openrouter.ai/api/v1/auth/key", {
      headers: { Authorization: `Bearer ${key}` },
    });
    if (res.ok) {
      const data = await res.json();
      const balance = data.data?.limit_remaining;
      ok("OpenRouter", `API key valid — balance: $${balance != null ? (balance / 100).toFixed(2) : "unknown"}`);
    } else {
      fail("OpenRouter", `HTTP ${res.status}: ${await res.text()}`);
    }
  } catch (e) {
    fail("OpenRouter", `Connection error: ${e.message}`);
  }
}

async function checkGooglePlaces() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) { fail("Google Places", "GOOGLE_PLACES_API_KEY is empty"); return; }

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant+seattle&key=${key}`
    );
    if (res.ok) {
      const data = await res.json();
      if (data.status === "OK") {
        ok("Google Places", `API key valid — ${data.results.length} results returned`);
      } else {
        fail("Google Places", `API returned: ${data.status} — ${data.error_message || ""}`);
      }
    } else {
      fail("Google Places", `HTTP ${res.status}`);
    }
  } catch (e) {
    fail("Google Places", `Connection error: ${e.message}`);
  }
}

async function checkCloudinary() {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud || !apiKey || !secret) { fail("Cloudinary", "Missing cloud name, API key, or secret"); return; }

  try {
    const auth = Buffer.from(`${apiKey}:${secret}`).toString("base64");
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/resources/image?max_results=1`, {
      headers: { Authorization: `Basic ${auth}` },
    });
    if (res.ok) {
      ok("Cloudinary", `Connected to cloud: ${cloud}`);
    } else {
      fail("Cloudinary", `HTTP ${res.status}: ${await res.text()}`);
    }
  } catch (e) {
    fail("Cloudinary", `Connection error: ${e.message}`);
  }
}

async function checkFal() {
  const key = process.env.FAL_API_KEY;
  if (!key) { fail("FAL.ai", "FAL_API_KEY is empty"); return; }
  // FAL doesn't have a simple auth-check endpoint, so just verify key format
  if (key.includes(":")) {
    ok("FAL.ai", `API key set (${key.substring(0, 8)}...)`);
  } else {
    fail("FAL.ai", "Key format looks wrong (expected UUID:secret)");
  }
}

async function checkTwilio() {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const phone = process.env.TWILIO_PHONE_NUMBER;
  if (!sid || !token || !phone) {
    skip("Twilio", "Credentials not configured (SID/token/phone empty)");
    return;
  }

  try {
    const auth = Buffer.from(`${sid}:${token}`).toString("base64");
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}.json`, {
      headers: { Authorization: `Basic ${auth}` },
    });
    if (res.ok) {
      ok("Twilio", `Account active, phone: ${phone}`);
    } else {
      fail("Twilio", `HTTP ${res.status}: ${await res.text()}`);
    }
  } catch (e) {
    fail("Twilio", `Connection error: ${e.message}`);
  }
}

async function main() {
  console.log("\n╔══════════════════════════════════════════════╗");
  console.log("║  NorthStar Synergy — Integration Health Check ║");
  console.log("╚══════════════════════════════════════════════╝\n");

  console.log("ENV VARS:");
  await checkEnvVar("CRON_SECRET", "Cron Secret");
  await checkEnvVar("RESEND_WEBHOOK_SECRET", "Resend Webhook Secret");
  await checkEnvVar("WARMUP_START_DATE", "Warmup Start Date");

  console.log("\nSERVICES:");
  await checkSupabase();
  await checkResend();
  await checkLob();
  await checkStripe();
  await checkOpenRouter();
  await checkGooglePlaces();
  await checkCloudinary();
  await checkFal();
  await checkTwilio();

  // Summary
  const passed = results.filter(r => r.status === "OK").length;
  const failed = results.filter(r => r.status === "FAIL").length;
  const skipped = results.filter(r => r.status === "SKIP").length;

  console.log("\n" + "═".repeat(50));
  console.log(`  \x1b[32m${passed} passed\x1b[0m  \x1b[31m${failed} failed\x1b[0m  \x1b[33m${skipped} skipped\x1b[0m`);

  if (failed > 0) {
    console.log("\n  \x1b[31mFAILED SERVICES:\x1b[0m");
    for (const r of results.filter(r => r.status === "FAIL")) {
      console.log(`    ✗ ${r.name}: ${r.detail}`);
    }
  }

  console.log("");
  process.exit(failed > 0 ? 1 : 0);
}

main().catch(e => { console.error(e); process.exit(1); });
