# Send Ops Queue — Watchdog Ready (Thu 2026-03-05, PT)

## Ready-to-Execute Artifacts
- Queue CSV: `send_ops_queue_2026-03-05_watchdog_ready.csv`
- Source: `send_ops_queue_2026-03-05_ready.csv` (re-windowed for live execution)
- Total queued today: **32**

## Prioritized Message Batches
- **P1:** 10 leads — high-ticket automation/contractor
- **P2:** 10 leads — strong-fit local services
- **P3:** 8 leads — mid-tier follow-up candidates
- **P4:** 4 leads — fallback + DM cleanup

## Channel Mix
- **CALL-first:** 28/32 (87.5%)
- **SMS-first:** 2/32 (6.2%)
- **DM-first:** 2/32 (6.2%)

## Send Windows (PT)
- **P1 block:** 09:35–10:35
- **P2 block:** 10:35–11:35
- **P3 block:** 13:30–14:34
- **P4 block:** 16:00–16:40
- **Retry/callback block:** 16:40–17:20

## Tracking Fields for Response Logging
Core fields in queue rows:
`status, last_outcome, next_action, next_action_at_pt, response_summary, owner, response_received_at_pt, response_channel, reply_sentiment, meeting_booked_at_pt, do_not_contact, touch_count_today, last_updated_pt`

Recommended response statuses:
`queued, sent_call, sent_sms, sent_dm, replied, qualified, meeting_booked, not_interested, bad_number, do_not_contact`

## Estimated Pipeline Value
- **$31,150**
