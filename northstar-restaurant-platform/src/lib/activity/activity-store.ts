/**
 * Activity Log Store
 *
 * Cross-cutting activity log. Every store mutation should call logActivity()
 * so the dashboard feed and weekly digest capture everything.
 *
 * Supports two backends:
 *   1. Supabase `activities` table (when DB is configured)
 *   2. In-memory array fallback (when DB is not configured)
 */

import type { ActivityEvent } from "@/types/business";
import { getSupabase, isDbEnabled, isTableNotFoundError, markSchemaUnavailable } from "@/lib/db/supabase";

// ---------------------------------------------------------------------------
// In-memory fallback store
// ---------------------------------------------------------------------------

const activities: ActivityEvent[] = [];
let idCounter = 0;

function generateId(): string {
  idCounter++;
  return `act-${Date.now()}-${idCounter}`;
}

// ---------------------------------------------------------------------------
// snake_case <-> camelCase mapping helpers
// ---------------------------------------------------------------------------

/** DB row shape (snake_case) */
interface ActivityRow {
  id: string;
  type: string;
  action: string;
  description: string;
  entity_id: string | null;
  entity_name: string | null;
  metadata: Record<string, string> | null;
  created_at: string;
}

/** Convert a DB row (snake_case) to an ActivityEvent (camelCase). */
function rowToEvent(row: ActivityRow): ActivityEvent {
  return {
    id: row.id,
    type: row.type as ActivityEvent["type"],
    action: row.action,
    description: row.description,
    entityId: row.entity_id ?? undefined,
    entityName: row.entity_name ?? undefined,
    metadata: row.metadata ?? undefined,
    createdAt: row.created_at,
  };
}

/** Convert an ActivityEvent (camelCase) to a DB row (snake_case). */
function eventToRow(event: ActivityEvent): ActivityRow {
  return {
    id: event.id,
    type: event.type,
    action: event.action,
    description: event.description,
    entity_id: event.entityId ?? null,
    entity_name: event.entityName ?? null,
    metadata: event.metadata ?? null,
    created_at: event.createdAt,
  };
}

// ---------------------------------------------------------------------------
// Exported functions (all async to support Supabase path)
// ---------------------------------------------------------------------------

/**
 * Log an activity event.
 *
 * Returns a `Promise<ActivityEvent>` but callers can treat this as
 * fire-and-forget — no `await` required.
 */
export async function logActivity(
  event: Omit<ActivityEvent, "id" | "createdAt">
): Promise<ActivityEvent> {
  const activity: ActivityEvent = {
    ...event,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };

  if (isDbEnabled()) {
    const sb = getSupabase();
    if (sb) {
      const { error } = await sb
        .from("activities")
        .insert(eventToRow(activity));

      if (error) {
        if (isTableNotFoundError(error)) {
          markSchemaUnavailable();
          // Fall through to in-memory
        } else {
          console.error("[activity-store] Supabase insert failed:", error);
          return activity;
        }
      } else {
        return activity;
      }
    }
  }

  // In-memory fallback
  activities.unshift(activity); // newest first

  // Cap at 1000 events in memory
  if (activities.length > 1000) {
    activities.length = 1000;
  }

  return activity;
}

/**
 * Retrieve the most recent activities.
 */
export async function getRecentActivities(
  limit = 20
): Promise<ActivityEvent[]> {
  if (isDbEnabled()) {
    const sb = getSupabase();
    if (sb) {
      const { data, error } = await sb
        .from("activities")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) {
        if (isTableNotFoundError(error)) {
          markSchemaUnavailable();
          // Fall through to in-memory
        } else {
          console.error("[activity-store] Supabase select failed:", error);
          return [];
        }
      } else {
        return (data as ActivityRow[]).map(rowToEvent);
      }
    }
  }

  return activities.slice(0, limit);
}

/**
 * Retrieve activities with optional filtering.
 */
export async function getActivities(filter?: {
  type?: ActivityEvent["type"];
  entityId?: string;
  since?: string;
  limit?: number;
}): Promise<ActivityEvent[]> {
  if (isDbEnabled()) {
    const sb = getSupabase();
    if (sb) {
      let query = sb
        .from("activities")
        .select("*")
        .order("created_at", { ascending: false });

      if (filter?.type) {
        query = query.eq("type", filter.type);
      }
      if (filter?.entityId) {
        query = query.eq("entity_id", filter.entityId);
      }
      if (filter?.since) {
        query = query.gte("created_at", filter.since);
      }

      query = query.limit(filter?.limit || 100);

      const { data, error } = await query;

      if (error) {
        if (isTableNotFoundError(error)) {
          markSchemaUnavailable();
          // Fall through to in-memory
        } else {
          console.error("[activity-store] Supabase select failed:", error);
          return [];
        }
      } else {
        return (data as ActivityRow[]).map(rowToEvent);
      }
    }
  }

  // In-memory fallback
  let result = [...activities];

  if (filter?.type) {
    result = result.filter((a) => a.type === filter.type);
  }
  if (filter?.entityId) {
    result = result.filter((a) => a.entityId === filter.entityId);
  }
  if (filter?.since) {
    const since = new Date(filter.since).getTime();
    result = result.filter((a) => new Date(a.createdAt).getTime() >= since);
  }

  return result.slice(0, filter?.limit || 100);
}

/**
 * Retrieve all activities that fall within the 7-day window starting at
 * `weekOf` (ISO date string).
 */
export async function getActivitiesForWeek(
  weekOf: string
): Promise<ActivityEvent[]> {
  const start = new Date(weekOf);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 7);

  if (isDbEnabled()) {
    const sb = getSupabase();
    if (sb) {
      const { data, error } = await sb
        .from("activities")
        .select("*")
        .gte("created_at", start.toISOString())
        .lt("created_at", end.toISOString())
        .order("created_at", { ascending: false });

      if (error) {
        if (isTableNotFoundError(error)) {
          markSchemaUnavailable();
          // Fall through to in-memory
        } else {
          console.error("[activity-store] Supabase select failed:", error);
          return [];
        }
      } else {
        return (data as ActivityRow[]).map(rowToEvent);
      }
    }
  }

  // In-memory fallback
  return activities.filter((a) => {
    const t = new Date(a.createdAt).getTime();
    return t >= start.getTime() && t < end.getTime();
  });
}

/**
 * Return the total number of activity events.
 */
export async function getActivityCount(): Promise<number> {
  if (isDbEnabled()) {
    const sb = getSupabase();
    if (sb) {
      const { count, error } = await sb
        .from("activities")
        .select("*", { count: "exact", head: true });

      if (error) {
        if (isTableNotFoundError(error)) {
          markSchemaUnavailable();
          // Fall through to in-memory
        } else {
          console.error("[activity-store] Supabase count failed:", error);
          return 0;
        }
      } else {
        return count ?? 0;
      }
    }
  }

  return activities.length;
}
