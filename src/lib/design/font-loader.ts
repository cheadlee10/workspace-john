/**
 * Google Fonts Loader
 *
 * Maps design config font names to Google Fonts URLs.
 * Max 2 families, 2-3 weights each for performance.
 */

import type { DesignConfig } from "./design-engine";

interface FontSpec {
  family: string;
  weights: number[];
}

const FONT_SPECS: Record<string, FontSpec> = {
  "Playfair Display": { family: "Playfair+Display", weights: [400, 600, 700, 800] },
  "Cormorant Garamond": { family: "Cormorant+Garamond", weights: [400, 500, 600, 700] },
  "DM Serif Display": { family: "DM+Serif+Display", weights: [400] },
  "Bebas Neue": { family: "Bebas+Neue", weights: [400] },
  "Noto Serif": { family: "Noto+Serif", weights: [400, 600, 700] },
  "Noto Serif JP": { family: "Noto+Serif+JP", weights: [400, 600, 700] },
  Fraunces: { family: "Fraunces", weights: [400, 500, 600, 700] },
  Sora: { family: "Sora", weights: [400, 500, 600, 700] },
  Oswald: { family: "Oswald", weights: [400, 500, 600, 700] },
  "Libre Baskerville": { family: "Libre+Baskerville", weights: [400, 700] },
  Lato: { family: "Lato", weights: [300, 400, 700] },
  "Open Sans": { family: "Open+Sans", weights: [300, 400, 600, 700] },
  Inter: { family: "Inter", weights: [300, 400, 500, 600, 700] },
  "Source Sans 3": { family: "Source+Sans+3", weights: [300, 400, 600, 700] },
  "Noto Sans": { family: "Noto+Sans", weights: [300, 400, 600, 700] },
  "Work Sans": { family: "Work+Sans", weights: [300, 400, 500, 600, 700] },
  "DM Sans": { family: "DM+Sans", weights: [400, 500, 600, 700] },
  Roboto: { family: "Roboto", weights: [300, 400, 500, 700] },
  Nunito: { family: "Nunito", weights: [300, 400, 600, 700] },
};

function fontQueryParam(spec: FontSpec): string {
  const weightsStr = spec.weights.join(";");
  return `family=${spec.family}:wght@${weightsStr}`;
}

/**
 * Build a Google Fonts URL from the design config's font selection.
 * Returns null if fonts are system fonts that don't need loading.
 */
export function buildGoogleFontsUrl(
  fonts: DesignConfig["fonts"]
): string | null {
  const families: string[] = [];

  const headingSpec = FONT_SPECS[fonts.heading];
  if (headingSpec) families.push(fontQueryParam(headingSpec));

  const bodySpec = FONT_SPECS[fonts.body];
  if (bodySpec && fonts.body !== fonts.heading) {
    families.push(fontQueryParam(bodySpec));
  }

  if (families.length === 0) return null;

  return `https://fonts.googleapis.com/css2?${families.join("&")}&display=swap`;
}
