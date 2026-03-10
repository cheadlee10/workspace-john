// Core types for the NorthStar Restaurant Platform

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  description: string;
  cuisine: CuisineType[];
  type: RestaurantType;
  contact: ContactInfo;
  hours: BusinessHours[];
  location: Location;
  branding: Branding;
  menu: Menu;
  socialMedia: SocialMedia;
  features: PlatformFeatures;
  reviews?: ReviewSummary;
  createdAt: string;
  updatedAt: string;
}

export type RestaurantType =
  | "casual-dining"
  | "fine-dining"
  | "fast-casual"
  | "food-truck"
  | "pop-up"
  | "cafe-bakery"
  | "bar-brewery"
  | "pizza-bbq";

export type CuisineType =
  | "american"
  | "italian"
  | "mexican"
  | "chinese"
  | "japanese"
  | "thai"
  | "indian"
  | "mediterranean"
  | "french"
  | "korean"
  | "vietnamese"
  | "bbq"
  | "seafood"
  | "vegan"
  | "fusion"
  | "other";

export interface ContactInfo {
  phone: string;
  email?: string;
  website?: string;
}

export interface BusinessHours {
  day: DayOfWeek;
  open: string; // "11:00"
  close: string; // "22:00"
  closed: boolean;
}

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface Location {
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
  // Food truck specific
  isFixed: boolean;
  schedule?: TruckSchedule[];
}

export interface TruckSchedule {
  day: DayOfWeek;
  locationName: string;
  address: string;
  lat: number;
  lng: number;
  startTime: string;
  endTime: string;
}

export interface Branding {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontHeading: string;
  fontBody: string;
  logo?: string;
  heroImage?: string;
  heroVideo?: string;
  template: RestaurantType;
}

export interface SocialMedia {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  twitter?: string;
  yelp?: string;
  googleBusinessUrl?: string;
}

// --- Menu Types ---

export interface Menu {
  sections: MenuSection[];
  lastUpdated: string;
}

export interface MenuSection {
  id: string;
  name: string;
  description?: string;
  image?: string;
  items: MenuItem[];
  sortOrder: number;
  isActive: boolean;
  availableFrom?: string; // Time-based: "11:00"
  availableUntil?: string; // "14:00" (lunch only)
}

export interface MenuItem {
  id: string;
  name: string;
  slug: string; // For individual dish SEO pages
  description: string;
  price: number;
  image?: string;
  images?: string[]; // Multiple photos
  dietary: DietaryTag[];
  spiceLevel?: 1 | 2 | 3 | 4 | 5;
  calories?: number;
  allergens: Allergen[];
  isPopular: boolean;
  isChefPick: boolean;
  isNew: boolean;
  isSoldOut: boolean;
  customizations?: MenuCustomization[];
  sortOrder: number;
}

export type DietaryTag =
  | "vegetarian"
  | "vegan"
  | "gluten-free"
  | "dairy-free"
  | "nut-free"
  | "halal"
  | "kosher"
  | "organic"
  | "spicy"
  | "keto"
  | "low-carb";

export type Allergen =
  | "gluten"
  | "dairy"
  | "nuts"
  | "peanuts"
  | "shellfish"
  | "fish"
  | "eggs"
  | "soy"
  | "sesame";

export interface MenuCustomization {
  id: string;
  name: string; // "Size", "Add-ons", "Spice Level"
  required: boolean;
  maxSelections: number;
  options: CustomizationOption[];
}

export interface CustomizationOption {
  id: string;
  name: string;
  priceAdjustment: number; // 0, 1.50, 2.00 etc
}

// --- Ordering Types ---

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  customizations: SelectedCustomization[];
  specialInstructions?: string;
  subtotal: number;
}

export interface SelectedCustomization {
  customizationId: string;
  optionIds: string[];
}

export interface Order {
  id: string;
  restaurantId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  type: "pickup" | "delivery" | "dine-in";
  scheduledTime?: string;
  customer: CustomerInfo;
  status: OrderStatus;
  paymentMethod: string;
  paymentId?: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "out-for-delivery"
  | "completed"
  | "cancelled";

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address?: string;
}

// --- Review Types ---

export interface ReviewSummary {
  averageRating: number;
  totalReviews: number;
  googleRating?: number;
  googleReviewCount?: number;
  yelpRating?: number;
  yelpReviewCount?: number;
  featuredReviews: Review[];
}

export interface Review {
  source: "google" | "yelp" | "facebook" | "direct";
  author: string;
  rating: number;
  text: string;
  date: string;
  photoUrl?: string;
}

// --- Platform Features ---

export interface PlatformFeatures {
  tier: "starter" | "growth" | "pro";
  onlineOrdering: boolean;
  loyaltyProgram: boolean;
  reservations: boolean;
  giftCards: boolean;
  emailMarketing: boolean;
  smsMarketing: boolean;
  qrOrdering: boolean;
  cateringPortal: boolean;
  multiLanguage: boolean;
  posIntegration: boolean;
  deliveryIntegration: boolean;
  foodTruckFeatures: boolean;
}

// --- Schema Markup Types ---

export interface RestaurantSchema {
  "@context": "https://schema.org";
  "@type": "Restaurant" | "FoodEstablishment" | "FastFoodRestaurant";
  name: string;
  image: string[];
  address: {
    "@type": "PostalAddress";
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    "@type": "GeoCoordinates";
    latitude: number;
    longitude: number;
  };
  telephone: string;
  servesCuisine: string[];
  priceRange: string;
  openingHoursSpecification: Array<{
    "@type": "OpeningHoursSpecification";
    dayOfWeek: string;
    opens: string;
    closes: string;
  }>;
  menu?: string;
  hasMenu?: MenuSchema;
  aggregateRating?: {
    "@type": "AggregateRating";
    ratingValue: number;
    reviewCount: number;
  };
  acceptsReservations?: boolean;
  url?: string;
}

export interface MenuSchema {
  "@type": "Menu";
  hasMenuSection: Array<{
    "@type": "MenuSection";
    name: string;
    hasMenuItem: Array<{
      "@type": "MenuItem";
      name: string;
      description: string;
      offers: {
        "@type": "Offer";
        price: string;
        priceCurrency: "USD";
      };
      suitableForDiet?: string[];
    }>;
  }>;
}
