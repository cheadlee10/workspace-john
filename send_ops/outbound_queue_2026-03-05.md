# Outbound Send Queue — 2026-03-05 (PT)

Total queued: **36** usable leads
- Channel mix target: **70% SMS-first, 30% call-first**
- Follow-up rule: no response in 24h -> Day+1 follow-up; no response in 72h -> Day+3 bump; Day+10 close-loop

## B1 — 10:00-11:15 PT
- Volume: 12 leads
- Execution mode: SMS-first + call follow-up (priority high)

## B2 — 12:45-14:00 PT
- Volume: 12 leads
- Execution mode: Call-first for no-answer SMS fallback

## B3 — 15:30-17:00 PT
- Volume: 12 leads
- Execution mode: Last-touch same-day + follow-up scheduling

## Tracking fields (log after each touch)
`outcome` (sent|delivered|failed|replied|wrong_number|do_not_contact), `response_time`, `next_step`, `next_touch_due`

CSV: `send_ops/outbound_queue_2026-03-05.csv`