"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Order, OrderStatus } from "@/types/restaurant";
import { formatPrice } from "@/lib/utils";

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string }> = {
  pending: { label: "Pending", color: "text-amber-700", bg: "bg-amber-50" },
  confirmed: { label: "Confirmed", color: "text-blue-700", bg: "bg-blue-50" },
  preparing: { label: "Preparing", color: "text-purple-700", bg: "bg-purple-50" },
  ready: { label: "Ready", color: "text-emerald-700", bg: "bg-emerald-50" },
  "out-for-delivery": { label: "Out for Delivery", color: "text-indigo-700", bg: "bg-indigo-50" },
  completed: { label: "Completed", color: "text-gray-500", bg: "bg-gray-50" },
  cancelled: { label: "Cancelled", color: "text-red-700", bg: "bg-red-50" },
};

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  pending: "confirmed",
  confirmed: "preparing",
  preparing: "ready",
  ready: "completed",
  "out-for-delivery": "completed",
};

const NEXT_STATUS_DELIVERY: Partial<Record<OrderStatus, OrderStatus>> = {
  pending: "confirmed",
  confirmed: "preparing",
  preparing: "ready",
  ready: "out-for-delivery",
  "out-for-delivery": "completed",
};

interface SiteSummary {
  id: string;
  name: string;
}

