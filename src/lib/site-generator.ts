/**
 * Restaurant Site Generator
 *
 * Takes raw restaurant data (from Google Maps scrape, manual input, etc.)
 * and produces a complete Restaurant config object ready to render.
 *
 * This is the core of John's autonomous workflow:
 * 1. Scrape restaurant info from Google Maps / Yelp
 * 2. Pass to generateRestaurantConfig()
 * 3. Render using our template system
 * 4. Deploy to Vercel
 * 5. Send pitch email with live preview link
 */

import type {
  Restaurant,
  RestaurantType,
  CuisineType,
  BusinessHours,
  MenuSection,
  MenuItem,
  Review,
  DietaryTag,
} from "@/types/restaurant";
import { slugify } from "@/lib/utils";

export interface ScrapedRestaurantData {
  name: string;
  phone?: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat?: number;
  lng?: number;
  cuisineTypes?: string[];
  hours?: { day: string; open: string; close: string; closed: boolean }[];
  googleRating?: number;
  googleReviewCount?: number;
  yelpRating?: number;
  yelpReviewCount?: number;
  reviews?: { author: string; rating: number; text: string; date: string; source: string }[];
  menuItems?: { name: string; description?: string; price?: number; category?: string }[];
  instagram?: string;
  facebook?: string;
  yelp?: string;
  googleBusinessUrl?: string;
  photos?: string[];
  description?: string;
  priceLevel?: number; // 1-4 ($, $$, $$$, $$$$)
}

export function generateRestaurantConfig(data: ScrapedRestaurantData): Restaurant {
  const slug = slugify(data.name);
  const cuisineType = detectCuisine(data.cuisineTypes || []);
  const restaurantType = detectRestaurantType(data);
  const branding = generateBranding(cuisineType, restaurantType, data.priceLevel);

  const menu = data.menuItems?.length
    ? buildMenuFromItems(data.menuItems)
    : generateSampleMenu(cuisineType);

  const reviews = buildReviews(data);

  return {
    id: slug,
    name: data.name,
    slug,
    tagline: generateTagline(data.name, cuisineType, data.city),
    description:
      data.description ||
      generateDescription(data.name, cuisineType, data.city),
    cuisine: cuisineType ? [cuisineType] : ["other"],
    type: restaurantType,
    contact: {
      phone: data.phone || "",
      email: data.email,
    },
    hours: data.hours?.length
      ? (data.hours as BusinessHours[])
      : generateDefaultHours(),
    location: {
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.zip,
      lat: data.lat || 0,
      lng: data.lng || 0,
      isFixed: true,
    },
    branding,
    socialMedia: {
      instagram: data.instagram,
      facebook: data.facebook,
      yelp: data.yelp,
      googleBusinessUrl: data.googleBusinessUrl,
    },
    features: {
      tier: "growth",
      onlineOrdering: true,
      loyaltyProgram: false,
      reservations: restaurantType === "fine-dining" || restaurantType === "casual-dining", // default off for most outreach demos
      giftCards: false,
      emailMarketing: false,
      smsMarketing: false,
      qrOrdering: false,
      cateringPortal: false,
      multiLanguage: false,
      posIntegration: false,
      deliveryIntegration: false,
      foodTruckFeatures: restaurantType === "food-truck",
    },
    reviews,
    menu: {
      lastUpdated: new Date().toISOString().split("T")[0],
      sections: menu,
    },
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0],
  };
}

function detectCuisine(types: string[]): CuisineType {
  const typeStr = types.join(" ").toLowerCase();
  const cuisineMap: [string[], CuisineType][] = [
    [["italian", "pizza", "pasta"], "italian"],
    [["mexican", "taco", "burrito", "latin"], "mexican"],
    [["chinese", "dim sum", "szechuan", "cantonese"], "chinese"],
    [["japanese", "sushi", "ramen", "teriyaki"], "japanese"],
    [["thai"], "thai"],
    [["indian", "curry", "tandoori"], "indian"],
    [["mediterranean", "greek", "hummus", "falafel"], "mediterranean"],
    [["french", "bistro", "brasserie"], "french"],
    [["korean", "bibimbap", "bulgogi"], "korean"],
    [["vietnamese", "pho", "banh mi"], "vietnamese"],
    [["bbq", "barbecue", "smokehouse", "grill"], "bbq"],
    [["seafood", "fish", "lobster", "oyster"], "seafood"],
    [["vegan", "vegetarian", "plant"], "vegan"],
    [["american", "burger", "diner"], "american"],
  ];

  for (const [keywords, cuisine] of cuisineMap) {
    if (keywords.some((k) => typeStr.includes(k))) return cuisine;
  }
  return "american";
}

