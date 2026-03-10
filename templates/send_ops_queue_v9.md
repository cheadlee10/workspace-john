# Send Ops Queue v9 — Next 24 Hours
**Window:** Wed 2026-03-04 05:20 PST → Thu 2026-03-05 05:20 PST  
**Built from:** `leads.jsonl` reachable new leads (phone-present) + `jobs.jsonl` proof point (Acme Co Excel Audit completed/paid, $299 on 2026-03-02).

## Prioritization Logic (v9)
1. **Reachability first:** only leads with executable phone outreach in next 24h.
2. **Revenue-weighted:** prioritize $900–$1500 deals before $500–$800.
3. **Urgency vertical boost:** roofing / HVAC / emergency plumbing first.
4. **Local-time delivery:** first touches in each lead’s 9:00 AM–12:00 PM local window.
5. **Simple cadence:** initial touch + one follow-up trigger max.

---

## Prioritized Outreach Queue (24h)

| Prio | Lead ID | Business | Est. Value | Channel | Message Snippet | Send Window (Lead Local) | Follow-up Trigger |
|---|---|---|---:|---|---|---|---|
| 1 | nosite-068 | Quality Construction & Roofing (Houston, TX) | $1500 | Call → SMS | “Quick idea for roofing calls: I can map a tighter quote/callback flow so more emergency inquiries turn into booked jobs. Want a 1-page draft?” | 9:00–10:00 AM CT | No pickup: VM + SMS in 10 min. No reply by 2:00 PM CT: final CTA bump. |
| 2 | nosite-037 | Regal Roofing & Contracting (Seattle, WA) | $1500 | Call → SMS | “I help roofing teams convert directory traffic into booked estimates with a simple call-first flow. Open to a fast mockup?” | 9:00–10:00 AM PT | No answer: VM + SMS in 10 min. No reply by 3:00 PM PT: one proof follow-up. |
| 3 | nosite-109 | San Diego Heating and Cooling (El Cajon, CA) | $900 | Call → SMS | “HVAC leads convert best when dispatch + quote steps are obvious. I can share a quick conversion draft for your market.” | 9:10–10:15 AM PT | No pickup: SMS in 10 min. No reply by 3:30 PM PT: final follow-up. |
| 4 | wave4-044 | Millennium Plumbing Specialist (Sacramento, CA) | $700 | Call → SMS | “For 24-hour plumbing, a call-first page usually lifts booked jobs fast. Want a same-day sample tailored to Sacramento?” | 9:00–10:00 AM PT | No pickup: VM + SMS in 15 min. No response by 3:00 PM PT: final short bump. |
| 5 | wave4-013 | Precision Plumbing (Austin, TX) | $500 | Call → SMS | “I can help emergency plumbing searches convert to booked dispatch calls with a tighter quote flow. Want a quick preview?” | 9:30–10:30 AM CT | Missed call: SMS in 10 min. No reply by 2:30 PM CT: one follow-up. |
| 6 | wave4-003 | Northwest Plumbing of Tennessee (Nashville, TN) | $500 | Call → SMS | “Simple call-first plumbing funnels can increase booked jobs from current traffic. Open to a no-pressure draft?” | 10:00–11:00 AM CT | No pickup: VM + SMS in 10 min. No reply by 2:00 PM CT: final CTA. |
| 7 | nosite-001 | Perez Landscaping (Seattle, WA) | $800 | SMS → Call | “I can help you capture more landscape quote requests with a clean mobile-first call flow. Want a quick sample?” | 10:30–11:30 AM PT | No SMS reply in 3h: one call attempt. |
| 8 | nosite-004 | Northwest Landscape and Patio Bellevue | $800 | Call → SMS | “Patio/landscape buyers convert better with a direct estimate flow. I can draft one around your top services.” | 11:00 AM–12:00 PM PT | No answer: SMS in 10 min. No response by EOD PT: one final AM follow-up. |
| 9 | nosite-033 | A A Landscaping (Bothell, WA) | $800 | SMS | “I help local landscaping teams turn listing traffic into estimate requests with a simple quote page. Interested in a preview?” | 11:15 AM–12:00 PM PT | No reply by next-day 10:00 AM PT: final nudge then park. |
| 10 | nosite-101 | Cedar Fencing Plus (Portland, OR) | $800 | Call → SMS | “Fence jobs convert better with photos + direct quote intake. Want a same-day conversion mockup?” | 9:30–10:15 AM PT | Missed call: SMS in 10 min. No reply by 2:00 PM PT: one follow-up. |
| 11 | nosite-102 | Austin’s Custom Fencing (Portland, OR) | $800 | SMS → Call | “I can share a fast estimate-flow concept to help your fence leads convert faster from directory traffic.” | 10:30–11:15 AM PT | No SMS response by 2:30 PM PT: one call attempt. |
| 12 | nosite-061 | JV Pool Services (Dallas, TX) | $700 | Call → SMS | “Pool leads close faster with a clear book-now + quote sequence. Want a tailored one-page concept?” | 9:15–10:00 AM CT | No pickup: SMS in 10 min. No response in 4h: one CTA-only follow-up. |
| 13 | nosite-116 | Bachman Lawn Care (Kansas City, MO) | $700 | SMS → Call | “I can help turn lawn-care listing views into booked jobs with a simple request-quote flow. Want a quick sample?” | 9:30–10:30 AM CT | No SMS response by 1:30 PM CT: one call attempt. |
| 14 | nosite-084 | American Termite & Pest Elimination (Atlanta, GA) | $550 | Call → SMS | “Pest-control urgency traffic converts best with a direct call/quote path. I can share a short conversion draft.” | 9:00–10:00 AM ET | No pickup: VM + SMS in 10 min. No reply by 2:00 PM ET: final bump. |
| 15 | nosite-087 | Contact Pest Control (Atlanta, GA) | $550 | SMS | “I help pest-control teams get more booked calls from existing listing traffic using a streamlined quote flow.” | 10:00–11:00 AM ET | No reply by 3:00 PM ET: one call attempt then park. |

---

## Backup Bench (ready if capacity opens)
- `nosite-002` Ligaya Landscaping — Seattle — $800 — call/SMS
- `nosite-003` Greenscapes Landscaping — Seattle — $800 — call/SMS
- `nosite-049` Valle Landscaping — Phoenix — $800 — call/SMS
- `nosite-050` Valley Landscaping — Phoenix — $800 — call/SMS
- `nosite-052` CC Landscaping — Phoenix — $800 — call/SMS
- `nosite-053` RB Landscaping Service — Phoenix — $800 — call/SMS

---

## Lightweight Execution Checklist

### Pre-send (5 min)
- [ ] Verify phone + timezone for each lead before send block.
- [ ] Personalize first line with business name + service type.
- [ ] Keep first touch under ~90 words, one CTA, no links.

### During execution
- [ ] Run blocks by timezone (ET → CT → PT).
- [ ] Missed-call protocol: short VM + SMS within 10–15 min.
- [ ] Log immediately in `leads.jsonl` (`status: contacted` + timestamp/note).

### Follow-up control
- [ ] Max one follow-up in this 24h window.
- [ ] Swap channel for follow-up (Call→SMS or SMS→Call).
- [ ] Stop after 2 touches unless lead engages.

### End-of-window wrap (5 min)
- [ ] Tally: attempted / reached / replied / interested.
- [ ] Promote warm responders to next-day top block.
- [ ] Roll non-responders into backup queue with refreshed windows.
