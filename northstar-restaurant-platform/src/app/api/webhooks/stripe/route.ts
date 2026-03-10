import { NextRequest, NextResponse } from "next/server";
import { isStripeEnabled, handleWebhookEvent } from "@/lib/billing/stripe";

/**
 * POST /api/webhooks/stripe -- Stripe webhook receiver
 *
 * This route is public (no auth required). The middleware already treats
 * paths under /api/webhooks as public.
 *
 * Stripe signs every webhook delivery. The handleWebhookEvent function
 * verifies the signature using STRIPE_WEBHOOK_SECRET before processing.
 */
export async function POST(request: NextRequest) {
  if (!isStripeEnabled()) {
    return NextResponse.json(
      { error: "Billing is not configured" },
      { status: 503 },
    );
  }

  try {
    const payload = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 },
      );
    }

    const result = await handleWebhookEvent(payload, signature);

    return NextResponse.json(
      { received: true, event: result.event, handled: result.handled },
      { status: 200 },
    );
  } catch (error) {
    console.error("[Stripe Webhook] Error:", error);

    // Stripe signature verification failures should return 400 so Stripe
    // knows the event was rejected (not a transient server error).
    const message =
      error instanceof Error ? error.message : "Webhook processing failed";
    const isSignatureError =
      message.includes("signature") || message.includes("No signatures found");
    const status = isSignatureError ? 400 : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
