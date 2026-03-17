/**
 * Daily Call Sheet Generator for John
 *
 * Pulls all leads with phone numbers from Supabase, prioritizes them,
 * and generates a call sheet with natural, human conversation guides.
 *
 * Usage:
 *   node scripts/generate-call-sheet.js                  # Today's call sheet
 *   node scripts/generate-call-sheet.js --top 10         # Top 10 only
 *   node scripts/generate-call-sheet.js --state WA       # Filter by state
 *   node scripts/generate-call-sheet.js --warm-only      # Only warm leads (opened email)
 *
 * Output: prints to console + saves to call-sheets/YYYY-MM-DD.md
 */

require("dotenv").config({ path: ".env.local" });

const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = `https://${process.env.SUPABASE_PROJECT_REF || "huqqrxdkvikbjozotous"}.supabase.co`;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseKey) {
  console.error("Missing SUPABASE_SERVICE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ---------------------------------------------------------------------------
// Lead scoring for call priority
// ---------------------------------------------------------------------------

function scoreForCalling(lead) {
  let score = 0;

  // Has phone? (required)
  if (!lead.phone) return -1;

  // Higher Google rating = higher quality restaurant = better fit
  const rating = lead.score || 50;
  score += rating;

  // Postcard sent but no reply = warm, worth calling
  const history = lead.outreach_history || [];
  const postcardSent = history.some((e) => e.type === "postcard" && e.status === "sent");
  const emailOpened = history.some((e) => e.type === "email" && e.openedAt);
  const callMade = history.some((e) => e.type === "call");
  const replied = history.some((e) => e.repliedAt);

  if (emailOpened && !replied) score += 40; // Warm lead — opened but didn't reply
  if (postcardSent) score += 20; // Already got physical mail, follow up
  if (!callMade) score += 15; // Never been called — fresh opportunity
  if (replied) score -= 100; // Already engaged, don't cold call

  // Penalize DNC
  if (lead.stage === "dnc" || lead.stage === "churned") return -1;

  // Prioritize certain stages
  if (lead.stage === "outreach") score += 10;
  if (lead.stage === "demo") score += 25;
  if (lead.stage === "proposal") score += 30;

  return score;
}

// ---------------------------------------------------------------------------
// Natural conversation guide — NOT a script to read verbatim
// ---------------------------------------------------------------------------

function generateConversationGuide(lead) {
  const name = lead.restaurant_name;
  const city = lead.city;
  const state = lead.state;
  const phone = lead.phone;
  const previewUrl = lead.preview_url || `https://northstar-restaurant-platform.vercel.app/demo/${slugify(name)}`;

  const history = lead.outreach_history || [];
  const postcardSent = history.some((e) => e.type === "postcard" && e.status === "sent");
  const emailSent = history.some((e) => e.type === "email" && e.status === "sent");
  const emailOpened = history.some((e) => e.type === "email" && e.openedAt);

  // Pick the right opener based on what touchpoints they've had
  let opener;
  let context;

  if (emailOpened) {
    opener = `Hey, this is John — I sent over a website preview for ${name} the other day. Looks like you had a chance to check it out. What'd you think?`;
    context = "WARM — they opened the email. They've seen the preview. Ask what they thought.";
  } else if (postcardSent && emailSent) {
    opener = `Hi there, this is John. I'm the guy who sent you a postcard and an email about a website for ${name}. Just wanted to follow up real quick — did you get a chance to look at it?`;
    context = "CONTACTED — got both email and postcard. Brief check-in.";
  } else if (postcardSent) {
    opener = `Hey, this is John calling from NorthStar. I mailed you a postcard about a week ago — it had a QR code for a website we put together for ${name}. Did that make it to you?`;
    context = "POSTCARD ONLY — no email on file. Reference the physical mail they received.";
  } else {
    opener = `Hi, is this ${name}? Great — my name's John. I work with local restaurants in the ${city} area, and I noticed you don't have a website up right now. I actually put a preview together for you — can I send you the link real quick?`;
    context = "COLD — first contact. Keep it super casual and short.";
  }

  // Objection responses — conversational, not scripted
  const objections = [
    {
      they_say: `"How much does this cost?"`,
      you_say: `It's $99 a month, no contract. That covers the website, menu updates, Google SEO, the whole thing. Most of my restaurants make that back in a couple online orders.`,
    },
    {
      they_say: `"We're too busy right now"`,
      you_say: `Totally get it — that's why I put the preview together already so there's nothing for you to do. Take a look when you get a sec, it'll take 30 seconds. I can text you the link right now.`,
    },
    {
      they_say: `"We don't need a website"`,
      you_say: `I hear you. The main thing is, right now when someone Googles "${name} ${city}" they don't find a website — they find Yelp and DoorDash taking a cut of your orders. This puts you in control.`,
    },
    {
      they_say: `"Can you call back later?"`,
      you_say: `Of course. When's a good time — before the lunch rush or after the dinner service? I'll text you the preview link so you can peek at it in the meantime.`,
    },
    {
      they_say: `"I already have someone working on a website"`,
      you_say: `Nice, that's great. If you want a second opinion or if that falls through, the preview I built isn't going anywhere. Good luck with it.`,
    },
    {
      they_say: `"Send me more info"`,
      you_say: `Absolutely. What's the best number to text? I'll send the link right now — it's literally your restaurant with your menu already on it, takes 10 seconds to see.`,
    },
  ];

  return { name, city, state, phone, previewUrl, opener, context, objections };
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ---------------------------------------------------------------------------
// Format the call sheet as markdown
// ---------------------------------------------------------------------------

function formatCallSheet(leads, date) {
  let md = "";

  md += `# Daily Call Sheet — ${date}\n\n`;
  md += `**${leads.length} calls to make today.** Start from the top — highest priority first.\n\n`;
  md += `---\n\n`;

  // Quick reference cheat sheet at the top
  md += `## Quick Reference\n\n`;
  md += `**Pricing**: $99/mo Starter | $149/mo Growth (online ordering) | $249/mo Pro (marketing)\n`;
  md += `**No contract.** Cancel anytime.\n`;
  md += `**Onboarding**: 15-min call + they fill out a simple form\n`;
  md += `**Stripe link**: Send after verbal yes\n\n`;
  md += `---\n\n`;

  for (let i = 0; i < leads.length; i++) {
    const guide = leads[i];
    const num = i + 1;

    md += `## ${num}. ${guide.name}\n\n`;
    md += `**Location**: ${guide.city}, ${guide.state}\n`;
    md += `**Phone**: ${guide.phone}\n`;
    md += `**Preview**: ${guide.previewUrl}\n`;
    md += `**Context**: ${guide.context}\n\n`;

    md += `### Open with:\n\n`;
    md += `> ${guide.opener}\n\n`;

    md += `### If they push back:\n\n`;
    for (const obj of guide.objections) {
      md += `**${obj.they_say}**\n`;
      md += `${obj.you_say}\n\n`;
    }

    md += `### Close:\n\n`;
    md += `> If they're interested: "Let me text you the link right now, and we can set up a quick 15-minute call this week to walk through it together. Sound good?"\n\n`;
    md += `> If they need time: "No pressure at all. The preview's live for 30 days — take your time. I'll check back in a week or so."\n\n`;

    md += `---\n\n`;
  }

  md += `\n*Generated ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })} PT*\n`;

  return md;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = process.argv.slice(2);
  const topN = args.includes("--top") ? parseInt(args[args.indexOf("--top") + 1]) || 10 : 20;
  const stateFilter = args.includes("--state") ? args[args.indexOf("--state") + 1]?.toUpperCase() : null;
  const warmOnly = args.includes("--warm-only");

  console.log("\n  Fetching leads from Supabase...\n");

  let query = supabase.from("leads").select("*");

  if (stateFilter) {
    query = query.eq("state", stateFilter);
  }

  const { data: leads, error } = await query;

  if (error) {
    if (error.code === "42P01" || error.message?.includes("does not exist")) {
      console.log("  No leads table found. Run the pipeline first to generate leads.\n");

      // Fall back to local data files
      console.log("  Checking local prospect files...\n");
      return generateFromLocalFiles(topN);
    }
    console.error("  Error:", error.message);
    return;
  }

  if (!leads || leads.length === 0) {
    console.log("  No leads found in database.\n");
    console.log("  Falling back to local prospect files...\n");
    return generateFromLocalFiles(topN);
  }

  // Score and sort
  let scored = leads
    .map((lead) => ({ lead, score: scoreForCalling(lead) }))
    .filter((s) => s.score > 0);

  if (warmOnly) {
    scored = scored.filter((s) => {
      const history = s.lead.outreach_history || [];
      return history.some((e) => e.type === "email" && e.openedAt);
    });
  }

  scored.sort((a, b) => b.score - a.score);
  scored = scored.slice(0, topN);

  if (scored.length === 0) {
    console.log("  No callable leads found (all either DNC, no phone, or already replied).\n");
    return;
  }

  const guides = scored.map((s) => generateConversationGuide(s.lead));
  const today = new Date().toISOString().split("T")[0];
  const md = formatCallSheet(guides, today);

  // Save to file
  const outDir = path.join(__dirname, "..", "call-sheets");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${today}.md`);
  fs.writeFileSync(outPath, md, "utf8");

  console.log(md);
  console.log(`\n  Saved to: ${outPath}\n`);
}

// ---------------------------------------------------------------------------
// Fallback: generate from local JSONL files if DB is empty
// ---------------------------------------------------------------------------

function generateFromLocalFiles(topN) {
  const files = [
    path.join(__dirname, "..", "..", "outreach", "send_queue_2026-03-14_restaurants.jsonl"),
    path.join(__dirname, "..", "..", "outreach", "send_queue_2026-03-05.jsonl"),
  ];

  const leads = [];

  for (const file of files) {
    if (!fs.existsSync(file)) continue;
    const lines = fs.readFileSync(file, "utf8").split("\n").filter(Boolean);
    for (const line of lines) {
      try {
        const entry = JSON.parse(line);
        if (entry.sms_dm_flag?.phone) {
          leads.push({
            restaurant_name: entry.client,
            city: entry.location?.split(",")[0]?.trim() || "",
            state: entry.location?.split(",")[1]?.trim() || "",
            phone: entry.sms_dm_flag.phone,
            preview_url: entry.preview_url,
            outreach_history: [
              entry.email_attempt?.status === "sent" ? { type: "email", status: "sent" } : null,
              entry.postcard_attempt?.status === "queued" ? { type: "postcard", status: "sent" } : null,
            ].filter(Boolean),
            score: 50,
            stage: "outreach",
          });
        }
      } catch {
        // Skip malformed lines
      }
    }
  }

  if (leads.length === 0) {
    console.log("  No local prospect files found with phone numbers.\n");
    return;
  }

  const guides = leads.slice(0, topN).map((lead) => generateConversationGuide(lead));
  const today = new Date().toISOString().split("T")[0];
  const md = formatCallSheet(guides, today);

  const outDir = path.join(__dirname, "..", "call-sheets");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${today}.md`);
  fs.writeFileSync(outPath, md, "utf8");

  console.log(md);
  console.log(`\n  Saved to: ${outPath}\n`);
}

main().catch(console.error);
