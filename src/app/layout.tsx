import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { headers } from "next/headers";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { RestaurantProvider } from "@/lib/restaurant-context";
import { resolveRestaurant } from "@/lib/tenant/restaurant-store";
import { CookieConsent } from "@/components/CookieConsent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") || undefined;
  const r = await resolveRestaurant(host);

  const title = `${r.name} | ${r.tagline || r.cuisine.join(", ")} in ${r.location.city}`;
  const description = r.description || `${r.cuisine.join(", ")} in ${r.location.city}, ${r.location.state}. Order online or reserve a table.`;

  return {
    title,
    description,
    metadataBase: new URL(`https://${host || "northstarsynergy.com"}`),
    openGraph: { title, description, type: "website", locale: "en_US" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const host = headersList.get("host") || undefined;
  const restaurant = await resolveRestaurant(host);

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <RestaurantProvider restaurant={restaurant}>
          <CartProvider>{children}</CartProvider>
        </RestaurantProvider>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="lazyOnload"
            />
            <Script id="ga-init" strategy="lazyOnload">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'denied'});gtag('js',new Date());gtag('config','${GA_ID}');if(localStorage.getItem('cookie-consent')==='accepted'){gtag('consent','update',{analytics_storage:'granted'});}`}
            </Script>
          </>
        )}
        <CookieConsent />
      </body>
    </html>
  );
}
