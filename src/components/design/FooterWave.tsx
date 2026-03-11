"use client";

import { useDesign } from "./DesignProvider";

export function FooterWave() {
  const design = useDesign();
  const fill = design.palette.footerBackground;

  return (
    <div className="-mb-px" aria-hidden="true">
      <svg
        viewBox="0 0 1440 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full"
        preserveAspectRatio="none"
        style={{ height: "48px" }}
      >
        <path
          d="M0 48h1440V24c-120-8-240 8-360 12S840 28 720 20 480 4 360 8 120 24 0 28v20z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
