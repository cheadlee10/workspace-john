import { NextRequest, NextResponse } from "next/server";
import { getClient, updateClient } from "@/lib/crm/client-store";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const client = await getClient(id);
    if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });
    return NextResponse.json({ client });
  } catch (error) {
    console.error("[Clients API]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const client = await updateClient(id, body);
    if (!client) return NextResponse.json({ error: "Client not found" }, { status: 404 });
    return NextResponse.json({ client });
  } catch (error) {
    console.error("[Clients API]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
