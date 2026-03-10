/**
 * Supabase Client
 *
 * Single shared client for all server-side database operations.
 * Configure via NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars.
 *
 * When these env vars are not set, or when the database tables don't exist yet,
 * the app falls back to in-memory stores automatically.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

// Use globalThis so the flag is shared across all bundled chunks
// (Turbopack may split modules into separate chunks with independent state)
const SCHEMA_FLAG_KEY = "__nsSchemaVerified";

function getSchemaFlag(): boolean | undefined {
  return (globalThis as Record<string, unknown>)[SCHEMA_FLAG_KEY] as boolean | undefined;
}

function setSchemaFlag(value: boolean): void {
  (globalThis as Record<string, unknown>)[SCHEMA_FLAG_KEY] = value;
}

export function getSupabase(): SupabaseClient | null {
  if (supabase) return supabase;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return null; // Fall back to in-memory stores
  }

  supabase = createClient(url, key);
  return supabase;
}

/**
 * Check if database is configured and the schema has been created.
 * Returns false if env vars are missing OR if we previously detected
 * that tables don't exist (avoids repeated failed queries).
 */
export function isDbEnabled(): boolean {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return false;
  }
  // If we already verified the schema is missing, stay on in-memory
  if (getSchemaFlag() === false) return false;
  return true;
}

/**
 * Call this when a store detects a "table not found" error (PGRST205).
 * Disables DB for the rest of this process lifetime, falling back to in-memory.
 */
export function markSchemaUnavailable(): void {
  if (getSchemaFlag() !== false) {
    console.warn("[Supabase] Tables not found — falling back to in-memory stores. Run schema.sql to create tables.");
    setSchemaFlag(false);
  }
}

/**
 * Check if a Supabase error indicates missing tables.
 */
export function isTableNotFoundError(error: { code?: string; message?: string } | null): boolean {
  return error?.code === "PGRST205" || (error?.message?.includes("schema cache") ?? false);
}