function detectRestaurantType(data: ScrapedRestaurantData): RestaurantType {
  const name = data.name.toLowerCase();
  if (name.includes("truck") || name.includes("cart")) return "food-truck";
  if (name.includes("pop-up") || name.includes("popup")) return "pop-up";
  if (name.includes("cafe") || name.includes("bakery") || name.includes("coffee"))
    return "cafe-bakery";
  if (name.includes("bar") || name.includes("brew") || name.includes("pub"))
    return "bar-brewery";
  if (name.includes("pizza") || name.includes("bbq") || name.includes("barbecue"))
    return "pizza-bbq";
  if (data.priceLevel && data.priceLevel >= 3) return "fine-dining";
  if (data.priceLevel && data.priceLevel <= 1) return "fast-casual";
  return "casual-dining";
}

/**
 * Cuisine-specific theme mapping.
 * Auto-detects from cuisine type and applies unique branding.
 */
export interface CuisineTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontHeading: string;
}

export const cuisineThemes: Record<string, CuisineTheme> = {
  mediterranean: { primaryColor: "#D97706", secondaryColor: "#C2410C", accentColor: "#D97706", fontHeading: "Georgia, serif" },
  french:        { primaryColor: "#D97706", secondaryColor: "#C2410C", accentColor: "#D97706", fontHeading: "Georgia, serif" },
  japanese:      { primaryColor: "#1a1a2e", secondaryColor: "#DC2626", accentColor: "#DC2626", fontHeading: "system-ui, sans-serif" },
  korean:        { primaryColor: "#1a1a2e", secondaryColor: "#DC2626", accentColor: "#DC2626", fontHeading: "system-ui, sans-serif" },
  chinese:       { primaryColor: "#1a1a2e", secondaryColor: "#DC2626", accentColor: "#DC2626", fontHeading: "system-ui, sans-serif" },
  vietnamese:    { primaryColor: "#1a1a2e", secondaryColor: "#DC2626", accentColor: "#DC2626", fontHeading: "system-ui, sans-serif" },
  thai:          { primaryColor: "#581C87", secondaryColor: "#D97706", accentColor: "#D97706", fontHeading: "system-ui, sans-serif" },
  indian:        { primaryColor: "#581C87", secondaryColor: "#D97706", accentColor: "#D97706", fontHeading: "system-ui, sans-serif" },
  mexican:       { primaryColor: "#B45309", secondaryColor: "#065F46", accentColor: "#B45309", fontHeading: "system-ui, sans-serif" },
  italian:       { primaryColor: "#991B1B", secondaryColor: "#FFFBEB", accentColor: "#991B1B", fontHeading: "Georgia, serif" },
  bbq:           { primaryColor: "#292524", secondaryColor: "#EA580C", accentColor: "#EA580C", fontHeading: "'Oswald', system-ui, sans-serif" },
  american:      { primaryColor: "#292524", secondaryColor: "#EA580C", accentColor: "#EA580C", fontHeading: "'Oswald', system-ui, sans-serif" },
  seafood:       { primaryColor: "#0F766E", secondaryColor: "#374151", accentColor: "#0F766E", fontHeading: "system-ui, sans-serif" },
  vegan:         { primaryColor: "#065F46", secondaryColor: "#374151", accentColor: "#065F46", fontHeading: "system-ui, sans-serif" },
  fusion:        { primaryColor: "#0F766E", secondaryColor: "#374151", accentColor: "#0F766E", fontHeading: "system-ui, sans-serif" },
  other:         { primaryColor: "#0F766E", secondaryColor: "#374151", accentColor: "#0F766E", fontHeading: "system-ui, sans-serif" },
};

/**
 * Resolve cuisine theme from a cuisine type string.
 */
export function getCuisineTheme(cuisine: string): CuisineTheme {
  return cuisineThemes[cuisine] || cuisineThemes.other;
}

function generateBranding(
  cuisine: CuisineType,
  type: RestaurantType,
  priceLevel?: number
): Restaurant["branding"] {
  const theme = getCuisineTheme(cuisine);

  // Fine dining gets dark, elegant treatment with serif headings
  if (type === "fine-dining" || (priceLevel && priceLevel >= 3)) {
    return {
      primaryColor: "#0a0a0a",
      secondaryColor: theme.secondaryColor,
      accentColor: theme.accentColor,
      backgroundColor: "#ffffff",
      textColor: "#0a0a0a",
      fontHeading: "Georgia, 'Times New Roman', serif",
      fontBody: "system-ui, sans-serif",
      template: type,
    };
  }

  // Cafe/bakery gets warm cream background
  if (type === "cafe-bakery") {
    return {
      primaryColor: theme.primaryColor,
      secondaryColor: theme.secondaryColor,
      accentColor: "#d97706",
      backgroundColor: "#FDF6EC",
      textColor: "#3c2415",
      fontHeading: "'Lora', Georgia, serif",
      fontBody: "system-ui, sans-serif",
      template: type,
    };
  }

  return {
    primaryColor: theme.primaryColor,
    secondaryColor: theme.secondaryColor,
    accentColor: theme.accentColor,
    backgroundColor: "#ffffff",
    textColor: "#1a1a2e",
    fontHeading: theme.fontHeading,
    fontBody: "system-ui, sans-serif",
    template: type,
  };
}

