# Send Ops Queue v44 (Next 24 Hours)

**Window:** Wed 2026-03-04 14:40 PT → Thu 2026-03-05 14:40 PT  
**Objective:** Prioritize phone-verified, higher-ticket home-service leads first; execute call-first with SMS fallback in tight blocks.  
**Data basis:** `leads.jsonl` (records with `outreach_usable: true` and valid phone) + `jobs.jsonl` proof of paid delivery (`job_2026_03_02_001`, $299).

## Prioritized Outreach Queue

| Priority | Lead ID | Client | Est. Value | Channel | Message Snippet (first touch) | Send Window (PT) | Follow-up Trigger |
|---|---|---|---:|---|---|---|---|
| 1 | nosite-037 | Regal Roofing & Contracting | $1,500 | Call + SMS | “I help roofing teams stop estimate leakage with a simple follow-up system. Open to a quick 10-minute call?” | Wed 14:45–15:05 | No pickup/VM → SMS in 5 min; retry Thu 09:00 |
| 2 | nosite-068 | Quality Construction & Roofing | $1,500 | Call + SMS | “Quick idea for your crew: one lightweight board for inbound leads, estimates, and callbacks so jobs stop slipping.” | Wed 15:05–15:25 | No connect → SMS immediately; retry Thu 09:30 |
| 3 | wa-google-002 | PMC General Contractor | $1,200 | Call + SMS | “GCs usually lose margin at handoff. Want a simple bid-to-job tracking flow your team can use this week?” | Wed 15:25–15:45 | Gatekeeper/no answer → SMS recap; retry Thu 10:00 |
| 4 | wa-google-005 | Environment West Landscape Services | $1,000 | Call + SMS | “I can map a simple quote-to-schedule flow to recover missed landscaping revenue fast.” | Wed 15:45–16:05 | No answer → SMS in 10 min; retry Thu 10:30 |
| 5 | nosite-109 | San Diego Heating and Cooling | $900 | Call + SMS | “For HVAC teams, we tighten urgent-call intake and quote follow-up so dispatch stays clean.” | Wed 16:05–16:25 | No pickup → SMS in 5 min; retry Thu 11:00 |
| 6 | wa-google-001 | PNW Landscaping & Services | $800 | Call + SMS | “Quick win for landscaping: faster lead response plus estimate reminders so fewer jobs go cold.” | Wed 16:25–16:45 | No connect → SMS; retry Thu 11:30 |
| 7 | wa-google-003 | Joc's Landscaping | $750 | Call + SMS | “I help crews improve quote-to-schedule conversion with a simple callback cadence.” | Wed 16:45–17:05 | Voicemail → SMS; retry Thu 12:00 |
| 8 | wa-google-006 | Keith's Lawn & Landscape | $750 | Call + SMS | “Would a lightweight pipeline for new calls, estimates, and booked jobs help this week?” | Wed 17:05–17:25 | No answer → SMS; retry Thu 12:20 |
| 9 | wa-google-007 | The Honest Handyman & Hauling LLC | $700 | Call + SMS | “For handyman ops, we simplify intake, quoting, and follow-up without heavy software.” | Wed 17:25–17:45 | No pickup → SMS; retry Thu 12:40 |
| 10 | wa-google-004 | Family Lawn Services | $700 | Call + SMS | “Can I share a 1-page workflow that helps lawn crews close more existing quotes?” | Wed 17:45–18:00 | No answer → SMS; retry Thu 13:00 |
| 11 | wave4-013 | Precision Plumbing | $500 | Call + SMS | “Plumbing shops usually book more jobs by tightening missed-call and dispatch follow-up.” | Thu 08:30–08:50 | No pickup → SMS in 5 min; retry Thu 13:20 |
| 12 | wave4-003 | Northwest Plumbing of Tennessee | $500 | Call + SMS | “I’ve got a simple urgent-call + quote follow-up flow that works well for plumbing teams.” | Thu 08:50–09:10 | Voicemail → SMS immediately; retry Thu 13:35 |
| 13 | wave3-007 | Dazco Plumbing | $350 | Call + SMS | “Quick process tweak: faster callback + quote tracking to lift booked jobs without extra admin.” | Thu 09:10–09:30 | No answer → SMS; retry Thu 13:50 |
| 14 | wave3-006 | Garrico Plumbing | $350 | Call + SMS | “I can share a short workflow that helps plumbing businesses convert more inbound calls to paid jobs.” | Thu 09:30–09:50 | No connect → SMS; retry Thu 14:05 |
| 15 | wave3-010 | Garman Plumbing | $350 | Call + SMS | “Would a simple lead/dispatch board help your team stop losing track of estimates and callbacks?” | Thu 09:50–10:10 | No answer → SMS; retry Thu 14:20 |
| 16 | wave3-180 | Stat Plumbing | $350 | Call + SMS | “I help local plumbing operators tighten follow-up timing so more quote requests turn into booked work.” | Thu 10:10–10:30 | No answer → SMS; final retry next cycle |

---

## Quick SMS Fallback Snippets

**Missed-call SMS:**  
“Hey {{client}}, John with NorthStar Synergy — just tried you. I help {{industry}} teams tighten follow-up + scheduling so fewer jobs slip. Open to a quick 10-min call?”

**Second-touch SMS:**  
“Quick follow-up, {{client}} — I drafted a simple idea to improve callbacks and quote conversion without changing your whole process. Worth a short walkthrough?”

## Lightweight Execution Checklist

- [ ] Run queue in order during listed windows (call first, SMS fallback second).
- [ ] Send fallback SMS within 5–10 minutes of missed call.
- [ ] Log each touch in `leads.jsonl` notes: timestamp, channel, and outcome (`no_answer`, `voicemail`, `connected`, `callback_set`, `not_fit`).
- [ ] Move touched leads to `contacted` after first attempt.
- [ ] If connected: qualify on lead volume, follow-up gaps, and decision-maker access in <10 minutes.
- [ ] Book next call inside 24–48 hours for positive responses.
- [ ] End of window: summarize totals (calls, SMS, connects, callbacks booked) for v45 queueing.