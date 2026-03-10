"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { QROrderPage } from "@/components/ordering/QROrderPage";
import { useRestaurant } from "@/lib/restaurant-context";

function QROrderContent() {
  const searchParams = useSearchParams();
  const table = searchParams.get("table") || undefined;
  const restaurant = useRestaurant();

  return <QROrderPage restaurant={restaurant} tableNumber={table} />;
}

export default function OrderHerePage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><p className="text-gray-400">Loading menu...</p></div>}>
      <QROrderContent />
    </Suspense>
  );
}
