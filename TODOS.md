# TODOS

## ~~DONE: Verify northstarsynergy.org domain in Resend~~ ✓
Confirmed verified by Craig on 2026-03-18.

## Re-enable sequences + digest crons in vercel.json
**What:** Add back the cron entries for `/api/cron/sequences` (was hourly) and `/api/cron/digest` (was weekly Monday 9am UTC) to vercel.json.
**Why:** Both were disabled on 2026-03-18 to stop bouncing emails. The sequences cron advances enrollment steps in the outreach pipeline. The digest cron generates and emails the weekly business summary.
**Pros:** Restores automated outreach pipeline and weekly reporting.
**Cons:** If re-enabled before prerequisites are met, digest will send to nowhere useful without DIGEST_RECIPIENT_EMAIL set correctly.
**Context:** The sequences cron doesn't actually send email via Resend (just records events in DB), so it could be re-enabled once DB password is reset. The digest cron sends email, so it needs DB + DIGEST_RECIPIENT_EMAIL set to a valid address.
**Depends on:** (1) Reset Supabase DB password.
