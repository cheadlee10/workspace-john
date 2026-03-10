# Send Ops Queue v38 (Next 24 Hours)

**Window:** Wed 2026-03-04 13:20 PST → Thu 2026-03-05 13:20 PST  
**Source context used:** `leads.jsonl` (phone-verified + freshest wave4/WA leads), `jobs.jsonl` (low delivery load; prioritize outbound velocity)

## Priority Logic
1. **P1 = Fresh + phone-present + higher ACV** (wave4/WA plumbing + contractor)
2. **P2 = Reachable legacy with validated phone** (nosite/wave3, still contactable)
3. **P3 = No direct phone** (Yelp message/request quote only, lower immediate conversion)

## Prioritized Outreach Queue

| Pri | Lead ID | Client | Channel | Message snippet (first touch) | Send window (PST) | Follow-up trigger |
|---|---|---|---|---|---|---|
| P1 | wave4-044 | Millennium Plumbing Specialist | Call + SMS fallback | "Quick idea: we set up a plumbing dispatch + follow-up tracker so emergency calls stop slipping and tech utilization is visible daily." | Wed 13:25–13:40 | If no pickup: SMS in 2 min. If no reply by Thu 09:00, second call + short ROI text. |
| P1 | wave4-013 | Precision Plumbing | Call + SMS fallback | "We can build a lightweight lead-to-job sheet for water-heater and urgent calls so your close rate improves without extra admin." | Wed 13:40–13:55 | If missed call: SMS immediately. If no response by Thu 09:20, one final call attempt. |
| P1 | wave4-003 | Northwest Plumbing of Tennessee | Call + SMS fallback | "I help plumbing teams tighten callback speed with one simple pipeline board for estimate, schedule, and follow-up." | Wed 13:55–14:10 | No pickup → SMS. No response by Thu 08:45 local, retry call once. |
| P1 | wa-google-002 | PMC General Contractor | Call + SMS fallback | "We can centralize estimate tracking + callback reminders so fewer bids go cold and crews stay booked." | Wed 14:10–14:25 | If no answer, SMS. If no reply by Thu 09:45, send proof-style follow-up text. |
| P1 | wa-google-005 | Environment West Landscape Services | Call + SMS fallback | "We build landscaping ops trackers (lead, quote, job-cost) so margin by crew is clear each week." | Wed 14:25–14:40 | If no pickup: SMS. If no response by Thu 10:00, second and final call. |
| P2 | nosite-037 | Regal Roofing & Contracting | Call + SMS fallback | "We help roofing shops run estimate-to-close tracking so fewer inbound leads stall and follow-ups happen on time." | Wed 14:55–15:10 | If voicemail/no pickup: SMS. If no reply by Thu 09:30, final SMS with 30-min audit CTA. |
| P2 | nosite-068 | Quality Construction & Roofing | Call + SMS fallback | "Fast win: one dashboard for incoming leads, pending estimates, and next callbacks to boost conversion." | Wed 15:10–15:25 | No answer → SMS. Retry once Thu morning; pause after 2 total attempts. |
| P2 | wa-google-003 | Joc's Landscaping | Call + SMS fallback | "I can set up a simple quote + schedule workflow so leads get contacted faster and jobs are easier to forecast." | Wed 15:25–15:40 | If no pickup: SMS. If no response by Thu 10:15, one concise follow-up text. |
| P2 | wa-google-007 | The Honest Handyman & Hauling LLC | Call + SMS fallback | "We can automate quote follow-ups and daily job board updates so handyman leads don’t go cold." | Wed 15:40–15:55 | If unanswered: SMS. If no reply by Thu 10:30, one final call attempt. |
| P2 | nosite-004 | Northwest Landscape and Patio Bellevue | Call + SMS fallback | "Quick system upgrade: track inquiries, estimates, and booked jobs in one place to reduce missed callbacks." | Wed 15:55–16:10 | If no answer: SMS. Follow up Thu 09:50 if no response. |
| P3 | wave4-049 | Emerald City Plumbing & Drain | Yelp message/request quote | "Noticed your Yelp presence—can share a simple dispatch + follow-up workflow to capture more emergency jobs." | Wed 16:25–16:35 | If no reply by Thu 11:00, send shorter second touch with one outcome metric. |
| P3 | wave4-054 | South Sound Drain & Sewer | Yelp message/request quote | "We help drain/sewer teams speed lead response and track booked jobs with a lightweight ops board." | Wed 16:35–16:45 | If no response by Thu 11:20, one final Yelp follow-up. |

---

## Lightweight Execution Checklist

- [ ] Start run log: `lead_id | channel | sent_at | outcome | next_action_at | notes`.
- [ ] Execute all **P1 call blocks first** (highest same-day close probability).
- [ ] Use call-first, SMS-second cadence for phone leads (2 attempts max in this 24h window).
- [ ] Keep SMS under 300 chars, outcome-led, and include a single CTA ("open to a 10-min walkthrough?").
- [ ] Immediately update `leads.jsonl` statuses/notes after each touch (`contacted`, timestamp, channel, outcome).
- [ ] Closeout at Thu ~13:00 PST: count total touches, responses, callbacks booked, and roll forward unresolved leads.

## Notes for Operator
- Best near-term conversion = **phone-verified plumbing + contractor leads** in P1/P2.
- Since `jobs.jsonl` shows low active fulfillment load, bias toward **speed + volume** during this window.
- For P3 (Yelp-only), keep touches short and proof-based; do not overinvest time in-thread.