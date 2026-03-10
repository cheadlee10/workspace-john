import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Eagle Landscaping & Construction | Everett, WA',
  description: 'Professional landscaping and construction services in Everett, WA. Fencing, hardscaping, mulch, pruning, property maintenance. Licensed, bonded, insured. Available 24/7. Call (425) 309-6791.',
  keywords: 'landscaping Everett WA, landscaping near me, fence installation Everett, hardscaping, mulch delivery, tree pruning, yard cleanup Everett Washington',
  openGraph: {
    title: 'The Eagle Landscaping & Construction | Everett, WA',
    description: 'Professional landscaping and construction services in Everett, WA. Available 24/7.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
