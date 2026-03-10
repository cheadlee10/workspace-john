# Send Ops Queue v36 (Next 24 Hours)

**Window:** Wed 2026-03-04 13:00 PST → Thu 2026-03-05 13:00 PST  
**Source context used:** `leads.jsonl` (latest sprint35 + reachable legacy phone leads), `jobs.jsonl` (1 completed paid job; no active delivery conflicts)

## Priority Logic
1. **Hot buyer intent first** (Upwork/Reddit hiring posts today)  
2. **Partnership channels second** (LinkedIn/Fiverr talent partnerships)  
3. **Direct-response phone/SMS backups** (reachable phone leads with `outreach_usable=true`)

## Outreach Queue

| Pri | Lead ID | Client | Channel | Message snippet (first send) | Send window (PST) | Follow-up trigger |
|---|---|---|---|---|---|---|
| P1 | sprint35-008 | Upwork: Excel Automation Specialist for Large Data Sets | Upwork proposal | "I can deliver a 72-hour large-file cleanup + automation pass (Power Query + VBA) with measurable speed improvements before handoff." | Wed 13:00–13:20 | If no view/invite by Thu 09:00, submit shorter 3-bullet re-proposal with sample architecture. |
| P1 | sprint35-009 | Upwork: Survey Workflow Automation | Upwork proposal | "I’ll automate intake → scoring → final report workbook so your team can run assessments with near-zero manual touch." | Wed 13:20–13:40 | If no response by Thu 09:30, send follow-up with fixed-scope option and timeline tiers. |
| P1 | sprint35-007 | Upwork: Project + Excel Automation Specialist | Upwork proposal | "I can start with a fast workflow audit and return a working automation prototype in 72 hours." | Wed 13:40–14:00 | If no reply by Thu 10:00, follow up with one concrete deliverable list + price anchor. |
| P1 | sprint35-020 | Reddit: python expert (excel to API) | Reddit DM/chat + post reply (if open) | "Can build your Excel→API pipeline with retries, logs, and validation so failed rows don’t break the run." | Wed 14:00–14:20 | If no reply in 6h, send one bump with mini implementation plan (3 steps). |
| P1 | sprint35-019 | Reddit: BI/Data Analytics + Excel + Domo | Reddit DM/chat | "I can support weekly dashboard ops and automate recurring Excel prep feeding BI reports." | Wed 14:20–14:40 | If no reply in 8h, follow up with retainer-style weekly cadence + expected turnaround. |
| P2 | sprint35-022 | LinkedIn: Small Business Bookkeeping LLC | LinkedIn connect + note | "We help bookkeeping firms cut month-end close time with standardized Excel/Sheets automations and client KPI dashboards." | Wed 15:00–15:15 | If connection pending by Thu 10:30, send InMail/alt touch + engage recent post. |
| P2 | sprint35-023 | LinkedIn: MK Bookkeeping L.L.C | LinkedIn connect + note | "I can white-label recurring reporting automations so your team ships faster without adding headcount." | Wed 15:15–15:30 | If no accept in 18h, send follow-up via company contact form if available. |
| P2 | sprint35-025 | LinkedIn: SLC Bookkeeping | LinkedIn connect + note | "You already build custom systems—happy to partner as overflow automation capacity for spreadsheet-heavy client work." | Wed 15:30–15:45 | If no accept by Thu 11:00, send brief second touch with one concrete co-delivery example. |
| P2 | sprint35-005 | Fiverr: lxortega | Fiverr direct message | "Interested in a white-label partnership: we bring/client-manage higher-ticket automation projects; you can fulfill overflow builds." | Wed 16:00–16:15 | If unread by Thu 11:30, send shorter follow-up with one pilot project idea. |
| P2 | sprint35-002 | Fiverr: nomination1213 | Fiverr direct message | "Want to collaborate on recurring web-automation-to-Excel jobs? We can route scoped work and handle client communication." | Wed 16:15–16:30 | If no response in 18h, send one bump with revenue-share structure option. |
| P3 | wave4-044 | Millennium Plumbing Specialist (Sacramento) | Call + SMS fallback | "Quick one: we help plumbing teams automate dispatch and follow-up sheets so fewer jobs slip and callbacks convert better." | Wed 17:00–17:20 (local-business hour) | If no pickup, send SMS immediately; if no reply by Thu 09:30, second SMS with mini-offer. |
| P3 | wave4-013 | Precision Plumbing (Austin) | Call + SMS fallback | "We build simple plumbing ops automations (lead log, estimate tracker, follow-up reminders) that save admin time fast." | Wed 17:20–17:40 | If no answer, SMS + retry call Thu 08:30 local time. |
| P3 | wave4-003 | Northwest Plumbing of Tennessee | Call + SMS fallback | "We can set up a lightweight workflow so emergency leads are tracked and followed up automatically." | Wed 17:40–18:00 | If no response after SMS, schedule second touch Thu morning + mark for deprioritization after 2 attempts. |

---

## Lightweight Execution Checklist

- [ ] Open one tracking sheet for this run: `lead_id | channel | sent_at | result | next_action_at`.
- [ ] Execute **P1 block first** (Upwork + Reddit) before any partnership outreach.
- [ ] Personalize each message with 1 line from lead notes/service pain.
- [ ] Log outcomes immediately in `leads.jsonl` status notes (`contacted` + timestamp/channel).
- [ ] Trigger follow-ups strictly by table timing (no random extra pings).
- [ ] End-of-window review (Thu ~12:45 PST): count sent, replies, and booked next steps.

## Notes for Operator
- Use concise, specific outcomes (time saved, error reduction, faster turnaround), not generic "automation" language.
- Keep first touch under ~350 characters where possible.
- Since active job load is low (`jobs.jsonl` has one completed paid job), bias toward **volume + speed** in this 24h sprint.
