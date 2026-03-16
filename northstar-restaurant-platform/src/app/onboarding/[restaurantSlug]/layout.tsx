import type { Metadata } from "next";
import { getRestaurantBySlug } from "@/lib/tenant/restaurant-store";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ restaurantSlug: string }> }): Promise<Metadata> {
  const { restaurantSlug } = await params;
  const restaurant = await getRestaurantBySlug(restaurantSlug);
  if (!restaurant) {
    return { title: "Restaurant Onboarding | NorthStar Synergy" };
  }

  const title = `${restaurant.name} Onboarding | NorthStar Synergy`;
  const description = `Complete onboarding for ${restaurant.name}.`;
  return {
    title,
    description,
    openGraph: { title, description, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function OnboardingSlugLayout({ children }: { children: React.ReactNode }) {
  return children;
}
