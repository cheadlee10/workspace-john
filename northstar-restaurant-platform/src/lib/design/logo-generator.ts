import crypto from "crypto";
import type { DesignConfig } from "@/lib/design/design-engine";

export type LogoGenResult = { lightUrl: string; darkUrl: string };

type CuisineStyle = {
  motifPool: string[];
  vibe: string;
  typography: string;
};

const cuisineStyles: Record<string, CuisineStyle> = {
  "cafe-bakery": { motifPool: ["wheat", "rolling-pin", "leaf", "whisk"], vibe: "hand-crafted warm artisan", typography: "serif" },
  mediterranean: { motifPool: ["olive-branch", "sun", "column", "laurel"], vibe: "classic mediterranean earth-tone", typography: "serif" },
  japanese: { motifPool: ["brush-circle", "wave", "chopsticks", "seal"], vibe: "minimal elegant black-red", typography: "sans" },
  mexican: { motifPool: ["chili", "sunburst", "cactus", "tile"], vibe: "bold geometric vibrant", typography: "slab" },
  coffee: { motifPool: ["bean", "cup", "steam", "rosette"], vibe: "dark roast modern", typography: "sans" },
  bbq: { motifPool: ["flame", "smoke", "grill", "ember"], vibe: "bold charcoal fire", typography: "slab" },
  italian: { motifPool: ["wheat", "olive", "herb", "crest"], vibe: "elegant rich red cream", typography: "serif" },
  indian: { motifPool: ["lotus", "mandala", "spice", "arch"], vibe: "ornamental jewel tone", typography: "serif" },
  thai: { motifPool: ["lotus", "spice", "flame", "leaf"], vibe: "ornamental jewel tone", typography: "serif" },
  default: { motifPool: ["monogram", "crest", "ring", "mark"], vibe: "clean geometric professional", typography: "sans" },
};

function pickStyle(cuisineType: string): CuisineStyle {
  const key = (cuisineType || "default").toLowerCase();
  return cuisineStyles[key] || cuisineStyles.default;
}

function initials(name: string): string {
  const parts = name.split(/\s+/).filter(Boolean);
  return (parts[0]?.[0] || "R") + (parts[1]?.[0] || "S");
}

function makePrompt(name: string, cuisineType: string, design: DesignConfig, motif: string, mode: "light" | "dark") {
  const style = pickStyle(cuisineType);
  return `Create ONE professional SVG logo only (no markdown, no explanation) for restaurant "${name}".
Cuisine: ${cuisineType}. Motif: ${motif}. Vibe: ${style.vibe}.
Palette accent: ${design.palette.accent}; background mode: ${mode}; heading font style: ${design.fonts.style}.
Must include both icon + wordmark text "${name}".
Canvas 1200x400 viewBox, clean vector paths, legible at small size, premium brand quality.`;
}

function scoreSvg(svg: string, name: string, accent: string): number {
  let s = 0;
  if (svg.includes("<svg")) s += 4;
  if (/viewBox=/i.test(svg)) s += 2;
  if (svg.toLowerCase().includes(name.toLowerCase().split(" ")[0])) s += 3;
  if (svg.toLowerCase().includes(accent.toLowerCase())) s += 2;
  s += (svg.match(/<path|<circle|<rect|<text/g) || []).length > 4 ? 2 : 0;
  return s;
}

function fallbackSvg(name: string, cuisineType: string, design: DesignConfig, optionIndex: number, mode: "light" | "dark") {
  const style = pickStyle(cuisineType);
  const fg = mode === "dark" ? "#F8FAFC" : "#111827";
  const bg = mode === "dark" ? (design.palette.footerBackground || "#111827") : (design.palette.background || "#FFFFFF");
  const accent = design.palette.accent || "#D4A574";
  const motif = style.motifPool[optionIndex % style.motifPool.length];
  const ini = initials(name).toUpperCase();

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400" width="1200" height="400" role="img" aria-label="${name} logo">
  <rect width="1200" height="400" rx="24" fill="${bg}"/>
  <g transform="translate(70,70)">
    <rect x="0" y="0" width="260" height="260" rx="54" fill="${accent}" opacity="0.16"/>
    <circle cx="130" cy="130" r="95" fill="none" stroke="${accent}" stroke-width="10"/>
    <text x="130" y="152" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="92" font-weight="700" fill="${fg}">${ini}</text>
    <text x="130" y="238" text-anchor="middle" font-family="Inter,Arial,sans-serif" font-size="22" fill="${accent}">${motif}</text>
  </g>
  <g transform="translate(370,165)">
    <text x="0" y="0" font-family="Inter,Arial,sans-serif" font-size="70" font-weight="700" fill="${fg}">${name}</text>
    <text x="2" y="48" font-family="Inter,Arial,sans-serif" font-size="26" fill="${accent}">${style.vibe}</text>
  </g>
</svg>`;
}

async function callClaude(prompt: string): Promise<string | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-3-5-sonnet-latest",
        max_tokens: 1600,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { content?: Array<{ type: string; text?: string }> };
    const text = json.content?.find((c) => c.type === "text")?.text || "";
    const m = text.match(/<svg[\s\S]*<\/svg>/i);
    return m?.[0] || null;
  } catch {
    return null;
  }
}

function signCloudinary(params: Record<string, string>, apiSecret: string): string {
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return crypto.createHash("sha1").update(toSign + apiSecret).digest("hex");
}

async function uploadSvg(svg: string, publicId: string): Promise<string> {
  const cloud = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloud || !apiKey || !apiSecret) {
    throw new Error("Missing Cloudinary env vars");
  }

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const params = { folder: "northstar/logos", public_id: publicId, timestamp, overwrite: "true" };
  const signature = signCloudinary(params, apiSecret);

  const form = new FormData();
  form.append("file", `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`);
  form.append("api_key", apiKey);
  form.append("timestamp", timestamp);
  form.append("folder", "northstar/logos");
  form.append("public_id", publicId);
  form.append("overwrite", "true");
  form.append("signature", signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, { method: "POST", body: form });
  if (!res.ok) throw new Error(`Cloudinary upload failed ${res.status}`);
  const json = (await res.json()) as { secure_url: string };
  return json.secure_url;
}

async function generateBestSvg(name: string, cuisineType: string, designConfig: DesignConfig, mode: "light" | "dark") {
  const style = pickStyle(cuisineType);
  const candidates: string[] = [];

  for (let i = 0; i < 3; i++) {
    const motif = style.motifPool[i % style.motifPool.length];
    const prompt = makePrompt(name, cuisineType, designConfig, motif, mode);
    const ai = await callClaude(prompt);
    candidates.push(ai || fallbackSvg(name, cuisineType, designConfig, i, mode));
  }

  candidates.sort((a, b) => scoreSvg(b, name, designConfig.palette.accent) - scoreSvg(a, name, designConfig.palette.accent));
  return candidates[0];
}

export async function generateRestaurantLogo(
  name: string,
  cuisineType: string,
  designConfig: DesignConfig
): Promise<LogoGenResult> {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const lightSvg = await generateBestSvg(name, cuisineType, designConfig, "light");
  const darkSvg = await generateBestSvg(name, cuisineType, designConfig, "dark");

  const [lightUrl, darkUrl] = await Promise.all([
    uploadSvg(lightSvg, `${slug}-logo-light`),
    uploadSvg(darkSvg, `${slug}-logo-dark`),
  ]);

  return { lightUrl, darkUrl };
}
