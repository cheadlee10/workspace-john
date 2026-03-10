# Send Ops Queue v32 (Next 24 Hours)
**Window covered:** Wed 2026-03-04 09:30 PST → Thu 2026-03-05 09:30 PST  
**Source basis:** `leads.jsonl` (fresh Sprint11 + reachable phone leads), `jobs.jsonl` (1 completed paid job; use as social proof)

## Prioritization logic (quick)
1. **P1:** Fresh leads + direct channel available now (platform DM or valid phone) + higher estimated value.
2. **P2:** Fresh but medium-value / slower channel.
3. **P3:** Nurture / second-wave reach-outs.

---

## 24h Outreach Queue (prioritized)

| Pri | Lead ID | Prospect | Channel | Message snippet (customize before send) | Send window (PST) | Follow-up trigger |
|---|---|---|---|---|---|---|
| P1 | sprint11-011 | Finance + QuickBooks + Excel Integration (Upwork) | Upwork proposal + DM | “I can build a QBO→Excel KPI cockpit fast. Delivered a paid automation build this week; can send a 48h MVP with audit trail + handoff docs.” | 10:00–10:30 | If no reply in 4h: send 3-bullet implementation plan + fixed milestone option. |
| P1 | sprint11-009 | TREKKA Suite Sheets/Excel Product (Upwork) | Upwork proposal + DM | “I help turn spreadsheet products into sellable systems (automation + support workflow). Can ship a first premium template + ops playbook this week.” | 10:30–11:00 | No response in 6h: send mini mock structure + ‘first deliverable in 24h’ offer. |
| P1 | sprint11-012 | Apps Script & Sheets Automation (Upwork) | Upwork proposal + DM | “I’ll automate your top 2 repetitive workflows first, with logs + rollback safety. Can start today and provide a same-day process map.” | 11:00–11:20 | No reply by EOD: send short Loom-style text walkthrough outline. |
| P1 | sprint11-008 | Build Excel Dashboard (Upwork) | Upwork proposal + DM | “I can deliver a usable dashboard MVP in 48h, then iterate from your real usage. Includes clean data model + maintenance notes.” | 11:20–11:40 | No reply in 5h: send screenshot-style wireframe description in message. |
| P1 | sprint11-020 | Stefani Vazquez (LinkedIn) | LinkedIn connect + note | “I build bookkeeping KPI dashboards (AR/AP speed, workload, capacity) so owner-operators see bottlenecks fast. Open to a 15-min fit check?” | 12:00–12:20 | If connect accepted/no reply in 24h: send one concrete dashboard outcome. |
| P1 | sprint11-019 | Sharla Clark (LinkedIn) | LinkedIn connect + note | “I help bookkeeping teams automate monthly close packs and recurring client reports. Happy to mock your first workflow free.” | 12:20–12:40 | If accepted/no reply by tomorrow morning: send ‘before/after process’ 4-line follow-up. |
| P1 | wave5-070 | Champion Plumbing (San Antonio) | SMS first, then call | “Quick idea: we help emergency-service shops convert more calls by fixing no-website trust gaps + instant quote flow. Want a 2-min teardown?” | 13:00–13:20 | If no SMS response in 2h: place 1 short call attempt. |
| P1 | wave5-072 | SOSA The Plumber (San Antonio) | SMS first, then call | “Noticed high-intent plumbing demand in your area. I can set up a simple lead-capture + follow-up system so missed calls don’t die. Worth a quick look?” | 13:20–13:40 | If no reply in 2h: call once; if voicemail, leave 20-sec value pitch. |
| P1 | wave4-044 | Millennium Plumbing Specialist | SMS + call | “You likely get urgent calls after hours. We build a lightweight response workflow (capture + follow-up) to recover lost jobs. Want a free quick audit?” | 13:40–14:00 | If no response in 2h: call attempt + voicemail. |
| P1 | wave4-013 | Precision Plumbing (Austin) | SMS + call | “Can share a quick plan to turn emergency plumbing traffic into booked jobs with less back-and-forth. 2-minute summary?” | 14:00–14:20 | If no response in 2h: call once. |
| P2 | sprint11-016 | VBA/Excel Expert Hiring (Reddit) | Reddit DM/comment reply | “I can handle the immediate VBA task and also support ongoing work with fast turnaround + QA notes each handoff.” | 14:30–14:50 | No response by evening: send concise scope/price options (rush + standard). |
| P2 | sprint11-013 | Urgent Excel Rate Adjustment (Reddit) | Reddit DM/comment reply | “Can fix this urgently and leave a reusable rate-adjustment template so you don’t rework this manually again.” | 14:50–15:10 | No response in 3h: send mini sample formula approach. |
| P2 | sprint11-015 | Custom Search Function (Reddit) | Reddit DM/comment reply | “I can build a fast search/filter Excel tool with one-click controls; can deliver a first version quickly and refine after feedback.” | 15:10–15:30 | If silent in 6h: post ‘ready-to-start now’ follow-up with turnaround estimate. |
| P2 | sprint11-007 | Data Entry + Research (Upwork) | Upwork proposal | “I’ll replace manual steps with validation + macro-assisted workflow to reduce errors/time, while keeping process simple for team handoff.” | 16:00–16:20 | No reply by tomorrow AM: send tighter fixed-price first milestone. |
| P2 | sprint11-010 | Retail Shop Dashboard (Upwork) | Upwork proposal | “I can tie POS exports into an auto-refresh dashboard with reorder + margin alerts. First dashboard pass in 48h.” | 16:20–16:40 | No response in 8h: send short scope split (data model, dashboard, alerts). |
| P2 | sprint11-001 | aamir_453 (Fiverr) | Fiverr inbox | “Open to white-label overflow collaboration? I can take complex automation cases and return clean delivery docs under your brand.” | 17:00–17:20 | No reply in 12h: re-message with one specific collaboration use-case. |
| P2 | sprint11-005 | azcodes07 (Fiverr) | Fiverr inbox | “Want to team up on Python→Excel dashboard jobs? I can cover automation plumbing and handoff quality.” | 17:20–17:40 | No response by tomorrow: send a 3-line rev-share offer. |
| P3 | sprint11-002 | hilalabdul (Fiverr) | Fiverr inbox | “If you get API+Excel overflow, I can support backend automation and documentation for smooth client delivery.” | 18:00–18:20 | Follow up next business block if unread after 18h. |
| P3 | sprint11-006 | caiojunger (Fiverr) | Fiverr inbox | “Interested in a cross-referral lane: Power Query cleanup + downstream KPI dashboard builds?” | 18:20–18:40 | If no response in 24h: send one concrete referral scenario. |

---

## Lightweight execution checklist
- [ ] Send all **P1** messages before 14:30 PST.
- [ ] Log each touchpoint in `leads.jsonl` status/notes (`contacted`, timestamp, channel).
- [ ] For phone leads: SMS first, then single call attempt if no response in trigger window.
- [ ] For Upwork/Reddit/Fiverr: personalize first line with exact problem statement from listing.
- [ ] Use one proof point in every message: “recent paid automation delivery completed this week.”
- [ ] Run P2 block after P1 completion; do not skip follow-up triggers.
- [ ] End-of-window review: mark hot replies as `negotiating`, archive no-response attempts with next follow-up date.

## Quick copy blocks
**SMS opener (home-service):**  
“Hey {{name}}, quick idea: we help service businesses convert more urgent calls by fixing missed-call follow-up + trust gaps online. Want a 2-minute teardown?”

**Upwork opener:**  
“I can start today and ship a usable first milestone in 24–48h, with clean handoff docs so you’re not locked in.”

**Reddit opener:**  
“I can solve the urgent task now and leave you a reusable template/script so it doesn’t become a repeat fire drill.”
