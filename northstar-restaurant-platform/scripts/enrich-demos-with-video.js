/**
 * Post-Build Enrichment: Generate AI Hero Videos for Restaurant Demos
 *
 * Runs after restaurant demos are created in Supabase. Generates a
 * cuisine-specific cinematic food video via fal.ai, uploads to Cloudinary,
 * and patches the restaurant config with heroVideo + heroVideoPoster.
 *
 * Usage:
 *   node scripts/enrich-demos-with-video.js                    # All without video
 *   node scripts/enrich-demos-with-video.js --slug super-gyros # Single restaurant
 *   node scripts/enrich-demos-with-video.js --force            # Regenerate all
 *   node scripts/enrich-demos-with-video.js --dry-run          # Preview prompts
 *
 * Integrates with the wave build loop — call this after rebuild-prospect-demos.js
 * or wave3-find-load-build.js to add video to freshly built demos.
 */

require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const FAL_API_KEY = process.env.FAL_API_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}
if (!FAL_API_KEY) {
  console.error('Missing FAL_API_KEY — set it in .env.local');
  process.exit(1);
}

const H = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
};

const args = process.argv.slice(2);
const slugIdx = args.indexOf('--slug');
const targetSlug = slugIdx !== -1 ? args[slugIdx + 1] : null;
const force = args.includes('--force');
const dryRun = args.includes('--dry-run');

// --- Cuisine prompt mapping (inline for CommonJS compatibility) ---

const cuisineVideoPrompts = {
  mediterranean: [
    'Extreme close-up, shallow depth of field: hands assembling a fresh gyro wrap, layering seasoned lamb, crisp vegetables, and creamy tzatziki sauce drizzling over the top. Warm golden kitchen lighting. No faces visible. Background heavily blurred. Steam rising. Cinematic food commercial quality, 24fps.',
    'Close-up overhead shot: a Mediterranean mezze platter being arranged — hummus swirled with olive oil, fresh pita bread torn by hand, colorful pickled vegetables placed carefully. Warm amber lighting. No faces. Blurred background. Slow deliberate movements. Cinematic.',
    'Extreme close-up: seasoned meat sizzling on a flat grill, juices bubbling, fresh herbs being sprinkled on top by hand. Shallow depth of field, warm kitchen lighting, steam and smoke rising. No faces visible. Background completely blurred. Cinematic food photography.',
  ],
  bakery: [
    'Extreme close-up, shallow depth of field: golden croissants being pulled from an oven, flaky layers visible, steam rising from the fresh pastry. Warm bakery lighting, soft golden tones. No faces visible. Background blurred showing rustic bakery shelves. Cinematic.',
    'Close-up overhead: cream cheese icing being drizzled in a spiral pattern over fresh cinnamon rolls, the glaze pooling between the swirls. Warm soft lighting. No faces. Blurred bakery background. Slow motion. Cinematic food commercial.',
    'Extreme close-up: a baker\'s hands dusting flour on fresh dough, kneading slowly, the texture of the dough visible in detail. Warm golden ambient light. No face visible. Shallow depth of field, background completely blurred. Artisan bakery feel. Cinematic.',
  ],
  coffee: [
    'Extreme close-up, shallow depth of field: espresso being pulled into a ceramic cup, rich dark crema forming perfectly on the surface. Steam rising. Moody dark lighting with warm highlights. No faces visible. Background completely blurred. Cinematic.',
    'Close-up: steamed milk being poured into a latte, creating latte art — a rosetta pattern forming on the surface. Warm cafe lighting. Only hands visible, no face. Dark moody background heavily blurred. Slow motion. Cinematic.',
    'Extreme close-up: coffee beans being ground in a burr grinder, the grounds falling in slow motion. Then a pour-over brewing, water hitting the grounds and blooming. Warm intimate lighting. No faces. Blurred cafe background. Cinematic.',
  ],
  mexican: [
    'Extreme close-up, shallow depth of field: a street taco being assembled — seasoned carne asada placed on a warm corn tortilla, topped with fresh cilantro, diced onion, and a squeeze of lime. Vibrant lighting. No faces visible. Background blurred showing a busy kitchen. Cinematic.',
    'Close-up overhead: sizzling fajita vegetables and meat on a hot cast iron skillet, steam and smoke rising dramatically. Fresh tortillas nearby. Vibrant warm lighting. No faces. Blurred background. Cinematic food commercial quality.',
    'Extreme close-up: fresh guacamole being made — avocado being scooped and mashed, lime squeezed, cilantro chopped and folded in. Vibrant natural lighting. Only hands visible, no face. Colorful ingredients in shallow depth of field. Cinematic.',
  ],
  japanese: [
    'Extreme close-up, shallow depth of field: sushi chef\'s hands placing fresh fish on seasoned rice, the precision of the cut visible. Minimal elegant lighting. No face visible. Clean dark background blurred. Deliberate slow movements. Cinematic.',
    'Close-up: ramen broth being ladled into a bowl, steam rising dramatically, noodles visible beneath. Chopsticks placing a soft-boiled egg on top. Warm moody lighting. No face. Dark background. Cinematic.',
  ],
  italian: [
    'Extreme close-up, shallow depth of field: fresh pasta being tossed in a pan with sauce, the strands catching the light. Parmesan being grated over the top. Warm kitchen lighting. No faces visible. Background blurred. Cinematic.',
    'Close-up: a pizza being pulled from a wood-fired oven, cheese bubbling and stretching. Charred crust visible. Warm firelight and kitchen glow. No face. Blurred background. Steam rising. Cinematic food commercial.',
  ],
  american: [
    'Extreme close-up, shallow depth of field: a burger patty sizzling on a hot grill, juices dripping, cheese being placed on top and melting slowly. Smoky atmosphere. Warm grill lighting. No faces visible. Background blurred. Cinematic.',
    'Close-up: crispy golden french fries being lifted from a fryer basket, salt being sprinkled over them in slow motion. Warm restaurant lighting. No face. Background blurred. Steam rising. Cinematic food commercial.',
  ],
  indian: [
    'Extreme close-up, shallow depth of field: butter chicken sauce simmering in a copper pot, bubbles breaking the surface, a ladle stirring slowly. Rich warm lighting. No faces visible. Background blurred with spice jars. Cinematic.',
    'Close-up: fresh naan bread being stretched and slapped onto the inside wall of a tandoor oven, puffing up with air pockets. Warm firelight. Only hands visible. Dark blurred background. Cinematic.',
  ],
  thai: [
    'Extreme close-up, shallow depth of field: a wok with pad thai, noodles being tossed with high flame visible underneath. Bean sprouts and peanuts being added. Dramatic warm lighting. No faces. Background blurred. Cinematic.',
    'Close-up: green curry simmering in a pot, coconut milk swirling into the green paste, vegetables visible. Steam rising. Warm kitchen lighting. No face. Blurred background. Cinematic food commercial.',
  ],
  default: [
    'Extreme close-up, shallow depth of field: a chef\'s hands plating a beautiful dish, sauce being drizzled in an artistic pattern. Fresh herbs placed as garnish. Warm professional kitchen lighting. No face visible. Background completely blurred. Cinematic food commercial quality, 24fps.',
    'Close-up overhead: a fresh dish being finished with a final garnish, steam rising, the plate spinning slowly to show all angles. Professional warm lighting. No faces. Clean blurred background. Cinematic.',
  ],
};

