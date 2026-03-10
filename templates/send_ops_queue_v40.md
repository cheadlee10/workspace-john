# Send Ops Queue v40 (Next 24 Hours)

**Window:** Wed 2026-03-04 14:00 PT → Thu 2026-03-05 14:00 PT  
**Objective:** Max booked discovery calls from highest-value, phone-ready leads.  
**Channel strategy:** **Call-first**, then SMS follow-up within 5–10 min if no pickup.

## Prioritized Outreach Queue

| Priority | Lead ID | Client | Est. Value | Channel | Message Snippet (first touch) | Send Window (PT) | Follow-up Trigger |
|---|---|---|---:|---|---|---|---|
| 1 | sprint26-029 | Spokane Landscaping & Maintenance | $1,000 | Call + SMS | “Quick idea: we can automate crew scheduling + job-cost tracking so you see margin per job weekly.” | Today 14:00–15:00 | If no answer: SMS in 10 min; if no reply by tomorrow 09:30 PT, 2nd call |
| 2 | sprint26-028 | Freedom Garage Door Services | $950 | Call + SMS | “I help service companies automate dispatch + maintenance reminders to drive repeat revenue without extra admin.” | Today 14:15–15:15 | If voicemail: SMS immediately; retry call tomorrow 10:00 PT |
| 3 | sprint26-027 | Garage Door Repair Tacoma | $900 | Call + SMS | “We can set up emergency call logging + tech assignment tracking in one sheet, same-day deploy.” | Today 14:30–15:30 | No connect → SMS in 5 min; no response in 18h → final call |
| 4 | sprint11-025 | Dallas Tax and Books | $900 | Call + SMS | “I build lightweight workflow automations for tax/bookkeeping teams: intake, reconciliation status, and client report packs.” | Today 15:00–16:00 | If positive signal, send 2-line scope + book link; if silent by tomorrow 11:00 PT, nudge SMS |
| 5 | sprint26-030 | Accurate Accounting Company, Inc. | $850 | Call + SMS | “Can help standardize month-end close checklist + KPI packs so your team cuts manual prep time this month.” | Today 15:15–16:15 | No answer → SMS; no reply by tomorrow 09:00 PT → retry call |
| 6 | nosite-037 | Regal Roofing & Contracting | $1,500 | Call + SMS | “You likely lose follow-up on estimate requests—want a simple lead-to-estimate tracker that boosts close rate?” | Today 16:00–17:00 | If owner unavailable, ask best callback time + send SMS summary |
| 7 | nosite-068 | Quality Construction & Roofing | $1,500 | Call + SMS | “We set up contractor dispatch + pipeline tracking fast—usually live in 48 hours.” | Today 16:15–17:15 | If no pickup: SMS in 10 min; retry tomorrow 08:30 PT |
| 8 | wa-google-002 | PMC General Contractor | $1,200 | Call + SMS | “I can help you track leads, bids, and job status in one ops sheet so nothing slips.” | Today 16:30–17:30 | If not decision-maker, capture owner name + direct line; follow-up tomorrow AM |
| 9 | wa-google-005 | Environment West Landscape Services | $1,000 | Call + SMS | “We automate job-cost + crew schedule reporting so landscaping owners can see profit by job weekly.” | Tomorrow 08:30–09:30 | No answer → SMS; if still silent, deprioritize to nurture list |
| 10 | wave4-044 | Millennium Plumbing Specialist | $700 | Call + SMS | “I help plumbing teams automate emergency-call intake + dispatch dashboard to reduce missed jobs.” | Today 17:00–18:00 | If after-hours voicemail, SMS now + call tomorrow 09:30 PT |
| 11 | sprint26-025 | Seattle Mobile Detailing | $750 | Call + SMS | “Can simplify booking→invoice flow and track daily route profitability with one lightweight system.” | Tomorrow 09:00–10:00 | If no response in 6h, send proof-style SMS with one quantified outcome |
| 12 | sprint26-026 | Lando Mobile Detailing | $700 | Call + SMS | “Can replace manual scheduling with dispatch sheet + package upsell tracker—quick to implement.” | Tomorrow 09:15–10:15 | No answer → SMS + one final attempt tomorrow 12:00 PT |

---

## Message Templates (quick-use)

**Voicemail (20 sec):**  
“Hey, this is John with NorthStar Synergy. Quick reason for the call: we help local service businesses automate scheduling, dispatch, and follow-up so more jobs close without extra admin. I’ll text a quick summary—if useful, we can do a 10-minute call.”

**SMS #1 (after missed call):**  
“Hey {{client}}, John here (NorthStar Synergy) — just called. We help {{industry}} teams automate lead tracking + scheduling/dispatch so fewer jobs slip and admin time drops. Open to a quick 10-min chat this week?”

**SMS #2 (next-day nudge):**  
“Quick bump, {{client}} — I mapped a simple ops workflow for your team (no big software change). If helpful, I can share it in a 10-min call.”

---

## Lightweight Execution Checklist

- [ ] Work queue top-to-bottom; do not skip top 6 unless no valid phone.
- [ ] For each lead: call once, then SMS within 5–10 min if no live connect.
- [ ] Log outcome immediately in `leads.jsonl` notes/status (`contacted` if touched).
- [ ] Tag disposition in notes: `no_answer`, `voicemail`, `connected`, `callback_time`, `not_fit`.
- [ ] If connected: qualify in <3 min (volume, scheduling pain, follow-up gaps, decision-maker).
- [ ] If qualified: propose 10-min follow-up slot within 24–48h.
- [ ] End-of-run: summarize counts (calls placed, SMS sent, connects, callbacks booked).

## Routing Notes

- Primary focus: **WA + West Coast** first for same-time-zone connect rates.
- Use call blocks during local business hours; avoid first-touch calls after 18:00 local.
- If SMS deliverability is limited (Twilio trial constraints), keep call-first and log numbers needing verification.
