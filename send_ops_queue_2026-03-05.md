# Send-Ops Outbound Queue — 2026-03-05 (PT)

## Ready-to-Execute Plan
- **Total queued leads:** 40
- **Priority mix:** P1=12 | P2=14 | P3=14
- **Timezone mix:** PT=19 | MT=7 | CT=9 | ET=5
- **Primary channel:** Call-first
- **Secondary channel:** SMS fallback within same window if no answer
- **Tertiary channel:** Next-day follow-up SMS (+ Yelp message where available)

## Batch Windows (PT)
- **Batch A (P1, first 12):** 08:40-12:00 PT (ET→CT→MT)
- **Batch B (P2, next 14):** 11:40-14:30 PT (MT→PT overlap)
- **Batch C (P3, final 14):** 12:45-16:30 PT (CT/MT/PT second touches)

## Execution Guardrails
1. Call attempt first (max 45s ring / one VM drop).
2. If no pickup, send short SMS in same window (<=160 chars, business name included, no shortened links).
3. Mark response outcome immediately using queue tracking fields.
4. Book callbacks into `next_action_due_pt` before moving to next lead.

## Tracking Fields Included (CSV)
`status, response_status, response_time_pt, next_action, next_action_due_pt, notes`

## Files
- `send_ops_queue_2026-03-05.csv`
- `send_ops_queue_2026-03-05.md`
