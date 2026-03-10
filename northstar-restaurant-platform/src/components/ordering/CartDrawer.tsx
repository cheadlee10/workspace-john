"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

interface CartDrawerProps {
  accentColor?: string;
  restaurantName: string;
}

export function CartDrawer({ accentColor = "#D4A574", restaurantName }: CartDrawerProps) {
  const {
    state,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart,
    setOrderType,
    subtotal,
    tax,
    total,
    itemCount,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") toggleCart(false);
    };
    if (state.isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [state.isOpen, toggleCart]);

  // Focus trap
  useEffect(() => {
    if (state.isOpen && drawerRef.current) {
      drawerRef.current.focus();
    }
  }, [state.isOpen]);

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => toggleCart(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            role="dialog"
            aria-label="Shopping cart"
            aria-modal="true"
            tabIndex={-1}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Your Order</h2>
                <p className="text-sm text-gray-500">
                  {itemCount} {itemCount === 1 ? "item" : "items"} from {restaurantName}
                </p>
              </div>
              <button
                onClick={() => toggleCart(false)}
                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                aria-label="Close cart"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Order Type Selection */}
            <div className="border-b border-gray-100 px-6 py-3">
              <div className="flex gap-2">
                {(["pickup", "delivery", "dine-in"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    className={`flex-1 rounded-lg px-3 py-3 text-sm font-medium transition-all ${
                      state.orderType === type
                        ? "text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    style={state.orderType === type ? { backgroundColor: accentColor } : undefined}
                  >
                    {type === "pickup" && "Pickup"}
                    {type === "delivery" && "Delivery"}
                    {type === "dine-in" && "Dine In"}
                  </button>
                ))}
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <svg className="mb-4 h-16 w-16 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                    />
                  </svg>
                  <p className="text-lg font-medium text-gray-400">Your cart is empty</p>
                  <p className="mt-1 text-sm text-gray-400">Add some delicious items from the menu</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {state.items.map((cartItem) => (
                    <div
                      key={cartItem.menuItem.id}
                      className="flex gap-3 rounded-xl border border-gray-100 bg-gray-50/50 p-3"
                    >
                      {/* Item Image */}
                      {cartItem.menuItem.image && (
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={cartItem.menuItem.image}
                            alt={cartItem.menuItem.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                      )}

                      {/* Item Details */}
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-semibold text-gray-900">
                          {cartItem.menuItem.name}
                        </h4>
                        <p className="text-sm font-medium" style={{ color: accentColor }}>
                          {formatPrice(cartItem.subtotal)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex items-center rounded-lg border border-gray-200 bg-white">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  cartItem.menuItem.id,
                                  cartItem.quantity - 1
                                )
                              }
                              className="px-3 py-2 text-sm text-gray-500 transition-colors hover:text-gray-700"
                              aria-label="Decrease quantity"
                            >
                              -
                            </button>
                            <span className="min-w-[1.5rem] text-center text-sm font-medium">
                              {cartItem.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  cartItem.menuItem.id,
                                  cartItem.quantity + 1
                                )
                              }
                              className="px-3 py-2 text-sm text-gray-500 transition-colors hover:text-gray-700"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(cartItem.menuItem.id)}
                            className="text-xs text-gray-400 transition-colors hover:text-red-500"
                            aria-label={`Remove ${cartItem.menuItem.name}`}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Clear Cart */}
                  <button
                    onClick={clearCart}
                    className="text-xs text-gray-400 transition-colors hover:text-red-500"
                  >
                    Clear all items
                  </button>
                </div>
              )}
            </div>

            {/* Footer - Totals & Checkout */}
            {state.items.length > 0 && (
              <div className="border-t border-gray-100 px-6 py-4">
                <div className="mb-4 space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-bold text-gray-900">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={() => toggleCart(false)}
                  className="block w-full rounded-xl py-3.5 text-center text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-[0.98]"
                  style={{ backgroundColor: accentColor }}
                >
                  Proceed to Checkout - {formatPrice(total)}
                </Link>

                <p className="mt-3 text-center text-xs text-gray-400">
                  Secure checkout powered by Square
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Floating Cart Button - shows on mobile when cart has items
 */
export function FloatingCartButton({ accentColor = "#D4A574" }: { accentColor?: string }) {
  const { toggleCart, itemCount, total } = useCart();

  if (itemCount === 0) return null;

  return (
    <motion.button
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      onClick={() => toggleCart(true)}
      className="fixed bottom-20 left-4 right-4 z-40 flex items-center justify-between rounded-2xl px-6 py-4 text-white shadow-2xl md:bottom-6 md:left-auto md:right-6 md:w-auto md:min-w-[280px]"
      style={{ backgroundColor: accentColor }}
      aria-label={`View cart with ${itemCount} items`}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
          {itemCount}
        </span>
        <span className="font-semibold">View Order</span>
      </div>
      <span className="font-bold">{formatPrice(total)}</span>
    </motion.button>
  );
}
