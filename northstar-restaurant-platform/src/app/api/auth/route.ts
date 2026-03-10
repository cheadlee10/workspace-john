import { NextRequest, NextResponse } from "next/server";
import {
  validateCredentials,
  createSession,
  getSessionCookieConfig,
  getLogoutCookieConfig,
  getSessionFromRequest,
} from "@/lib/auth/session";
import { rateLimit, getRateLimitHeaders } from "@/lib/security/rate-limit";

// Account lockout: track failed login attempts per email
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60_000; // 15 minutes

const failedAttempts = new Map<string, { count: number; lockedUntil: number }>();

function checkLockout(email: string): { locked: boolean; remainingMs: number } {
  const entry = failedAttempts.get(email.toLowerCase());
  if (!entry) return { locked: false, remainingMs: 0 };
  if (entry.lockedUntil > Date.now()) {
    return { locked: true, remainingMs: entry.lockedUntil - Date.now() };
  }
  // Lockout expired — clear
  if (entry.lockedUntil > 0) {
    failedAttempts.delete(email.toLowerCase());
  }
  return { locked: false, remainingMs: 0 };
}

function recordFailedAttempt(email: string): void {
  const key = email.toLowerCase();
  const entry = failedAttempts.get(key) || { count: 0, lockedUntil: 0 };
  entry.count += 1;
  if (entry.count >= MAX_FAILED_ATTEMPTS) {
    entry.lockedUntil = Date.now() + LOCKOUT_DURATION_MS;
    console.warn(`[Auth] Account locked: ${key} after ${entry.count} failed attempts`);
  }
  failedAttempts.set(key, entry);
}

function clearFailedAttempts(email: string): void {
  failedAttempts.delete(email.toLowerCase());
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 10 requests per minute per IP
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
    const rateLimitResult = rateLimit(`auth:${ip}`, 10, 60_000);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: getRateLimitHeaders(rateLimitResult) }
      );
    }

    const body = await request.json();
    const { action, email, password } = body;

    if (action === "login") {
      if (!email || !password) {
        return NextResponse.json({ error: "Email and password required" }, { status: 400 });
      }

      // Check account lockout before attempting validation
      const lockout = checkLockout(email);
      if (lockout.locked) {
        const minutes = Math.ceil(lockout.remainingMs / 60_000);
        return NextResponse.json(
          { error: `Account temporarily locked. Try again in ${minutes} minute${minutes !== 1 ? "s" : ""}.` },
          { status: 429 }
        );
      }

      if (!validateCredentials(email, password)) {
        recordFailedAttempt(email);
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }

      // Successful login — clear any failed attempts
      clearFailedAttempts(email);

      const token = await createSession(email);
      const response = NextResponse.json({ success: true });
      const cookie = getSessionCookieConfig(token);
      response.cookies.set(cookie.name, cookie.value, {
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
        sameSite: cookie.sameSite,
        maxAge: cookie.maxAge,
        path: cookie.path,
      });
      return response;
    }

    if (action === "logout") {
      const response = NextResponse.json({ success: true });
      const cookie = getLogoutCookieConfig();
      response.cookies.set(cookie.name, cookie.value, {
        httpOnly: cookie.httpOnly,
        secure: cookie.secure,
        sameSite: cookie.sameSite,
        maxAge: cookie.maxAge,
        path: cookie.path,
      });
      return response;
    }

    if (action === "check") {
      const session = await getSessionFromRequest(request);
      if (session) {
        return NextResponse.json({ authenticated: true, email: session.email });
      }
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
