import { SaasNav } from "@/components/layout/SaasNav";
import { LandingPage } from "@/components/home/LandingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NorthStar Synergy | Restaurant Websites That Drive Revenue",
  description:
    "Beautiful restaurant websites with built-in online ordering. Zero commissions. No setup fees. Live in 48 hours. Starting at $49/mo.",
};

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NorthStar Synergy",
  url: "https://northstarsynergy.com",
  logo: "https://northstarsynergy.com/icon.svg",
  description:
    "Beautiful restaurant websites with built-in online ordering. Zero commissions. No setup fees.",
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
    <div className="min-h-screen" style={{ backgroundColor: "#050A18" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSONLD) }}
      />

      {/* Skip to content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-gray-900 focus:shadow-lg"
      >
        Skip to main content
      </a>

      <SaasNav />

      <main id="main-content">
        <LandingPage />
      </main>
    </div>
  );
}