export default function OrderManagementPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({ ordersToday: 0, revenueToday: 0, avgOrderValue: 0, activeOrders: 0 });
  const [filter, setFilter] = useState<"active" | "all" | "completed">("active");
  const [loading, setLoading] = useState(true);
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);
  const [restaurants, setRestaurants] = useState<SiteSummary[]>([]);
  const [restaurantId, setRestaurantId] = useState<string>("");
  const [restaurantName, setRestaurantName] = useState("Loading...");

  // Fetch available restaurants on mount
  useEffect(() => {
    fetch("/api/sites")
      .then((r) => r.json())
      .then((data) => {
        const sites: SiteSummary[] = (data.sites || []).map((s: { id: string; name: string }) => ({ id: s.id, name: s.name }));
        if (sites.length > 0) {
          setRestaurants(sites);
          setRestaurantId(sites[0].id);
          setRestaurantName(sites[0].name);
        } else {
          // Fallback if no restaurants in store
          setRestaurantId("demo-sakura-kitchen");
          setRestaurantName("Sakura Kitchen");
        }
      })
      .catch(() => {
        setRestaurantId("demo-sakura-kitchen");
        setRestaurantName("Sakura Kitchen");
      });
  }, []);

  const fetchOrders = useCallback(async () => {
    if (!restaurantId) return;
    try {
      const [ordersRes, statsRes] = await Promise.all([
        fetch(`/api/orders?restaurantId=${encodeURIComponent(restaurantId)}`),
        fetch(`/api/orders?restaurantId=${encodeURIComponent(restaurantId)}&stats=true`),
      ]);
      const ordersData = await ordersRes.json();
      const statsData = await statsRes.json();
      setOrders(ordersData.orders || []);
      setStats(statsData);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  }, [restaurantId]);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const updateStatus = async (orderId: string, status: OrderStatus) => {
    setUpdatingOrder(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        const data = await res.json();
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? data.order : o))
        );
      }
    } catch (err) {
      console.error("Failed to update order:", err);
    } finally {
      setUpdatingOrder(null);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "active") {
      return !["completed", "cancelled"].includes(order.status);
    }
    if (filter === "completed") {
      return ["completed", "cancelled"].includes(order.status);
    }
    return true;
  });

  const activeCount = orders.filter(
    (o) => !["completed", "cancelled"].includes(o.status)
  ).length;

  function timeSince(dateStr: string): string {
    const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m ago`;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <div className="animate-pulse">
              <div className="h-6 w-44 rounded bg-gray-200" />
              <div className="mt-2 h-4 w-28 rounded bg-gray-100" />
            </div>
            <div className="h-8 w-24 animate-pulse rounded-lg bg-gray-200" />
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-6 py-6 animate-pulse">
          {/* Stat cards */}
          <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="h-3 w-20 rounded bg-gray-200" />
                <div className="mt-3 h-7 w-16 rounded bg-gray-200" />
              </div>
            ))}
          </div>
          {/* Filter buttons */}
          <div className="mb-4 flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-9 w-24 rounded-lg bg-gray-200" />
            ))}
          </div>
          {/* Order card placeholders */}
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-16 rounded bg-gray-200" />
                    <div className="h-5 w-20 rounded-full bg-gray-100" />
                    <div className="h-5 w-16 rounded-full bg-gray-100" />
                  </div>
                  <div className="h-6 w-14 rounded bg-gray-200" />
                </div>
                <div className="mt-3 flex gap-4">
                  <div className="h-4 w-28 rounded bg-gray-100" />
                  <div className="h-4 w-24 rounded bg-gray-100" />
                </div>
                <div className="mt-3 flex gap-2">
                  <div className="h-6 w-24 rounded-lg bg-gray-100" />
                  <div className="h-6 w-20 rounded-lg bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Order Management</h1>
            {restaurants.length > 1 ? (
              <select
                value={restaurantId}
                onChange={(e) => {
                  const selected = restaurants.find((r) => r.id === e.target.value);
                  if (selected) {
                    setRestaurantId(selected.id);
                    setRestaurantName(selected.name);
                    setLoading(true);
                  }
                }}
                className="mt-1 rounded-md border border-gray-200 bg-white px-2 py-1 text-sm text-gray-600"
              >
                {restaurants.map((r) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            ) : (
              <p className="text-sm text-gray-500">{restaurantName}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {activeCount > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
                {activeCount} active
              </span>
            )}
            <a
              href="/admin/dashboard"
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Dashboard
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-6">
        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs text-gray-500">Orders Today</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{stats.ordersToday}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs text-gray-500">Revenue Today</p>
            <p className="mt-1 text-2xl font-bold text-emerald-600">{formatPrice(stats.revenueToday)}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs text-gray-500">Avg Order Value</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{formatPrice(stats.avgOrderValue)}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <p className="text-xs text-gray-500">Active Orders</p>
            <p className="mt-1 text-2xl font-bold text-amber-600">{stats.activeOrders}</p>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-4 flex gap-2">
          {(["active", "all", "completed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                filter === f
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {f === "active" ? `Active (${activeCount})` : f === "completed" ? "Completed" : "All"}
            </button>
          ))}
        </div>

        {/* Orders list */}
        {filteredOrders.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white py-16 text-center">
            <svg className="mx-auto mb-4 h-12 w-12 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-400">No {filter === "active" ? "active " : filter === "completed" ? "completed " : ""}orders</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filteredOrders.map((order) => {
                const config = STATUS_CONFIG[order.status];
                const nextStatusMap = order.type === "delivery" ? NEXT_STATUS_DELIVERY : NEXT_STATUS;
                const nextStatus = nextStatusMap[order.status];

                return (
                  <motion.div
                    key={order.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="rounded-xl border border-gray-200 bg-white p-5"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-lg font-bold text-gray-900">
                          #{order.id}
                        </span>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color} ${config.bg}`}>
                          {config.label}
                        </span>
                        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium capitalize text-gray-500">
                          {order.type}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold text-gray-900">
                          {formatPrice(order.total)}
                        </span>
                        <p className="text-xs text-gray-400">{timeSince(order.createdAt)}</p>
                      </div>
                    </div>

                    {/* Customer */}
                    <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                      <span className="font-medium">{order.customer.name}</span>
                      <a href={`tel:${order.customer.phone}`} className="text-gray-400 hover:text-gray-600">
                        {order.customer.phone}
                      </a>
                      {order.scheduledTime && (
                        <span className="rounded bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                          Scheduled: {order.scheduledTime}
                        </span>
                      )}
                    </div>

                    {/* Items */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {order.items.map((item) => (
                        <span
                          key={item.menuItem.id}
                          className="rounded-lg bg-gray-50 px-2.5 py-1 text-xs text-gray-600"
                        >
                          {item.quantity}x {item.menuItem.name}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    {nextStatus && (
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={() => updateStatus(order.id, nextStatus)}
                          disabled={updatingOrder === order.id}
                          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800 disabled:opacity-50"
                        >
                          {updatingOrder === order.id
                            ? "Updating..."
                            : `Mark as ${STATUS_CONFIG[nextStatus].label}`}
                        </button>
                        {order.status === "pending" && (
                          <button
                            onClick={() => updateStatus(order.id, "cancelled")}
                            disabled={updatingOrder === order.id}
                            className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition-all hover:bg-red-50 disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
