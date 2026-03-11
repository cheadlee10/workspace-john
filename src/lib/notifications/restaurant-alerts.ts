/**
 * Restaurant Owner Alert Notifications
 *
 * Notifies restaurant owner via SMS AND email simultaneously
 * when a new order comes in. Uses Twilio for SMS and Resend for email.
 */

import { registerOrderAlert } from "@/app/api/webhooks/twilio/route";

interface OrderAlertData {
  orderId: string;
  restaurantName: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  orderType: "pickup" | "delivery" | "dine-in";
  scheduledTime?: string;
  total: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress?: string;
}

/**
 * Send SMS + email alert to restaurant owner for a new order.
 * Fire-and-forget — callers should .catch() errors.
 */
export async function sendRestaurantAlert(
  data: OrderAlertData,
  ownerPhone?: string,
  ownerEmail?: string
): Promise<void> {
  const alertPhone = ownerPhone || process.env.RESTAURANT_ALERT_PHONE;
  const alertEmail = ownerEmail || process.env.RESTAURANT_ALERT_EMAIL;

  const promises: Promise<unknown>[] = [];

  if (alertPhone) {
    registerOrderAlert(alertPhone, data.orderId);
    promises.push(sendAlertSMS(data, alertPhone));
  }
  if (alertEmail) {
    promises.push(sendAlertEmail(data, alertEmail));
  }

  if (promises.length === 0) {
    console.warn("[RestaurantAlerts] No RESTAURANT_ALERT_PHONE or RESTAURANT_ALERT_EMAIL configured");
    return;
  }

  await Promise.allSettled(promises);
}

async function sendAlertSMS(data: OrderAlertData, to: string): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    console.warn("[RestaurantAlerts] Twilio not configured, skipping SMS alert");
    return;
  }

  const typeLabel = data.orderType === "pickup" ? "Pickup" : data.orderType === "delivery" ? "Delivery" : "Dine-in";
  const timeLabel = data.scheduledTime ? `Scheduled: ${data.scheduledTime}` : "ASAP";

  const itemList = data.items
    .map((item) => `  ${item.quantity}x ${item.name}`)
    .join("\n");

  const body = [
    `NEW ORDER — ${data.restaurantName}`,
    `Order #${data.orderId}`,
    itemList,
    `Type: ${typeLabel}`,
    `Time: ${timeLabel}`,
    `Total: $${data.total.toFixed(2)}`,
    `Customer: ${data.customerName}, ${data.customerPhone}`,
    `Reply CONFIRM to accept`,
  ].join("\n");

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
      },
      body: new URLSearchParams({ To: to, From: fromNumber, Body: body }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    console.error("[RestaurantAlerts] SMS alert failed:", err);
  }
}

async function sendAlertEmail(data: OrderAlertData, to: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[RestaurantAlerts] RESEND_API_KEY not configured, skipping email alert");
    return;
  }

  const typeLabel = data.orderType === "pickup" ? "Pickup" : data.orderType === "delivery" ? "Delivery" : "Dine-in";
  const timeLabel = data.scheduledTime || "ASAP";
  const adminUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "https://northstar-restaurant-platform.vercel.app"}/admin/orders`;

  const itemRows = data.items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0">${item.quantity}x ${item.name}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;text-align:right">$${item.price.toFixed(2)}</td>
        </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:500px;margin:0 auto;color:#1a1a2e">
      <div style="background:#1a1a2e;padding:20px;text-align:center;border-radius:12px 12px 0 0">
        <h1 style="margin:0;color:white;font-size:20px">New Order #${data.orderId}</h1>
        <p style="margin:4px 0 0;color:rgba(255,255,255,0.7);font-size:14px">${data.restaurantName}</p>
      </div>

      <div style="border:1px solid #e5e7eb;border-top:none;padding:24px;border-radius:0 0 12px 12px">
        <div style="display:flex;justify-content:space-between;margin-bottom:16px">
          <div>
            <p style="margin:0;font-size:13px;color:#888;text-transform:uppercase;letter-spacing:0.5px">${typeLabel}</p>
            <p style="margin:4px 0 0;font-size:16px;font-weight:600">${timeLabel}</p>
          </div>
          <div style="text-align:right">
            <p style="margin:0;font-size:13px;color:#888">Total</p>
            <p style="margin:4px 0 0;font-size:24px;font-weight:700">$${data.total.toFixed(2)}</p>
          </div>
        </div>

        <table style="width:100%;border-collapse:collapse;font-size:14px;margin:16px 0">
          <tr style="background:#f8f9fa">
            <th style="padding:8px 12px;text-align:left;font-weight:600;font-size:12px;text-transform:uppercase;color:#888">Item</th>
            <th style="padding:8px 12px;text-align:right;font-weight:600;font-size:12px;text-transform:uppercase;color:#888">Price</th>
          </tr>
          ${itemRows}
        </table>

        <div style="background:#f8f9fa;border-radius:8px;padding:12px 16px;margin:16px 0">
          <p style="margin:0;font-size:13px;color:#888">Customer</p>
          <p style="margin:4px 0 0;font-size:15px;font-weight:600">${data.customerName}</p>
          <p style="margin:2px 0 0;font-size:14px;color:#555">${data.customerPhone}</p>
          <p style="margin:2px 0 0;font-size:14px;color:#555">${data.customerEmail}</p>
          ${data.customerAddress ? `<p style="margin:2px 0 0;font-size:14px;color:#555">${data.customerAddress}</p>` : ""}
        </div>

        <a href="${adminUrl}" style="display:block;text-align:center;background:#16a34a;color:white;padding:14px 24px;border-radius:8px;font-size:16px;font-weight:700;text-decoration:none;margin-top:20px">
          CONFIRM ORDER
        </a>
      </div>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: `${data.restaurantName} Orders <orders@northstarsynergy.com>`,
      to,
      subject: `New order #${data.orderId} — $${data.total.toFixed(2)}`,
      html,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("[RestaurantAlerts] Email alert failed:", err);
  }
}
