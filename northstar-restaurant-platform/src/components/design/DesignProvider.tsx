"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import type { DesignConfig } from "@/lib/design/design-engine";
import type React from "react";
import { buildGoogleFontsUrl } from "@/lib/design/font-loader";

const DesignContext = createContext<DesignConfig | null>(null);

/** Default config matching current hardcoded styles (backward compatible) */
const DEFAULT_CONFIG: DesignConfig = {
  palette: {
    background: "#ffffff",
    surface: "#ffffff",
    surfaceAlt: "#f9fafb",
    text: "#111827",
    textMuted: "#6b7280",
    accent: "#D4A574",
    accentHover: "#C4956A",
    heroOverlay:
      "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), rgba(0,0,0,0.2))",
    navBackground: "rgba(255,255,255,0.95)",
    footerBackground: "#1a1a2e",
    footerText: "#9ca3af",
    menuCardBg: "#ffffff",
    menuCardBorder: "#f3f4f6",
    reviewSectionBg: "#f9fafb",
    stitch: {
      base: "#ffffff",
      containerLowest: "#ffffff",
      containerLow: "#f5f3f0",
      container: "#efecea",
      containerHigh: "#e9e6e3",
      containerHighest: "#e3e0dd",
    },
    stitchAccent: {
      primary: "#D4A574",
      primaryContainer: "#ae8060",
      onPrimary: "#3b2a15",
      tertiary: "#c19e92",
    },
    outlineVariant: "#d7d3cf",
  },
  fonts: {
    heading: "system-ui",
    body: "system-ui",
    menu: "system-ui",
    weight: { heading: 700, body: 400 },
    style: "sans",
  },
  layout: {
    heroStyle: "full-bleed",
    menuStyle: "cards",
    sectionOrder: ["hero", "menu", "reviews", "about", "contact", "location"],
    navStyle: "solid-light",
    cornerRadius: "8px",
    spacing: "normal",
  },
  effects: {
    heroParallax: false,
    menuItemHoverScale: 1.03,
    sectionDividers: "line",
    imageFilter: "none",
    animationSpeed: "normal",
  },
  vibe: {
    mood: "bright-fresh",
    personality: "A modern restaurant",
  },
};

export function useDesign(): DesignConfig {
  const ctx = useContext(DesignContext);
  return ctx || DEFAULT_CONFIG;
}

/** Check if current design uses a dark background */
export function isDarkMood(config: DesignConfig): boolean {
  const mood = config.vibe.mood;
  return mood === "dark-moody" || mood === "bold-energetic" || mood === "minimal-elegant";
}

interface DesignProviderProps {
  config: DesignConfig;
  children: ReactNode;
}

export function DesignProvider({ config, children }: DesignProviderProps) {
  // Load Google Fonts dynamically
  useEffect(() => {
    const url = buildGoogleFontsUrl(config.fonts);
    if (!url) return;

    // Don't duplicate if already loaded
    const existing = document.querySelector(`link[href="${url}"]`);
    if (existing) return;

    const link = document.createElement("link");
    link.href = url;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, [config.fonts]);

  const headingFont = `'${config.fonts.heading}', ${config.fonts.style === "serif" ? "Georgia, serif" : "system-ui, sans-serif"}`;
  const bodyFont = `'${config.fonts.body}', system-ui, sans-serif`;

  // Map vibe mood to texture class
  const textureClass =
    config.vibe.mood === "dark-moody" ? "texture-noise" :
    config.vibe.mood === "warm-cozy" ? "texture-linen" :
    config.vibe.mood === "rustic-earthy" ? "texture-organic" :
    "";

  // Build CSS custom properties for Stitch tokens
  const stitchVars: Record<string, string> = {};
  if (config.palette.stitch) {
    const s = config.palette.stitch;
    stitchVars["--stitch-surface"] = s.base;
    stitchVars["--stitch-surface-container-lowest"] = s.containerLowest;
    stitchVars["--stitch-surface-container-low"] = s.containerLow;
    stitchVars["--stitch-surface-container"] = s.container;
    stitchVars["--stitch-surface-container-high"] = s.containerHigh;
    stitchVars["--stitch-surface-container-highest"] = s.containerHighest;
  }
  if (config.palette.stitchAccent) {
    const a = config.palette.stitchAccent;
    stitchVars["--stitch-primary"] = a.primary;
    stitchVars["--stitch-primary-container"] = a.primaryContainer;
    stitchVars["--stitch-on-primary"] = a.onPrimary;
    stitchVars["--stitch-tertiary"] = a.tertiary;
  }
  if (config.palette.outlineVariant) {
    stitchVars["--stitch-outline-variant"] = config.palette.outlineVariant;
  }
  stitchVars["--stitch-on-surface"] = config.palette.text;
  stitchVars["--stitch-on-surface-variant"] = config.palette.textMuted;

  return (
    <DesignContext.Provider value={config}>
      <div
        style={{
          backgroundColor: config.palette.background,
          color: config.palette.text,
          fontFamily: bodyFont,
          ...stitchVars,
        } as React.CSSProperties}
        className={`min-h-screen ${textureClass}`}
        data-design-mood={config.vibe.mood}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
              [data-design-mood] h1,
              [data-design-mood] h2,
              [data-design-mood] h3 {
                font-family: ${headingFont};
              }
            `,
          }}
        />
        {children}
      </div>
    </DesignContext.Provider>
  );
}
