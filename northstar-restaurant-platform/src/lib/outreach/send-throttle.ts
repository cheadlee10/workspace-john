/**
 * Domain Warmup / Send Throttle
 *
 * Tracks daily email send count and enforces a warmup schedule
 * to protect domain reputation. New domains must ramp slowly.
 *
 * Warmup schedule:
 *   Day 1-7:   5 emails/day
 *   Day 8-14:  10 emails/day
 *   Day 15-21: 20 emails/day
 *   Day 22-28: 35 emails/day
 *   Day 29+:   50 emails/day
 *
 * Uses Supabase daily_send_log table with in-memory fallback.
 * WARMUP_START_DATE env var (ISO date) marks day 1. If not set,
 * defaults to today (conservative: always day 1 limit).
 */

import { getSupabase, isDbEnabled, isTableNotFoundError, markSchemaUnavailable } from "@/lib/db/supabase";

// ---------------------------------------------------------------------------
// In-memory fallback
// ---------------------------------------------------------------------------

const memSendLog = new Map<string, number>(); // date string -> count

// ---------------------------------------------------------------------------
// Warmup schedule
// ---------------------------------------------------------------------------

function getWarmupLimit(): number {
  // Hard override for aggressive sending mode
  const override = Number(process.env.OUTREACH_DAILY_LIMIT || "");
  if (Number.isFinite(override) && override > 0) return Math.floor(override);

  const startDateStr = process.env.WARMUP_START_DATE;
  if (!startDateStr) return 5; // Conservative default if not configured

  const startDate = new Date(startDateStr);
  const now = new Date();
  const daysSinceStart = Math.floor(
    (now.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
  ) + 1; // Day 1 = first day

  if (daysSinceStart <= 7) return 5;
  if (daysSinceStart <= 14) return 10;
  if (daysSinceStart <= 21) return 20;
  if (daysSinceStart <= 28) return 35;
  return 50;
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10); // "2026-03-10"
}

// ---------------------------------------------------------------------------
// Exported functions
// ---------------------------------------------------------------------------

/**
 * Check if we can send another email today based on warmup schedule.
 */
export async function canSendToday(): Promise<boolean> {
  const limit = getWarmupLimit();
  const count = await getTodaySendCount();
  return count < limit;
}

/**
 * Get today's send count.
 */
export async function getTodaySendCount(): Promise<number> {
  const today = todayKey();

  if (isDbEnabled()) {
    const sb = getSupabase()!;
    const { data, error } = await sb
      .from("daily_send_log")
      .select("send_count")
      .eq("date", today)
      .single();

    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else if (error.code === "PGRST116") {
        // No row for today yet
        return 0;
      } else {
        return 0;
      }
    } else if (data) {
      return (data as { send_count: number }).send_count;
    }
  }

  return memSendLog.get(today) || 0;
}

/**
 * Increment today's send count by 1. Call this after every email send.
 */
export async function recordSend(): Promise<void> {
  const today = todayKey();

  if (isDbEnabled()) {
    const sb = getSupabase()!;

    // Try to increment existing row
    const { data: existing } = await sb
      .from("daily_send_log")
      .select("send_count")
      .eq("date", today)
      .single();

    if (existing) {
      const { error } = await sb
        .from("daily_send_log")
        .update({ send_count: (existing as { send_count: number }).send_count + 1 })
        .eq("date", today);
      if (error && isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return;
      }
    } else {
      // Create new row for today
      const { error } = await sb
        .from("daily_send_log")
        .insert({ date: today, send_count: 1 });
      if (error) {
        if (isTableNotFoundError(error)) {
          markSchemaUnavailable();
          // Fall through to in-memory
        }
        // Ignore duplicate key errors (race condition)
      } else {
        return;
      }
    }
  }

  // In-memory fallback
  const current = memSendLog.get(today) || 0;
  memSendLog.set(today, current + 1);
}

/**
 * Get warmup status info for dashboards/debugging.
 */
export async function getWarmupStatus(): Promise<{
  dailyLimit: number;
  sentToday: number;
  remaining: number;
  warmupDay: number;
  startDate: string | null;
}> {
  const limit = getWarmupLimit();
  const sentToday = await getTodaySendCount();
  const startDateStr = process.env.WARMUP_START_DATE || null;

  let warmupDay = 1;
  if (startDateStr) {
    const startDate = new Date(startDateStr);
    warmupDay = Math.max(
      1,
      Math.floor((Date.now() - startDate.getTime()) / (24 * 60 * 60 * 1000)) + 1
    );
  }

  return {
    dailyLimit: limit,
    sentToday,
    remaining: Math.max(0, limit - sentToday),
    warmupDay,
    startDate: startDateStr,
  };
}
