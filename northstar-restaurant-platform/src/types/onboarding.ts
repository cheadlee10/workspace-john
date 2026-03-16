import type { BusinessHours } from "@/types/restaurant";

export type OnboardingPhotoKind = "logo" | "food" | "interior";

export type ColorVibePreference = "keep_current" | "warmer" | "darker" | "brighter";

export type SquarePosPreference = "yes" | "no" | "dont_know";

export interface OnboardingMenuItemInput {
  id: string;
  name: string;
  description: string;
  price: string;
}

export interface OnboardingMenuCategoryInput {
  id: string;
  name: string;
  items: OnboardingMenuItemInput[];
}

export interface OnboardingPhotosInput {
  logo: string[];
  food: string[];
  interior: string[];
}

export interface OnboardingSocialLinksInput {
  instagram?: string;
  facebook?: string;
}

export interface OnboardingRecordInput {
  restaurantSlug: string;
  restaurantId: string;
  leadId?: string;
  restaurantName: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  menu: OnboardingMenuCategoryInput[];
  photos: OnboardingPhotosInput;
  hours: BusinessHours[];
  story: string;
  colorVibePreference: ColorVibePreference;
  wantsOnlineOrdering: boolean;
  squarePosPreference?: SquarePosPreference;
  socialLinks: OnboardingSocialLinksInput;
  anythingElse?: string;
}

export interface OnboardingRecord extends OnboardingRecordInput {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface OnboardingSubmitResponse {
  onboarding?: OnboardingRecord;
  warning?: string;
  error?: string;
  details?: string;
  migrationSql?: string;
}
