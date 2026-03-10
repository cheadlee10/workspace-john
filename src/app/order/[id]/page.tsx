import { headers } from "next/headers";
import { OrderTracker } from "@/components/ordering/OrderTracker";
import { resolveRestaurant } from "@/lib/tenant/restaurant-store";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Status | Track Your Order",
  description: "Track the status of your restaurant order in real-time.",
};

interface OrderPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params;
  const headersList = await headers();
  const host = headersList.get("host") || undefined;
  const restaurant = await resolveRestaurant(host);

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <a href="/" className="text-sm text-gray-500 hover:text-gray-700">
            &larr; {restaurant.name}
          </a>
          <span className="text-sm font-medium text-gray-400">Order #{id}</span>
        </div>
      </header>

      <main className="px-4 py-8">
        <OrderTracker orderId={id} accentColor={restaurant.branding.accentColor} />
      </main>
    </div>
  );
}
