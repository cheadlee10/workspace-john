import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Your Order",
  description: "Complete your restaurant order.",
  robots: { index: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
