import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', weight: ['600', '700', '800'] })

export const metadata: Metadata = {
  title: "Lee's General Landscaping | Seattle Premier Landscaping & Hardscaping",
  description: "30+ years serving Seattle. Expert landscaping, hardscaping, yard cleanup, and garden design. 5,000+ satisfied homeowners. Licensed, bonded, insured. Free estimates.",
  keywords: "landscaping Seattle, hardscaping Bellevue, yard cleanup, garden design, landscape construction, lawn care",
  openGraph: {
    title: "Lee's General Landscaping | Seattle Premier Landscaping Services",
    description: "30+ years of expert landscaping and hardscaping. 5,000+ satisfied homeowners across Seattle, Bellevue, and surrounding areas.",
    type: "website",
    locale: "en_US",
    siteName: "Lee's General Landscaping",
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
