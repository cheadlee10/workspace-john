# Send Ops Queue v41 (Next 24 Hours)

**Window:** Wed 2026-03-04 14:00 PT → Thu 2026-03-05 14:00 PT  
**Objective:** Book fast discovery calls from highest-value, phone-ready leads already in `leads.jsonl`.  
**Context signal from jobs:** Recent paid completion (`job_2026_03_02_001`, $299 Excel Audit) can be used as lightweight proof of execution speed.

## Prioritized Outreach Queue

| Priority | Lead ID | Client | Est. Value | Channel | Message Snippet (first touch) | Send Window (PT) | Follow-up Trigger |
|---|---|---|---:|---|---|---|---|
| 1 | nosite-037 | Regal Roofing & Contracting | $1,500 | Call + SMS | “We help contractors tighten lead-to-estimate follow-up so fewer roofing bids go cold. Quick 10-min ops idea for your team?” | Today 14:05–14:45 | No answer → SMS in 5–10 min; retry call Thu 09:00 PT |
| 2 | nosite-068 | Quality Construction & Roofing | $1,500 | Call + SMS | “I can set up a simple dispatch + pipeline tracker so jobs, estimates, and callbacks stay visible in one place.” | Today 14:20–15:00 | Voicemail → SMS immediately; second attempt Thu 09:30 PT |
| 3 | wa-google-002 | PMC General Contractor | $1,200 | Call + SMS | “Most GCs we talk to lose time in bid/status handoffs—want a lightweight tracker to fix that this week?” | Today 14:40–15:20 | If gatekeeper answers, capture owner name + best callback; SMS summary same day |
| 4 | wa-google-005 | Environment West Landscape Services | $1,000 | Call + SMS | “Quick idea: weekly margin-by-job reporting + crew schedule visibility without changing your whole stack.” | Today 15:00–15:40 | No pickup → SMS; retry Thu 10:00 PT |
| 5 | sprint26-029 | Spokane Landscaping & Maintenance | $1,000 | Call + SMS | “I mapped an ops flow for landscaping teams: crew plan, materials, and job costing in one dashboard.” | Today 15:20–16:00 | No connect → SMS in 10 min; one more call Thu 09:45 PT |
| 6 | sprint26-028 | Freedom Garage Door Services | $950 | Call + SMS | “Can help automate service reminders + dispatch tracking so repeat work and close rates improve.” | Today 15:40–16:20 | Voicemail → SMS + CTA; if silent by Thu 11:00 PT, final call |
| 7 | sprint26-027 | Garage Door Repair Tacoma | $900 | Call + SMS | “We can streamline emergency intake + technician assignment so response times and conversions improve.” | Today 16:00–16:40 | No answer → SMS in 5 min; retry Thu 10:30 PT |
| 8 | sprint11-025 | Dallas Tax and Books | $900 | Call + SMS | “We automate recurring reconciliation/report prep so bookkeeping teams free up billable time fast.” | Today 16:20–17:00 | No answer → SMS; next touch Thu 11:30 PT |
| 9 | sprint26-030 | Accurate Accounting Company, Inc. | $850 | Call + SMS | “I can stand up a month-end checklist + KPI pack workflow so close cycles are cleaner and faster.” | Today 16:40–17:20 | If positive signal, send 2-line scope by SMS; if no response, retry Thu 12:00 PT |
|10| wa-google-001 | PNW Landscaping & Services | $800 | Call + SMS | “Would a simple lead + schedule + follow-up board help your team reduce missed quote opportunities?” | Today 17:00–17:40 | No pickup → SMS; final attempt Thu 09:15 PT |
|11| wave4-044 | Millennium Plumbing Specialist | $700 | Call + SMS | “For 24-hour plumbing shops, we build a lightweight emergency-call tracker to reduce missed high-value jobs.” | Today 17:20–18:00 | If after-hours/no answer, SMS now + call Thu 08:30 PT |
|12| wave4-013 | Precision Plumbing | $500 | Call + SMS | “Quick win: dispatch + callback workflow so leak/drain requests don’t stall between calls.” | Thu 08:45–09:30 | No answer → SMS in 5 min; final nudge Thu 13:00 PT |
|13| wave4-003 | Northwest Plumbing of Tennessee | $500 | Call + SMS | “Can share a simple plumbing ops board to track urgent calls, estimates, and booked jobs in real time.” | Thu 09:30–10:15 | No connect → SMS; one final call Thu 13:30 PT |

---

## Quick Snippets (copy/paste)

**Missed-call SMS:**  
“Hey {{client}}, John from NorthStar Synergy — just tried you. I help {{industry}} teams tighten lead tracking + scheduling so fewer jobs slip. Open to a quick 10-min call this week?”

**Second-touch SMS (next day):**  
“Quick follow-up, {{client}} — I drafted a simple workflow idea for your team (no heavy software change). Worth a 10-min walkthrough?”

## Lightweight Execution Checklist

- [ ] Run queue in priority order (1 → 13).
- [ ] For each lead: place call first; if no connect, send SMS within 5–10 minutes.
- [ ] Log each touch in `leads.jsonl` notes with timestamp + disposition (`no_answer`, `voicemail`, `connected`, `callback_set`, `not_fit`).
- [ ] Move status to `contacted` after first successful touch attempt.
- [ ] If connected: qualify quickly (volume, scheduling pain, follow-up gap, decision-maker).
- [ ] Offer a 10-minute follow-up slot within 24–48 hours.
- [ ] End of run: summarize metrics (calls, SMS, connects, booked callbacks).
