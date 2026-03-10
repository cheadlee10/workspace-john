# Send Ops Queue Brief — 2026-03-05 (PT)

## Ready Queue
- File: `ops/send_queue_2026-03-05.csv`
- Total queued sends: **32**
- Priority split: **P1 = 16**, **P2 = 8**, **P3 = 8**
- Primary channel: **SMS** (100%)
- Secondary channel: **Call** fallback for non-responders in same-day follow-up windows

## Batch Plan (PT)
- **Batch A (09:55–10:16 PT)** — Highest-value automation/accounting/property management leads
- **Batch B (11:05–11:26 PT)** — Plumbing + contractor no-site leads with direct phones
- **Batch C (13:05–13:26 PT)** — WA local landscaping/handyman cluster (phone-first)
- **Batch D (15:10–15:31 PT)** — Geographic expansion + fence/HVAC/pool/lawn opportunities

## Channel Mix Rationale
- Current lead pool has strongest verified coverage on phone numbers (`can_sms`/`can_call`).
- Email is mostly unavailable; DM paths not reliably present in lead records.
- Queue is optimized for immediate execution with direct-response channels.

## Response Logging Fields (use per touch)
- `log_id` (unique)
- `timestamp_pt`
- `queue_id`
- `lead_id`
- `channel` (sms/call)
- `touch_number` (1,2,3)
- `delivery_status` (sent/delivered/failed)
- `response_type` (positive/neutral/negative/no_response)
- `response_summary`
- `next_action` (book_call/followup_24h/followup_72h/archive)
- `next_action_at_pt`
- `owner`

## Suggested Same-Day Follow-up Rules
- No response after SMS in 90–120 min: one call attempt during local business hours.
- Positive response: move to booked call pipeline immediately.
- Negative response: mark DNC and suppress from future outbound.
- Failed delivery: verify number format once; if still fail, mark unreachable.

## Risk Note
- Twilio account may be trial-limited to verified recipients. If blocked, execute same queue via call-first workflow and mark SMS attempts as `failed_trial_restriction`.
