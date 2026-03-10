'use client'

import { useState } from 'react'

export default function ROICalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState(10)
  const [hourlyRate, setHourlyRate] = useState(50)

  const weeksSaved = hoursPerWeek * 52
  const annualSavings = weeksSaved * hourlyRate
  const roiMultiple = Math.round(annualSavings / 1999) // Professional tier price

  return (
    <div className="bg-gradient-to-br from-slate-card to-slate-800 border border-cyan-bright/30 rounded-2xl p-8 shadow-xl shadow-cyan-bright/20">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">
        Calculate Your ROI
      </h3>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Hours spent on manual tasks per week
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="5"
              max="40"
              step="5"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="flex-1 h-2 bg-navy-dark rounded-lg appearance-none cursor-pointer accent-cyan-bright"
            />
            <span className="text-2xl font-bold text-cyan-bright w-16 text-right">
              {hoursPerWeek}h
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Your effective hourly rate
          </label>
          <div className="flex items-center gap-4">
            <span className="text-white font-semibold">$</span>
            <input
              type="range"
              min="25"
              max="200"
              step="25"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="flex-1 h-2 bg-navy-dark rounded-lg appearance-none cursor-pointer accent-cyan-bright"
            />
            <span className="text-2xl font-bold text-cyan-bright w-20 text-right">
              ${hourlyRate}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-navy-dark border border-cyan-bright/50 rounded-xl p-6 text-center">
        <div className="mb-4">
          <div className="text-sm text-slate-400 mb-1">Annual Time Savings</div>
          <div className="text-3xl font-bold text-white">{weeksSaved} hours</div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-slate-400 mb-1">Annual Cost Savings</div>
          <div className="text-4xl font-bold text-cyan-bright">${annualSavings.toLocaleString()}</div>
        </div>

        <div className="pt-4 border-t border-slate-700">
          <div className="text-sm text-slate-400 mb-1">ROI on Professional Tier ($1,999)</div>
          <div className="text-2xl font-bold text-green-400">{roiMultiple}x return</div>
          <div className="text-xs text-slate-500 mt-2">
            Pays for itself in {Math.ceil(1999 / (annualSavings / 12))} months
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <a
          href="#contact"
          className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-bright to-cyan-glow hover:from-cyan-glow hover:to-cyan-bright text-navy-darkest font-bold rounded-lg transition-all duration-300 shadow-lg shadow-cyan-bright/25 hover:shadow-cyan-bright/40 hover:scale-105"
        >
          Start Saving Today →
        </a>
      </div>
    </div>
  )
}
