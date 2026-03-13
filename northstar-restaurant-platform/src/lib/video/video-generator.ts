import crypto from "crypto";

// --- Types ---

export interface VideoGenerationConfig {
  falApiKey: string;
  restaurantName: string;
  cuisineType: string;
  slug: string;
  topMenuItems: string[];
}

export interface GeneratedVideo {
  videoUrl: string;
  posterUrl: string;
  duration: number;
  prompt: string;
}

// --- Cuisine-specific video prompts ---

const cuisineVideoPrompts: Record<string, string[]> = {
  mediterranean: [
    "Extreme close-up, shallow depth of field: hands assembling a fresh gyro wrap, layering seasoned lamb, crisp vegetables, and creamy tzatziki sauce drizzling over the top. Warm golden kitchen lighting. No faces visible. Background heavily blurred. Steam rising. Cinematic food commercial quality, 24fps.",
    "Close-up overhead shot: a Mediterranean mezze platter being arranged — hummus swirled with olive oil, fresh pita bread torn by hand, colorful pickled vegetables placed carefully. Warm amber lighting. No faces. Blurred background. Slow deliberate movements. Cinematic.",
    "Extreme close-up: seasoned meat sizzling on a flat grill, juices bubbling, fresh herbs being sprinkled on top by hand. Shallow depth of field, warm kitchen lighting, steam and smoke rising. No faces visible. Background completely blurred. Cinematic food photography.",
  ],
  bakery: [
    "Extreme close-up, shallow depth of field: golden croissants being pulled from an oven, flaky layers visible, steam rising from the fresh pastry. Warm bakery lighting, soft golden tones. No faces visible. Background blurred showing rustic bakery shelves. Cinematic.",
    "Close-up overhead: cream cheese icing being drizzled in a spiral pattern over fresh cinnamon rolls, the glaze pooling between the swirls. Warm soft lighting. No faces. Blurred bakery background. Slow motion. Cinematic food commercial.",
    "Extreme close-up: a baker's hands dusting flour on fresh dough, kneading slowly, the texture of the dough visible in detail. Warm golden ambient light. No face visible. Shallow depth of field, background completely blurred. Artisan bakery feel. Cinematic.",
  ],
  coffee: [
    "Extreme close-up, shallow depth of field: espresso being pulled into a ceramic cup, rich dark crema forming perfectly on the surface. Steam rising. Moody dark lighting with warm highlights. No faces visible. Background completely blurred. Cinematic.",
    "Close-up: steamed milk being poured into a latte, creating latte art — a rosetta pattern forming on the surface. Warm cafe lighting. Only hands visible, no face. Dark moody background heavily blurred. Slow motion. Cinematic.",
    "Extreme close-up: coffee beans being ground in a burr grinder, the grounds falling in slow motion. Then a pour-over brewing, water hitting the grounds and blooming. Warm intimate lighting. No faces. Blurred cafe background. Cinematic.",
  ],
  mexican: [
    "Extreme close-up, shallow depth of field: a street taco being assembled — seasoned carne asada placed on a warm corn tortilla, topped with fresh cilantro, diced onion, and a squeeze of lime. Vibrant lighting. No faces visible. Background blurred showing a busy kitchen. Cinematic.",
    "Close-up overhead: sizzling fajita vegetables and meat on a hot cast iron skillet, steam and smoke rising dramatically. Fresh tortillas nearby. Vibrant warm lighting. No faces. Blurred background. Cinematic food commercial quality.",
    "Extreme close-up: fresh guacamole being made — avocado being scooped and mashed, lime squeezed, cilantro chopped and folded in. Vibrant natural lighting. Only hands visible, no face. Colorful ingredients in shallow depth of field. Cinematic.",
  ],
  japanese: [
    "Extreme close-up, shallow depth of field: sushi chef's hands placing fresh fish on seasoned rice, the precision of the cut visible. Minimal elegant lighting. No face visible. Clean dark background blurred. Deliberate slow movements. Cinematic.",
    "Close-up: ramen broth being ladled into a bowl, steam rising dramatically, noodles visible beneath. Chopsticks placing a soft-boiled egg on top. Warm moody lighting. No face. Dark background. Cinematic.",
    "Extreme close-up: tempura being lowered into hot oil, bubbles erupting around the battered shrimp. Golden oil glistening. Warm lighting. No faces. Background blurred. Slow motion capture. Cinematic.",
  ],
  italian: [
    "Extreme close-up, shallow depth of field: fresh pasta being tossed in a pan with sauce, the strands catching the light. Parmesan being grated over the top. Warm kitchen lighting. No faces visible. Background blurred. Cinematic.",
    "Close-up: a pizza being pulled from a wood-fired oven, cheese bubbling and stretching. Charred crust visible. Warm firelight and kitchen glow. No face. Blurred background. Steam rising. Cinematic food commercial.",
    "Extreme close-up: olive oil being drizzled over a fresh bruschetta, tomatoes glistening, basil leaves placed carefully on top. Warm Mediterranean lighting. Only hands visible. Shallow depth of field. Cinematic.",
  ],
  american: [
    "Extreme close-up, shallow depth of field: a burger patty sizzling on a hot grill, juices dripping, cheese being placed on top and melting slowly. Smoky atmosphere. Warm grill lighting. No faces visible. Background blurred. Cinematic.",
    "Close-up: crispy golden french fries being lifted from a fryer basket, salt being sprinkled over them in slow motion. Warm restaurant lighting. No face. Background blurred. Steam rising. Cinematic food commercial.",
    "Extreme close-up: BBQ sauce being brushed onto smoked ribs, the glaze caramelizing. Smoke wisps rising. Warm amber grill lighting. Only hands visible, no face. Dark blurred background. Cinematic.",
  ],
  indian: [
    "Extreme close-up, shallow depth of field: butter chicken sauce simmering in a copper pot, bubbles breaking the surface, a ladle stirring slowly. Rich warm lighting. No faces visible. Background blurred with spice jars. Cinematic.",
    "Close-up: fresh naan bread being stretched and slapped onto the inside wall of a tandoor oven, puffing up with air pockets. Warm firelight. Only hands visible. Dark blurred background. Cinematic.",
    "Extreme close-up: colorful spices — turmeric, cumin, cardamom — being added to a hot pan, sizzling and releasing aromatic steam. Warm golden lighting. No face. Shallow depth of field. Cinematic.",
  ],
  thai: [
    "Extreme close-up, shallow depth of field: a wok with pad thai, noodles being tossed with high flame visible underneath. Bean sprouts and peanuts being added. Dramatic warm lighting. No faces. Background blurred. Cinematic.",
    "Close-up: green curry simmering in a pot, coconut milk swirling into the green paste, vegetables visible. Steam rising. Warm kitchen lighting. No face. Blurred background. Cinematic food commercial.",
    "Extreme close-up: fresh spring rolls being assembled — rice paper wrapper, colorful vegetables, herbs, and shrimp being carefully rolled. Natural lighting. Only hands visible. Shallow depth of field. Cinematic.",
  ],
  default: [
    "Extreme close-up, shallow depth of field: a chef's hands plating a beautiful dish, sauce being drizzled in an artistic pattern. Fresh herbs placed as garnish. Warm professional kitchen lighting. No face visible. Background completely blurred. Cinematic food commercial quality, 24fps.",
    "Close-up overhead: a fresh dish being finished with a final garnish, steam rising, the plate spinning slowly to show all angles. Professional warm lighting. No faces. Clean blurred background. Cinematic.",
    "Extreme close-up: ingredients being sliced on a cutting board — the knife moving precisely through fresh vegetables. Shallow depth of field. Warm kitchen lighting. Only hands visible. Blurred background. Cinematic.",
  ],
};

