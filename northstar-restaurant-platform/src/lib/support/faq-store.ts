/**
 * FAQ & SOP Store
 *
 * Knowledge base for customer service automation.
 * FAQs answer common questions. SOPs guide operational procedures.
 * Supports Supabase database with in-memory fallback.
 */

import type { FaqArticle, Sop } from "@/types/business";
import { isDbEnabled, getSupabase, isTableNotFoundError, markSchemaUnavailable } from "@/lib/db/supabase";

// === In-memory fallback ===
const memFaqs = new Map<string, FaqArticle>();
const memSops = new Map<string, Sop>();

function generateId(): string {
  return "faq-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

function generateSopId(): string {
  return "sop-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

// === DB helpers ===
function toDbFaq(f: FaqArticle) {
  return {
    id: f.id,
    question: f.question,
    answer: f.answer,
    category: f.category,
    tags: f.tags,
    is_public: f.isPublic,
    sort_order: f.sortOrder,
    created_at: f.createdAt,
    updated_at: f.updatedAt,
  };
}

function fromDbFaq(row: Record<string, unknown>): FaqArticle {
  return {
    id: row.id as string,
    question: row.question as string,
    answer: row.answer as string,
    category: row.category as string,
    tags: (row.tags as string[]) || [],
    isPublic: row.is_public as boolean,
    sortOrder: row.sort_order as number,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

function toDbSop(s: Sop) {
  return {
    id: s.id,
    title: s.title,
    category: s.category,
    steps: s.steps,
    triggers: s.triggers || [],
    created_at: s.createdAt,
    updated_at: s.updatedAt,
  };
}

function fromDbSop(row: Record<string, unknown>): Sop {
  return {
    id: row.id as string,
    title: row.title as string,
    category: row.category as string,
    steps: (row.steps as string[]) || [],
    triggers: (row.triggers as string[]) || undefined,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

// === FAQ CRUD ===

export async function createFaq(params: {
  question: string;
  answer: string;
  category: string;
  tags?: string[];
  isPublic?: boolean;
  sortOrder?: number;
}): Promise<FaqArticle> {
  const id = generateId();
  const now = new Date().toISOString();
  const faq: FaqArticle = {
    id,
    question: params.question,
    answer: params.answer,
    category: params.category,
    tags: params.tags || [],
    isPublic: params.isPublic ?? true,
    sortOrder: params.sortOrder ?? 0,
    createdAt: now,
    updatedAt: now,
  };

  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { error } = await db.from("faqs").insert(toDbFaq(faq));
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        memFaqs.set(id, faq);
      } else {
        throw new Error(`Failed to create FAQ: ${error.message}`);
      }
    }
  } else {
    memFaqs.set(id, faq);
  }

  return faq;
}

export async function getFaq(id: string): Promise<FaqArticle | undefined> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { data, error } = await db.from("faqs").select("*").eq("id", id).single();
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return undefined;
      }
    } else if (data) {
      return fromDbFaq(data);
    } else {
      return undefined;
    }
  }
  return memFaqs.get(id);
}

export async function updateFaq(id: string, updates: Partial<FaqArticle>): Promise<FaqArticle | undefined> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const existing = await getFaq(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };
    const { error } = await db.from("faqs").update(toDbFaq(updated)).eq("id", id);
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
  const faq = memFaqs.get(id);
  if (!faq) return undefined;
  const updated = { ...faq, ...updates, updatedAt: new Date().toISOString() };
  memFaqs.set(id, updated);
  return updated;
}

export async function deleteFaq(id: string): Promise<boolean> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { error } = await db.from("faqs").delete().eq("id", id);
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
  return memFaqs.delete(id);
}

export async function getAllFaqs(): Promise<FaqArticle[]> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { data, error } = await db.from("faqs").select("*").order("sort_order", { ascending: true });
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return [];
      }
    } else {
      return (data || []).map(fromDbFaq);
    }
  }
  return Array.from(memFaqs.values()).sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getPublicFaqs(): Promise<FaqArticle[]> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { data, error } = await db.from("faqs").select("*").eq("is_public", true).order("sort_order", { ascending: true });
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return [];
      }
    } else {
      return (data || []).map(fromDbFaq);
    }
  }
  const all = await getAllFaqs();
  return all.filter((f) => f.isPublic);
}

