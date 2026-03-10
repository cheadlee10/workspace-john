import Link from "next/link";
import { PricingSection } from "@/components/pricing/PricingSection";
import { SaasNav } from "@/components/layout/SaasNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NorthStar Synergy | Restaurant Websites That Drive Revenue",
  description:
    "Beautiful restaurant websites with built-in online ordering. Zero commissions. No setup fees. Live in 48 hours. Starting at $49/mo.",
};

// Brand color — Deep Teal
const BRAND = "#0f766e";

// ---------------------------------------------------------------------------
// Stats bar data
// ---------------------------------------------------------------------------
const STATS = [
  { value: "0%", label: "Ordering Commission" },
  { value: "$0", label: "Setup Fee" },
  { value: "48hr", label: "Launch Time" },
  { value: "$49", label: "Starting Price/mo" },
];

// ---------------------------------------------------------------------------
// Features
// ---------------------------------------------------------------------------
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
    icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
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
// Pain points
// ---------------------------------------------------------------------------
const PAIN_POINTS = [
  { stat: "30%", text: "of every order goes to DoorDash and UberEats" },
  { stat: "43%", text: "of delivery app customers can't remember your restaurant's name" },
  { stat: "$16K", text: "per year saved by restaurants that switch to direct ordering" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NorthStar Synergy",
  url: "https://northstarsynergy.com",
  logo: "https://northstarsynergy.com/icon.svg",
  description: "Beautiful restaurant websites with built-in online ordering. Zero commissions. No setup fees.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Woodinville",
    addressRegion: "WA",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "hello@northstarsynergy.com",
    contactType: "sales",
  },
  sameAs: [],
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
      />
      {/* ================================================================= */}
      {/* NAVIGATION                                                        */}
      {/* ================================================================= */}
      {/* Skip to content — accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-gray-900 focus:shadow-lg">
        Skip to main content
      </a>

      <SaasNav />

      {/* ================================================================= */}
      {/* HERO                                                               */}
      {/* ================================================================= */}
      <main id="main-content">
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-teal-950">
        {/* Subtle grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, #0f766e 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-20 sm:pb-28 sm:pt-28">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal-700/40 bg-teal-900/40 px-4 py-1.5 text-sm">
              <span className="h-2 w-2 rounded-full bg-teal-400" />
              <span className="font-medium text-teal-300">Built for restaurant owners</span>
            </div>

            {/* Headline — lead with WHAT you do */}
            <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              We build websites that turn hungry visitors into{" "}
              <span className="text-teal-400">paying customers</span>
            </h1>

            {/* Subheadline — now explain the value */}
            <p className="mx-auto mb-10 max-w-xl text-xl leading-relaxed text-gray-400">
              Custom restaurant websites with built-in online ordering, SEO, and reviews — live in 48 hours. No commissions. No setup fees.
            </p>

            {/* CTAs */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/demo"
                className="group inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:shadow-xl hover:brightness-110"
                style={{ backgroundColor: BRAND }}
              >
                See a Live Demo
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-full border-2 border-gray-600 px-8 py-4 text-base font-bold text-white transition-all hover:border-gray-400 hover:bg-white/5"
              >
                View Pricing
              </a>
            </div>

            {/* Social proof */}
            <p className="mt-10 text-sm text-gray-500">
              Launching March 2026 in the Pacific Northwest
            </p>
          </div>

          {/* Demo preview mockup */}
          <div className="relative mx-auto mt-16 max-w-4xl">
            {/* Glow behind browser */}
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-teal-500/20 via-teal-600/10 to-teal-500/20 blur-2xl" />

            {/* Browser chrome */}
            <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl">
              <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <div className="mx-auto flex items-center gap-2 rounded-md bg-white px-4 py-1 text-xs text-gray-400">
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  yourrestaurant.com
                </div>
              </div>
              {/* Screenshot area - links to demo */}
              <Link href="/demo" className="group relative block">
                <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                  {/* Simulated restaurant hero */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <div className="mb-3 text-4xl font-bold text-white sm:text-5xl md:text-6xl">Sakura Kitchen</div>
                    <p className="mb-6 text-base text-white/70 sm:text-lg">Authentic Japanese Cuisine in Woodinville</p>
                    <div className="flex gap-3">
                      <span className="rounded-full px-5 py-2.5 text-sm font-semibold text-white" style={{ backgroundColor: BRAND }}>View Menu</span>
                      <span className="rounded-full border-2 border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white">Order Online</span>
                    </div>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                    <span
                      className="scale-90 rounded-full px-6 py-3 text-sm font-bold text-white opacity-0 shadow-xl transition-all group-hover:scale-100 group-hover:opacity-100"
                      style={{ backgroundColor: BRAND }}
                    >
                      Click to explore the live demo
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Floating badges */}
            <div className="absolute -left-4 top-1/3 hidden rounded-xl border border-gray-200 bg-white p-3 shadow-lg lg:block">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100">
                  <svg className="h-4 w-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">New Order!</div>
                  <div className="text-[10px] text-gray-500">$47.50 - Pickup</div>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 top-2/3 hidden rounded-xl border border-gray-200 bg-white p-3 shadow-lg lg:block">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100">
                  <svg className="h-4 w-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900">+1 Customer</div>
                  <div className="text-[10px] text-gray-500">Added to your list</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* STATS BAR                                                          */}
      {/* ================================================================= */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 sm:py-14 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-extrabold sm:text-4xl" style={{ color: BRAND }}>{stat.value}</div>
              <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================================= */}
      {/* PAIN POINTS                                                        */}
      {/* ================================================================= */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Third-party apps are eating your profits
            </h2>
            <p className="text-lg text-gray-500">
              Every order through DoorDash or UberEats costs you money and customers.
              Here&apos;s what the data shows:
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {PAIN_POINTS.map((point) => (
              <div
                key={point.stat}
                className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm"
              >
                <div className="text-5xl font-extrabold text-gray-900">{point.stat}</div>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{point.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-6 py-3 text-sm font-semibold text-teal-700">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              With NorthStar: 0% commission. 100% of revenue stays with you.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* LIVE DEMO CTA                                                      */}
      {/* ================================================================= */}
      <section
        className="border-y border-teal-900/20 py-20 sm:py-24"
        style={{ background: "linear-gradient(135deg, #134e4a 0%, #0f766e 50%, #115e59 100%)" }}
      >
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl">
            Don&apos;t take our word for it.
            <br />
            <span className="text-teal-200">Try it yourself.</span>
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-lg text-teal-100/70">
            Our live demo is a fully functional restaurant website. Browse the menu, add items to cart, go through checkout. This is exactly what your customers will see.
          </p>
          <Link
            href="/demo"
            className="group inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 text-lg font-bold text-gray-900 shadow-xl transition-all hover:shadow-2xl"
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: BRAND }}
            >
              <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            Explore the Live Demo
            <svg className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <p className="mt-6 text-sm text-teal-200/50">
            No sign-up required. No credit card. Just click and explore.
          </p>
        </div>
      </section>

      {/* ================================================================= */}
      {/* FEATURES                                                           */}
      {/* ================================================================= */}
      <section id="features" className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything your restaurant needs
            </h2>
            <p className="text-lg text-gray-500">
              One platform. No piecemeal tools, no juggling vendors, no IT headaches.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-gray-200 bg-white p-8 transition-all hover:border-teal-200 hover:shadow-lg"
              >
                <div
                  className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 transition-colors group-hover:bg-teal-700"
                >
                  <svg
                    className="h-6 w-6 text-teal-600 transition-colors group-hover:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={feature.icon} />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SOCIAL PROOF / INDUSTRY STATS                                      */}
      {/* ================================================================= */}
      <section className="border-y border-gray-100 bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              The numbers don&apos;t lie
            </h2>
            <p className="text-lg text-gray-500">
              Industry data on why restaurants are switching to direct ordering.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "91%", label: "of customers check a restaurant's website before ordering" },
              { value: "74%", label: "prefer ordering directly from the restaurant" },
              { value: "70%", label: "of restaurant website traffic comes from mobile" },
              { value: "500%+", label: 'growth in "restaurants near me" searches' },
            ].map((stat) => (
              <div key={stat.value} className="rounded-2xl bg-white p-6 text-center shadow-sm">
                <div className="text-3xl font-extrabold" style={{ color: BRAND }}>{stat.value}</div>
                <p className="mt-2 text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-gray-400">
            Sources: National Restaurant Association, DoorDash Restaurant Survey, TouchBistro 2026 State of Restaurants
          </p>
        </div>
      </section>

      {/* ================================================================= */}
      {/* HOW IT WORKS                                                       */}
      {/* ================================================================= */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Live in 3 simple steps
            </h2>
            <p className="text-lg text-gray-500">
              We do the heavy lifting. You focus on your food.
            </p>
          </div>

          <div className="grid gap-12 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "Tell us about your restaurant",
                description: "Share your menu, photos, branding, and hours. We handle the rest.",
              },
              {
                step: "02",
                title: "Review your preview",
                description: "We build your site and send you a live preview within 48 hours. Request changes until it\u2019s perfect.",
              },
              {
                step: "03",
                title: "Go live & start earning",
                description: "Approve your site, connect your domain, and start accepting orders. Zero commission, from day one.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold text-white"
                  style={{ backgroundColor: BRAND }}
                >
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* PRICING                                                            */}
      {/* ================================================================= */}
      <PricingSection accentColor={BRAND} />

      {/* ================================================================= */}
      {/* FINAL CTA                                                          */}
      {/* ================================================================= */}
      <section
        className="py-20 sm:py-28"
        style={{ background: "linear-gradient(135deg, #134e4a 0%, #0f766e 50%, #115e59 100%)" }}
      >
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl">
            Ready to own your online presence?
          </h2>
          <p className="mx-auto mb-10 max-w-lg text-lg text-teal-100/70">
            We&apos;ll build your website for free. You only pay when you love it.
            No contracts, cancel anytime.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-gray-900 shadow-lg transition-all hover:shadow-xl"
            >
              See the Live Demo
            </Link>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-base font-bold text-white transition-all hover:border-white/60 hover:bg-white/10"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>

      </main>

      {/* ================================================================= */}
      {/* FOOTER                                                             */}
      {/* ================================================================= */}
      <footer className="border-t border-gray-800 bg-gray-900 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2">
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-md"
                  style={{ backgroundColor: BRAND }}
                >
                  <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </div>
                <span className="font-bold text-white">NorthStar Synergy</span>
              </div>
              <p className="mt-3 text-sm text-gray-400">
                Beautiful restaurant websites that drive revenue. Based in Woodinville, WA.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Product</h4>
              <nav className="flex flex-col gap-2">
                <a href="#features" className="text-sm text-gray-400 hover:text-white">Features</a>
                <a href="#pricing" className="text-sm text-gray-400 hover:text-white">Pricing</a>
                <Link href="/demo" className="text-sm text-gray-400 hover:text-white">Live Demo</Link>
              </nav>
            </div>

            {/* Company */}
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Company</h4>
              <nav className="flex flex-col gap-2">
                <Link href="/help" className="text-sm text-gray-400 hover:text-white">Help Center</Link>
                <Link href="/legal/privacy" className="text-sm text-gray-400 hover:text-white">Privacy</Link>
                <Link href="/legal/terms" className="text-sm text-gray-400 hover:text-white">Terms</Link>
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Contact</h4>
              <nav className="flex flex-col gap-2">
                <Link href="/contact" className="text-sm text-gray-400 hover:text-white">Contact Us</Link>
                <span className="text-sm text-gray-400">hello@northstarsynergy.com</span>
                <span className="text-sm text-gray-400">Woodinville, WA</span>
              </nav>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} NorthStar Synergy LLC. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
