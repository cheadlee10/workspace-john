# Send Ops Queue v15 — Next 24 Hours
**Window:** Wed 2026-03-04 06:20 PST → Thu 2026-03-05 06:20 PST  
**Built from:** `leads.jsonl` (reachable = phone present + call/SMS usable) and `jobs.jsonl` (recent proof: Acme Co, completed + paid $299 on 2026-03-02).

## Prioritization Logic (v15)
1. **Reachability first:** only leads with active call/SMS path in this 24h sprint.
2. **Deal-size weighting:** prioritize $900–$1,500 first, then $700–$900, then $500–$700.
3. **Service urgency bias:** roofing/HVAC/plumbing first (higher near-term pain, faster decision cycles).
4. **Local-time compliance:** primary touches in each lead’s 9:00 AM–12:00 PM local block.
5. **Tight cadence:** 2-touch max in 24h (initial + one follow-up), stop on reply.

---

## Prioritized Outreach Queue (24h)

| Prio | Lead ID | Business | Est. Value | Channel | Message Snippet | Send Window (Lead Local) | Follow-up Trigger |
|---|---|---|---:|---|---|---|---|
| 1 | nosite-068 | Quality Construction & Roofing (Houston, TX) | $1500 | Call → SMS | "I help roofing teams convert more inbound estimate requests by tightening first-response + callback flow. Want a 1-page sample?" | 9:00–9:35 AM CT | No pickup: leave short VM, send SMS in 10 min. No reply by 2:30 PM CT: final bump. |
| 2 | nosite-037 | Regal Roofing & Contracting (Seattle, WA) | $1500 | Call → SMS | "Quick win: improve speed-to-estimate from listing traffic with a cleaner mobile intake + callback flow." | 9:00–9:35 AM PT | No pickup: VM + SMS in 10 min. No reply by 2:30 PM PT: final bump. |
| 3 | wa-google-002 | PMC General Contractor (Bellevue, WA) | $1200 | Call → SMS | "I can share a short bid-request workflow that helps convert more remodel inquiries into booked jobs." | 9:15–9:50 AM PT | No pickup: SMS in 10 min. No reply by 3:00 PM PT: one follow-up. |
| 4 | wa-google-005 | Environment West Landscape Services (Spokane, WA) | $1000 | Call → SMS | "I help landscapers move from inquiry to scheduled estimate faster with a simple intake workflow." | 9:00–9:40 AM PT | No pickup: VM + SMS in 10 min. No reply by 2:00 PM PT: one follow-up. |
| 5 | nosite-109 | San Diego Heating and Cooling (El Cajon, CA) | $900 | Call → SMS | "I can send a 1-page dispatch/callback flow to help capture more urgent HVAC calls." | 10:00–10:40 AM PT | No pickup: SMS in 10 min. No reply by 3:30 PM PT: one follow-up. |
| 6 | wa-google-001 | PNW Landscaping & Services (Seattle, WA) | $800 | SMS → Call | "Can I send a quick idea to increase booked landscaping estimates from current listing traffic?" | 10:00–10:35 AM PT | No SMS reply by 1:30 PM PT: one call attempt. |
| 7 | nosite-004 | Northwest Landscape and Patio Bellevue | $800 | Call → SMS | "Patio/landscape leads convert better with a tighter quote request + same-day callback script." | 10:30–11:05 AM PT | No pickup: SMS in 10 min. No reply by 3:30 PM PT: final CTA. |
| 8 | nosite-001 | Perez Landscaping (Seattle, WA) | $800 | SMS → Call | "I can share a simple quote + callback playbook that helps crews book more estimates without extra ad spend." | 11:00–11:30 AM PT | No SMS reply in 3h: call once. |
| 9 | nosite-002 | Ligaya Landscaping (Seattle, WA) | $800 | SMS → Call | "Want a short workflow to convert more Yelp inquiries into booked landscaping visits?" | 11:00–11:40 AM PT | No SMS reply in 3h: call once. |
| 10 | nosite-003 | Greenscapes Landscaping (Seattle, WA) | $800 | SMS → Call | "I can send a one-page process to improve callback speed and raise estimate booking rate." | 11:15 AM–12:00 PM PT | No SMS reply by 3:30 PM PT: call once. |
| 11 | nosite-005 | Envision Landscaping (Bellevue, WA) | $800 | Call → SMS | "I help landscaping teams tighten intake so mobile visitors turn into booked jobs faster." | 11:30 AM–12:00 PM PT | No pickup: SMS in 10 min. No reply by 4:00 PM PT: final bump. |
| 12 | wa-google-003 | Joc's Landscaping (Everett, WA) | $750 | Call → SMS | "I can share a quick estimate-booking flow built for local landscaping teams." | 12:00–12:30 PM PT | No pickup: SMS in 10 min. No reply by 4:00 PM PT: one follow-up. |
| 13 | wa-google-006 | Keith's Lawn & Landscape (Spokane, WA) | $750 | Call → SMS | "Small change, big lift: tighter inquiry intake + callback sequence for more booked lawn jobs." | 12:30–1:00 PM PT | No pickup: SMS in 10 min. No reply by 4:30 PM PT: one follow-up. |
| 14 | wave4-044 | Millennium Plumbing Specialist (Sacramento, CA) | $700 | Call → SMS | "I help plumbing teams capture more emergency jobs with faster intake + dispatch handoff. Want a short sample?" | 1:00–1:40 PM PT | No pickup: VM + SMS in 10 min. No reply by 4:30 PM PT: one follow-up. |
| 15 | wave4-013 | Precision Plumbing (Austin, TX) | $500 | Call → SMS | "Quick win: reduce missed plumbing jobs by improving first-response timing and callback routing." | 1:30–2:10 PM CT | No pickup: SMS in 10 min. No reply by 5:00 PM CT: final CTA. |
| 16 | wave4-003 | Northwest Plumbing of Tennessee (Nashville, TN) | $500 | SMS → Call | "I can send a short workflow to convert urgent plumbing inquiries into booked jobs faster." | 2:00–2:40 PM CT | No SMS reply in 2.5h: one call attempt. |
| 17 | nosite-115 | Ace Fencing (Las Vegas, NV) | $800 | Call → SMS | "Fence inquiries close faster with a direct estimate path and fast callback script—want a quick draft?" | 2:00–2:40 PM PT | No pickup: VM + SMS in 10 min. No reply by 5:30 PM PT: one follow-up. |
| 18 | nosite-116 | Bachman Lawn Care (Kansas City, MO) | $700 | SMS → Call | "Can I send a short booking workflow that helps turn lawn-care inquiries into scheduled jobs?" | 3:00–3:40 PM CT | No SMS reply by 6:00 PM CT: one call attempt. |

