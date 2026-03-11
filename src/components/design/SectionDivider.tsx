"use client";

import { useDesign } from "./DesignProvider";

export function SectionDivider() {
  const design = useDesign();
  const { sectionDividers } = design.effects;
  const { accent, background } = design.palette;

  if (sectionDividers === "none") return null;

  if (sectionDividers === "gradient") {
    return (
      <div
        className="mx-auto h-px max-w-4xl"
        style={{
          background: `linear-gradient(to right, transparent, ${accent}40, transparent)`,
        }}
      />
    );
  }

  if (sectionDividers === "pattern") {
    return (
      <div className="flex justify-center py-4">
        <svg width="120" height="16" viewBox="0 0 120 16" fill="none">
          <path
            d="M0 8 Q15 0 30 8 Q45 16 60 8 Q75 0 90 8 Q105 16 120 8"
            stroke={accent}
            strokeWidth="1.5"
            strokeOpacity="0.3"
            fill="none"
          />
        </svg>
      </div>
    );
  }

  // Default: line
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div
        className="h-px"
        style={{ backgroundColor: `${accent}20`, background: `linear-gradient(to right, ${background}, ${accent}30, ${background})` }}
      />
    </div>
  );
}
