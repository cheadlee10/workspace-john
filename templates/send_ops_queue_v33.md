# Send Ops Queue v33 (Next 24 Hours)
**Window covered:** Wed 2026-03-04 12:15 PST → Thu 2026-03-05 12:15 PST  
**Source basis:** `leads.jsonl` (phone-usable + high-intent plumbing/home-service waves), `jobs.jsonl` (recent paid completion for credibility)

## Prioritization logic (quick)
1. **P1:** Reachable now by **SMS/call** (`outreach_usable=true` + phone present), highest estimated value first.
2. **P2:** High-intent leads without phone but with Yelp profile URL (send Yelp Request-a-Quote / message).
3. **P3:** Lower-ticket but reachable phone leads to keep volume and reply surface area high.

---

## 24h Outreach Queue (prioritized)

| Pri | Lead ID | Prospect | Channel | Message snippet (customize before send) | Send window (PST) | Follow-up trigger |
|---|---|---|---|---|---|---|
| P1 | wave4-044 | Millennium Plumbing Specialist (Sacramento) | SMS → call | “Quick idea for Millennium: we help plumbing teams capture missed emergency calls and auto-follow up so jobs stop leaking. Want a 2-min teardown?” | 12:20–12:35 | If no SMS reply in 90 min, place 1 call + leave 20s VM. |
| P1 | wave4-013 | Precision Plumbing (Austin) | SMS → call | “We build fast booking funnels for plumbers (missed-call text-back + quote capture). Can I send a quick 3-point fix plan?” | 12:35–12:50 | No reply in 90 min: one call attempt. |
| P1 | wave4-003 | Northwest Plumbing of Tennessee | SMS → call | “Noticed strong demand in Nashville. We can help convert more urgent calls into booked jobs with simple automations. Open to a quick audit?” | 12:50–13:05 | No response in 2h: call once. |
| P1 | wa-google-002 | PMC General Contractor (Bellevue) | SMS → call | “We help contractors win more local jobs with a no-friction lead capture + follow-up flow. Want a fast teardown of your current setup?” | 13:05–13:20 | If unread/no reply in 2h: one call + VM. |
| P1 | wa-google-001 | PNW Landscaping & Services (Seattle) | SMS → call | “I can show how to turn missed inbound calls into booked estimates automatically. Want a short example for PNW Landscaping?” | 13:20–13:35 | No reply in 2h: call once. |
| P1 | wa-google-003 | Joc’s Landscaping (Everett) | SMS → call | “Quick win idea: instant callback text + estimate scheduling page for landscaping leads. Worth a 2-minute overview?” | 13:35–13:50 | No reply in 2h: call once. |
| P1 | wa-google-004 | Family Lawn Services (Everett) | SMS → call | “We help lawn teams book more jobs from the same ad/search traffic using simple lead-response automation. Want details?” | 13:50–14:05 | If no reply in 2h: one call attempt. |
| P1 | wa-google-005 | Environment West Landscape Services (Spokane) | SMS → call | “Can share a fast local-growth playbook: better quote intake + follow-up cadence for landscaping leads. Open to a quick chat?” | 14:05–14:20 | No reply in 2h: call once. |
| P1 | wa-google-006 | Keith’s Lawn & Landscape (Spokane) | SMS → call | “I help landscape businesses recover lost leads from missed calls/text lag. Want a free 3-point teardown?” | 14:20–14:35 | No reply in 2h: one call + VM. |
| P1 | wa-google-007 | The Honest Handyman & Hauling LLC (Vancouver) | SMS → call | “We build lightweight systems that turn handyman inquiries into scheduled jobs faster. Want a quick before/after example?” | 14:35–14:50 | No reply in 2h: call once. |
| P2 | wave4-057 | Drain Pros (Phoenix) | Yelp Request-a-Quote/message | “I can help Drain Pros convert more 24/7 emergency traffic with instant response automation + trust boosters. Open to a quick plan?” | 15:15–15:30 | If no Yelp response by next morning: send shorter proof-led follow-up. |
| P2 | wave4-060 | Plumbing Response Team (Phoenix) | Yelp Request-a-Quote/message | “We help family-owned plumbing teams increase booked calls without adding staff by improving response speed + follow-up.” | 15:30–15:45 | No response in ~18h: send concise 2-line nudge. |
| P2 | wave4-065 | Golden Gate Emergency Plumbing (SF) | Yelp Request-a-Quote/message | “For emergency plumbing, speed wins. I can share a simple setup to capture and re-engage every missed lead automatically.” | 15:45–16:00 | No response by tomorrow 10:00 PST: send follow-up with one concrete KPI outcome. |
| P2 | wave4-069 | South Bay Leak Detection (San Jose) | Yelp Request-a-Quote/message | “We help leak/plumbing businesses lift conversion with faster quote routing + no-miss follow-up texts.” | 16:00–16:15 | If no reply by tomorrow morning: send short ‘can mock this in 24h’ follow-up. |
| P2 | wave4-072 | Oakland Drain & Sewer Experts (Oakland) | Yelp Request-a-Quote/message | “Can share a quick playbook to convert more drain/sewer requests into booked service calls.” | 16:15–16:30 | No response in 18h: one brief reminder. |
| P3 | wave3-175 | Neighborhood Mechanic (Indianapolis) | SMS → call | “We help local shops turn inquiry calls into booked appointments with auto text-back + simple intake flow.” | 09:15–09:30 (Thu) | If no reply by 11:00: one call attempt. |
| P3 | wave3-180 | Stat Plumbing (Columbus) | SMS → call | “I can share a quick fix to increase booked plumbing jobs from existing inbound traffic. Want a short walkthrough?” | 09:30–09:45 (Thu) | No reply in 90 min: call once. |
| P3 | wave3-106 | Picasso Painting (Milwaukee) | SMS → call | “We help painting teams book more estimates with faster first response and follow-up reminders.” | 09:45–10:00 (Thu) | If no response in 2h: one call + VM. |
| P3 | wave3-090 | Top Tree Service (St. Louis) | SMS → call | “Quick growth idea for tree services: capture every missed call and auto-nurture estimate requests.” | 10:00–10:15 (Thu) | No reply in 2h: call once. |

---

## Lightweight execution checklist
- [ ] Execute all **P1** sends before 15:00 PST today.
- [ ] For phone leads: SMS first; only one call attempt per trigger window.
- [ ] Personalize first 8–12 words with city/service to avoid template feel.
- [ ] Add one proof line when possible: “recent paid automation project delivered this week.”
- [ ] Log every touchpoint in `leads.jsonl` notes with timestamp + channel + outcome.
- [ ] Run **P2** Yelp message block immediately after P1.
- [ ] Run **P3** Thursday morning to restart reply cycle inside 24h window.
- [ ] End-of-window pass: mark engaged leads `negotiating`; set non-responders for next cadence wave.

## Quick copy blocks
**SMS opener (home services):**  
“Hey {{business}}, quick idea: we help local service teams recover missed leads with instant text-back + quote follow-up. Want a 2-min teardown?”

**Yelp opener:**  
“Noticed your Yelp presence and had a fast growth idea: improve first-response speed and follow-up so more inquiries turn into booked jobs.”

**Call voicemail (20s):**  
“Hey, this is John with NorthStar Synergy. I have a quick idea to help {{business}} convert more incoming calls into booked jobs using a simple follow-up workflow. I’ll text details too.”
