import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth/session";

const PUBLIC_PATHS = [
  "/admin/login",
  "/api/auth",
  "/api/orders", // Customer-facing: create orders, get order status
  "/api/contact",
  "/api/support/public",
  "/api/webhooks",
];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p));
}

function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://sandbox.web.squarecdn.com https://web.squarecdn.com https://js.stripe.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https://images.unsplash.com https://*.googleusercontent.com https://res.cloudinary.com https://staticmap.openstreetmap.de https://www.openstreetmap.org",
      "media-src 'self' https://res.cloudinary.com https://*.fal.media",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://www.google-analytics.com https://*.squareup.com https://api.stripe.com https://maps.googleapis.com",
      "frame-src https://js.stripe.com https://sandbox.web.squarecdn.com https://web.squarecdn.com https://www.openstreetmap.org",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ")
  );
  return response;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin/* and /api/admin-facing routes
  const isAdminPage = pathname.startsWith("/admin");
  const isProtectedApi =
    pathname.startsWith("/api/crm") ||
    pathname.startsWith("/api/clients") ||
    pathname.startsWith("/api/finance") ||
    pathname.startsWith("/api/support/tickets") ||
    pathname.startsWith("/api/support/faqs") ||
    pathname.startsWith("/api/outreach") ||
    pathname.startsWith("/api/digest") ||
    pathname.startsWith("/api/activity") ||
    pathname.startsWith("/api/sites") ||
    pathname.startsWith("/api/billing");

  if (!isAdminPage && !isProtectedApi) {
    return addSecurityHeaders(NextResponse.next());
  }

  // Allow public paths
  if (isPublicPath(pathname)) {
    return addSecurityHeaders(NextResponse.next());
  }

  // Check session cookie
  const token = request.cookies.get("ns-session")?.value;
  if (!token) {
    if (isAdminPage) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const session = await verifySession(token);
  if (!session) {
    if (isAdminPage) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  return addSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - Static assets (svg, png, jpg, ico, etc.)
     */
    "/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
