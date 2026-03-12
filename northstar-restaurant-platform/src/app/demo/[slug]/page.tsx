import { Fragment } from "react";
import { getRestaurantBySlug } from "@/lib/tenant/restaurant-store";
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
import { SectionDivider } from "@/components/design/SectionDivider";
import { SectionReveal } from "@/components/design/SectionReveal";
import { FooterWave } from "@/components/design/FooterWave";
import { BrandBar } from "@/components/design/BrandBar";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) {
    return { title: "Restaurant", description: "Restaurant website" };
  }

  const title = `${restaurant.name} | ${restaurant.tagline || `${restaurant.cuisine.join(", ")} in ${restaurant.location.city}`}`;
  const description = restaurant.description || `${restaurant.name} in ${restaurant.location.city}, ${restaurant.location.state}.`;

  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function DemoBySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);
  if (!restaurant) notFound();

  const schema = generateRestaurantSchema(restaurant);
  const design = generateDesignConfig(restaurant);

  // Build section map for dynamic ordering
  const sectionMap: Record<string, React.ReactNode> = {
    hero: <RestaurantHero key="hero" restaurant={restaurant} />,
    menu: <ConnectedMenuDisplay key="menu" restaurant={restaurant} />,
    reviews: restaurant.reviews ? (
      <ReviewsSection
        key="reviews"
        reviews={restaurant.reviews}
        restaurantName={restaurant.name}
        accentColor={design.palette.accent}
        googlePlaceId={restaurant.socialMedia.googlePlaceId}
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
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
      <FooterWave />
      <Footer restaurant={restaurant} />
    </DesignProvider>
  );
}
