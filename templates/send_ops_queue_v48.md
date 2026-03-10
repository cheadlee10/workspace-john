# Send Ops Queue v48 (Next 24 Hours)

**Window covered:** Wed 2026-03-04 15:30 PST → Thu 2026-03-05 15:30 PST  
**Prioritization logic:** (1) phone-verified + high-ticket service first, (2) WA/PST leads early for tighter control, (3) CT/ET callable leads next, (4) Yelp-only wave4 records for async follow-up coverage.  
**Proof anchor for trust:** `jobs.jsonl` includes recent completed + paid delivery (`job_2026_03_02_001`, Excel Audit, $299).

## Prioritized Outreach Queue

| Priority | Lead ID | Prospect | Channel | Message snippet (personalized) | Send window (local) | Follow-up trigger |
|---|---|---|---|---|---|---|
| P1 | nosite-037 | Regal Roofing & Contracting (Seattle) | Call + SMS | “I help roofing teams stop lead leaks between inbound call and scheduled estimate. Open to a quick 10-minute workflow tune-up?” | Wed 3:35–3:55 PM PT | No answer: voicemail + SMS in 5 min; retry Thu 9:05 AM PT |
| P1 | wa-google-002 | PMC General Contractor (Bellevue) | Call + SMS | “GCs usually lose speed at handoff from inquiry to estimate. I can show a simple tracker that fixes that this week.” | Wed 3:55–4:15 PM PT | No connect: SMS recap + callback CTA; retry Thu 9:25 AM PT |
| P1 | wa-google-005 | Environment West Landscape Services (Spokane) | Call + SMS | “For landscaping teams, faster follow-up after quote requests usually drives easy wins. Want a one-page flow?” | Wed 4:15–4:35 PM PT | No pickup: SMS with ‘1-page flow’ offer; retry Thu 9:45 AM PT |
| P1 | nosite-109 | San Diego Heating and Cooling (El Cajon) | Call + SMS | “HVAC shops win by tightening missed-call recovery and dispatch visibility. I can map a lightweight setup around your current process.” | Wed 4:35–4:55 PM PT | No answer: SMS in 5 min; retry Thu 10:05 AM PT |
| P1 | nosite-068 | Quality Construction & Roofing (Houston) | Call + SMS | “Quick idea: one simple board from lead intake → estimate → booked job so nothing gets dropped.” | Wed 5:15–5:35 PM CT | No answer: send SMS immediately; retry Thu 10:00 AM CT |
| P1 | wave4-013 | Precision Plumbing (Austin) | Call + SMS | “I help plumbing teams reduce missed callbacks and track jobs + invoices in one place without changing platforms.” | Wed 5:35–5:55 PM CT | No pickup: voicemail + SMS; retry Thu 10:20 AM CT |
| P1 | wave4-003 | Northwest Plumbing of Tennessee (Nashville) | Call + SMS | “If your urgent plumbing calls are scattered, I can share a tighter intake + follow-up process you can run immediately.” | Wed 5:55–6:15 PM CT | No answer: SMS with short CTA; retry Thu 10:40 AM CT |
| P2 | wa-google-001 | PNW Landscaping & Services (Seattle) | Call + SMS | “Quick win for landscaping ops: faster callback cadence + estimate reminders to recover jobs that go cold.” | Thu 10:30–10:50 AM PT | No connect: SMS and move to FU1 if silent by Thu 2:30 PM PT |
| P2 | wa-google-003 | Joc's Landscaping (Everett) | Call + SMS | “I can share a simple quote tracker + follow-up cadence to help convert more inbound landscaping requests.” | Thu 10:50–11:10 AM PT | No pickup: SMS in 10 min; retry Thu 2:50 PM PT |
| P2 | wa-google-006 | Keith's Lawn & Landscape (Spokane) | Call + SMS | “Most lawn teams already have demand—the gap is speed to second touch. Want a lightweight fix?” | Thu 11:10–11:30 AM PT | No answer: SMS + ‘want template?’ CTA |
| P2 | wave3-010 | Garman Plumbing (Raleigh) | Call + SMS | “Can I send a 1-page callback/dispatch process that helps plumbing teams book more of the same lead volume?” | Thu 1:00–1:20 PM ET | No answer: SMS immediately; retry Thu 4:00 PM ET |
| P2 | wave3-007 | Dazco Plumbing (Raleigh) | Call + SMS | “Simple intake + follow-up tracking usually boosts booked calls fast. Open to a short walkthrough?” | Thu 1:20–1:40 PM ET | No connect: SMS and retry Thu 4:20 PM ET |
| P2 | wave3-006 | Garrico Plumbing (Raleigh) | Call + SMS | “I help service teams keep every inquiry visible from first call to paid invoice with minimal setup.” | Thu 1:40–2:00 PM ET | No pickup: SMS + park in FU1 if no response |
| P3 | wave4-001 | Plumbers of Nashville | Yelp Message / Request-a-Quote | “I work with plumbing operators on missed-call recovery + lead follow-up. Happy to send a lightweight starter template.” | Thu 9:20–9:40 AM CT | No Yelp response in 24h: short 2-line bump |
| P3 | wave4-010 | Austin Plumbing | Yelp Message / Request-a-Quote | “Noticed your Yelp listing—if callback follow-up is manual today, I can send a simple process to tighten booking speed.” | Thu 10:00–10:20 AM CT | No response in 24h: one final value-first nudge |
| P3 | wa-google-008 | Pacific Landscaping (Seattle, Larry A.) | Yelp Message / Request-a-Quote | “If quote follow-up is currently manual, I can share a two-step callback + estimate reminder flow for landscaping teams.” | Thu 8:50–9:10 AM PT | No response by Fri AM: send concise follow-up + archive pending |

---

## Lightweight Execution Checklist

- [ ] Execute all P1 calls first, in order, before starting P2.
- [ ] For each unanswered call: leave voicemail (if available) and send SMS within 5–10 minutes.
- [ ] Personalize first sentence by niche (roofing / GC / landscaping / HVAC / plumbing).
- [ ] Log timestamp + outcome in `leads.jsonl` notes after every touch.
- [ ] Update `status` to `contacted` immediately after first outbound action.
- [ ] Apply the listed retry window same day/next day without skipping queue order.
- [ ] End-of-window wrap: attempts, connects, positive replies, callbacks booked, FU1 carryover.

## Operator Notes

- This queue is weighted toward **phone-verified, higher-estimated-value home-service leads** for fastest near-term conversion.
- Yelp-only entries are intentionally limited and placed after callable inventory to preserve send efficiency.
- Messaging is outcome-first: missed-call recovery, estimate follow-up speed, and dispatch/job visibility.