# Outbound System — 500 Sends in 2–3 Days (Safe Mode)

## Goal
Deliver **500 total outbound sends** in 48–72 hours while protecting sender reputation.

## Non-Negotiable Safety Rules
1. Only contact leads with a legitimate business relevance and visible public business contact path.
2. Never send to purchased personal lists.
3. Suppress immediately on: bounce, unsubscribe, explicit “stop,” complaint, or legal risk.
4. Use plain-language opt-out in every sequence.
5. Cap touches to max 3 per lead in this 72-hour sprint.

## Channel Mix (Recommended)
- **Primary:** Email (70%)
- **Secondary:** SMS/call-triggered follow-up where permitted (30%)
- Target split for 500 sends:
  - Email: 350
  - SMS/call-text follow-up: 150

## Warmup-Safe Pacing Plan (3-Day Version)
### Day 1 (Warm)
- 120 sends total (84 email / 36 SMS)
- 6 batches × 20 sends
- 20–30 min between batches

### Day 2 (Scale)
- 170 sends total (119 email / 51 SMS)
- 8–9 batches × 20 sends
- 15–25 min between batches

### Day 3 (Finish)
- 210 sends total (147 email / 63 SMS)
- 10–11 batches × 20 sends
- 10–20 min between batches

**Total: 500**

## 2-Day Aggressive (Only if metrics are green)
- Day 1: 200
- Day 2: 300
- Only allowed if Day 1 hard metrics pass (see stop-rules).

## Batch Execution SOP
For each batch:
1. Pull next 20 leads with valid contact channel and no suppression flags.
2. Validate no prior hard bounce/unsubscribe/negative reply.
3. Send with lightweight personalization token (business name + service + city).
4. Log each send row immediately in tracker.
5. Wait the configured cooldown window.
6. Run batch health check before next batch.

## Message Framework (Short)
- Subject/opening: specific business context.
- 1 concrete value point (e.g., missed leads from no web presence).
- 1 simple CTA.
- 1 opt-out line.

## Bounce Protection
- Pre-send checks: syntax + duplicate + suppression list + prior thread status.
- Auto-tag invalid domains and role-risk emails (info@, admin@ can be used but monitored tightly).
- Hard bounce => immediate suppression forever for this sprint.
- Soft bounce => retry once after 24h; suppress if repeated.

## Tracking Model (Required Fields)
Use `templates/outbound-500-tracker.csv` with these outputs:
- send_count, delivered_count, hard_bounce_count, soft_bounce_count
- open_count (email), reply_count, positive_reply_count
- unsubscribe_count, complaint_count
- batch_id, channel, lead_id, timestamp, template_id, status

## KPI Targets (Daily Review)
- Delivery rate >= 96%
- Hard bounce rate < 2.0%
- Reply rate >= 3%
- Positive reply rate >= 0.8%
- Unsubscribe rate < 1.0%
- Complaint/spam rate < 0.1%

## Hard Stop-Rules (Instant Pause)
Pause all outbound if any condition is true:
1. Hard bounce rate >= 3.0% in last 100 sends
2. Complaint rate >= 0.15% in last 200 sends
3. Unsubscribe rate >= 2.0% same day
4. Positive reply rate < 0.3% after first 200 sends
5. Consecutive batch degradation in deliverability for 3 batches

When paused:
- Stop new sends
- Diagnose list/source/template/channel
- Remove risky segments
- Resume with 50-send probation block only

## Daily Review Checklist (15 min)
1. Total sends vs plan
2. Delivery and bounce trend by channel
3. Open rate by template
4. Replies and positive replies by segment
5. Suppression growth (bounces, opt-outs)
6. Next-day batch size decision (up/hold/down)

## Implementation Steps (Workspace)
1. **Lead segmentation:** use `leads.jsonl` and mark each lead with channel readiness + suppression state.
2. **Tracker setup:** fill `templates/outbound-500-tracker.csv` per send.
3. **Batch control:** use `scripts/outbound_guardrails.py` after each batch to compute GO/HOLD/STOP.
4. **Template control:** run max 2 templates/day to isolate performance.
5. **Ops cadence:** execute batches in 2-3 hour windows; review midday + EOD.

## Send Plan Grid (Ready-to-Run)
- B1–B6 Day1: 20 each
- B7–B15 Day2: 20 each (+ one 10-send mini batch)
- B16–B26 Day3: 20 each (+ one 10-send mini batch)

## Positive Reply Definition
Count as positive only if lead indicates intent: asks for pricing, demo, call scheduling, or next-step details.

## Minimum Reporting Block (post after each day)
- Sends: X / target
- Delivered: X (rate)
- Hard bounces: X (rate)
- Replies: X (rate)
- Positive replies: X (rate)
- Unsubscribes: X (rate)
- Status: GO / HOLD / STOP
