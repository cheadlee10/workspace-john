/**
 * Individual Dish SEO Page
 *
 * Each menu item gets its own Google-indexable URL.
 * When someone searches "best tonkotsu ramen seattle", this page shows up
 * with the dish photo, price, description, and reviews.
 *
 * This is a feature we're stealing from Popmenu — they charge $179-499/mo.
 * We include it at every tier.
 */

import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import { resolveRestaurant } from "@/lib/tenant/restaurant-store";
import { generateMenuItemSchema } from "@/lib/schema";
import { formatPrice } from "@/lib/utils";

interface PageProps {
  params: Promise<{ section: string; item: string }>;
}

// Generate static paths for all restaurants' menu items.
// Uses the restaurant store to include all restaurants (falls back to demo if Supabase unavailable at build time).
// Restaurants added after deploy get on-demand ISR generation.
export async function generateStaticParams() {
  const { getAllRestaurants } = await import("@/lib/tenant/restaurant-store");
  let restaurants;
  try {
    restaurants = await getAllRestaurants();
  } catch {
    const { demoRestaurant } = await import("@/config/demo-restaurant");
    restaurants = [demoRestaurant];
  }
  if (restaurants.length === 0) {
    const { demoRestaurant } = await import("@/config/demo-restaurant");
    restaurants = [demoRestaurant];
  }
  const paths: { section: string; item: string }[] = [];
  for (const restaurant of restaurants) {
    for (const section of restaurant.menu.sections) {
      for (const item of section.items) {
        paths.push({ section: section.id, item: item.slug });
      }
    }
  }
  return paths;
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section: sectionSlug, item: itemSlug } = await params;
  const headersList = await headers();
  const host = headersList.get("host") || undefined;
  const restaurant = await resolveRestaurant(host);
  const section = restaurant.menu.sections.find((s) => s.id === sectionSlug);
  const menuItem = section?.items.find((i) => i.slug === itemSlug);

  if (!menuItem) return { title: "Menu Item Not Found" };

  const title = `${menuItem.name} | ${restaurant.name}`;
  const description = `${menuItem.description} - ${formatPrice(menuItem.price)} at ${restaurant.name} in ${restaurant.location.city}, ${restaurant.location.state}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: menuItem.image ? [{ url: menuItem.image }] : [],
      type: "website",
    },
    twitter: {
      card: menuItem.image ? "summary_large_image" : "summary",
      title,
      description,
      ...(menuItem.image ? { images: [menuItem.image] } : {}),
    },
  };
}

export default async function DishPage({ params }: PageProps) {
  const { section: sectionSlug, item: itemSlug } = await params;
  const headersList = await headers();
  const host = headersList.get("host") || undefined;
  const restaurant = await resolveRestaurant(host);
  const section = restaurant.menu.sections.find((s) => s.id === sectionSlug);
  const menuItem = section?.items.find((i) => i.slug === itemSlug);

  if (!menuItem || !section) notFound();

  const schema = generateMenuItemSchema(restaurant, section.name, menuItem);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: restaurant.name, item: `https://${host || "northstarsynergy.org"}` },
      { "@type": "ListItem", position: 2, name: "Menu", item: `https://${host || "northstarsynergy.org"}/#menu` },
      { "@type": "ListItem", position: 3, name: section.name, item: `https://${host || "northstarsynergy.org"}/#menu` },
      { "@type": "ListItem", position: 4, name: menuItem.name },
    ],
  };
  const accentColor = restaurant.branding.accentColor;

  // Find related items from the same section
  const relatedItems = section.items
    .filter((i) => i.id !== menuItem.id && !i.isSoldOut)
    .slice(0, 3);

  const dietaryLabels: Record<string, string> = {
    vegetarian: "Vegetarian",
    vegan: "Vegan",
    "gluten-free": "Gluten-Free",
    "dairy-free": "Dairy-Free",
    "nut-free": "Nut-Free",
    halal: "Halal",
    kosher: "Kosher",
    spicy: "Spicy",
    keto: "Keto",
    organic: "Organic",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* Back Navigation */}
        <nav className="border-b border-gray-100 bg-white">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
            <Link
              href="/#menu"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Menu
            </Link>
            <Link
              href="/"
              className="text-lg font-bold"
              style={{ color: restaurant.branding.primaryColor }}
            >
              {restaurant.name}
            </Link>
          </div>
        </nav>

        <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 md:py-12">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Image */}
            {menuItem.image && (
              <div className="overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src={menuItem.image}
                  alt={menuItem.name}
                  width={600}
                  height={450}
                  className="h-auto w-full object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}

            {/* Details */}
            <div className={menuItem.image ? "" : "md:col-span-2"}>
              {/* Badges */}
              <div className="mb-3 flex flex-wrap gap-2">
                {menuItem.isPopular && (
                  <span
                    className="rounded-full px-3 py-1 text-xs font-semibold text-white"
                    style={{ backgroundColor: accentColor }}
                  >
                    Popular
                  </span>
                )}
                {menuItem.isChefPick && (
                  <span className="rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white">
                    Chef&apos;s Pick
                  </span>
                )}
                {menuItem.isNew && (
                  <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
                    New
                  </span>
                )}
                {menuItem.isSoldOut && (
                  <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
                    Sold Out
                  </span>
                )}
              </div>

              {/* Category */}
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-400">
                {section.name}
              </p>

              {/* Name & Price */}
              <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
                {menuItem.name}
              </h1>
              <p className="mb-6 text-2xl font-bold" style={{ color: accentColor }}>
                {formatPrice(menuItem.price)}
              </p>

              {/* Description */}
              <p className="mb-6 text-lg leading-relaxed text-gray-600">{menuItem.description}</p>

              {/* Dietary Tags */}
              {menuItem.dietary.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-2 text-sm font-semibold text-gray-500">Dietary Info</h3>
                  <div className="flex flex-wrap gap-2">
                    {menuItem.dietary.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border px-3 py-1 text-sm"
                        style={{ borderColor: accentColor, color: accentColor }}
                      >
                        {dietaryLabels[tag] || tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Allergens */}
              {menuItem.allergens.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-2 text-sm font-semibold text-gray-500">Allergen Warning</h3>
                  <p className="text-sm text-gray-600">
                    Contains: {menuItem.allergens.join(", ")}
                  </p>
                </div>
              )}

              {/* Spice Level */}
              {menuItem.spiceLevel && menuItem.spiceLevel > 0 && (
                <div className="mb-6">
                  <h3 className="mb-2 text-sm font-semibold text-gray-500">Spice Level</h3>
                  <p className="text-lg">{"🌶".repeat(menuItem.spiceLevel)}</p>
                </div>
              )}

              {/* Order CTA */}
              {restaurant.features.onlineOrdering && !menuItem.isSoldOut && (
                <Link
                  href="/#order"
                  className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.98]"
                  style={{ backgroundColor: accentColor }}
                >
                  Order This Dish
                </Link>
              )}
            </div>
          </div>

          {/* Related Items */}
          {relatedItems.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-6 text-2xl font-bold text-gray-900">
                More from {section.name}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {relatedItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/menu/${section.id}/${item.slug}`}
                    className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md"
                  >
                    {item.image && (
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="mt-1 text-sm font-bold" style={{ color: accentColor }}>
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
