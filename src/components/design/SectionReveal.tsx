"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useDesign } from "./DesignProvider";

interface SectionRevealProps {
  children: ReactNode;
}

export function SectionReveal({ children }: SectionRevealProps) {
  const design = useDesign();
  const duration = design.effects.animationSpeed === "subtle" ? 0.8 : design.effects.animationSpeed === "energetic" ? 0.4 : 0.6;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
