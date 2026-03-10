# Send Ops Queue v10 — Next 24 Hours
**Window:** Wed 2026-03-04 05:30 PST → Thu 2026-03-05 05:30 PST  
**Built from:** `leads.jsonl` (status=`new`, phone-reachable) + `jobs.jsonl` proof point (`Acme Co` Excel Audit completed/paid $299 on 2026-03-02).

## Prioritization Logic (v10)
1. **Reachable now:** phone/SMS-capable leads only.
2. **Value x close likelihood:** high-ticket services first, then strongest service-fit opportunities.
3. **Offer alignment boost:** bookkeeping/reporting and plumbing/HVAC/roofing urgency offers prioritized.
4. **Local send windows:** first-touch during 9:00 AM–12:00 PM lead local time.
5. **Simple cadence:** max 2 touches in 24h (initial + one follow-up trigger).

---

## Prioritized Outreach Queue (24h)

| Prio | Lead ID | Business | Est. Value | Channel | Message Snippet | Send Window (Lead Local) | Follow-up Trigger |
|---|---|---|---:|---|---|---|---|
| 1 | sprint11-025 | Dallas Tax and Books (Dallas, TX) | $900 | SMS → Call | “I help tax/bookkeeping teams cut manual reconciliation + client reporting time with lightweight automation. Want a quick 1-page workflow draft?” | 9:05–10:00 AM CT | No SMS reply in 2h: call once. No reply by 3:30 PM CT: final CTA bump. |
| 2 | nosite-068 | Quality Construction & Roofing (Houston, TX) | $1500 | Call → SMS | “Quick idea: tighten your call/quote flow so emergency roofing inquiries turn into booked jobs faster. Want a same-day draft?” | 9:00–10:00 AM CT | No pickup: VM + SMS in 10 min. No reply by 2:30 PM CT: final proof-text. |
| 3 | nosite-037 | Regal Roofing & Contracting (Seattle, WA) | $1500 | Call → SMS | “I help roofers convert listing traffic into estimate calls with a cleaner mobile-first intake path. Open to a fast mockup?” | 9:00–10:00 AM PT | No answer: VM + SMS in 10 min. No reply by 3:00 PM PT: one final nudge. |
| 4 | wa-google-002 | PMC General Contractor (Bellevue, WA) | $1200 | Call → SMS | “I can map a simple bid-request flow to capture more qualified remodel leads from your current listing traffic. Want a quick concept?” | 9:15–10:15 AM PT | No pickup: SMS in 10 min. No response by 3:00 PM PT: final CTA. |
| 5 | wa-google-005 | Environment West Landscape Services (Spokane, WA) | $1000 | Call → SMS | “I help landscaping teams turn directory views into quote requests with a tighter request/callback path. Want a fast sample?” | 9:00–10:00 AM PT | No answer: VM + SMS in 10 min. No reply by 2:30 PM PT: one follow-up. |
| 6 | nosite-109 | San Diego Heating and Cooling (El Cajon, CA) | $900 | Call → SMS | “HVAC leads convert better when dispatch + quote steps are obvious. I can share a quick conversion layout for your market.” | 9:10–10:15 AM PT | Missed call: SMS in 10 min. No reply by 3:30 PM PT: final follow-up. |
| 7 | nosite-101 | Cedar Fencing Plus (Portland, OR) | $800 | Call → SMS | “Fence buyers convert better with direct estimate intake + project photo flow. Want a same-day conversion mockup?” | 9:30–10:15 AM PT | No pickup: SMS in 10 min. No response by 2:00 PM PT: one bump. |
| 8 | nosite-102 | Austin’s Custom Fencing (Portland, OR) | $800 | SMS → Call | “I can share a quick quote-flow concept to help your fence leads book faster from listing traffic.” | 10:30–11:15 AM PT | No SMS response by 2:30 PM PT: one call attempt. |
| 9 | nosite-001 | Perez Landscaping (Seattle, WA) | $800 | SMS → Call | “I help landscaping crews get more estimate requests with a simple mobile-first call/quote flow. Want a quick sample?” | 10:15–11:00 AM PT | No SMS reply in 3h: one call attempt. |
| 10 | nosite-004 | Northwest Landscape and Patio Bellevue | $800 | Call → SMS | “Patio/landscape traffic usually converts better with a direct ‘book estimate’ path. I can draft one around your top services.” | 11:00 AM–12:00 PM PT | No answer: SMS in 10 min. No reply by EOD PT: final nudge next AM block. |
| 11 | nosite-115 | Ace Fencing (Las Vegas, NV) | $800 | Call → SMS | “I can help fence inquiries convert faster with a cleaner estimate flow and faster callback loop. Interested in a one-page draft?” | 9:15–10:00 AM PT | No pickup: VM + SMS in 10 min. No response by 2:30 PM PT: one follow-up. |
| 12 | wave4-044 | Millennium Plumbing Specialist (Sacramento, CA) | $700 | Call → SMS | “For 24-hour plumbing, a call-first quote path usually lifts booked dispatches fast. Want a tailored sample today?” | 9:00–10:00 AM PT | No answer: VM + SMS in 10 min. No reply by 3:00 PM PT: final short bump. |
| 13 | wave5-070 | Champion Plumbing (San Antonio, TX) | $575 | Call → SMS | “Water-heater/plumbing calls convert better with a clear emergency-to-booked flow. I can sketch one specific to San Antonio.” | 9:20–10:10 AM CT | No pickup: SMS in 10 min. No reply by 2:30 PM CT: one final CTA. |
| 14 | wave5-072 | SOSA The Plumber (San Antonio, TX) | $550 | SMS → Call | “I help plumbing teams turn listing traffic into booked service calls with a tighter intake path. Want a quick sample?” | 10:00–11:00 AM CT | No SMS response by 2:00 PM CT: one call attempt. |
| 15 | nosite-084 | American Termite & Pest Elimination (Atlanta, GA) | $550 | Call → SMS | “Urgent pest inquiries usually convert better with a direct call/quote flow. I can send a short conversion draft.” | 9:00–10:00 AM ET | No pickup: VM + SMS in 10 min. No reply by 2:00 PM ET: final bump. |

---

## Backup Bench (if capacity opens)
- `nosite-085` Bug Free Exterminating — Atlanta — $550 — call/SMS
- `nosite-086` CRC Services Termite & Pest Control — Atlanta — $550 — call/SMS
- `nosite-087` Contact Pest Control — Atlanta — $550 — SMS/call
- `wave4-003` Northwest Plumbing of Tennessee — Nashville — $500 — call/SMS
- `wave4-013` Precision Plumbing — Austin — $500 — call/SMS
- `nosite-116` Bachman Lawn Care — Kansas City — $700 — SMS/call

---

## Lightweight Execution Checklist

### Pre-send (5 minutes)
- [ ] Confirm phone and timezone for each lead before first touch.
- [ ] Personalize first line with business name + service keyword.
- [ ] Keep message under ~90 words with one CTA.

### During execution
- [ ] Run by timezone blocks (ET → CT → PT).
- [ ] If no answer on call: leave short VM, send SMS within 10 minutes.
- [ ] Log each attempt to `leads.jsonl` notes/status immediately.

### Follow-up control
- [ ] Max 2 total touches per lead in this 24h window.
- [ ] Alternate channel on follow-up (call→SMS or SMS→call).
- [ ] Stop touches once lead engages; move to active conversation handling.

### End-of-window wrap (5 minutes)
- [ ] Tally: attempted / reached / replied / interested.
- [ ] Promote warm responders to next-day top block.
- [ ] Carry non-responders to next queue with refreshed send windows.
