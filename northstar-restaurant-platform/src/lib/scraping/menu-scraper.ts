/**
 * Menu Scraper Module
 *
 * Extracts real menu data from restaurant websites and Yelp using
 * LLM-powered HTML parsing via OpenRouter (Gemini 2.5 Flash).
 *
 * Priority order:
 *   1. Website HTML -> LLM extraction
 *   2. Yelp Fusion API (if yelpId provided)
 *   3. Empty result (caller falls back to generateSampleMenu)
 *
 * Design principles:
 *   - Never throws — always returns a graceful ScrapedMenuResult
 *   - Each source attempt is timeboxed to 15 seconds
 *   - One retry on JSON parse failure before moving to next source
 *   - Returns confidence score so callers can decide threshold
 */

import { openRouterGenerateText } from "@/lib/ai/openrouter";

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface ScrapedMenuItem {
  name: string;
  description: string;
  price: number;
  category: string;
  dietaryInfo?: string[];
}

export interface ScrapedMenuResult {
  items: ScrapedMenuItem[];
  source: "website" | "yelp" | "none";
  confidence: number; // 0-1
}

export interface ScrapeMenuParams {
  restaurantName: string;
  websiteUrl?: string;
  yelpId?: string;
  cuisineType?: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SOURCE_TIMEOUT_MS = 15_000;
const MAX_HTML_CHARS = 60_000; // Trim HTML sent to LLM to stay within context
const MIN_ITEMS_FOR_CONFIDENCE = 3;

// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------

/**
 * Scrape menu items from a restaurant using multiple sources.
 * Never throws — returns { items: [], source: 'none', confidence: 0 } on
 * complete failure.
 */
export async function scrapeMenu(params: ScrapeMenuParams): Promise<ScrapedMenuResult> {
  // Source 1: Website scraping via LLM
  if (params.websiteUrl) {
    const result = await withTimeout(
      scrapeFromWebsite(params.restaurantName, params.websiteUrl, params.cuisineType),
      SOURCE_TIMEOUT_MS
    );
    if (result && result.items.length > 0) {
      return result;
    }
  }

  // Source 2: Yelp Fusion API
  if (params.yelpId) {
    const result = await withTimeout(
      scrapeFromYelp(params.yelpId, params.restaurantName, params.cuisineType),
      SOURCE_TIMEOUT_MS
    );
    if (result && result.items.length > 0) {
      return result;
    }
  }

  // Source 3: No data available
  return { items: [], source: "none", confidence: 0 };
}

// ---------------------------------------------------------------------------
// Source 1: Website HTML -> LLM extraction
// ---------------------------------------------------------------------------

async function scrapeFromWebsite(
  restaurantName: string,
  websiteUrl: string,
  cuisineType?: string
): Promise<ScrapedMenuResult | null> {
  try {
    const html = await fetchWebsiteHtml(websiteUrl);
    if (!html) return null;

    // Strip down HTML to text-relevant content
    const cleaned = cleanHtml(html);
    if (cleaned.length < 50) {
      console.warn(`[MenuScraper] Website HTML too short after cleaning for ${restaurantName}`);
      return null;
    }

    // First attempt
    const items = await extractMenuViaLlm(restaurantName, cleaned, cuisineType);
    if (items && items.length > 0) {
      return {
        items,
        source: "website",
        confidence: computeConfidence(items),
      };
    }

    // Retry once on parse failure (LLM may have returned malformed JSON)
    console.warn(`[MenuScraper] First LLM extraction failed for ${restaurantName}, retrying...`);
    const retryItems = await extractMenuViaLlm(restaurantName, cleaned, cuisineType);
    if (retryItems && retryItems.length > 0) {
      return {
        items: retryItems,
        source: "website",
        confidence: computeConfidence(retryItems),
      };
    }

    return null;
  } catch (err) {
    console.warn(`[MenuScraper] Website scrape failed for ${restaurantName}:`, err instanceof Error ? err.message : err);
    return null;
  }
}

/**
 * Fetch raw HTML from a restaurant website.
 * Uses a browser-like User-Agent and follows redirects.
 */
async function fetchWebsiteHtml(url: string): Promise<string | null> {
  try {
    // Normalize URL
    let normalizedUrl = url.trim();
    if (!normalizedUrl.startsWith("http://") && !normalizedUrl.startsWith("https://")) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10_000);

    const response = await fetch(normalizedUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
      redirect: "follow",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[MenuScraper] Website returned ${response.status} for ${normalizedUrl}`);
      return null;
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html") && !contentType.includes("text/plain") && !contentType.includes("application/xhtml")) {
      console.warn(`[MenuScraper] Non-HTML content-type: ${contentType} for ${normalizedUrl}`);
      return null;
    }

    const text = await response.text();
    return text;
  } catch (err) {
    console.warn(`[MenuScraper] Failed to fetch website:`, err instanceof Error ? err.message : err);
    return null;
  }
}

/**
 * Strip HTML down to text content relevant for menu extraction.
 * Removes scripts, styles, SVGs, nav, headers, footers, and excessive whitespace.
 */
function cleanHtml(html: string): string {
  let text = html;

  // Remove <script>, <style>, <svg>, <noscript> blocks
  text = text.replace(/<script[\s\S]*?<\/script>/gi, " ");
  text = text.replace(/<style[\s\S]*?<\/style>/gi, " ");
  text = text.replace(/<svg[\s\S]*?<\/svg>/gi, " ");
  text = text.replace(/<noscript[\s\S]*?<\/noscript>/gi, " ");

  // Remove HTML comments
  text = text.replace(/<!--[\s\S]*?-->/g, " ");

  // Remove common non-menu sections (nav, header, footer) — best effort
  text = text.replace(/<nav[\s\S]*?<\/nav>/gi, " ");
  text = text.replace(/<footer[\s\S]*?<\/footer>/gi, " ");

  // Convert <br>, <p>, <div>, <li>, <tr>, <h1-6> tags to newlines for readability
  text = text.replace(/<br\s*\/?>/gi, "\n");
  text = text.replace(/<\/(p|div|li|tr|h[1-6]|section|article)>/gi, "\n");

  // Strip remaining HTML tags
  text = text.replace(/<[^>]+>/g, " ");

  // Decode common HTML entities
  text = text.replace(/&amp;/g, "&");
  text = text.replace(/&lt;/g, "<");
  text = text.replace(/&gt;/g, ">");
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/&nbsp;/g, " ");
  text = text.replace(/&#\d+;/g, " ");
  text = text.replace(/&\w+;/g, " ");

  // Collapse whitespace
  text = text.replace(/[ \t]+/g, " ");
  text = text.replace(/\n\s*\n+/g, "\n");
  text = text.trim();

  // Truncate to stay within LLM context limits
  if (text.length > MAX_HTML_CHARS) {
    text = text.slice(0, MAX_HTML_CHARS);
  }

  return text;
}

/**
 * Use OpenRouter LLM to extract structured menu items from cleaned website text.
 */
async function extractMenuViaLlm(
  restaurantName: string,
  cleanedText: string,
  cuisineType?: string
): Promise<ScrapedMenuItem[] | null> {
  const cuisineHint = cuisineType ? ` This is a ${cuisineType} restaurant.` : "";

  const prompt = `You are a menu data extractor. Extract ALL menu items from the following restaurant website text for "${restaurantName}".${cuisineHint}

RULES:
- Return ONLY a JSON array, no markdown, no code fences, no explanation
- Each object must have exactly these fields:
  - "name": string (dish name, properly capitalized)
  - "description": string (brief description, empty string "" if none found)
  - "price": number (in USD, 0 if not found — do NOT guess prices)
  - "category": string (menu section like "Appetizers", "Entrees", "Desserts", "Drinks", etc.)
  - "dietaryInfo": string[] (optional array: "vegetarian", "vegan", "gluten-free", "spicy", "dairy-free", "nut-free" — only include if explicitly stated)
- Do NOT invent menu items. Only extract items that are clearly listed.
- Do NOT include merchandise, gift cards, or non-food items.
- If no menu items are found, return an empty array: []
- Prices should be numbers without $ sign (e.g., 12.99 not "$12.99")
- Combine duplicate items (same name) — keep the one with more detail.

WEBSITE TEXT:
${cleanedText}

JSON ARRAY:`;

  try {
    const raw = await openRouterGenerateText(prompt, {
      model: "google/gemini-2.5-flash",
      maxTokens: 4000,
      temperature: 0.1,
    });

    return parseLlmMenuResponse(raw);
  } catch (err) {
    console.warn(`[MenuScraper] LLM extraction error:`, err instanceof Error ? err.message : err);
    return null;
  }
}

/**
 * Parse the LLM response into validated ScrapedMenuItem[].
 * Handles common LLM response quirks (markdown fences, trailing text).
 */
function parseLlmMenuResponse(raw: string): ScrapedMenuItem[] | null {
  if (!raw || raw.trim().length === 0) return null;

  let jsonStr = raw.trim();

  // Strip markdown code fences if present (```json ... ``` or ``` ... ```)
  jsonStr = jsonStr.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");

  // Find the JSON array boundaries
  const startIdx = jsonStr.indexOf("[");
  const endIdx = jsonStr.lastIndexOf("]");
  if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
    console.warn(`[MenuScraper] No JSON array found in LLM response`);
    return null;
  }
  jsonStr = jsonStr.slice(startIdx, endIdx + 1);

  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonStr);
  } catch {
    console.warn(`[MenuScraper] JSON parse failed on LLM response`);
    return null;
  }

  if (!Array.isArray(parsed)) {
    console.warn(`[MenuScraper] LLM response is not an array`);
    return null;
  }

  // Validate and normalize each item
  const items: ScrapedMenuItem[] = [];
  for (const raw of parsed) {
    if (!raw || typeof raw !== "object") continue;

    const item = raw as Record<string, unknown>;
    const name = typeof item.name === "string" ? item.name.trim() : "";
    if (!name) continue; // Name is required

    // Parse price — handle string prices like "$12.99" or "12.99"
    let price = 0;
    if (typeof item.price === "number" && isFinite(item.price) && item.price >= 0) {
      price = Math.round(item.price * 100) / 100; // Round to cents
    } else if (typeof item.price === "string") {
      const parsed = parseFloat(item.price.replace(/[^0-9.]/g, ""));
      if (isFinite(parsed) && parsed >= 0) {
        price = Math.round(parsed * 100) / 100;
      }
    }

    // Cap unreasonable prices (likely parsing errors)
    if (price > 500) price = 0;

    const description = typeof item.description === "string" ? item.description.trim() : "";
    const category = typeof item.category === "string" ? item.category.trim() : "Menu";

    // Validate dietary info
    const validDietary = new Set([
      "vegetarian", "vegan", "gluten-free", "spicy",
      "dairy-free", "nut-free", "halal", "kosher", "organic", "keto", "low-carb",
    ]);
    let dietaryInfo: string[] | undefined;
    if (Array.isArray(item.dietaryInfo)) {
      const filtered = item.dietaryInfo
        .filter((d): d is string => typeof d === "string")
        .map((d) => d.toLowerCase().trim())
        .filter((d) => validDietary.has(d));
      if (filtered.length > 0) {
        dietaryInfo = filtered;
      }
    }

    items.push({ name, description, price, category, dietaryInfo });
  }

  return items.length > 0 ? items : null;
}

// ---------------------------------------------------------------------------
// Source 2: Yelp Fusion API
// ---------------------------------------------------------------------------

async function scrapeFromYelp(
  yelpId: string,
  restaurantName: string,
  cuisineType?: string
): Promise<ScrapedMenuResult | null> {
  const apiKey = process.env.YELP_API_KEY;
  if (!apiKey) {
    console.warn(`[MenuScraper] No YELP_API_KEY — skipping Yelp source for ${restaurantName}`);
    return null;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10_000);

    // Yelp Fusion v3 — business details (includes some menu data on supported businesses)
    const response = await fetch(`https://api.yelp.com/v3/businesses/${encodeURIComponent(yelpId)}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[MenuScraper] Yelp API returned ${response.status} for ${yelpId}`);
      return null;
    }

    const data = (await response.json()) as YelpBusinessResponse;

    // Yelp doesn't return structured menu data in the standard business endpoint,
    // but we can use categories + price to generate a baseline. If Yelp has a
    // menu_url, we can scrape that too.
    if (data.attributes?.menu_url) {
      const menuHtml = await fetchWebsiteHtml(data.attributes.menu_url);
      if (menuHtml) {
        const cleaned = cleanHtml(menuHtml);
        if (cleaned.length >= 50) {
          const items = await extractMenuViaLlm(restaurantName, cleaned, cuisineType);
          if (items && items.length > 0) {
            return {
              items,
              source: "yelp",
              confidence: computeConfidence(items) * 0.9, // Slightly lower confidence for Yelp menu pages
            };
          }
        }
      }
    }

    // If Yelp has "popular dishes" in special_hours or similar fields, extract them.
    // For now, no structured menu data is available from the standard endpoint.
    console.warn(`[MenuScraper] No extractable menu data from Yelp for ${restaurantName}`);
    return null;
  } catch (err) {
    console.warn(`[MenuScraper] Yelp scrape failed for ${restaurantName}:`, err instanceof Error ? err.message : err);
    return null;
  }
}

