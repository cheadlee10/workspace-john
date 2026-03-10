# Send Ops Queue v7 — Next 24 Hours
**Window:** Wed 2026-03-04 05:00 PST → Thu 2026-03-05 05:00 PST  
**Built from:** `leads.jsonl` (reachable + high-value new leads), `jobs.jsonl` (recent completed Excel Audit proof)

## Prioritization Rules (v7)
1. **Reachability first:** phone-present leads only for this 24h queue (call/SMS executable now).
2. **Value density:** prioritize est. value $700+ before $300–$600 tiers.
3. **Recency + urgency:** newer wave4/wave3 + emergency/roof/HVAC/plumbing terms get earlier windows.
4. **Timezone batching:** CT/ET first, then PT/MT to maximize live pickup windows.
5. **Cadence control:** max 2 touches per lead inside 24h (initial + one follow-up).

---

## Priority Outreach Queue (24h)

| Prio | Lead ID | Business | Est. Value | Channel | Message Snippet (first touch) | Send Window (local) | Follow-up Trigger |
|---|---|---|---:|---|---|---|---|
| 1 | nosite-068 | Quality Construction & Roofing (Houston, TX) | $1500 | Call → SMS | “Quick idea: a roofing quote page + call-first flow can capture emergency jobs you’re likely missing from directory traffic. Want a same-day draft?” | 9:00–10:00 AM CT | No answer: voicemail + SMS in 10–15 min. No reply by 1:30 PM CT: final short bump. |
| 2 | nosite-037 | Regal Roofing & Contracting (Seattle, WA) | $1500 | Call → SMS | “I can put together a fast roof-repair quote funnel that turns search traffic into booked calls. Open to a no-pressure preview?” | 9:00–10:15 AM PT | No pickup: voicemail + SMS in 10 min. No reply by 2:30 PM PT: 1 proof follow-up. |
| 3 | wa-google-002 | PMC General Contractor (Bellevue, WA) | $1200 | Call | “You can pull more estimate requests with a simple conversion page tailored to your top contractor services. Want me to mock one up?” | 10:00–11:15 AM PT | If missed: retry once at 3:30–4:15 PM PT. |
| 4 | wa-google-005 | Environment West Landscape Services (Spokane, WA) | $1000 | Call → SMS | “You already have visibility; I can help turn that into booked landscaping estimates with a lightweight quote page. Want a sample?” | 9:30–10:30 AM PT | No response in 4h: concise SMS nudge with single CTA. |
| 5 | nosite-109 | San Diego Heating and Cooling (El Cajon, CA) | $900 | Call → SMS | “HVAC intent is high—adding a call-now + quote flow can stop urgent jobs leaking to competitors. Open to a fast draft?” | 9:10–10:10 AM PT | No pickup: SMS in 10 min. No reply by 3:00 PM PT: final nudge. |
| 6 | wa-google-001 | PNW Landscaping & Services (Seattle, WA) | $800 | Call → SMS | “I can send a 1-page quote funnel concept that helps convert more landscaping inquiries from listings. Want to see it?” | 10:30–11:30 AM PT | No answer: SMS in 15 min. No reply by EOD: one follow-up tomorrow AM. |
| 7 | nosite-004 | Northwest Landscape and Patio Bellevue | $800 | SMS → Call | “You can capture more patio/landscape quote requests with a clean call-first page. Want a quick personalized mockup?” | 11:00 AM–12:00 PM PT | No SMS response in 3h: one call attempt. |
| 8 | nosite-101 | Cedar Fencing Plus (Portland, OR) | $800 | Call → SMS | “Fence installs close better with photos + direct quote intake. Want a same-day sample page for Cedar Fencing Plus?” | 9:45–10:30 AM PT | Missed call: SMS in 10 min; no response by 2:00 PM PT: one follow-up. |
| 9 | nosite-102 | Austin’s Custom Fencing (Portland, OR) | $800 | SMS | “I help fence companies turn listing traffic into quote requests with a simple conversion page. Interested in a quick preview?” | 10:45–11:30 AM PT | No response by next-day 10:00 AM PT: close with final nudge. |
| 10 | nosite-115 | Ace Fencing (Las Vegas, NV) | $800 | Call → SMS | “A direct quote funnel can lift install requests without extra ad spend. Want a no-pressure draft?” | 9:15–10:00 AM PT | No answer: SMS in 10 min. No reply by EOD PT: one final AM follow-up. |
| 11 | nosite-061 | JV Pool Services (Dallas, TX) | $700 | Call → SMS | “Pool-service leads convert faster with a simple book-now + quote flow. Want a quick concept tailored to your services?” | 9:15–10:00 AM CT | No pickup: SMS in 10 min. No reply in 4h: one CTA-only follow-up. |
| 12 | wave4-044 | Millennium Plumbing Specialist (Sacramento, CA) | $700 | Call → SMS | “For 24-hour plumbing, a call-first landing flow can increase booked jobs quickly. Want a rapid sample draft?” | 9:05–10:00 AM PT | No pickup: voicemail + SMS in 15 min. No response by 3:00 PM PT: final short follow-up. |
| 13 | wave4-013 | Precision Plumbing (Austin, TX) | $500 | Call → SMS | “I can help convert emergency plumbing searches into booked calls with a dedicated quote + dispatch page. Open to a preview?” | 10:15–11:00 AM CT | Missed call: SMS in 10 min. No response by 2:30 PM CT: one follow-up. |
| 14 | wave4-003 | Northwest Plumbing of Tennessee (Nashville, TN) | $500 | Call → SMS | “A simple emergency-plumbing conversion page can drive more booked jobs from existing demand. Want a same-day draft?” | 10:00–10:45 AM CT | No pickup: voicemail + SMS in 10–15 min. No response by 2:00 PM CT: final nudge. |
| 15 | nosite-084 | American Termite & Pest Elimination (Atlanta, GA) | $550 | Call → SMS | “I can share a quick quote-page concept that helps pest-control leads convert faster from directory traffic. Interested?” | 10:00–10:45 AM ET | No answer: SMS in 10 min. No response by 2:00 PM ET: one concise follow-up. |

---

## Backup Queue (if time remains)
- `nosite-085` Bug Free Exterminating (Atlanta) — call/SMS ET block
- `nosite-086` CRC Services Termite & Pest Control (Atlanta) — call/SMS ET block
- `nosite-087` Contact Pest Control (Atlanta) — call/SMS ET block
- `nosite-116` Bachman Lawn Care (Kansas City) — SMS + call CT block
- `wave3-010` Garman Plumbing (Raleigh) — call/SMS ET block

---

## Lightweight Execution Checklist

### Pre-send (8 min)
- [ ] Confirm phone validity and timezone per lead before each send block.
- [ ] Personalize first line with business name + service category.
- [ ] Keep first touch <= 90 words, one CTA, no pricing/links.

### During send blocks
- [ ] Execute in timezone order: ET → CT → PT.
- [ ] For missed calls: leave short voicemail, then SMS within 15 minutes.
- [ ] Log each touch immediately in `leads.jsonl` notes/status (`new` → `contacted` when reached).

### Follow-up control
- [ ] Trigger follow-up only per queue rule (single follow-up max in 24h).
- [ ] Use channel swap on follow-up (Call→SMS or SMS→Call).
- [ ] Stop after 2 touches if no engagement.

### End-of-window wrap (5 min)
- [ ] Count: attempted / reached / replied / interested.
- [ ] Promote warm responses to next-day priority list.
- [ ] Roll no-response leads to next queue with refreshed send window.
