/**
 * Design Intelligence Engine
 *
 * Given a restaurant's data, produces a complete design configuration.
 * Acts like a senior web designer making decisions based on cuisine,
 * price level, brand vibe, and available assets.
 *
 * Deterministic — same input always produces the same output.
 * All decisions are overridable via restaurant.designOverrides.
 */

import type { Restaurant, CuisineType, RestaurantType } from "@/types/restaurant";

// ─── Design Config Interface ────────────────────────────────────────────────

/** Stitch-inspired surface hierarchy (5 levels, dark → light) */
export interface StitchSurfaces {
  base: string;            // deepest background (#131313 in dark)
  containerLowest: string; // recessed areas (#0e0e0e)
  containerLow: string;    // cards, secondary (#1c1b1b)
  container: string;       // mid-level (#201f1f)
  containerHigh: string;   // elevated (#2a2a2a)
  containerHighest: string;// inputs, active (#353534)
}

/** Stitch-inspired accent tokens derived from brand color */
export interface StitchAccent {
  primary: string;          // main accent (#e9c176)
  primaryContainer: string; // darker accent for gradients (#c5a059)
  onPrimary: string;        // text on primary bg (#412d00)
  tertiary: string;         // warm secondary accent (#e4beb2)
}

export interface DesignConfig {
  palette: {
    background: string;
    surface: string;
    surfaceAlt: string;
    text: string;
    textMuted: string;
    accent: string;
    accentHover: string;
    heroOverlay: string;
    navBackground: string;
    footerBackground: string;
    footerText: string;
    menuCardBg: string;
    menuCardBorder: string;
    reviewSectionBg: string;
    // Stitch surface hierarchy
    stitch: StitchSurfaces;
    // Stitch accent tokens
    stitchAccent: StitchAccent;
    // Ghost border color (no-border rule: use at 15-20% opacity only)
    outlineVariant: string;
  };

  fonts: {
    heading: string;
    body: string;
    menu: string;
    weight: { heading: number; body: number };
    style: "serif" | "sans" | "display" | "slab";
  };

  layout: {
    heroStyle: "full-bleed" | "split" | "minimal" | "editorial";
    menuStyle: "grid" | "list" | "cards" | "editorial";
    sectionOrder: string[];
    navStyle: "transparent-overlay" | "solid-dark" | "solid-light" | "minimal";
    cornerRadius: string;
    spacing: "tight" | "normal" | "airy";
  };

  effects: {
    heroParallax: boolean;
    menuItemHoverScale: number;
    sectionDividers: "none" | "line" | "gradient" | "pattern";
    imageFilter: string;
    animationSpeed: "subtle" | "normal" | "energetic";
  };

  vibe: {
    mood: VibeMood;
    personality: string;
  };
}

export type VibeMood =
  | "warm-cozy"
  | "bold-energetic"
  | "minimal-elegant"
  | "dark-moody"
  | "bright-fresh"
  | "rustic-earthy";

// ─── Stitch Color Derivation ────────────────────────────────────────────────

/** Parse hex to RGB components */
function hexToRgb(hex: string): [number, number, number] {
  const c = hex.replace("#", "");
  return [
    parseInt(c.substring(0, 2), 16),
    parseInt(c.substring(2, 4), 16),
    parseInt(c.substring(4, 6), 16),
  ];
}

/** RGB to hex */
function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map(c => Math.round(Math.max(0, Math.min(255, c))).toString(16).padStart(2, "0")).join("");
}

/** Lighten or darken a hex color by an amount (-255 to +255) */
function adjustBrightness(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(r + amount, g + amount, b + amount);
}

/** Mix two colors together at a given ratio (0 = colorA, 1 = colorB) */
function mixColors(hexA: string, hexB: string, ratio: number): string {
  const [rA, gA, bA] = hexToRgb(hexA);
  const [rB, gB, bB] = hexToRgb(hexB);
  return rgbToHex(
    Math.round(rA + (rB - rA) * ratio),
    Math.round(gA + (gB - gA) * ratio),
    Math.round(bA + (bB - bA) * ratio),
  );
}

/**
 * Generate Stitch 5-level surface hierarchy TINTED with the accent color.
 * This is the key differentiator — a Japanese restaurant with red accent
 * gets warm-reddish surfaces, a French bistro with gold accent gets
 * warm-golden surfaces. Never neutral gray.
 */
