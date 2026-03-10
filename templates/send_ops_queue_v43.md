# Send Ops Queue v43 (Next 24 Hours)

**Window:** Wed 2026-03-04 14:30 PT → Thu 2026-03-05 14:30 PT  
**Objective:** Run a tight 24-hour call/SMS sprint on phone-verified, high-value leads first.  
**Data basis:** `leads.jsonl` (prioritized `outreach_usable: true`, phone-present records, with wave4 phone-ready leads weighted up) + `jobs.jsonl` recent paid proof (`job_2026_03_02_001`, $299).

## Prioritized Outreach Queue

| Priority | Lead ID | Client | Est. Value | Channel | Message Snippet (first touch) | Send Window (PT) | Follow-up Trigger |
|---|---|---|---:|---|---|---|---|
| 1 | nosite-037 | Regal Roofing & Contracting | $1,500 | Call + SMS | “I help roofing teams tighten estimate follow-up so fewer bids die after first contact. Open to 10 minutes?” | Wed 14:35–15:00 | No answer → SMS in 5 min; retry Thu 09:00 |
| 2 | nosite-068 | Quality Construction & Roofing | $1,500 | Call + SMS | “Quick idea: one lightweight board for inbound leads, estimates, and callbacks so jobs stop slipping.” | Wed 15:00–15:25 | Voicemail/no pickup → SMS immediately; retry Thu 09:30 |
| 3 | wa-google-002 | PMC General Contractor | $1,200 | Call + SMS | “Most GCs lose margin at handoff—want a simple bid-to-job tracking flow your team can use this week?” | Wed 15:25–15:50 | Gatekeeper/no connect → SMS recap; retry Thu 10:00 |
| 4 | wa-google-005 | Environment West Landscape Services | $1,000 | Call + SMS | “I can map a simple crew scheduling + quote follow-up workflow to recover missed revenue.” | Wed 15:50–16:15 | No answer → SMS in 10 min; retry Thu 10:30 |
| 5 | nosite-109 | San Diego Heating and Cooling | $900 | Call + SMS | “For HVAC teams, we centralize urgent call intake and quote follow-up so dispatch stays clean.” | Wed 16:15–16:40 | No pickup → SMS in 5 min; retry Thu 11:00 |
| 6 | wa-google-001 | PNW Landscaping & Services | $800 | Call + SMS | “Quick win for landscaping: faster lead response + estimate reminders so fewer jobs go cold.” | Wed 16:40–17:00 | No connect → SMS; retry Thu 11:30 |
| 7 | wa-google-003 | Joc's Landscaping | $750 | Call + SMS | “I help crews improve quote-to-schedule conversion with a simple follow-up cadence.” | Wed 17:00–17:20 | Voicemail → SMS; retry Thu 12:00 |
| 8 | wa-google-006 | Keith's Lawn & Landscape | $750 | Call + SMS | “Would a lightweight pipeline for new calls, estimates, and booked jobs help this week?” | Wed 17:20–17:40 | No answer → SMS; retry Thu 12:30 |
| 9 | wave4-013 | Precision Plumbing | $500 | Call + SMS | “Plumbing teams we support book more jobs by tightening dispatch + missed-call follow-up.” | Thu 08:30–09:00 | No answer → SMS in 5 min; retry Thu 13:00 |
| 10 | wave4-003 | Northwest Plumbing of Tennessee | $500 | Call + SMS | “I’ve got a simple urgent-call + quote follow-up flow that works well for plumbing shops.” | Thu 09:00–09:30 | Voicemail → SMS immediately; retry Thu 13:20 |
| 11 | wa-google-004 | Family Lawn Services | $700 | Call + SMS | “Can I share a 1-page workflow that helps lawn crews close more of the quotes they already have?” | Thu 09:30–10:00 | No answer → SMS; retry Thu 13:40 |
| 12 | wa-google-007 | The Honest Handyman & Hauling LLC | $700 | Call + SMS | “For handyman operators, we simplify intake, quoting, and callback follow-up without adding heavy software.” | Thu 10:00–10:30 | No pickup → SMS; retry Thu 14:00 |
| 13 | nosite-101 | Cedar Fencing Plus | $800 | Call + SMS | “Fence contractors usually gain quick wins from tighter estimate reminders and clearer next-step tracking.” | Thu 10:30–11:00 | No answer → SMS; final retry Thu 14:15 |
| 14 | nosite-102 | Austin's Custom Fencing | $800 | Call + SMS | “I can send a fast template to improve quote follow-up timing and boost close rate.” | Thu 11:00–11:30 | No connect → SMS; final retry next cycle |

---

## Copy/Paste SMS Snippets

**Missed-call SMS (primary):**  
“Hey {{client}}, John with NorthStar Synergy — just tried you. I help {{industry}} teams tighten lead follow-up + scheduling so fewer jobs slip. Open to a quick 10-min call?”

**Second-touch SMS (same day/next window):**  
“Quick follow-up, {{client}} — I drafted a simple workflow idea to improve callbacks + quote conversion without changing your whole process. Worth a short walkthrough?”

## Lightweight Execution Checklist

- [ ] Work queue top-down by priority during the listed windows.
- [ ] Call first; if no live connect, send SMS within 5–10 minutes.
- [ ] Log outcome in `leads.jsonl` notes: timestamp, channel, result (`no_answer`, `voicemail`, `connected`, `callback_set`, `not_fit`).
- [ ] After first touch attempt, move lead status to `contacted`.
- [ ] If connected: qualify quickly on lead volume, follow-up gaps, scheduling pain, and decision-maker access.
- [ ] Book a 10-minute follow-up within 24–48 hours when interest is positive.
- [ ] End of 24-hour window: summarize totals (calls, SMS, connects, callbacks booked) for next send-ops cycle.
