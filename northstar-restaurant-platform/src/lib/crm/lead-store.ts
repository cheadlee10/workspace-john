/**
 * CRM Lead Store
 *
 * Dual-mode lead management: uses Supabase when configured, otherwise
 * falls back to an in-memory Map. Every mutation logs to the activity store.
 */

import type { Lead, LeadStage, LeadSource, LeadNote, OutreachEvent } from "@/types/business";
import { logActivity } from "@/lib/activity/activity-store";
import { getSupabase, isDbEnabled, isTableNotFoundError, markSchemaUnavailable } from "@/lib/db/supabase";

// ---------------------------------------------------------------------------
// In-memory fallback
// ---------------------------------------------------------------------------

const leads = new Map<string, Lead>();

function generateId(): string {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

// ---------------------------------------------------------------------------
// DB row <-> Lead mapping helpers
// ---------------------------------------------------------------------------

interface DbLead {
  id: string;
  restaurant_name: string;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  address: string;
  city: string;
  state: string;
  stage: string;
  source: string;
  score: number;
  preview_url: string | null;
  tags: string[];
  notes: LeadNote[];
  outreach_history: OutreachEvent[];
  value: number;
  last_contacted_at: string | null;
  next_follow_up_at: string | null;
  created_at: string;
  updated_at: string;
}

function toDbLead(lead: Lead): DbLead {
  return {
    id: lead.id,
    restaurant_name: lead.restaurantName,
    contact_name: lead.contactName ?? null,
    email: lead.email ?? null,
    phone: lead.phone ?? null,
    website: lead.website ?? null,
    address: lead.address,
    city: lead.city,
    state: lead.state,
    stage: lead.stage,
    source: lead.source,
    score: lead.score,
    preview_url: lead.previewUrl ?? null,
    tags: lead.tags,
    notes: lead.notes,
    outreach_history: lead.outreachHistory,
    value: lead.value,
    last_contacted_at: lead.lastContactedAt ?? null,
    next_follow_up_at: lead.nextFollowUpAt ?? null,
    created_at: lead.createdAt,
    updated_at: lead.updatedAt,
  };
}

function fromDbLead(row: DbLead): Lead {
  return {
    id: row.id,
    restaurantName: row.restaurant_name,
    contactName: row.contact_name ?? undefined,
    email: row.email ?? undefined,
    phone: row.phone ?? undefined,
    website: row.website ?? undefined,
    address: row.address,
    city: row.city,
    state: row.state,
    stage: row.stage as LeadStage,
    source: row.source as LeadSource,
    score: row.score,
    previewUrl: row.preview_url ?? undefined,
    tags: row.tags ?? [],
    notes: row.notes ?? [],
    outreachHistory: row.outreach_history ?? [],
    value: Number(row.value),
    lastContactedAt: row.last_contacted_at ?? undefined,
    nextFollowUpAt: row.next_follow_up_at ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// ---------------------------------------------------------------------------
// Exported functions
// ---------------------------------------------------------------------------

export async function createLead(params: {
  restaurantName: string;
  contactName?: string;
  email?: string;
  phone?: string;
  website?: string;
  address: string;
  city: string;
  state: string;
  source: LeadSource;
  score?: number;
  tags?: string[];
  value?: number;
}): Promise<Lead> {
  const id = generateId();
  const now = new Date().toISOString();
  const lead: Lead = {
    id,
    restaurantName: params.restaurantName,
    contactName: params.contactName,
    email: params.email,
    phone: params.phone,
    website: params.website,
    address: params.address,
    city: params.city,
    state: params.state,
    stage: "prospect",
    source: params.source,
    score: params.score || 50,
    tags: params.tags || [],
    notes: [],
    outreachHistory: [],
    value: params.value || 149,
    createdAt: now,
    updatedAt: now,
  };

  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { error } = await sb.from("leads").insert(toDbLead(lead));
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        leads.set(id, lead); // Fall back to in-memory
      } else {
        throw new Error(`Failed to create lead: ${error.message}`);
      }
    }
  } else {
    leads.set(id, lead);
  }

  logActivity({
    type: "lead",
    action: "created",
    description: `New lead: ${params.restaurantName} (${params.city}, ${params.state})`,
    entityId: id,
    entityName: params.restaurantName,
  });

  return lead;
}

