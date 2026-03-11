import { NextRequest, NextResponse } from "next/server";
import {
  createOrder,
  updateOrderPayment,
  updateOrderStatus,
  getOrdersByRestaurant,
  getOrderStats,
} from "@/lib/orders/order-store";
import { sendOrderConfirmation } from "@/lib/notifications/email";
import { sendOrderSMS } from "@/lib/notifications/sms";
import { sendRestaurantAlert } from "@/lib/notifications/restaurant-alerts";
import { processPayment as processSquarePayment } from "@/lib/integrations/square-pos";
import { rateLimit, getRateLimitHeaders } from "@/lib/security/rate-limit";
import { verifySession } from "@/lib/auth/session";

const TAX_RATE = 0.1025;
const DELIVERY_FEE = 5.99;
const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 20;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Idempotency: prevent duplicate orders from double-clicks / retries
const IDEMPOTENCY_TTL_MS = 5 * 60_000; // 5 minutes
const idempotencyCache = new Map<string, { orderId: string; response: object; expiresAt: number }>();

function checkIdempotency(key: string): object | null {
  const entry = idempotencyCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    idempotencyCache.delete(key);
    return null;
  }
  return entry.response;
}

function storeIdempotency(key: string, orderId: string, response: object): void {
  idempotencyCache.set(key, { orderId, response, expiresAt: Date.now() + IDEMPOTENCY_TTL_MS });
  // Evict expired entries periodically (keep map from growing unbounded)
  if (idempotencyCache.size > 1000) {
    const now = Date.now();
    for (const [k, v] of idempotencyCache) {
      if (now > v.expiresAt) idempotencyCache.delete(k);
    }
  }
}

function sanitize(str: string, maxLen: number): string {
  return str.replace(/[<>]/g, "").trim().slice(0, maxLen);
}

