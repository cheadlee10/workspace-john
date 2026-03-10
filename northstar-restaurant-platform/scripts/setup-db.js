#!/usr/bin/env node
/**
 * NorthStar Synergy — Database Setup Script
 *
 * Creates all 12 tables in your Supabase database.
 *
 * Usage:
 *   node scripts/setup-db.js YOUR_DATABASE_PASSWORD
 *
 * Get your database password from:
 *   Supabase Dashboard → Settings → Database → Database password
 *   (If you forgot it, click "Reset database password" on that page)
 */

const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

const PASSWORD = process.argv[2] || process.env.SUPABASE_DB_PASSWORD;
const PROJECT_REF = "huqqrxdkvikbjozotous";

if (!PASSWORD) {
  console.error("\n❌ Database password required.\n");
  console.error("Usage:  node scripts/setup-db.js YOUR_DATABASE_PASSWORD\n");
  console.error("Find it at: Supabase Dashboard → Settings → Database → Database password");
  console.error("If you forgot it, click 'Reset database password' on that page.\n");
  process.exit(1);
}

const TABLES = [
  "restaurants", "orders", "leads", "clients", "expenses",
  "revenue", "tickets", "faqs", "sops", "sequences",
  "enrollments", "activities",
];

async function run() {
  const schemaPath = path.join(__dirname, "..", "schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf8");

  // Try pooler first (us-west-2), fall back to direct connection
  const configs = [
    {
      label: "Transaction pooler (us-west-2)",
      host: `aws-0-us-west-2.pooler.supabase.com`,
      port: 6543,
      user: `postgres.${PROJECT_REF}`,
      password: PASSWORD,
      database: "postgres",
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 15000,
    },
    {
      label: "Direct connection",
      host: `db.${PROJECT_REF}.supabase.co`,
      port: 5432,
      user: "postgres",
      password: PASSWORD,
      database: "postgres",
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 15000,
    },
  ];

  let client;
  let connected = false;

  for (const config of configs) {
    console.log(`\n🔌 Trying ${config.label}...`);
    client = new Client(config);
    try {
      await client.connect();
      console.log(`✅ Connected via ${config.label}`);
      connected = true;
      break;
    } catch (err) {
      console.log(`   Failed: ${err.message}`);
      client = null;
    }
  }

  if (!connected || !client) {
    console.error("\n❌ Could not connect to database with any method.");
    console.error("   Double-check your database password.");
    process.exit(1);
  }

  try {
    // Execute schema
    console.log("\n📦 Creating tables...");
    await client.query(schema);
    console.log("✅ Schema executed successfully");

    // Verify all tables exist
    console.log("\n🔍 Verifying tables...");
    const result = await client.query(
      `SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename`
    );
    const existing = result.rows.map((r) => r.tablename);

    let allGood = true;
    for (const table of TABLES) {
      const exists = existing.includes(table);
      console.log(`   ${exists ? "✅" : "❌"} ${table}`);
      if (!exists) allGood = false;
    }

    if (allGood) {
      console.log("\n🎉 All 12 tables created successfully!");
      console.log("   Your database is ready. The app will automatically use Supabase now.\n");
    } else {
      console.error("\n⚠️  Some tables are missing. Check the output above.\n");
      process.exit(1);
    }
  } finally {
    await client.end();
  }
}

run().catch((err) => {
  console.error("\n❌ Migration failed:", err.message);
  process.exit(1);
});
