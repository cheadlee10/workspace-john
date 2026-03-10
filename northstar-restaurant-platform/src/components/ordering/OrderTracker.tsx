"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Order, OrderStatus } from "@/types/restaurant";
import { formatPrice } from "@/lib/utils";

interface OrderTrackerProps {
  orderId: string;
  accentColor?: string;
}

const STATUS_STEPS: { status: OrderStatus; label: string; icon: string }[] = [
  { status: "confirmed", label: "Confirmed", icon: "M5 13l4 4L19 7" },
  { status: "preparing", label: "Preparing", icon: "M12 6v6l4 2" },
  { status: "ready", label: "Ready", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
  { status: "completed", label: "Complete", icon: "M5 13l4 4L19 7" },
];

const DELIVERY_STEPS: { status: OrderStatus; label: string; icon: string }[] = [
  { status: "confirmed", label: "Confirmed", icon: "M5 13l4 4L19 7" },
  { status: "preparing", label: "Preparing", icon: "M12 6v6l4 2" },
  { status: "ready", label: "Ready", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
  { status: "out-for-delivery", label: "On the Way", icon: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" },
  { status: "completed", label: "Delivered", icon: "M5 13l4 4L19 7" },
];

function getStatusIndex(status: OrderStatus, steps: typeof STATUS_STEPS): number {
  const idx = steps.findIndex((s) => s.status === status);
  return idx >= 0 ? idx : -1;
}

export function OrderTracker({ orderId, accentColor = "#D4A574" }: OrderTrackerProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Poll for updates every 10 seconds
  useEffect(() => {
    let active = true;

    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        if (!res.ok) {
          setError("Order not found");
          setLoading(false);
          return;
        }
        const data = await res.json();
        if (active) {
          setOrder(data.order);
          setLoading(false);
        }
      } catch {
        if (active) {
          setError("Failed to load order");
          setLoading(false);
        }
      }
    }

    fetchOrder();
    const interval = setInterval(() => {
      // Stop polling for terminal states
      if (order?.status === "completed" || order?.status === "cancelled") return;
      fetchOrder();
    }, 10000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [orderId, order?.status]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <svg className="h-8 w-8 animate-spin text-gray-300" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg font-medium text-gray-400">{error || "Order not found"}</p>
      </div>
    );
  }

  const steps = order.type === "delivery" ? DELIVERY_STEPS : STATUS_STEPS;
  const currentStepIndex = getStatusIndex(order.status, steps);
  const isCancelled = order.status === "cancelled";

  return (
    <div className="mx-auto max-w-lg">
      {/* Order header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
        aria-live="polite"
        aria-atomic="true"
      >
        {isCancelled ? (
          <>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
              <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Order Cancelled</h2>
          </>
        ) : order.status === "completed" ? (
          <>
            <div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
              style={{ backgroundColor: `${accentColor}15` }}
            >
              <svg className="h-8 w-8" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Order Complete!</h2>
            <p className="mt-1 text-sm text-gray-500">Thank you, {order.customer.name}!</p>
          </>
        ) : (
          <>
            <div
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
              style={{ backgroundColor: `${accentColor}15` }}
            >
              <svg className="h-8 w-8 animate-pulse" fill="none" stroke={accentColor} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {steps[currentStepIndex]?.label || "Processing"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">Order #{order.id}</p>
          </>
        )}
      </motion.div>

      {/* Progress steps */}
      {!isCancelled && (
        <div className="mb-8 px-4">
          <div className="flex items-center justify-between">
            {steps.map((step, i) => {
              const isComplete = i <= currentStepIndex;
              const isCurrent = i === currentStepIndex;

              return (
                <div key={step.status} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isCurrent ? 1.1 : 1,
                        backgroundColor: isComplete ? accentColor : "#e5e7eb",
                      }}
                      className="flex h-10 w-10 items-center justify-center rounded-full"
                    >
                      <svg
                        className={`h-5 w-5 ${isComplete ? "text-white" : "text-gray-400"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} />
                      </svg>
                    </motion.div>
                    <span
                      className={`mt-2 text-xs font-medium ${
                        isComplete ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="mx-1 mt-[-20px] h-0.5 flex-1">
                      <motion.div
                        initial={false}
                        animate={{
                          backgroundColor: i < currentStepIndex ? accentColor : "#e5e7eb",
                        }}
                        className="h-full rounded-full"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Order details */}
      <div className="rounded-xl border border-gray-100 bg-white p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
          Order Details
        </h3>

        <div className="mb-4 space-y-2">
          {order.items.map((item) => (
            <div key={item.menuItem.id} className="flex justify-between text-sm">
              <span className="text-gray-700">
                {item.quantity}x {item.menuItem.name}
              </span>
              <span className="text-gray-500">{formatPrice(item.subtotal)}</span>
            </div>
          ))}
        </div>

        <div className="space-y-1 border-t border-gray-100 pt-3">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Tax</span>
            <span>{formatPrice(order.tax)}</span>
          </div>
          {order.tip > 0 && (
            <div className="flex justify-between text-sm text-gray-500">
              <span>Tip</span>
              <span>{formatPrice(order.tip)}</span>
            </div>
          )}
          <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-bold text-gray-900">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-gray-50 p-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Order Type</span>
            <span className="font-medium capitalize text-gray-700">{order.type}</span>
          </div>
          {order.scheduledTime && (
            <div className="mt-1 flex justify-between text-sm">
              <span className="text-gray-500">Scheduled</span>
              <span className="font-medium text-gray-700">{order.scheduledTime}</span>
            </div>
          )}
          <div className="mt-1 flex justify-between text-sm">
            <span className="text-gray-500">Payment</span>
            <span className="font-medium capitalize text-gray-700">{order.paymentMethod}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
