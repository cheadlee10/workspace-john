"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Restaurant } from "@/types/restaurant";
import { isOpen } from "@/lib/utils";
import { useDesign, isDarkMood } from "@/components/design/DesignProvider";

interface RestaurantHeroProps {
  restaurant: Restaurant;
}

export function RestaurantHero({ restaurant }: RestaurantHeroProps) {
  const { branding, name, tagline, contact, hours, features } = restaurant;
  const openStatus = isOpen(hours);
  const design = useDesign();
  const { palette, effects } = design;
  const [imageLoaded, setImageLoaded] = useState(false);
  const dark = isDarkMood(design);

  const animDuration = effects.animationSpeed === "subtle" ? 1.0 : effects.animationSpeed === "energetic" ? 0.6 : 0.8;

  // #6 Staggered hero elements
  const stagger = (i: number) => ({ delay: i * 0.25 });

  return (
    <section className="relative min-h-[70vh] overflow-hidden md:min-h-screen" aria-label={`${name} hero`}>
      {/* #11 Loading Shimmer */}
      {branding.heroImage && !imageLoaded && (
        <div className="hero-shimmer absolute inset-0" style={{ backgroundColor: palette.background }} />
      )}

      {/* #1 Ken Burns Background Image */}
      {branding.heroImage && (
        <div className="absolute inset-0 hero-ken-burns">
          <Image
            src={branding.heroImage}
            alt={`${name} restaurant`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            quality={85}
            style={{ filter: effects.imageFilter !== "none" ? effects.imageFilter : undefined }}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      )}

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: palette.heroOverlay }}
      />

      {/* Content — #6 staggered reveals */}
      <div className="relative z-10 flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4 text-center sm:px-6 md:min-h-screen">
        {/* Branding: logo OR text wordmark, never both */}
        {branding.logo ? (
          <motion.img
            src={branding.logo}
            alt={name}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: animDuration * 0.75, ...stagger(0) }}
            className="mb-4 h-auto w-[220px] max-w-[70vw] object-contain sm:w-[280px] md:w-[340px]"
            style={{
              mixBlendMode: dark ? "screen" : "multiply",
              filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))",
            }}
          />
        ) : (
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animDuration * 0.75, ...stagger(0) }}
            className="mb-2 text-5xl font-bold tracking-tight drop-shadow-lg sm:text-6xl md:text-7xl lg:text-8xl"
            style={dark ? {
              background: `linear-gradient(135deg, #ffffff 0%, ${palette.accent} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            } : { color: "#ffffff" }}
          >
            {name}
          </motion.h1>
        )}

        {/* Tagline */}
        {tagline && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animDuration * 0.75, ...stagger(1) }}
            className="mb-4 max-w-lg text-lg font-light text-white/90 sm:text-xl"
          >
            {tagline}
          </motion.p>
        )}

        {/* Open/Closed Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: animDuration * 0.75, ...stagger(1.5) }}
          className="mb-6"
        >
          <div
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm ${
              openStatus.isCurrentlyOpen
                ? "bg-emerald-500/20 text-emerald-300"
                : "bg-red-500/20 text-red-300"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                openStatus.isCurrentlyOpen ? "bg-emerald-400" : "bg-red-400"
              }`}
            />
            {openStatus.isCurrentlyOpen ? "Open Now" : "Closed"} &middot;{" "}
            {openStatus.nextChange}
          </div>
        </motion.div>

        {/* CTA Buttons + #9 CTA glow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: animDuration * 0.75, ...stagger(2) }}
          className="flex flex-col gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="#menu"
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:brightness-110 active:scale-[0.98]"
            style={{
              backgroundColor: palette.accent,
              borderRadius: design.layout.cornerRadius,
            }}
          >
            View Menu
          </a>

          {features.onlineOrdering && (
            <a
              href="#order"
              className="cta-glow inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:brightness-110 active:scale-[0.98]"
              style={{
                backgroundColor: palette.accent,
                borderRadius: design.layout.cornerRadius,
                "--glow-color": palette.accent,
              } as React.CSSProperties}
            >
              Order Now
            </a>
          )}

          {features.reservations && (
            <a
              href="#reservations"
              className="inline-flex items-center justify-center border-2 border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              style={{ borderRadius: design.layout.cornerRadius }}
            >
              Reserve a Table
            </a>
          )}

          <a
            href={`tel:${contact.phone}`}
            className="inline-flex items-center justify-center gap-2 border-2 border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
            style={{ borderRadius: design.layout.cornerRadius }}
            aria-label={`Call ${name} at ${contact.phone}`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Call Us
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator — stagger 3 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center text-white/50"
        >
          <span className="mb-1 text-xs">Scroll</span>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