function generateTagline(name: string, cuisine: CuisineType, city: string): string {
  const taglines: Record<string, string[]> = {
    japanese: [
      `Authentic Japanese Cuisine in ${city}`,
      `Fresh Sushi & Handmade Ramen`,
      `A Taste of Japan in ${city}`,
    ],
    italian: [
      `Authentic Italian in the Heart of ${city}`,
      `Handmade Pasta & Wood-Fired Pizza`,
      `Where Every Meal is a Celebration`,
    ],
    mexican: [
      `Authentic Mexican Flavors in ${city}`,
      `Fresh, Bold, Unforgettable`,
      `From Our Kitchen to Your Table`,
    ],
    default: [
      `Great Food, Great People, Great Times`,
      `A ${city} Favorite Since Day One`,
      `Where Every Bite Tells a Story`,
    ],
  };

  const options = taglines[cuisine] || taglines.default;
  return options[0];
}

function generateDescription(name: string, cuisine: CuisineType, city: string): string {
  return `${name} is a beloved ${cuisine} restaurant in ${city}, known for our commitment to quality ingredients, authentic flavors, and warm hospitality. Whether you're joining us for a quick lunch or a leisurely dinner, we promise an experience that will keep you coming back.`;
}

function generateDefaultHours(): BusinessHours[] {
  return [
    { day: "monday", open: "11:00", close: "21:00", closed: false },
    { day: "tuesday", open: "11:00", close: "21:00", closed: false },
    { day: "wednesday", open: "11:00", close: "21:00", closed: false },
    { day: "thursday", open: "11:00", close: "21:30", closed: false },
    { day: "friday", open: "11:00", close: "22:00", closed: false },
    { day: "saturday", open: "11:00", close: "22:00", closed: false },
    { day: "sunday", open: "11:00", close: "20:00", closed: false },
  ];
}

function buildMenuFromItems(
  items: { name: string; description?: string; price?: number; category?: string }[]
): MenuSection[] {
  const sectionMap = new Map<string, MenuItem[]>();

  items.forEach((item, index) => {
    const category = item.category || "Menu";
    if (!sectionMap.has(category)) {
      sectionMap.set(category, []);
    }
    sectionMap.get(category)!.push({
      id: slugify(item.name) + "-" + index,
      name: item.name,
      slug: slugify(item.name),
      description: item.description || "",
      price: item.price || 0,
      dietary: detectDietary(item.name, item.description || ""),
      allergens: [],
      isPopular: false,
      isChefPick: false,
      isNew: false,
      isSoldOut: false,
      sortOrder: index,
    });
  });

  return Array.from(sectionMap.entries()).map(([name, sectionItems], index) => ({
    id: slugify(name),
    name,
    sortOrder: index + 1,
    isActive: true,
    items: sectionItems,
  }));
}

function detectDietary(name: string, description: string): DietaryTag[] {
  const text = `${name} ${description}`.toLowerCase();
  const tags: DietaryTag[] = [];
  if (text.includes("vegan") || text.includes("plant-based")) tags.push("vegan");
  if (text.includes("vegetarian") || text.includes("veggie")) tags.push("vegetarian");
  if (text.includes("gluten-free") || text.includes("gf")) tags.push("gluten-free");
  if (text.includes("spicy") || text.includes("hot")) tags.push("spicy");
  if (text.includes("keto")) tags.push("keto");
  if (text.includes("organic")) tags.push("organic");
  return tags;
}

function generateSampleMenu(cuisine: CuisineType): MenuSection[] {
  // Return a minimal placeholder menu - will be replaced with real data
  return [
    {
      id: "menu",
      name: "Menu",
      sortOrder: 1,
      isActive: true,
      items: [
        {
          id: "placeholder-1",
          name: "Menu Coming Soon",
          slug: "menu-coming-soon",
          description: "Our full menu will be available shortly. Please call us for details.",
          price: 0,
          dietary: [],
          allergens: [],
          isPopular: false,
          isChefPick: false,
          isNew: false,
          isSoldOut: false,
          sortOrder: 1,
        },
      ],
    },
  ];
}

function buildReviews(data: ScrapedRestaurantData): Restaurant["reviews"] {
  const featuredReviews: Review[] = (data.reviews || []).slice(0, 6).map((r) => ({
    source: r.source as Review["source"],
    author: r.author,
    rating: r.rating,
    text: r.text,
    date: r.date,
  }));

  const googleRating = data.googleRating || 0;
  const yelpRating = data.yelpRating || 0;
  const totalRatings = [googleRating, yelpRating].filter((r) => r > 0);
  const averageRating =
    totalRatings.length > 0
      ? totalRatings.reduce((a, b) => a + b, 0) / totalRatings.length
      : 0;

  return {
    averageRating,
    totalReviews: (data.googleReviewCount || 0) + (data.yelpReviewCount || 0),
    googleRating: data.googleRating,
    googleReviewCount: data.googleReviewCount,
    yelpRating: data.yelpRating,
    yelpReviewCount: data.yelpReviewCount,
    featuredReviews,
  };
}
