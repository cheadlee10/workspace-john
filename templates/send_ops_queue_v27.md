# Send Ops Queue — Next 24 Hours (v27)
**Prepared:** 2026-03-04 08:20 PST  
**Source context used:** `leads.jsonl`, `jobs.jsonl`  
**Goal:** Run a tight 24-hour outreach sprint on phone-reachable, highest-value home-service leads.

## Prioritization Logic
1. **P1:** Valid phone + estimated value **$1,000+**
2. **P2:** Valid phone + estimated value **$700–999**
3. **P3:** Valid phone + estimated value **$500–699**
4. **Execution rule:** `SMS first -> call fallback after 90–120 min -> next-day bump`

---

## Outreach Queue (next 24h)

| Priority | Lead ID | Client | Channel | Message snippet (customize before send) | Send window (PT) | Follow-up trigger |
|---|---|---|---|---|---|---|
| P1 | wa-google-002 | PMC General Contractor | SMS + Call | "PMC General Contractor — quick idea: we help contractors capture more quote requests by auto-responding to missed calls in under a minute. Open to a 10-min walkthrough?" | Wed 08:30–09:00 | No reply by 10:30 -> call + voicemail. No response by Thu 09:00 -> short bump SMS. |
| P1 | wa-google-005 | Environment West Landscape Services | SMS + Call | "Environment West — I can show a simple flow that converts more inbound landscaping leads into booked estimates without adding office workload. Open to seeing it?" | Wed 08:45–09:20 | No reply in ~2h -> call fallback. Thu 09:20 final bump. |
| P1 | nosite-037 | Regal Roofing & Contracting | SMS + Call | "Regal Roofing — we help roofing teams recover missed-call revenue with instant text-back + follow-up. Worth a quick 10-minute demo?" | Wed 09:00–09:35 | No reply by 11:15 -> call + VM. Thu 09:35 second touch. |
| P1 | nosite-068 | Quality Construction & Roofing | SMS + Call | "Quality Construction & Roofing — quick win idea: faster lead response for roofing inquiries so more calls turn into booked jobs. Open this week?" | Wed 09:20–10:00 | No response by 12:00 -> call fallback. Thu 10:00 bump SMS. |
| P2 | wa-google-001 | PNW Landscaping & Services | SMS + Call | "PNW Landscaping — I help landscaping businesses increase booked estimates through fast first-response and quote follow-up automation. Open to a short walkthrough?" | Wed 10:00–10:35 | No reply by 12:30 -> call + VM. Thu 09:45 follow-up. |
| P2 | nosite-001 | Perez Landscaping | SMS + Call | "Perez Landscaping — quick idea to convert more inbound calls into scheduled estimates using instant text-back and follow-up reminders. Want details?" | Wed 10:20–11:00 | No response in 90 min -> call fallback. Thu 10:00 one-line bump. |
| P2 | nosite-002 | Ligaya Landscaping | SMS + Call | "Ligaya Landscaping — we help small crews close more leads by replying instantly to new inquiries and missed calls. Open to a 10-min look?" | Wed 10:45–11:20 | No reply by 13:00 -> call + VM. Thu 10:20 final touch. |
| P2 | nosite-003 | Greenscapes Landscaping | SMS + Call | "Greenscapes Landscaping — I can share a lightweight system to improve lead-to-booked-job rate from phone and Yelp inquiries. Interested?" | Wed 11:00–11:40 | No reply by 13:30 -> call fallback. Thu 10:40 bump SMS. |
| P2 | nosite-004 | Northwest Landscape and Patio Bellevue | SMS + Call | "Northwest Landscape and Patio — quick win: recover more quote requests with automated first response and follow-up sequence. Open to a quick demo?" | Wed 11:20–12:00 | No response by 14:00 -> call + VM. Thu 11:00 follow-up. |
| P2 | nosite-005 | Envision Landscaping | SMS + Call | "Envision Landscaping — want a fast way to turn more inbound leads into booked estimates without extra admin? Happy to show the 3-step flow." | Wed 11:45–12:20 | No reply in 2h -> call fallback. Thu 11:20 second-touch SMS. |
| P2 | wa-google-003 | Joc's Landscaping | SMS + Call | "Joc's Landscaping — quick outreach: we improve close rates by speeding up first response and estimate follow-up. Worth 10 minutes?" | Wed 12:10–12:45 | No reply by 14:45 -> call + VM. Thu 11:40 bump. |
| P2 | wa-google-004 | Family Lawn Services | SMS + Call | "Family Lawn Services — I can help you capture more lawn-care jobs from inbound inquiries with instant response automation. Open to a quick walkthrough?" | Wed 12:30–13:10 | No response by 15:00 -> call fallback. Thu 12:00 final nudge. |
| P2 | nosite-115 | Ace Fencing | SMS + Call | "Ace Fencing — we help fencing companies book more quotes by following up immediately after missed calls and inquiries. Interested in a short demo?" | Wed 13:00–13:40 | No reply by 15:30 -> call + VM. Thu 12:20 follow-up SMS. |
| P2 | nosite-049 | Valle Landscaping | SMS + Call | "Valle Landscaping — quick idea: increase booked estimate appointments by automating first response and reminders. Open to a 10-min call?" | Wed 13:20–14:00 | No reply by 16:00 -> call fallback. Thu 12:40 bump. |
| P3 | wave4-044 | Millennium Plumbing Specialist | SMS + Call | "Millennium Plumbing — we help plumbers capture more emergency-job revenue by instantly texting back missed calls. Want to see the setup?" | Wed 14:00–14:35 | No response by 16:30 -> call + VM. Thu 10:30 final follow-up. |
| P3 | wave4-013 | Precision Plumbing | SMS + Call | "Precision Plumbing — quick idea to increase booked service calls: instant first response + short follow-up workflow for leads. Open to a walkthrough?" | Wed 14:20–15:00 | No reply in 90–120 min -> call fallback. Thu 10:45 bump. |
| P3 | wave4-003 | Northwest Plumbing of Tennessee | SMS + Call | "Northwest Plumbing — I help plumbing shops turn more inbound leads into appointments with a lightweight response workflow. Open to 10 minutes?" | Wed 14:45–15:20 | No response by 17:15 -> call + VM. Thu 11:00 one last bump. |

---

## Lightweight Execution Checklist

### Pre-send (5 minutes)
- [ ] Confirm each queued lead is still `status: new` and phone is valid
- [ ] Personalize each SMS with exact business name + trade keyword
- [ ] Keep initial message under 280 chars with one CTA

### Send block execution
- [ ] Execute in order: **P1 -> P2 -> P3**
- [ ] Log each outreach touch in `leads.jsonl` notes with timestamp + channel
- [ ] Update stage on first touch: `new -> contacted`

### Follow-up handling
- [ ] At 90–120 min no-reply: place call + leave short voicemail
- [ ] On positive reply: move to `proposal_sent` and schedule discovery call
- [ ] On hard no/wrong number: mark `lost` with reason

### End-of-window wrap (before Thu 08:30 PT)
- [ ] Tally: SMS sent, calls placed, replies, qualified leads, calls booked
- [ ] Carry unresolved leads forward with last-touch timestamp and next action

---

## Jobs-context proof point (use after engagement)
- Recent paid outcome: `job_2026_03_02_001` — Excel Audit, **$299 paid** (2026-03-02).
