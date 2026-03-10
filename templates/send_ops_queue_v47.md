# Send Ops Queue v47 (Next 24 Hours)

**Window covered:** Wed 2026-03-04 15:20 PST → Thu 2026-03-05 15:20 PST  
**Prioritization logic:** (1) phone-verified + high estimated value, (2) WA/home-service leads first for timezone control, (3) proven-callable wave leads, (4) Yelp-only follow-up for records without direct phone.  
**Proof anchor for credibility:** `jobs.jsonl` shows recent completed/paid Excel Audit delivery (Acme Co, $299).

## Prioritized Outreach Queue

| Priority | Lead ID | Prospect | Channel | Message snippet (personalized) | Send window (local) | Follow-up trigger |
|---|---|---|---|---|---|---|
| P1 | nosite-037 | Regal Roofing & Contracting (Seattle) | Call + SMS | “I help roofing teams tighten missed-call follow-up and estimate tracking so more bids convert. Open to a fast 10-min walkthrough?” | Wed 3:30–3:50 PM PT | No pickup: send SMS in 5 min; retry Thu 9:00 AM PT |
| P1 | nosite-068 | Quality Construction & Roofing (Houston) | Call + SMS | “Quick idea for your crew: one lightweight board for lead intake → estimate → booked job so nothing slips.” | Wed 5:00–5:20 PM CT | No answer: SMS immediately; retry Thu 10:00 AM CT |
| P1 | wa-google-002 | PMC General Contractor (Bellevue) | Call + SMS | “GC teams usually leak margin between inquiry and scheduling. I can show a simple fix you can run this week.” | Wed 3:50–4:10 PM PT | Gatekeeper/no answer: SMS recap + callback CTA; retry Thu 9:20 AM PT |
| P1 | wa-google-005 | Environment West Landscape Services (Spokane) | Call + SMS | “For landscaping ops, tighter quote follow-up usually lifts close rate fast. Want a 1-page flow?” | Wed 4:10–4:30 PM PT | No connect: SMS with ‘1-page flow’ offer; retry Thu 9:40 AM PT |
| P1 | nosite-109 | San Diego Heating and Cooling (El Cajon) | Call + SMS | “HVAC teams win with faster callback cadence + dispatch visibility. I can map a simple tracker around your current process.” | Wed 4:30–4:50 PM PT | No answer: SMS in 5 min; retry Thu 10:00 AM PT |
| P1 | wave4-013 | Precision Plumbing (Austin) | Call + SMS | “I help plumbing shops reduce missed callbacks and track jobs/invoices in one sheet—no platform migration needed.” | Wed 6:00–6:20 PM CT | No pickup: SMS now; retry Thu 9:00 AM CT |
| P1 | wave4-003 | Northwest Plumbing of Tennessee (Nashville) | Call + SMS | “If urgent plumbing calls are scattered, I can share a tighter intake + dispatch follow-up structure you can use immediately.” | Wed 6:20–6:40 PM CT | No answer: SMS with short CTA; retry Thu 9:20 AM CT |
| P2 | wa-google-001 | PNW Landscaping & Services (Seattle) | Call + SMS | “Quick win: improve callback speed + estimate reminders so more inbound landscaping jobs book.” | Thu 10:20–10:40 AM PT | No connect: send value SMS + move to FU1 queue |
| P2 | wa-google-003 | Joc's Landscaping (Everett) | Call + SMS | “I can set up a simple quote tracker + follow-up cadence to recover jobs that normally go cold.” | Thu 10:40–11:00 AM PT | No answer: SMS within 10 min; retry Thu 2:00 PM PT |
| P2 | wa-google-006 | Keith's Lawn & Landscape (Spokane) | Call + SMS | “Most lawn teams already have enough demand—main gap is follow-up timing. Want a lightweight fix?” | Thu 11:00–11:20 AM PT | No pickup: SMS + ‘want the template?’ CTA |
| P2 | wa-google-007 | The Honest Handyman & Hauling LLC (Vancouver) | Call + SMS | “Handyman ops often lose work between quote and callback. I can share a two-tab intake/follow-up setup.” | Thu 11:20–11:40 AM PT | No answer: SMS in 5 min; retry Thu 2:20 PM PT |
| P2 | wave3-010 | Garman Plumbing (Raleigh) | Call + SMS | “Can I send a 1-page process that improves callback speed and booked plumbing jobs without heavy software?” | Thu 12:00–12:20 PM ET | No answer: SMS immediately; retry Thu 3:00 PM ET |
| P2 | wave3-007 | Dazco Plumbing (Raleigh) | Call + SMS | “Simple dispatch + follow-up tracking usually closes more quote requests. Open to a quick walkthrough?” | Thu 12:20–12:40 PM ET | No connect: SMS + retry window Thu 3:20 PM ET |
| P2 | wave3-006 | Garrico Plumbing (Raleigh) | Call + SMS | “I help plumbing teams keep every inquiry visible from first call to paid invoice—fast to implement.” | Thu 12:40–1:00 PM ET | No pickup: SMS + park for FU1 if no response |
| P3 | wa-google-008 | Pacific Landscaping (Seattle, Larry A.) | Yelp message / Request a Quote | “Saw your Yelp profile—if follow-up is manual today, I can share a simple callback + estimate flow for landscaping teams.” | Thu 8:45–9:15 AM PT | If no Yelp response in 24h: send shorter 2-line bump |
| P3 | wave4-001 | Plumbers of Nashville | Yelp message / Request a Quote | “I work with plumbing operators on missed-call recovery + dispatch follow-up. Happy to send a lightweight starter template.” | Thu 9:30–10:00 AM CT | If no response in 24h: one final value-first follow-up |

---

## Lightweight Execution Checklist

- [ ] Run P1 block first (today), strictly in listed order.
- [ ] For call-first rows: leave voicemail (if available) + send SMS within 5–10 minutes.
- [ ] Personalize first line with niche (roofing/plumbing/HVAC/landscaping/handyman) before sending.
- [ ] Log each attempt in `leads.jsonl` notes with timestamp, channel, and outcome.
- [ ] Set `status: contacted` immediately after first touch.
- [ ] Trigger listed follow-up at threshold (same-day retries for P1; FU1 park for non-responders).
- [ ] End-of-window rollup: total attempts, connects, positive replies, callbacks booked, and FU1 carryover list.

## Operator Notes

- This queue favors **phone-verified leads with $500–$1,500 estimated value** first for fastest conversion potential.
- Yelp-only records are included only after callable inventory to keep execution lean and outcome-focused.
- Message tone is short, operational, and outcome-based (missed calls, quote conversion, dispatch visibility).