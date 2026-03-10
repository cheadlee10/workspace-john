import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ever-Green Landscaping | Premium Landscaping in Everett, WA",
  description:
    "Enterprise-quality residential landscaping in Everett, WA. Ever-Green Landscaping delivers design, lawn care, tree service, irrigation, decks, and fencing with 25+ years of trusted local craftsmanship.",
  keywords:
    "Everett landscaping, premium landscaping Everett WA, lawn care Everett, tree service Everett, irrigation Everett, deck builder Everett, fence contractor Everett, Ever-Green Landscaping",
  openGraph: {
    title: "Ever-Green Landscaping | Premium Landscaping in Everett, WA",
    description:
      "Premium residential landscaping services in Everett and Snohomish County. 25+ years of trusted craftsmanship.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="geo.region" content="US-WA" />
        <meta name="geo.placename" content="Everett" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
