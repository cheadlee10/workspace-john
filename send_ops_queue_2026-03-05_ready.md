# Send Ops Queue — Ready to Execute (Thu 2026-03-05, PT)

## Deliverables
- **Execution queue CSV:** `send_ops_queue_2026-03-05_ready.csv`
- **Source normalized from:** `outbound_send_queue_2026-03-05.csv`
- **Total queued:** **32 leads**

## Priority Batches
- **P1 (10 leads):** high-ticket first-touch (roofing, contractor, automation)
- **P2 (10 leads):** strong-fit service businesses
- **P3 (8 leads):** mid-tier follow-up candidates
- **P4 (4 leads):** lower-ticket / fallback slots

## Channel Mix (today)
- **Call-first:** 28/32 (**87.5%**) 
- **SMS-first:** 2/32 (**6.25%**)
- **Directory/DM fallback:** 2/32 (**6.25%**)

> Execution rule: for call-first rows, send SMS 2–5 min after no-answer. DM rows are low-priority fallback only.

## Send Windows (PT)
- **Batch A / P1:** 08:50–10:30
- **Batch B / P2:** 10:30–12:00
- **Batch C / P3:** 13:30–15:00
- **Batch D / P4:** 16:00–17:15

## Tracking Fields Included (for response logging)
Required fields are present in queue rows:
- `status`
- `last_outcome`
- `next_action`
- `next_action_at_pt`
- `response_summary`
- `owner`

Added operational response fields for clean logging:
- `response_received_at_pt`
- `response_channel`
- `reply_sentiment`
- `meeting_booked_at_pt`
- `do_not_contact`
- `touch_count_today`
- `last_updated_pt`

## Quick Logging Taxonomy
- **status:** queued | sent_call | sent_sms | sent_dm | replied | qualified | meeting_booked | not_interested | bad_number | do_not_contact
- **last_outcome:** no_answer | live_no_pitch | pitched | callback_requested | positive_reply | negative_reply | wrong_number
- **next_action:** retry_call | send_sms | send_dm | schedule_meeting | nurture | close_lost

## Estimated Pipeline Value
- **$31,150** total estimated value across the 32 queued records.
