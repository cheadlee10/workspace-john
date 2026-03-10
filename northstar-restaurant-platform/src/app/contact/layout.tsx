import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | NorthStar Synergy",
  description: "Get in touch with NorthStar Synergy. We'd love to hear about your restaurant and how we can help.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
