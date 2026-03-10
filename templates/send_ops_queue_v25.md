# Send Ops Queue — Next 24 Hours (v25)
**Prepared:** 2026-03-04 08:01 PST  
**Source context used:** `leads.jsonl`, `jobs.jsonl`  
**Goal:** Maximize same-day conversations from highest-value, phone-reachable leads.

## Prioritization Logic
1. **P1:** Valid phone + estimated value $900+
2. **P2:** Valid phone + estimated value $700–899
3. **P3:** Valid phone + estimated value $600–699 (fill remaining capacity)
4. **Channel rule:** `SMS first -> call fallback in 90–120 min -> next-day bump`

---

## Outreach Queue (next 24h)

| Priority | Lead ID | Client | Channel | Message snippet (customize before send) | Send window (PT) | Follow-up trigger |
|---|---|---|---|---|---|---|
| P1 | nosite-037 | Regal Roofing & Contracting | SMS + Call | "Regal Roofing — quick idea to turn missed roofing calls into booked estimates automatically. I can show a 10-min setup that helps close more urgent jobs." | Wed 08:15–09:15 | No reply in 90 min -> call + voicemail. No response by Thu 09:00 -> short SMS bump. |
| P1 | nosite-068 | Quality Construction & Roofing | SMS + Call | "Quality Construction & Roofing — I help contractors capture every inbound lead with fast text-back + follow-up automation. Open to a quick walkthrough?" | Wed 08:30–09:30 | If no SMS reply in 2h -> call. If still no response -> Thu 09:15 follow-up SMS with concrete CTA. |
| P1 | wa-google-002 | PMC General Contractor | SMS + Call | "PMC General Contractor — I can help you convert more quote requests with an instant-response workflow (no new staff needed). Worth a 10-min look?" | Wed 09:00–10:00 | No response in 2h -> call fallback. If no answer by EOD -> Thu 09:30 final nudge. |
| P1 | wa-google-005 | Environment West Landscape Services | SMS + Call | "Environment West — quick win: faster lead response + follow-up for landscaping quotes so fewer jobs slip. Want a free mini audit?" | Wed 09:30–10:30 | No reply in 90 min -> call. No response by Thu 10:00 -> second SMS with one-line value proof. |
| P1 | nosite-109 | San Diego Heating and Cooling | SMS + Call | "Saw your HVAC profile — I help HVAC teams book more jobs by automating missed-call follow-up. Can send a 3-step fix plan." | Wed 10:00–11:00 | No reply by 12:30 -> call + voicemail. Thu 09:45 follow-up if still quiet. |
| P2 | nosite-052 | CC Landscaping | SMS + Call | "CC Landscaping — I help landscapers turn inbound inquiries into scheduled estimates faster with lightweight automation. Open to a quick demo?" | Wed 11:00–12:00 | If no reply in 2h -> call. If no response by Thu AM -> one final SMS. |
| P2 | nosite-053 | RB Landscaping Service | SMS + Call | "RB Landscaping — quick outreach: we help local crews close more lawn/landscape leads with instant follow-up. Want a 10-min walkthrough?" | Wed 11:30–12:30 | No response in 90 min -> call. Thu 10:15 follow-up SMS if needed. |
| P2 | nosite-001 | Perez Landscaping | SMS + Call | "Perez Landscaping — we can improve lead-to-booking rate by speeding first response and quote follow-up. Open to a short call this week?" | Wed 12:00–13:00 | If no response by 14:00 -> call fallback. Thu 10:30 final bump. |
| P2 | nosite-115 | Ace Fencing | SMS + Call | "Ace Fencing — I help fence contractors convert quote requests faster with instant response automation. Can I show a quick example?" | Wed 12:30–13:30 | No response in 2h -> call + voicemail. Thu 11:00 follow-up SMS. |
| P2 | wa-google-001 | PNW Landscaping & Services | SMS + Call | "PNW Landscaping — quick idea to capture more booked estimates from inbound interest using auto follow-up. Worth 10 minutes?" | Wed 13:00–14:00 | If no reply by 15:00 -> call. Thu 09:30 follow-up SMS. |
| P2 | nosite-101 | Cedar Fencing Plus | SMS + Call | "Cedar Fencing Plus — we help contractors stop losing estimate requests with immediate text-back + scheduling flow. Open to seeing it?" | Wed 13:30–14:30 | No response in 2h -> call. Thu 10:45 short final SMS. |
| P2 | nosite-102 | Austin's Custom Fencing | SMS + Call | "Austin's Custom Fencing — I can help improve close rate on new quote requests with a simple response automation setup. Want details?" | Wed 14:00–15:00 | If no response by 16:00 -> call fallback. Thu 11:15 final touch. |
| P2 | nosite-002 | Ligaya Landscaping | SMS + Call | "Ligaya Landscaping — I help small landscaping teams book more jobs from inbound leads through faster follow-up. Open to a quick chat?" | Wed 14:30–15:30 | No SMS reply in 90 min -> call + voicemail. Thu 09:45 follow-up SMS. |
| P2 | nosite-033 | A A Landscaping | SMS + Call | "A A Landscaping — quick outreach: we can tighten your lead response flow so more inquiries become paid jobs. Want a free mini audit?" | Wed 15:00–16:00 | If no reply in 2h -> call. Thu 10:00 final nudge. |
| P3 | nosite-061 | JV Pool Services | SMS + Call | "JV Pool Services — I help service businesses convert more calls into scheduled work via instant follow-up automation. Interested in a quick example?" | Wed 16:00–17:00 | No response in 2h -> call fallback. Thu 10:30 follow-up SMS. |
| P3 | nosite-116 | Bachman Lawn Care | SMS + Call | "Bachman Lawn Care — quick win idea: faster quote follow-up to book more weekly lawn jobs. Open to a 10-min walkthrough?" | Wed 16:30–17:30 | If no reply by EOD -> Thu 09:30 follow-up + CTA. |

---

## Lightweight Execution Checklist

### Pre-send (5 minutes)
- [ ] Confirm each queued lead still shows `status: new`
- [ ] Personalize first line with exact business name + service type
- [ ] Keep initial SMS under 280 characters and one clear CTA

### Send block execution
- [ ] Send in strict order: P1 -> P2 -> P3
- [ ] Log touch in `leads.jsonl` notes with timestamp + channel
- [ ] Update stage immediately: `new -> contacted`

### Follow-up handling
- [ ] Trigger call fallback at 90–120 min no-reply mark
- [ ] Positive response -> set `proposal_sent` and schedule same-day call
- [ ] Explicit decline/unqualified -> set `lost` with reason

### End-of-window wrap
- [ ] Tally: touches sent, replies, positive intents, calls booked
- [ ] Carry no-response leads into v26 with updated timing notes

---

## Jobs-context proof point to use when asked
- Recent paid result: `job_2026_03_02_001` (Excel Audit, $299, paid). Use as lightweight credibility proof only after engagement.
