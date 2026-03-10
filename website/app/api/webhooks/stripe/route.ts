import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Webhook verification failed' }, { status: 400 })
  }

  // Handle checkout.session.completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    
    // Log to jobs.jsonl
    const jobEntry = {
      id: session.id,
      date: new Date().toISOString().split('T')[0],
      client: session.customer_email || 'Unknown',
      service: session.metadata?.service || 'Service',
      tier: session.metadata?.tier || 'Standard',
      status: 'completed',
      amount: (session.amount_total || 0) / 100,
      paid: true,
      paid_date: new Date().toISOString().split('T')[0],
      notes: `Stripe checkout session ${session.id}`,
    }

    // Write to jobs.jsonl
    try {
      const fs = await import('fs/promises')
      const path = require('path')
      const jobsPath = path.join(process.cwd(), '../../jobs.jsonl')
      await fs.appendFile(jobsPath, JSON.stringify(jobEntry) + '\n')
    } catch (e) {
      console.error('Failed to log job:', e)
    }

    // Send receipt email
    try {
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/send-receipt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session.customer_email,
          sessionId: session.id,
          amount: session.amount_total,
          service: session.metadata?.service || 'Service',
          tier: session.metadata?.tier || 'Standard',
        }),
      })
    } catch (e) {
      console.error('Failed to send receipt:', e)
    }

    console.log('Payment completed + receipt sent to:', session.customer_email)
  }

  return NextResponse.json({ received: true })
}
