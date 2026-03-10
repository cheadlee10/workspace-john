# Send Ops Queue v12 — Next 24 Hours
**Window:** Wed 2026-03-04 05:50 PST → Thu 2026-03-05 05:50 PST  
**Built from:** `leads.jsonl` (status=`new`, channel-usable prioritized) + `jobs.jsonl` (Acme Co Excel Audit completed/paid $299 on 2026-03-02 as credibility proof).

## Prioritization Logic (v12)
1. **Reachability first:** call/SMS-capable leads (`outreach_usable=true`, valid phone) go first.
2. **Value + urgency:** higher estimated value and emergency-intent services go first.
3. **Fresh wave preference:** newer wave4 opportunities get a freshness boost.
4. **Local-time windows:** first touch in 9:00–11:30 AM lead local time.
5. **Two-touch max in 24h:** initial touch + one follow-up trigger.

---

## Prioritized Outreach Queue (24h)

| Prio | Lead ID | Business | Est. Value | Channel | Message Snippet | Send Window (Lead Local) | Follow-up Trigger |
|---|---|---|---:|---|---|---|---|
| 1 | wave4-044 | Millennium Plumbing Specialist (Sacramento, CA) | $700 | Call → SMS | "I help plumbing teams capture more emergency calls with a tighter dispatch + quote flow. Want a quick 1-page sample for Sacramento?" | 9:00–9:45 AM PT | No pickup: leave VM + send SMS in 10 min. No response by 2:30 PM PT: final bump. |
| 2 | wave4-013 | Precision Plumbing (Austin, TX) | $500 | Call → SMS | "Quick win: reduce missed plumbing bookings with a faster intake and callback workflow. Open to a short sample?" | 9:00–9:45 AM CT | No pickup: SMS in 10 min. No response by 2:00 PM CT: one final CTA. |
| 3 | wave4-003 | Northwest Plumbing of Tennessee (Nashville, TN) | $500 | SMS → Call | "I can send a short workflow that helps convert urgent plumbing inquiries into booked jobs faster. Want it?" | 9:10–10:00 AM CT | No SMS reply in 2.5h: one call attempt. |
| 4 | nosite-068 | Quality Construction & Roofing (Houston, TX) | $1500 | Call → SMS | "I can map a cleaner estimate intake path for roofing leads so more calls turn into booked jobs. Want a quick draft?" | 9:00–9:45 AM CT | No answer: VM + SMS in 10 min. No response by 3:00 PM CT: final follow-up. |
| 5 | nosite-037 | Regal Roofing & Contracting (Seattle, WA) | $1500 | Call → SMS | "I help roofing teams convert listing traffic into scheduled estimates with a mobile-first quote flow. Worth a 1-page mockup?" | 9:00–9:45 AM PT | No answer: VM + SMS in 10 min. No response by 3:00 PM PT: final follow-up. |
| 6 | wa-google-002 | PMC General Contractor (Bellevue, WA) | $1200 | Call → SMS | "I can share a simple bid-request workflow to capture more qualified remodel leads from existing listing traffic." | 9:15–10:00 AM PT | No pickup: SMS in 10 min. No response by 3:00 PM PT: one final CTA. |
| 7 | wa-google-005 | Environment West Landscape Services (Spokane, WA) | $1000 | Call → SMS | "Landscaping listings convert better with a direct estimate + callback path. Want a quick sample tailored to Spokane?" | 9:00–9:45 AM PT | No answer: VM + SMS in 10 min. No response by 2:30 PM PT: final bump. |
| 8 | nosite-109 | San Diego Heating and Cooling (El Cajon, CA) | $900 | Call → SMS | "I can send a fast HVAC intake/dispatch layout that helps convert more urgent calls into booked jobs." | 10:00–10:45 AM PT | No pickup: SMS in 10 min. No response by 3:30 PM PT: one follow-up. |
| 9 | wa-google-001 | PNW Landscaping & Services (Seattle, WA) | $800 | SMS → Call | "I can send a quick mobile quote-flow idea to help turn more landscaping inquiries into booked estimates." | 10:00–10:45 AM PT | No SMS reply by 1:30 PM PT: one call attempt. |
| 10 | nosite-004 | Northwest Landscape and Patio Bellevue | $800 | Call → SMS | "Patio and landscape leads usually book faster with a tighter estimate-request path. Want a same-day mockup?" | 10:30–11:15 AM PT | No answer: SMS in 10 min. No response by EOD PT: hold for Thu AM retry. |
| 11 | nosite-001 | Perez Landscaping (Seattle, WA) | $800 | SMS → Call | "I help landscaping crews capture more estimate requests with a simple call + quote workflow. Want the 1-page version?" | 11:00–11:30 AM PT | No SMS reply in 3h: one call attempt. |
| 12 | nosite-002 | Ligaya Landscaping (Seattle, WA) | $800 | SMS → Call | "Can I send a short idea to convert more Yelp/listing traffic into booked landscaping estimates?" | 11:00–11:30 AM PT | No reply in 3h: one call attempt. |
| 13 | nosite-003 | Greenscapes Landscaping (Seattle, WA) | $800 | SMS → Call | "Quick win: tighten estimate intake + callback timing to lift booked landscaping jobs. Want a draft?" | 11:15 AM–12:00 PM PT | No reply by 3:30 PM PT: one call attempt. |
| 14 | nosite-005 | Envision Landscaping (Bellevue, WA) | $800 | Call → SMS | "I can map a simple estimate-request flow to help your landscaping leads book faster from mobile traffic." | 11:30 AM–12:00 PM PT | No pickup: SMS in 10 min. No response by 4:00 PM PT: final bump. |
| 15 | nosite-115 | Ace Fencing (Las Vegas, NV) | $800 | Call → SMS | "Fence inquiries convert better with a direct intake + callback loop. Want a quick version built for your market?" | 10:00–10:45 AM PT | No answer: VM + SMS in 10 min. No response by 2:30 PM PT: one follow-up. |
| 16 | nosite-101 | Cedar Fencing Plus (Portland, OR) | $800 | Call → SMS | "I can share a short quote-flow concept that helps turn fence listing traffic into booked estimates faster." | Thu 9:00–9:45 AM PT | No pickup: SMS in 10 min. No response by 1:30 PM PT: one follow-up. |
| 17 | nosite-102 | Austin's Custom Fencing (Portland, OR) | $800 | SMS → Call | "I can send a quick estimate workflow to help your fence leads book faster from listing traffic." | Thu 9:45–10:30 AM PT | No SMS response by 1:30 PM PT: one call attempt. |
| 18 | nosite-116 | Bachman Lawn Care (Kansas City, MO) | $700 | SMS → Call | "I can share a short workflow to convert more lawn-care inquiries into booked jobs. Want it?" | 9:15–10:00 AM CT | No SMS reply in 2.5h: one call attempt. |

