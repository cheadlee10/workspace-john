import { Fragment } from "react";
import { headers } from "next/headers";
import { resolveRestaurant } from "@/lib/tenant/restaurant-store";
import { generateRestaurantSchema } from "@/lib/schema";
import { generateDesignConfig } from "@/lib/design/design-engine";
import { DesignProvider } from "@/components/design/DesignProvider";
import { RestaurantHero } from "@/components/hero/RestaurantHero";
import { StickyNav } from "@/components/layout/StickyNav";
import { ConnectedMenuDisplay } from "@/components/menu/ConnectedMenuDisplay";
import { ReviewsSection } from "@/components/reviews/ReviewsSection";
import { LocationSection } from "@/components/location/LocationSection";
import { AboutSection } from "@/components/layout/AboutSection";
import { ContactForm } from "@/components/contact/ContactForm";
import { Footer } from "@/components/layout/Footer";
import { CartDrawerWrapper } from "@/components/ordering/CartDrawerWrapper";
import { FloatingOrderCTA } from "@/components/ordering/FloatingOrderCTA";
import { CommissionSavingsCalc } from "@/components/demo/CommissionSavingsCalc";
import { SectionDivider } from "@/components/design/SectionDivider";
import { SectionReveal } from "@/components/design/SectionReveal";
import { FooterWave } from "@/components/design/FooterWave";
import { BrandBar } from "@/components/design/BrandBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Demo | NorthStar Synergy - See What Your Restaurant Gets",
  description:
    "Explore a fully functional restaurant website with online ordering, menu, reviews, and more. This is exactly what your restaurant will get.",
};

export default async function DemoPage() {
  const headersList = await headers();
  const host = headersList.get("host") || undefined;
  const restaurant = await resolveRestaurant(host);
  const schema = generateRestaurantSchema(restaurant);
  const design = generateDesignConfig(restaurant);

  const sectionMap: Record<string, React.ReactNode> = {
    hero: <RestaurantHero key="hero" restaurant={restaurant} />,
    menu: <ConnectedMenuDisplay key="menu" restaurant={restaurant} />,
    reviews: restaurant.reviews ? (
      <ReviewsSection
        key="reviews"
        reviews={restaurant.reviews}
        restaurantName={restaurant.name}
        accentColor={design.palette.accent}
        googlePlaceId={restaurant.socialMedia?.googlePlaceId}
      />
    ) : null,
    about: <AboutSection key="about" restaurant={restaurant} />,
    contact: (
      <ContactForm
        key="contact"
        accentColor={design.palette.accent}
        restaurantName={restaurant.name}
        restaurantEmail={restaurant.contact.email}
        restaurantPhone={restaurant.contact.phone}
        enableCatering={true}
        enableReservations={restaurant.features.reservations}
      />
    ),
    location: <LocationSection key="location" restaurant={restaurant} />,
  };

  return (
    <DesignProvider config={design}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Demo banner */}
      <div className="sticky top-0 z-50 flex items-center justify-center gap-3 bg-gray-900 px-4 py-2.5 text-center text-sm text-white">
        <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider">
          Live Demo
        </span>
        <span className="text-white/80">
          This is what your restaurant website will look like
        </span>
        <a
          href="/"
          className="ml-2 rounded-full bg-white px-4 py-1 text-xs font-bold text-gray-900 transition-colors hover:bg-gray-100"
        >
          Get Yours
        </a>
      </div>

      <StickyNav restaurant={restaurant} />

      <main>
        {design.layout.sectionOrder.map((sectionId, index) => (
          <Fragment key={sectionId}>
            {sectionId === "hero" ? (
              <>
                {sectionMap[sectionId]}
                <BrandBar logoUrl={restaurant.branding.logo} />
              </>
            ) : (
              <SectionReveal>{sectionMap[sectionId]}</SectionReveal>
            )}
            {index < design.layout.sectionOrder.length - 1 && sectionId !== "hero" && (
              <SectionDivider />
            )}
          </Fragment>
        ))}
      </main>

      <CartDrawerWrapper restaurant={restaurant} />
      <CommissionSavingsCalc accentColor={design.palette.accent} />
      <FooterWave />
      <Footer restaurant={restaurant} />

      <div className="h-20 md:hidden" />
      <FloatingOrderCTA accentColor={design.palette.accent} />
    </DesignProvider>
  );
}
