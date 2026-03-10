# Send Ops Queue ? 2026-03-05 (PT)

Total queued: **22**

## Mix
- Priority: P1 2, P2 13, P3 7
- Channel: SMS 12, CALL 6, SMS+CALL 4
- Timezone coverage: CT 3, PT 8, MT 6, ET 5

## Send Windows (PT)
- ET targets: 06:10?07:50 primary, 10:20?11:10 secondary
- CT targets: 07:10?08:50 primary, 11:20?12:10 secondary
- MT targets: 08:10?09:50 primary, 12:20?13:10 secondary
- PT targets: 09:10?10:50 primary, 13:10?14:00 secondary

## Batch Execution Order
1. Batch A (06:10?07:50): ET P1/P2 first, then ET P3
2. Batch B (07:10?08:50): CT P1/P2 first, then CT P3
3. Batch C (08:10?10:50): MT then PT priority stack
4. Batch D (10:20?14:00): Secondary retries + call follow-ups for non-responders

## Tracking Fields (already in CSV)
- status, attempt_1_ts_pt, attempt_1_outcome
- reply_ts_pt, reply_type
- next_action, next_action_due_pt

## Response Logging Rules
- Positive reply: set `reply_type=interested`, `next_action=book_call`, due within 30 min.
- Neutral/question: `reply_type=question`, `next_action=answer_and_offer_demo`, due within 20 min.
- Not now: `reply_type=later`, set follow-up +7 days at 09:30 local.
- No response after primary: schedule secondary window same day.
- No response after secondary: set follow-up D+3 per cadence.