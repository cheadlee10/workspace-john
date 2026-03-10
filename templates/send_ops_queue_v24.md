# Send Ops Queue — Next 24 Hours (v24)
**Prepared:** 2026-03-04 07:50 PST  
**Source context used:** `leads.jsonl`, `jobs.jsonl`  
**Goal:** Max same-day contact rate with highest-value reachable leads first (phone/SMS first, Yelp DM fallback).

## Prioritization Logic
1. **P1:** Reachable now (valid phone) + higher estimated value ($700+)
2. **P2:** Reachable now (valid phone) + medium estimated value ($500–699)
3. **P3:** No direct phone but active Yelp URL (DM/request-a-quote)

---

## Outreach Queue (next 24h)

| Priority | Lead ID | Client | Channel | Message snippet (customize before send) | Send window (PT) | Follow-up trigger |
|---|---|---|---|---|---|---|
| P1 | wave5-070 | Champion Plumbing | SMS + Call | "Hey Champion Plumbing — quick idea to turn Yelp visitors into booked calls this week. I can set up a simple lead-capture + instant follow-up flow for plumbing emergencies. Worth a 10-min look?" | Wed 08:15–09:30 | If no reply in 2h: place call + voicemail; if no response by Thu 09:00, resend shorter SMS |
| P1 | wave5-072 | SOSA The Plumber | SMS + Call | "SOSA team — saw strong emergency-intent traffic in your market. I help plumbers convert missed calls/web traffic into booked jobs with fast automation. Open to a quick 10-min walkthrough?" | Wed 08:30–10:00 | If no SMS response in 90 min: call; if call no-answer, voicemail + SMS bump at Wed 16:30 |
| P1 | wave4-044 | Millennium Plumbing Specialist | SMS + Call | "Millennium Plumbing — I help plumbing shops capture after-hours leads and auto-follow-up so fewer jobs are missed. Can I send a 3-point fix plan for your current flow?" | Wed 09:00–11:00 | If no reply same day: second touch Thu 08:45 with proof-style line ("helped recover missed leads") |
| P1 | wave4-013 | Precision Plumbing | SMS + Call | "Precision Plumbing — quick win idea: tighten response flow for leak/water-heater leads so more inbound turns to booked jobs. Want a free mini audit?" | Wed 09:15–11:15 | If unopened/unanswered by Wed EOD: Thu AM call-first then SMS recap |
| P1 | wave4-003 | Northwest Plumbing of Tennessee | SMS + Call | "Northwest Plumbing — we build lightweight automation for emergency plumbers (speed-to-lead + follow-up). Could show you a 10-min setup this week." | Wed 10:00–12:00 | If no response in 2h: voicemail; follow-up SMS Thu 09:30 |
| P1 | nosite-068 | Quality Construction & Roofing | SMS + Call | "Quick outreach: I help roof/plumbing home-service businesses convert more inbound calls and quote requests with simple automation. Open to a short demo?" | Wed 11:00–12:30 | If no answer: call at Wed 16:00; final nudge Thu 10:00 |
| P1 | wave4-109 | San Diego Heating and Cooling | SMS + Call | "Saw your HVAC listing — I help HVAC teams increase booked jobs by automating follow-up for missed calls and quote leads. Want a quick example?" | Wed 12:00–13:30 | If no reply by 15:00: call + voicemail; Thu 10:30 final follow-up |
| P2 | wa-google-002 | PMC General Contractor | SMS + Call | "PMC General Contractor — I work with local contractors to convert inbound interest faster (auto reply + scheduling follow-up). Worth a quick 10-min call?" | Wed 13:30–15:00 | If no response in 2h: call; if no response by Thu noon, one final SMS |
| P2 | wa-google-003 | Joc's Landscaping | SMS + Call | "Joc's Landscaping — quick idea to win more local jobs from inbound leads: immediate text-back + simple quote workflow. Open to seeing it?" | Wed 14:00–15:30 | If no reply same day: Thu 09:15 call-first |
| P2 | wa-google-004 | Family Lawn Services | SMS + Call | "Family Lawn Services — I can help turn inquiries into booked lawn jobs with fast follow-up automation. Want a quick no-pressure walkthrough?" | Wed 14:30–16:00 | If no response after 2h: call; Thu 10:00 second SMS |
| P2 | wa-google-005 | Environment West Landscape Services | SMS + Call | "Environment West — we help landscapers close more local leads by fixing response speed and follow-up. Can I send a 3-step plan?" | Wed 15:00–16:30 | If no response by EOD: Thu AM follow-up |
| P2 | wa-google-006 | Keith's Lawn & Landscape | SMS + Call | "Keith's Lawn & Landscape — I help lawn teams book more estimates with lightweight lead automation. Open to a 10-min chat?" | Wed 15:30–17:00 | If no response in 90 min: call; Thu 09:45 text bump |
| P2 | nosite-101 | Cedar Fencing Plus | SMS + Call | "Cedar Fencing Plus — quick outreach: we help contractors stop losing estimate requests with instant follow-up + simple booking flow. Interested?" | Wed 16:00–17:30 | If no answer: Thu 09:00 retry call |
| P2 | nosite-102 | Austin's Custom Fencing | SMS + Call | "Austin's Custom Fencing — I help fence teams convert quote requests faster with low-lift automation. Want a short example?" | Wed 16:30–18:00 | If no response by Thu 10:30: final SMS with CTA |
| P2 | wave3-090 | Top Tree Service | SMS + Call | "Top Tree Service — we help service businesses increase booked jobs from missed calls and quote requests through fast auto follow-up. Open to a quick chat?" | Thu 08:30–10:00 | If no reply after call: voicemail + last SMS Thu 14:00 |
| P3 | wave6-022 | Philly Roof Leak Rapid Repair | Yelp DM (Request-a-Quote) | "Saw your Yelp profile — I help roof repair companies capture urgent inbound jobs faster with simple response automation. Want a quick 10-min walkthrough?" | Wed 10:30–12:00 | If no Yelp reply in 6h: send one short follow-up DM |
| P3 | wave6-007 | Milwaukee 24-7 Flood Cleanup | Yelp DM | "I work with emergency restoration teams to improve speed-to-lead and booking conversion from urgent searches. Open to a quick test setup?" | Wed 12:30–14:00 | If no reply by Thu AM: one final DM with concrete next step |
| P3 | wave6-005 | Nashville Roof Leak Rapid Repair | Yelp DM | "Quick outreach: we help roof leak teams convert storm/emergency traffic into booked inspections via automated follow-up. Can share a simple playbook." | Wed 14:00–15:30 | If no response in 8h: follow-up DM asking preferred callback method |
| P3 | wave6-021 | Jersey Shore Emergency Electric | Yelp DM | "I help electrical teams reduce missed emergency jobs with instant reply + dispatch-ready intake automation. Open to 10 minutes this week?" | Wed 15:00–16:30 | If no reply by Thu 11:00: final concise DM |

---

## Lightweight Execution Checklist

### Pre-send (5–10 min)
- [ ] Confirm each queued lead is still `status: new` in `leads.jsonl`
- [ ] Normalize message with service keyword (plumbing/HVAC/roofing/etc.)
- [ ] Keep first SMS under ~280 chars

### During send block
- [ ] Send in queue order (P1 → P2 → P3)
- [ ] Log each touch in lead notes (timestamp, channel, snippet used)
- [ ] Mark lead status progression: `new -> contacted`

### Follow-up handling
- [ ] Trigger call fallback exactly per queue rules
- [ ] If positive response: mark `proposal_sent` and schedule same-day quote call
- [ ] If explicit decline: mark `lost` with reason

### End-of-window wrap
- [ ] Count touches sent, replies, positive intents, booked calls
- [ ] Roll unfinished items into next v24 queue with updated trigger states

---

## Notes from jobs context
- Most recent closed-won proof point available: `job_2026_03_02_001` (Excel Audit, $299 paid). Use as lightweight social proof only when asked.
