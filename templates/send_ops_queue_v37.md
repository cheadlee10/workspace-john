# Send Ops Queue v37 (Next 24 Hours)

**Window:** Wed 2026-03-04 13:15 PST → Thu 2026-03-05 13:15 PST  
**Source context used:** `leads.jsonl` (fresh `sprint26` + reachable legacy/wave leads), `jobs.jsonl` (only 1 completed paid job; no fulfillment bottleneck)

## Priority Logic
1. **Direct phone outreach first** on fresh local SMB leads added today (`sprint26-*`)  
2. **High-ticket legacy reachable leads second** (roofing/contractor/plumbing with validated phone)  
3. **Platform pipeline touches third** (Upwork/LinkedIn partner leads from sprint sets)

## Outreach Queue

| Pri | Lead ID | Client | Channel | Message snippet (first send) | Send window (PST) | Follow-up trigger |
|---|---|---|---|---|---|---|
| P1 | sprint26-029 | Spokane Landscaping & Maintenance | Call + SMS fallback | "We help landscaping teams run crew schedules + job-cost tracking in one simple sheet so weekly margins are clear without extra admin." | Wed 13:15–13:35 | If no pickup, SMS in 2 min. If no reply by Thu 09:00, retry call + tighter mini-offer (2-week setup). |
| P1 | sprint26-028 | Freedom Garage Door Services | Call + SMS fallback | "Quick idea: automate service reminders + lead-to-dispatch tracking so repeat jobs increase and missed callbacks drop." | Wed 13:35–13:55 | If no answer, SMS immediately. If unread/no response by Thu 09:15, send proof-style follow-up with one KPI outcome. |
| P1 | sprint26-027 | Garage Door Repair Tacoma | Call + SMS fallback | "I can set up a fast dispatch tracker for urgent calls so tech assignment and close-rate by zip are visible daily." | Wed 13:55–14:15 | If no pickup, send SMS and schedule second call Thu morning. Stop after 2 attempts. |
| P1 | sprint26-030 | Accurate Accounting Company, Inc. | Call + SMS fallback | "We build close-checklist + KPI reporting automations for bookkeeping firms to reduce month-end crunch and manual errors." | Wed 14:15–14:35 | If no answer, SMS. If no response by Thu 10:00, send second SMS with concrete 30-min audit CTA. |
| P1 | sprint11-025 | Dallas Tax and Books | Call + SMS fallback | "We help tax/bookkeeping shops automate recurring reconciliations and client report packs so each staff member handles more accounts." | Wed 14:35–14:55 | If voicemail/no pickup, SMS same hour. If no response by Thu 10:30, retry once. |
| P2 | nosite-037 | Regal Roofing & Contracting | Call + SMS fallback | "We set up roofing ops trackers (lead, estimate, follow-up) so fewer inbound jobs go cold and sales cycle shortens." | Wed 15:15–15:35 | If no pickup, SMS. If no reply by Thu 09:30, one final follow-up text with short ROI line. |
| P2 | nosite-068 | Quality Construction & Roofing | Call + SMS fallback | "Can help your office run estimate-to-job tracking in one dashboard to tighten callback speed and conversion." | Wed 15:35–15:55 | If unanswered, SMS + mark for Thu morning retry. Deprioritize after second miss. |
| P2 | wave4-044 | Millennium Plumbing Specialist | Call + SMS fallback | "We build lightweight plumbing dispatch + follow-up sheets that reduce missed jobs and make tech utilization clearer." | Wed 15:55–16:15 | If no answer, SMS immediately. If no response by Thu 09:45, send case-style second touch. |
| P2 | wave4-013 | Precision Plumbing | Call + SMS fallback | "I can set up a simple lead + water-heater follow-up tracker so hot calls get handled faster and booked." | Wed 16:15–16:35 | If no pickup, SMS. Retry Thu 08:30 local time if no response. |
| P2 | wave5-070 | Champion Plumbing | Call + SMS fallback | "Fast win: automate no-hot-water leads, quotes, and install scheduling in one sheet so response time improves." | Wed 16:35–16:55 | If no answer, SMS in 2 min; follow-up Thu morning with brief CTA. |
| P3 | sprint11-011 | Upwork: Finance + QuickBooks + Excel Integration | Upwork proposal | "I can build a finance ops cockpit syncing QBO + Sheets/Excel with KPI views for pricing, margin, and cash decisions." | Wed 17:30–17:50 | If no view/invite by Thu 09:30, send compact 3-bullet follow-up with phased scope. |
| P3 | sprint26-019 | LinkedIn: James Persons | LinkedIn connect + note | "If you’re open, I can help standardize bookkeeping + landscaping reporting workflows so recurring ops are mostly template-driven." | Wed 17:50–18:05 | If invite pending by Thu 11:00, send alternate touch via profile message/post engagement. |
| P3 | sprint26-004 | Fiverr: mushfique32 | Fiverr DM | "Open to a white-label collab? We can route higher-ticket dashboard/automation projects and handle client-facing discovery + QA." | Wed 18:05–18:20 | If unread by Thu 11:30, send one short bump with pilot-project structure. |

---

## Lightweight Execution Checklist

- [ ] Create run log before sends: `lead_id | channel | sent_at | outcome | next_action_at | owner`.
- [ ] Execute all **P1 calls/SMS first** before platform outreach.
- [ ] Keep first-touch SMS under ~300 chars and outcome-focused.
- [ ] Update `leads.jsonl` notes/status immediately after each touch (`contacted`, timestamp, channel).
- [ ] Trigger follow-ups only per table timing (max 2 attempts per phone lead in this window).
- [ ] Thu ~13:00 PST closeout: total touches, replies, callbacks booked, and carry-over list.

## Operator Notes
- Strongest near-term conversion is from fresh local SMB phone leads (`sprint26-025` to `sprint26-030`).
- Use proof language (fewer missed callbacks, faster dispatch, cleaner month-end) not generic "automation" talk.
- With no active delivery load in `jobs.jsonl`, bias this cycle toward speed + contact volume.
