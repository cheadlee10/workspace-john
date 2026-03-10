import { NextRequest, NextResponse } from "next/server";
import { createTicket, getAllTickets, getOpenTickets, getTicketStats } from "@/lib/support/ticket-store";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get("filter"); // "open", "all"
    const stats = searchParams.get("stats");

    if (stats === "true") {
      const response = NextResponse.json(await getTicketStats());
      response.headers.set("Cache-Control", "private, no-store");
      return response;
    }

    const tickets = filter === "open" ? await getOpenTickets() : await getAllTickets();
    const response = NextResponse.json({ tickets });
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  } catch (error) {
    console.error("[Support Tickets API]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientId, clientName, email, subject, message, priority } = body;

    if (!clientName || !email || !subject || !message) {
      return NextResponse.json({ error: "clientName, email, subject, and message are required" }, { status: 400 });
    }

    if (typeof subject !== "string" || subject.length > 500) {
      return NextResponse.json({ error: "subject must be a string of 500 characters or fewer" }, { status: 400 });
    }
    if (typeof message !== "string" || message.length > 5000) {
      return NextResponse.json({ error: "message must be a string of 5000 characters or fewer" }, { status: 400 });
    }

    const ticket = await createTicket({ clientId, clientName, email, subject, message, priority });
    return NextResponse.json({ ticket }, { status: 201 });
  } catch (err) {
    console.error("[Support Tickets POST]", err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