---

## Backup Bench (if queue clears)
- `nosite-084` American Termite & Pest Elimination (Atlanta) — $550 — call/SMS
- `nosite-085` Bug Free Exterminating (Atlanta) — $550 — call/SMS
- `nosite-086` CRC Services Termite & Pest Control (Atlanta) — $550 — call/SMS
- `nosite-087` Contact Pest Control (Atlanta) — $550 — call/SMS
- `wave3-180` Stat Plumbing (Columbus) — $350 — call/SMS
- `wave3-010` Garman Plumbing (Raleigh) — $350 — call/SMS

---

## Lightweight Execution Checklist

### Pre-send (5 min)
- [ ] Verify number, timezone, and channel eligibility before each touch.
- [ ] Personalize first sentence with business name + service type.
- [ ] Keep initial SMS short (single CTA, under ~85 words).

### Live send block
- [ ] Execute by timezone (CT/ET first, then PT).
- [ ] If no-answer on call: 12–18 sec voicemail + SMS within 10 minutes.
- [ ] Log each attempt immediately in `leads.jsonl` notes/status.

### Follow-up control
- [ ] Max 2 touches in this 24h window.
- [ ] Alternate channel on follow-up (Call→SMS or SMS→Call).
- [ ] Stop outreach after reply; move lead into active handling.

### Closeout (end of window)
- [ ] Tally: attempted / connected / replied / interested.
- [ ] Promote warm responders to top of next queue.
- [ ] Carry non-responders into next queue with refreshed windows.
