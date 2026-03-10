# Send Ops Queue v22 (Next 24 Hours)

**Window:** Wed 2026-03-04 07:30 PST → Thu 2026-03-05 07:30 PST  
**Objective:** Prioritize phone-reachable, higher-value home-service leads first; run SMS-first with call fallback in the same local business day.  
**Context note:** 1 completed paid job logged (`job_2026_03_02_001`) can be used as light credibility proof when a lead asks for validation.

## Prioritized Outreach Queue

| Priority | Lead (ID) | Channel | Message Snippet | Send Window | Follow-up Trigger |
|---|---|---|---|---|---|
| P1 | Regal Roofing & Contracting (`nosite-037`) | SMS | “Quick idea: roofing leads convert better with faster estimate follow-up. I can send a 3-point fix list tailored to your current setup—open to it?” | **Today 9:10–9:30 AM PST** | If no reply in 3h: call once + 20s VM. If still no response: short SMS bump tomorrow 10:00 AM PST. |
| P1 | Quality Construction & Roofing (`nosite-068`) | SMS | “I help contractors tighten lead-to-estimate flow so fewer jobs slip. Want a quick custom teardown for your current intake process?” | **Today 10:00–10:20 AM CST** | If no reply by 2:30 PM CST: call once. If no pickup: VM recap + final SMS tomorrow 9:45 AM CST. |
| P1 | PMC General Contractor (`wa-google-002`) | SMS | “I can map a simple system to turn more incoming requests into booked estimates. Want a short custom plan for your team?” | **Today 10:35–10:55 AM PST** | If no reply in 4h: send proof-style nudge (“I can draft this in 24h”). Day+1 one call attempt at 10:15 AM PST. |
| P1 | Environment West Landscape Services (`wa-google-005`) | SMS | “Landscaping shops usually lose jobs on response lag. I can share a quick booking/follow-up workflow tuned to your service area—want it?” | **Today 9:15–9:35 AM PST** | If no reply by 1:30 PM PST: send one-line KPI nudge. If quiet by next morning: call once 9:30 AM PST. |
| P1 | Millennium Plumbing Specialist (`wave4-044`) | SMS | “You likely get urgent plumbing calls at odd hours. I can send a concise intake + dispatch improvement plan to capture more of them—open?” | **Today 9:20–9:40 AM PST** | If no reply in 3h: call once. If no answer: VM + follow-up SMS tomorrow 9:30 AM PST. |
| P1 | Northwest Plumbing of Tennessee (`wave4-003`) | SMS | “I help plumbing teams convert more emergency inquiries with a cleaner response flow. Want a short custom breakdown?” | **Today 9:25–9:45 AM CST** | If no response by early afternoon: send urgency nudge. Day+1 call at 10:00 AM CST. |
| P2 | San Diego Heating and Cooling (`nosite-109`) | SMS | “HVAC opportunities move fast—I can share a lightweight lead-response flow to help close more booked jobs. Want me to send it?” | **Today 10:10–10:30 AM PST** | If no reply in 4h: one call attempt. Final SMS tomorrow 10:15 AM PST. |
| P2 | PNW Landscaping & Services (`wa-google-001`) | SMS | “I can help increase booked estimates with a faster first-response workflow for landscaping inquiries. Open to a quick custom plan?” | **Today 1:05–1:25 PM PST** | If no reply by EOD: short follow-up tomorrow 9:50 AM PST. |
| P2 | Perez Landscaping (`nosite-001`) | SMS | “I work with local landscaping teams to tighten quote follow-up so more inquiries become jobs. Want a 3-step suggestion tailored to your business?” | **Today 1:30–1:50 PM PST** | If no reply within 24h: call once during 10:00–10:30 AM PST tomorrow. |
| P2 | Joc’s Landscaping (`wa-google-003`) | SMS | “Want a quick way to turn more inbound requests into booked work? I can send a short plan specific to your setup.” | **Today 1:00–1:20 PM PST** | If no response by tomorrow morning: one concise bump + offer 10-minute call window. |
| P3 | A A Landscaping (`nosite-033`) | SMS | “I can share a simple estimate follow-up flow that usually lifts booked jobs for landscaping teams. Want the short version?” | **Today 2:00–2:20 PM PST** | If no reply: retry once tomorrow at 10:45 AM PST, then park for next cycle. |
| P3 | Family Lawn Services (`wa-google-004`) | SMS | “If helpful, I can send a quick playbook to improve speed-to-quote and weekly booking consistency.” | **Today 1:40–2:00 PM PST** | If no reply by tomorrow midday: final bump, then move to low-frequency nurture list. |

## Queue Logic (Applied)
- **Selection:** `status=new` + direct phone present + highest estimated value + service urgency (plumbing/roofing/HVAC first).
- **Channel:** SMS first-touch (short, problem-first, no pricing) per outreach standard.
- **Timing:** 9–11 AM local priority, 1–2 PM local secondary window.
- **Cadence:** Touch 1 SMS → same-day nudge/call trigger → day+1 final follow-up.

## Lightweight Execution Checklist

- [ ] Send all P1 messages inside listed windows (do not batch outside local prime hours).
- [ ] Personalize first 6–10 words with business/service context before sending.
- [ ] Log each touch in `leads.jsonl` notes + set status to `contacted` after first send.
- [ ] Execute call fallback exactly where trigger says (single attempt only).
- [ ] Keep follow-ups under 35 words and CTA-single (“open to a quick look?”).
- [ ] End of 24h: tag each lead `responsive` or `no_response` in notes for v23 rollover.
