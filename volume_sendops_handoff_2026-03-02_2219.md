# Volume SendOps Handoff - 2026-03-02 22:19 PST

## Status
- **Transition complete:** recovery wave moved back to volume staging.
- **Tracker source of truth:** `outbound_send_tracker_2026-03-02.json`
- **Total queued first touches:** 177
- **Auto-send:** disabled globally (`auto_send_enabled=false` / `send_ready=false` until Gate 4 unlock)

## Scheduled Send Windows (local lead timezone)
| Window | Leads | Unlock by | Send window | Notes |
|---|---:|---|---|---|
| A | 12 | 08:35 | 08:45-16:00 | Legacy batch |
| B | 10 | 16:10 | 16:20-17:05 | Legacy batch |
| C | 1 | 15:20 | 15:30-17:30 | Legacy batch |
| C2 | 4 | 17:00 | 17:10-17:25 | Legacy batch |
| D | 5 | 17:20 | 17:30-17:50 | Legacy batch |
| Q1 | 58 | 10:05 | 10:15-16:40 | Volume tranche 1 |
| Q2 | 87 | 14:00 | 14:10-16:40 | Volume tranche 2 |

## Follow-up Timing Policy (already written per lead)
- **FU-1:** +24h (same local daypart, channel swap if no response)
- **FU-2:** +72h (call + VM or nudge email)
- **FU-3:** +7d (breakup SMS/email with CTA keyword `SITE`)

## Approval Gates (safe dispatch)
1. **Gate 1 — Data QA:** complete
2. **Gate 2 — Message QA:** complete
3. **Gate 3 — Throughput QA:** complete
4. **Gate 4 — Manual unlock:** pending per window (required before any sends)

## Dispatch Guardrails
- No window may send unless Gate 4 is explicitly flipped to go.
- If a window is blocked at unlock checkpoint:
  - keep `send_ready=false`
  - record defer reason
  - defer to next business day, same window profile
- Capture for each lead after first touch: channel, outcome, timestamp, and FU schedule confirmation.

## Timezone Distribution (for staffing awareness)
- America/Los_Angeles: 67
- America/New_York: 38
- America/Chicago: 34
- America/Phoenix: 22
- America/Boise: 12
- America/Denver: 3
- America/Detroit: 1

## Operator Checklist Before Launch
- [ ] Confirm Gate 4 decision for each active window
- [ ] Confirm sender capacity for both volume tranches (Q1/Q2)
- [ ] Confirm bounce/reply monitoring is staffed during active windows
- [ ] Confirm defer queue path is ready for blocked windows
- [ ] Confirm end-of-day tracker writeback is enabled
