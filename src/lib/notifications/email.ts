/**
 * Email Notifications via Resend
 *
 * Sends order confirmation and status update emails.
 * Uses Resend API (set RESEND_API_KEY env var).
 */

interface OrderEmailData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  restaurantName: string;
  restaurantPhone: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  orderType: "pickup" | "delivery" | "dine-in";
  scheduledTime?: string;
  estimatedTime: string;
}

export async function sendOrderConfirmation(data: OrderEmailData): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[Email] RESEND_API_KEY not set, skipping email");
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  const itemRows = data.items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px 0;border-bottom:1px solid #f0f0f0">${item.quantity}x ${item.name}</td>
          <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;text-align:right">$${item.price.toFixed(2)}</td>
        </tr>`
    )
    .join("");

  const typeLabel =
    data.orderType === "pickup"
      ? "Pickup"
      : data.orderType === "delivery"
        ? "Delivery"
        : "Dine-In";

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:500px;margin:0 auto;color:#1a1a2e">
      <div style="text-align:center;padding:24px 0">
        <h1 style="margin:0;font-size:24px">${data.restaurantName}</h1>
      </div>

      <div style="background:#f8f9fa;border-radius:12px;padding:24px;text-align:center;margin-bottom:24px">
        <div style="font-size:36px;margin-bottom:8px">&#10003;</div>
        <h2 style="margin:0 0 4px;font-size:20px">Order Confirmed!</h2>
        <p style="margin:0;color:#666;font-size:14px">Order #${data.orderId}</p>
      </div>

      <div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:20px;margin-bottom:16px">
        <p style="margin:0 0 4px;font-size:13px;color:#888;text-transform:uppercase;letter-spacing:0.5px">${typeLabel}</p>
        <p style="margin:0;font-size:16px;font-weight:600">
          ${data.scheduledTime ? `Scheduled: ${data.scheduledTime}` : `Estimated: ${data.estimatedTime}`}
        </p>
      </div>

      <div style="border:1px solid #e5e7eb;border-radius:12px;padding:20px;margin-bottom:16px">
        <h3 style="margin:0 0 12px;font-size:14px;color:#888;text-transform:uppercase;letter-spacing:0.5px">Your Order</h3>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          ${itemRows}
        </table>
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:12px">
          <tr><td style="padding:4px 0;color:#888">Subtotal</td><td style="text-align:right;color:#888">$${data.subtotal.toFixed(2)}</td></tr>
          <tr><td style="padding:4px 0;color:#888">Tax</td><td style="text-align:right;color:#888">$${data.tax.toFixed(2)}</td></tr>
          ${data.tip > 0 ? `<tr><td style="padding:4px 0;color:#888">Tip</td><td style="text-align:right;color:#888">$${data.tip.toFixed(2)}</td></tr>` : ""}
          <tr><td style="padding:8px 0 0;font-weight:700;font-size:16px;border-top:2px solid #e5e7eb">Total</td><td style="padding:8px 0 0;font-weight:700;font-size:16px;text-align:right;border-top:2px solid #e5e7eb">$${data.total.toFixed(2)}</td></tr>
        </table>
      </div>

      <div style="text-align:center;padding:16px 0;color:#888;font-size:13px">
        <p>Questions? Call <a href="tel:${data.restaurantPhone}" style="color:#c0392b">${data.restaurantPhone}</a></p>
        <p style="margin-top:12px;font-size:11px;color:#bbb">Powered by NorthStar Synergy</p>
      </div>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `${data.restaurantName} <orders@northstarsynergy.org>`,
        to: data.customerEmail,
        subject: `Order Confirmed - #${data.orderId}`,
        html,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      return { success: true, messageId: result.id };
    }
    return { success: false, error: result.message || "Failed to send email" };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function sendOrderStatusUpdate(params: {
  customerEmail: string;
  customerName: string;
  orderId: string;
  restaurantName: string;
  status: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { success: false, error: "RESEND_API_KEY not configured" };

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:500px;margin:0 auto">
      <h2 style="margin:0 0 8px">${params.restaurantName}</h2>
      <p style="color:#888;font-size:14px">Order #${params.orderId}</p>
      <div style="background:#f8f9fa;border-radius:12px;padding:24px;margin:16px 0;text-align:center">
        <h3 style="margin:0 0 8px;font-size:18px">${params.message}</h3>
      </div>
      <p style="font-size:11px;color:#bbb;text-align:center">Powered by NorthStar Synergy</p>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `${params.restaurantName} <orders@northstarsynergy.org>`,
        to: params.customerEmail,
        subject: `Order Update - #${params.orderId}`,
        html,
      }),
    });

    return { success: response.ok };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}
