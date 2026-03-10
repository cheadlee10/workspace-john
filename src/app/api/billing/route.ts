import { NextRequest, NextResponse } from "next/server";
import {
  isStripeEnabled,
  createCheckoutSession,
  createBillingPortalSession,
} from "@/lib/billing/stripe";

/**
 * POST /api/billing
 *
 * Protected route (middleware enforces auth for /api/billing).
 *
 * Actions:
 *   - "checkout"  Create a Stripe Checkout session for a new subscription
 *   - "portal"    Create a Stripe Billing Portal session
 */
export async function POST(request: NextRequest) {
  if (!isStripeEnabled()) {
    return NextResponse.json(
      { error: "Billing is not configured. Stripe keys are missing." },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      // ------------------------------------------------------------------
      // Create Checkout session
      // ------------------------------------------------------------------
      case "checkout": {
        const { clientEmail, clientName, plan, successUrl, cancelUrl } = body;

        if (!clientEmail || !clientName || !plan || !successUrl || !cancelUrl) {
          return NextResponse.json(
            {
              error:
                "Missing required fields: clientEmail, clientName, plan, successUrl, cancelUrl",
            },
            { status: 400 },
          );
        }

        if (!["starter", "growth", "pro"].includes(plan)) {
          return NextResponse.json(
            { error: 'Invalid plan. Must be "starter", "growth", or "pro".' },
            { status: 400 },
          );
        }

        const result = await createCheckoutSession({
          clientEmail,
          clientName,
          plan,
          successUrl,
          cancelUrl,
        });

        return NextResponse.json({ url: result.url });
      }

      // ------------------------------------------------------------------
      // Create Billing Portal session
      // ------------------------------------------------------------------
      case "portal": {
        const { customerId, returnUrl } = body;

        if (!customerId || !returnUrl) {
          return NextResponse.json(
            { error: "Missing required fields: customerId, returnUrl" },
            { status: 400 },
          );
        }

        const result = await createBillingPortalSession(customerId, returnUrl);
        return NextResponse.json({ url: result.url });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action. Must be "checkout" or "portal".' },
          { status: 400 },
        );
    }
  } catch (error) {
    console.error("[Billing API] Error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
