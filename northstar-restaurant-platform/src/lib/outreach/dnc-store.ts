/**
 * Do Not Contact (DNC) Store
 *
 * Maintains a list of contacts who must never be contacted again
 * across any channel (email, postcard, voice). Supports Supabase
 * with in-memory fallback, consistent with all other stores.
 *
 * The unsubscribe page, bounce handler, and complaint handler all
 * feed into this store. outreach-pipeline.ts checks DNC before
 * every touch.
 */

import { logActivity } from "@/lib/activity/activity-store";
import { getSupabase, isDbEnabled, isTableNotFoundError, markSchemaUnavailable } from "@/lib/db/supabase";

export interface DncEntry {
  id: string;
  email?: string;
  phone?: string;
  address?: string;
  reason: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// In-memory fallback
// ---------------------------------------------------------------------------

const dncList = new Map<string, DncEntry>();

function generateId(): string {
  return "dnc-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

// ---------------------------------------------------------------------------
// DB row mapping
// ---------------------------------------------------------------------------

interface DncRow {
  id: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  reason: string;
  created_at: string;
}

function toDbRow(entry: DncEntry): DncRow {
  return {
    id: entry.id,
    email: entry.email ?? null,
    phone: entry.phone ?? null,
    address: entry.address ?? null,
    reason: entry.reason,
    created_at: entry.createdAt,
  };
}

function fromDbRow(row: DncRow): DncEntry {
  return {
    id: row.id,
    email: row.email ?? undefined,
    phone: row.phone ?? undefined,
    address: row.address ?? undefined,
    reason: row.reason,
    createdAt: row.created_at,
  };
}

// ---------------------------------------------------------------------------
// Exported functions
// ---------------------------------------------------------------------------

/**
 * Add a contact to the DNC list.
 * At least one of email, phone, or address must be provided.
 */
export async function addToDnc(params: {
  email?: string;
  phone?: string;
  address?: string;
  reason: string;
}): Promise<DncEntry> {
  // Check if already on DNC
  const existing = await isOnDnc(params.email, params.phone, params.address);
  if (existing) return existing;

  const entry: DncEntry = {
    id: generateId(),
    email: params.email?.toLowerCase(),
    phone: params.phone,
    address: params.address?.toLowerCase(),
    reason: params.reason,
    createdAt: new Date().toISOString(),
  };

  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { error } = await sb.from("dnc_list").insert(toDbRow(entry));
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        dncList.set(entry.id, entry);
      } else {
        throw new Error(`Failed to add to DNC: ${error.message}`);
      }
    }
  } else {
    dncList.set(entry.id, entry);
  }

  logActivity({
    type: "outreach",
    action: "dnc_added",
    description: `Added to DNC: ${params.email || params.phone || params.address} (${params.reason})`,
    metadata: {
      email: params.email || "",
      phone: params.phone || "",
      reason: params.reason,
    },
  });

  return entry;
}

/**
 * Check if a contact is on the DNC list.
 * Returns the DNC entry if found, undefined otherwise.
 * Checks email, phone, or address — any match is a hit.
 */
export async function isOnDnc(
  email?: string,
  phone?: string,
  address?: string
): Promise<DncEntry | undefined> {
  if (!email && !phone && !address) return undefined;

  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const conditions: string[] = [];
    if (email) conditions.push(`email.eq.${email.toLowerCase()}`);
    if (phone) conditions.push(`phone.eq.${phone}`);
    if (address) conditions.push(`address.eq.${address.toLowerCase()}`);

    const { data, error } = await sb
      .from("dnc_list")
      .select("*")
      .or(conditions.join(","));

    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return undefined;
      }
    } else if (data && data.length > 0) {
      return fromDbRow(data[0] as DncRow);
    } else {
      return undefined;
    }
  }

  // In-memory fallback
  const normalizedEmail = email?.toLowerCase();
  const normalizedAddress = address?.toLowerCase();

  for (const entry of dncList.values()) {
    if (normalizedEmail && entry.email === normalizedEmail) return entry;
    if (phone && entry.phone === phone) return entry;
    if (normalizedAddress && entry.address === normalizedAddress) return entry;
  }

  return undefined;
}

/**
 * Remove a contact from the DNC list by ID.
 */
export async function removeDnc(id: string): Promise<boolean> {
  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { error, count } = await sb
      .from("dnc_list")
      .delete({ count: "exact" })
      .eq("id", id);
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return false;
      }
    } else {
      logActivity({
        type: "outreach",
        action: "dnc_removed",
        description: `Removed DNC entry ${id}`,
      });
      return (count ?? 0) > 0;
    }
  }

  const deleted = dncList.delete(id);
  if (deleted) {
    logActivity({
      type: "outreach",
      action: "dnc_removed",
      description: `Removed DNC entry ${id}`,
    });
  }
  return deleted;
}

/**
 * Get all DNC entries (for admin review).
 */
export async function getAllDnc(): Promise<DncEntry[]> {
  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { data, error } = await sb
      .from("dnc_list")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return [];
      }
    } else {
      return (data as DncRow[])?.map(fromDbRow) ?? [];
    }
  }

  return Array.from(dncList.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
