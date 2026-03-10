import type { Restaurant, RestaurantSchema, MenuSchema } from "@/types/restaurant";

export function generateRestaurantSchema(restaurant: Restaurant): RestaurantSchema {
  const menuSchema: MenuSchema = {
    "@type": "Menu",
    hasMenuSection: restaurant.menu.sections
      .filter((s) => s.isActive)
      .map((section) => ({
        "@type": "MenuSection" as const,
        name: section.name,
        hasMenuItem: section.items
          .filter((item) => !item.isSoldOut)
          .map((item) => ({
            "@type": "MenuItem" as const,
            name: item.name,
            description: item.description,
            offers: {
              "@type": "Offer" as const,
              price: item.price.toFixed(2),
              priceCurrency: "USD" as const,
            },
            ...(item.dietary.length > 0
              ? {
                  suitableForDiet: item.dietary.map(
                    (d) => `https://schema.org/${dietaryToSchema(d)}`
                  ),
                }
              : {}),
          })),
      })),
  };

  const schema: RestaurantSchema = {
    "@context": "https://schema.org",
    "@type": restaurant.type === "fast-casual" ? "FastFoodRestaurant" : "Restaurant",
    name: restaurant.name,
    image: [restaurant.branding.heroImage, restaurant.branding.logo].filter(Boolean) as string[],
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.location.address,
      addressLocality: restaurant.location.city,
      addressRegion: restaurant.location.state,
      postalCode: restaurant.location.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: restaurant.location.lat,
      longitude: restaurant.location.lng,
    },
    telephone: restaurant.contact.phone,
    servesCuisine: restaurant.cuisine,
    priceRange: getPriceRange(restaurant.menu),
    openingHoursSpecification: restaurant.hours
      .filter((h) => !h.closed)
      .map((h) => ({
        "@type": "OpeningHoursSpecification" as const,
        dayOfWeek: h.day.charAt(0).toUpperCase() + h.day.slice(1),
        opens: h.open,
        closes: h.close,
      })),
    hasMenu: menuSchema,
    ...(restaurant.reviews
      ? {
          aggregateRating: {
            "@type": "AggregateRating" as const,
            ratingValue: restaurant.reviews.averageRating,
            reviewCount: restaurant.reviews.totalReviews,
          },
        }
      : {}),
    ...(restaurant.features.reservations ? { acceptsReservations: true } : {}),
  };

  return schema;
}

export function generateMenuItemSchema(
  restaurant: Restaurant,
  sectionName: string,
  item: { name: string; description: string; price: number; image?: string; dietary: string[] }
) {
  return {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: item.name,
    description: item.description,
    image: item.image,
    offers: {
      "@type": "Offer",
      price: item.price.toFixed(2),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    menuAddOn: [],
    inMenuSection: {
      "@type": "MenuSection",
      name: sectionName,
    },
    isPartOf: {
      "@type": "Menu",
      name: `${restaurant.name} Menu`,
    },
    ...(item.dietary.length > 0
      ? {
          suitableForDiet: item.dietary.map(
            (d) => `https://schema.org/${dietaryToSchema(d)}`
          ),
        }
      : {}),
  };
}

function dietaryToSchema(tag: string): string {
  const map: Record<string, string> = {
    vegetarian: "VegetarianDiet",
    vegan: "VeganDiet",
    "gluten-free": "GlutenFreeDiet",
    "dairy-free": "DairyFreeDiet",
    halal: "HalalDiet",
    kosher: "KosherDiet",
    "low-carb": "LowCalorieDiet",
    keto: "LowCarbDiet",
  };
  return map[tag] || "RestrictedDiet";
}

function getPriceRange(menu: { sections: { items: { price: number }[] }[] }): string {
  const prices = menu.sections.flatMap((s) => s.items.map((i) => i.price));
  if (prices.length === 0) return "$$";
  const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
  if (avg < 10) return "$";
  if (avg < 20) return "$$";
  if (avg < 35) return "$$$";
  return "$$$$";
}
