/**
 * Logo Downloader Module
 *
 * Attempts to find a real logo for a restaurant by scraping multiple sources,
 * then uploads the best candidate to Cloudinary. Falls through sources in
 * priority order; never throws.
 *
 * Priority:
 *   1. Restaurant website  (logo <img>, og:image, apple-touch-icon, favicon)
 *   2. Clearbit Logo API   (free, domain-based)
 *   3. Google Places Photo  (first photo reference, needs API key)
 *   4. Returns null         (caller falls back to AI logo generation)
 */

import crypto from "crypto";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type LogoSource =
  | "website-logo"
  | "website-og"
  | "website-favicon"
  | "clearbit"
  | "google-photo";

export interface LogoDownloadResult {
  url: string | null;
  source: LogoSource | null;
}

export interface LogoDownloadParams {
  restaurantName: string;
  websiteUrl?: string;
  googlePlaceId?: string;
  googleApiKey?: string;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

const FETCH_TIMEOUT_MS = 8_000;

/** Fetch with a timeout so we never hang. */
async function safeFetch(
  url: string,
  opts: RequestInit & { timeoutMs?: number } = {},
): Promise<Response | null> {
  const { timeoutMs = FETCH_TIMEOUT_MS, ...fetchOpts } = opts;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, { ...fetchOpts, signal: controller.signal });
    clearTimeout(timer);
    return res;
  } catch {
    return null;
  }
}

