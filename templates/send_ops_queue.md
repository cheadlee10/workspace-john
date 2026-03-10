# Send Ops Queue — Next 24 Hours

**Window built:** Wed 2026-03-04 04:00 PST  
**Objective:** Fast first-touch on highest-value, reachable leads (phone/SMS-capable), then same-day follow-up.

## Prioritization Logic
1. Reachable now (valid phone + SMS/call capability)
2. Highest estimated value
3. Newest/high-intent wave (wave4 plumbing + unclaimed local service)
4. Geographic batching to reduce context switching

## Outreach Queue (Prioritized)

| Priority | Lead ID | Client | Channel | Message snippet (customize + send) | Send window (local to lead) | Follow-up trigger |
|---|---|---|---|---|---|---|
| P1 | nosite-037 | Regal Roofing & Contracting (Seattle) | SMS then Call | "Quick win idea: I can get you a simple lead-capture site/live quote flow in 48h so Yelp/Google traffic turns into booked roofing jobs. Want a 2-min breakdown?" | **Today 8:35–9:15 AM PT** | If no reply in 3h → call once + short VM; if no response by 4:30 PM → final SMS bump |
| P1 | nosite-068 | Quality Construction & Roofing (Houston) | SMS then Call | "Noticed your listing traffic opportunity—can build a conversion-focused website + quote request funnel to capture roofing/construction leads quickly. Open to a 10-min chat today?" | **Today 9:00–10:00 AM CT** | If no reply in 3h → call once; if still no reply by 5:00 PM CT → send proof-style follow-up |
| P1 | wa-google-002 | PMC General Contractor (Bellevue) | Call first then SMS | "I help contractors stop losing high-intent calls from profile traffic with a fast website + quote intake setup. I have a 1-page plan for PMC—want me to text it?" | **Today 8:45–9:30 AM PT** | If call missed/voicemail → immediate SMS recap; if no reply by 2:00 PM PT → second SMS with specific offer |
| P1 | wave4-044 | Millennium Plumbing Specialist (Sacramento) | SMS then Call | "Plumbers in your market are winning with simple emergency-call landing pages. I can set one up fast with call tracking + quote form. Want a sample layout?" | **Today 8:30–9:15 AM PT** | If no reply in 2.5h → call once; if no contact by 4:00 PM PT → urgency follow-up SMS |
| P2 | wave4-003 | Northwest Plumbing of Tennessee (Nashville) | SMS then Call | "Saw strong emergency plumbing intent in your area—can help turn listing traffic into booked jobs with a fast conversion page + lead routing. Open to quick details?" | **Today 9:00–10:00 AM CT** | No reply in 3h → call attempt; no contact by 5:30 PM CT → send final same-day nudge |
| P2 | wave4-013 | Precision Plumbing (Austin) | SMS then Call | "I build lean plumbing sites that convert urgent calls fast (quote form + call CTA + service-area trust blocks). Can text you a draft structure?" | **Today 9:00–10:00 AM CT** | No reply in 3h → single call; no response by 5:00 PM CT → send case-style follow-up |
| P2 | wa-google-005 | Environment West Landscape Services (Spokane) | Call then SMS | "Quick growth idea: a conversion-first landscaping site + request-quote flow to capture leads coming from directory/listing traffic. Want the short plan?" | **Today 9:00–10:00 AM PT** | If unreachable by phone → SMS immediately; no reply by 3:00 PM PT → 2nd touch |
| P2 | wa-google-001 | PNW Landscaping & Services (Seattle) | SMS then Call | "You likely have ready-to-buy local traffic; I can set up a clean booking/quote page so those clicks become jobs. Want a quick sample?" | **Today 10:15–11:00 AM PT** | No reply in 3h → call once; if no response by 5:00 PM PT → short social-proof SMS |
| P3 | nosite-109 | San Diego Heating and Cooling | SMS then Call | "HVAC leads drop fast without a clear emergency/contact funnel. I can spin up a fast, mobile-first lead capture page in 48h. Interested?" | **Today 9:00–10:00 AM PT** | No reply in 3h → call attempt; no response by EOD → schedule tomorrow AM retry |
| P3 | nosite-052 | CC Landscaping (Phoenix) | SMS then Call | "I help local landscaping companies convert profile traffic into booked estimates with a simple website + quote workflow. Want a quick costed option?" | **Today 9:00–10:00 AM MT** | No reply in 3h → call; no response by 5:00 PM MT → final same-day ping |
| P3 | nosite-115 | Ace Fencing (Las Vegas) | SMS then Call | "You can capture more fence-install requests with a focused landing page + instant estimate form. I can map this out quickly if helpful." | **Today 9:00–10:00 AM PT** | No reply in 3h → call once; no response by 4:30 PM PT → concise follow-up |
| P3 | nosite-101 | Cedar Fencing Plus (Portland) | Call then SMS | "Calling with a quick growth idea: conversion-focused fence services page + quote capture to turn search traffic into jobs. Can I text the outline?" | **Today 9:15–10:00 AM PT** | If no pickup → SMS in 2 minutes; no reply by 3:30 PM PT → second SMS |

---

## Lightweight Execution Checklist

### Pre-send (10 min)
- [ ] Confirm each number format and timezone before send
- [ ] Personalize first line with service + city
- [ ] Keep each SMS under ~320 chars, one CTA, no links on first touch

### Send block 1 (morning local)
- [ ] Execute all **P1** in listed order
- [ ] Log each action immediately (sent/called/VM/no-answer/replied)
- [ ] For missed calls, send fallback SMS within 2 minutes

### Send block 2 (late morning/noon local)
- [ ] Execute **P2**
- [ ] Prioritize live conversations over finishing sequence
- [ ] If reply is positive, move to mini-discovery script + book call

### Send block 3 (afternoon local)
- [ ] Execute **P3**
- [ ] Trigger follow-ups based on table timing rules
- [ ] Close day with a final no-pressure bump to non-responders

### Logging + handoff
- [ ] Update lead status per result (`new` → `contacted` / `negotiating` / `lost`)
- [ ] Add short notes with objection/interest signals
- [ ] Build tomorrow’s queue from today’s non-responders + warm replies
