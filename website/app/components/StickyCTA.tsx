'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling 500px
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-navy-darkest/95 backdrop-blur-lg border-t border-cyan-bright/30 shadow-lg shadow-cyan-bright/20 animate-slide-up">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="hidden md:block">
          <div className="text-white font-bold text-lg">Ready to Save 15 Hours/Week?</div>
          <div className="text-slate-400 text-sm">Free consultation • No credit card required</div>
        </div>
        <Link
          href="#contact"
          className="px-8 py-3 bg-gradient-to-r from-cyan-bright to-cyan-glow hover:from-cyan-glow hover:to-cyan-bright text-navy-darkest font-bold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-bright/25 hover:scale-105 whitespace-nowrap"
        >
          Get Started Free →
        </Link>
      </div>
    </div>
  )
}
