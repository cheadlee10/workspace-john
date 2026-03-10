/**
 * Stripe Billing Integration
 *
 * NorthStar's own subscription management:
 * - Starter: $49/mo (website + basic SEO)
 * - Growth: $99/mo (+ online ordering + reviews)
 * - Pro: $149/mo (+ AI marketing + loyalty + delivery)
 *
 * Uses Stripe Billing for:
 * - Subscription creation & management
 * - Invoice generation
 * - Payment processing
 * - Dunning (failed payment retry)
 * - Proration on plan changes
 */

export interface StripeConfig {
  secretKey: string;
  webhookSecret: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  interval: "month" | "year";
  features: string[];
  stripePriceId: string;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 49,
    interval: "month",
    stripePriceId: "price_starter_monthly", // Set in Stripe Dashboard
    features: [
      "Stunning responsive website",
      "Full interactive menu",
      "Individual dish SEO pages",
      "Google & Yelp review display",
      "Business hours & location",
      "Contact form",
      "SSL certificate",
      "Mobile-optimized",
      "WCAG 2.1 AA accessible",
      "Schema.org structured data",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: 99,
    interval: "month",
    stripePriceId: "price_growth_monthly",
    features: [
      "Everything in Starter",
      "Online ordering (zero commission)",
      "Square POS integration",
      "Order notifications",
      "Customer database",
      "Reservation system",
      "QR code table ordering",
      "Catering inquiry form",
      "Google Business optimization",
      "Menu analytics",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 149,
    interval: "month",
    stripePriceId: "price_pro_monthly",
    features: [
      "Everything in Growth",
      "White-label delivery integration",
      "Order with Google",
      "Loyalty program",
      "Email marketing campaigns",
      "SMS marketing",
      "Abandoned cart recovery",
      "Gift cards",
      "Multi-language support",
      "Advanced analytics dashboard",
      "Priority support",
    ],
  },
];

/**
 * Create a new Stripe customer for a restaurant
 */
export async function createCustomer(
  config: StripeConfig,
  restaurant: {
    name: string;
    email: string;
    phone?: string;
  }
): Promise<string> {
  const response = await fetch("https://api.stripe.com/v1/customers", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.secretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      name: restaurant.name,
      email: restaurant.email,
      ...(restaurant.phone ? { phone: restaurant.phone } : {}),
      "metadata[source]": "northstar-platform",
    }),
  });

  const customer = await response.json();
  return customer.id;
}

/**
 * Create a checkout session for a new subscription
 */
export async function createCheckoutSession(
  config: StripeConfig,
  params: {
    customerId: string;
    planId: string;
    successUrl: string;
    cancelUrl: string;
    trialDays?: number;
  }
): Promise<string> {
  const plan = PRICING_PLANS.find((p) => p.id === params.planId);
  if (!plan) throw new Error(`Invalid plan: ${params.planId}`);

  const body: Record<string, string> = {
    customer: params.customerId,
    "line_items[0][price]": plan.stripePriceId,
    "line_items[0][quantity]": "1",
    mode: "subscription",
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    "payment_method_types[0]": "card",
  };

  if (params.trialDays) {
    body["subscription_data[trial_period_days]"] = params.trialDays.toString();
  }

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.secretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(body),
  });

  const session = await response.json();
  return session.url;
}

/**
 * Create a billing portal session (for customers to manage their subscription)
 */
export async function createBillingPortal(
  config: StripeConfig,
  customerId: string,
  returnUrl: string
): Promise<string> {
  const response = await fetch("https://api.stripe.com/v1/billing_portal/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.secretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      customer: customerId,
      return_url: returnUrl,
    }),
  });

  const session = await response.json();
  return session.url;
}

/**
 * Verify Stripe webhook signature (HMAC-SHA256)
 * Stripe signs webhooks with `whsec_...` secret using the scheme:
 *   v1 = HMAC-SHA256(timestamp + "." + payload, secret)
 * The Stripe-Signature header contains: t=<timestamp>,v1=<sig>[,v1=<sig>...]
 */
