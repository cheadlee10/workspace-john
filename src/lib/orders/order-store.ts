/**
 * Order store with Supabase persistence and in-memory fallback
 *
 * When NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set,
 * orders are stored in the Supabase `orders` table. Otherwise, orders
 * persist in memory for the life of the server process.
 */

import type { Order, OrderStatus, CartItem, CustomerInfo } from "@/types/restaurant";
import { getSupabase, isDbEnabled, isTableNotFoundError, markSchemaUnavailable } from "@/lib/db/supabase";

// ---------------------------------------------------------------------------
// In-memory fallback store
// ---------------------------------------------------------------------------
const orders = new Map<string, Order>();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function generateOrderId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

/** Map a snake_case DB row to a camelCase Order object. */
function rowToOrder(row: Record<string, unknown>): Order {
  return {
    id: row.id as string,
    restaurantId: row.restaurant_id as string,
    items: row.items as CartItem[],
    subtotal: Number(row.subtotal),
    tax: Number(row.tax),
    tip: Number(row.tip),
    total: Number(row.total),
    type: row.type as Order["type"],
    scheduledTime: (row.scheduled_time as string) ?? undefined,
    customer: row.customer as CustomerInfo,
    status: row.status as OrderStatus,
    paymentMethod: row.payment_method as string,
    paymentId: (row.payment_id as string) ?? undefined,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

/** Map a camelCase Order to a snake_case DB row for inserts/updates. */
function orderToRow(order: Order): Record<string, unknown> {
  return {
    id: order.id,
    restaurant_id: order.restaurantId,
    items: order.items,
    subtotal: order.subtotal,
    tax: order.tax,
    tip: order.tip,
    total: order.total,
    type: order.type,
    scheduled_time: order.scheduledTime ?? null,
    customer: order.customer,
    status: order.status,
    payment_method: order.paymentMethod,
    payment_id: order.paymentId ?? null,
    created_at: order.createdAt,
    updated_at: order.updatedAt,
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function createOrder(params: {
  restaurantId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  type: "pickup" | "delivery" | "dine-in";
  scheduledTime?: string;
  customer: CustomerInfo;
  paymentMethod: "square" | "stripe" | "demo";
  paymentId?: string;
}): Promise<Order> {
  const id = generateOrderId();
  const now = new Date().toISOString();

  const order: Order = {
    id,
    restaurantId: params.restaurantId,
    items: params.items,
    subtotal: params.subtotal,
    tax: params.tax,
    tip: params.tip,
    total: params.total,
    type: params.type,
    scheduledTime: params.scheduledTime,
    customer: params.customer,
    status: "pending",
    paymentMethod: params.paymentMethod,
    paymentId: params.paymentId,
    createdAt: now,
    updatedAt: now,
  };

  if (isDbEnabled()) {
    const supabase = getSupabase()!;
    const { error } = await supabase.from("orders").insert(orderToRow(order));
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        orders.set(id, order);
        return order;
      } else {
        throw new Error(`Failed to create order: ${error.message}`);
      }
    }
    return order;
  } else {
    orders.set(id, order);
    return order;
  }
}

export async function getOrder(id: string): Promise<Order | undefined> {
  if (isDbEnabled()) {
    const supabase = getSupabase()!;
    const { data, error } = await supabase
      .from("orders")
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
      return rowToOrder(data);
    } else {
      return undefined;
    }
  }
  return orders.get(id);
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<Order | undefined> {
  if (isDbEnabled()) {
    const supabase = getSupabase()!;
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("orders")
      .update({ status, updated_at: now })
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
      return rowToOrder(data);
    } else {
      return undefined;
    }
  }
  const order = orders.get(id);
  if (!order) return undefined;

  order.status = status;
  order.updatedAt = new Date().toISOString();
  orders.set(id, order);
  return order;
}

export async function updateOrderPayment(
  id: string,
  paymentId: string
): Promise<Order | undefined> {
  if (isDbEnabled()) {
    const supabase = getSupabase()!;
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("orders")
      .update({ payment_id: paymentId, status: "confirmed", updated_at: now })
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
      return rowToOrder(data);
    } else {
      return undefined;
    }
  }
  const order = orders.get(id);
  if (!order) return undefined;

  order.paymentId = paymentId;
  order.status = "confirmed";
  order.updatedAt = new Date().toISOString();
  orders.set(id, order);
  return order;
}

export async function getOrdersByRestaurant(restaurantId: string): Promise<Order[]> {
  if (isDbEnabled()) {
    const supabase = getSupabase()!;
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("restaurant_id", restaurantId)
      .order("created_at", { ascending: false });
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return [];
      }
    } else {
      return (data || []).map(rowToOrder);
    }
  }
  return Array.from(orders.values())
    .filter((o) => o.restaurantId === restaurantId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getActiveOrders(restaurantId: string): Promise<Order[]> {
  const activeStatuses: OrderStatus[] = [
    "pending",
    "confirmed",
    "preparing",
    "ready",
    "out-for-delivery",
  ];

  if (isDbEnabled()) {
    const supabase = getSupabase()!;
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("restaurant_id", restaurantId)
      .in("status", activeStatuses)
      .order("created_at", { ascending: false });
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return [];
      }
    } else {
      return (data || []).map(rowToOrder);
    }
  }
  const allOrders = await getOrdersByRestaurant(restaurantId);
  return allOrders.filter((o) => activeStatuses.includes(o.status));
}

export async function getOrderStats(restaurantId: string): Promise<{
  ordersToday: number;
  revenueToday: number;
  avgOrderValue: number;
  activeOrders: number;
}> {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  if (isDbEnabled()) {
    const supabase = getSupabase()!;
    const todayISO = todayStart.toISOString();

    // Fetch today's non-cancelled orders
    const { data: todayData, error: todayError } = await supabase
      .from("orders")
      .select("total")
      .eq("restaurant_id", restaurantId)
      .gte("created_at", todayISO)
      .neq("status", "cancelled");

    if (todayError && isTableNotFoundError(todayError)) {
      markSchemaUnavailable();
      // Fall through to in-memory
    } else {
      // Fetch active orders count
      const { count: activeCount, error: activeError } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("restaurant_id", restaurantId)
        .in("status", ["pending", "confirmed", "preparing", "ready", "out-for-delivery"]);

      if (activeError && isTableNotFoundError(activeError)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        const todayOrders = todayError || !todayData ? [] : todayData;
        const revenue = todayOrders.reduce((sum, o) => sum + Number(o.total), 0);

        return {
          ordersToday: todayOrders.length,
          revenueToday: revenue,
          avgOrderValue: todayOrders.length > 0 ? revenue / todayOrders.length : 0,
          activeOrders: activeError ? 0 : (activeCount ?? 0),
        };
      }
    }
  }

  const allOrders = await getOrdersByRestaurant(restaurantId);
  const todayOrders = allOrders.filter(
    (o) => new Date(o.createdAt) >= todayStart && o.status !== "cancelled"
  );

  const revenue = todayOrders.reduce((sum, o) => sum + o.total, 0);
  const active = allOrders.filter((o) =>
    ["pending", "confirmed", "preparing", "ready", "out-for-delivery"].includes(o.status)
  );

  return {
    ordersToday: todayOrders.length,
    revenueToday: revenue,
    avgOrderValue: todayOrders.length > 0 ? revenue / todayOrders.length : 0,
    activeOrders: active.length,
  };
}
