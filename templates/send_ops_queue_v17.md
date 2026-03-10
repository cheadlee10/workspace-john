# Send Ops Queue v17 — Next 24 Hours
**Window:** Wed 2026-03-04 06:40 PST → Thu 2026-03-05 06:40 PST  
**Built from:** `leads.jsonl` reachable leads (`outreach_usable=true`) + `jobs.jsonl` proof point (Acme Co, Excel Audit, completed/paid $299 on 2026-03-02).

## Prioritization Logic (v17)
1. **Channel strength first:** email+phone leads (gpass) before phone-only.
2. **Revenue-weighted:** roofing/plumbing/fencing/handyman $900+ first.
3. **Local-time deliverability:** first touch inside 9:00–11:30 AM local.
4. **Two-touch cap in 24h:** initial touch + one channel-swap follow-up only.
5. **Proof discipline:** no pricing on first touch; include one credibility line if needed.

---

## Prioritized Outreach Queue (24h)

| Prio | Lead ID | Business | Est. Value | Channel | Message Snippet | Send Window (Lead Local) | Follow-up Trigger |
|---|---|---|---:|---|---|---|---|
| 1 | gpass-pnw-220 | Quality Pacific Roofing (Seattle) | $1200 | Email → Call | "Saw your Seattle roofing footprint—I've got a short callback-to-estimate workflow that helps convert more inbound quote requests. Want it?" | 9:00–9:25 AM PT | No email reply by 12:30 PM PT → call + VM; no response by 4:00 PM PT → 1 short SMS bump. |
| 2 | gpass-pnw-214 | Forever Roofing (Seattle) | $1200 | Email → Call | "Quick idea to tighten first-response and estimate handoff for roofing inquiries—can I send the 1-page play?" | 9:10–9:35 AM PT | No reply by noon PT → call once; if no pickup, SMS in 10 min. |
| 3 | gpass-pnw-219 | A Better Roofing Company (Seattle) | $1200 | Email → Call | "I help roofing teams capture more jobs from existing inbound leads with a cleaner dispatch + follow-up sequence." | 9:20–9:45 AM PT | No reply by 12:45 PM PT → call + VM; final SMS nudge by 3:30 PM PT. |
| 4 | gpass-pnw-213 | Handyman Rescue Team (Seattle) | $900 | Email → SMS | "I can share a fast handyman lead-response workflow that reduces missed-booking leaks this week." | 9:30–10:00 AM PT | No email reply in 3h → SMS with same CTA; stop on any response. |
| 5 | gpass-pnw-224 | Greenscape Landscaping of Spokane | $850 | Email → Call | "You’re already visible in Spokane—want a simple intake + callback template to book more estimate visits?" | 9:00–9:30 AM PT | No reply by 1:00 PM PT → call once; if no pickup, leave 15-sec VM. |
| 6 | gpass-pnw-208 | Lobo Roofing LLC (Tacoma) | $1200 | Email → Call | "For roofing leads, speed-to-first-contact usually decides close rate. Want a one-page workflow draft?" | 10:00–10:30 AM PT | No reply by 2:00 PM PT → call + VM; SMS 10 min later. |
| 7 | gpass-pnw-217 | McKenzie Roofing (Springfield) | $1100 | Email → Call | "I can send a short quote-conversion process for incoming roofing calls—built for small local crews." | 9:15–9:45 AM PT | No reply by 1:00 PM PT → call once + VM. |
| 8 | gpass-pnw-209 | Fitzpatrick Fence & Rail (Portland) | $900 | Email → Call | "Fence inquiries close faster with a tighter estimate follow-up loop—want a quick implementation draft?" | 9:20–9:50 AM PT | No email reply in 3h → call once; SMS if missed. |
| 9 | gpass-pnw-218 | Pro Fence Solutions (WA/OR) | $900 | Email → Call | "I help fencing shops convert more inbound requests without extra ad spend—want the 1-page system?" | 9:50–10:20 AM PT | No reply by 2:30 PM PT → call + brief VM. |
| 10 | gpass-pnw-223 | A1 Handyman (Boise) | $700 | Email → SMS | "Can I send a short handyman booking workflow that improves response speed on new service requests?" | 9:00–9:30 AM MT | No email reply by 12:00 PM MT → SMS follow-up. |
| 11 | gpass-pnw-216 | Top Notch Lawns & Landscaping (Idaho Falls) | $750 | Email → SMS | "Quick landscaping ops play: tighter intake + callback cadence to convert more estimate calls. Want it?" | 9:10–9:40 AM MT | No email reply in 3h → SMS bump with one CTA. |
| 12 | gpass-pnw-211 | Boise Landscaping and Lawn Care | $750 | Email → Call | "I can share a short lead-response template that helps landscaping teams book more on first contact." | 9:40–10:10 AM MT | No reply by 1:30 PM MT → call once. |
| 13 | nosite-068 | Quality Construction & Roofing (Houston) | $1500 | Call → SMS | "I help roofing/GC owners convert more inbound estimate demand through faster response and cleaner handoff." | 9:05–9:35 AM CT | No pickup → VM + SMS in 10 min; no reply by 2:00 PM CT final bump. |
| 14 | nosite-109 | San Diego Heating and Cooling | $900 | Call → SMS | "I can send a short missed-call recovery and dispatch script that usually lifts booked HVAC jobs." | 9:20–9:50 AM PT | No pickup → SMS in 10 min; no reply by 2:30 PM PT one follow-up. |
| 15 | nosite-061 | JV Pool Services (Dallas) | $700 | SMS → Call | "Want a quick service-business intake script that turns more inbound calls into booked appointments?" | 10:00–10:30 AM CT | No SMS reply in 3h → call once. |
| 16 | nosite-085 | Bug Free Exterminating (Atlanta) | $550 | SMS → Call | "Can I send a one-page pest-control lead-response flow that helps book more inspections from inbound requests?" | 10:00–10:30 AM ET | No SMS reply by 1:30 PM ET → call once. |
| 17 | nosite-087 | Contact Pest Control (Atlanta) | $550 | Call → SMS | "Quick conversion play for pest leads: faster response + cleaner appointment confirmation. Want the draft?" | 10:35–11:00 AM ET | No pickup → SMS in 10 min; no reply by 3:00 PM ET final nudge. |
| 18 | nosite-116 | Bachman Lawn Care (Kansas City) | $700 | SMS → Call | "I help lawn-care teams book more estimate visits from existing inquiry volume. Want a short workflow?" | 10:15–10:45 AM CT | No SMS reply in 3h → call once + VM if needed. |

