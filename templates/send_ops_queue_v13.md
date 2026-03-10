# Send Ops Queue v13 — Next 24 Hours
**Window:** Wed 2026-03-04 06:00 PST → Thu 2026-03-05 06:00 PST  
**Built from:** `leads.jsonl` (prioritize `status=new` + reachable phone/SMS records) and `jobs.jsonl` (Acme Co Excel Audit completed/paid $299 on 2026-03-02 for proof point).

## Prioritization Logic (v13)
1. **Reachability first:** direct phone/SMS-capable leads only for this 24h sprint.
2. **Deal size second:** higher estimated value first (roofing/GC/plumbing/HVAC).
3. **Recency boost:** wave4 + recent WA/Google leads ahead of older waves.
4. **Local-time send windows:** primary touch in 9:00–11:30 AM lead local time.
5. **Follow-up discipline:** max 2 touches in 24h; stop immediately on reply.

---

## Prioritized Outreach Queue (24h)

| Prio | Lead ID | Business | Est. Value | Channel | Message Snippet | Send Window (Lead Local) | Follow-up Trigger |
|---|---|---|---:|---|---|---|---|
| 1 | nosite-068 | Quality Construction & Roofing (Houston, TX) | $1500 | Call → SMS | "I help roofing teams convert more inbound calls into booked estimates with a tighter intake flow. Want a 1-page sample?" | 9:00–9:45 AM CT | No pickup: VM + SMS in 10 min. No reply by 3:00 PM CT: final bump. |
| 2 | nosite-037 | Regal Roofing & Contracting (Seattle, WA) | $1500 | Call → SMS | "I can show a simple mobile-first estimate flow that helps roofing leads book faster. Open to a quick sample?" | 9:00–9:45 AM PT | No pickup: VM + SMS in 10 min. No reply by 3:00 PM PT: final bump. |
| 3 | wa-google-002 | PMC General Contractor (Bellevue, WA) | $1200 | Call → SMS | "Quick idea: tighten bid-request intake so more qualified remodel leads convert. Want a short draft?" | 9:15–10:00 AM PT | No pickup: SMS in 10 min. No reply by 3:00 PM PT: one final CTA. |
| 4 | wa-google-005 | Environment West Landscape Services (Spokane, WA) | $1000 | Call → SMS | "I can share a quick estimate-request workflow to turn more listing traffic into booked landscaping jobs." | 9:00–9:45 AM PT | No pickup: VM + SMS in 10 min. No reply by 2:30 PM PT: final bump. |
| 5 | nosite-109 | San Diego Heating and Cooling (El Cajon, CA) | $900 | Call → SMS | "I help HVAC operators convert urgent calls faster with cleaner intake + callback steps. Want a 1-page version?" | 10:00–10:45 AM PT | No pickup: SMS in 10 min. No reply by 3:30 PM PT: one follow-up. |
| 6 | wa-google-001 | PNW Landscaping & Services (Seattle, WA) | $800 | SMS → Call | "Can I send a short idea to increase booked landscaping estimates from your current listing traffic?" | 10:00–10:45 AM PT | No SMS reply by 1:30 PM PT: one call attempt. |
| 7 | nosite-004 | Northwest Landscape and Patio Bellevue | $800 | Call → SMS | "Patio/landscape leads book faster with a tighter quote flow. Want a same-day mockup?" | 10:30–11:15 AM PT | No pickup: SMS in 10 min. No reply by EOD PT: hold for Thu retry. |
| 8 | nosite-001 | Perez Landscaping (Seattle, WA) | $800 | SMS → Call | "I can send a simple quote+callback workflow that helps landscaping crews close more estimate requests." | 11:00–11:30 AM PT | No SMS reply in 3h: one call attempt. |
| 9 | nosite-002 | Ligaya Landscaping (Seattle, WA) | $800 | SMS → Call | "Quick win: convert more listing inquiries into booked landscaping visits with a tighter intake flow." | 11:00–11:30 AM PT | No SMS reply in 3h: one call attempt. |
| 10 | nosite-003 | Greenscapes Landscaping (Seattle, WA) | $800 | SMS → Call | "I can share a 1-page process that improves callback speed and estimate bookings. Want it?" | 11:15 AM–12:00 PM PT | No SMS reply by 3:30 PM PT: one call attempt. |
| 11 | nosite-005 | Envision Landscaping (Bellevue, WA) | $800 | Call → SMS | "I help landscapers tighten estimate intake so mobile visitors become booked jobs faster." | 11:30 AM–12:00 PM PT | No pickup: SMS in 10 min. No reply by 4:00 PM PT: final bump. |
| 12 | nosite-115 | Ace Fencing (Las Vegas, NV) | $800 | Call → SMS | "Fence inquiries convert better with a direct estimate path + faster callback. Want a quick sample?" | 10:00–10:45 AM PT | No pickup: VM + SMS in 10 min. No reply by 2:30 PM PT: one follow-up. |
| 13 | nosite-101 | Cedar Fencing Plus (Portland, OR) | $800 | Call → SMS | "I can send a short quote-flow template to increase booked fence estimates from listing traffic." | Thu 9:00–9:45 AM PT | No pickup: SMS in 10 min. No reply by 1:30 PM PT: one follow-up. |
| 14 | nosite-102 | Austin's Custom Fencing (Portland, OR) | $800 | SMS → Call | "Want a quick workflow that helps fence leads respond and book faster?" | Thu 9:45–10:30 AM PT | No SMS reply by 1:30 PM PT: one call attempt. |
| 15 | nosite-116 | Bachman Lawn Care (Kansas City, MO) | $700 | SMS → Call | "I can send a short process that lifts lawn-care booking rate from incoming inquiries. Open to it?" | 9:15–10:00 AM CT | No SMS reply in 2.5h: one call attempt. |
| 16 | wave4-044 | Millennium Plumbing Specialist (Sacramento, CA) | $700 | Call → SMS | "I help plumbing teams capture more emergency jobs via tighter dispatch + quote flow. Want a quick sample?" | Thu 9:00–9:45 AM PT | No pickup: VM + SMS in 10 min. No reply by 2:30 PM PT: final bump. |
| 17 | wave4-013 | Precision Plumbing (Austin, TX) | $500 | Call → SMS | "Quick win: reduce missed plumbing bookings with faster intake/callback handling. Want the one-page version?" | Thu 9:00–9:45 AM CT | No pickup: SMS in 10 min. No reply by 2:00 PM CT: final CTA. |
| 18 | wave4-003 | Northwest Plumbing of Tennessee (Nashville, TN) | $500 | SMS → Call | "I can send a short workflow to convert urgent plumbing inquiries into booked jobs faster." | Thu 9:10–10:00 AM CT | No SMS reply in 2.5h: one call attempt. |

