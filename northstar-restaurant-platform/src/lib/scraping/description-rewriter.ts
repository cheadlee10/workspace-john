/**
 * Menu Description Rewriter
 *
 * Takes raw/missing menu item descriptions and rewrites them in bulk
 * via a single OpenRouter API call. Produces short, authentic descriptions
 * that sound like a real restaurant owner wrote them — not AI slop.
 *
 * Uses google/gemini-2.5-flash for cost efficiency (~$0.001 per batch).
 * Includes JSON parse retry (1 attempt) and graceful fallback on total failure.
 */

export interface MenuItemInput {
  name: string;
  description?: string;
  category?: string;
}

export interface MenuItemOutput {
  name: string;
  description: string;
}

const SYSTEM_PROMPT = `You rewrite restaurant menu descriptions. Rules:
- Maximum 8 words per description. Most should be 3-5 words.
- Write like a real restaurant owner, not a copywriter.
- Good examples: "house favorite", "customer #1 pick", "made fresh daily", "spicy, served with rice", "our signature dish", "crispy and golden", "slow-roasted 8 hours"
- BAD examples (NEVER write like this): "a velvety embrace of espresso", "tantalizing symphony of flavors", "artisanal masterpiece", "delectable fusion"
- BANNED WORDS: velvety, embrace, symphony, tantalizing, delectable, artisan, curated, exquisite, masterpiece, elevate, indulge, nestled, drizzled with love
- If the item name is self-explanatory (e.g., "Chocolate Cake"), just write "rich and decadent" or "house-made" — don't over-describe.
- For drinks, keep it even shorter: "bold", "smooth", "refreshing", "classic"

Return a JSON array of objects: [{"name": "...", "description": "..."}]
No markdown. No explanation. Just the JSON array.`;

function buildUserPrompt(
  items: MenuItemInput[],
  cuisineType: string
): string {
  const lines = items.map((item) => {
    const parts = [item.name];
    if (item.category) parts.push(`(category: ${item.category})`);
    if (item.description) parts.push(`— current: "${item.description}"`);
    return parts.join(" ");
  });

  return `Cuisine: ${cuisineType}\n\nMenu items:\n${lines.join("\n")}`;
}

/**
 * Try to extract a JSON array from a response string.
 * Handles cases where the model wraps JSON in markdown code fences.
 */
function extractJsonArray(raw: string): MenuItemOutput[] {
  let cleaned = raw.trim();

  // Strip markdown code fences if present
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
  }

  const parsed = JSON.parse(cleaned);

  if (!Array.isArray(parsed)) {
    throw new Error("Response is not a JSON array");
  }

  // Validate each item has name and description strings
  return parsed.map((item: Record<string, unknown>) => ({
    name: String(item.name || ""),
    description: String(item.description || ""),
  }));
}

/**
 * Rewrite menu item descriptions in bulk via a single OpenRouter API call.
 *
 * @param items - Array of menu items with name, optional description, optional category
 * @param cuisineType - The restaurant's cuisine type (e.g., "japanese", "mexican", "italian")
 * @returns Array of items with rewritten descriptions
 *
 * On total failure, returns items with their original descriptions (or empty string).
 */
export async function rewriteMenuDescriptions(
  items: Array<{ name: string; description?: string; category?: string }>,
  cuisineType: string
): Promise<Array<{ name: string; description: string }>> {
  if (items.length === 0) return [];

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.warn("[DescriptionRewriter] Missing OPENROUTER_API_KEY — returning originals");
    return items.map((item) => ({
      name: item.name,
      description: item.description || "",
    }));
  }

  const userPrompt = buildUserPrompt(items, cuisineType);

  // Estimate token budget: ~20 tokens per item for output
  const maxTokens = Math.max(256, items.length * 25);

  let rawResponse: string | null = null;
  let lastError: unknown = null;

  // Attempt the API call + JSON parse, with 1 retry on parse failure
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      if (attempt === 0 || rawResponse === null) {
        rawResponse = await callOpenRouter(apiKey, userPrompt, maxTokens);
      }

      const results = extractJsonArray(rawResponse);

      // Sanity check: result count should match input count
      if (results.length !== items.length) {
        console.warn(
          `[DescriptionRewriter] Item count mismatch: sent ${items.length}, got ${results.length}. Using what we got.`
        );
      }

      // Map results back by index, falling back to originals for any missing
      return items.map((item, i) => ({
        name: item.name,
        description: results[i]?.description || item.description || "",
      }));
    } catch (err) {
      lastError = err;
      console.warn(
        `[DescriptionRewriter] Attempt ${attempt + 1} failed: ${err instanceof Error ? err.message : String(err)}`
      );

      // On parse failure, retry the API call to get a clean response
      if (attempt === 0) {
        rawResponse = null;
      }
    }
  }

  // Total failure — return originals
  console.warn(
    `[DescriptionRewriter] All attempts failed. Returning original descriptions. Last error: ${lastError instanceof Error ? lastError.message : String(lastError)}`
  );
  return items.map((item) => ({
    name: item.name,
    description: item.description || "",
  }));
}

/**
 * Make the actual OpenRouter API call with system + user messages.
 */
async function callOpenRouter(
  apiKey: string,
  userPrompt: string,
  maxTokens: number
): Promise<string> {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://northstar-restaurant-platform.vercel.app",
      "X-Title": "NorthStar Restaurant Platform",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      temperature: 0.6,
      max_tokens: maxTokens,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`OpenRouter API error ${res.status}: ${txt}`);
  }

  const json = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = json.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("OpenRouter returned empty response");
  }

  return content.trim();
}
