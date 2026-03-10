'use client'

import { useState, useEffect } from 'react'

export default function LiveStats() {
  const [emailsProcessed, setEmailsProcessed] = useState(10247)
  const [hoursSaved, setHoursSaved] = useState(1856)

  useEffect(() => {
    // Simulate live counter
    const interval = setInterval(() => {
      setEmailsProcessed(prev => prev + Math.floor(Math.random() * 5))
      if (Math.random() > 0.7) {
        setHoursSaved(prev => prev + 1)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gradient-to-br from-slate-card to-slate-800 border border-cyan-bright/30 rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-sm font-semibold text-slate-300">Live Stats</span>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="text-3xl font-bold text-cyan-bright mb-1 tabular-nums">
            {emailsProcessed.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400">Emails Processed Today</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-cyan-bright mb-1 tabular-nums">
            {hoursSaved.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400">Hours Saved This Month</div>
        </div>
      </div>
    </div>
  )
}
