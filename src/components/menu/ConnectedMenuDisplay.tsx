"use client";

import { useCallback } from "react";
import { useCart } from "@/lib/cart-context";
import { MenuDisplay } from "./MenuSection";
import type { Restaurant } from "@/types/restaurant";

interface ConnectedMenuDisplayProps {
  restaurant: Restaurant;
}

export function ConnectedMenuDisplay({ restaurant }: ConnectedMenuDisplayProps) {
  const { addItem } = useCart();

  const handleAddToCart = useCallback(
    (itemId: string, quantity: number) => {
      // Find the menu item across all sections
      for (const section of restaurant.menu.sections) {
        const item = section.items.find((i) => i.id === itemId);
        if (item) {
          addItem(item, quantity);
          return;
        }
      }
    },
    [restaurant.menu.sections, addItem]
  );

  return (
    <MenuDisplay
      sections={restaurant.menu.sections}
      accentColor={restaurant.branding.accentColor}
      showImages={true}
      enableOrdering={restaurant.features.onlineOrdering}
      onAddToCart={handleAddToCart}
    />
  );
}
