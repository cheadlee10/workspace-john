# Send Ops Queue - Watchdog Execution Sprint (Thu 2026-03-05, PT)

- **Source queue:** `send_ops_queue_2026-03-05_ready.csv`
- **Execution queue:** `send_ops_queue_2026-03-05_watchdog_sendops_exec.csv`
- **Queue size:** **32** leads (all queued)
- **Estimated value in play:** **$31,150**
- **Now-anchor:** 10:40 PT (overdue rows moved into Recovery block)

## Prioritized Message Batches
- **R1_RECOVERY_NOW:** 11 leads | 10:45-11:35 PT | catch-up on overdue P1 + early P2
- **R2_MIDDAY_P2:** 9 leads | 11:35-12:35 PT | remaining P2 call-first
- **R3_AFTERNOON_P3:** 8 leads | 13:30-14:50 PT | P3 volume window
- **R4_LATE_P4:** 4 leads | 16:00-17:00 PT | fallback SMS/DM + final touches

## Channel Mix (primary channel)
- **CALL**: 28/32 (87.5%)
- **SMS**: 2/32 (6.2%)
- **DM**: 2/32 (6.2%)

## Tracking Fields for Response Logging
Included in CSV and ready for live updates:
- `status`, `last_outcome`, `next_action`, `next_action_at_pt`, `response_summary`
- `response_received_at_pt`, `response_channel`, `reply_sentiment`, `meeting_booked_at_pt`
- `do_not_contact`, `touch_count_today`, `last_updated_pt`, `owner`

## Logging Rules
- After each attempt: set `status` + `last_outcome` + `last_updated_pt`.
- If reply received: fill `response_received_at_pt`, `response_channel`, `reply_sentiment`, `response_summary`.
- If meeting booked: set `status=meeting_booked` and `meeting_booked_at_pt`.
- If opt-out/wrong number: set `do_not_contact=true` and `next_action=close_lost`.
