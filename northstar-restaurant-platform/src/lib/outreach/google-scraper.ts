/**
 * Google Maps Restaurant Scraper
 *
 * Discovers restaurants without websites via Google Maps/Places API.
 * This is John's prospecting engine - finds the restaurants that
 * need our help the most.
 *
 * Uses Google Places API (Text Search + Details) to:
 * 1. Search for restaurants in a target area
 * 2. Filter for ones without websites or with poor websites
 * 3. Collect all data needed to build them a site
 * 4. Feed into the site generator pipeline
 */

import type { ScrapedRestaurantData } from "@/lib/site-generator";
import { getAllLeads } from "@/lib/crm/lead-store";

export interface ScrapeConfig {
  query: string; // "restaurants in Seattle WA"
  location?: { lat: number; lng: number };
  radius?: number; // meters (max 50000)
  minRating?: number;
  maxResults?: number;
  apiKey: string;
}

export interface ProspectResult {
  restaurant: ScrapedRestaurantData;
  hasWebsite: boolean;
  websiteUrl?: string;
  websiteQuality?: "none" | "poor" | "basic" | "good";
  prospectScore: number; // 0-100, higher = better prospect
  reason: string;
}

/**
 * Search Google Places for restaurants without proper websites
 */
export async function discoverProspects(config: ScrapeConfig): Promise<ProspectResult[]> {
  const {
    query,
    location,
    radius = 25000,
    minRating = 3.5,
    maxResults = 20,
    apiKey,
  } = config;

  // Step 1: Text search for restaurants
  const searchUrl = new URL("https://maps.googleapis.com/maps/api/place/textsearch/json");
  searchUrl.searchParams.set("query", query);
  searchUrl.searchParams.set("type", "restaurant");
  searchUrl.searchParams.set("key", apiKey);
  if (location) {
    searchUrl.searchParams.set("location", `${location.lat},${location.lng}`);
    searchUrl.searchParams.set("radius", radius.toString());
  }

  const searchResponse = await fetch(searchUrl.toString());
  const searchData = await searchResponse.json();

  if (searchData.status !== "OK") {
    throw new Error(`Google Places API error: ${searchData.status}`);
  }

  const prospects: ProspectResult[] = [];

  // Step 2: Get details for each result
  for (const place of searchData.results.slice(0, maxResults)) {
    if (place.rating && place.rating < minRating) continue;

    const detail = await getPlaceDetails(place.place_id, apiKey);
    if (!detail) continue;

    const hasWebsite = !!detail.website;
    const websiteQuality = hasWebsite
      ? await assessWebsiteQuality(detail.website!)
      : "none";

    const prospectScore = calculateProspectScore({
      rating: detail.rating || 0,
      reviewCount: detail.user_ratings_total || 0,
      hasWebsite,
      websiteQuality,
      priceLevel: detail.price_level,
    });

    // Only include good prospects (no website, or poor website)
    if (websiteQuality === "none" || websiteQuality === "poor") {
      const addressParts = (detail.formatted_address || "").split(",").map((s: string) => s.trim());

      prospects.push({
        restaurant: {
          name: detail.name,
          phone: detail.formatted_phone_number,
          address: addressParts[0] || "",
          city: addressParts[1] || "",
          state: extractState(addressParts[2] || ""),
          zip: extractZip(addressParts[2] || ""),
          lat: detail.geometry?.location?.lat,
          lng: detail.geometry?.location?.lng,
          cuisineTypes: detail.types?.filter((t: string) =>
            !["restaurant", "food", "point_of_interest", "establishment"].includes(t)
          ),
          googleRating: detail.rating,
          googleReviewCount: detail.user_ratings_total,
          googleBusinessUrl: detail.url,
          reviews: detail.reviews?.slice(0, 6).map((r: GoogleReview) => ({
            author: r.author_name,
            rating: r.rating,
            text: r.text,
            date: r.relative_time_description,
            source: "google",
          })),
          photos: detail.photos?.slice(0, 5).map(
            (p: GooglePhoto) =>
              `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${p.photo_reference}&key=${apiKey}`
          ),
          priceLevel: detail.price_level,
          description: detail.editorial_summary?.overview,
        },
        hasWebsite,
        websiteUrl: detail.website,
        websiteQuality,
        prospectScore,
        reason: websiteQuality === "none"
          ? "No website found - prime prospect"
          : "Website exists but is low quality or not mobile-friendly",
      });
    }

    // Rate limit: Google Places allows 10 QPS
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  // Dedup: remove prospects already in the pipeline
  const dedupedProspects = await deduplicateProspects(prospects);

  // Sort by prospect score (best prospects first)
  return dedupedProspects.sort((a, b) => b.prospectScore - a.prospectScore);
}

/**
 * Remove prospects that already exist in the leads table.
 * Matches by name+city, phone, or address.
 * Skips leads in any active stage; allows re-contact if closed_lost > 90 days ago.
 */
async function deduplicateProspects(prospects: ProspectResult[]): Promise<ProspectResult[]> {
  let existingLeads;
  try {
    existingLeads = await getAllLeads();
  } catch {
    // If lead store is unavailable, skip dedup
    return prospects;
  }

  if (existingLeads.length === 0) return prospects;

  const ninetyDaysAgo = Date.now() - 90 * 24 * 60 * 60 * 1000;

  return prospects.filter((prospect) => {
    const r = prospect.restaurant;
    const nameNorm = r.name.toLowerCase().trim();
    const cityNorm = (r.city || "").toLowerCase().trim();
    const phoneNorm = (r.phone || "").replace(/\D/g, "");
    const addressNorm = (r.address || "").toLowerCase().trim();

    for (const lead of existingLeads) {
      // Allow re-contact if closed_lost more than 90 days ago
      if (lead.stage === "churned") {
        const updatedAt = new Date(lead.updatedAt).getTime();
        if (updatedAt < ninetyDaysAgo) continue;
      }

      // Match by name + city
      const leadNameNorm = lead.restaurantName.toLowerCase().trim();
      const leadCityNorm = lead.city.toLowerCase().trim();
      if (nameNorm === leadNameNorm && cityNorm === leadCityNorm) {
        console.warn(`[Scraper] Dedup: skipping "${r.name}" (${r.city}) — already in pipeline as ${lead.stage}`);
        return false;
      }

      // Match by phone
      if (phoneNorm && lead.phone) {
        const leadPhoneNorm = lead.phone.replace(/\D/g, "");
        if (phoneNorm === leadPhoneNorm) {
          console.warn(`[Scraper] Dedup: skipping "${r.name}" — phone ${r.phone} matches lead ${lead.id}`);
          return false;
        }
      }

      // Match by address
      if (addressNorm && lead.address) {
        const leadAddrNorm = lead.address.toLowerCase().trim();
        if (addressNorm === leadAddrNorm) {
          console.warn(`[Scraper] Dedup: skipping "${r.name}" — address matches lead ${lead.id}`);
          return false;
        }
      }
    }

    return true;
  });
}

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
}

