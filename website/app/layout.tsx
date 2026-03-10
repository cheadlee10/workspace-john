'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <html lang="en" className={inter.className}>
      <head>
        <title>NorthStar Synergy | Business Automation & AI Assistants</title>
        <meta name="description" content="Professional automation, AI assistants, and software development services. Excel automation, Python scripts, web apps, APIs, and custom bots." />
      </head>
      <body className="antialiased">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-darkest/95 backdrop-blur-lg border-b border-slate-700/50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-cyan-bright hover:text-cyan-glow transition-colors">
              NorthStar Synergy
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="#services" className="text-slate-300 hover:text-cyan-bright transition-colors">
                Services
              </Link>
              <Link href="#examples" className="text-slate-300 hover:text-cyan-bright transition-colors">
                Examples
              </Link>
              <Link href="#pricing" className="text-slate-300 hover:text-cyan-bright transition-colors">
                Pricing
              </Link>
              <Link href="#contact" className="px-6 py-2.5 bg-gradient-to-r from-cyan-bright to-cyan-glow hover:from-cyan-glow hover:to-cyan-bright text-navy-darkest font-bold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-bright/25">
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-cyan-bright"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-navy-dark border-t border-slate-700/50">
              <div className="px-6 py-4 space-y-4">
                <Link href="#services" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-cyan-bright transition-colors">
                  Services
                </Link>
                <Link href="#examples" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-cyan-bright transition-colors">
                  Examples
                </Link>
                <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-slate-300 hover:text-cyan-bright transition-colors">
                  Pricing
                </Link>
                <Link href="#contact" onClick={() => setMobileMenuOpen(false)} className="block px-6 py-2.5 bg-gradient-to-r from-cyan-bright to-cyan-glow text-navy-darkest font-bold rounded-lg text-center">
                  Get Started
                </Link>
              </div>
            </div>
          )}
        </nav>
        
        {children}
        
        <footer className="border-t border-slate-700/50 bg-navy-darkest py-12">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-slate-400 mb-2">© 2026 NorthStar Synergy. All rights reserved.</p>
            <p className="text-slate-500 text-sm">
              <a href="mailto:john@northstarsynergy.com" className="hover:text-cyan-bright transition-colors">
                john@northstarsynergy.com
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
