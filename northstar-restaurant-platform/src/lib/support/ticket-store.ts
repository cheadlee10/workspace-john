/**
 * Support Ticket Store
 *
 * Manages customer service tickets with auto-response generation from FAQs.
 * Supports Supabase database with in-memory fallback.
 */

import type { SupportTicket, TicketResponse } from "@/types/business";
import { logActivity } from "@/lib/activity/activity-store";
import { matchFaqsToTicket, matchSopsToTicket } from "./faq-store";
import { isDbEnabled, getSupabase, isTableNotFoundError, markSchemaUnavailable } from "@/lib/db/supabase";

// === In-memory fallback ===
const memTickets = new Map<string, SupportTicket>();

function generateId(): string {
  return "TKT-" + Math.random().toString(36).slice(2, 6).toUpperCase();
}

// === DB helpers ===
function toDbTicket(t: SupportTicket) {
  return {
    id: t.id,
    client_id: t.clientId || null,
    client_name: t.clientName,
    email: t.email,
    subject: t.subject,
    message: t.message,
    status: t.status,
    priority: t.priority,
    auto_response: t.autoResponse || null,
    matched_faqs: t.matchedFaqs,
    matched_sops: t.matchedSops,
    responses: t.responses,
    resolved_at: t.resolvedAt || null,
    created_at: t.createdAt,
    updated_at: t.updatedAt,
  };
}

function fromDbTicket(row: Record<string, unknown>): SupportTicket {
  return {
    id: row.id as string,
    clientId: (row.client_id as string) || undefined,
    clientName: row.client_name as string,
    email: row.email as string,
    subject: row.subject as string,
    message: row.message as string,
    status: row.status as SupportTicket["status"],
    priority: row.priority as SupportTicket["priority"],
    autoResponse: (row.auto_response as string) || undefined,
    matchedFaqs: (row.matched_faqs as string[]) || [],
    matchedSops: (row.matched_sops as string[]) || [],
    responses: (row.responses as TicketResponse[]) || [],
    resolvedAt: (row.resolved_at as string) || undefined,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

function determinePriority(subject: string, message: string): SupportTicket["priority"] {
  const text = `${subject} ${message}`.toLowerCase();
  if (text.includes("down") || text.includes("not working") || text.includes("urgent") || text.includes("emergency")) {
    return "urgent";
  }
  if (text.includes("payment") || text.includes("billing") || text.includes("charge") || text.includes("cancel")) {
    return "high";
  }
  if (text.includes("help") || text.includes("how do") || text.includes("change")) {
    return "medium";
  }
  return "low";
}

export async function createTicket(params: {
  clientId?: string;
  clientName: string;
  email: string;
  subject: string;
  message: string;
  priority?: SupportTicket["priority"];
}): Promise<SupportTicket> {
  const id = generateId();
  const now = new Date().toISOString();

  const matchedFaqsList = await matchFaqsToTicket(params.message);
  const matchedSopsList = await matchSopsToTicket(params.message);
  const matchedFaqs = matchedFaqsList.map((f) => f.id);
  const matchedSops = matchedSopsList.map((s) => s.id);

  let autoResponse: string | undefined;
  if (matchedFaqsList.length > 0) {
    autoResponse = `Hi ${params.clientName.split(" ")[0]},\n\nThank you for reaching out! Based on your question, here's what might help:\n\n`;
    for (const faq of matchedFaqsList.slice(0, 3)) {
      autoResponse += `**${faq.question}**\n${faq.answer}\n\n`;
    }
    autoResponse += `If this doesn't fully answer your question, we'll follow up personally within 24 hours.\n\nBest,\nNorthStar Support`;
  }

  const ticket: SupportTicket = {
    id,
    clientId: params.clientId,
    clientName: params.clientName,
    email: params.email,
    subject: params.subject,
    message: params.message,
    status: "open",
    priority: params.priority || determinePriority(params.subject, params.message),
    autoResponse,
    matchedFaqs,
    matchedSops,
    responses: [],
    createdAt: now,
    updatedAt: now,
  };

  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { error } = await db.from("tickets").insert(toDbTicket(ticket));
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        memTickets.set(id, ticket);
      } else {
        throw new Error(`Failed to create ticket: ${error.message}`);
      }
    }
  } else {
    memTickets.set(id, ticket);
  }

  logActivity({
    type: "support",
    action: "ticket_opened",
    description: `Ticket ${id}: ${params.subject} (${params.clientName})`,
    entityId: id,
    entityName: params.clientName,
  });

  return ticket;
}

