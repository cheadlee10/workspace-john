/**
 * Multi-Tenant Restaurant Store
 *
 * Manages multiple restaurant configurations for the SaaS platform.
 * Resolves restaurant by domain, slug, or ID.
 * Supports Supabase database with in-memory fallback.
 */

import type { Restaurant } from "@/types/restaurant";
import { demoRestaurant } from "@/config/demo-restaurant";
import { wave115Restaurants } from "@/config/wave115-restaurants";
import { isDbEnabled, getSupabase, isTableNotFoundError, markSchemaUnavailable } from "@/lib/db/supabase";

// === In-memory fallback ===
const memRestaurants = new Map<string, Restaurant>();
const memDomainIndex = new Map<string, string>();
const memSlugIndex = new Map<string, string>();

// Initialize with demo restaurant
memRestaurants.set(demoRestaurant.id, demoRestaurant);
memSlugIndex.set(demoRestaurant.slug, demoRestaurant.id);

// Initialize with wave115 restaurants
for (const r of wave115Restaurants) {
  memRestaurants.set(r.id, r);
  memSlugIndex.set(r.slug, r.id);
}

// === DB helpers ===
function fromDbRestaurant(row: Record<string, unknown>): Restaurant {
  return row.config as Restaurant;
}

export async function getRestaurant(id: string): Promise<Restaurant | undefined> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { data, error } = await db.from("restaurants").select("*").eq("id", id).single();
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
      }
      // Fall through to in-memory for both table-not-found and row-not-found
    } else if (data) {
      return fromDbRestaurant(data);
    }
    // No row in DB — fall through to in-memory
  }
  return memRestaurants.get(id);
}

export async function getRestaurantByDomain(domain: string): Promise<Restaurant | undefined> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { data, error } = await db.from("restaurants").select("*").eq("domain", domain.toLowerCase()).single();
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
      }
      // Fall through to in-memory
    } else if (data) {
      return fromDbRestaurant(data);
    }
    // No row in DB — fall through to in-memory
  }
  const id = memDomainIndex.get(domain.toLowerCase());
  return id ? memRestaurants.get(id) : undefined;
}

export async function getRestaurantBySlug(slug: string): Promise<Restaurant | undefined> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { data, error } = await db.from("restaurants").select("*").eq("slug", slug.toLowerCase()).single();
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
      }
      // Fall through to in-memory
    } else if (data) {
      return fromDbRestaurant(data);
    }
    // No row in DB — fall through to in-memory
  }
  const id = memSlugIndex.get(slug.toLowerCase());
  return id ? memRestaurants.get(id) : undefined;
}

export async function resolveRestaurant(host?: string): Promise<Restaurant> {
  if (host) {
    const cleaned = host.replace(/:\d+$/, "").toLowerCase();
    const byDomain = await getRestaurantByDomain(cleaned);
    if (byDomain) return byDomain;
  }
  return demoRestaurant;
}

export async function createRestaurant(config: Restaurant, domain?: string): Promise<Restaurant> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { error } = await db.from("restaurants").insert({
      id: config.id,
      slug: config.slug.toLowerCase(),
      domain: domain?.toLowerCase() || null,
      config,
    });
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        memRestaurants.set(config.id, config);
        memSlugIndex.set(config.slug.toLowerCase(), config.id);
        if (domain) {
          memDomainIndex.set(domain.toLowerCase(), config.id);
        }
      } else {
        throw new Error(`Failed to create restaurant: ${error.message}`);
      }
    }
  } else {
    memRestaurants.set(config.id, config);
    memSlugIndex.set(config.slug.toLowerCase(), config.id);
    if (domain) {
      memDomainIndex.set(domain.toLowerCase(), config.id);
    }
  }
  return config;
}

export async function updateRestaurant(id: string, updates: Partial<Restaurant>): Promise<Restaurant | undefined> {
  const existing = await getRestaurant(id);
  if (!existing) return undefined;

  const updated = { ...existing, ...updates, updatedAt: new Date().toISOString().split("T")[0] };

  if (isDbEnabled()) {
    const db = getSupabase()!;
    const dbUpdates: Record<string, unknown> = { config: updated };
    if (updates.slug) dbUpdates.slug = updates.slug.toLowerCase();
    const { error } = await db.from("restaurants").update(dbUpdates).eq("id", id);
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        memRestaurants.set(id, updated);
        if (updates.slug && updates.slug !== existing.slug) {
          memSlugIndex.delete(existing.slug.toLowerCase());
          memSlugIndex.set(updates.slug.toLowerCase(), id);
        }
      } else {
        return undefined;
      }
    }
  } else {
    memRestaurants.set(id, updated);
    if (updates.slug && updates.slug !== existing.slug) {
      memSlugIndex.delete(existing.slug.toLowerCase());
      memSlugIndex.set(updates.slug.toLowerCase(), id);
    }
  }

  return updated;
}

export async function setRestaurantDomain(id: string, domain: string): Promise<boolean> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { error } = await db.from("restaurants").update({ domain: domain.toLowerCase() }).eq("id", id);
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  if (!memRestaurants.has(id)) return false;
  for (const [d, rid] of memDomainIndex.entries()) {
    if (rid === id) memDomainIndex.delete(d);
  }
  memDomainIndex.set(domain.toLowerCase(), id);
  return true;
}

export async function removeRestaurantDomain(domain: string): Promise<boolean> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { error } = await db.from("restaurants").update({ domain: null }).eq("domain", domain.toLowerCase());
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  return memDomainIndex.delete(domain.toLowerCase());
}

export async function getAllRestaurants(): Promise<Restaurant[]> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { data, error } = await db.from("restaurants").select("*").order("slug", { ascending: true });
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return [];
      }
    } else {
      return (data || []).map(fromDbRestaurant);
    }
  }
  return Array.from(memRestaurants.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export async function getRestaurantDomain(id: string): Promise<string | undefined> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { data, error } = await db.from("restaurants").select("domain").eq("id", id).single();
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return undefined;
      }
    } else if (data) {
      return (data.domain as string) || undefined;
    } else {
      return undefined;
    }
  }
  for (const [domain, rid] of memDomainIndex.entries()) {
    if (rid === id) return domain;
  }
  return undefined;
}

export async function getRestaurantCount(): Promise<number> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { count, error } = await db.from("restaurants").select("*", { count: "exact", head: true });
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return 0;
      }
    } else {
      return count || 0;
    }
  }
  return memRestaurants.size;
}

export interface RestaurantSummary {
  id: string;
  name: string;
  slug: string;
  type: string;
  domain?: string;
  cuisine: string[];
  city: string;
  state: string;
  tier: string;
  hasOrdering: boolean;
}

export async function getRestaurantSummaries(): Promise<RestaurantSummary[]> {
  const all = await getAllRestaurants();
  const summaries: RestaurantSummary[] = [];

  for (const r of all) {
    const domain = await getRestaurantDomain(r.id);
    summaries.push({
      id: r.id,
      name: r.name,
      slug: r.slug,
      type: r.type,
      domain,
      cuisine: r.cuisine,
      city: r.location.city,
      state: r.location.state,
      tier: r.features.tier,
      hasOrdering: r.features.onlineOrdering,
    });
  }

  return summaries;
}
