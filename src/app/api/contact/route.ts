import { NextRequest, NextResponse } from "next/server";
import { rateLimit, getRateLimitHeaders } from "@/lib/security/rate-limit";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function safe(value: unknown): string {
  return escapeHtml(String(value || "N/A"));
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 requests per minute per IP
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
    const rateLimitResult = rateLimit(`contact:${ip}`, 5, 60_000);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      );
    }

    const body = await request.json();
    const { name, email, phone, message, mode, restaurantName, restaurantEmail, ...extra } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      // Dev mode: no email service configured
      console.warn("[Contact Form] Received submission (RESEND_API_KEY not set)");
      return NextResponse.json({ success: true, demo: true });
    }

    // Build email body based on mode (all user input escaped to prevent XSS)
    const safeName = safe(name);
    const safeEmail = safe(email);
    const safePhone = safe(phone);
    const safeMessage = safe(message);
    const safeRestaurantName = safe(restaurantName);

    let subject = `New message from ${safeName}`;
    let htmlBody = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto">
        <h2 style="margin:0 0 16px">${mode === "reservation" ? "Reservation Request" : mode === "catering" ? "Catering Inquiry" : "Contact Form"}</h2>
        <table style="width:100%;font-size:14px;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#888;width:120px">Name</td><td style="padding:8px 0">${safeName}</td></tr>
          <tr><td style="padding:8px 0;color:#888">Email</td><td style="padding:8px 0">${safeEmail}</td></tr>
          ${phone ? `<tr><td style="padding:8px 0;color:#888">Phone</td><td style="padding:8px 0">${safePhone}</td></tr>` : ""}
    `;

    if (mode === "reservation") {
      subject = `Reservation request from ${safeName}`;
      htmlBody += `
          <tr><td style="padding:8px 0;color:#888">Date</td><td style="padding:8px 0">${safe(extra.date)}</td></tr>
          <tr><td style="padding:8px 0;color:#888">Time</td><td style="padding:8px 0">${safe(extra.time)}</td></tr>
          <tr><td style="padding:8px 0;color:#888">Party Size</td><td style="padding:8px 0">${safe(extra.partySize)}</td></tr>
      `;
    } else if (mode === "catering") {
      subject = `Catering inquiry from ${safeName}`;
      htmlBody += `
          <tr><td style="padding:8px 0;color:#888">Event Date</td><td style="padding:8px 0">${safe(extra.eventDate)}</td></tr>
          <tr><td style="padding:8px 0;color:#888">Guests</td><td style="padding:8px 0">${safe(extra.guestCount)}</td></tr>
          <tr><td style="padding:8px 0;color:#888">Event Type</td><td style="padding:8px 0">${safe(extra.eventType)}</td></tr>
          <tr><td style="padding:8px 0;color:#888">Budget</td><td style="padding:8px 0">${safe(extra.budget)}</td></tr>
      `;
    }

    htmlBody += `
        </table>
        <div style="margin-top:16px;padding:16px;background:#f8f9fa;border-radius:8px">
          <p style="margin:0 0 4px;color:#888;font-size:12px">Message</p>
          <p style="margin:0;white-space:pre-wrap">${safeMessage}</p>
        </div>
        <p style="margin-top:16px;font-size:11px;color:#bbb">Sent via ${safeRestaurantName} website &middot; Powered by NorthStar Synergy</p>
      </div>
    `;

    const fallbackEmail = process.env.CONTACT_FORM_EMAIL || "hello@northstarsynergy.com";
    const toEmail = (restaurantEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(restaurantEmail))
      ? restaurantEmail
      : fallbackEmail;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: `${restaurantName} Website <noreply@northstarsynergy.com>`,
        to: toEmail,
        reply_to: email,
        subject,
        html: htmlBody,
      }),
    });

    if (response.ok) {
      return NextResponse.json({ success: true });
    }

    const result = await response.json();
    return NextResponse.json({ error: result.message || "Failed to send" }, { status: 500 });
  } catch (error) {
    console.error("[Contact API]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
