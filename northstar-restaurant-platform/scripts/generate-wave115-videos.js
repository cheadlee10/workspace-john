#!/usr/bin/env node
/**
 * Generate AI hero videos for wave115 restaurants via FAL.ai
 * Uploads to Cloudinary and outputs the URLs to patch into configs.
 *
 * Usage: node scripts/generate-wave115-videos.js
 */

require("dotenv").config({ path: ".env.local" });

const FAL_KEY = process.env.FAL_API_KEY;
const CLOUD = process.env.CLOUDINARY_CLOUD_NAME;
const CKEY = process.env.CLOUDINARY_API_KEY;
const CSEC = process.env.CLOUDINARY_API_SECRET;

if (!FAL_KEY) { console.error("Missing FAL_API_KEY"); process.exit(1); }
if (!CLOUD || !CKEY || !CSEC) { console.error("Missing Cloudinary env vars"); process.exit(1); }

const crypto = require("crypto");

const restaurants = [
  {
    slug: "bite-restaurant-tacoma",
    name: "bite Restaurant",
    cuisine: "american",
    topItems: ["Seared Sockeye Salmon", "Wagyu Burger", "Pork Belly Sliders"],
  },
  {
    slug: "coopers-food-and-drink-tacoma",
    name: "Cooper's Food & Drink",
    cuisine: "american",
    topItems: ["Sweet Chili Thai Pulled Pork Pizza", "Cooper's Reuben", "Loaded Nachos"],
  },
  {
    slug: "latah-bistro-spokane",
    name: "Latah Bistro",
    cuisine: "french",
    topItems: ["Filet Mignon", "Wild Mushroom Ravioli", "Pig & Fig Pizza"],
  },
  {
    slug: "luna-spokane",
    name: "Luna",
    cuisine: "american",
    topItems: ["Pan-Roasted Sea Bass", "Dungeness Crab Pasta", "Double R Ranch Ribeye"],
  },
  {
    slug: "local-flavors-spokane",
    name: "Local Flavors",
    cuisine: "american",
    topItems: ["The Reuben", "Egger's Charcuterie Board", "Barrelhouse Old Fashioned"],
  },
];

const cuisinePrompts = {
  american: "Extreme close-up, shallow depth of field: a burger patty sizzling on a hot grill, juices dripping, cheese being placed on top and melting slowly. Smoky atmosphere. Warm grill lighting. No faces visible. Background blurred. Cinematic food commercial quality, 24fps.",
  french: "Extreme close-up, shallow depth of field: fresh pasta being tossed in a pan with rich brown butter sauce. Parmesan being grated over the top in slow motion. Warm professional kitchen lighting. No face visible. Background completely blurred. Cinematic food commercial quality, 24fps.",
};

function signCloudinary(params, apiSecret) {
  const toSign = Object.keys(params).sort().map(k => `${k}=${params[k]}`).join("&");
  return crypto.createHash("sha1").update(toSign + apiSecret).digest("hex");
}

async function uploadToCloudinary(videoUrl, publicId) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const params = { folder: "northstar/videos", public_id: publicId, timestamp, overwrite: "true" };
  const signature = signCloudinary(params, CSEC);

  const form = new URLSearchParams();
  form.append("file", videoUrl);
  for (const [k, v] of Object.entries(params)) form.append(k, v);
  form.append("api_key", CKEY);
  form.append("signature", signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/video/upload`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) throw new Error(`Cloudinary upload failed: ${res.status} ${await res.text()}`);
  const data = await res.json();

  return {
    videoUrl: data.secure_url,
    posterUrl: data.secure_url.replace(/\.\w+$/, ".jpg"),
  };
}

async function generateVideo(restaurant) {
  const prompt = `${cuisinePrompts[restaurant.cuisine] || cuisinePrompts.american} The restaurant "${restaurant.name}" is known for: ${restaurant.topItems.join(", ")}.`;

  console.log(`\n--- ${restaurant.name} ---`);
  console.log(`Prompt: ${prompt.substring(0, 100)}...`);
  console.log("Generating video via FAL.ai (this takes 2-4 minutes)...");

  const { fal } = await import("@fal-ai/client");
  fal.config({ credentials: FAL_KEY });

  const start = Date.now();
  const result = await fal.subscribe("fal-ai/kling-video/v2/master/text-to-video", {
    input: { prompt, duration: "5", aspect_ratio: "16:9" },
    logs: true,
    onQueueUpdate: (update) => {
      const elapsed = Math.round((Date.now() - start) / 1000);
      if (elapsed % 30 === 0 || update.status === "COMPLETED") {
        process.stdout.write(`  [${elapsed}s] ${update.status}\r`);
      }
    },
  });

  const falVideo = result.data.video;
  console.log(`  FAL done in ${Math.round((Date.now() - start) / 1000)}s`);
  console.log(`  FAL URL: ${falVideo.url}`);

  // Upload to Cloudinary for permanent hosting
  console.log("  Uploading to Cloudinary...");
  const cloud = await uploadToCloudinary(falVideo.url, `wave115-${restaurant.slug}`);
  console.log(`  Video: ${cloud.videoUrl}`);
  console.log(`  Poster: ${cloud.posterUrl}`);

  return cloud;
}

async function main() {
  console.log("=== Wave 115 Video Generation ===");
  console.log(`Generating videos for ${restaurants.length} restaurants...`);
  console.log("Each video takes 2-4 minutes. Total: ~10-20 minutes.\n");

  const results = {};

  for (const r of restaurants) {
    try {
      const urls = await generateVideo(r);
      results[r.slug] = urls;
    } catch (err) {
      console.error(`  ERROR for ${r.name}: ${err.message}`);
      results[r.slug] = { error: err.message };
    }
  }

  console.log("\n\n=== RESULTS ===");
  console.log(JSON.stringify(results, null, 2));

  // Output the TypeScript patch
  console.log("\n=== PASTE INTO wave115-restaurants.ts branding sections ===");
  for (const [slug, urls] of Object.entries(results)) {
    if (urls.error) {
      console.log(`// ${slug}: FAILED - ${urls.error}`);
    } else {
      console.log(`// ${slug}:`);
      console.log(`    heroVideo: "${urls.videoUrl}",`);
      console.log(`    heroVideoPoster: "${urls.posterUrl}",`);
    }
  }
}

main().catch(e => { console.error(e); process.exit(1); });