function inferCuisine(text) {
  const t = (text || '').toLowerCase();
  if (t.includes('taco') || t.includes('taqueria') || t.includes('burrito') || t.includes('antojito') || t.includes('mexican')) return 'mexican';
  if (t.includes('gyro') || t.includes('falafel') || t.includes('kebab') || t.includes('greek') || t.includes('mediterranean')) return 'mediterranean';
  if (t.includes('sushi') || t.includes('ramen') || t.includes('japanese')) return 'japanese';
  if (t.includes('pizza') || t.includes('pasta') || t.includes('italian')) return 'italian';
  if (t.includes('curry') || t.includes('tandoori') || t.includes('dosa') || t.includes('indian')) return 'indian';
  if (t.includes('thai') || t.includes('pad thai')) return 'thai';
  if (t.includes('espresso') || t.includes('coffee') || t.includes('latte') || t.includes('cafe')) return 'coffee';
  if (t.includes('bakery') || t.includes('donut') || t.includes('pastry') || t.includes('cinnamon roll') || t.includes('bake ') || t.includes('sweets')) return 'bakery';
  if (t.includes('bbq') || t.includes('barbecue') || t.includes('burger') || t.includes('grill')) return 'american';
  return null;
}

function pickPromptKey(cuisine, name) {
  const fromName = inferCuisine(name);
  const lower = (cuisine || '').toLowerCase();
  if (fromName && (lower === 'american' || lower === 'establishment' || lower === 'other' || lower === 'fusion' || !cuisineVideoPrompts[lower])) {
    return fromName;
  }
  if (cuisineVideoPrompts[lower]) return lower;
  const fromCuisine = inferCuisine(lower);
  if (fromCuisine) return fromCuisine;
  if (fromName) return fromName;
  return 'default';
}

function getTopItems(config) {
  const items = [];
  for (const section of config.menu?.sections || []) {
    for (const item of section.items || []) {
      if (item.isPopular || item.isChefPick) items.push(item.name);
    }
  }
  if (items.length === 0) {
    for (const section of config.menu?.sections || []) {
      for (const item of section.items || []) {
        items.push(item.name);
        if (items.length >= 3) break;
      }
      if (items.length >= 3) break;
    }
  }
  return items.slice(0, 3);
}

