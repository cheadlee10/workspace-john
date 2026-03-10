import { NextRequest, NextResponse } from "next/server";
import {
  getAllRestaurants,
  getRestaurantSummaries,
  getRestaurantDomain,
  createRestaurant,
} from "@/lib/tenant/restaurant-store";
import { getAllTemplates } from "@/lib/tenant/template-registry";
import type { Restaurant } from "@/types/restaurant";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const view = searchParams.get("view");

    if (view === "templates") {
      const response = NextResponse.json({ templates: getAllTemplates() });
      response.headers.set("Cache-Control", "private, no-store");
      return response;
    }

    if (view === "full") {
      const allRests = await getAllRestaurants();
      const restaurants = await Promise.all(allRests.map(async (r) => ({
        ...r,
        domain: await getRestaurantDomain(r.id),
      })));
      const response = NextResponse.json({ restaurants });
      response.headers.set("Cache-Control", "private, no-store");
      return response;
    }

    const response = NextResponse.json({ sites: await getRestaurantSummaries() });
    response.headers.set("Cache-Control", "private, no-store");
    return response;
  } catch (error) {
    console.error("[Sites API]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, slug, type, cuisine, contact, location, branding, domain } = body;

    if (!name || !slug || !type) {
      return NextResponse.json({ error: "name, slug, and type are required" }, { status: 400 });
    }

    if (typeof name !== "string" || name.length > 200) {
      return NextResponse.json({ error: "name must be a string of 200 characters or fewer" }, { status: 400 });
    }
    if (typeof slug !== "string" || slug.length > 100 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return NextResponse.json({ error: "slug must be 100 characters or fewer and contain only lowercase alphanumeric characters and hyphens" }, { status: 400 });
    }
    if (body.description && (typeof body.description !== "string" || body.description.length > 1000)) {
      return NextResponse.json({ error: "description must be a string of 1000 characters or fewer" }, { status: 400 });
    }

    const id = "rest-" + Math.random().toString(36).slice(2, 8);
    const now = new Date().toISOString().split("T")[0];

    const restaurant: Restaurant = {
      id,
      name,
      slug,
      description: body.description || "",
      tagline: body.tagline,
      cuisine: cuisine || ["other"],
      type,
      contact: contact || { phone: "" },
      hours: body.hours || [
        { day: "monday", open: "11:00", close: "21:00", closed: false },
        { day: "tuesday", open: "11:00", close: "21:00", closed: false },
        { day: "wednesday", open: "11:00", close: "21:00", closed: false },
        { day: "thursday", open: "11:00", close: "21:00", closed: false },
        { day: "friday", open: "11:00", close: "22:00", closed: false },
        { day: "saturday", open: "11:00", close: "22:00", closed: false },
        { day: "sunday", open: "12:00", close: "20:00", closed: false },
      ],
      location: location || { address: "", city: "", state: "", zip: "", lat: 0, lng: 0, isFixed: true },
      branding: branding || {
        primaryColor: "#1a1a2e",
        secondaryColor: "#16213e",
        accentColor: "#e74c3c",
        backgroundColor: "#ffffff",
        textColor: "#1a1a2e",
        fontHeading: "system-ui, sans-serif",
        fontBody: "system-ui, sans-serif",
        template: type,
      },
      socialMedia: body.socialMedia || {},
      features: body.features || {
        tier: "starter",
        onlineOrdering: true,
        loyaltyProgram: false,
        reservations: false,
        giftCards: false,
        emailMarketing: false,
        smsMarketing: false,
        qrOrdering: false,
        cateringPortal: false,
        multiLanguage: false,
        posIntegration: false,
        deliveryIntegration: false,
        foodTruckFeatures: false,
      },
      menu: body.menu || { sections: [], lastUpdated: now },
      createdAt: now,
      updatedAt: now,
    };

    await createRestaurant(restaurant, domain);

    return NextResponse.json({ restaurant }, { status: 201 });
  } catch (err) {
    console.error("[Sites POST]", err);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