---

## Backup Bench (use if queue clears early)
- `nosite-084` American Termite & Pest Elimination (Atlanta) — $550 — call/SMS
- `nosite-085` Bug Free Exterminating (Atlanta) — $550 — call/SMS
- `nosite-086` CRC Services Termite & Pest Control (Atlanta) — $550 — call/SMS
- `nosite-087` Contact Pest Control (Atlanta) — $550 — call/SMS
- `wave3-180` Stat Plumbing (Columbus) — $350 — call/SMS
- `wave3-010` Garman Plumbing (Raleigh) — $350 — call/SMS

---

## Lightweight Execution Checklist

### Pre-send (5 minutes)
- [ ] Confirm phone, timezone, and channel eligibility before each touch.
- [ ] Personalize first line with business name + service category.
- [ ] Keep SMS under ~85 words with one CTA.
- [ ] Optional proof line when relevant: "We recently completed a paid workflow project this week."

### Live send block
- [ ] Run by timezone sequence (CT first block, then PT).
- [ ] If call no-answer: leave 12–18 sec VM + send SMS within 10 minutes.
- [ ] Log each attempt immediately in `leads.jsonl` notes/status.

### Follow-up control
- [ ] Max 2 touches per lead in this 24h window.
- [ ] Alternate channel on follow-up (Call→SMS or SMS→Call).
- [ ] Stop contact immediately on reply; move to active handling.

### Closeout
- [ ] Tally attempted / connected / replied / interested.
- [ ] Move warm leads to top of next queue.
- [ ] Roll non-responders forward with fresh windows (no same-script repeat).
