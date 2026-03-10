/**
 * Template Registry
 *
 * Defines available website templates by restaurant type.
 * Each template specifies default branding, layout options, and feature recommendations.
 */

import type { RestaurantType, Branding } from "@/types/restaurant";

export interface Template {
  id: RestaurantType;
  name: string;
  description: string;
  defaultBranding: Branding;
  suggestedFeatures: string[];
  previewImage: string;
}

const templates: Template[] = [
  {
    id: "casual-dining",
    name: "Casual Dining",
    description: "Warm and inviting design for neighborhood restaurants. Clean layout with focus on menu and atmosphere.",
    defaultBranding: {
      primaryColor: "#1a1a2e",
      secondaryColor: "#16213e",
      accentColor: "#e74c3c",
      backgroundColor: "#ffffff",
      textColor: "#1a1a2e",
      fontHeading: "Georgia, serif",
      fontBody: "system-ui, sans-serif",
      heroImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80",
      template: "casual-dining",
    },
    suggestedFeatures: ["onlineOrdering", "reservations", "posIntegration"],
    previewImage: "/templates/casual-dining.jpg",
  },
  {
    id: "fine-dining",
    name: "Fine Dining",
    description: "Elegant and sophisticated design for upscale restaurants. Dark theme with subtle animations and refined typography.",
    defaultBranding: {
      primaryColor: "#0a0a0a",
      secondaryColor: "#1a1a1a",
      accentColor: "#c4a35a",
      backgroundColor: "#0a0a0a",
      textColor: "#f5f5f5",
      fontHeading: "'Playfair Display', Georgia, serif",
      fontBody: "'Cormorant Garamond', Georgia, serif",
      heroImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80",
      template: "fine-dining",
    },
    suggestedFeatures: ["reservations", "cateringPortal", "giftCards"],
    previewImage: "/templates/fine-dining.jpg",
  },
  {
    id: "fast-casual",
    name: "Fast Casual",
    description: "Bold and modern design for quick-service restaurants. Prominent ordering flow and bright, energetic colors.",
    defaultBranding: {
      primaryColor: "#1e293b",
      secondaryColor: "#334155",
      accentColor: "#ef4444",
      backgroundColor: "#fafafa",
      textColor: "#1e293b",
      fontHeading: "system-ui, sans-serif",
      fontBody: "system-ui, sans-serif",
      heroImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1920&q=80",
      template: "fast-casual",
    },
    suggestedFeatures: ["onlineOrdering", "deliveryIntegration", "posIntegration", "qrOrdering"],
    previewImage: "/templates/fast-casual.jpg",
  },
  {
    id: "food-truck",
    name: "Food Truck",
    description: "Fun and mobile-first design for food trucks. Schedule display, location tracking, and quick ordering.",
    defaultBranding: {
      primaryColor: "#292524",
      secondaryColor: "#44403c",
      accentColor: "#f59e0b",
      backgroundColor: "#fffbeb",
      textColor: "#292524",
      fontHeading: "'Fredoka One', system-ui, sans-serif",
      fontBody: "system-ui, sans-serif",
      heroImage: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=1920&q=80",
      template: "food-truck",
    },
    suggestedFeatures: ["onlineOrdering", "foodTruckFeatures", "smsMarketing"],
    previewImage: "/templates/food-truck.jpg",
  },
  {
    id: "cafe-bakery",
    name: "Cafe & Bakery",
    description: "Cozy and welcoming design for cafes and bakeries. Soft colors, warm imagery, and daily specials focus.",
    defaultBranding: {
      primaryColor: "#3c2415",
      secondaryColor: "#5c3d2e",
      accentColor: "#d97706",
      backgroundColor: "#fef3c7",
      textColor: "#3c2415",
      fontHeading: "'Lora', Georgia, serif",
      fontBody: "system-ui, sans-serif",
      heroImage: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=80",
      template: "cafe-bakery",
    },
    suggestedFeatures: ["onlineOrdering", "loyaltyProgram", "cateringPortal"],
    previewImage: "/templates/cafe-bakery.jpg",
  },
  {
    id: "bar-brewery",
    name: "Bar & Brewery",
    description: "Dark and atmospheric design for bars and breweries. Menu highlights drinks with food pairings.",
    defaultBranding: {
      primaryColor: "#18181b",
      secondaryColor: "#27272a",
      accentColor: "#a855f7",
      backgroundColor: "#18181b",
      textColor: "#fafafa",
      fontHeading: "'Bebas Neue', system-ui, sans-serif",
      fontBody: "system-ui, sans-serif",
      heroImage: "https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=1920&q=80",
      template: "bar-brewery",
    },
    suggestedFeatures: ["reservations", "loyaltyProgram", "emailMarketing"],
    previewImage: "/templates/bar-brewery.jpg",
  },
  {
    id: "pizza-bbq",
    name: "Pizza & BBQ",
    description: "Rustic and bold design for pizza shops, BBQ joints, and similar casual eateries.",
    defaultBranding: {
      primaryColor: "#7c2d12",
      secondaryColor: "#9a3412",
      accentColor: "#dc2626",
      backgroundColor: "#fef2f2",
      textColor: "#292524",
      fontHeading: "'Oswald', system-ui, sans-serif",
      fontBody: "system-ui, sans-serif",
      heroImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&q=80",
      template: "pizza-bbq",
    },
    suggestedFeatures: ["onlineOrdering", "deliveryIntegration", "posIntegration"],
    previewImage: "/templates/pizza-bbq.jpg",
  },
  {
    id: "pop-up",
    name: "Pop-Up",
    description: "Trendy and minimal design for pop-ups and seasonal concepts. Event-focused with countdown and social integration.",
    defaultBranding: {
      primaryColor: "#0f172a",
      secondaryColor: "#1e293b",
      accentColor: "#06b6d4",
      backgroundColor: "#ffffff",
      textColor: "#0f172a",
      fontHeading: "system-ui, sans-serif",
      fontBody: "system-ui, sans-serif",
      heroImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80",
      template: "pop-up",
    },
    suggestedFeatures: ["smsMarketing", "emailMarketing"],
    previewImage: "/templates/pop-up.jpg",
  },
];

export function getTemplate(type: RestaurantType): Template | undefined {
  return templates.find((t) => t.id === type);
}

export function getAllTemplates(): Template[] {
  return [...templates];
}

export function getTemplateSuggestion(cuisine: string[], type: RestaurantType): Template {
  return getTemplate(type) || templates[0];
}
