import { getAllLeads } from "@/lib/crm/lead-store";
import { getSupabase, isDbEnabled, isTableNotFoundError, markSchemaUnavailable } from "@/lib/db/supabase";
import type { Lead, LeadStage, OutreachEvent } from "@/types/business";

type EventMetadata = Record<string, unknown>;

interface EmailEventRow {
  id: string;
  lead_id: string | null;
  event_type: string;
  timestamp: string;
  metadata: EventMetadata | null;
}

interface DailySendLogRow {
  date: string;
  send_count: number;
}

interface TrackerEvent {
  leadId: string;
  eventType: string;
  timestamp: string;
  metadata?: EventMetadata;
}

export interface OutreachTrackerRow {
  leadId: string;
  restaurantName: string;
  stage: LeadStage;
  demoSiteLink: string | null;
  email1Sent: string | null;
  email1Opened: "y" | "n";
  email2Sent: string | null;
  postcardSent: string | null;
  callMade: string | null;
  callOutcome: string | null;
  lastActivity: string | null;
}

export interface OutreachTrackerSummary {
  prospectCount: number;
  emailsSentToday: number;
  lastSendDate: string | null;
}

export interface OutreachTrackerData {
  rows: OutreachTrackerRow[];
  summary: OutreachTrackerSummary;
}

