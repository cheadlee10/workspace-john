# Immediate Outreach Queue - 2026-03-02 (Recovery Wave -> 2026-03-03 Sends)

> **2026-03-02 22:19 PST UPDATE — Transition to Volume Active**
>
> Queue is now staged at **137 total first touches** under `outbound_send_tracker_2026-03-02.json`.
> - Legacy windows: A(12), B(10), C(1), C2(4), D(5)
> - Volume windows: Q1(52), Q2(53)
> - Gate status: G1/G2/G3 complete, **G4 pending manual unlock per window**
> - Follow-up timing remains enforced per lead: FU-1 (+24h), FU-2 (+72h), FU-3 (+7d)
>
> Use this markdown as historical queue context; treat the JSON tracker as source of truth for execution.


## Window Plan (America/Los_Angeles)
- **Window A (High-connect calls):** 2026-03-03 08:45-11:15 local lead timezone (unlock decision by **08:35**)
- **Window B (Email/SMS first touch):** 2026-03-03 11:30-13:30 local lead timezone (unlock decision by **11:20**)
- **Window C (Second call sweep):** 2026-03-03 15:30-17:30 local lead timezone (unlock decision by **15:20**)

## Approval Gates (must pass before send)
1. **Gate 1 - Data QA (COMPLETE):** phone/email format valid, service + geo fit, no duplicate outreach in last 7 days
2. **Gate 2 - Message QA (COMPLETE):** correct service script + business name token check
3. **Gate 3 - Throughput QA (COMPLETE):** cap at 20 first touches/day, max 8 per 90-minute block
4. **Gate 4 - Human unlock (PENDING):** final manual go/no-go before each window opens

---

## Queue (20 leads)

| Priority | Lead ID | Business | Channel Plan | Send Window | FU-1 | FU-2 | FU-3 | Approval |
|---|---|---|---|---|---|---|---|---|
| P1 | gpass-pnw-220 | Quality Pacific Roofing | Email -> Call | A | +24h 09:20 local | +72h 10:20 | +7d 09:40 | G1-G4 |
| P1 | gpass-pnw-201 | Done Right Works | Email -> Call | A | +24h 09:30 local | +72h 10:10 | +7d 10:00 | G1-G4 |
| P1 | gpass-pnw-230 | Neighborly Fencing | Email -> Call | A | +24h 09:40 local | +72h 10:40 | +7d 09:50 | G1-G4 |
| P1 | gpass-pnw-214 | Forever Roofing | Email -> Call | A | +24h 09:50 local | +72h 10:50 | +7d 10:10 | G1-G4 |
| P1 | gpass-pnw-219 | A Better Roofing Company | Email -> Call | A | +24h 10:00 local | +72h 11:00 | +7d 10:20 | G1-G4 |
| P1 | gpass-pnw-224 | Greenscape Landscaping of Spokane | Email -> Call | A | +24h 10:10 local | +72h 11:10 | +7d 10:30 | G1-G4 |
| P1 | gpass-wa-202 | PNW Lawncare | Email -> SMS | B | +24h 11:40 local | +72h 12:10 | +7d 11:30 | G1-G4 |
| P1 | gpass-wa-203 | Frontier Landscaping | Email -> Call | B | +24h 11:50 local | +72h 12:20 | +7d 11:45 | G1-G4 |
| P1 | gpass-wa-204 | Nam's Landscaping LLC | Email -> SMS | B | +24h 12:00 local | +72h 12:30 | +7d 12:00 | G1-G4 |
| P1 | gpass-pnw-213 | Handyman Rescue Team | Email -> Call | B | +24h 12:10 local | +72h 12:40 | +7d 12:15 | G1-G4 |
| P1 | gpass-pnw-231 | The Portland Handyman | Email -> SMS | B | +24h 12:20 local | +72h 12:50 | +7d 12:30 | G1-G4 |
| P1 | gpass-pnw-232 | Ryan Hall Handyman and Construction Services, LLC | Email -> SMS | B | +24h 12:30 local | +72h 13:00 | +7d 12:40 | G1-G4 |
| P2 | gpass-pnw-233 | Hard Rock Fencing | Email -> Call | C | +24h 15:40 local | +72h 16:10 | +7d 15:50 | G1-G4 |
| P2 | gpass-wa-205 | Nasim Landscape | Email -> Call | C | +24h 15:50 local | +72h 16:20 | +7d 16:00 | G1-G4 |
| P2 | gpass-pnw-208 | Lobo Roofing LLC | Email -> Call | C | +24h 16:00 local | +72h 16:30 | +7d 16:10 | G1-G4 |
| P2 | gpass-pnw-215 | Seattle Pros LLC | Email -> SMS | C | +24h 16:10 local | +72h 16:40 | +7d 16:20 | G1-G4 |
| P2 | gpass-pnw-217 | McKenzie Roofing Inc. | Email -> Call | C | +24h 16:20 local | +72h 16:50 | +7d 16:30 | G1-G4 |
| P2 | gpass-pnw-218 | Pro Fence Solutions | Email -> Call | C | +24h 16:30 local | +72h 17:00 | +7d 16:40 | G1-G4 |
| P2 | gpass-pnw-229 | Huckleberry Fence & Deck | Email -> Call | C | +24h 16:40 local | +72h 17:10 | +7d 16:50 | G1-G4 |
| P2 | gpass-pnw-236 | BEST Roofing & Waterproofing | Email -> Call | C | +24h 16:50 local | +72h 17:20 | +7d 17:00 | G1-G4 |

---

## Follow-up timing standard
- **FU-1 (+24h):** same local-daypart as first touch, swap channel if no response
- **FU-2 (+72h):** call + VM (or short nudge email if email-only response path)
- **FU-3 (+7d):** breakup SMS/email with explicit CTA keyword (`SITE`)

## Tracker writeback requirements
For each lead, log before day close:
- `first_touch_channel`
- `first_touch_outcome`
- `first_touch_ts_local`
- `followup_1_at_local`
- `followup_2_at_local`
- `followup_3_at_local`
- `window_id`
- `gate4_unlock_by`

## Queue completion criteria
- 20/20 first touches logged with outcome
- all FU timestamps written to tracker
- non-responsive leads moved to FU sequence automatically after Gate 4 review
- any blocked lead carries explicit defer reason + next eligible window

## Send-ops normalization (prep complete)
- **Lead timezone normalization:** all 20 queued leads mapped to `America/Los_Angeles` for 2026-03-03 dispatch.
- **Per-lead window fields written:** `window_id`, `send_after_local`, `send_before_local`, `gate4_unlock_by_local`.
- **Approval gate state written per lead:** G1/G2/G3 = complete, G4 = pending manual unlock.
- **Follow-up schedule writeback ready:** exact `followup_1_at_local`, `followup_2_at_local`, `followup_3_at_local` values staged in tracker + queue records.
- **Dispatch protection:** `send_ready=false` until Gate 4 go/no-go is recorded for each window.