export async function getTicket(id: string): Promise<SupportTicket | undefined> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { data, error } = await db.from("tickets").select("*").eq("id", id).single();
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return undefined;
      }
    } else if (data) {
      return fromDbTicket(data);
    } else {
      return undefined;
    }
  }
  return memTickets.get(id);
}

export async function updateTicket(id: string, updates: Partial<SupportTicket>): Promise<SupportTicket | undefined> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const existing = await getTicket(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };
    const { error } = await db.from("tickets").update(toDbTicket(updated)).eq("id", id);
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return undefined;
      }
    } else {
      return updated;
    }
  }
  const ticket = memTickets.get(id);
  if (!ticket) return undefined;
  const updated = { ...ticket, ...updates, updatedAt: new Date().toISOString() };
  memTickets.set(id, updated);
  return updated;
}

export async function addTicketResponse(id: string, message: string, isAutoGenerated = false): Promise<SupportTicket | undefined> {
  const ticket = await getTicket(id);
  if (!ticket) return undefined;

  const response: TicketResponse = {
    id: Math.random().toString(36).slice(2, 8),
    message,
    isAutoGenerated,
    sentAt: new Date().toISOString(),
  };

  const updated = {
    ...ticket,
    responses: [...ticket.responses, response],
    status: "in_progress" as const,
    updatedAt: new Date().toISOString(),
  };

  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { error } = await db.from("tickets").update(toDbTicket(updated)).eq("id", id);
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        memTickets.set(id, updated);
      } else {
        throw new Error(`Failed to add ticket response: ${error.message}`);
      }
    }
  } else {
    memTickets.set(id, updated);
  }

  logActivity({
    type: "support",
    action: "response_sent",
    description: `Response sent for ticket ${id}${isAutoGenerated ? " (auto)" : ""}`,
    entityId: id,
    entityName: ticket.clientName,
  });

  return updated;
}

export async function resolveTicket(id: string): Promise<SupportTicket | undefined> {
  const ticket = await getTicket(id);
  if (!ticket) return undefined;

  const updated = {
    ...ticket,
    status: "resolved" as const,
    resolvedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { error } = await db.from("tickets").update(toDbTicket(updated)).eq("id", id);
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        memTickets.set(id, updated);
      } else {
        throw new Error(`Failed to resolve ticket: ${error.message}`);
      }
    }
  } else {
    memTickets.set(id, updated);
  }

  logActivity({
    type: "support",
    action: "ticket_resolved",
    description: `Ticket ${id} resolved: ${ticket.subject}`,
    entityId: id,
    entityName: ticket.clientName,
  });

  return updated;
}

export async function getAllTickets(): Promise<SupportTicket[]> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { data, error } = await db.from("tickets").select("*").order("created_at", { ascending: false });
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return [];
      }
    } else {
      return (data || []).map(fromDbTicket);
    }
  }
  return Array.from(memTickets.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getOpenTickets(): Promise<SupportTicket[]> {
  const all = await getAllTickets();
  return all.filter((t) => t.status === "open" || t.status === "in_progress");
}

export async function getTicketsByClient(clientId: string): Promise<SupportTicket[]> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { data, error } = await db.from("tickets").select("*").eq("client_id", clientId).order("created_at", { ascending: false });
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return [];
      }
    } else {
      return (data || []).map(fromDbTicket);
    }
  }
  const all = await getAllTickets();
  return all.filter((t) => t.clientId === clientId);
}

export async function getTicketStats(): Promise<{
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  avgResponseTimeMs: number;
  byPriority: Record<SupportTicket["priority"], number>;
}> {
  const all = await getAllTickets();
  const stats = {
    total: all.length,
    open: 0,
    inProgress: 0,
    resolved: 0,
    avgResponseTimeMs: 0,
    byPriority: { low: 0, medium: 0, high: 0, urgent: 0 } as Record<SupportTicket["priority"], number>,
  };

  let totalResponseTime = 0;
  let responsesCount = 0;

  for (const ticket of all) {
    if (ticket.status === "open") stats.open++;
    else if (ticket.status === "in_progress") stats.inProgress++;
    else if (ticket.status === "resolved" || ticket.status === "closed") stats.resolved++;

    stats.byPriority[ticket.priority]++;

    if (ticket.responses.length > 0) {
      const created = new Date(ticket.createdAt).getTime();
      const firstResponse = new Date(ticket.responses[0].sentAt).getTime();
      totalResponseTime += firstResponse - created;
      responsesCount++;
    }
  }

  stats.avgResponseTimeMs = responsesCount > 0 ? totalResponseTime / responsesCount : 0;
  return stats;
}

export async function getTicketCount(): Promise<number> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { count, error } = await db.from("tickets").select("*", { count: "exact", head: true });
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
  return memTickets.size;
}