interface GooglePhoto {
  photo_reference: string;
}

async function getPlaceDetails(placeId: string, apiKey: string) {
  const fields = [
    "name",
    "formatted_address",
    "formatted_phone_number",
    "website",
    "rating",
    "user_ratings_total",
    "price_level",
    "types",
    "geometry",
    "reviews",
    "photos",
    "url",
    "editorial_summary",
    "opening_hours",
  ].join(",");

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.status !== "OK") return null;
  return data.result;
}

/**
 * Basic website quality assessment
 * Checks for mobile responsiveness, SSL, load speed indicators
 */
async function assessWebsiteQuality(url: string): Promise<"poor" | "basic" | "good"> {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(10000),
      headers: { "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)" },
    });

    if (!response.ok) return "poor";

    const html = await response.text();

    // Check for basic quality signals
    const hasViewport = html.includes("viewport");
    const hasSSL = url.startsWith("https");
    const hasMenuPage = /menu/i.test(html);
    const hasOnlineOrdering = /order|ordering|doordash|grubhub|ubereats/i.test(html);
    const isSquarespace = /squarespace/i.test(html);
    const isWix = /wix\.com/i.test(html);
    const isWordpress = /wp-content|wordpress/i.test(html);

    // Simple scoring
    let score = 0;
    if (hasViewport) score += 2;
    if (hasSSL) score += 1;
    if (hasMenuPage) score += 2;
    if (hasOnlineOrdering) score += 2;
    if (isSquarespace || isWix || isWordpress) score += 1;

    if (score >= 6) return "good";
    if (score >= 3) return "basic";
    return "poor";
  } catch {
    return "poor";
  }
}

function calculateProspectScore(params: {
  rating: number;
  reviewCount: number;
  hasWebsite: boolean;
  websiteQuality: string;
  priceLevel?: number;
}): number {
  let score = 0;

  // Higher rating = more established = better prospect
  if (params.rating >= 4.5) score += 30;
  else if (params.rating >= 4.0) score += 25;
  else if (params.rating >= 3.5) score += 15;

  // More reviews = more traffic = more potential
  if (params.reviewCount >= 200) score += 25;
  else if (params.reviewCount >= 100) score += 20;
  else if (params.reviewCount >= 50) score += 15;
  else if (params.reviewCount >= 20) score += 10;

  // No website = highest value prospect
  if (!params.hasWebsite) score += 30;
  else if (params.websiteQuality === "poor") score += 20;

  // Higher price level = higher ticket = can afford our service
  if (params.priceLevel && params.priceLevel >= 2) score += 15;
  else if (params.priceLevel === 1) score += 5;

  return Math.min(100, score);
}

function extractState(addressPart: string): string {
  const match = addressPart.match(/([A-Z]{2})\s/);
  return match ? match[1] : "";
}

function extractZip(addressPart: string): string {
  const match = addressPart.match(/(\d{5}(-\d{4})?)/);
  return match ? match[1] : "";
}
