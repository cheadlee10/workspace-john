/**
 * AI Video Generation Script for Restaurant Hero Sections
 *
 * Usage:
 *   npx tsx scripts/generate-restaurant-videos.ts --slug super-gyros
 *   npx tsx scripts/generate-restaurant-videos.ts --all
 *   npx tsx scripts/generate-restaurant-videos.ts --all --dry-run
 *   npx tsx scripts/generate-restaurant-videos.ts --slug super-gyros --force
 */

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { generateVideo, buildVideoPrompt } from "../src/lib/video/video-generator";
import type { Restaurant } from "../src/types/restaurant";

// --- Config ---

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const FAL_API_KEY = process.env.FAL_API_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}
if (!FAL_API_KEY) {
  console.error("Missing FAL_API_KEY — set it in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// --- CLI args ---

const args = process.argv.slice(2);
const slugIndex = args.indexOf("--slug");
const targetSlug = slugIndex !== -1 ? args[slugIndex + 1] : null;
const doAll = args.includes("--all");
const dryRun = args.includes("--dry-run");
const force = args.includes("--force");

if (!targetSlug && !doAll) {
  console.log("Usage:");
  console.log("  npx tsx scripts/generate-restaurant-videos.ts --slug <slug>");
  console.log("  npx tsx scripts/generate-restaurant-videos.ts --all");
  console.log("  npx tsx scripts/generate-restaurant-videos.ts --all --dry-run");
  console.log("Options:");
  console.log("  --force   Regenerate even if heroVideo already exists");
  console.log("  --dry-run Show prompts without generating");
  process.exit(0);
}

// --- Helpers ---

function getTopMenuItems(restaurant: Restaurant): string[] {
  const items: string[] = [];
  for (const section of restaurant.menu?.sections || []) {
    for (const item of section.items || []) {
      if (item.isPopular || item.isChefPick) {
        items.push(item.name);
      }
    }
  }
  // If no popular/chef items marked, grab first 3
  if (items.length === 0) {
    for (const section of restaurant.menu?.sections || []) {
      for (const item of section.items || []) {
        items.push(item.name);
        if (items.length >= 3) break;
      }
      if (items.length >= 3) break;
    }
  }
  return items.slice(0, 3);
}

async function getRestaurants(): Promise<Array<{ id: string; slug: string; config: Restaurant }>> {
  if (targetSlug) {
    const { data, error } = await supabase
      .from("restaurants")
      .select("*")
      .eq("slug", targetSlug.toLowerCase())
      .single();

    if (error || !data) {
      console.error(`Restaurant "${targetSlug}" not found in Supabase`);
      process.exit(1);
    }
    return [{ id: data.id, slug: data.slug, config: data.config as Restaurant }];
  }

  const { data, error } = await supabase
    .from("restaurants")
    .select("*")
    .order("slug", { ascending: true });

  if (error) {
    console.error("Failed to fetch restaurants:", error.message);
    process.exit(1);
  }

  return (data || []).map((row: Record<string, unknown>) => ({
    id: row.id as string,
    slug: row.slug as string,
    config: row.config as Restaurant,
  }));
}

async function updateRestaurantVideo(
  id: string,
  config: Restaurant,
  videoUrl: string,
  posterUrl: string
): Promise<void> {
  const updated = {
    ...config,
    branding: {
      ...config.branding,
      heroVideo: videoUrl,
      heroVideoPoster: posterUrl,
    },
    updatedAt: new Date().toISOString().split("T")[0],
  };

  const { error } = await supabase
    .from("restaurants")
    .update({ config: updated })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to update Supabase: ${error.message}`);
  }
}

// --- Main ---

async function main() {
  console.log("=== NorthStar AI Video Generator ===\n");

  const restaurants = await getRestaurants();
  console.log(`Found ${restaurants.length} restaurant(s)\n`);

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (const { id, slug, config } of restaurants) {
    const hasVideo = config.branding?.heroVideo;

    if (hasVideo && !force) {
      console.log(`[SKIP] ${config.name} (${slug}) — already has heroVideo`);
      skipped++;
      continue;
    }

    const cuisineType = config.cuisine?.[0] || "default";
    const topItems = getTopMenuItems(config);

    const genConfig = {
      falApiKey: FAL_API_KEY!,
      restaurantName: config.name,
      cuisineType,
      slug,
      topMenuItems: topItems,
    };

    if (dryRun) {
      const prompt = buildVideoPrompt(genConfig);
      console.log(`\n[DRY RUN] ${config.name} (${slug})`);
      console.log(`  Cuisine: ${cuisineType}`);
      console.log(`  Top items: ${topItems.join(", ") || "(none)"}`);
      console.log(`  Prompt: ${prompt}`);
      continue;
    }

    try {
      const result = await generateVideo(genConfig);

      // Update Supabase
      await updateRestaurantVideo(id, config, result.videoUrl, result.posterUrl);

      console.log(`\n[DONE] ${config.name} (${slug})`);
      console.log(`  Video: ${result.videoUrl}`);
      console.log(`  Poster: ${result.posterUrl}`);
      generated++;
    } catch (err) {
      console.error(`\n[FAIL] ${config.name} (${slug}): ${err instanceof Error ? err.message : err}`);
      failed++;
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Generated: ${generated}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Failed: ${failed}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
