"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { PricingSection } from "@/components/pricing/PricingSection";

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------
const EMERALD = "#10B981";
const NAVY = "#050A18";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const STATS = [
  {
    value: "0%",
    label: "Ordering Commission",
    icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
  },
  {
    value: "$0",
    label: "Setup Fee",
    icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    value: "48hr",
    label: "Launch Time",
    icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    value: "$49",
    label: "Starting Price/mo",
    icon: "M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z",
  },
];

const PAIN_POINTS = [
  { stat: "30%", text: "of every order goes to DoorDash and UberEats" },
  {
    stat: "43%",
    text: "of delivery app customers can\u2019t remember your restaurant\u2019s name",
  },
  {
    stat: "$16K",
    text: "per year saved by restaurants that switch to direct ordering",
  },
];

const FEATURES = [
  {
    icon: "M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z",
    title: "Commission-Free Ordering",
    description:
      "Keep 100% of your revenue. No per-order fees, no hidden charges. Just a flat monthly rate.",
  },
  {
    icon: "M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3",
    title: "Mobile-First Design",
    description:
      "70% of your customers browse on their phone. Every site we build is designed for mobile first, desktop second.",
  },
  {
    icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
    title: 'Dominate "Near Me" Searches',
    description:
      "Built-in SEO, schema markup, and Google Business optimization so hungry customers find you first.",
  },
  {
    icon: "M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z",
    title: "Easy Menu Updates",
    description:
      "Change prices, add specials, mark items sold out. Update from your phone in seconds, or we do it for you.",
  },
  {
    icon: "M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z",
    title: "Own Your Customer Data",
    description:
      "Every order builds YOUR customer list. No more losing relationships to third-party apps.",
  },
  {
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75",
    title: "Live in 48 Hours",
    description:
      "We handle the entire build. You approve a preview, we flip the switch. Most restaurants go live in under 2 days.",
  },
];