/** Extract the registrable domain from a URL string (e.g. "www.example.com" -> "example.com"). */
function extractDomain(urlStr: string): string | null {
  try {
    const u = new URL(urlStr.startsWith("http") ? urlStr : `https://${urlStr}`);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/** Resolve a potentially-relative href against a base URL. */
function resolveUrl(href: string, baseUrl: string): string | null {
  if (!href || href.startsWith("data:") || href.startsWith("javascript:")) {
    return null;
  }
  try {
    return new URL(href, baseUrl).href;
  } catch {
    return null;
  }
}

/** Download image bytes and return as a Buffer + content-type. */
async function downloadImage(
  url: string,
): Promise<{ buffer: Buffer; contentType: string } | null> {
  const res = await safeFetch(url);
  if (!res || !res.ok) return null;

  const ct = res.headers.get("content-type") || "image/png";
  if (!/image\//i.test(ct)) return null;

  try {
    const arrayBuf = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuf);
    // Skip tiny images (< 200 bytes are likely 1x1 tracking pixels)
    if (buffer.length < 200) return null;
    return { buffer, contentType: ct };
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Cloudinary upload  (mirrors logo-generator.ts pattern exactly)
// ---------------------------------------------------------------------------

function signCloudinary(
  params: Record<string, string>,
  apiSecret: string,
): string {
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return crypto.createHash("sha1").update(toSign + apiSecret).digest("hex");
}

async function uploadToCloudinary(
  imageBuffer: Buffer,
  contentType: string,
  publicId: string,
): Promise<string> {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud || !apiKey || !apiSecret) {
    throw new Error("Missing Cloudinary env vars");
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const params: Record<string, string> = {
    folder: "northstar/logos",
    public_id: publicId,
    timestamp,
    overwrite: "true",
  };
  const signature = signCloudinary(params, apiSecret);

  // Build a base64 data-URI the same way logo-generator.ts does
  const mimeType = contentType.split(";")[0].trim() || "image/png";
  const b64 = imageBuffer.toString("base64");

  const form = new FormData();
  form.append("file", `data:${mimeType};base64,${b64}`);
  form.append("api_key", apiKey);
  form.append("timestamp", timestamp);
  form.append("folder", "northstar/logos");
  form.append("public_id", publicId);
  form.append("overwrite", "true");
  form.append("signature", signature);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloud}/image/upload`,
    { method: "POST", body: form },
  );
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Cloudinary upload failed ${res.status}: ${body}`);
  }
  const json = (await res.json()) as { secure_url: string };
  return json.secure_url;
}

// ---------------------------------------------------------------------------
// Source 1: Website scraping
// ---------------------------------------------------------------------------

interface ScrapedCandidate {
  url: string;
  source: LogoSource;
  priority: number; // lower = better
}

/**
 * Scrape a restaurant website for logo candidates.
 * Uses regex parsing (no cheerio/jsdom dependency).
 */
async function scrapeWebsiteLogos(
  websiteUrl: string,
): Promise<ScrapedCandidate[]> {
  const res = await safeFetch(websiteUrl, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (compatible; NorthStarBot/1.0; +https://northstarsynergy.com)",
      Accept: "text/html,application/xhtml+xml",
    },
  });
  if (!res || !res.ok) return [];

  let html: string;
  try {
    html = await res.text();
  } catch {
    return [];
  }

  const baseUrl = res.url || websiteUrl; // follow redirects
  const candidates: ScrapedCandidate[] = [];

  // --- <img> tags with "logo" in class, alt, id, or src ---
  const imgTagRe = /<img\b[^>]*?>/gi;
  let imgMatch: RegExpExecArray | null;
  while ((imgMatch = imgTagRe.exec(html)) !== null) {
    const tag = imgMatch[0];

    // Check if this img is logo-related
    const hasLogoIndicator =
      /class\s*=\s*["'][^"']*logo[^"']*["']/i.test(tag) ||
      /alt\s*=\s*["'][^"']*logo[^"']*["']/i.test(tag) ||
      /id\s*=\s*["'][^"']*logo[^"']*["']/i.test(tag) ||
      /src\s*=\s*["'][^"']*logo[^"']*["']/i.test(tag);

    if (!hasLogoIndicator) continue;

    // Extract src (try srcset first for higher-res, fall back to src)
    const srcMatch =
      tag.match(/src\s*=\s*["']([^"']+)["']/i);
    if (!srcMatch) continue;

    const resolved = resolveUrl(srcMatch[1], baseUrl);
    if (resolved) {
      candidates.push({ url: resolved, source: "website-logo", priority: 1 });
    }

    // Also grab srcset first entry if present (often higher-res)
    const srcsetMatch = tag.match(/srcset\s*=\s*["']([^"']+)["']/i);
    if (srcsetMatch) {
      const firstSrcset = srcsetMatch[1].split(",")[0].trim().split(/\s+/)[0];
      const resolvedSrcset = resolveUrl(firstSrcset, baseUrl);
      if (resolvedSrcset) {
        candidates.push({
          url: resolvedSrcset,
          source: "website-logo",
          priority: 0, // higher-res preferred
        });
      }
    }
  }

  // --- <meta property="og:image"> ---
  const ogImageRe =
    /<meta\s+[^>]*property\s*=\s*["']og:image["'][^>]*content\s*=\s*["']([^"']+)["'][^>]*>/gi;
  const ogImageReAlt =
    /<meta\s+[^>]*content\s*=\s*["']([^"']+)["'][^>]*property\s*=\s*["']og:image["'][^>]*>/gi;

  for (const re of [ogImageRe, ogImageReAlt]) {
    let m: RegExpExecArray | null;
    while ((m = re.exec(html)) !== null) {
      const resolved = resolveUrl(m[1], baseUrl);
      if (resolved) {
        candidates.push({ url: resolved, source: "website-og", priority: 5 });
      }
    }
  }

  // --- <link rel="apple-touch-icon"> (high-quality square icon) ---
  const appleTouchRe =
    /<link\s+[^>]*rel\s*=\s*["']apple-touch-icon[^"']*["'][^>]*href\s*=\s*["']([^"']+)["'][^>]*>/gi;
  const appleTouchReAlt =
    /<link\s+[^>]*href\s*=\s*["']([^"']+)["'][^>]*rel\s*=\s*["']apple-touch-icon[^"']*["'][^>]*>/gi;

  for (const re of [appleTouchRe, appleTouchReAlt]) {
    let m: RegExpExecArray | null;
    while ((m = re.exec(html)) !== null) {
      const resolved = resolveUrl(m[1], baseUrl);
      if (resolved) {
        candidates.push({
          url: resolved,
          source: "website-favicon",
          priority: 3,
        });
      }
    }
  }

  // --- <link rel="icon"> / <link rel="shortcut icon"> ---
  const faviconRe =
    /<link\s+[^>]*rel\s*=\s*["'](?:shortcut\s+)?icon["'][^>]*href\s*=\s*["']([^"']+)["'][^>]*>/gi;
  const faviconReAlt =
    /<link\s+[^>]*href\s*=\s*["']([^"']+)["'][^>]*rel\s*=\s*["'](?:shortcut\s+)?icon["'][^>]*>/gi;

  for (const re of [faviconRe, faviconReAlt]) {
    let m: RegExpExecArray | null;
    while ((m = re.exec(html)) !== null) {
      const resolved = resolveUrl(m[1], baseUrl);
      if (resolved) {
        candidates.push({
          url: resolved,
          source: "website-favicon",
          priority: 4,
        });
      }
    }
  }

  // Deduplicate by URL, keep best priority
  const seen = new Map<string, ScrapedCandidate>();
  for (const c of candidates) {
    const existing = seen.get(c.url);
    if (!existing || c.priority < existing.priority) {
      seen.set(c.url, c);
    }
  }

  return Array.from(seen.values()).sort((a, b) => a.priority - b.priority);
}

// ---------------------------------------------------------------------------
// Source 2: Clearbit Logo API
// ---------------------------------------------------------------------------

async function tryClearbitLogo(
  domain: string,
): Promise<{ url: string; buffer: Buffer; contentType: string } | null> {
  const clearbitUrl = `https://logo.clearbit.com/${domain}`;
  const img = await downloadImage(clearbitUrl);
  if (!img) return null;
  return { url: clearbitUrl, ...img };
}

// ---------------------------------------------------------------------------
// Source 3: Google Places Photo
// ---------------------------------------------------------------------------

async function tryGooglePlacesPhoto(
  placeId: string,
  apiKey: string,
): Promise<{ buffer: Buffer; contentType: string } | null> {
  // Step 1: Fetch place details to get the first photo reference
  const detailsUrl =
    `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${encodeURIComponent(placeId)}` +
    `&fields=photos` +
    `&key=${encodeURIComponent(apiKey)}`;

  const detailsRes = await safeFetch(detailsUrl);
  if (!detailsRes || !detailsRes.ok) return null;

  let details: {
    result?: { photos?: Array<{ photo_reference: string }> };
  };
  try {
    details = (await detailsRes.json()) as typeof details;
  } catch {
    return null;
  }

  const photoRef = details.result?.photos?.[0]?.photo_reference;
  if (!photoRef) return null;

  // Step 2: Download the photo (Google redirects to actual image)
  const photoUrl =
    `https://maps.googleapis.com/maps/api/place/photo` +
    `?maxwidth=800` +
    `&photo_reference=${encodeURIComponent(photoRef)}` +
    `&key=${encodeURIComponent(apiKey)}`;

  return downloadImage(photoUrl);
}

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------

/**
 * Attempt to download a real logo for a restaurant from multiple sources.
 *
 * Returns `{ url, source }` on success.  Never throws; gracefully degrades
 * through sources and returns `{ url: null, source: null }` if all fail.
 */
export async function downloadRealLogo(
  params: LogoDownloadParams,
): Promise<LogoDownloadResult> {
  const { restaurantName, websiteUrl, googlePlaceId, googleApiKey } = params;
  const slug = restaurantName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const publicId = `${slug}-real-logo`;

  // -----------------------------------------------------------------------
  // Source 1: Scrape the restaurant website
  // -----------------------------------------------------------------------
  if (websiteUrl) {
    try {
      const candidates = await scrapeWebsiteLogos(websiteUrl);

      for (const candidate of candidates) {
        const img = await downloadImage(candidate.url);
        if (!img) continue;

        try {
          const cloudinaryUrl = await uploadToCloudinary(
            img.buffer,
            img.contentType,
            publicId,
          );
          console.warn(
            `[logo-downloader] Found logo for "${restaurantName}" via ${candidate.source}: ${candidate.url}`,
          );
          return { url: cloudinaryUrl, source: candidate.source };
        } catch (err) {
          console.warn(
            `[logo-downloader] Cloudinary upload failed for ${candidate.url}:`,
            err,
          );
          // Try next candidate
        }
      }
    } catch (err) {
      console.warn(
        `[logo-downloader] Website scrape failed for "${restaurantName}":`,
        err,
      );
    }
  }

  // -----------------------------------------------------------------------
  // Source 2: Clearbit Logo API
  // -----------------------------------------------------------------------
  if (websiteUrl) {
    const domain = extractDomain(websiteUrl);
    if (domain) {
      try {
        const clearbit = await tryClearbitLogo(domain);
        if (clearbit) {
          try {
            const cloudinaryUrl = await uploadToCloudinary(
              clearbit.buffer,
              clearbit.contentType,
              publicId,
            );
            console.warn(
              `[logo-downloader] Found logo for "${restaurantName}" via Clearbit (${domain})`,
            );
            return { url: cloudinaryUrl, source: "clearbit" };
          } catch (err) {
            console.warn(
              `[logo-downloader] Cloudinary upload failed for Clearbit logo:`,
              err,
            );
          }
        }
      } catch (err) {
        console.warn(
          `[logo-downloader] Clearbit failed for "${restaurantName}":`,
          err,
        );
      }
    }
  }

  // -----------------------------------------------------------------------
  // Source 3: Google Places Photo
  // -----------------------------------------------------------------------
  if (googlePlaceId && googleApiKey) {
    try {
      const photo = await tryGooglePlacesPhoto(googlePlaceId, googleApiKey);
      if (photo) {
        try {
          const cloudinaryUrl = await uploadToCloudinary(
            photo.buffer,
            photo.contentType,
            publicId,
          );
          console.warn(
            `[logo-downloader] Found photo for "${restaurantName}" via Google Places`,
          );
          return { url: cloudinaryUrl, source: "google-photo" };
        } catch (err) {
          console.warn(
            `[logo-downloader] Cloudinary upload failed for Google Places photo:`,
            err,
          );
        }
      }
    } catch (err) {
      console.warn(
        `[logo-downloader] Google Places failed for "${restaurantName}":`,
        err,
      );
    }
  }

  // -----------------------------------------------------------------------
  // All sources exhausted
  // -----------------------------------------------------------------------
  console.warn(
    `[logo-downloader] No logo found for "${restaurantName}" — caller should fall back to AI generation`,
  );
  return { url: null, source: null };
}
