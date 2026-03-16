"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useDesign } from "@/components/design/DesignProvider";

interface BrandBarProps {
  logoUrl?: string;
}

function addBgRemoval(url: string): string {
  const isSvg = /\.svg(\?|$)/i.test(url);
  if (url.includes("res.cloudinary.com") && !isSvg) {
    return url.replace("/image/upload/", "/image/upload/e_background_removal/");
  }
  return url;
}

export function BrandBar({ logoUrl }: BrandBarProps) {
  const design = useDesign();
  const { palette } = design;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  if (!logoUrl) return null;

  return (
    <section
      ref={ref}
      className="py-6 md:py-10"
      style={{ backgroundColor: palette.surfaceAlt }}
    >
      <div className="flex flex-col items-center gap-4">
        <motion.img
          src={addBgRemoval(logoUrl)}
          alt="Restaurant logo"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="h-auto w-[240px] object-contain md:w-[360px]"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="h-0.5 w-12 rounded-full"
          style={{ backgroundColor: palette.accent }}
        />
      </div>
    </section>
  );
}