function deriveStitchSurfaces(bg: string, accent: string, isDark: boolean): StitchSurfaces {
  if (isDark) {
    // Tint each surface level with a touch of the accent color
    const tintBase = bg;
    return {
      base: tintBase,
      containerLowest: adjustBrightness(tintBase, -5),
      containerLow: mixColors(adjustBrightness(tintBase, 9), accent, 0.06),
      container: mixColors(adjustBrightness(tintBase, 13), accent, 0.05),
      containerHigh: mixColors(adjustBrightness(tintBase, 23), accent, 0.04),
      containerHighest: mixColors(adjustBrightness(tintBase, 34), accent, 0.03),
    };
  }
  // Light mode: tint surfaces with a whisper of accent
  return {
    base: bg,
    containerLowest: "#ffffff",
    containerLow: mixColors(adjustBrightness(bg, -4), accent, 0.04),
    container: mixColors(adjustBrightness(bg, -9), accent, 0.05),
    containerHigh: mixColors(adjustBrightness(bg, -15), accent, 0.04),
    containerHighest: mixColors(adjustBrightness(bg, -22), accent, 0.03),
  };
}

/** Derive Stitch accent tokens from a primary accent color */
function deriveStitchAccent(accent: string, isDark: boolean): StitchAccent {
  const [r, g, b] = hexToRgb(accent);

  // Primary container: darken accent by ~18%
  const primaryContainer = rgbToHex(
    Math.round(r * 0.80),
    Math.round(g * 0.75),
    Math.round(b * 0.68)
  );

  // Text color on primary: very dark version of accent
  const onPrimary = isDark
    ? rgbToHex(Math.round(r * 0.28), Math.round(g * 0.25), Math.round(b * 0.15))
    : rgbToHex(Math.round(r * 0.2), Math.round(g * 0.18), Math.round(b * 0.1));

  // Tertiary: complementary warm tone derived from accent hue
  // Shift the hue by rotating RGB channels
  const tertiary = isDark
    ? rgbToHex(
        Math.round(Math.min(255, r * 0.9 + 50)),
        Math.round(Math.min(255, g * 0.7 + 40)),
        Math.round(Math.min(255, b * 0.6 + 50))
      )
    : rgbToHex(
        Math.round(r * 0.7 + 30),
        Math.round(g * 0.6 + 20),
        Math.round(b * 0.5 + 20)
      );

  return { primary: accent, primaryContainer, onPrimary, tertiary };
}

