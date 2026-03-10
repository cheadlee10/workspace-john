/**
 * Client Portfolio Store
 *
 * Tracks active clients, their websites, subscriptions, and hosting health.
 * Uses Supabase when configured, otherwise falls back to an in-memory Map.
 */

import type { Client } from "@/types/business";
import { logActivity } from "@/lib/activity/activity-store";
import { getSupabase, isDbEnabled, isTableNotFoundError, markSchemaUnavailable } from "@/lib/db/supabase";

// ---------------------------------------------------------------------------
// In-memory fallback
// ---------------------------------------------------------------------------

const clients = new Map<string, Client>();

function generateId(): string {
  return "cli-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

// ---------------------------------------------------------------------------
// Snake_case <-> camelCase mapping helpers
// ---------------------------------------------------------------------------

interface DbClient {
  id: string;
  lead_id: string | null;
  restaurant_name: string;
  contact_name: string;
  email: string;
  phone: string;
  plan: string;
  status: string;
  domain: string | null;
  deploy_url: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  monthly_revenue: number;
  hosting_health: string;
  last_deploy_at: string | null;
  ssl_expiry: string | null;
  notes: string[];
  onboarded_at: string;
  created_at: string;
  updated_at: string;
}

function toDbClient(client: Client): DbClient {
  return {
    id: client.id,
    lead_id: client.leadId ?? null,
    restaurant_name: client.restaurantName,
    contact_name: client.contactName,
    email: client.email,
    phone: client.phone,
    plan: client.plan,
    status: client.status,
    domain: client.domain ?? null,
    deploy_url: client.deployUrl,
    stripe_customer_id: client.stripeCustomerId ?? null,
    stripe_subscription_id: client.stripeSubscriptionId ?? null,
    monthly_revenue: client.monthlyRevenue,
    hosting_health: client.hostingHealth,
    last_deploy_at: client.lastDeployAt ?? null,
    ssl_expiry: client.sslExpiry ?? null,
    notes: client.notes,
    onboarded_at: client.onboardedAt,
    created_at: client.createdAt,
    updated_at: client.updatedAt,
  };
}

function fromDbClient(row: DbClient): Client {
  return {
    id: row.id,
    leadId: row.lead_id ?? undefined,
    restaurantName: row.restaurant_name,
    contactName: row.contact_name,
    email: row.email,
    phone: row.phone,
    plan: row.plan as Client["plan"],
    status: row.status as Client["status"],
    domain: row.domain ?? undefined,
    deployUrl: row.deploy_url,
    stripeCustomerId: row.stripe_customer_id ?? undefined,
    stripeSubscriptionId: row.stripe_subscription_id ?? undefined,
    monthlyRevenue: Number(row.monthly_revenue),
    hostingHealth: row.hosting_health as Client["hostingHealth"],
    lastDeployAt: row.last_deploy_at ?? undefined,
    sslExpiry: row.ssl_expiry ?? undefined,
    notes: row.notes ?? [],
    onboardedAt: row.onboarded_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// ---------------------------------------------------------------------------
// Exported store functions
// ---------------------------------------------------------------------------

export async function createClient(params: {
  leadId?: string;
  restaurantName: string;
  contactName: string;
  email: string;
  phone: string;
  plan: Client["plan"];
  domain?: string;
  deployUrl: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  monthlyRevenue: number;
}): Promise<Client> {
  const id = generateId();
  const now = new Date().toISOString();
  const client: Client = {
    id,
    leadId: params.leadId,
    restaurantName: params.restaurantName,
    contactName: params.contactName,
    email: params.email,
    phone: params.phone,
    plan: params.plan,
    status: "active",
    domain: params.domain,
    deployUrl: params.deployUrl,
    stripeCustomerId: params.stripeCustomerId,
    stripeSubscriptionId: params.stripeSubscriptionId,
    monthlyRevenue: params.monthlyRevenue,
    hostingHealth: "healthy",
    lastDeployAt: now,
    notes: [],
    onboardedAt: now,
    createdAt: now,
    updatedAt: now,
  };

  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { error } = await sb.from("clients").insert(toDbClient(client));
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        clients.set(id, client);
      } else {
        throw new Error(`Failed to create client: ${error.message}`);
      }
    }
  } else {
    clients.set(id, client);
  }

  logActivity({
    type: "client",
    action: "onboarded",
    description: `New client: ${params.restaurantName} on ${params.plan} plan`,
    entityId: id,
    entityName: params.restaurantName,
  });

  return client;
}

export async function getClient(id: string): Promise<Client | undefined> {
  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { data, error } = await sb
      .from("clients")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return undefined;
      }
    } else if (data) {
      return fromDbClient(data as DbClient);
    } else {
      return undefined;
    }
  }

  return clients.get(id);
}