// ---------------------------------------------------------------------------
// Reusable animated wrapper
// ---------------------------------------------------------------------------
function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <>
      {/* ================================================================= */}
      {/* HERO                                                              */}
      {/* ================================================================= */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ backgroundColor: NAVY }}
      >
        {/* Radial mesh gradients */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(16,185,129,0.08) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 60%, rgba(45,212,191,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 50% 20%, rgba(16,185,129,0.05) 0%, transparent 60%)",
          }}
        />
        {/* Subtle grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(16,185,129,0.5) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <motion.div
          style={{ y: heroY }}
          className="relative mx-auto max-w-6xl px-6 pb-24 pt-28 sm:pb-32 sm:pt-36"
        >
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="font-medium text-emerald-300">
                Built for restaurant owners
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              We build websites that turn hungry visitors into{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #10B981 0%, #2DD4BF 100%)",
                }}
              >
                paying customers
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl"
              style={{ lineHeight: 1.6 }}
            >
              Custom restaurant websites with built-in online ordering, SEO, and
              reviews — live in 48 hours. No commissions. No setup fees.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/demo"
                  className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/30"
                  style={{ backgroundColor: EMERALD }}
                >
                  See a Live Demo
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-slate-600 px-8 py-4 text-base font-bold text-white transition-all hover:border-slate-400 hover:bg-white/5"
                >
                  View Pricing
                </a>
              </motion.div>
            </motion.div>

            {/* Social proof */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 text-sm text-slate-500"
            >
              Launching March 2026 in the Pacific Northwest
            </motion.p>
          </div>

          {/* Browser Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              type: "spring",
              stiffness: 60,
              damping: 20,
            }}
            className="relative mx-auto mt-16 max-w-4xl"
            style={{ perspective: "1200px" }}
          >
            {/* Glow behind browser */}
            <div
              className="absolute -inset-8 rounded-3xl blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(16,185,129,0.15) 0%, transparent 70%)",
              }}
            />

            {/* Browser frame with 3D perspective */}
            <motion.div
              animate={{ rotateX: [0, 1, 0], rotateY: [0, -1, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="relative overflow-hidden rounded-xl border border-slate-700/40 shadow-2xl shadow-black/50"
              style={{ backgroundColor: "#0B1120" }}
            >
              {/* Browser chrome bar */}
              <div className="flex items-center gap-2 border-b border-slate-700/40 bg-slate-800/60 px-4 py-3 backdrop-blur-sm">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-500/80" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="mx-auto flex items-center gap-2 rounded-md bg-slate-900/80 px-4 py-1 text-xs text-slate-400">
                  <svg
                    className="h-3 w-3 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  yourrestaurant.com
                </div>
              </div>

              {/* Screenshot area */}
              <Link href="/demo" className="group relative block">
                <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                  {/* Simulated restaurant hero */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <div className="mb-3 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
                      Sakura Kitchen
                    </div>
                    <p className="mb-6 text-base text-white/60 sm:text-lg">
                      Authentic Japanese Cuisine in Woodinville
                    </p>
                    <div className="flex gap-3">
                      <span
                        className="rounded-full px-5 py-2.5 text-sm font-semibold text-white"
                        style={{ backgroundColor: EMERALD }}
                      >
                        View Menu
                      </span>
                      <span className="rounded-full border-2 border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm">
                        Order Online
                      </span>
                    </div>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
                    <span
                      className="scale-90 rounded-full px-6 py-3 text-sm font-bold text-white opacity-0 shadow-xl transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
                      style={{ backgroundColor: EMERALD }}
                    >
                      Click to explore the live demo
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Floating badge — left: New Order! */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="absolute -left-6 top-1/3 hidden rounded-xl border border-slate-700/40 bg-slate-800/90 p-3 shadow-lg shadow-black/30 backdrop-blur-md lg:block"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
                  <svg
                    className="h-4 w-4 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">New Order!</div>
                  <div className="text-[10px] text-slate-400">
                    $47.50 - Pickup
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating badge — right: +1 Customer */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -right-6 top-2/3 hidden rounded-xl border border-slate-700/40 bg-slate-800/90 p-3 shadow-lg shadow-black/30 backdrop-blur-md lg:block"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/20">
                  <svg
                    className="h-4 w-4 text-teal-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    +1 Customer
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Added to your list
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating badge — top right: 5-star review */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -right-2 top-1/4 hidden rounded-xl border border-slate-700/40 bg-slate-800/90 p-3 shadow-lg shadow-black/30 backdrop-blur-md lg:block"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20">
                  <svg
                    className="h-4 w-4 text-amber-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    5-Star Review
                  </div>
                  <div className="text-[10px] text-slate-400">
                    &ldquo;Amazing food!&rdquo;
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ================================================================= */}
      {/* TRUST / STATS BAR                                                 */}
      {/* ================================================================= */}
      <section
        className="relative border-y border-slate-800/40"
        style={{ backgroundColor: "#070E1F" }}
      >
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-14 sm:py-16 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                  <svg
                    className="h-5 w-5 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={stat.icon}
                    />
                  </svg>
                </div>
                <div
                  className="text-3xl font-extrabold sm:text-4xl"
                  style={{ color: EMERALD }}
                >
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* PROBLEM SECTION                                                   */}
      {/* ================================================================= */}
      <section className="relative py-24 sm:py-32" style={{ backgroundColor: NAVY }}>
        {/* Subtle gradient */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(16,185,129,0.04) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2
                className="mb-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl"
                style={{ letterSpacing: "-0.02em" }}
              >
                Third-party apps are eating your profits
              </h2>
              <p className="text-lg text-slate-400" style={{ lineHeight: 1.6 }}>
                Every order through DoorDash or UberEats costs you money and
                customers. Here&apos;s what the data shows:
              </p>
            </div>
          </ScrollReveal>

          {/* Pain point cards */}
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {PAIN_POINTS.map((point, i) => (
              <ScrollReveal key={point.stat} delay={i * 0.12}>
                <div className="relative overflow-hidden rounded-2xl border border-slate-700/40 bg-slate-800/30 p-8 text-center backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:bg-slate-800/50">
                  {/* Subtle glow */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, rgba(16,185,129,0.05) 0%, transparent 70%)",
                    }}
                  />
                  <div
                    className="text-5xl font-extrabold"
                    style={{ color: EMERALD }}
                  >
                    {point.stat}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {point.text}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Comparison table */}
          <ScrollReveal delay={0.2}>
            <div className="mt-16">
              <h3
                className="mb-6 text-center text-lg font-bold text-white"
                style={{ letterSpacing: "-0.01em" }}
              >
                See how we compare
              </h3>
              <div className="mx-auto max-w-3xl overflow-hidden rounded-xl border border-slate-700/40">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-700/40 bg-slate-800/40">
                      <th className="px-4 py-3 font-semibold text-slate-300 sm:px-6">
                        Platform
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-slate-300 sm:px-6">
                        Monthly
                      </th>
                      <th className="hidden px-4 py-3 text-center font-semibold text-slate-300 sm:table-cell sm:px-6">
                        Setup Fee
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-slate-300 sm:px-6">
                        Commission
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-700/20 bg-emerald-500/5">
                      <td className="px-4 py-3 font-bold sm:px-6" style={{ color: EMERALD }}>
                        NorthStar Synergy
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-white sm:px-6">
                        $49-149
                      </td>
                      <td className="hidden px-4 py-3 text-center font-bold text-white sm:table-cell sm:px-6">
                        $0
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-white sm:px-6">
                        0%
                      </td>
                    </tr>
                    {[
                      {
                        name: "DoorDash",
                        monthly: "$0",
                        setup: "$0",
                        commission: "15-30%",
                      },
                      {
                        name: "UberEats",
                        monthly: "$0",
                        setup: "$0",
                        commission: "15-30%",
                      },
                      {
                        name: "BentoBox",
                        monthly: "$199-499",
                        setup: "$500+",
                        commission: "0%",
                      },
                      {
                        name: "Owner.com",
                        monthly: "$499",
                        setup: "$500",
                        commission: "0%",
                      },
                    ].map((row) => (
                      <tr
                        key={row.name}
                        className="border-b border-slate-700/20 last:border-b-0"
                      >
                        <td className="px-4 py-3 text-slate-400 sm:px-6">
                          {row.name}
                        </td>
                        <td className="px-4 py-3 text-center text-slate-400 sm:px-6">
                          {row.monthly}
                        </td>
                        <td className="hidden px-4 py-3 text-center text-slate-500 sm:table-cell sm:px-6">
                          {row.setup}
                        </td>
                        <td className="px-4 py-3 text-center text-slate-400 sm:px-6">
                          {row.commission}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>

          {/* Trust callout */}
          <ScrollReveal delay={0.15}>
            <div className="mt-10 text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-6 py-3 text-sm font-semibold text-emerald-300">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                With NorthStar: 0% commission. 100% of revenue stays with you.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* FEATURE GRID                                                      */}
      {/* ================================================================= */}
      <section
        id="features"
        className="relative py-24 sm:py-32"
        style={{ backgroundColor: "#070E1F" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 40% at 30% 50%, rgba(16,185,129,0.04) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2
                className="mb-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl"
                style={{ letterSpacing: "-0.02em" }}
              >
                Everything your restaurant needs
              </h2>
              <p className="text-lg text-slate-400" style={{ lineHeight: 1.6 }}>
                One platform. No piecemeal tools, no juggling vendors, no IT
                headaches.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group h-full rounded-2xl border border-slate-700/40 bg-slate-800/20 p-8 backdrop-blur-sm transition-colors hover:border-emerald-500/30 hover:bg-slate-800/40"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 transition-colors group-hover:bg-emerald-500/20">
                    <svg
                      className="h-6 w-6 text-emerald-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={feature.icon}
                      />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm text-slate-400"
                    style={{ lineHeight: 1.6 }}
                  >
                    {feature.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* LIVE DEMO CTA                                                     */}
      {/* ================================================================= */}
      <section
        className="relative overflow-hidden py-24 sm:py-28"
        style={{ backgroundColor: NAVY }}
      >
        {/* Background gradient */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(16,185,129,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <ScrollReveal>
            <h2
              className="mb-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Don&apos;t take our word for it.
              <br />
              <span style={{ color: "#2DD4BF" }}>Try it yourself.</span>
            </h2>
            <p
              className="mx-auto mb-10 max-w-lg text-lg text-slate-400"
              style={{ lineHeight: 1.6 }}
            >
              Our live demo is a fully functional restaurant website. Browse the
              menu, add items to cart, go through checkout. This is exactly what
              your customers will see.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/demo"
                className="group inline-flex items-center gap-3 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-10 py-5 text-lg font-bold text-white shadow-xl shadow-emerald-500/10 backdrop-blur-sm transition-all hover:bg-emerald-500/20 hover:shadow-2xl hover:shadow-emerald-500/20"
              >
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ backgroundColor: EMERALD }}
                >
                  <svg
                    className="h-5 w-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                Explore the Live Demo
                <svg
                  className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </motion.div>
            <p className="mt-6 text-sm text-slate-500">
              No sign-up required. No credit card. Just click and explore.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* INDUSTRY STATS                                                    */}
      {/* ================================================================= */}
      <section
        className="relative py-24 sm:py-28"
        style={{ backgroundColor: "#070E1F" }}
      >
        <div className="relative mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <h2
                className="mb-4 text-3xl font-extrabold text-white sm:text-4xl"
                style={{ letterSpacing: "-0.02em" }}
              >
                The numbers don&apos;t lie
              </h2>
              <p className="text-lg text-slate-400" style={{ lineHeight: 1.6 }}>
                Industry data on why restaurants are switching to direct
                ordering.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                value: "91%",
                label:
                  "of customers check a restaurant\u2019s website before ordering",
              },
              {
                value: "74%",
                label: "prefer ordering directly from the restaurant",
              },
              {
                value: "70%",
                label: "of restaurant website traffic comes from mobile",
              },
              {
                value: "500%+",
                label: 'growth in "restaurants near me" searches',
              },
            ].map((stat, i) => (
              <ScrollReveal key={stat.value} delay={i * 0.1}>
                <div className="rounded-2xl border border-slate-700/40 bg-slate-800/20 p-6 text-center backdrop-blur-sm">
                  <div
                    className="text-3xl font-extrabold"
                    style={{ color: EMERALD }}
                  >
                    {stat.value}
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-slate-600">
            Sources: National Restaurant Association, DoorDash Restaurant Survey,
            TouchBistro 2026 State of Restaurants
          </p>
        </div>
      </section>

      {/* ================================================================= */}
      {/* HOW IT WORKS                                                      */}
      {/* ================================================================= */}
      <section
        className="relative py-24 sm:py-32"
        style={{ backgroundColor: NAVY }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 70% 30%, rgba(45,212,191,0.04) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2
                className="mb-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl"
                style={{ letterSpacing: "-0.02em" }}
              >
                Live in 3 simple steps
              </h2>
              <p className="text-lg text-slate-400" style={{ lineHeight: 1.6 }}>
                We do the heavy lifting. You focus on your food.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-12 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Tell us about your restaurant",
                description:
                  "Share your menu, photos, branding, and hours. We handle the rest.",
              },
              {
                step: "02",
                title: "Review your preview",
                description:
                  "We build your site and send you a live preview within 48 hours. Request changes until it\u2019s perfect.",
              },
              {
                step: "03",
                title: "Go live & start earning",
                description:
                  "Approve your site, connect your domain, and start accepting orders. Zero commission, from day one.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.step} delay={i * 0.15}>
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 3 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                    className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold text-white"
                    style={{
                      background: `linear-gradient(135deg, ${EMERALD} 0%, #2DD4BF 100%)`,
                    }}
                  >
                    {item.step}
                  </motion.div>
                  <h3
                    className="mb-2 text-lg font-bold text-white"
                    style={{ letterSpacing: "-0.01em" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm text-slate-400"
                    style={{ lineHeight: 1.6 }}
                  >
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* PRICING                                                           */}
      {/* ================================================================= */}
      <div style={{ backgroundColor: "#070E1F" }}>
        <PricingSection accentColor={EMERALD} dark />
      </div>

      {/* ================================================================= */}
      {/* FINAL CTA                                                         */}
      {/* ================================================================= */}
      <section className="relative overflow-hidden py-24 sm:py-32" style={{ backgroundColor: NAVY }}>
        {/* Big gradient glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(16,185,129,0.1) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal>
            <h2
              className="mb-4 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Ready to own your online presence?
            </h2>
            <p
              className="mx-auto mb-10 max-w-lg text-lg text-slate-400"
              style={{ lineHeight: 1.6 }}
            >
              We&apos;ll build your website for free. You only pay when you love
              it. No contracts, cancel anytime.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/30"
                  style={{ backgroundColor: EMERALD }}
                >
                  See the Live Demo
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-slate-600 px-8 py-4 text-base font-bold text-white transition-all hover:border-slate-400 hover:bg-white/5"
                >
                  View Pricing
                </a>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================= */}
      {/* FOOTER                                                            */}
      {/* ================================================================= */}
      <footer
        className="border-t border-slate-800/60 py-12"
        style={{ backgroundColor: "#030712" }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2">
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-md"
                  style={{ backgroundColor: EMERALD }}
                >
                  <svg
                    className="h-3.5 w-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                </div>
                <span className="font-bold text-white">NorthStar Synergy</span>
              </div>
              <p className="mt-3 text-sm text-slate-500">
                Beautiful restaurant websites that drive revenue. Based in
                Woodinville, WA.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-600">
                Product
              </h4>
              <nav className="flex flex-col gap-2">
                <a
                  href="#features"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Pricing
                </a>
                <Link
                  href="/demo"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Live Demo
                </Link>
              </nav>
            </div>

            {/* Company */}
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-600">
                Company
              </h4>
              <nav className="flex flex-col gap-2">
                <Link
                  href="/help"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Help Center
                </Link>
                <Link
                  href="/legal/privacy"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Privacy
                </Link>
                <Link
                  href="/legal/terms"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Terms
                </Link>
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-600">
                Contact
              </h4>
              <nav className="flex flex-col gap-2">
                <Link
                  href="/contact"
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Contact Us
                </Link>
                <span className="text-sm text-slate-500">
                  hello@northstarsynergy.org
                </span>
                <span className="text-sm text-slate-500">
                  Woodinville, WA
                </span>
              </nav>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-800/60 pt-6 text-center text-xs text-slate-600">
            &copy; {new Date().getFullYear()} NorthStar Synergy LLC. All rights
            reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
