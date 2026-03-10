# Send Ops Queue v14 — Next 24 Hours
**Window:** Wed 2026-03-04 06:10 PST → Thu 2026-03-05 06:10 PST  
**Built from:** `leads.jsonl` reachable records (`channel_flags.can_call/can_sms=true`, mostly `status=new`) + `jobs.jsonl` proof point (Acme Co paid $299 on 2026-03-02).

## Prioritization Logic (v14)
1. **Reachable now:** direct phone/SMS only in this sprint.
2. **Revenue-weighted:** $700–$1500 targets first, then $500–$700.
3. **Recency + intent:** wave4 plumbing and recent WA/Google leads get priority.
4. **Local business hours:** primary touches scheduled 9:00 AM–12:00 PM local.
5. **Tight follow-up:** max 2 touches/lead in 24h; stop on any reply.

---

## Prioritized Outreach Queue (24h)

| Prio | Lead ID | Business | Est. Value | Channel | Message Snippet | Send Window (Lead Local) | Follow-up Trigger |
|---|---|---|---:|---|---|---|---|
| 1 | nosite-068 | Quality Construction & Roofing (Houston, TX) | $1500 | Call → SMS | "I help roofing teams book more estimate calls by tightening intake + callback flow. Want a quick one-page sample?" | 9:00–9:40 AM CT | No pickup: leave short VM + SMS in 10 min. No reply by 2:30 PM CT: final bump. |
| 2 | nosite-037 | Regal Roofing & Contracting (Seattle, WA) | $1500 | Call → SMS | "Quick idea: improve speed-to-estimate from your listing traffic with a simple mobile intake flow." | 9:00–9:40 AM PT | No pickup: VM + SMS in 10 min. No reply by 2:30 PM PT: final bump. |
| 3 | wa-google-002 | PMC General Contractor (Bellevue, WA) | $1200 | Call → SMS | "I can send a short bid-request workflow that helps convert more inbound remodel leads into booked jobs." | 9:15–10:00 AM PT | No pickup: SMS in 10 min. No reply by 3:00 PM PT: one follow-up. |
| 4 | wa-google-005 | Environment West Landscape Services (Spokane, WA) | $1000 | Call → SMS | "I help landscapers turn listing inquiries into scheduled estimates faster with cleaner intake steps." | 9:00–9:45 AM PT | No pickup: VM + SMS in 10 min. No reply by 2:00 PM PT: one follow-up. |
| 5 | nosite-109 | San Diego Heating and Cooling (El Cajon, CA) | $900 | Call → SMS | "I can share a 1-page callback flow that helps HVAC teams capture more urgent jobs." | 10:00–10:45 AM PT | No pickup: SMS in 10 min. No reply by 3:30 PM PT: one follow-up. |
| 6 | wa-google-001 | PNW Landscaping & Services (Seattle, WA) | $800 | SMS → Call | "Can I send a short idea to increase booked landscaping estimates from your current listing traffic?" | 10:00–10:45 AM PT | No SMS reply by 1:30 PM PT: one call attempt. |
| 7 | nosite-004 | Northwest Landscape and Patio Bellevue | $800 | Call → SMS | "Patio/landscape leads usually convert better with a tighter quote request + fast callback workflow." | 10:30–11:15 AM PT | No pickup: SMS in 10 min. No reply by 3:30 PM PT: final CTA. |
| 8 | nosite-001 | Perez Landscaping (Seattle, WA) | $800 | SMS → Call | "I can send a simple quote + callback playbook that helps crews book more estimates without extra ad spend." | 11:00–11:30 AM PT | No SMS reply in 3h: one call attempt. |
| 9 | nosite-002 | Ligaya Landscaping (Seattle, WA) | $800 | SMS → Call | "Want a quick workflow that helps convert more Yelp inquiries into booked landscaping visits?" | 11:00–11:40 AM PT | No SMS reply in 3h: one call attempt. |
| 10 | nosite-003 | Greenscapes Landscaping (Seattle, WA) | $800 | SMS → Call | "I can send a one-page process to improve callback speed and estimate booking rate." | 11:15 AM–12:00 PM PT | No SMS reply by 3:30 PM PT: one call attempt. |
| 11 | nosite-005 | Envision Landscaping (Bellevue, WA) | $800 | Call → SMS | "I help landscaping teams tighten intake so mobile visitors become booked jobs faster." | 11:30 AM–12:00 PM PT | No pickup: SMS in 10 min. No reply by 4:00 PM PT: final bump. |
| 12 | wave4-044 | Millennium Plumbing Specialist (Sacramento, CA) | $700 | Call → SMS | "I help plumbing teams capture more emergency work with tighter dispatch + intake handling. Want a short sample?" | 1:00–1:45 PM PT | No pickup: VM + SMS in 10 min. No reply by 4:30 PM PT: one follow-up. |
| 13 | wave4-013 | Precision Plumbing (Austin, TX) | $500 | Call → SMS | "Quick win: reduce missed plumbing jobs with faster first-response and callback routing." | 1:30–2:15 PM CT | No pickup: SMS in 10 min. No reply by 5:00 PM CT: final CTA. |
| 14 | wave4-003 | Northwest Plumbing of Tennessee (Nashville, TN) | $500 | SMS → Call | "I can send a short workflow to convert urgent plumbing inquiries into booked jobs faster." | 2:00–2:45 PM CT | No SMS reply in 2.5h: one call attempt. |
| 15 | nosite-115 | Ace Fencing (Las Vegas, NV) | $800 | Call → SMS | "Fence inquiries convert better with a direct estimate path and fast callback script. Want a quick draft?" | 2:00–2:45 PM PT | No pickup: VM + SMS in 10 min. No reply by 5:30 PM PT: one follow-up. |
| 16 | nosite-116 | Bachman Lawn Care (Kansas City, MO) | $700 | SMS → Call | "Can I send a short booking workflow that helps turn lawn-care inquiries into scheduled jobs?" | 3:00–3:45 PM CT | No SMS reply by 6:00 PM CT: one call attempt. |

---

## Backup Bench (if ahead of pace)
- `nosite-101` Cedar Fencing Plus (Portland) — $800 — call/SMS  
- `nosite-102` Austin's Custom Fencing (Portland) — $800 — SMS/call  
- `nosite-084` American Termite & Pest Elimination (Atlanta) — $550 — call/SMS  
- `nosite-085` Bug Free Exterminating (Atlanta) — $550 — call/SMS  
- `nosite-086` CRC Services Termite & Pest Control (Atlanta) — $550 — call/SMS  
- `nosite-087` Contact Pest Control (Atlanta) — $550 — call/SMS

---

## Lightweight Execution Checklist

### Pre-send (5 min)
- [ ] Confirm phone validity + timezone before each touch.
- [ ] Personalize first sentence (business name + trade).
- [ ] Keep SMS under ~85 words with one CTA.
- [ ] Optional proof line: "We shipped a paid workflow project this week."

### During send blocks
- [ ] Run by local-time windows (CT then PT waves).
- [ ] If no answer on call: leave 12–18 sec VM, then SMS within 10 min.
- [ ] Log every touch in `leads.jsonl` notes/status immediately.

### Follow-up control
- [ ] Max 2 touches per lead in this 24h window.
- [ ] Alternate channel on follow-up (Call→SMS or SMS→Call).
- [ ] Stop outreach instantly on any reply.

### Closeout
- [ ] Tally: attempted / connected / replied / interested.
- [ ] Mark hot leads for priority in v15 queue.
- [ ] Roll non-responders with new send windows (no exact same copy).