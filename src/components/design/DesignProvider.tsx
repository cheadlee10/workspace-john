"use client";

import { createContext, useContext, useEffect, type ReactNode } from "react";
import type { DesignConfig } from "@/lib/design/design-engine";
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

  return (
    <DesignContext.Provider value={config}>
      <div
        style={{
          backgroundColor: config.palette.background,
          color: config.palette.text,
          fontFamily: bodyFont,
        }}
        className="min-h-screen"
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
