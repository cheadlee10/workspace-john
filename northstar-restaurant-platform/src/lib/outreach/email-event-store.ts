/**
 * Email Event Store (Open/Click Tracking)
 *
 * Tracks email opens and clicks from Resend webhooks.
 * Used to identify "hot leads" — prospects who engage with
 * emails but haven't responded yet — and prioritize them for
 * postcard or phone follow-up.
 *
 * Supabase with in-memory fallback (same pattern as all other stores).
 */

import { getSupabase, isDbEnabled, isTableNotFoundError, markSchemaUnavailable } from "@/lib/db/supabase";
import { getAllLeads } from "@/lib/crm/lead-store";

export interface EmailEvent {
  id: string;
  leadId: string;
  sequenceId?: string;
  eventType: string; // "opened" | "clicked" | "delivered"
  timestamp: string;
  metadata?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// In-memory fallback
// ---------------------------------------------------------------------------

const memEvents: EmailEvent[] = [];

function generateId(): string {
  return "evt-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8);
}

// ---------------------------------------------------------------------------
// DB row mapping
// ---------------------------------------------------------------------------

interface EventRow {
  id: string;
  lead_id: string | null;
  sequence_id: string | null;
  event_type: string;
  timestamp: string;
  metadata: Record<string, unknown> | null;
}

function toDbRow(event: EmailEvent): EventRow {
  return {
    id: event.id,
    lead_id: event.leadId,
    sequence_id: event.sequenceId ?? null,
    event_type: event.eventType,
    timestamp: event.timestamp,
    metadata: event.metadata ?? null,
  };
}

function fromDbRow(row: EventRow): EmailEvent {
  return {
    id: row.id,
    leadId: row.lead_id ?? "",
    sequenceId: row.sequence_id ?? undefined,
    eventType: row.event_type,
    timestamp: row.timestamp,
    metadata: (row.metadata as Record<string, unknown>) ?? undefined,
  };
}

// ---------------------------------------------------------------------------
// Exported functions
// ---------------------------------------------------------------------------

/**
 * Log an email event (open, click, etc.)
 */
export async function logEmailEvent(
  leadId: string,
  sequenceId: string | undefined,
  eventType: string,
  metadata?: Record<string, unknown>
): Promise<EmailEvent> {
  const event: EmailEvent = {
    id: generateId(),
    leadId,
    sequenceId,
    eventType,
    timestamp: new Date().toISOString(),
    metadata,
  };

  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { error } = await sb.from("email_events").insert(toDbRow(event));
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        memEvents.push(event);
      }
      // Swallow other errors — tracking is best-effort
    }
  } else {
    memEvents.push(event);
  }

  return event;
}

/**
 * Get engagement history for a lead (opens/clicks sorted by timestamp desc).
 */
export async function getLeadEngagement(leadId: string): Promise<EmailEvent[]> {
  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { data, error } = await sb
      .from("email_events")
      .select("*")
      .eq("lead_id", leadId)
      .order("timestamp", { ascending: false });

    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return [];
      }
    } else {
      return (data as EventRow[])?.map(fromDbRow) ?? [];
    }
  }

  return memEvents
    .filter((e) => e.leadId === leadId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

/**
 * Get "hot leads" — leads who opened or clicked an email but haven't
 * responded yet. These are priority targets for postcard or phone follow-up.
 */
export async function getHotLeads(): Promise<
  Array<{ leadId: string; opens: number; clicks: number; lastEngaged: string }>
> {
  // Step 1: Get all engaged lead IDs from events
  let events: EmailEvent[];

  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { data, error } = await sb
      .from("email_events")
      .select("*")
      .in("event_type", ["opened", "clicked"])
      .order("timestamp", { ascending: false });

    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        events = memEvents.filter((e) => e.eventType === "opened" || e.eventType === "clicked");
      } else {
        return [];
      }
    } else {
      events = (data as EventRow[])?.map(fromDbRow) ?? [];
    }
  } else {
    events = memEvents.filter((e) => e.eventType === "opened" || e.eventType === "clicked");
  }

  if (events.length === 0) return [];

  // Step 2: Aggregate by lead
  const leadMap = new Map<string, { opens: number; clicks: number; lastEngaged: string }>();

  for (const event of events) {
    const existing = leadMap.get(event.leadId);
    if (!existing) {
      leadMap.set(event.leadId, {
        opens: event.eventType === "opened" ? 1 : 0,
        clicks: event.eventType === "clicked" ? 1 : 0,
        lastEngaged: event.timestamp,
      });
    } else {
      if (event.eventType === "opened") existing.opens++;
      if (event.eventType === "clicked") existing.clicks++;
      if (event.timestamp > existing.lastEngaged) {
        existing.lastEngaged = event.timestamp;
      }
    }
  }

  // Step 3: Filter out leads who have already responded or closed
  const respondedStages = new Set(["responded", "meeting_scheduled", "closed_won", "closed_lost", "churned"]);
  let activeLeadIds: Set<string>;
  try {
    const allLeads = await getAllLeads();
    activeLeadIds = new Set(
      allLeads
        .filter((l) => !respondedStages.has(l.stage))
        .map((l) => l.id)
    );
  } catch {
    // If lead store unavailable, return all engaged leads
    activeLeadIds = new Set(leadMap.keys());
  }

  // Step 4: Return hot leads sorted by engagement (clicks > opens)
  return Array.from(leadMap.entries())
    .filter(([leadId]) => activeLeadIds.has(leadId))
    .map(([leadId, stats]) => ({ leadId, ...stats }))
    .sort((a, b) => {
      // Clicks are stronger signal than opens
      const scoreA = a.clicks * 3 + a.opens;
      const scoreB = b.clicks * 3 + b.opens;
      return scoreB - scoreA;
    });
}