async function verifyStripeSignature(
  payload: string,
  signature: string,
  secret: string,
  toleranceSeconds = 300
): Promise<boolean> {
  const parts = signature.split(",");
  const timestampPart = parts.find((p) => p.startsWith("t="));
  const sigParts = parts.filter((p) => p.startsWith("v1=")).map((p) => p.slice(3));

  if (!timestampPart || sigParts.length === 0) return false;

  const timestamp = timestampPart.slice(2);
  const age = Math.floor(Date.now() / 1000) - parseInt(timestamp, 10);
  if (isNaN(age) || age > toleranceSeconds) return false;

  const signedPayload = `${timestamp}.${payload}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signatureBytes = await crypto.subtle.sign("HMAC", key, encoder.encode(signedPayload));
  const expected = Array.from(new Uint8Array(signatureBytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return sigParts.some((sig) => sig === expected);
}

/**
 * Handle Stripe webhook events
 */
export async function handleWebhook(
  config: StripeConfig,
  payload: string,
  signature: string
): Promise<{ event: string; handled: boolean }> {
  // Verify webhook signature if STRIPE_WEBHOOK_SECRET is configured
  const webhookSecret = config.webhookSecret || process.env.STRIPE_WEBHOOK_SECRET;
  if (webhookSecret) {
    const isValid = await verifyStripeSignature(payload, signature, webhookSecret);
    if (!isValid) {
      console.error("[Billing] Webhook signature verification failed");
      throw new Error("Invalid webhook signature");
    }
  } else {
    console.warn("[Billing] STRIPE_WEBHOOK_SECRET not set — skipping signature verification. Set this in production!");
  }

  const event = JSON.parse(payload);

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      console.warn(`[Billing] New subscription: ${session.customer}`);
      // Activate the restaurant's website
      // Send welcome email
      return { event: event.type, handled: true };
    }

    case "invoice.paid": {
      const invoice = event.data.object;
      console.warn(`[Billing] Invoice paid: ${invoice.customer} - $${invoice.amount_paid / 100}`);
      // Record payment in accounting
      return { event: event.type, handled: true };
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object;
      console.warn(`[Billing] Payment failed: ${invoice.customer}`);
      // Send payment failure notification
      // Stripe Billing automatically retries (smart retries)
      return { event: event.type, handled: true };
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      console.warn(`[Billing] Subscription cancelled: ${subscription.customer}`);
      // Deactivate website (after grace period)
      return { event: event.type, handled: true };
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object;
      console.warn(`[Billing] Subscription updated: ${subscription.customer}`);
      // Update feature access based on new plan
      return { event: event.type, handled: true };
    }

    default:
      return { event: event.type, handled: false };
  }
}

/**
 * Generate revenue report for P&L
 */
export async function getRevenueReport(
  config: StripeConfig,
  startDate: Date,
  endDate: Date
): Promise<{
  totalRevenue: number;
  subscriptionRevenue: number;
  activeSubscriptions: number;
  mrr: number;
  churnRate: number;
  newCustomers: number;
}> {
  const startTimestamp = Math.floor(startDate.getTime() / 1000);
  const endTimestamp = Math.floor(endDate.getTime() / 1000);

  // Get charges in date range
  const chargesResponse = await fetch(
    `https://api.stripe.com/v1/charges?created[gte]=${startTimestamp}&created[lte]=${endTimestamp}&limit=100`,
    {
      headers: { Authorization: `Bearer ${config.secretKey}` },
    }
  );
  const chargesData = await chargesResponse.json();

  const totalRevenue = chargesData.data
    .filter((c: { paid: boolean }) => c.paid)
    .reduce((sum: number, c: { amount: number }) => sum + c.amount, 0) / 100;

  // Get active subscriptions
  const subsResponse = await fetch(
    "https://api.stripe.com/v1/subscriptions?status=active&limit=100",
    {
      headers: { Authorization: `Bearer ${config.secretKey}` },
    }
  );
  const subsData = await subsResponse.json();

  const activeSubscriptions = subsData.data.length;
  const mrr = subsData.data.reduce(
    (sum: number, s: { items: { data: Array<{ price: { unit_amount: number } }> } }) =>
      sum + (s.items.data[0]?.price?.unit_amount || 0),
    0
  ) / 100;

  return {
    totalRevenue,
    subscriptionRevenue: totalRevenue,
    activeSubscriptions,
    mrr,
    churnRate: 0, // Would need historical data to calculate
    newCustomers: chargesData.data.filter(
      (c: { paid: boolean; created: number }) =>
        c.paid && c.created >= startTimestamp
    ).length,
  };
}
