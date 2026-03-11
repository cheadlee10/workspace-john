import { notFound } from "next/navigation";
import { getRestaurantBySlug } from "@/lib/tenant/restaurant-store";
import { generateDesignConfig } from "@/lib/design/design-engine";
import { DesignProvider } from "@/components/design/DesignProvider";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";

export const dynamic = "force-dynamic";

export default async function OnboardingPage({ params }: { params: Promise<{ restaurantSlug: string }> }) {
  const { restaurantSlug } = await params;
  const restaurant = await getRestaurantBySlug(restaurantSlug);
  if (!restaurant) notFound();

  const design = generateDesignConfig(restaurant);

  return (
    <DesignProvider config={design}>
      <main className="min-h-screen bg-gray-50 py-10">
        <div className="mx-auto mb-6 max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Welcome to NorthStar</h1>
          <p className="mt-2 text-gray-500">
            Fill this out once and we&apos;ll finalize your site fast.
          </p>
        </div>
        <div className="px-4">
          <OnboardingForm restaurant={restaurant} />
        </div>
      </main>
    </DesignProvider>
  );
}
