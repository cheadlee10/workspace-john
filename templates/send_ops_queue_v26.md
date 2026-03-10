# Send Ops Queue — Next 24 Hours (v26)
**Prepared:** 2026-03-04 08:10 PST  
**Source context used:** `leads.jsonl`, `jobs.jsonl`  
**Goal:** Prioritize highest-value phone-reachable leads and execute same-day SMS+call follow-up loops.

## Prioritization Logic
1. **P1:** Valid phone + estimated value **$900+** (highest ticket)
2. **P2:** Valid phone + estimated value **$700–899** (strong mid-ticket)
3. **P3:** Valid phone + estimated value **$500–699** (recent/fresh volume)
4. **Execution rule:** `SMS first -> call fallback in 90–120 min -> one next-day bump`

---

## Outreach Queue (next 24h)

| Priority | Lead ID | Client | Channel | Message snippet (customize before send) | Send window (PT) | Follow-up trigger |
|---|---|---|---|---|---|---|
| P1 | nosite-037 | Regal Roofing & Contracting | SMS + Call | "Regal Roofing — quick idea to capture more urgent roofing jobs by auto-responding to missed calls and quote requests in minutes. Open to a 10-min walkthrough?" | Wed 08:20–09:00 | No reply in 90 min -> call + voicemail. No response by Thu 09:00 -> short bump SMS. |
| P1 | nosite-068 | Quality Construction & Roofing | SMS + Call | "Quality Construction & Roofing — I help contractors convert more inbound leads with instant text-back + follow-up automation. Worth a quick look?" | Wed 08:35–09:15 | No SMS response by 11:00 -> call fallback. Thu 09:20 second-touch SMS. |
| P1 | wa-google-002 | PMC General Contractor | SMS + Call | "PMC General Contractor — we can tighten lead response so more quote requests become booked jobs (without adding staff). Open to a quick demo?" | Wed 09:00–09:40 | No reply in 2h -> call + VM. Thu 09:40 final nudge. |
| P1 | wa-google-005 | Environment West Landscape Services | SMS + Call | "Environment West — quick win: faster first response + follow-up for landscaping inquiries so fewer estimates slip through. Want a free mini audit?" | Wed 09:20–10:00 | No response in 90 min -> call. Thu 10:00 bump SMS with CTA. |
| P1 | nosite-109 | San Diego Heating and Cooling | SMS + Call | "Saw your HVAC profile — I can share a simple 3-step missed-call recovery flow to book more service calls. Interested?" | Wed 09:45–10:30 | No reply by 12:00 -> call + VM. Thu 10:15 follow-up SMS. |
| P2 | nosite-052 | CC Landscaping | SMS + Call | "CC Landscaping — we help landscapers close more inbound leads with instant response + estimate follow-up automation. Open to a quick example?" | Wed 10:15–11:00 | No reply in 2h -> call fallback. Thu 10:30 final SMS. |
| P2 | nosite-053 | RB Landscaping Service | SMS + Call | "RB Landscaping — quick idea to improve lead-to-booked-job rate using faster quote follow-up. Want a 10-min walkthrough?" | Wed 10:35–11:20 | No response in 90 min -> call + voicemail. Thu 10:45 one-line bump. |
| P2 | nosite-001 | Perez Landscaping | SMS + Call | "Perez Landscaping — we can help convert more Yelp/phone inquiries into scheduled estimates with immediate follow-up. Open this week?" | Wed 11:00–11:45 | No reply by 13:00 -> call fallback. Thu 11:00 short follow-up. |
| P2 | nosite-115 | Ace Fencing | SMS + Call | "Ace Fencing — I help fence contractors capture more quote requests with instant text-back + scheduling prompts. Want a quick demo?" | Wed 11:20–12:05 | No reply in 2h -> call + VM. Thu 11:20 follow-up SMS. |
| P2 | wa-google-001 | PNW Landscaping & Services | SMS + Call | "PNW Landscaping — quick win: automate first response so more inbound leads convert to paid jobs. Worth 10 minutes?" | Wed 11:45–12:30 | No response by 14:30 -> call fallback. Thu 09:30 bump SMS. |
| P2 | wa-google-003 | Joc's Landscaping | SMS + Call | "Joc's Landscaping — we can improve close rate on new inquiries with fast quote follow-up automation. Want details?" | Wed 12:15–13:00 | No reply in 90–120 min -> call + VM. Thu 09:45 follow-up. |
| P2 | wave4-044 | Millennium Plumbing Specialist | SMS + Call | "Millennium Plumbing — I help plumbing shops capture more emergency-call revenue with instant missed-call text-back and follow-up. Open to a quick walkthrough?" | Wed 13:00–13:45 | No reply by 15:30 -> call fallback. Thu 10:30 final nudge. |
| P3 | wave4-003 | Northwest Plumbing of Tennessee | SMS + Call | "Northwest Plumbing — quick outreach: we help crews book more jobs by responding to inbound leads in under 60 seconds automatically. Interested?" | Wed 13:30–14:15 | No response in 2h -> call + VM. Thu 10:45 follow-up SMS. |
| P3 | wave4-013 | Precision Plumbing | SMS + Call | "Precision Plumbing — we can increase booked service calls with simple lead-response automation for missed calls and quote requests. Open to a 10-min chat?" | Wed 14:00–14:45 | No reply by 16:30 -> call fallback. Thu 11:00 second-touch SMS. |
| P3 | wave5-070 | Champion Plumbing | SMS + Call | "Champion Plumbing — I can show a lightweight flow to convert more water-heater inquiries into booked appointments. Want a quick example?" | Wed 14:30–15:15 | No response in 90 min -> call + voicemail. Thu 11:15 follow-up. |
| P3 | wave5-072 | SOSA The Plumber | SMS + Call | "SOSA The Plumber — quick idea: faster follow-up on inbound calls/texts to raise booking rate without extra admin load. Open to a short walkthrough?" | Wed 15:00–15:45 | No reply by 17:30 -> call fallback. Thu 11:30 final bump SMS. |

---

## Lightweight Execution Checklist

### Pre-send (5–8 minutes)
- [ ] Confirm each lead remains `status: new` and phone is still valid/usable
- [ ] Personalize opener with exact business name + service keyword
- [ ] Keep each first SMS under 280 chars with one CTA ("open to 10-min walkthrough?")

### Send block execution
- [ ] Execute in sequence: **P1 -> P2 -> P3**
- [ ] Immediately log touch in `leads.jsonl` notes with timestamp + channel
- [ ] Update lead stage at first touch: `new -> contacted`

### Follow-up handling
- [ ] Trigger call fallback at 90–120 min no-response mark
- [ ] Positive response -> set `proposal_sent` and book same-day call
- [ ] Not interested / wrong fit -> set `lost` with concise reason

### End-of-window wrap (before Thu 08:30 PT)
- [ ] Count: SMS sent, calls placed, replies, qualified conversations, calls booked
- [ ] Roll unresolved leads into next queue with timing notes and last-touch status

---

## Jobs-context proof point (use only after engagement)
- Recent paid delivery: `job_2026_03_02_001` — Excel Audit, **$299 paid** on 2026-03-02.