function getString(metadata: EventMetadata | undefined, key: string): string | undefined {
  const value = metadata?.[key];
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function getStepNumber(metadata: EventMetadata | undefined): number | null {
  const candidateKeys = ["stepIndex", "step", "emailNumber", "email_number", "sequenceStep"];

  for (const key of candidateKeys) {
    const value = metadata?.[key];
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
    if (typeof value === "string" && value.trim()) {
      const parsed = Number.parseInt(value, 10);
      if (!Number.isNaN(parsed)) {
        return parsed;
      }
    }
  }

  return null;
}

function includesAll(text: string, terms: string[]): boolean {
  return terms.every((term) => text.includes(term));
}

function includesAny(text: string, terms: string[]): boolean {
  return terms.some((term) => text.includes(term));
}

function normalizeText(value: string | undefined | null): string {
  return (value ?? "").toLowerCase();
}

function isEmail1Event(text: string, metadata?: EventMetadata): boolean {
  const step = getStepNumber(metadata);
  return step === 0 || includesAll(text, ["email", "1"]) || text.includes("first email") || text.includes("initial email");
}

function isEmail2Event(text: string, metadata?: EventMetadata): boolean {
  const step = getStepNumber(metadata);
  return step === 1 || includesAll(text, ["email", "2"]) || text.includes("second email") || text.includes("followup email") || text.includes("follow-up email");
}

function isSentEvent(text: string): boolean {
  return includesAny(text, ["sent", "send", "delivered", "queued", "mailed"]);
}

function isOpenedEvent(text: string): boolean {
  return includesAny(text, ["opened", "open"]);
}

function isCallMadeEvent(text: string): boolean {
  return text.includes("call") && includesAny(text, ["made", "attempt", "attempted", "called", "completed", "placed"]);
}

function isCallOutcomeEvent(text: string, metadata?: EventMetadata): boolean {
  return Boolean(getString(metadata, "outcome")) || (text.includes("call") && includesAny(text, ["outcome", "result", "disposition", "response"]));
}

function getCallOutcome(metadata?: EventMetadata): string | null {
  const preferred = getString(metadata, "outcome");
  if (preferred) return preferred;

  return getString(metadata, "result")
    ?? getString(metadata, "disposition")
    ?? getString(metadata, "response")
    ?? null;
}

function pushTimestamp(current: string | null, candidate: string | undefined): string | null {
  if (!candidate) return current;
  if (!current) return candidate;
  return candidate > current ? candidate : current;
}

function eventText(eventType: string, metadata?: EventMetadata): string {
  const strings = [eventType];

  for (const value of Object.values(metadata ?? {})) {
    if (typeof value === "string") {
      strings.push(value);
    }
  }

  return normalizeText(strings.join(" "));
}

function buildHistoryEvents(lead: Lead): TrackerEvent[] {
  const events: TrackerEvent[] = [];

  for (const event of lead.outreachHistory) {
    events.push(...fromOutreachHistory(lead.id, event));
  }

  return events;
}

function fromOutreachHistory(leadId: string, event: OutreachEvent): TrackerEvent[] {
  const metadata = event.metadata as EventMetadata | undefined;
  const step = getStepNumber(metadata);
  const stepLabel = typeof step === "number" ? `email${step + 1}` : "email";
  const normalized: TrackerEvent[] = [];

  if (event.type === "email") {
    normalized.push({
      leadId,
      eventType: `${stepLabel} ${event.status}`,
      timestamp: event.sentAt,
      metadata,
    });

    if (event.openedAt) {
      normalized.push({
        leadId,
        eventType: `${stepLabel} opened`,
        timestamp: event.openedAt,
        metadata,
      });
    }
  } else if (event.type === "postcard") {
    normalized.push({
      leadId,
      eventType: `postcard ${event.status}`,
      timestamp: event.sentAt,
      metadata,
    });
  } else if (event.type === "call") {
    normalized.push({
      leadId,
      eventType: `call made ${event.status}`,
      timestamp: event.sentAt,
      metadata,
    });

    const outcome = getCallOutcome(metadata);
    if (outcome) {
      normalized.push({
        leadId,
        eventType: "call outcome",
        timestamp: event.sentAt,
        metadata: { ...metadata, outcome },
      });
    }
  } else {
    normalized.push({
      leadId,
      eventType: `${event.type} ${event.status}`,
      timestamp: event.sentAt,
      metadata,
    });
  }

  return normalized;
}

async function getTrackerEmailEvents(): Promise<TrackerEvent[]> {
  if (!isDbEnabled()) {
    return [];
  }

  const db = getSupabase();
  if (!db) {
    return [];
  }

  const { data, error } = await db
    .from("email_events")
    .select("lead_id, event_type, timestamp, metadata")
    .order("timestamp", { ascending: false });

  if (error) {
    if (isTableNotFoundError(error)) {
      markSchemaUnavailable();
      return [];
    }

    throw new Error(`Failed to load outreach email events: ${error.message}`);
  }

  return ((data as EmailEventRow[] | null) ?? [])
    .filter((row) => typeof row.lead_id === "string" && row.lead_id.length > 0)
    .map((row) => ({
      leadId: row.lead_id!,
      eventType: row.event_type,
      timestamp: row.timestamp,
      metadata: row.metadata ?? undefined,
    }));
}

async function getTrackerSummary(): Promise<OutreachTrackerSummary> {
  if (!isDbEnabled()) {
    return {
      prospectCount: 0,
      emailsSentToday: 0,
      lastSendDate: null,
    };
  }

  const db = getSupabase();
  if (!db) {
    return {
      prospectCount: 0,
      emailsSentToday: 0,
      lastSendDate: null,
    };
  }

  const today = new Date().toISOString().slice(0, 10);
  const [{ data: todayData, error: todayError }, { data: lastData, error: lastError }] = await Promise.all([
    db.from("daily_send_log").select("date, send_count").eq("date", today).maybeSingle(),
    db.from("daily_send_log").select("date, send_count").order("date", { ascending: false }).limit(1).maybeSingle(),
  ]);

  if (todayError || lastError) {
    const error = todayError ?? lastError;
    if (error && isTableNotFoundError(error)) {
      markSchemaUnavailable();
      return {
        prospectCount: 0,
        emailsSentToday: 0,
        lastSendDate: null,
      };
    }

    throw new Error(`Failed to load daily send log: ${error?.message ?? "unknown error"}`);
  }

  const todayRow = todayData as DailySendLogRow | null;
  const lastRow = lastData as DailySendLogRow | null;

  return {
    prospectCount: 0,
    emailsSentToday: todayRow?.send_count ?? 0,
    lastSendDate: lastRow?.date ?? null,
  };
}

export async function getOutreachTrackerData(): Promise<OutreachTrackerData> {
  const [leads, emailEvents, summary] = await Promise.all([
    getAllLeads(),
    getTrackerEmailEvents(),
    getTrackerSummary(),
  ]);

  const eventsByLead = new Map<string, TrackerEvent[]>();

  for (const event of emailEvents) {
    const list = eventsByLead.get(event.leadId) ?? [];
    list.push(event);
    eventsByLead.set(event.leadId, list);
  }

  for (const lead of leads) {
    const historyEvents = buildHistoryEvents(lead);
    const list = eventsByLead.get(lead.id) ?? [];
    list.push(...historyEvents);
    eventsByLead.set(lead.id, list);
  }

  const rows = leads.map<OutreachTrackerRow>((lead) => {
    const leadEvents = eventsByLead.get(lead.id) ?? [];
    let email1Sent: string | null = null;
    let email1Opened = false;
    let email2Sent: string | null = null;
    let postcardSent: string | null = null;
    let callMade: string | null = null;
    let callOutcome: string | null = null;
    let lastActivity: string | null = lead.updatedAt ?? null;

    for (const event of leadEvents) {
      const text = eventText(event.eventType, event.metadata);

      lastActivity = pushTimestamp(lastActivity, event.timestamp);

      if (isEmail1Event(text, event.metadata) && isSentEvent(text)) {
        email1Sent = pushTimestamp(email1Sent, event.timestamp);
      }

      if (isEmail1Event(text, event.metadata) && isOpenedEvent(text)) {
        email1Opened = true;
      }

      if (isEmail2Event(text, event.metadata) && isSentEvent(text)) {
        email2Sent = pushTimestamp(email2Sent, event.timestamp);
      }

      if (text.includes("postcard") && isSentEvent(text)) {
        postcardSent = pushTimestamp(postcardSent, event.timestamp);
      }

      if (isCallMadeEvent(text)) {
        callMade = pushTimestamp(callMade, event.timestamp);
      }

      if (isCallOutcomeEvent(text, event.metadata)) {
        callOutcome = getCallOutcome(event.metadata) ?? callOutcome;
      }
    }

    return {
      leadId: lead.id,
      restaurantName: lead.restaurantName,
      stage: lead.stage,
      demoSiteLink: lead.previewUrl ?? null,
      email1Sent,
      email1Opened: email1Opened ? "y" : "n",
      email2Sent,
      postcardSent,
      callMade,
      callOutcome,
      lastActivity,
    };
  }).sort((a, b) => {
    const aTime = a.lastActivity ? new Date(a.lastActivity).getTime() : 0;
    const bTime = b.lastActivity ? new Date(b.lastActivity).getTime() : 0;
    return bTime - aTime;
  });

  return {
    rows,
    summary: {
      ...summary,
      prospectCount: rows.length,
    },
  };
}