/** Minimal Yelp Business response shape (only fields we use) */
interface YelpBusinessResponse {
  id: string;
  name: string;
  categories?: Array<{ alias: string; title: string }>;
  price?: string; // "$", "$$", "$$$", "$$$$"
  attributes?: {
    menu_url?: string;
    [key: string]: unknown;
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Compute a confidence score (0-1) based on extracted item quality.
 *
 * Higher confidence when:
 * - More items extracted
 * - Items have prices
 * - Items have descriptions
 * - Items are spread across multiple categories
 */
function computeConfidence(items: ScrapedMenuItem[]): number {
  if (items.length === 0) return 0;

  let score = 0;

  // Item count factor (0-0.3): more items = more confidence, caps at 20
  const countFactor = Math.min(items.length / 20, 1) * 0.3;
  score += countFactor;

  // Price coverage factor (0-0.3): percentage of items with prices
  const withPrice = items.filter((i) => i.price > 0).length;
  const priceFactor = (withPrice / items.length) * 0.3;
  score += priceFactor;

  // Description coverage factor (0-0.2): percentage with non-empty descriptions
  const withDesc = items.filter((i) => i.description.length > 0).length;
  const descFactor = (withDesc / items.length) * 0.2;
  score += descFactor;

  // Category diversity factor (0-0.2): multiple categories = real menu
  const uniqueCategories = new Set(items.map((i) => i.category.toLowerCase()));
  const catFactor = Math.min(uniqueCategories.size / 5, 1) * 0.2;
  score += catFactor;

  // Penalize very small extractions (might be partial / header text)
  if (items.length < MIN_ITEMS_FOR_CONFIDENCE) {
    score *= 0.5;
  }

  return Math.round(score * 100) / 100;
}

/**
 * Wrap a promise with a timeout. Returns null if the timeout fires.
 */
async function withTimeout<T>(
  promise: Promise<T | null>,
  ms: number
): Promise<T | null> {
  let timeoutId: ReturnType<typeof setTimeout>;

  const timeoutPromise = new Promise<null>((resolve) => {
    timeoutId = setTimeout(() => {
      console.warn(`[MenuScraper] Source timed out after ${ms}ms`);
      resolve(null);
    }, ms);
  });

  try {
    const result = await Promise.race([promise, timeoutPromise]);
    clearTimeout(timeoutId!);
    return result;
  } catch {
    clearTimeout(timeoutId!);
    return null;
  }
}