// --- Prompt builder ---

function mapCuisineToPromptKey(cuisineType: string): string {
  const lower = (cuisineType || "").toLowerCase();
  // Direct matches
  if (cuisineVideoPrompts[lower]) return lower;
  // Fuzzy mapping
  if (lower.includes("greek") || lower.includes("gyro") || lower.includes("kebab") || lower.includes("falafel")) return "mediterranean";
  if (lower.includes("sushi") || lower.includes("ramen")) return "japanese";
  if (lower.includes("taco") || lower.includes("burrito")) return "mexican";
  if (lower.includes("pizza") || lower.includes("pasta")) return "italian";
  if (lower.includes("curry") || lower.includes("tandoori")) return "indian";
  if (lower.includes("burger") || lower.includes("bbq") || lower.includes("barbecue")) return "american";
  if (lower.includes("cafe") || lower.includes("bakery") || lower.includes("pastry")) return "bakery";
  if (lower.includes("coffee") || lower.includes("espresso")) return "coffee";
  if (lower.includes("pad thai") || lower.includes("thai")) return "thai";
  if (lower.includes("seafood")) return "default";
  return "default";
}

export function buildVideoPrompt(config: VideoGenerationConfig): string {
  const key = mapCuisineToPromptKey(config.cuisineType);
  const prompts = cuisineVideoPrompts[key] || cuisineVideoPrompts.default;
  const pick = prompts[Math.floor(Math.random() * prompts.length)];

  // Inject top menu items for specificity if available
  if (config.topMenuItems.length > 0) {
    const dishes = config.topMenuItems.slice(0, 3).join(", ");
    return `${pick} The restaurant "${config.restaurantName}" is known for: ${dishes}.`;
  }
  return pick;
}

// --- fal.ai queue-based generation ---

interface FalQueueResponse {
  request_id: string;
  status_url: string;
  response_url: string;
}

interface FalStatusResponse {
  status: "IN_QUEUE" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
  response_url?: string;
  logs?: Array<{ message: string }>;
}

interface FalResultResponse {
  video: { url: string; content_type: string; file_size: number };
}

