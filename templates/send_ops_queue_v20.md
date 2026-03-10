# Send Ops Queue v20 (Next 24 Hours)

**Window:** Wed 2026-03-04 07:10 PST → Thu 2026-03-05 07:10 PST  
**Source basis:** `leads.jsonl` (prioritized by recency, estimated value, and reachable channel), `jobs.jsonl` (no active client follow-up needed; only one completed/paid job)

## Prioritization Logic (quick)
1. **P1:** Newest + high estimated value + direct phone (call/SMS) available.
2. **P2:** Older but high-fit/service-aligned + direct phone.
3. **P3:** Medium-value reachable leads to fill send volume.
4. Skip leads with `outreach_usable=false` for this 24h cycle.

---

## Outreach Queue

| Pri | Lead ID | Client | Service | Channel | Message snippet (first touch) | Send window (PST) | Follow-up trigger |
|---|---|---|---|---|---|---|---|
| P1 | wave4-044 | Millennium Plumbing Specialist | Plumbing | **Call → SMS fallback** | “Hey — quick one: we help plumbing companies capture ‘no website / unclaimed listing’ calls into booked jobs in under 7 days. Want a 2-min teardown for Millennium?” | **08:45–09:15** | If no pickup, send SMS in 3 min; if no reply in 4h, send proof-style bump. |
| P1 | wave4-013 | Precision Plumbing | Plumbing | **Call → SMS fallback** | “Saw Precision Plumbing showing up in local search; I can send a free missed-revenue snapshot + simple fix plan. Open to that?” | **09:15–09:45** | No answer: SMS immediately; no response by 14:00 PST: second SMS with 1 concrete outcome. |
| P1 | wave4-003 | Northwest Plumbing of Tennessee | Plumbing | **Call → SMS fallback** | “I help local plumbers convert search traffic from unclaimed profiles into booked service calls. Want me to map this for Northwest Plumbing?” | **10:00–10:30** | No pickup: SMS in 5 min; if opened/engaged but no decision, follow-up at 17:30 PST. |
| P1 | wa-google-002 | PMC General Contractor | GC | **Call + SMS** | “We help contractors turn ‘no-site’ listing traffic into quote requests with a fast one-page funnel. Want a draft example for PMC?” | **10:30–11:00** | If no answer, send SMS with 1-line offer + 24h CTA. |
| P1 | wa-google-005 | Environment West Landscape Services | Landscaping | **Call + SMS** | “I can show how to convert local listing traffic into booked estimates without a full site rebuild. Want a quick mockup?” | **11:00–11:30** | If no reply by end of window, queue retry Thu morning local time. |
| P1 | wa-google-001 | PNW Landscaping & Services | Landscaping | **Call + SMS** | “You’re likely losing ‘ready-to-book’ calls from profile traffic. I can patch that in 48 hours. Want details?” | **11:30–12:00** | If no pickup: SMS now; if no response in 6h, send short case-style follow-up. |
| P2 | nosite-068 | Quality Construction & Roofing | Roofing/GC | **Call + SMS** | “Roofing lead flow is strongest when unclaimed listings route to a conversion page. I can set this up quickly for you.” | **12:15–12:45** | No answer: SMS + ask for best callback time. |
| P2 | nosite-037 | Regal Roofing & Contracting | Roofing | **Call + SMS** | “Saw strong local visibility but likely leak in conversion path. Want a free 2-minute growth audit?” | **12:45–13:15** | If no response in 4h, send credibility follow-up with specific fix. |
| P2 | nosite-109 | San Diego Heating and Cooling | HVAC | **Call + SMS** | “We help HVAC shops convert listing traffic into booked tune-ups with low lift. Worth a quick walkthrough?” | **13:15–13:45** | If no pickup, SMS immediately; retry call once in late afternoon local time. |
| P2 | wa-google-006 | Keith's Lawn & Landscape | Landscaping | **Call + SMS** | “I can help turn your local presence into more estimate requests without heavy ad spend. Want a simple plan?” | **13:45–14:15** | No response: follow-up SMS at 18:00 PST with clear next step. |
| P2 | wa-google-004 | Family Lawn Services | Lawn care | **Call + SMS** | “Quick idea to increase inbound estimate calls from your current listing traffic. Open to a no-cost snapshot?” | **14:15–14:45** | If no engagement after first SMS, final nudge next morning. |
| P2 | wa-google-003 | Joc's Landscaping | Landscaping | **Call + SMS** | “I can send a 3-point plan to capture more local quote requests this week. Want me to text it over?” | **14:45–15:15** | If no answer, text plan teaser and ask preferred channel. |
| P2 | wa-google-007 | The Honest Handyman & Hauling LLC | Handyman | **Call + SMS** | “Handyman demand is high; I can help convert directory/Yelp traffic into booked jobs with a lightweight system.” | **15:15–15:45** | No response: second SMS 5 hours later with ‘yes/no’ close. |
| P3 | nosite-049 | Valle Landscaping | Landscaping | **SMS-first** | “I help local landscaping companies turn listing traffic into booked estimates. Want a free 2-min audit for Valle Landscaping?” | **16:00–16:20** | If no reply in 3h, single follow-up with calendar CTA. |
| P3 | nosite-050 | Valley Landscaping | Landscaping | **SMS-first** | “Could send a quick lead-capture fix plan for Valley Landscaping (no cost). Interested?” | **16:20–16:40** | No reply by 20:00 PST: final short bump. |
| P3 | nosite-052 | CC Landscaping | Landscaping | **SMS-first** | “Open to a fast plan to increase booked landscaping calls this month from existing search traffic?” | **16:40–17:00** | If replied ‘maybe’, trigger call attempt within 30 min. |
| P3 | nosite-053 | RB Landscaping Service | Landscaping | **SMS-first** | “I can text a 3-step conversion fix for RB Landscaping — takes <2 mins to review.” | **17:00–17:20** | No response by next morning: archive for re-cycle next wave. |
| P3 | nosite-055 | Tony Handyman Survives | Handyman | **SMS-first** | “Tony — quick idea to get more handyman bookings from local profile traffic. Want me to send it?” | **17:20–17:40** | If response positive: immediate call offer + 2 time slots. |
| P3 | nosite-056 | Rick The Handyman | Handyman | **SMS-first** | “Rick, I help small handyman teams convert more inbound leads without ad spend. Want a free snapshot?” | **17:40–18:00** | No reply within 12h: one final follow-up then pause. |
| P3 | nosite-057 | Manny Handyman Svcs | Handyman | **SMS-first** | “Manny — I can map a quick ‘more booked jobs’ plan based on your current listing presence. Interested?” | **18:00–18:20** | If no response: recycle to 7-day nurture queue. |

