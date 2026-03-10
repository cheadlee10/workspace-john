# Send Ops Queue v42 (Next 24 Hours)

**Window:** Wed 2026-03-04 14:10 PT → Thu 2026-03-05 14:10 PT  
**Objective:** Prioritize phone-ready outreach to highest-value leads with immediate call + SMS cadence.  
**Data basis:** `leads.jsonl` (focus on `outreach_usable: true` and phone-present records) + recent delivery proof in `jobs.jsonl` (`job_2026_03_02_001`, paid $299).

## Prioritized Outreach Queue

| Priority | Lead ID | Client | Est. Value | Channel | Message Snippet (first touch) | Send Window (PT) | Follow-up Trigger |
|---|---|---|---:|---|---|---|---|
| 1 | nosite-037 | Regal Roofing & Contracting | $1,500 | Call + SMS | “Quick idea for roofing ops: centralize inbound leads + estimate follow-up so fewer bids go cold. Open to 10 min?” | Wed 14:15–14:45 | No answer → SMS in 5 min; retry Thu 09:00 |
| 2 | nosite-068 | Quality Construction & Roofing | $1,500 | Call + SMS | “We help contractors tighten dispatch + estimate tracking with a lightweight workflow your team can use immediately.” | Wed 14:35–15:05 | Voicemail → SMS immediately; retry Thu 09:30 |
| 3 | wa-google-002 | PMC General Contractor | $1,200 | Call + SMS | “Most GCs lose margin in handoff gaps—want a simple tracker for bids, change orders, and callbacks?” | Wed 14:55–15:25 | Gatekeeper/no connect → SMS recap; retry Thu 10:00 |
| 4 | wa-google-005 | Environment West Landscape Services | $1,000 | Call + SMS | “I can map a simple crew schedule + job-cost visibility board so less time is lost between jobs.” | Wed 15:15–15:45 | No pickup → SMS in 10 min; retry Thu 10:30 |
| 5 | wave4-013 | Precision Plumbing | $500 | Call + SMS | “For plumbing teams, we set up fast dispatch + callback flow so leak/drain calls don’t stall.” | Wed 15:35–16:00 | No answer → SMS in 5 min; retry Thu 08:45 |
| 6 | wave4-003 | Northwest Plumbing of Tennessee | $500 | Call + SMS | “Can share a quick ops template for urgent calls, quote follow-up, and booked jobs in one view.” | Wed 16:00–16:25 | Voicemail → SMS; retry Thu 09:15 |
| 7 | wa-google-001 | PNW Landscaping & Services | $800 | Call + SMS | “Would a simple lead + scheduling board help reduce missed quote opportunities this week?” | Wed 16:25–16:50 | No connect → SMS; retry Thu 11:00 |
| 8 | wa-google-003 | Joc's Landscaping | $750 | Call + SMS | “I help landscaping crews tighten quote-to-schedule handoff so more estimates convert.” | Wed 16:50–17:15 | No answer → SMS; retry Thu 11:30 |
| 9 | wa-google-006 | Keith's Lawn & Landscape | $750 | Call + SMS | “Quick win: clearer weekly pipeline + follow-up cadence so leads don’t drop after first call.” | Wed 17:15–17:40 | Voicemail → SMS; retry Thu 12:00 |
|10| wa-google-004 | Family Lawn Services | $700 | Call + SMS | “Can I send a 1-page workflow to tighten lead response + scheduling for your team?” | Wed 17:40–18:05 | No answer → SMS; retry Thu 12:30 |
|11| wa-google-007 | The Honest Handyman & Hauling LLC | $700 | Call + SMS | “For handyman teams, we simplify intake, quoting, and follow-up so fewer small jobs are lost.” | Thu 08:30–09:00 | No connect → SMS in 5 min; final retry Thu 13:00 |
|12| nosite-109 | San Diego Heating and Cooling | $900 | Call + SMS | “I can help HVAC teams track urgent calls + quote follow-up in one lightweight dashboard.” | Thu 09:00–09:30 | No answer → SMS; retry Thu 13:30 |
|13| nosite-101 | Cedar Fencing Plus | $800 | Call + SMS | “Fence contractors we support improve close rates by tightening estimate follow-up timing.” | Thu 09:30–10:00 | No answer → SMS; final retry Thu 14:00 |
|14| nosite-102 | Austin's Custom Fencing | $800 | Call + SMS | “Would a simple quote pipeline + reminder flow help you recover unclosed fencing bids?” | Thu 10:00–10:30 | No connect → SMS; final retry next cycle |

---

## Copy/Paste SMS Snippets

**Missed-call SMS (primary):**  
“Hey {{client}}, John with NorthStar Synergy — just tried you. I help {{industry}} businesses tighten lead follow-up + scheduling so fewer jobs slip. Open to a quick 10-min call?”

**Follow-up SMS (next touch):**  
“Quick follow-up, {{client}} — I drafted a simple workflow idea for your team (no heavy software change). Worth a short walkthrough today?”

## Lightweight Execution Checklist

- [ ] Work top-down by priority (1→14) inside the listed send windows.
- [ ] Call first, then send SMS within 5–10 minutes if no live connect.
- [ ] Log each touch in `leads.jsonl` notes: timestamp, channel, outcome (`no_answer`, `voicemail`, `connected`, `callback_set`, `not_fit`).
- [ ] Update lead status to `contacted` after first completed touch attempt.
- [ ] If connected, qualify fast: inbound volume, scheduling pain, follow-up gaps, decision-maker.
- [ ] Offer a 10-minute follow-up call within 24–48 hours.
- [ ] End-of-window rollup: total calls, SMS sent, live connects, callbacks booked.
