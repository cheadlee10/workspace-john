'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function CheckoutContent() {
  const searchParams = useSearchParams()
  const serviceId = searchParams.get('service') || 'excel'
  const tier = searchParams.get('tier') || 'starter'
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId, tier }),
      })

      const { sessionId, error } = await response.json()
      if (error) throw new Error(error)

      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe failed to load')

      await stripe.redirectToCheckout({ sessionId })
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Checkout failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="section max-w-2xl mx-auto py-20">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="card mb-6">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-3 mb-6 pb-6 border-b border-slate-700">
          <div className="flex justify-between">
            <span>Service:</span>
            <span className="font-semibold">{serviceId}</span>
          </div>
          <div className="flex justify-between">
            <span>Tier:</span>
            <span className="font-semibold capitalize">{tier}</span>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-3 text-white placeholder-slate-500"
            required
          />
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading || !email}
          className="btn btn-primary w-full disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Continue to Payment'}
        </button>
      </div>

      <p className="text-slate-400 text-sm text-center">
        Secure payment powered by Stripe. No account required.
      </p>
    </main>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="section max-w-2xl mx-auto py-20 text-center">Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