export async function updateClient(
  id: string,
  updates: Partial<Client>,
): Promise<Client | undefined> {
  if (isDbEnabled()) {
    const sb = getSupabase()!;

    // Build a snake_case partial from the camelCase updates
    const dbUpdates: Record<string, unknown> = {};
    const fieldMap: Record<string, string> = {
      leadId: "lead_id",
      restaurantName: "restaurant_name",
      contactName: "contact_name",
      email: "email",
      phone: "phone",
      plan: "plan",
      status: "status",
      domain: "domain",
      deployUrl: "deploy_url",
      stripeCustomerId: "stripe_customer_id",
      stripeSubscriptionId: "stripe_subscription_id",
      monthlyRevenue: "monthly_revenue",
      hostingHealth: "hosting_health",
      lastDeployAt: "last_deploy_at",
      sslExpiry: "ssl_expiry",
      notes: "notes",
      onboardedAt: "onboarded_at",
    };

    for (const [camel, snake] of Object.entries(fieldMap)) {
      if (camel in updates) {
        dbUpdates[snake] = (updates as Record<string, unknown>)[camel];
      }
    }
    dbUpdates.updated_at = new Date().toISOString();

    const { data, error } = await sb
      .from("clients")
      .update(dbUpdates)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return undefined;
      }
    } else if (data) {
      return fromDbClient(data as DbClient);
    } else {
      return undefined;
    }
  }

  const client = clients.get(id);
  if (!client) return undefined;

  const updated = { ...client, ...updates, updatedAt: new Date().toISOString() };
  clients.set(id, updated);
  return updated;
}

export async function getAllClients(): Promise<Client[]> {
  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { data, error } = await sb
      .from("clients")
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
      return (data as DbClient[])?.map(fromDbClient) ?? [];
    }
  }

  return Array.from(clients.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function getClientsByStatus(
  status: Client["status"],
): Promise<Client[]> {
  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { data, error } = await sb
      .from("clients")
      .select("*")
      .eq("status", status)
      .order("created_at", { ascending: false });
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return [];
      }
    } else {
      return (data as DbClient[])?.map(fromDbClient) ?? [];
    }
  }

  return (await getAllClients()).filter((c) => c.status === status);
}

export async function getClientsByPlan(
  plan: Client["plan"],
): Promise<Client[]> {
  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { data, error } = await sb
      .from("clients")
      .select("*")
      .eq("plan", plan)
      .order("created_at", { ascending: false });
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return [];
      }
    } else {
      return (data as DbClient[])?.map(fromDbClient) ?? [];
    }
  }

  return (await getAllClients()).filter((c) => c.plan === plan);
}

export async function getPortfolioStats(): Promise<{
  total: number;
  active: number;
  trial: number;
  pastDue: number;
  cancelled: number;
  mrr: number;
  healthSummary: { healthy: number; degraded: number; down: number };
  byPlan: { starter: number; growth: number; pro: number };
}> {
  const all = await getAllClients();
  const stats = {
    total: all.length,
    active: 0,
    trial: 0,
    pastDue: 0,
    cancelled: 0,
    mrr: 0,
    healthSummary: { healthy: 0, degraded: 0, down: 0 },
    byPlan: { starter: 0, growth: 0, pro: 0 },
  };

  for (const client of all) {
    if (client.status === "active") stats.active++;
    else if (client.status === "trial") stats.trial++;
    else if (client.status === "past_due") stats.pastDue++;
    else if (client.status === "cancelled") stats.cancelled++;

    if (client.status === "active" || client.status === "trial") {
      stats.mrr += client.monthlyRevenue;
    }

    stats.healthSummary[client.hostingHealth]++;
    stats.byPlan[client.plan]++;
  }

  return stats;
}

export async function getClientByEmail(
  email: string,
): Promise<Client | undefined> {
  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { data, error } = await sb
      .from("clients")
      .select("*")
      .eq("email", email)
      .limit(1)
      .maybeSingle();
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return undefined;
      }
    } else if (data) {
      return fromDbClient(data as DbClient);
    } else {
      return undefined;
    }
  }

  for (const client of clients.values()) {
    if (client.email === email) return client;
  }
  return undefined;
}

export async function getClientByStripeCustomerId(
  stripeCustomerId: string,
): Promise<Client | undefined> {
  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { data, error } = await sb
      .from("clients")
      .select("*")
      .eq("stripe_customer_id", stripeCustomerId)
      .limit(1)
      .maybeSingle();
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return undefined;
      }
    } else if (data) {
      return fromDbClient(data as DbClient);
    } else {
      return undefined;
    }
  }

  for (const client of clients.values()) {
    if (client.stripeCustomerId === stripeCustomerId) return client;
  }
  return undefined;
}

export async function getClientCount(): Promise<number> {
  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { count, error } = await sb
      .from("clients")
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

  return clients.size;
}