/** Derive ghost border color tinted with accent */
function deriveOutlineVariant(bg: string, accent: string, isDark: boolean): string {
  const base = isDark ? adjustBrightness(bg, 55) : adjustBrightness(bg, -40);
  return mixColors(base, accent, 0.12);
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function derivePriceLevel(restaurant: Restaurant): number {
  switch (restaurant.type) {
    case "fine-dining":
      return 4;
    case "casual-dining":
      return 2;
    case "fast-casual":
      return 1;
    case "food-truck":
      return 1;
    case "cafe-bakery":
      return 2;
    case "bar-brewery":
      return 2;
    case "pizza-bbq":
      return 2;
    case "pop-up":
      return 1;
    default:
      return 2;
  }
}

function countPhotos(restaurant: Restaurant): number {
  let count = 0;
  if (restaurant.branding.heroImage) count++;
  if (restaurant.branding.logo) count++;
  for (const section of restaurant.menu.sections) {
    for (const item of section.items) {
      if (item.image) count++;
    }
  }
  return count;
}

interface VibeKeywords {
  isCozy: boolean;
  isUpscale: boolean;
  isFamily: boolean;
  isCraft: boolean;
  isFast: boolean;
  isStreet: boolean;
  isCoffee: boolean;
  isBakery: boolean;
  isSweetBakery: boolean;
}

function detectVibeKeywords(restaurant: Restaurant): VibeKeywords {
  const text = `${restaurant.name} ${restaurant.description}`.toLowerCase();
  const isBakery = /\b(bakery|baker|pastry|cinnamon|donut|bread|cake|cupcake|patisserie|croissant|roll co)\b/.test(text);
  const isSweetBakery = /\b(cinnamon|donut|cupcake|cookie|candy|sweet|roll co|sugar)\b/.test(text);
  return {
    isCozy: /\b(cozy|warm|homey|comfort|intimate|snug)\b/.test(text),
    isUpscale: /\b(upscale|premium|elegant|sophisticated|luxury|fine)\b/.test(text),
    isFamily: /\b(family|kids|friendly|casual|neighborhood)\b/.test(text),
    isCraft: /\b(craft|artisan|handmade|hand-crafted|small-batch|curated)\b/.test(text),
    isFast: /\b(fast|quick|express|grab)\b/.test(text),
    isStreet: /\b(street|streetfood|cart|stall|stand)\b/.test(text),
    isCoffee: /\b(coffee|espresso|roast|latte|brew|café|cafe)\b/.test(text),
    isBakery,
    isSweetBakery,
  };
}

// ─── Vibe Detection ─────────────────────────────────────────────────────────

function determineVibe(
  restaurant: Restaurant,
  priceLevel: number,
  keywords: VibeKeywords
): VibeMood {
  const cuisine = restaurant.cuisine[0] || "other";
  const type = restaurant.type;

  // Coffee → dark-moody (always)
  if (keywords.isCoffee) return "dark-moody";

  // Street food → bold-energetic (dark variant)
  if (keywords.isStreet) return "bold-energetic";

  // Fine dining → minimal-elegant
  if (type === "fine-dining" || priceLevel >= 3) return "minimal-elegant";

  // BBQ → bold-energetic
  if (cuisine === "bbq" || type === "pizza-bbq") return "bold-energetic";

  // Japanese/Korean → dark-moody
  if (cuisine === "japanese" || cuisine === "korean") return "dark-moody";

  // Bar/brewery → dark-moody
  if (type === "bar-brewery") return "dark-moody";

  // Bakery/cafe → warm-cozy
  if (keywords.isBakery || type === "cafe-bakery") return "warm-cozy";

  // Mediterranean/Italian/French → warm-cozy
  if (["mediterranean", "french", "italian"].includes(cuisine)) return "warm-cozy";

  // Vegan / seafood → rustic-earthy
  if (cuisine === "vegan" || cuisine === "seafood") return "rustic-earthy";

  // Mexican → bright-fresh
  if (cuisine === "mexican") return "bright-fresh";

  // Thai/Vietnamese → bright-fresh
  if (cuisine === "thai" || cuisine === "vietnamese") return "bright-fresh";

  return "bright-fresh";
}

// ─── Palette Generation ─────────────────────────────────────────────────────

/** Base palette without Stitch tokens (enriched later in generateDesignConfig) */
type BasePalette = Omit<DesignConfig["palette"], "stitch" | "stitchAccent" | "outlineVariant">;

function generatePalette(
  mood: VibeMood,
  cuisine: CuisineType,
  type: RestaurantType,
  keywords: VibeKeywords
): BasePalette {
  switch (mood) {
    case "dark-moody": {
      if (keywords.isCoffee) {
        return {
          background: "#1C1210",
          surface: "#2a1f1a",
          surfaceAlt: "#231b16",
          text: "#F5E6D3",
          textMuted: "#A89886",
          accent: "#C8956C",
          accentHover: "#B07D56",
          heroOverlay:
            "linear-gradient(to top, rgba(28,18,16,0.95), rgba(28,18,16,0.6), rgba(28,18,16,0.2))",
          navBackground: "rgba(28,18,16,0.95)",
          footerBackground: "#140e0c",
          footerText: "#A89886",
          menuCardBg: "#2a1f1a",
          menuCardBorder: "#3a2f28",
          reviewSectionBg: "#231b16",
        };
      }

      if (cuisine === "japanese" || cuisine === "korean") {
        // Deep ink-black with crimson soul — distinctly Japanese
        return {
          background: "#0c0a0e",
          surface: "#161218",
          surfaceAlt: "#110e13",
          text: "#f0ece8",
          textMuted: "#a89898",
          accent: "#DC2626",
          accentHover: "#B91C1C",
          heroOverlay:
            "linear-gradient(to top, rgba(12,10,14,0.92), rgba(12,10,14,0.5), rgba(12,10,14,0.15))",
          navBackground: "rgba(12,10,14,0.60)",
          footerBackground: "#060408",
          footerText: "#a89898",
          menuCardBg: "#161218",
          menuCardBorder: "#2a2228",
          reviewSectionBg: "#110e13",
        };
      }

      if (type === "bar-brewery") {
        // Deep midnight blue with amber warmth — distinctly bar/craft
        return {
          background: "#0e1018",
          surface: "#181c28",
          surfaceAlt: "#131722",
          text: "#e8e6f0",
          textMuted: "#8890a8",
          accent: "#D97706",
          accentHover: "#B45309",
          heroOverlay:
            "linear-gradient(to top, rgba(14,16,24,0.95), rgba(14,16,24,0.5), rgba(14,16,24,0.15))",
          navBackground: "rgba(14,16,24,0.60)",
          footerBackground: "#080a10",
          footerText: "#8890a8",
          menuCardBg: "#181c28",
          menuCardBorder: "#252a3a",
          reviewSectionBg: "#131722",
        };
      }

      if (cuisine === "bbq") {
        return {
          background: "#1c1917",
          surface: "#292524",
          surfaceAlt: "#211f1e",
          text: "#fafaf9",
          textMuted: "#a8a29e",
          accent: "#EA580C",
          accentHover: "#C2410C",
          heroOverlay:
            "linear-gradient(to top, rgba(28,25,23,0.95), rgba(28,25,23,0.5), rgba(28,25,23,0.15))",
          navBackground: "rgba(28,25,23,0.95)",
          footerBackground: "#0c0a09",
          footerText: "#a8a29e",
          menuCardBg: "#292524",
          menuCardBorder: "#44403c",
          reviewSectionBg: "#211f1e",
        };
      }

      // Generic dark-moody — smoky charcoal with warm undertone
      return {
        background: "#111010",
        surface: "#1b1918",
        surfaceAlt: "#151413",
        text: "#f2ede8",
        textMuted: "#a8a098",
        accent: "#C9A96E",
        accentHover: "#B8944F",
        heroOverlay:
          "linear-gradient(to top, rgba(17,16,16,0.92), rgba(17,16,16,0.5), rgba(17,16,16,0.15))",
        navBackground: "rgba(17,16,16,0.60)",
        footerBackground: "#0a0909",
        footerText: "#a8a098",
        menuCardBg: "#1b1918",
        menuCardBorder: "#2c2928",
        reviewSectionBg: "#151413",
      };
    }

    case "warm-cozy": {
      // Sweet bakery (cinnamon rolls, donuts, cupcakes) — peachy warmth
      if (keywords.isSweetBakery) {
        return {
          background: "#FFF5F0",
          surface: "#FFFFFF",
          surfaceAlt: "#FFEDE4",
          text: "#4a2012",
          textMuted: "#9B7A6B",
          accent: "#E8734A",
          accentHover: "#D4613A",
          heroOverlay:
            "linear-gradient(to top, rgba(74,32,18,0.88), rgba(74,32,18,0.4), rgba(74,32,18,0.1))",
          navBackground: "rgba(255,245,240,0.95)",
          footerBackground: "#4a2012",
          footerText: "#F5D6C8",
          menuCardBg: "#FFFFFF",
          menuCardBorder: "#F0DDD4",
          reviewSectionBg: "#FFEDE4",
        };
      }

      // Artisan bakery / cafe — cream warmth
      if (keywords.isBakery || type === "cafe-bakery") {
        return {
          background: "#FDF6EC",
          surface: "#FFFFFF",
          surfaceAlt: "#F7F0E4",
          text: "#3c2415",
          textMuted: "#8B7D6B",
          accent: "#d97706",
          accentHover: "#b45309",
          heroOverlay:
            "linear-gradient(to top, rgba(120,75,30,0.88), rgba(120,75,30,0.4), rgba(120,75,30,0.1))",
          navBackground: "rgba(253,246,236,0.95)",
          footerBackground: "#3c2415",
          footerText: "#F5E6D3",
          menuCardBg: "#FFFFFF",
          menuCardBorder: "#E8DFD1",
          reviewSectionBg: "#F7F0E4",
        };
      }

      if (cuisine === "mediterranean" || cuisine === "french") {
        return {
          background: "#FFF8F0",
          surface: "#FFFFFF",
          surfaceAlt: "#FFF0E0",
          text: "#2d1b0e",
          textMuted: "#8B7D6B",
          accent: "#D97706",
          accentHover: "#B45309",
          heroOverlay:
            "linear-gradient(to top, rgba(100,55,15,0.88), rgba(100,55,15,0.4), rgba(100,55,15,0.1))",
          navBackground: "rgba(255,248,240,0.95)",
          footerBackground: "#2d1b0e",
          footerText: "#F5E6D3",
          menuCardBg: "#FFFFFF",
          menuCardBorder: "#E8DFD1",
          reviewSectionBg: "#FFF0E0",
        };
      }

      if (cuisine === "italian") {
        return {
          background: "#FFFBEB",
          surface: "#FFFFFF",
          surfaceAlt: "#FFF5D6",
          text: "#451a03",
          textMuted: "#92400E",
          accent: "#991B1B",
          accentHover: "#7F1D1D",
          heroOverlay:
            "linear-gradient(to top, rgba(69,26,3,0.88), rgba(69,26,3,0.4), rgba(69,26,3,0.1))",
          navBackground: "rgba(255,251,235,0.95)",
          footerBackground: "#451a03",
          footerText: "#FDE68A",
          menuCardBg: "#FFFFFF",
          menuCardBorder: "#E8DFD1",
          reviewSectionBg: "#FFF5D6",
        };
      }

      // Default warm
      return {
        background: "#FFF8F0",
        surface: "#FFFFFF",
        surfaceAlt: "#FFF0E0",
        text: "#2d1b0e",
        textMuted: "#8B7D6B",
        accent: "#D97706",
        accentHover: "#B45309",
        heroOverlay:
          "linear-gradient(to top, rgba(100,55,15,0.85), rgba(100,55,15,0.4), rgba(100,55,15,0.1))",
        navBackground: "rgba(255,248,240,0.95)",
        footerBackground: "#2d1b0e",
        footerText: "#F5E6D3",
        menuCardBg: "#FFFFFF",
        menuCardBorder: "#E8DFD1",
        reviewSectionBg: "#FFF0E0",
      };
    }

    case "bold-energetic": {
      // Street food → dark energetic
      if (keywords.isStreet) {
        return {
          background: "#1a1a2e",
          surface: "#252545",
          surfaceAlt: "#1f1f38",
          text: "#f0f0f0",
          textMuted: "#a0a0b8",
          accent: "#F59E0B",
          accentHover: "#D97706",
          heroOverlay:
            "linear-gradient(to top, rgba(26,26,46,0.95), rgba(26,26,46,0.5), rgba(26,26,46,0.1))",
          navBackground: "rgba(26,26,46,0.95)",
          footerBackground: "#12121f",
          footerText: "#a0a0b8",
          menuCardBg: "#252545",
          menuCardBorder: "#35355a",
          reviewSectionBg: "#1f1f38",
        };
      }

      // BBQ / smokehouse
      if (cuisine === "bbq" || type === "pizza-bbq") {
        return {
          background: "#1c1917",
          surface: "#292524",
          surfaceAlt: "#211f1e",
          text: "#fafaf9",
          textMuted: "#a8a29e",
          accent: "#EA580C",
          accentHover: "#C2410C",
          heroOverlay:
            "linear-gradient(to top, rgba(28,25,23,0.92), rgba(28,25,23,0.5), rgba(28,25,23,0.15))",
          navBackground: "rgba(28,25,23,0.95)",
          footerBackground: "#0c0a09",
          footerText: "#a8a29e",
          menuCardBg: "#292524",
          menuCardBorder: "#44403c",
          reviewSectionBg: "#211f1e",
        };
      }

      // Default bold (fast casual)
      return {
        background: "#ffffff",
        surface: "#ffffff",
        surfaceAlt: "#f9fafb",
        text: "#111827",
        textMuted: "#6b7280",
        accent: "#EA580C",
        accentHover: "#C2410C",
        heroOverlay:
          "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), rgba(0,0,0,0.15))",
        navBackground: "rgba(255,255,255,0.95)",
        footerBackground: "#111827",
        footerText: "#9ca3af",
        menuCardBg: "#ffffff",
        menuCardBorder: "#e5e7eb",
        reviewSectionBg: "#f9fafb",
      };
    }

    case "minimal-elegant": {
      // Warm obsidian with gold — distinctly upscale, editorial
      return {
        background: "#100e0c",
        surface: "#1c1814",
        surfaceAlt: "#151210",
        text: "#f5f0e8",
        textMuted: "#b0a898",
        accent: "#C9A96E",
        accentHover: "#B8944F",
        heroOverlay:
          "linear-gradient(to top, rgba(16,14,12,0.92), rgba(16,14,12,0.5), rgba(16,14,12,0.15))",
        navBackground: "rgba(16,14,12,0.60)",
        footerBackground: "#0a0908",
        footerText: "#b0a898",
        menuCardBg: "#1c1814",
        menuCardBorder: "#2e2820",
        reviewSectionBg: "#151210",
      };
    }

    case "rustic-earthy": {
      if (cuisine === "seafood") {
        return {
          background: "#F0F7FF",
          surface: "#FFFFFF",
          surfaceAlt: "#E8F0FE",
          text: "#1e3a5f",
          textMuted: "#5b7a9d",
          accent: "#0F766E",
          accentHover: "#0D6660",
          heroOverlay:
            "linear-gradient(to top, rgba(30,58,95,0.85), rgba(30,58,95,0.4), rgba(30,58,95,0.1))",
          navBackground: "rgba(240,247,255,0.95)",
          footerBackground: "#1e3a5f",
          footerText: "#93b4d4",
          menuCardBg: "#FFFFFF",
          menuCardBorder: "#d1dae5",
          reviewSectionBg: "#E8F0FE",
        };
      }

      // Vegan / farm-to-table
      return {
        background: "#F0F4F0",
        surface: "#FFFFFF",
        surfaceAlt: "#E8EDE8",
        text: "#1a2e1a",
        textMuted: "#5a6b5a",
        accent: "#065F46",
        accentHover: "#064E3B",
        heroOverlay:
          "linear-gradient(to top, rgba(26,46,26,0.85), rgba(26,46,26,0.4), rgba(26,46,26,0.1))",
        navBackground: "rgba(240,244,240,0.95)",
        footerBackground: "#1a2e1a",
        footerText: "#8aa88a",
        menuCardBg: "#FFFFFF",
        menuCardBorder: "#d1ddd1",
        reviewSectionBg: "#E8EDE8",
      };
    }

    case "bright-fresh":
    default: {
      if (cuisine === "mexican") {
        // Warm terracotta warmth — sun-baked clay
        return {
          background: "#fdf8f2",
          surface: "#ffffff",
          surfaceAlt: "#fef0e0",
          text: "#2c1a0e",
          textMuted: "#8a6e58",
          accent: "#B45309",
          accentHover: "#92400E",
          heroOverlay:
            "linear-gradient(to top, rgba(44,26,14,0.88), rgba(44,26,14,0.4), rgba(44,26,14,0.1))",
          navBackground: "rgba(253,248,242,0.60)",
          footerBackground: "#2c1a0e",
          footerText: "#c4a888",
          menuCardBg: "#ffffff",
          menuCardBorder: "#f0dcc8",
          reviewSectionBg: "#fef0e0",
        };
      }

      if (cuisine === "thai" || cuisine === "vietnamese") {
        // Fresh green-gold — tropical brightness
        return {
          background: "#f8faf5",
          surface: "#ffffff",
          surfaceAlt: "#f0f5e8",
          text: "#1a2210",
          textMuted: "#687858",
          accent: "#D97706",
          accentHover: "#B45309",
          heroOverlay:
            "linear-gradient(to top, rgba(26,34,16,0.85), rgba(26,34,16,0.4), rgba(26,34,16,0.1))",
          navBackground: "rgba(248,250,245,0.60)",
          footerBackground: "#1a2210",
          footerText: "#a0b088",
          menuCardBg: "#ffffff",
          menuCardBorder: "#e0e8d4",
          reviewSectionBg: "#f0f5e8",
        };
      }

      // Default bright-fresh — clean teal-tinged modern
      return {
        background: "#f5fafa",
        surface: "#ffffff",
        surfaceAlt: "#edf5f4",
        text: "#0f2726",
        textMuted: "#4a7170",
        accent: "#0F766E",
        accentHover: "#0D6660",
        heroOverlay:
          "linear-gradient(to top, rgba(15,39,38,0.8), rgba(15,39,38,0.4), rgba(15,39,38,0.2))",
        navBackground: "rgba(245,250,250,0.60)",
        footerBackground: "#0f2726",
        footerText: "#78a8a6",
        menuCardBg: "#ffffff",
        menuCardBorder: "#d8e8e6",
        reviewSectionBg: "#edf5f4",
      };
    }
  }
}

// ─── Font Selection ─────────────────────────────────────────────────────────

function generateFonts(
  mood: VibeMood,
  cuisine: CuisineType,
  type: RestaurantType,
  keywords: VibeKeywords,
  priceLevel: number
): DesignConfig["fonts"] {
  if (keywords.isCoffee) {
    return {
      heading: "DM Serif Display",
      body: "Inter",
      menu: "Inter",
      weight: { heading: 400, body: 400 },
      style: "serif",
    };
  }

  if (keywords.isSweetBakery) {
    return {
      heading: "Fraunces",
      body: "Nunito",
      menu: "Nunito",
      weight: { heading: 600, body: 400 },
      style: "serif",
    };
  }

  if (keywords.isBakery || type === "cafe-bakery") {
    return {
      heading: "Playfair Display",
      body: "Lato",
      menu: "Lato",
      weight: { heading: 700, body: 400 },
      style: "serif",
    };
  }

  if (cuisine === "mediterranean" || cuisine === "french") {
    return {
      heading: "Cormorant Garamond",
      body: "Open Sans",
      menu: "Open Sans",
      weight: { heading: 600, body: 400 },
      style: "serif",
    };
  }

  if (cuisine === "italian") {
    return {
      heading: "Cormorant Garamond",
      body: "Lato",
      menu: "Lato",
      weight: { heading: 600, body: 400 },
      style: "serif",
    };
  }

  if (cuisine === "japanese" || cuisine === "korean") {
    return {
      heading: "Noto Serif",
      body: "Noto Sans",
      menu: "Noto Sans",
      weight: { heading: 600, body: 400 },
      style: "serif",
    };
  }

  if (keywords.isStreet || cuisine === "mexican") {
    return {
      heading: "Bebas Neue",
      body: "Source Sans 3",
      menu: "Source Sans 3",
      weight: { heading: 400, body: 400 },
      style: "display",
    };
  }

  if (cuisine === "bbq" || (cuisine === "american" && type !== "fine-dining")) {
    return {
      heading: "Oswald",
      body: "Roboto",
      menu: "Roboto",
      weight: { heading: 600, body: 400 },
      style: "slab",
    };
  }

  if (priceLevel >= 3 || type === "fine-dining") {
    return {
      heading: "Libre Baskerville",
      body: "Nunito",
      menu: "Nunito",
      weight: { heading: 400, body: 400 },
      style: "serif",
    };
  }

  if (cuisine === "vegan") {
    return {
      heading: "Fraunces",
      body: "Work Sans",
      menu: "Work Sans",
      weight: { heading: 600, body: 400 },
      style: "serif",
    };
  }

  // Default modern
  return {
    heading: "Sora",
    body: "DM Sans",
    menu: "DM Sans",
    weight: { heading: 600, body: 400 },
    style: "sans",
  };
}

// ─── Layout Generation ──────────────────────────────────────────────────────

function generateLayout(
  mood: VibeMood,
  type: RestaurantType,
  priceLevel: number,
  photoCount: number,
  keywords: VibeKeywords
): DesignConfig["layout"] {
  // Hero style
  let heroStyle: DesignConfig["layout"]["heroStyle"] = "full-bleed";
  if (photoCount < 3) heroStyle = "minimal";
  else if (priceLevel >= 4) heroStyle = "minimal";
  else if (priceLevel === 3) heroStyle = "editorial";

  // Menu style
  let menuStyle: DesignConfig["layout"]["menuStyle"] = "cards";
  if (priceLevel >= 4) menuStyle = "editorial";
  else if (priceLevel === 3) menuStyle = "list";

  // Nav style
  let navStyle: DesignConfig["layout"]["navStyle"] = "solid-light";
  if (
    mood === "dark-moody" ||
    mood === "minimal-elegant" ||
    mood === "bold-energetic"
  ) {
    navStyle = "transparent-overlay";
  }
  if (type === "fine-dining") navStyle = "transparent-overlay";

  // Corner radius
  let cornerRadius = "8px";
  if (keywords.isSweetBakery) cornerRadius = "20px";
  else if (keywords.isBakery || type === "cafe-bakery") cornerRadius = "16px";
  else if (priceLevel >= 4) cornerRadius = "0px";
  else if (priceLevel === 3) cornerRadius = "4px";

  // Spacing
  let spacing: DesignConfig["layout"]["spacing"] = "normal";
  if (priceLevel >= 3) spacing = "airy";
  else if (type === "fast-casual" || type === "food-truck") spacing = "tight";

  // Section order
  let sectionOrder: string[];
  if (priceLevel >= 3) {
    sectionOrder = ["hero", "about", "menu", "reviews", "contact", "location"];
  } else if (type === "fast-casual" || type === "food-truck") {
    sectionOrder = ["hero", "menu", "reviews", "location"];
  } else if (keywords.isBakery || type === "cafe-bakery") {
    sectionOrder = ["hero", "menu", "reviews", "about", "contact", "location"];
  } else if (type === "bar-brewery") {
    sectionOrder = ["hero", "menu", "reviews", "about", "location"];
  } else {
    sectionOrder = ["hero", "menu", "reviews", "about", "contact", "location"];
  }

  return { heroStyle, menuStyle, sectionOrder, navStyle, cornerRadius, spacing };
}

// ─── Effects Generation ─────────────────────────────────────────────────────

function generateEffects(
  mood: VibeMood,
  type: RestaurantType,
  priceLevel: number,
  keywords: VibeKeywords
): DesignConfig["effects"] {
  if (priceLevel >= 3 || type === "fine-dining" || mood === "minimal-elegant") {
    return {
      heroParallax: true,
      menuItemHoverScale: 1.02,
      sectionDividers: "none",
      imageFilter: "saturate(1.1) contrast(1.05)",
      animationSpeed: "subtle",
    };
  }

  if (type === "fast-casual" || keywords.isStreet || mood === "bold-energetic") {
    return {
      heroParallax: false,
      menuItemHoverScale: 1.05,
      sectionDividers: "gradient",
      imageFilter: "saturate(1.15) contrast(1.05)",
      animationSpeed: "energetic",
    };
  }

  if (keywords.isBakery || keywords.isCoffee || mood === "warm-cozy") {
    return {
      heroParallax: false,
      menuItemHoverScale: 1.03,
      sectionDividers: "line",
      imageFilter: "saturate(1.05) contrast(1.02)",
      animationSpeed: "normal",
    };
  }

  return {
    heroParallax: false,
    menuItemHoverScale: 1.03,
    sectionDividers: "line",
    imageFilter: "none",
    animationSpeed: "normal",
  };
}

// ─── Vibe Generation ────────────────────────────────────────────────────────

function generateVibeDescription(
  mood: VibeMood,
  cuisine: CuisineType,
  name: string
): string {
  const moodDescriptions: Record<VibeMood, string> = {
    "warm-cozy": "warm and inviting with a cozy atmosphere",
    "bold-energetic": "bold and energetic with vibrant character",
    "minimal-elegant": "refined and elegant with understated luxury",
    "dark-moody": "intimate and atmospheric with rich depth",
    "bright-fresh": "clean and modern with fresh appeal",
    "rustic-earthy": "natural and grounded with organic warmth",
  };

  return `${name} — ${moodDescriptions[mood]}, featuring ${cuisine} cuisine`;
}

// ─── Deep Merge Utility ─────────────────────────────────────────────────────

function deepMerge<T extends object>(base: T, overrides: Partial<T>): T {
  const result: T = { ...base };
  const resultRecord = result as Record<string, unknown>;
  const baseRecord = base as Record<string, unknown>;
  const overridesRecord = overrides as Record<string, unknown>;

  for (const key of Object.keys(overridesRecord)) {
    const val = overridesRecord[key];
    if (val === undefined) continue;

    if (typeof val === "object" && val !== null && !Array.isArray(val)) {
      resultRecord[key] = deepMerge(
        (baseRecord[key] as object) || {},
        val as Record<string, unknown>
      );
    } else {
      resultRecord[key] = val;
    }
  }

  return result;
}

// ─── Main Export ────────────────────────────────────────────────────────────

export function generateDesignConfig(restaurant: Restaurant): DesignConfig {
  const priceLevel = derivePriceLevel(restaurant);
  const photoCount = countPhotos(restaurant);
  const keywords = detectVibeKeywords(restaurant);
  const cuisine = restaurant.cuisine[0] || "other";
  const type = restaurant.type;

  const mood = determineVibe(restaurant, priceLevel, keywords);
  const basePalette = generatePalette(mood, cuisine, type, keywords);
  const bgHex = basePalette.background.replace("#", "");
  const dark = bgHex.length === 6 && (
    0.299 * (parseInt(bgHex.substring(0, 2), 16) / 255) +
    0.587 * (parseInt(bgHex.substring(2, 4), 16) / 255) +
    0.114 * (parseInt(bgHex.substring(4, 6), 16) / 255)
  ) < 0.35;
  const palette: DesignConfig["palette"] = {
    ...basePalette,
    stitch: deriveStitchSurfaces(basePalette.background, basePalette.accent, dark),
    stitchAccent: deriveStitchAccent(basePalette.accent, dark),
    outlineVariant: deriveOutlineVariant(basePalette.background, basePalette.accent, dark),
  };
  const fonts = generateFonts(mood, cuisine, type, keywords, priceLevel);
  const layout = generateLayout(mood, type, priceLevel, photoCount, keywords);
  const effects = generateEffects(mood, type, priceLevel, keywords);
  const personality = generateVibeDescription(mood, cuisine, restaurant.name);

  const config: DesignConfig = {
    palette,
    fonts,
    layout,
    effects,
    vibe: { mood, personality },
  };

  // Apply overrides if present
  if (restaurant.designOverrides) {
    return deepMerge(config, restaurant.designOverrides as Partial<DesignConfig>);
  }

  return config;
}

/**
 * Check if a design config uses a dark background.
 * Useful for components that need to know if they should use light text.
 */
export function isDarkDesign(config: DesignConfig): boolean {
  const bg = config.palette.background;
  const c = bg.replace("#", "");
  if (c.length !== 6) return false;
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  return 0.299 * r + 0.587 * g + 0.114 * b < 0.35;
}
