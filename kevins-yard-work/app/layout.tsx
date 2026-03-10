import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', weight: ['600', '700', '800'] })

export const metadata: Metadata = {
  title: "Kevin's Yard Work | Seattle Professional Landscaping & Yard Cleanup Services",
  description: "Trusted Seattle landscaping and yard cleanup services. Tree trimming, ivy removal, hardscaping, irrigation, and more. 155+ five-star reviews. Open 24/7. Call (206) 369-3776 for free estimate.",
  keywords: "landscaping Seattle, yard cleanup, tree trimming, ivy removal, hardscaping, irrigation, lawn care",
  openGraph: {
    title: "Kevin's Yard Work | Seattle Professional Landscaping Services",
    description: "155+ five-star reviews. Professional landscaping, yard cleanup, tree trimming, and hardscaping services in Seattle. Open 24/7.",
    type: "website",
    locale: "en_US",
    siteName: "Kevin's Yard Work",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