---

## Backup Bench (use if completion pace >80%)
- `gpass-pnw-215` Seattle Pros LLC — $1000 — email/call  
- `gpass-pnw-210` Elite Metal Roofing — $1200 — email/call  
- `nosite-037` Regal Roofing & Contracting — $1500 — call/SMS  
- `nosite-050` Valley Landscaping — $800 — call/SMS  
- `nosite-053` RB Landscaping Service — $800 — SMS/call  
- `nosite-101` Cedar Fencing Plus — $800 — call/SMS

---

## Lightweight Execution Checklist

### Pre-send (5 min)
- [ ] Verify website still active + contact channel still valid.
- [ ] Personalize first line (business + city + service).
- [ ] Keep first touch under 100 words, one CTA, no pricing.
- [ ] Add one proof line only when needed: "recent paid workflow project ($299)."

### During send
- [ ] Run in priority order unless invalid number/email bounces.
- [ ] For call-first leads: VM (12–18 sec) then SMS ~10 min later.
- [ ] Update lead status to `contacted` and log timestamp/channel.

### Follow-up control
- [ ] Max 2 touches per lead in this 24h cycle.
- [ ] Swap channel on follow-up (Email→Call/SMS or SMS→Call).
- [ ] Stop all sends immediately on any positive/neutral response.

### Closeout (end of window)
- [ ] Tally: attempted / connected / replied / interested.
- [ ] Move warm leads to top of next queue.
- [ ] Roll non-responders to next-day queue with a fresh opener.