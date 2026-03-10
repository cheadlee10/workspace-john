import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Online",
  description: "Place your order online for pickup or delivery.",
  robots: { index: false },
};

export default function OrderHereLayout({ children }: { children: React.ReactNode }) {
  return children;
}
