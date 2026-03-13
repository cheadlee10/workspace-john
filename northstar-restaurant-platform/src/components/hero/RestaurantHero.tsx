"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Restaurant } from "@/types/restaurant";
import { isOpen } from "@/lib/utils";
import { useDesign } from "@/components/design/DesignProvider";

function addBgRemoval(url: string): string {
  const isSvg = /\.svg(\?|$)/i.test(url);
  if (url.includes("res.cloudinary.com") && !isSvg) {
    return url.replace("/image/upload/", "/image/upload/e_background_removal/");
  }
  return url;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

/** Build Cloudinary-optimized video URL for the given viewport */
function optimizedVideoUrl(url: string, mobile: boolean): string {
  if (!url.includes("res.cloudinary.com")) return url;
  const width = mobile ? "w_640" : "w_1280";
  return url.replace("/video/upload/", `/video/upload/q_auto,f_auto,${width}/`);
}

interface RestaurantHeroProps {
  restaurant: Restaurant;
}

export function RestaurantHero({ restaurant }: RestaurantHeroProps) {
  const { branding, name, tagline, contact, hours, features } = restaurant;
  const openStatus = isOpen(hours);
  const design = useDesign();
  const { palette, effects } = design;

  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [mobilePlayRequested, setMobilePlayRequested] = useState(false);

  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLSectionElement>(null);

  const heroVideo = branding.heroVideo;
  const posterUrl = branding.heroVideoPoster || branding.heroImage;
  const showVideo = heroVideo && !reducedMotion && (!isMobile || mobilePlayRequested);

  // IntersectionObserver: pause/resume video when scrolled out of view
  useEffect(() => {
    const video = videoRef.current;
    const hero = heroRef.current;
    if (!video || !hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [showVideo]);

  // Logo overlay for video loop outro (Commit 5)
  const [showLogoOverlay, setShowLogoOverlay] = useState(false);
  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const timeRemaining = video.duration - video.currentTime;
    setShowLogoOverlay(timeRemaining < 1.5);
  }, []);

  const animDuration = effects.animationSpeed === "subtle" ? 1.0 : effects.animationSpeed === "energetic" ? 0.6 : 0.8;
  const stagger = (i: number) => ({ delay: i * 0.25 });

  return (
    <section ref={heroRef} className="relative min-h-[70vh] overflow-hidden md:min-h-screen" aria-label={`${name} hero`}>
      {/* Loading Shimmer */}
      {(branding.heroImage || posterUrl) && !imageLoaded && !videoReady && (
        <div className="hero-shimmer absolute inset-0" style={{ backgroundColor: palette.background }} />
      )}

      {/* Poster / Ken Burns Background Image — always present, fades out when video ready */}
      {posterUrl && (
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            videoReady ? "opacity-0" : "opacity-100"
          } ${!reducedMotion && !videoReady ? "hero-ken-burns" : ""}`}
        >
          <Image
            src={posterUrl}
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

      {/* Background Video — desktop auto, mobile on tap */}
      {showVideo && (
        <video
          ref={videoRef}
          src={optimizedVideoUrl(heroVideo, isMobile)}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setVideoReady(true)}
          onTimeUpdate={handleTimeUpdate}
          onError={() => setVideoReady(false)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Mobile play button */}
      {heroVideo && isMobile && !mobilePlayRequested && !reducedMotion && (
        <button
          onClick={() => setMobilePlayRequested(true)}
          className="absolute bottom-20 right-4 z-20 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-sm text-white backdrop-blur-sm transition-all hover:bg-black/70"
          aria-label="Play background video"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Play Video
        </button>
      )}

      {/* Logo outro overlay — fades in during last 1.5s of video loop */}
      {videoReady && showLogoOverlay && branding.logo && (
        <div className="absolute inset-0 z-[5] flex items-center justify-center">
          <img
            src={addBgRemoval(branding.logo)}
            alt=""
            aria-hidden="true"
            className="h-auto w-[200px] object-contain drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)] transition-opacity duration-500"
            style={{ opacity: showLogoOverlay ? 1 : 0 }}
          />
        </div>
      )}

      {/* Dark overlay — solid enough for white text to read on any photo/video */}
      <div className="absolute inset-0 bg-black/55" style={{ zIndex: 6 }} />

      {/* Content */}
      <div className="relative flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4 text-center sm:px-6 md:min-h-screen" style={{ zIndex: 10 }}>
        {/* Prominent logo */}
        {branding.logo && (
          <motion.img
            src={addBgRemoval(branding.logo)}
            alt={`${name} logo`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animDuration * 0.75, ...stagger(0) }}
            className="mb-2 h-auto w-[220px] object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)] sm:w-[280px] md:w-[340px]"
          />
        )}

        {/* Restaurant name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: animDuration * 0.75, ...stagger(0) }}
          className="mb-2 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          style={{
            color: "#ffffff",
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}
        >
          {name}
        </motion.h1>

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

        {/* CTA Buttons */}
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

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        style={{ zIndex: 10 }}
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
