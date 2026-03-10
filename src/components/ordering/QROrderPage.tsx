"use client";

import { useEffect } from "react";
import type { Restaurant } from "@/types/restaurant";
import { ConnectedMenuDisplay } from "@/components/menu/ConnectedMenuDisplay";
import { CartDrawer, FloatingCartButton } from "./CartDrawer";
import { useCart } from "@/lib/cart-context";

interface QROrderPageProps {
  restaurant: Restaurant;
  tableNumber?: string;
}

/**
 * QR Code Ordering Page
 *
 * When a diner scans a QR code on their table, they land here.
 * Optimized for mobile-first ordering experience.
 * No app download needed - just scan and order.
 */
export function QROrderPage({ restaurant, tableNumber }: QROrderPageProps) {
  const { setOrderType } = useCart();
  const accentColor = restaurant.branding.accentColor;

  // Auto-set order type to dine-in for QR orders
  useEffect(() => {
    setOrderType("dine-in");
  }, [setOrderType]);

  return (
    <div className="min-h-screen bg-white">
      {/* Compact Header */}
      <header className="sticky top-0 z-10 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <h1 className="text-lg font-bold" style={{ color: restaurant.branding.primaryColor }}>
              {restaurant.name}
            </h1>
            {tableNumber && (
              <p className="text-xs text-gray-500">Table {tableNumber}</p>
            )}
          </div>
          <div
            className="rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ backgroundColor: accentColor }}
          >
            Dine-In Order
          </div>
        </div>
      </header>

      {/* Menu with ordering enabled (connected to cart context) */}
      <ConnectedMenuDisplay restaurant={restaurant} />

      {/* Cart UI */}
      <CartDrawer accentColor={accentColor} restaurantName={restaurant.name} />
      <FloatingCartButton accentColor={accentColor} />
    </div>
  );
}
