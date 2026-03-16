import { NextRequest, NextResponse } from "next/server";
import { getSupabase, isDbEnabled, isTableNotFoundError } from "@/lib/db/supabase";

const CREATE_SQL = `create table if not exists onboarding_submissions (
  id uuid primary key default gen_random_uuid(),
  restaurant_slug text not null,
  restaurant_name text not null,
  owner_name text not null,
  owner_email text not null,
  owner_phone text,
  payload jsonb not null,
  created_at timestamptz not null default now()
);`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body?.restaurantSlug || !body?.restaurantName || !body?.ownerName || !body?.ownerEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!isDbEnabled()) {
      return NextResponse.json({ error: "Database not configured" }, { status: 500 });
    }

    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ error: "Database unavailable" }, { status: 500 });

    const insertPayload = {
      restaurant_slug: body.restaurantSlug,
      restaurant_name: body.restaurantName,
      owner_name: body.ownerName,
      owner_email: body.ownerEmail,
      owner_phone: body.ownerPhone || null,
      payload: body,
    };

    const { error } = await supabase.from("onboarding_submissions").insert(insertPayload);
    if (error) {
      if (isTableNotFoundError(error)) {
        return NextResponse.json(
          {
            error: "onboarding_submissions table missing",
            migrationSql: CREATE_SQL,
          },
          { status: 500 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await supabase
      .from("leads")
      .update({ stage: "onboarding_complete", updated_at: new Date().toISOString() })
      .eq("restaurant_name", body.restaurantName);

    const resendKey = process.env.RESEND_API_KEY;
    const to = ["chead@me.com", "john@northstarsynergy.org"];
    if (resendKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "NorthStar Onboarding <hello@northstarsynergy.org>",
          to,
          subject: `Onboarding complete: ${body.restaurantName}`,
          html: `<p><strong>${body.restaurantName}</strong> submitted onboarding.</p><p>Owner: ${body.ownerName} (${body.ownerEmail})</p><p>Ordering: ${body.onlineOrdering}</p>`,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Submit failed" }, { status: 500 });
  }
}
