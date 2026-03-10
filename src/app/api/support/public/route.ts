import { NextRequest, NextResponse } from "next/server";
import { getPublicFaqs, searchFaqs } from "@/lib/support/faq-store";
import { createTicket } from "@/lib/support/ticket-store";
import { seedAll } from "@/lib/seed/seed-all";
import { rateLimit, getRateLimitHeaders } from "@/lib/security/rate-limit";

// Ensure seed data is loaded
await seedAll();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    const faqs = query ? (await searchFaqs(query)).filter((f) => f.isPublic) : await getPublicFaqs();

    // Group by category
    const categories = new Map<string, typeof faqs>();
    for (const faq of faqs) {
      const cat = categories.get(faq.category) || [];
      cat.push(faq);
      categories.set(faq.category, cat);
    }

    return NextResponse.json({
      faqs,
      categories: Object.fromEntries(categories),
    });
  } catch (error) {
    console.error("[Support Public API]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 5 requests per minute per IP
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
    const rateLimitResult = rateLimit(`support:${ip}`, 5, 60_000);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      );
    }

    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const ticket = await createTicket({
      clientName: name,
      email,
      subject,
      message,
    });

    // If we have an auto-response and Resend is configured, send it
    if (ticket.autoResponse && process.env.RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.SUPPORT_FROM_EMAIL || "support@northstarsynergy.com",
            to: email,
            subject: `Re: ${subject} [${ticket.id}]`,
            text: ticket.autoResponse.replace(/\*\*/g, ""),
          }),
        });
      } catch {
        // Email send failure shouldn't block ticket creation
      }
    }

    return NextResponse.json({
      ticket: {
        id: ticket.id,
        status: ticket.status,
        hasAutoResponse: !!ticket.autoResponse,
      },
      message: ticket.autoResponse
        ? "We've received your request and sent an initial response to your email. We'll follow up if needed within 24 hours."
        : "We've received your request. Our team will respond within 24 hours.",
    }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
