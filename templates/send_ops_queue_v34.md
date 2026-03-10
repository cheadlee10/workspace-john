# Send Ops Queue v34 (Next 24 Hours)
**Window covered:** Wed 2026-03-04 12:13 PST → Thu 2026-03-05 12:13 PST  
**Source basis:** `leads.jsonl` (usable phone leads + wave4 high-intent plumbing cluster), `jobs.jsonl` (recent paid completion: Acme Co, Excel Audit, $299)

## Prioritization logic (quick)
1. **P1 = Reachable + high ticket:** phone/SMS-usable leads with estimated value >= $700.
2. **P2 = High-intent plumbing wave:** Yelp profile messaging where phone is missing but demand signal is strong.
3. **P3 = Volume backfill:** proven reachable phone leads for steady reply generation tomorrow morning.

---

## 24h Outreach Queue (prioritized)

| Pri | Lead ID | Prospect | Channel | Message snippet (customize before send) | Send window (PST) | Follow-up trigger |
|---|---|---|---|---|---|---|
| P1 | wave4-044 | Millennium Plumbing Specialist (Sacramento) | SMS -> call | “Quick idea for Millennium: we help plumbing teams convert missed calls into booked jobs with instant text-back + quote follow-up. Want a 2-min teardown?” | 12:20-12:35 | No SMS reply in 90 min -> 1 call + 20s voicemail. |
| P1 | wave4-013 | Precision Plumbing (Austin) | SMS -> call | “We build simple automations for plumbers to recover missed leads and speed quote response. Open to a quick 3-point fix plan?” | 12:35-12:50 | No response in 90 min -> 1 call attempt. |
| P1 | wave4-003 | Northwest Plumbing of Tennessee | SMS -> call | “Nashville demand is hot — we can help convert more inbound calls into paid jobs without adding headcount. Want details?” | 12:50-13:05 | No response in 2h -> call once. |
| P1 | wa-google-005 | Environment West Landscape Services (Spokane) | SMS -> call | “I can show a fast landscaping growth setup: better quote intake + auto follow-up for missed inquiries. Worth a short overview?” | 13:05-13:20 | No reply in 2h -> 1 call + VM. |
| P1 | wa-google-001 | PNW Landscaping & Services (Seattle) | SMS -> call | “We help local landscaping teams turn missed calls into booked estimates automatically. Want a quick example for PNW?” | 13:20-13:35 | No reply in 2h -> call once. |
| P1 | nosite-037 | Regal Roofing & Contracting (Seattle) | SMS -> call | “Roofing lead-gen idea: instant callback text + faster estimate routing to stop quote leakage. Open to a quick audit?” | 13:35-13:50 | No reply in 2h -> call once. |
| P1 | nosite-068 | Quality Construction & Roofing (Houston) | SMS -> call | “We help roofing teams book more high-intent jobs from the same inbound volume using rapid response automation. Want a 2-min breakdown?” | 13:50-14:05 | No response in 2h -> 1 call + VM. |
| P1 | wa-google-007 | The Honest Handyman & Hauling LLC (Vancouver) | SMS -> call | “Quick win: convert handyman inquiries faster with instant text-back + simple scheduling flow. Want the playbook?” | 14:05-14:20 | No reply in 2h -> one call attempt. |
| P1 | nosite-033 | A A Landscaping (Bothell) | SMS -> call | “I can share a short system that helps landscaping companies recover missed leads and book more estimates each week.” | 14:20-14:35 | No reply in 2h -> 1 call. |
| P2 | wave4-057 | Drain Pros (Phoenix) | Yelp Request-a-Quote/message | “For 24/7 plumbing, speed to first response wins. We can help you capture and re-engage every missed lead automatically.” | 15:00-15:15 | No Yelp response by Thu 09:30 -> short KPI-led follow-up. |
| P2 | wave4-060 | Plumbing Response Team (Phoenix) | Yelp Request-a-Quote/message | “We help family-owned plumbing teams increase booked calls with faster first-touch and structured follow-up.” | 15:15-15:30 | No response in ~18h -> concise 2-line nudge. |
| P2 | wave4-065 | Golden Gate Emergency Plumbing (SF) | Yelp Request-a-Quote/message | “Can share a simple emergency-plumbing workflow that boosts conversion from urgent inquiry to booked dispatch.” | 15:30-15:45 | No reply by Thu 10:00 -> send proof-style follow-up. |
| P2 | wave4-069 | South Bay Leak Detection (San Jose) | Yelp Request-a-Quote/message | “I have a quick idea to lift leak-service conversion via faster quote routing + automatic follow-up texts.” | 15:45-16:00 | No response by next morning -> “can mock in 24h” follow-up. |
| P2 | wave4-072 | Oakland Drain & Sewer Experts (Oakland) | Yelp Request-a-Quote/message | “We can help convert more drain/sewer inquiries into paid jobs with a no-miss response sequence.” | 16:00-16:15 | No response in 18h -> one brief reminder. |
| P2 | wave4-050 | Puget Sound Leak Detection (Seattle) | Yelp Request-a-Quote/message | “Leak leads are high urgency — we can improve first-contact speed and raise booked call rate with lightweight automation.” | 16:15-16:30 | No response by Thu 10:30 -> follow-up with one concrete outcome metric. |
| P3 | wave3-175 | Neighborhood Mechanic (Indianapolis) | SMS -> call | “We help local auto shops convert inquiry calls into scheduled visits with instant text-back + intake.” | 09:00-09:15 (Thu) | No reply by 10:45 -> one call attempt. |
| P3 | wave3-180 | Stat Plumbing (Columbus) | SMS -> call | “Quick fix idea to increase booked plumbing jobs from your current inbound calls — want a short walkthrough?” | 09:15-09:30 (Thu) | No response in 90 min -> call once. |
| P3 | wave3-106 | Picasso Painting (Milwaukee) | SMS -> call | “We help painting teams book more estimates by tightening first response and follow-up cadence.” | 09:30-09:45 (Thu) | No response in 2h -> one call + VM. |
| P3 | wave3-090 | Top Tree Service (St. Louis) | SMS -> call | “Tree-service growth idea: capture every missed call and auto-nurture estimate requests into bookings.” | 09:45-10:00 (Thu) | No reply in 2h -> call once. |
| P3 | nosite-023 | Handy-Den (Tacoma) | SMS -> call | “Den, quick handyman growth idea: missed-call text-back plus instant quote request flow to book more small jobs.” | 10:00-10:15 (Thu) | No response in 2h -> one call attempt. |

---

## Lightweight execution checklist
- [ ] Finish all **P1** outreach before 15:00 PST.
- [ ] For phone leads: send SMS first, then max **one** call attempt at trigger time.
- [ ] Personalize first line with city + service + business name.
- [ ] Keep each message under 280 chars; single CTA only.
- [ ] Log each touch in `leads.jsonl` notes: timestamp, channel, status (`contacted` / `negotiating` / `lost`).
- [ ] Run P2 Yelp block in one focused sprint (15:00-16:30 PST).
- [ ] Run P3 block Thu morning to restart response cycle inside 24h window.
- [ ] End-of-window review: move engaged leads to `negotiating`, queue non-responders for next cadence variant.

## Quick copy blocks
**SMS opener (home services):**  
“Hey {{business}} — quick idea: we help local service teams recover missed leads with instant text-back + quote follow-up. Want a 2-min teardown?”

**Yelp opener:**  
“Noticed your Yelp presence and had a fast growth idea: improve first-response speed and follow-up so more inquiries turn into booked jobs.”

**Call voicemail (20s):**  
“Hey, this is John with NorthStar Synergy. I have a quick idea to help {{business}} convert more incoming calls into booked jobs with a simple follow-up workflow. I’ll text details too.”