---

## Backup Bench (if pace is ahead)
- `nosite-101` Cedar Fencing Plus (Portland) — $800 — call/SMS  
- `nosite-102` Austin's Custom Fencing (Portland) — $800 — call/SMS  
- `wa-google-004` Family Lawn Services (Everett) — $700 — call/SMS  
- `wa-google-007` The Honest Handyman & Hauling LLC (Vancouver) — $700 — call/SMS  
- `nosite-084` American Termite & Pest Elimination (Atlanta) — $550 — call/SMS  
- `nosite-085` Bug Free Exterminating (Atlanta) — $550 — call/SMS

---

## Lightweight Execution Checklist

### 1) Pre-send (5 minutes)
- [ ] Confirm number + timezone before each touch block.
- [ ] Personalize first line (business name + trade + city).
- [ ] Keep SMS to ~60–85 words with one clear CTA.
- [ ] Include optional social proof once per thread: "We shipped a paid workflow project this week ($299)."

### 2) During send blocks
- [ ] Work queue in order; do not skip priority tiers unless unreachable.
- [ ] For no-answer calls: leave 12–18 sec VM, then send SMS within 10 minutes.
- [ ] Log each attempt immediately in `leads.jsonl` notes + status (`contacted`).

### 3) Follow-up control
- [ ] Max 2 touches per lead in this 24h cycle.
- [ ] Alternate channels on follow-up (Call→SMS or SMS→Call).
- [ ] Stop all sends on any reply; move to live conversation handling.

### 4) Closeout (end of 24h window)
- [ ] Record totals: attempted / connected / replied / interested.
- [ ] Promote warm responders to top of next queue.
- [ ] Roll non-responders with a new send window + fresh opener (no copy-paste repeat).