# Send Ops Queue v8 — Next 24 Hours
**Window:** Wed 2026-03-04 05:10 PST → Thu 2026-03-05 05:10 PST  
**Built from:** `leads.jsonl` reachable-new leads + `jobs.jsonl` proof point (Acme Co Excel Audit completed/paid, $299 on 2026-03-02).

## Prioritization Logic (v8)
1. **Can contact now:** phone-present leads only (call/SMS executable immediately).
2. **Deal size first:** prioritize $900–$1500 opportunities before $500–$800.
3. **Category urgency:** roofing/HVAC/plumbing first, then contractors, then recurring-service verticals.
4. **Local-hour discipline:** execute in each lead’s local 9:00 AM–12:00 PM first-touch window.
5. **2-touch cap/24h:** initial touch + one follow-up max.

---

## Prioritized Outreach Queue (24h)

| Prio | Lead ID | Business | Est. Value | Channel | Message Snippet | Send Window (Lead Local Time) | Follow-up Trigger |
|---|---|---|---:|---|---|---|---|
| 1 | nosite-068 | Quality Construction & Roofing (Houston, TX) | $1500 | Call → SMS | “Quick idea: I help roofing teams convert more emergency calls from directory traffic with a simple quote/callback flow. Want a 1-page draft?” | 9:00–10:00 AM CT | No answer: leave VM + SMS in 10 min. No reply by 2:00 PM CT: final bump. |
| 2 | nosite-037 | Regal Roofing & Contracting (Seattle, WA) | $1500 | Call → SMS | “I can set up a roof-repair lead flow that gets more booked estimates without ad spend changes. Open to a quick mockup?” | 9:00–10:15 AM PT | Missed call: VM + SMS in 10 min. No reply by 3:00 PM PT: one proof follow-up. |
| 3 | wa-google-002 | PMC General Contractor (Bellevue, WA) | $1200 | Call | “I build simple contractor quote funnels that increase inbound estimate requests. Want me to mock one around your top services?” | 10:00–11:15 AM PT | No pickup: retry once 3:30–4:15 PM PT. |
| 4 | wa-google-005 | Environment West Landscape Services (Spokane, WA) | $1000 | Call → SMS | “You already have search visibility—this is about converting it into booked jobs faster. Want a quick example page?” | 9:30–10:30 AM PT | No response after 4h: concise SMS CTA. |
| 5 | nosite-109 | San Diego Heating and Cooling (El Cajon, CA) | $900 | Call → SMS | “HVAC urgency traffic converts best with a call-first quote flow. Want a rapid draft built for your service area?” | 9:10–10:10 AM PT | No pickup: SMS in 10 min. No reply by 3:00 PM PT: final nudge. |
| 6 | wa-google-001 | PNW Landscaping & Services (Seattle, WA) | $800 | Call → SMS | “I can send a tailored 1-page quote funnel concept for landscaping jobs—fast and no-pressure. Want to see it?” | 10:30–11:30 AM PT | No answer: SMS in 15 min. No response by EOD: one follow-up next AM. |
| 7 | nosite-004 | Northwest Landscape and Patio Bellevue | $800 | SMS → Call | “You can capture more patio/landscape requests with a clean call-first page. Want a personalized sample?” | 11:00 AM–12:00 PM PT | No SMS response in 3h: one call attempt. |
| 8 | nosite-101 | Cedar Fencing Plus (Portland, OR) | $800 | Call → SMS | “Fence buyers convert better with photos + direct quote intake. Want a same-day sample page for your team?” | 9:45–10:30 AM PT | Missed call: SMS in 10 min. No response by 2:00 PM PT: one follow-up. |
| 9 | nosite-102 | Austin’s Custom Fencing (Portland, OR) | $800 | SMS | “I help fencing companies turn listing traffic into estimate requests using a simple conversion page. Interested in a preview?” | 10:45–11:30 AM PT | No reply by next-day 10:00 AM PT: final nudge then park. |
| 10 | nosite-115 | Ace Fencing (Las Vegas, NV) | $800 | Call → SMS | “A direct quote flow can raise install requests quickly without new ad spend. Open to a short draft?” | 9:15–10:00 AM PT | No answer: SMS in 10 min; no reply by EOD PT: one final AM follow-up. |
| 11 | wave4-044 | Millennium Plumbing Specialist (Sacramento, CA) | $700 | Call → SMS | “For 24-hour plumbing, a call-first landing flow usually lifts booked jobs fast. Want a quick sample for your market?” | 9:05–10:00 AM PT | No pickup: VM + SMS in 15 min. No reply by 3:00 PM PT: final short follow-up. |
| 12 | nosite-061 | JV Pool Services (Dallas, TX) | $700 | Call → SMS | “Pool-service leads convert faster with a clean book-now + quote flow. Want a quick concept tailored to your services?” | 9:15–10:00 AM CT | No pickup: SMS in 10 min. No response in 4h: one CTA-only follow-up. |
| 13 | wave4-013 | Precision Plumbing (Austin, TX) | $500 | Call → SMS | “I can help convert emergency plumbing searches into booked calls with a dispatch-focused quote page. Open to a preview?” | 10:15–11:00 AM CT | Missed call: SMS in 10 min. No response by 2:30 PM CT: one follow-up. |
| 14 | wave4-003 | Northwest Plumbing of Tennessee (Nashville, TN) | $500 | Call → SMS | “Simple emergency plumbing conversion pages can add booked jobs from existing demand. Want a same-day draft?” | 10:00–10:45 AM CT | No pickup: VM + SMS in 10–15 min. No reply by 2:00 PM CT: final bump. |
| 15 | wave3-016 | New Mexico Flooring Specialist (Albuquerque, NM) | $400 | SMS → Call | “I can share a quick quote-page concept to help flooring leads convert from directory traffic. Worth a look?” | 9:30–10:30 AM MT | No SMS response by 1:30 PM MT: one call attempt. |

---

## Backup Bench (if capacity remains)
- `nosite-084` American Termite & Pest Elimination (Atlanta) — call/SMS ET
- `nosite-085` Bug Free Exterminating (Atlanta) — call/SMS ET
- `nosite-086` CRC Services Termite & Pest Control (Atlanta) — call/SMS ET
- `wave3-010` Garman Plumbing (Raleigh) — call/SMS ET
- `wave3-175` Neighborhood Mechanic (Indianapolis) — call/SMS ET

---

## Lightweight Execution Checklist

### Pre-send (5–8 min)
- [ ] Confirm phone + timezone before each block.
- [ ] Personalize first sentence with business name + service category.
- [ ] Keep first touch under ~90 words, one CTA, no links.

### During execution
- [ ] Run by timezone blocks: ET → CT → MT/PT.
- [ ] Missed call protocol: short VM then SMS within 10–15 min.
- [ ] Update `leads.jsonl` immediately (`status: contacted` + touch note).

### Follow-up discipline
- [ ] Max one follow-up inside this 24h window.
- [ ] Swap channel on follow-up (Call→SMS or SMS→Call).
- [ ] Stop after 2 total touches unless lead explicitly engages.

### End-of-window wrap (5 min)
- [ ] Tally: attempted / reached / replied / interested.
- [ ] Promote warm leads into next-day top 10.
- [ ] Carry non-responders forward with refreshed send windows only.
