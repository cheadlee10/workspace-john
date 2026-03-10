import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export async function POST(request: NextRequest) {
  try {
    const { serviceId, tier } = await request.json()

    // Service pricing map
    const services: Record<string, Record<string, any>> = {
      excel: {
        name: 'Excel Automation',
        tiers: {
          starter: { price: 15000, description: 'Basic formula audit' },
          pro: { price: 30000, description: 'Custom VBA automation' },
          enterprise: { price: 50000, description: 'Full reporting pipeline' },
        },
      },
      scripts: {
        name: 'Python Scripts',
        tiers: {
          starter: { price: 9900, description: 'Simple automation script' },
          pro: { price: 29900, description: 'Complex data processing' },
          enterprise: { price: 99900, description: 'Full production pipeline' },
        },
      },
      webdev: {
        name: 'Web Development',
        tiers: {
          starter: { price: 100000, description: 'Landing page' },
          pro: { price: 300000, description: 'Full web app' },
          enterprise: { price: 500000, description: 'Enterprise platform' },
        },
      },
      bots: {
        name: 'Custom Bots',
        tiers: {
          starter: { price: 50000, description: 'Simple bot' },
          pro: { price: 200000, description: 'Advanced features' },
          enterprise: { price: 500000, description: 'Full suite' },
        },
      },
      data: {
        name: 'Data Engineering',
        tiers: {
          starter: { price: 20000, description: 'Data cleaning' },
          pro: { price: 50000, description: 'ETL pipeline' },
          enterprise: { price: 150000, description: 'Dashboard + maintenance' },
        },
      },
      api: {
        name: 'API Integration',
        tiers: {
          starter: { price: 50000, description: 'Single API integration' },
          pro: { price: 150000, description: 'Multiple integrations' },
          enterprise: { price: 300000, description: 'Full integration suite' },
        },
      },
    }

    const service = services[serviceId]
    if (!service || !service.tiers[tier]) {
      return NextResponse.json({ error: 'Invalid service or tier' }, { status: 400 })
    }

    const tierData = service.tiers[tier as keyof typeof service.tiers]

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${service.name} - ${tier.charAt(0).toUpperCase() + tier.slice(1)}`,
              description: tierData.description,
            },
            unit_amount: tierData.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      customer_email: request.nextUrl.searchParams.get('email') || undefined,
      metadata: {
        service: service.name,
        tier: tier,
      },
    })

    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