export async function getLead(id: string): Promise<Lead | undefined> {
  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { data, error } = await sb.from("leads").select("*").eq("id", id).single();
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return undefined;
      }
    } else if (data) {
      return fromDbLead(data as DbLead);
    } else {
      return undefined;
    }
  }
  return leads.get(id);
}

export async function updateLead(id: string, updates: Partial<Lead>): Promise<Lead | undefined> {
  if (isDbEnabled()) {
    const sb = getSupabase()!;

    // Fetch existing lead to merge
    const existing = await getLead(id);
    if (!existing) return undefined;

    const merged: Lead = { ...existing, ...updates, updatedAt: new Date().toISOString() };
    const dbRow = toDbLead(merged);

    // Remove id from the update payload; it's the primary key
    const { id: _id, ...updatePayload } = dbRow;
    const { error } = await sb.from("leads").update(updatePayload).eq("id", id);
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        throw new Error(`Failed to update lead: ${error.message}`);
      }
    } else {
      return merged;
    }
  }

  const lead = leads.get(id);
  if (!lead) return undefined;

  const updated = { ...lead, ...updates, updatedAt: new Date().toISOString() };
  leads.set(id, updated);
  return updated;
}

export async function deleteLead(id: string): Promise<boolean> {
  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { error, count } = await sb
      .from("leads")
      .delete({ count: "exact" })
      .eq("id", id);
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        throw new Error(`Failed to delete lead: ${error.message}`);
      }
    } else {
      return (count ?? 0) > 0;
    }
  }
  return leads.delete(id);
}

export async function moveLeadToStage(id: string, stage: LeadStage): Promise<Lead | undefined> {
  const lead = await getLead(id);
  if (!lead) return undefined;

  const previousStage = lead.stage;
  const now = new Date().toISOString();

  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { error } = await sb
      .from("leads")
      .update({ stage, updated_at: now })
      .eq("id", id);
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        const updated = { ...lead, stage, updatedAt: now };
        leads.set(id, updated);
      } else {
        throw new Error(`Failed to move lead stage: ${error.message}`);
      }
    }
  } else {
    const updated = { ...lead, stage, updatedAt: now };
    leads.set(id, updated);
  }

  logActivity({
    type: "lead",
    action: "stage_changed",
    description: `${lead.restaurantName} moved from ${previousStage} to ${stage}`,
    entityId: id,
    entityName: lead.restaurantName,
    metadata: { from: previousStage, to: stage },
  });

  return { ...lead, stage, updatedAt: now };
}

export async function addLeadNote(id: string, content: string): Promise<Lead | undefined> {
  const lead = await getLead(id);
  if (!lead) return undefined;

  const note: LeadNote = {
    id: generateId(),
    content,
    createdAt: new Date().toISOString(),
  };

  const updatedNotes = [...lead.notes, note];
  const now = new Date().toISOString();

  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { error } = await sb
      .from("leads")
      .update({ notes: updatedNotes, updated_at: now })
      .eq("id", id);
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        const updated = { ...lead, notes: updatedNotes, updatedAt: now };
        leads.set(id, updated);
      } else {
        throw new Error(`Failed to add lead note: ${error.message}`);
      }
    }
  } else {
    const updated = { ...lead, notes: updatedNotes, updatedAt: now };
    leads.set(id, updated);
  }

  return { ...lead, notes: updatedNotes, updatedAt: now };
}

