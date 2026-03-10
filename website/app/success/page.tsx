'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [receiptSent, setReceiptSent] = useState(false)

  useEffect(() => {
    if (sessionId) {
      // Receipt is sent automatically via webhook
      setReceiptSent(true)
    }
  }, [sessionId])

  return (
    <main className="section max-w-2xl mx-auto py-32 text-center">
      <div className="text-6xl mb-6 animate-bounce">✓</div>
      <h1 className="text-4xl font-bold mb-4">Payment Received!</h1>
      <p className="text-slate-300 mb-4 text-lg">
        Thank you for choosing NorthStar Synergy.
      </p>
      
      {receiptSent && (
        <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-6 mb-8">
          <p className="text-blue-300 mb-2">📧 Receipt sent to your email</p>
          <p className="text-slate-400 text-sm">
            Check your inbox for payment confirmation and next steps.
          </p>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-lg p-8 mb-8 text-left">
        <h2 className="text-xl font-bold mb-4">What Happens Next?</h2>
        <ul className="space-y-3 text-slate-300">
          <li className="flex items-start">
            <span className="text-blue-400 mr-3">1.</span>
            <span>We'll reach out within 24 hours to gather requirements</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-3">2.</span>
            <span>Confirm timeline and deliverables</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-3">3.</span>
            <span>Kick off your project and start building</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-400 mr-3">4.</span>
            <span>Deliver with documentation and training</span>
          </li>
        </ul>
      </div>

      {sessionId && (
        <p className="text-slate-500 text-xs mb-8">
          Transaction ID: {sessionId.slice(0, 20)}...
        </p>
      )}

      <Link href="/" className="btn btn-primary">
        Back to Home
      </Link>
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="section max-w-2xl mx-auto py-32 text-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
