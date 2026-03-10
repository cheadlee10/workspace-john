# Send Ops Queue — Next 24 Hours (v29)
**Prepared:** 2026-03-04 08:50 PST  
**Source context used:** `leads.jsonl`, `jobs.jsonl`  
**Goal:** Run a focused 24-hour outbound block using highest-value, freshest leads first, with clear fallback triggers.

## Prioritization Logic
1. **P1:** Fresh wave4/wave3 leads with direct phone + est. value **$500+** (fastest path to conversation)
2. **P2:** Fresh high-value leads with no phone but reachable via **Yelp Request-a-Quote/Message**
3. **P3:** Proven older phone-verified leads as fill capacity / same-day backup volume
4. **Cadence:** `Primary touch -> +90 to +120 min follow-up -> next-day AM bump`

---

## Outreach Queue (next 24h)

| Priority | Lead ID | Client | Channel | Message snippet (customize before send) | Send window (PT) | Follow-up trigger |
|---|---|---|---|---|---|---|
| P1 | wave4-044 | Millennium Plumbing Specialist | SMS + Call | "Millennium Plumbing — quick idea: we help plumbing teams convert missed/after-hours inquiries into booked jobs with instant text-back + short follow-up. Open to 10 minutes this week?" | Wed 08:55–09:20 | No reply by 11:00 -> call + VM. No response by Thu 08:50 -> 1-line bump SMS. |
| P1 | wave4-013 | Precision Plumbing | SMS + Call | "Precision Plumbing — we built a simple lead-response flow that increases booked service calls without adding admin overhead. Worth a quick walkthrough?" | Wed 09:15–09:40 | No reply by 11:20 -> call fallback. Thu 09:00 bump SMS. |
| P1 | wave4-003 | Northwest Plumbing of Tennessee | SMS + Call | "Northwest Plumbing — can I show you a quick system that helps convert more inbound plumbing requests into scheduled appointments?" | Wed 09:35–10:00 | No reply by 11:40 -> call + VM. Thu 09:20 final bump. |
| P1 | wa-google-002 | PMC General Contractor | SMS + Call | "PMC General Contractor — quick outreach: we help contractors capture more quote requests with faster first response and lightweight follow-up. Open to 10 min?" | Wed 09:55–10:20 | No reply by 12:00 -> call fallback. Thu 09:40 second touch. |
| P1 | wa-google-001 | PNW Landscaping & Services | SMS + Call | "PNW Landscaping — want a simple way to turn more inbound calls into booked site visits using instant response + reminders?" | Wed 10:15–10:40 | No reply by 12:20 -> call + VM. Thu 10:00 bump SMS. |
| P1 | wa-google-003 | Joc’s Landscaping | SMS + Call | "Joc’s Landscaping — we help small crews close more estimate requests with a fast text-back and follow-up workflow. Interested in a quick look?" | Wed 10:35–11:00 | No reply by 12:40 -> call fallback. Thu 10:20 bump. |
| P1 | wa-google-004 | Family Lawn Services | SMS + Call | "Family Lawn Services — quick win idea: improve speed-to-lead so more lawn inquiries become booked jobs. Open to a short walkthrough?" | Wed 10:55–11:20 | No reply by 13:00 -> call + VM. Thu 10:40 final touch. |
| P1 | nosite-037 | Regal Roofing & Contracting | SMS + Call | "Regal Roofing — we help roofing teams recover missed-call revenue with immediate response + follow-up so more estimates get booked. Open to details?" | Wed 11:15–11:40 | No reply by 13:20 -> call fallback. Thu 11:00 bump SMS. |
| P2 | wave4-072 | Oakland Drain & Sewer Experts | Yelp Request-a-Quote | "Saw your Yelp profile — we help plumbing teams convert more urgent inquiries into booked jobs by tightening first-response and follow-up. Open to a quick 10-min idea share?" | Wed 11:45–12:10 | No reply in Yelp by 15:00 -> send short bump in-thread. Thu 09:30 final bump. |
| P2 | wave4-071 | East Bay Emergency Plumbers | Yelp Request-a-Quote | "Quick idea for East Bay Emergency Plumbers: simple response workflow to capture more after-hours leads and reduce drop-off. Want a fast walkthrough?" | Wed 12:05–12:30 | No reply by 15:15 -> 1-line Yelp follow-up. Thu 09:45 final touch. |
| P2 | wave4-069 | South Bay Leak Detection | Yelp Request-a-Quote | "We help leak-detection teams convert high-intent inquiries faster with immediate reply and structured follow-up. Open to a short call this week?" | Wed 12:25–12:50 | No reply by 15:40 -> bump via Yelp message. Thu 10:00 final touch. |
| P2 | wave4-068 | Peninsula Water Heater Pros | Yelp Request-a-Quote | "We built a lightweight flow to turn water-heater inquiries into scheduled visits faster. If useful, I can show it in 10 minutes." | Wed 12:45–13:10 | No reply by 16:00 -> short Yelp bump. Thu 10:15 final touch. |
| P2 | wave4-065 | Golden Gate Emergency Plumbing | Yelp Request-a-Quote | "For emergency plumbing teams, speed wins. We help convert missed/late inquiries into booked jobs using instant response + follow-up. Interested?" | Wed 13:05–13:30 | No reply by 16:20 -> Yelp follow-up. Thu 10:30 final touch. |
| P2 | wave4-050 | Puget Sound Leak Detection | Yelp Request-a-Quote | "Quick outreach: we help leak-detection businesses improve response speed and booking rate from inbound requests. Open to a quick demo?" | Wed 13:25–13:50 | No reply by 16:40 -> Yelp bump. Thu 10:45 final touch. |
| P3 | nosite-001 | Perez Landscaping | SMS + Call | "Perez Landscaping — we can help you book more landscaping estimates by instantly responding to inbound calls and following up automatically. Open to chat?" | Wed 13:55–14:20 | No reply by 16:30 -> call + VM. Thu 11:00 bump SMS. |
| P3 | nosite-004 | Northwest Landscape and Patio Bellevue | SMS + Call | "Northwest Landscape & Patio — quick idea to increase booked site visits from incoming leads. Want a 10-min walkthrough?" | Wed 14:15–14:40 | No reply by 16:50 -> call fallback. Thu 11:20 final touch. |
| P3 | nosite-023 | Handy-Den | SMS + Call | "Den — we help handyman operators close more inquiries with instant response and simple follow-up. Open to a quick look?" | Wed 14:35–15:00 | No reply by 17:10 -> call + VM. Thu 11:40 bump SMS. |
| P3 | nosite-033 | A A Landscaping | SMS + Call | "A A Landscaping — want a simple system to convert more incoming quote requests into booked jobs? Happy to show a 10-min version." | Wed 14:55–15:20 | No reply by 17:30 -> call fallback. Thu 12:00 bump. |
| P3 | wave3-175 | Neighborhood Mechanic | SMS + Call | "Neighborhood Mechanic — quick idea to convert more inbound service calls into booked appointments with immediate response + follow-up. Interested?" | Wed 15:15–15:40 | No reply by 17:50 -> call + VM. Thu 12:20 final touch. |
| P3 | wave3-180 | Stat Plumbing | SMS + Call | "Stat Plumbing — we help plumbing shops improve lead-to-booking rate by tightening first response and follow-up. Open to a short walkthrough?" | Wed 15:35–16:00 | No reply by 18:10 -> call fallback. Thu 12:40 final bump. |

