# Send Ops Queue — Thu 2026-03-05 (PT)

## Ready-to-Execute Files
1. `send_ops_queue_2026-03-05.csv` (34 records) — **SMS + Call** queue with PT send windows and response logging fields.
2. `send_ops_yelp_queue_2026-03-05.csv` (20 records) — **Yelp DM** queue for high-intent leads missing phone.

## Priority Batches (Execution Order)

### Batch 1 — P1 Revenue-Weighted (6 leads)
- Focus: highest-ticket + fastest close potential (`auto-*` + roofing)
- Channels: SMS first, call follow-up in +2 hours if no reply
- Windows (PT):
  - CT leads: **08:35–09:20**, **10:20–11:05**
  - PT leads: **10:35–11:20**, **13:20–14:05**

### Batch 2 — P2/P3 Home-Service Phone Leads (28 leads)
- Focus: landscaping, fencing, handyman, pest, HVAC, pool
- Channels: SMS first, call follow-up same day
- Windows (PT by local timezone):
  - ET: **07:35–08:20**, **09:20–10:05**
  - CT: **08:35–09:20**, **10:20–11:05**
  - MT: **09:35–10:20**, **11:20–12:05**
  - PT: **10:35–11:20**, **13:20–14:05**

### Batch 3 — Yelp DM Recovery Queue (20 leads)
- Focus: wave4 high-intent plumbers with no phone on record
- Channels: Yelp DM primary, Yelp quote request secondary
- Window (PT): **14:15–15:00**
- Next-step rule: enrich phone overnight; move to SMS queue tomorrow AM

## Channel Mix (Today)
- **SMS:** 34
- **Call follow-up:** 34 (conditional on no reply)
- **Yelp DM:** 20

## Tracking Fields Included (CSV)
- `queue_id`, `priority_tier`, `priority_score`
- `lead_id`, `client`, `service`, `estimated_value`, `location`
- `timezone_local`, `channel_primary`, `channel_secondary`, `phone/profile_url`
- `send_window_pt`, `batch`, `message_template`
- `status`, `sent_at_pt`
- `reply_received`, `reply_at_pt`, `reply_type`
- `next_action`, `next_action_due_pt`, `owner`

## Suggested Status Values
- queued
- sent
- replied_positive
- replied_neutral
- replied_negative
- no_reply
- do_not_contact

## Follow-Up SLA
- No reply after first SMS: call in +2 hours (business-hour safe)
- No answer after call: final follow-up SMS next business day at 09:30 local
- Positive reply: book call same day, convert to proposal pipeline
