import type { MetadataRoute } from "next";
import { demoRestaurant } from "@/config/demo-restaurant";
import { getAllRestaurants } from "@/lib/tenant/restaurant-store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://northstarsynergy.com";

  // Static SaaS pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/demo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/help`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/legal/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/legal/terms`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];

  // Get all restaurants (falls back to demo if Supabase unavailable)
  let restaurants;
  try {
    restaurants = await getAllRestaurants();
  } catch {
    restaurants = [demoRestaurant];
  }
  if (restaurants.length === 0) {
    restaurants = [demoRestaurant];
  }

  // Dynamic menu item pages for all restaurants
  const menuPages: MetadataRoute.Sitemap = restaurants.flatMap((restaurant) =>
    restaurant.menu.sections.flatMap((section) =>
      section.items.map((item) => ({
        url: `${baseUrl}/menu/${section.id}/${item.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }))
    )
  );

  return [...staticPages, ...menuPages];
}
