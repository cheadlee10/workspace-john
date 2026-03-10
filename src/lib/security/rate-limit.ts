/**
 * In-memory sliding window rate limiter.
 *
 * Uses a Map to track request timestamps per identifier (IP or key).
 * Expired entries are cleaned up automatically every 60 seconds.
 *
 * No external dependencies required.
 */

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

// Each identifier maps to an array of request timestamps (epoch ms)
const requestLog = new Map<string, number[]>();

// Auto-cleanup expired entries every 60 seconds
const CLEANUP_INTERVAL_MS = 60_000;

let cleanupTimer: ReturnType<typeof setInterval> | null = null;

function ensureCleanupTimer() {
  if (cleanupTimer) return;
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, timestamps] of requestLog) {
      // Keep only timestamps that are still within any reasonable window (max 5 min)
      const filtered = timestamps.filter((t) => now - t < 5 * 60_000);
      if (filtered.length === 0) {
        requestLog.delete(key);
      } else {
        requestLog.set(key, filtered);
      }
    }
    // If the map is empty, stop the timer to avoid keeping the process alive
    if (requestLog.size === 0 && cleanupTimer) {
      clearInterval(cleanupTimer);
      cleanupTimer = null;
    }
  }, CLEANUP_INTERVAL_MS);
  // Allow the Node.js process to exit even if the timer is running
  if (cleanupTimer && typeof cleanupTimer === "object" && "unref" in cleanupTimer) {
    cleanupTimer.unref();
  }
}

/**
 * Check whether a request from the given identifier is within the rate limit.
 *
 * @param identifier - Unique key for the requester (e.g. IP address)
 * @param limit      - Maximum number of requests allowed in the window
 * @param windowMs   - Sliding window duration in milliseconds
 * @returns            Result with success flag, remaining quota, and reset timestamp
 */
export function rateLimit(
  identifier: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  ensureCleanupTimer();

  const now = Date.now();
  const windowStart = now - windowMs;

  // Get existing timestamps and prune those outside the current window
  const timestamps = (requestLog.get(identifier) || []).filter(
    (t) => t > windowStart,
  );

  if (timestamps.length >= limit) {
    // Rate limited — calculate when the oldest request in the window expires
    const oldestInWindow = timestamps[0];
    const resetAt = oldestInWindow + windowMs;

    // Store the pruned list back (don't add the current request)
    requestLog.set(identifier, timestamps);

    return {
      success: false,
      remaining: 0,
      resetAt,
    };
  }

  // Allow the request — record this timestamp
  timestamps.push(now);
  requestLog.set(identifier, timestamps);

  return {
    success: true,
    remaining: limit - timestamps.length,
    resetAt: now + windowMs,
  };
}

/**
 * Build standard rate-limit response headers from a RateLimitResult.
 */
export function getRateLimitHeaders(
  result: RateLimitResult,
): Record<string, string> {
  return {
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.ceil(result.resetAt / 1000)),
    "Retry-After": result.success
      ? ""
      : String(Math.ceil((result.resetAt - Date.now()) / 1000)),
  };
}