function buildPrompt(config) {
  const cuisine = Array.isArray(config.cuisine) ? config.cuisine[0] : config.cuisine || 'default';
  const key = pickPromptKey(cuisine, config.name);
  const prompts = cuisineVideoPrompts[key] || cuisineVideoPrompts.default;
  const pick = prompts[Math.floor(Math.random() * prompts.length)];
  const items = getTopItems(config);
  if (items.length > 0) {
    return `${pick} The restaurant "${config.name}" is known for: ${items.join(', ')}.`;
  }
  return pick;
}

// --- fal.ai + Cloudinary ---

async function generateAndUpload(config) {
  const { fal } = require('@fal-ai/client');
  fal.config({ credentials: FAL_API_KEY });
  const crypto = require('crypto');

  const prompt = buildPrompt(config);
  console.log(`  Prompt: ${prompt.slice(0, 100)}...`);

  // Generate via fal.ai
  const start = Date.now();
  const result = await fal.subscribe('fal-ai/kling-video/v2/master/text-to-video', {
    input: { prompt, duration: '5', aspect_ratio: '16:9' },
    logs: true,
    onQueueUpdate: function (u) {
      const s = Math.round((Date.now() - start) / 1000);
      if (s % 30 === 0 || u.status === 'COMPLETED') {
        console.log(`  [${s}s] ${u.status}`);
      }
    },
  });

  const video = result.data.video;
  console.log(`  Video: ${video.url} (${(video.file_size / 1024 / 1024).toFixed(1)}MB)`);

  // Upload to Cloudinary
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud || !apiKey || !apiSecret) throw new Error('Missing Cloudinary env vars');

  const publicId = `${config.slug}-hero-video`;
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const params = { folder: 'northstar/videos', public_id: publicId, timestamp, overwrite: 'true' };
  const toSign = Object.keys(params).sort().map((k) => `${k}=${params[k]}`).join('&');
  const signature = crypto.createHash('sha1').update(toSign + apiSecret).digest('hex');

  const form = new FormData();
  form.append('file', video.url);
  form.append('api_key', apiKey);
  form.append('timestamp', timestamp);
  form.append('folder', 'northstar/videos');
  form.append('public_id', publicId);
  form.append('overwrite', 'true');
  form.append('signature', signature);

  console.log(`  Uploading to Cloudinary...`);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/video/upload`, { method: 'POST', body: form });
  if (!res.ok) throw new Error(`Cloudinary upload failed: ${res.status}`);
  const json = await res.json();

  const videoUrl = json.secure_url.replace('/video/upload/', '/video/upload/q_auto,f_auto,w_1280/');
  const posterUrl = json.secure_url
    .replace('/video/upload/', '/video/upload/so_0,w_1280,f_jpg,q_auto/')
    .replace(/\.\w+$/, '.jpg');

  return { videoUrl, posterUrl };
}

// --- Main ---

(async () => {
  console.log('=== NorthStar Video Enrichment ===\n');

  // Fetch restaurants
  let url = `${SUPABASE_URL}/rest/v1/restaurants?select=*&order=slug.asc`;
  if (targetSlug) url += `&slug=eq.${targetSlug}`;

  const res = await fetch(url, { headers: H });
  if (!res.ok) { console.error('Fetch failed:', res.status); process.exit(1); }
  const rows = await res.json();

  console.log(`Found ${rows.length} restaurant(s)\n`);
  let generated = 0, skipped = 0, failed = 0;

  for (const row of rows) {
    const config = row.config;
    const hasVideo = config.branding?.heroVideo;

    if (hasVideo && !force) {
      console.log(`[SKIP] ${config.name} (${row.slug}) — already has video`);
      skipped++;
      continue;
    }

    if (dryRun) {
      const prompt = buildPrompt(config);
      const cuisine = Array.isArray(config.cuisine) ? config.cuisine[0] : config.cuisine;
      console.log(`[DRY] ${config.name} (${row.slug}) → ${pickPromptKey(cuisine, config.name)}`);
      console.log(`  ${prompt.slice(0, 120)}...\n`);
      continue;
    }

    console.log(`\n[GEN] ${config.name} (${row.slug})`);

    try {
      const { videoUrl, posterUrl } = await generateAndUpload(config);

      // Patch Supabase
      const updated = {
        ...config,
        branding: { ...config.branding, heroVideo: videoUrl, heroVideoPoster: posterUrl },
        updatedAt: new Date().toISOString().slice(0, 10),
      };
      const patchRes = await fetch(`${SUPABASE_URL}/rest/v1/restaurants?id=eq.${row.id}`, {
        method: 'PATCH',
        headers: H,
        body: JSON.stringify({ config: updated }),
      });
      if (!patchRes.ok) throw new Error(`Supabase patch failed: ${patchRes.status}`);

      console.log(`  ✓ Video: ${videoUrl}`);
      console.log(`  ✓ Poster: ${posterUrl}`);
      generated++;
    } catch (err) {
      console.error(`  ✗ FAILED: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n=== Done: ${generated} generated, ${skipped} skipped, ${failed} failed ===`);
})();