async function submitToFal(apiKey: string, prompt: string): Promise<FalQueueResponse> {
  const res = await fetch("https://queue.fal.run/fal-ai/minimax-video/video/generate", {
    method: "POST",
    headers: {
      Authorization: `Key ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      prompt_optimizer: true,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`fal.ai submit failed (${res.status}): ${text}`);
  }

  return res.json() as Promise<FalQueueResponse>;
}

async function pollFalStatus(apiKey: string, statusUrl: string, maxWaitMs = 300_000): Promise<string> {
  const start = Date.now();
  const pollInterval = 5_000;

  while (Date.now() - start < maxWaitMs) {
    const res = await fetch(statusUrl, {
      headers: { Authorization: `Key ${apiKey}` },
    });

    if (!res.ok) {
      throw new Error(`fal.ai status check failed (${res.status})`);
    }

    const status = (await res.json()) as FalStatusResponse;

    if (status.status === "COMPLETED") {
      return status.response_url || statusUrl.replace("/status", "");
    }

    if (status.status === "FAILED") {
      throw new Error("fal.ai video generation failed");
    }

    // Log progress
    const elapsed = Math.round((Date.now() - start) / 1000);
    console.log(`  [${elapsed}s] Status: ${status.status}...`);

    await new Promise((r) => setTimeout(r, pollInterval));
  }

  throw new Error(`fal.ai generation timed out after ${maxWaitMs / 1000}s`);
}

async function fetchFalResult(apiKey: string, responseUrl: string): Promise<FalResultResponse> {
  const res = await fetch(responseUrl, {
    headers: { Authorization: `Key ${apiKey}` },
  });

  if (!res.ok) {
    throw new Error(`fal.ai result fetch failed (${res.status})`);
  }

  return res.json() as Promise<FalResultResponse>;
}

// --- Cloudinary video upload ---

function signCloudinary(params: Record<string, string>, apiSecret: string): string {
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return crypto.createHash("sha1").update(toSign + apiSecret).digest("hex");
}

async function uploadVideoToCloudinary(
  videoUrl: string,
  publicId: string
): Promise<{ videoUrl: string; posterUrl: string }> {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud || !apiKey || !apiSecret) {
    throw new Error("Missing Cloudinary env vars (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)");
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const params: Record<string, string> = {
    folder: "northstar/videos",
    public_id: publicId,
    timestamp,
    overwrite: "true",
    resource_type: "video",
  };
  const signature = signCloudinary(params, apiSecret);

  const form = new FormData();
  form.append("file", videoUrl);
  form.append("api_key", apiKey);
  form.append("timestamp", timestamp);
  form.append("folder", "northstar/videos");
  form.append("public_id", publicId);
  form.append("overwrite", "true");
  form.append("resource_type", "video");
  form.append("signature", signature);

  console.log(`  Uploading video to Cloudinary as ${publicId}...`);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/video/upload`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Cloudinary video upload failed (${res.status}): ${text}`);
  }

  const json = (await res.json()) as { secure_url: string; public_id: string };

  // Build optimized URLs
  const cdnVideoUrl = json.secure_url.replace(
    "/video/upload/",
    "/video/upload/q_auto,f_auto,w_1280/"
  );

  // Poster: first frame as JPG
  const posterUrl = json.secure_url
    .replace("/video/upload/", "/video/upload/so_0,w_1280,f_jpg,q_auto/")
    .replace(/\.\w+$/, ".jpg");

  return { videoUrl: cdnVideoUrl, posterUrl };
}

// --- Main generation function ---

export async function generateVideo(config: VideoGenerationConfig): Promise<GeneratedVideo> {
  const prompt = buildVideoPrompt(config);
  console.log(`\nGenerating video for "${config.restaurantName}"...`);
  console.log(`  Cuisine: ${config.cuisineType}`);
  console.log(`  Prompt: ${prompt.slice(0, 120)}...`);

  const maxRetries = 2;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      if (attempt > 0) {
        console.log(`  Retry attempt ${attempt}/${maxRetries}...`);
      }

      // 1. Submit to fal.ai queue
      const queue = await submitToFal(config.falApiKey, prompt);
      console.log(`  Queued: ${queue.request_id}`);

      // 2. Poll until complete
      const responseUrl = await pollFalStatus(config.falApiKey, queue.status_url);

      // 3. Fetch result
      const result = await fetchFalResult(config.falApiKey, responseUrl);
      console.log(`  Video generated: ${result.video.url}`);
      console.log(`  File size: ${(result.video.file_size / 1024 / 1024).toFixed(1)}MB`);

      // 4. Upload to Cloudinary
      const publicId = `${config.slug}-hero-video`;
      const cloudinary = await uploadVideoToCloudinary(result.video.url, publicId);

      console.log(`  Cloudinary video: ${cloudinary.videoUrl}`);
      console.log(`  Poster: ${cloudinary.posterUrl}`);

      return {
        videoUrl: cloudinary.videoUrl,
        posterUrl: cloudinary.posterUrl,
        duration: 6,
        prompt,
      };
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.warn(`  Attempt ${attempt} failed: ${lastError.message}`);
    }
  }

  throw lastError || new Error("Video generation failed");
}
