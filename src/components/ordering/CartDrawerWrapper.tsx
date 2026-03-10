"use client";

import type { Restaurant } from "@/types/restaurant";
import { CartDrawer, FloatingCartButton } from "./CartDrawer";

interface CartDrawerWrapperProps {
  restaurant: Restaurant;
}

export function CartDrawerWrapper({ restaurant }: CartDrawerWrapperProps) {
  return (
    <>
      <CartDrawer
        accentColor={restaurant.branding.accentColor}
        restaurantName={restaurant.name}
      />
      <FloatingCartButton accentColor={restaurant.branding.accentColor} />
    </>
  );
}
