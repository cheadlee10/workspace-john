/**
 * Stripe Billing Integration
 *
 * NorthStar Synergy subscription billing powered by the Stripe SDK.
 *
 * Plans:
 *   - Starter  $99/mo
 *   - Growth  $149/mo
 *   - Pro     $249/mo
 *
 * Price IDs are read from environment variables so they can differ between
 * Stripe test-mode and live-mode without a code change.
 *
 * When STRIPE_SECRET_KEY is not set every exported function returns a
 * descriptive error instead of throwing, so the rest of the platform
 * continues to work without billing configured.
 */

import Stripe from "stripe";
import {
  updateClient,
  getClientByEmail,
  getClientByStripeCustomerId,
} from "@/lib/crm/client-store";
import { logActivity } from "@/lib/activity/activity-store";

// ---------------------------------------------------------------------------
// Singleton Stripe instance (lazy)
// ---------------------------------------------------------------------------

let stripeInstance: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY is not configured");
    }
    stripeInstance = new Stripe(key);
  }
  return stripeInstance;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function isStripeEnabled(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

type PlanId = "starter" | "growth" | "pro";

const PLAN_ENV_MAP: Record<PlanId, string> = {
  starter: "STRIPE_PRICE_STARTER",
  growth: "STRIPE_PRICE_GROWTH",
  pro: "STRIPE_PRICE_PRO",
};

function getPriceId(plan: PlanId): string {
  const envVar = PLAN_ENV_MAP[plan];
  const priceId = process.env[envVar];
  if (!priceId) {
    throw new Error(
      `Price ID for "${plan}" plan is not configured. Set the ${envVar} environment variable.`,
    );
  }
  return priceId;
}

// ---------------------------------------------------------------------------
// Checkout Session
// ---------------------------------------------------------------------------

export interface CheckoutParams {
  clientEmail: string;
  clientName: string;
  plan: PlanId;
  successUrl: string;
  cancelUrl: string;
}

export interface CheckoutResult {
  url: string;
}

/**
 * Create a Stripe Checkout session for a new subscription.
 *
 * The client_reference_id is set to the client email so the webhook handler
 * can link the completed checkout back to the correct client record.
 */
export async function createCheckoutSession(
  params: CheckoutParams,
): Promise<CheckoutResult> {
  if (!isStripeEnabled()) {
    throw new Error("Billing is not configured. STRIPE_SECRET_KEY is missing.");
  }

  const stripe = getStripe();
  const priceId = getPriceId(params.plan);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: params.clientEmail,
    client_reference_id: params.clientEmail,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: {
      clientName: params.clientName,
      plan: params.plan,
    },
  });

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL");
  }

  return { url: session.url };
}

// ---------------------------------------------------------------------------
// Billing Portal Session
// ---------------------------------------------------------------------------

/**
 * Create a Stripe Billing Portal session so an existing client can manage
 * their subscription, update payment methods, or view invoices.
 */
export async function createBillingPortalSession(
  customerId: string,
  returnUrl: string,
): Promise<{ url: string }> {
  if (!isStripeEnabled()) {
    throw new Error("Billing is not configured. STRIPE_SECRET_KEY is missing.");
  }

  const stripe = getStripe();

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return { url: session.url };
}

// ---------------------------------------------------------------------------
// Webhook Event Handler
// ---------------------------------------------------------------------------

export interface WebhookResult {
  event: string;
  handled: boolean;
}

/**
 * Verify a Stripe webhook signature and process the event.
 *
 * Returns `{ event, handled }` where `handled` indicates whether we acted on
 * the event type.
 */
export async function handleWebhookEvent(
  payload: string,
  signature: string,
): Promise<WebhookResult> {
  if (!isStripeEnabled()) {
    throw new Error("Billing is not configured. STRIPE_SECRET_KEY is missing.");
  }

  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new Error(
      "STRIPE_WEBHOOK_SECRET is not configured. Cannot verify webhook signatures.",
    );
  }

  // Verify the event signature
  const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);

  switch (event.type) {
    // ----- New subscription via Checkout -----
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_email ?? session.client_reference_id;
      const customerId =
        typeof session.customer === "string"
          ? session.customer
          : session.customer?.id;
      const subscriptionId =
        typeof session.subscription === "string"
          ? session.subscription
          : session.subscription?.id;

      if (email) {
        const client = await getClientByEmail(email);
        if (client) {
          await updateClient(client.id, {
            stripeCustomerId: customerId ?? undefined,
            stripeSubscriptionId: subscriptionId ?? undefined,
            status: "active",
          });

          logActivity({
            type: "revenue",
            action: "subscription_created",
            description: `New subscription activated for ${client.restaurantName}`,
            entityId: client.id,
            entityName: client.restaurantName,
            metadata: {
              stripeCustomerId: customerId ?? "",
              stripeSubscriptionId: subscriptionId ?? "",
            },
          });
        } else {
          console.warn(
            `[Billing] checkout.session.completed: no client found for email "${email}"`,
          );
        }
      }

      return { event: event.type, handled: true };
    }

    // ----- Subscription updated (plan change, trial end, etc.) -----
    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId =
        typeof subscription.customer === "string"
          ? subscription.customer
          : subscription.customer.id;

      const client = await getClientByStripeCustomerId(customerId);
      if (client) {
        const status = subscription.status === "active" ? "active" : client.status;
        await updateClient(client.id, { status });

        logActivity({
          type: "client",
          action: "subscription_updated",
          description: `Subscription updated for ${client.restaurantName} (status: ${subscription.status})`,
          entityId: client.id,
          entityName: client.restaurantName,
          metadata: {
            stripeStatus: subscription.status,
          },
        });
      }

      return { event: event.type, handled: true };
    }

    // ----- Subscription cancelled / deleted -----
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId =
        typeof subscription.customer === "string"
          ? subscription.customer
          : subscription.customer.id;

      const client = await getClientByStripeCustomerId(customerId);
      if (client) {
        await updateClient(client.id, { status: "cancelled" });

        logActivity({
          type: "client",
          action: "subscription_cancelled",
          description: `Subscription cancelled for ${client.restaurantName}`,
          entityId: client.id,
          entityName: client.restaurantName,
        });
      }

      return { event: event.type, handled: true };
    }

    // ----- Payment failed -----
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId =
        typeof invoice.customer === "string"
          ? invoice.customer
          : invoice.customer?.id;

      if (customerId) {
        const client = await getClientByStripeCustomerId(customerId);
        if (client) {
          await updateClient(client.id, { status: "past_due" });

          logActivity({
            type: "revenue",
            action: "payment_failed",
            description: `Payment failed for ${client.restaurantName}`,
            entityId: client.id,
            entityName: client.restaurantName,
          });
        }
      }

      return { event: event.type, handled: true };
    }

    default:
      return { event: event.type, handled: false };
  }
}
