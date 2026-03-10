'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if moving toward top of screen (leaving page)
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true)
        setHasShown(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [hasShown])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-gradient-to-br from-navy-dark to-navy-darkest border-2 border-cyan-bright rounded-2xl p-8 max-w-2xl mx-4 shadow-2xl shadow-cyan-bright/30 animate-scale-in">
        {/* Close button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="text-6xl mb-4">⏰</div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Wait! Before You Go...
          </h2>
          <p className="text-xl text-slate-300 mb-6">
            Get a <span className="text-cyan-bright font-semibold">free ROI analysis</span> showing exactly how much time and money you'll save with automation.
          </p>

          <div className="bg-slate-card border border-cyan-bright/30 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-cyan-bright">15h</div>
                <div className="text-sm text-slate-400">Saved/Week</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-bright">$52K</div>
                <div className="text-sm text-slate-400">Saved/Year</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-bright">26x</div>
                <div className="text-sm text-slate-400">ROI</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#calculator"
              onClick={() => setIsVisible(false)}
              className="px-8 py-4 bg-gradient-to-r from-cyan-bright to-cyan-glow hover:from-cyan-glow hover:to-cyan-bright text-navy-darkest font-bold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-bright/25 hover:scale-105"
            >
              Calculate My Savings →
            </Link>
            <button
              onClick={() => setIsVisible(false)}
              className="px-8 py-4 bg-transparent hover:bg-slate-card text-slate-400 hover:text-white font-semibold rounded-lg border border-slate-700 transition-all duration-300"
            >
              Maybe Later
            </button>
          </div>

          <p className="text-xs text-slate-500 mt-4">
            No email required. Takes 30 seconds.
          </p>
        </div>
      </div>
    </div>
  )
}