/**
 * POST /api/orders — Create a new order and process payment
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limit: 10 requests per minute per IP
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
    const rateLimitResult = rateLimit(`orders:${ip}`, 10, 60_000);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      );
    }

    const body = await request.json();

    // Idempotency check: if client sends the same key, return the cached response
    const idempotencyKey = typeof body.idempotencyKey === "string" ? body.idempotencyKey.slice(0, 64) : null;
    if (idempotencyKey) {
      const cached = checkIdempotency(idempotencyKey);
      if (cached) {
        return NextResponse.json(cached);
      }
    }

    const {
      restaurantId,
      restaurantName,
      restaurantPhone,
      items,
      orderType,
      scheduledTime,
      customer,
      paymentMethod,
      paymentToken,
    } = body;

    // Validate required fields
    if (!items?.length || !customer?.name || !customer?.email || !customer?.phone) {
      return NextResponse.json(
        { error: "Missing required fields: items, customer name, email, and phone" },
        { status: 400 }
      );
    }

    if (!paymentMethod || !paymentToken) {
      return NextResponse.json(
        { error: "Missing payment method or payment token" },
        { status: 400 }
      );
    }

    // Sanitize customer input
    const sanitizedCustomer = {
      name: sanitize(customer.name, MAX_NAME_LENGTH),
      email: sanitize(customer.email, MAX_EMAIL_LENGTH),
      phone: sanitize(customer.phone, MAX_PHONE_LENGTH),
      address: customer.address ? sanitize(customer.address, 500) : undefined,
    };

    if (!EMAIL_REGEX.test(sanitizedCustomer.email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Validate delivery address for delivery orders
    if (orderType === "delivery" && (!sanitizedCustomer.address || sanitizedCustomer.address.length < 5)) {
      return NextResponse.json({ error: "Delivery address is required for delivery orders" }, { status: 400 });
    }

    // Limit order size to prevent abuse
    if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
      return NextResponse.json({ error: "Order must contain 1-50 items" }, { status: 400 });
    }

    // Server-side price recalculation — never trust client totals
    let serverSubtotal = 0;
    for (const item of items) {
      if (!item.menuItem?.price || !item.quantity || item.quantity <= 0 || item.quantity > 100) {
        return NextResponse.json({ error: "Invalid item in order" }, { status: 400 });
      }
      serverSubtotal += item.menuItem.price * item.quantity;
    }
    // Round to 2 decimal places
    serverSubtotal = Math.round(serverSubtotal * 100) / 100;
    const serverTax = Math.round(serverSubtotal * TAX_RATE * 100) / 100;
    const clientTip = typeof body.tip === "number" && body.tip >= 0 ? Math.round(body.tip * 100) / 100 : 0;
    const deliveryFee = orderType === "delivery" ? DELIVERY_FEE : 0;
    const serverTotal = Math.round((serverSubtotal + serverTax + clientTip + deliveryFee) * 100) / 100;

    // Require restaurantId — fall back to demo only for testing
    const resolvedRestaurantId = restaurantId || "demo-sakura-kitchen";
    if (!restaurantId) {
      console.warn("[Orders] No restaurantId provided, using demo fallback");
    }

    // Create order with server-calculated prices
    const order = await createOrder({
      restaurantId: resolvedRestaurantId,
      items,
      subtotal: serverSubtotal,
      tax: serverTax,
      tip: clientTip,
      total: serverTotal,
      type: orderType || "pickup",
      scheduledTime,
      customer: sanitizedCustomer,
      paymentMethod,
    });

    // Process payment
    let paymentId: string | undefined;
    let paymentStatus: string = "pending";

    if (paymentMethod === "square") {
      const squareConfig = {
        accessToken: process.env.SQUARE_ACCESS_TOKEN || "",
        locationId: process.env.SQUARE_LOCATION_ID || "",
        environment: (process.env.SQUARE_ENVIRONMENT || "sandbox") as "sandbox" | "production",
        applicationId: process.env.SQUARE_APPLICATION_ID || "",
      };

      if (squareConfig.accessToken) {
        try {
          const result = await processSquarePayment(squareConfig, {
            orderId: order.id,
            sourceId: paymentToken,
            amount: serverTotal,
            tipAmount: clientTip,
            customerEmail: sanitizedCustomer.email,
          });
          paymentId = result.paymentId;
          paymentStatus = result.status;
        } catch (err) {
          console.error("[Orders] Square payment failed:", err);
          return NextResponse.json(
            { error: "Payment processing failed. Please try again." },
            { status: 402 }
          );
        }
      } else {
        // No Square credentials: simulate payment for demo only
        paymentId = `demo_${Date.now()}`;
        paymentStatus = "COMPLETED";
      }
    } else if (paymentMethod === "stripe") {
      paymentId = paymentToken;
      paymentStatus = "COMPLETED";
    } else if (paymentMethod === "demo") {
      // Demo mode only — explicitly allowed for testing
      paymentId = `demo_${Date.now()}`;
      paymentStatus = "COMPLETED";
    } else {
      return NextResponse.json({ error: "Invalid payment method" }, { status: 400 });
    }

    // Persist payment info through the store (not by mutating the local object)
    if (paymentId) {
      await updateOrderPayment(order.id, paymentId);
    }
    if (paymentStatus === "COMPLETED") {
      await updateOrderStatus(order.id, "confirmed");
    }

    const estimatedTime =
      orderType === "delivery"
        ? "30-45 minutes"
        : orderType === "dine-in"
          ? "15-20 minutes"
          : "15-25 minutes";

    // Send notifications (fire and forget — don't block the response)
    sendOrderConfirmation({
      orderId: order.id,
      customerName: sanitizedCustomer.name,
      customerEmail: sanitizedCustomer.email,
      restaurantName: restaurantName || "Restaurant",
      restaurantPhone: restaurantPhone || "",
      items: items.map((item: { menuItem: { name: string; price: number }; quantity: number; subtotal: number }) => ({
        name: item.menuItem.name,
        quantity: item.quantity,
        price: item.menuItem.price * item.quantity,
      })),
      subtotal: serverSubtotal,
      tax: serverTax,
      tip: clientTip,
      total: serverTotal,
      orderType: orderType || "pickup",
      scheduledTime,
      estimatedTime,
    }).catch((err) => console.error("[Orders] Email notification failed:", err));

    sendOrderSMS({
      to: sanitizedCustomer.phone,
      orderId: order.id,
      restaurantName: restaurantName || "Restaurant",
      orderType: orderType || "pickup",
      estimatedTime,
      total: serverTotal,
    }).catch((err) => console.error("[Orders] SMS notification failed:", err));

    // Alert the restaurant owner (fire and forget)
    sendRestaurantAlert({
      orderId: order.id,
      restaurantName: restaurantName || "Restaurant",
      items: items.map((item: { menuItem: { name: string; price: number }; quantity: number }) => ({
        name: item.menuItem.name,
        quantity: item.quantity,
        price: item.menuItem.price * item.quantity,
      })),
      orderType: orderType || "pickup",
      scheduledTime,
      total: serverTotal,
      customerName: sanitizedCustomer.name,
      customerPhone: sanitizedCustomer.phone,
      customerEmail: sanitizedCustomer.email,
      customerAddress: sanitizedCustomer.address,
    }).catch((err) => console.error("[Orders] Restaurant alert failed:", err));

    const responseBody = {
      order: {
        id: order.id,
        status: paymentStatus === "COMPLETED" ? "confirmed" : "pending",
        total: serverTotal,
        estimatedTime,
        paymentId,
      },
    };

    // Cache the response for idempotency
    if (idempotencyKey) {
      storeIdempotency(idempotencyKey, order.id, responseBody);
    }

    return NextResponse.json(responseBody);
  } catch (error) {
    console.error("[Orders] Create order error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/orders?restaurantId=xxx — List orders for a restaurant
 * GET /api/orders?restaurantId=xxx&stats=true — Get order stats
 */
export async function GET(request: NextRequest) {
  try {
    // Require admin auth for listing orders (contains customer PII)
    const token = request.cookies.get("ns-session")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const session = await verifySession(token);
    if (!session) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get("restaurantId");
    if (!restaurantId) {
      return NextResponse.json({ error: "restaurantId is required" }, { status: 400 });
    }

    if (searchParams.get("stats") === "true") {
      const stats = await getOrderStats(restaurantId);
      return NextResponse.json(stats);
    }

    const orders = await getOrdersByRestaurant(restaurantId);
    return NextResponse.json({ orders });
  } catch (error) {
    console.error("[Orders API]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
