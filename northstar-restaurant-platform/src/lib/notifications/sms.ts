/**
 * SMS Notifications via Twilio
 *
 * Sends order confirmation and status update SMS.
 * Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER env vars.
 */

export async function sendOrderSMS(params: {
  to: string;
  orderId: string;
  restaurantName: string;
  orderType: "pickup" | "delivery" | "dine-in";
  estimatedTime: string;
  total: number;
}): Promise<{ success: boolean; error?: string }> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    console.warn("[SMS] Twilio credentials not set, skipping SMS");
    return { success: false, error: "Twilio not configured" };
  }

  const typeLabel =
    params.orderType === "pickup"
      ? "pickup"
      : params.orderType === "delivery"
        ? "delivery"
        : "dine-in";

  const body = `${params.restaurantName}: Order #${params.orderId} confirmed! Your ${typeLabel} order ($${params.total.toFixed(2)}) will be ready in ~${params.estimatedTime}. Thank you!`;

  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
        },
        body: new URLSearchParams({
          To: params.to,
          From: fromNumber,
          Body: body,
        }),
      }
    );

    return { success: response.ok };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function sendStatusUpdateSMS(params: {
  to: string;
  orderId: string;
  restaurantName: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    return { success: false, error: "Twilio not configured" };
  }

  const body = `${params.restaurantName}: Order #${params.orderId} - ${params.message}`;

  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
        },
        body: new URLSearchParams({
          To: params.to,
          From: fromNumber,
          Body: body,
        }),
      }
    );

    return { success: response.ok };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}