---

## Message Variant Bank (fast swap)
- **A (Direct ROI):** “We help [service] businesses turn listing traffic into booked jobs in 7 days or less.”
- **B (Free audit):** “Want a free 2-minute teardown showing where leads are dropping?”
- **C (Low-friction CTA):** “Reply YES and I’ll text the 3-point plan.”

---

## Lightweight Execution Checklist

### Pre-send (10 min)
- [ ] Confirm Twilio send capability and number health.
- [ ] Normalize numbers to E.164 where missing.
- [ ] Load this queue and pin the 3 P1 calls first.

### During send blocks
- [ ] Execute in listed priority order (don’t skip P1).
- [ ] Log each touch outcome: `attempted / reached / interested / callback / no response`.
- [ ] Trigger follow-up exactly per row rule.

### Post-send (end of day)
- [ ] Update `leads.jsonl` statuses for touched leads (`contacted` where applicable).
- [ ] Add concise notes with timestamp + channel + result.
- [ ] Build tomorrow’s queue from today’s engaged/non-responders.

---

## Notes for next operator
- This queue intentionally favors **reachable phone leads** over theoretical higher-value but unreachable records.
- Wave4 records are newest and should be worked first where phone exists.
- If call pickup rate is low, shift remaining items to SMS-first and preserve follow-up timing discipline.
