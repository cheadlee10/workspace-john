import { NextRequest, NextResponse } from "next/server";
import { updateOrderStatus } from "@/lib/orders/order-store";
import { createHmac, timingSafeEqual } from "crypto";

const WEBHOOK_SIGNATURE_KEY = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
const WEBHOOK_URL = process.env.SQUARE_WEBHOOK_URL; // The URL Square sends webhooks to

/**
 * Verify Square webhook signature (HMAC-SHA256)
 * https://developer.squareup.com/docs/webhooks/step3validate
 */
function verifySquareWebhook(
  signature: string | null,
  body: string,
  url: string,
  signatureKey: string
): boolean {
  if (!signature) return false;
  const hmac = createHmac("sha256", signatureKey);
  hmac.update(url + body);
  const expectedSignature = hmac.digest("base64");
  try {
    const sigBuf = Buffer.from(signature, "base64");
    const expectedBuf = Buffer.from(expectedSignature, "base64");
    return sigBuf.length === expectedBuf.length && timingSafeEqual(sigBuf, expectedBuf);
  } catch {
    return false;
  }
}

/**
 * POST /api/webhooks/square — Handle Square webhook events
 *
 * Square sends webhooks for order updates, payment completions, etc.
 */
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();

    // Verify webhook signature — reject if signature keys are not configured
    if (!WEBHOOK_SIGNATURE_KEY || !WEBHOOK_URL) {
      return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
    }

    const signature = request.headers.get("x-square-hmacsha256-signature");
    if (!verifySquareWebhook(signature, rawBody, WEBHOOK_URL, WEBHOOK_SIGNATURE_KEY)) {
      console.error("[Webhook] Invalid Square webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    const body = JSON.parse(rawBody);
    const eventType = body.type;

    switch (eventType) {
      case "order.updated": {
        const orderData = body.data?.object?.order_updated;
        const state = orderData?.state;
        const orderId = orderData?.order_id;

        if (orderId && state) {
          const statusMap: Record<string, string> = {
            OPEN: "confirmed",
            COMPLETED: "completed",
            CANCELED: "cancelled",
          };
          const mappedStatus = statusMap[state];
          if (mappedStatus) {
            await updateOrderStatus(orderId, mappedStatus as "confirmed" | "completed" | "cancelled");
          }
        }
        break;
      }

      case "order.fulfillment.updated": {
        const fulfillment = body.data?.object?.fulfillment_update;
        const state = fulfillment?.new_state;
        const orderId = fulfillment?.order_id;

        if (orderId && state) {
          const fulfillmentMap: Record<string, string> = {
            PROPOSED: "confirmed",
            RESERVED: "confirmed",
            PREPARED: "preparing",
            COMPLETED: "ready",
            CANCELED: "cancelled",
          };
          const mappedStatus = fulfillmentMap[state];
          if (mappedStatus) {
            await updateOrderStatus(orderId, mappedStatus as "confirmed" | "preparing" | "ready" | "cancelled");
          }
        }
        break;
      }

      case "payment.completed": {
        // Payment completed — no action needed (order status handled via order.updated)
        break;
      }

      default:
        console.warn("[Webhook] Unhandled Square event:", eventType);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[Webhook] Error processing Square webhook:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
