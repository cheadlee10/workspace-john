/**
 * Twilio Inbound SMS Webhook
 *
 * Handles replies from restaurant owners to order alert SMS:
 * - "CONFIRM" / "YES" / "OK" → confirm the order, notify customer
 * - "20" / "30 min" / number → update estimated time, notify customer
 *
 * Validates Twilio request signature via HMAC-SHA1.
 */

import { NextRequest, NextResponse } from "next/server";
import { updateOrderStatus, getOrder } from "@/lib/orders/order-store";
import { sendStatusUpdateSMS } from "@/lib/notifications/sms";
import { sendOrderStatusUpdate } from "@/lib/notifications/email";
import { getSupabase, isDbEnabled } from "@/lib/db/supabase";

// Track which phone number confirmed which order (most recent order alert per phone)
// In production this would be persisted, but in-memory is fine for now
const phoneToOrder = new Map<string, string>();

/**
 * Register an order alert so we know what order a reply refers to.
 * Called from restaurant-alerts.ts after sending the SMS.
 */
export function registerOrderAlert(phone: string, orderId: string): void {
  // Normalize phone to digits only
  const normalized = phone.replace(/\D/g, "");
  phoneToOrder.set(normalized, orderId);
}

/**
 * Verify Twilio request signature (HMAC-SHA1)
 */
async function verifyTwilioSignature(
  url: string,
  params: Record<string, string>,
  signature: string | null,
  authToken: string
): Promise<boolean> {
  if (!signature) return false;

  // Build the data string: URL + sorted params
  const sortedKeys = Object.keys(params).sort();
  let data = url;
  for (const key of sortedKeys) {
    data += key + params[key];
  }

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(authToken),
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"]
  );

  const signatureBytes = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  const computed = btoa(String.fromCharCode(...new Uint8Array(signatureBytes)));

  return computed === signature;
}

export async function POST(request: NextRequest) {
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  // Parse form-encoded body
  const formData = await request.formData();
  const params: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    params[key] = String(value);
  }

  // Verify signature if auth token is configured
  if (authToken) {
    const signature = request.headers.get("x-twilio-signature");
    const requestUrl = request.url;
    const isValid = await verifyTwilioSignature(requestUrl, params, signature, authToken);
    if (!isValid) {
      return new NextResponse(
        '<?xml version="1.0" encoding="UTF-8"?><Response><Message>Unauthorized</Message></Response>',
        { status: 401, headers: { "Content-Type": "text/xml" } }
      );
    }
  }

  const fromPhone = (params.From || "").replace(/\D/g, "");
  const body = (params.Body || "").trim();

  if (!fromPhone || !body) {
    return twimlResponse("No message received.");
  }

  // Find the most recent order for this phone number
  const orderId = phoneToOrder.get(fromPhone) || await findRecentOrderByPhone(fromPhone);

  if (!orderId) {
    return twimlResponse("No pending order found. Reply to an order alert to confirm.");
  }

  const order = await getOrder(orderId);
  if (!order) {
    return twimlResponse(`Order #${orderId} not found.`);
  }

  const upperBody = body.toUpperCase();

  // Handle CONFIRM / YES / OK
  if (upperBody === "CONFIRM" || upperBody === "YES" || upperBody === "OK" || upperBody === "Y") {
    if (order.status === "confirmed" || order.status === "preparing") {
      return twimlResponse(`Order #${orderId} is already confirmed.`);
    }

    await updateOrderStatus(orderId, "confirmed");

    // Notify customer via SMS
    sendStatusUpdateSMS({
      to: order.customer.phone,
      orderId: order.id,
      restaurantName: "Your restaurant",
      message: "Your order is confirmed! Ready in ~15-25 minutes.",
    }).catch((err) => console.error("[TwilioWebhook] Customer SMS failed:", err));

    // Notify customer via email
    sendOrderStatusUpdate({
      customerEmail: order.customer.email,
      customerName: order.customer.name,
      orderId: order.id,
      restaurantName: "Restaurant",
      status: "confirmed",
      message: "Your order is confirmed and being prepared!",
    }).catch((err) => console.error("[TwilioWebhook] Customer email failed:", err));

    return twimlResponse(`Order #${orderId} confirmed! Customer has been notified.`);
  }

  // Handle time estimate: "20", "30 min", "45 minutes", etc.
  const timeMatch = body.match(/^(\d{1,3})\s*(min|minutes|mins)?$/i);
  if (timeMatch) {
    const minutes = parseInt(timeMatch[1], 10);
    if (minutes > 0 && minutes <= 180) {
      // Notify customer of time estimate
      sendStatusUpdateSMS({
        to: order.customer.phone,
        orderId: order.id,
        restaurantName: "Your restaurant",
        message: `Your order will be ready in ${minutes} minutes.`,
      }).catch((err) => console.error("[TwilioWebhook] Customer SMS failed:", err));

      sendOrderStatusUpdate({
        customerEmail: order.customer.email,
        customerName: order.customer.name,
        orderId: order.id,
        restaurantName: "Restaurant",
        status: "preparing",
        message: `Your order will be ready in approximately ${minutes} minutes.`,
      }).catch((err) => console.error("[TwilioWebhook] Customer email failed:", err));

      // Also confirm the order if it's still pending
      if (order.status === "pending") {
        await updateOrderStatus(orderId, "confirmed");
      }

      return twimlResponse(`Got it — ${minutes} minutes. Customer notified.`);
    }
  }

  return twimlResponse(`Reply CONFIRM to accept order #${orderId}, or reply with a time like "20" for 20 minutes.`);
}

/**
 * Find recent pending/confirmed order by customer phone (fallback lookup)
 */
async function findRecentOrderByPhone(phone: string): Promise<string | undefined> {
  if (!isDbEnabled()) return undefined;

  const sb = getSupabase();
  if (!sb) return undefined;

  const { data } = await sb
    .from("orders")
    .select("id, customer")
    .in("status", ["pending", "confirmed"])
    .order("created_at", { ascending: false })
    .limit(20);

  if (!data) return undefined;

  for (const row of data) {
    const customer = row.customer as { phone?: string };
    if (customer?.phone?.replace(/\D/g, "") === phone) {
      return row.id as string;
    }
  }

  return undefined;
}

function twimlResponse(message: string): NextResponse {
  const xml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${message}</Message></Response>`;
  return new NextResponse(xml, {
    headers: { "Content-Type": "text/xml" },
  });
}