export async function getFaqsByCategory(category: string): Promise<FaqArticle[]> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { data, error } = await db.from("faqs").select("*").eq("category", category).order("sort_order", { ascending: true });
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return [];
      }
    } else {
      return (data || []).map(fromDbFaq);
    }
  }
  const all = await getAllFaqs();
  return all.filter((f) => f.category === category);
}

export async function searchFaqs(query: string): Promise<FaqArticle[]> {
  const q = query.toLowerCase();
  const all = await getAllFaqs();
  return all.filter(
    (f) =>
      f.question.toLowerCase().includes(q) ||
      f.answer.toLowerCase().includes(q) ||
      f.tags.some((t) => t.toLowerCase().includes(q))
  );
}

export async function matchFaqsToTicket(message: string): Promise<FaqArticle[]> {
  const words = message.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
  const all = await getAllFaqs();
  const scored = all.map((faq) => {
    const text = `${faq.question} ${faq.answer} ${faq.tags.join(" ")}`.toLowerCase();
    let score = 0;
    for (const word of words) {
      if (text.includes(word)) score++;
    }
    return { faq, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((s) => s.faq);
}

export async function getFaqCount(): Promise<number> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { count, error } = await db.from("faqs").select("*", { count: "exact", head: true });
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
  return memFaqs.size;
}

// === SOP CRUD ===

export async function createSop(params: {
  title: string;
  category: string;
  steps: string[];
  triggers?: string[];
}): Promise<Sop> {
  const id = generateSopId();
  const now = new Date().toISOString();
  const sop: Sop = {
    id,
    title: params.title,
    category: params.category,
    steps: params.steps,
    triggers: params.triggers,
    createdAt: now,
    updatedAt: now,
  };

  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { error } = await db.from("sops").insert(toDbSop(sop));
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        memSops.set(id, sop);
      } else {
        throw new Error(`Failed to create SOP: ${error.message}`);
      }
    }
  } else {
    memSops.set(id, sop);
  }

  return sop;
}

export async function getSop(id: string): Promise<Sop | undefined> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { data, error } = await db.from("sops").select("*").eq("id", id).single();
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return undefined;
      }
    } else if (data) {
      return fromDbSop(data);
    } else {
      return undefined;
    }
  }
  return memSops.get(id);
}

export async function updateSop(id: string, updates: Partial<Sop>): Promise<Sop | undefined> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const existing = await getSop(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };
    const { error } = await db.from("sops").update(toDbSop(updated)).eq("id", id);
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
  const sop = memSops.get(id);
  if (!sop) return undefined;
  const updated = { ...sop, ...updates, updatedAt: new Date().toISOString() };
  memSops.set(id, updated);
  return updated;
}

export async function deleteSop(id: string): Promise<boolean> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { error } = await db.from("sops").delete().eq("id", id);
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
  return memSops.delete(id);
}

export async function getAllSops(): Promise<Sop[]> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { data, error } = await db.from("sops").select("*").order("title", { ascending: true });
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return [];
      }
    } else {
      return (data || []).map(fromDbSop);
    }
  }
  return Array.from(memSops.values()).sort((a, b) => a.title.localeCompare(b.title));
}

export async function getSopsByCategory(category: string): Promise<Sop[]> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { data, error } = await db.from("sops").select("*").eq("category", category).order("title", { ascending: true });
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return [];
      }
    } else {
      return (data || []).map(fromDbSop);
    }
  }
  const all = await getAllSops();
  return all.filter((s) => s.category === category);
}

export async function matchSopsToTicket(message: string): Promise<Sop[]> {
  const q = message.toLowerCase();
  const all = await getAllSops();
  return all.filter((sop) => {
    if (sop.triggers?.some((t) => q.includes(t.toLowerCase()))) return true;
    if (sop.title.toLowerCase().split(/\s+/).some((w) => q.includes(w) && w.length > 3)) return true;
    return false;
  });
}

export async function getSopCount(): Promise<number> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { count, error } = await db.from("sops").select("*", { count: "exact", head: true });
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
  return memSops.size;
}
