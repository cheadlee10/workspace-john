import { NextRequest, NextResponse } from "next/server";
import { getOrder, updateOrderStatus } from "@/lib/orders/order-store";
import { sendOrderStatusUpdate } from "@/lib/notifications/email";
import { sendStatusUpdateSMS } from "@/lib/notifications/sms";
import { verifySession } from "@/lib/auth/session";
import { getRestaurant } from "@/lib/tenant/restaurant-store";
import type { OrderStatus } from "@/types/restaurant";

/**
 * GET /api/orders/[id] — Get order details and status
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = await getOrder(id);

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // If admin, return full order. Otherwise, return limited tracking info.
    const token = request.cookies.get("ns-session")?.value;
    const session = token ? await verifySession(token) : null;

    if (session) {
      return NextResponse.json({ order });
    }

    // Public: return tracking-safe fields (no customer PII like email/phone/address)
    return NextResponse.json({
      order: {
        id: order.id,
        status: order.status,
        type: order.type,
        items: order.items.map((item: { menuItem: { id: string; name: string }; quantity: number; subtotal: number }) => ({
          menuItem: { id: item.menuItem.id, name: item.menuItem.name },
          quantity: item.quantity,
          subtotal: item.subtotal,
        })),
        subtotal: order.subtotal,
        tax: order.tax,
        tip: order.tip,
        total: order.total,
        scheduledTime: order.scheduledTime,
        paymentMethod: order.paymentMethod,
        customer: { name: order.customer.name },
        createdAt: order.createdAt,
      },
    });
  } catch (error) {
    console.error("[Orders API]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/**
 * PATCH /api/orders/[id] — Update order status (used by restaurant owner dashboard)
 * Note: /api/orders is a public path in middleware (for customer order creation/tracking),
 * so this handler must verify admin session explicitly.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Auth check — this route is not protected by middleware (public /api/orders prefix)
    const token = request.cookies.get("ns-session")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const session = await verifySession(token);
    if (!session) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status } = body as { status: OrderStatus };

    const validStatuses: OrderStatus[] = [
      "pending", "confirmed", "preparing", "ready",
      "out-for-delivery", "completed", "cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    const order = await updateOrderStatus(id, status);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Status update messages for customer notifications
    const statusMessages: Record<string, string> = {
      confirmed: "Your order has been confirmed and is being prepared!",
      preparing: "Your order is being prepared by the kitchen.",
      ready: order.type === "pickup"
        ? "Your order is ready for pickup!"
        : order.type === "delivery"
          ? "Your order is ready and a driver is on the way!"
          : "Your order is ready and will be brought to your table!",
      "out-for-delivery": "Your order is out for delivery!",
      completed: "Your order has been completed. Thank you!",
      cancelled: "Your order has been cancelled. Please contact us with any questions.",
    };

    const message = statusMessages[status];
    if (message && (order.customer.email || order.customer.phone)) {
      // Resolve restaurant name dynamically instead of hardcoding
      const restaurant = await getRestaurant(order.restaurantId);
      const restaurantName = restaurant?.name || "Restaurant";

      if (order.customer.email) {
        sendOrderStatusUpdate({
          customerEmail: order.customer.email,
          customerName: order.customer.name,
          orderId: order.id,
          restaurantName,
          status,
          message,
        }).catch((err) => console.error("[Orders] Status email failed:", err));
      }

      if (order.customer.phone && ["ready", "out-for-delivery"].includes(status)) {
        sendStatusUpdateSMS({
          to: order.customer.phone,
          orderId: order.id,
          restaurantName,
          message,
        }).catch((err) => console.error("[Orders] Status SMS failed:", err));
      }
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error("[Orders API]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