export async function addOutreachEvent(
  id: string,
  event: Omit<OutreachEvent, "id">
): Promise<Lead | undefined> {
  const lead = await getLead(id);
  if (!lead) return undefined;

  const outreach: OutreachEvent = { ...event, id: generateId() };
  const updatedHistory = [...lead.outreachHistory, outreach];
  const now = new Date().toISOString();

  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { error } = await sb
      .from("leads")
      .update({
        outreach_history: updatedHistory,
        last_contacted_at: event.sentAt,
        updated_at: now,
      })
      .eq("id", id);
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        const updated = {
          ...lead,
          outreachHistory: updatedHistory,
          lastContactedAt: event.sentAt,
          updatedAt: now,
        };
        leads.set(id, updated);
      } else {
        throw new Error(`Failed to add outreach event: ${error.message}`);
      }
    }
  } else {
    const updated = {
      ...lead,
      outreachHistory: updatedHistory,
      lastContactedAt: event.sentAt,
      updatedAt: now,
    };
    leads.set(id, updated);
  }

  logActivity({
    type: "outreach",
    action: event.type,
    description: `${event.type} sent to ${lead.restaurantName}${event.subject ? `: ${event.subject}` : ""}`,
    entityId: id,
    entityName: lead.restaurantName,
  });

  return {
    ...lead,
    outreachHistory: updatedHistory,
    lastContactedAt: event.sentAt,
    updatedAt: now,
  };
}

export async function getAllLeads(): Promise<Lead[]> {
  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { data, error } = await sb
      .from("leads")
      .select("*")
      .order("updated_at", { ascending: false });
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return [];
      }
    } else {
      return (data as DbLead[])?.map(fromDbLead) ?? [];
    }
  }

  return Array.from(leads.values()).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export async function getLeadsByStage(stage: LeadStage): Promise<Lead[]> {
  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { data, error } = await sb
      .from("leads")
      .select("*")
      .eq("stage", stage)
      .order("updated_at", { ascending: false });
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return [];
      }
    } else {
      return (data as DbLead[])?.map(fromDbLead) ?? [];
    }
  }

  return (await getAllLeads()).filter((l) => l.stage === stage);
}

export async function getLeadsBySource(source: LeadSource): Promise<Lead[]> {
  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { data, error } = await sb
      .from("leads")
      .select("*")
      .eq("source", source)
      .order("updated_at", { ascending: false });
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return [];
      }
    } else {
      return (data as DbLead[])?.map(fromDbLead) ?? [];
    }
  }

  return (await getAllLeads()).filter((l) => l.source === source);
}

export async function searchLeads(query: string): Promise<Lead[]> {
  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const pattern = `%${query}%`;
    const { data, error } = await sb
      .from("leads")
      .select("*")
      .or(
        `restaurant_name.ilike.${pattern},contact_name.ilike.${pattern},city.ilike.${pattern},email.ilike.${pattern}`
      )
      .order("updated_at", { ascending: false });
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return [];
      }
    } else {
      return (data as DbLead[])?.map(fromDbLead) ?? [];
    }
  }

  const q = query.toLowerCase();
  return (await getAllLeads()).filter(
    (l) =>
      l.restaurantName.toLowerCase().includes(q) ||
      l.contactName?.toLowerCase().includes(q) ||
      l.city.toLowerCase().includes(q) ||
      l.email?.toLowerCase().includes(q)
  );
}

export async function getPipelineStats(): Promise<{
  byStage: Record<LeadStage, number>;
  total: number;
  totalValue: number;
  avgScore: number;
  conversionRate: number;
}> {
  const all = await getAllLeads();
  const byStage: Record<LeadStage, number> = {
    prospect: 0,
    outreach: 0,
    demo: 0,
    proposal: 0,
    close: 0,
    onboarding: 0,
    active: 0,
    churned: 0,
  };

  let totalScore = 0;
  let totalValue = 0;

  for (const lead of all) {
    byStage[lead.stage]++;
    totalScore += lead.score;
    totalValue += lead.value;
  }

  const closed = byStage.active + byStage.close + byStage.onboarding;
  const conversionRate = all.length > 0 ? (closed / all.length) * 100 : 0;

  return {
    byStage,
    total: all.length,
    totalValue,
    avgScore: all.length > 0 ? Math.round(totalScore / all.length) : 0,
    conversionRate: Math.round(conversionRate * 10) / 10,
  };
}

export async function getLeadCount(): Promise<number> {
  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { count, error } = await sb
      .from("leads")
      .select("*", { count: "exact", head: true });
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return 0;
      }
    } else {
      return count ?? 0;
    }
  }
  return leads.size;
}