---

## Lightweight Execution Checklist

### 1) Pre-send (5–10 min)
- [ ] Verify each phone lead is still callable/textable
- [ ] Verify Yelp targets still allow request-a-quote/message
- [ ] Personalize first line with business name + trade
- [ ] Keep opening message under 280 chars with one CTA

### 2) During send blocks
- [ ] Execute in strict order: **P1 -> P2 -> P3**
- [ ] Log touch outcome immediately in `leads.jsonl` notes (`timestamp | channel | result`)
- [ ] On first touch, set lead status from `new` to `contacted`

### 3) Follow-up rules
- [ ] If no reply after 90–120 min: run fallback (call or Yelp bump)
- [ ] If positive reply: move to `negotiating` or `proposal_sent` and book next step
- [ ] If wrong number / hard no: set `lost` with reason and stop sequence

### 4) End-of-window wrap (before Thu 08:50 PT)
- [ ] Count totals: outbound sent, replies, qualified conversations, booked calls
- [ ] Mark warm no-response leads for next-day queue with last-touch timestamp
- [ ] Remove duplicates/conflicts before generating v30

---

## Jobs-context proof point (for replies)
- Recent paid win in `jobs.jsonl`: `job_2026_03_02_001` — **Excel Audit, $299 paid (2026-03-02)**. Use as quick credibility proof when asked for prior outcomes.
