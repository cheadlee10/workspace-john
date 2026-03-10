# Send Ops Queue — Next 24 Hours (v28)
**Prepared:** 2026-03-04 08:40 PST  
**Source context used:** `leads.jsonl`, `jobs.jsonl`  
**Goal:** Prioritized 24-hour outreach sprint against phone-verified leads with highest estimated value and freshest pipeline relevance.

## Prioritization Logic
1. **P1:** Fresh + phone-valid + estimated value **$1,000+** (roofing/contractor)
2. **P2:** Phone-valid + estimated value **$700–999** (landscaping/fencing/plumbing)
3. **P3:** Phone-valid + estimated value **$500–699** (plumbing/handyman/pest/electrical)
4. **Execution cadence:** `SMS first -> call fallback at +90–120 min -> next-day bump in AM window`

---

## Outreach Queue (next 24h)

| Priority | Lead ID | Client | Channel | Message snippet (customize before send) | Send window (PT) | Follow-up trigger |
|---|---|---|---|---|---|---|
| P1 | nosite-037 | Regal Roofing & Contracting | SMS + Call | "Regal Roofing — quick idea: we help roofers turn missed calls into booked estimates with instant text-back and short follow-up. Open to a 10-min walkthrough this week?" | Wed 08:50–09:20 | No reply by 11:00 -> call + VM. No response by Thu 09:00 -> 1-line bump SMS. |
| P1 | nosite-068 | Quality Construction & Roofing | SMS + Call | "Quality Construction & Roofing — we built a lightweight flow that increases booked roofing jobs from inbound calls without extra admin work. Want to see it?" | Wed 09:10–09:40 | No reply by 11:30 -> call fallback. Thu 09:20 final bump. |
| P1 | wa-google-002 | PMC General Contractor | SMS + Call | "PMC General Contractor — can I show you a simple lead-response setup that helps contractors convert more quote requests into scheduled calls?" | Wed 09:30–10:00 | No reply by 12:00 -> call + VM. Thu 09:40 second touch. |
| P1 | wa-google-005 | Environment West Landscape Services | SMS + Call | "Environment West — quick win: faster first-response and follow-up so more landscaping inquiries become booked estimates. Open to a short demo?" | Wed 09:50–10:20 | No reply by 12:30 -> call fallback. Thu 10:00 final bump. |
| P2 | wave4-044 | Millennium Plumbing Specialist | SMS + Call | "Millennium Plumbing — we help plumbing teams capture emergency-job revenue by instantly replying to missed calls and unclosed leads. Worth a 10-min look?" | Wed 10:20–10:50 | No reply by 12:50 -> call + VM. Thu 10:15 bump SMS. |
| P2 | wave4-013 | Precision Plumbing | SMS + Call | "Precision Plumbing — I can share a 3-step workflow that increases booked service calls from inbound plumbing leads. Open to a quick walkthrough?" | Wed 10:40–11:10 | No reply by 13:15 -> call fallback. Thu 10:30 final touch. |
| P2 | wave4-003 | Northwest Plumbing of Tennessee | SMS + Call | "Northwest Plumbing — quick outreach: we improve lead-to-appointment rate with immediate response + short follow-up automation. Interested?" | Wed 11:00–11:30 | No reply by 13:30 -> call + VM. Thu 10:45 bump. |
| P2 | wa-google-001 | PNW Landscaping & Services | SMS + Call | "PNW Landscaping — want a simple way to convert more inbound quote requests into booked site visits without adding office overhead?" | Wed 11:20–11:50 | No reply by 13:50 -> call fallback. Thu 11:00 follow-up SMS. |
| P2 | nosite-101 | Cedar Fencing Plus | SMS + Call | "Cedar Fencing Plus — we help fence contractors recover missed-call opportunities with instant response and follow-up reminders. Open to a quick call?" | Wed 11:40–12:10 | No reply by 14:10 -> call + VM. Thu 11:20 bump. |
| P2 | nosite-102 | Austin's Custom Fencing | SMS + Call | "Austin's Custom Fencing — quick idea to increase booked estimates: instant first response + repeat follow-up for inbound leads. Want details?" | Wed 12:00–12:30 | No reply by 14:30 -> call fallback. Thu 11:40 final touch. |
| P2 | nosite-001 | Perez Landscaping | SMS + Call | "Perez Landscaping — we help landscaping crews book more estimates from inbound calls using instant reply + lightweight follow-up. Open this week?" | Wed 12:20–12:50 | No reply by 15:00 -> call + VM. Thu 12:00 bump. |
| P2 | nosite-004 | Northwest Landscape and Patio Bellevue | SMS + Call | "Northwest Landscape & Patio — I can show a fast lead-response setup that converts more quote requests into scheduled jobs. Interested in a 10-min walkthrough?" | Wed 12:40–13:10 | No reply by 15:20 -> call fallback. Thu 12:20 follow-up. |
| P2 | nosite-049 | Valle Landscaping | SMS + Call | "Valle Landscaping — quick win: automate first response to inbound inquiries so more leads become booked estimates. Open to seeing it?" | Wed 13:00–13:30 | No reply by 15:40 -> call + VM. Thu 12:40 final bump. |
| P3 | nosite-055 | Tony Handyman Survives | SMS + Call | "Tony — I help handyman operators convert more incoming inquiries into booked jobs with instant text-back and follow-up. Want a quick walkthrough?" | Wed 13:20–13:50 | No reply by 16:00 -> call fallback. Thu 13:00 second touch. |
| P3 | nosite-056 | Rick The Handyman | SMS + Call | "Rick — quick idea to increase booked handyman calls without extra admin: immediate response + simple follow-up flow. Open to a short demo?" | Wed 13:40–14:10 | No reply by 16:20 -> call + VM. Thu 13:20 bump. |
| P3 | nosite-084 | American Termite & Pest Elimination | SMS + Call | "American Termite & Pest — we help service businesses close more inbound leads by responding faster and following up automatically. Worth 10 minutes?" | Wed 14:00–14:30 | No reply by 16:30 -> call fallback. Thu 13:40 final touch. |
| P3 | nosite-085 | Bug Free Exterminating | SMS + Call | "Bug Free Exterminating — we built a lightweight system to improve response speed and booking rate from inbound pest-control inquiries. Interested?" | Wed 14:20–14:50 | No reply by 16:50 -> call + VM. Thu 14:00 bump SMS. |
| P3 | wave3-047 | Electrical Solutions | SMS + Call | "Electrical Solutions — quick outreach: increase booked electrical jobs by auto-responding to missed calls and unclosed inquiries. Open to a quick call?" | Wed 14:40–15:10 | No reply by 17:10 -> call fallback. Thu 14:20 follow-up. |

---

## Lightweight Execution Checklist

### Pre-send (5–8 min)
- [ ] Confirm each queued lead still shows reachable phone and is not already touched today
- [ ] Personalize first line with business name + trade (roofing/plumbing/etc.)
- [ ] Keep first SMS concise (<280 chars) and single CTA ("open to 10 min?")

### Send-block execution
- [ ] Run in priority order: **P1 -> P2 -> P3**
- [ ] Log every touch in `leads.jsonl` notes with timestamp + channel + result
- [ ] On first outbound touch, update lead status: `new -> contacted`

### Follow-up handling
- [ ] If no reply at +90–120 min: place call + leave short voicemail
- [ ] If positive signal ("yes", "how much", "call me"): move to `proposal_sent` and book discovery slot
- [ ] If wrong number / hard no: mark `lost` with reason and stop cadence

### End-of-window wrap (before Thu 08:45 PT)
- [ ] Tally: SMS sent, calls placed, replies, qualified leads, calls booked
- [ ] Promote any warm no-response leads into next-day queue with exact last-touch timestamp

---

## Jobs-context proof point (use once interest appears)
- Recent paid outcome: `job_2026_03_02_001` — Excel Audit, **$299 paid** on 2026-03-02.