# Send Ops Queue v23 (Next 24 Hours)

**Window:** Wed 2026-03-04 07:40 PST → Thu 2026-03-05 07:40 PST  
**Objective:** Hit highest-intent channels first (Upwork/Reddit urgent posts), then run phone outreach on reachable SMB leads, then LinkedIn partner pipeline.  
**Credibility anchor available:** `jobs.jsonl` shows 1 completed paid automation job (`job_2026_03_02_001`, $299) for lightweight proof if asked.

## Prioritized Outreach Queue

| Priority | Lead (ID) | Channel | Message Snippet | Send Window | Follow-up Trigger |
|---|---|---|---|---|---|
| P1 | Upwork Client - Google Sheets Financial Tracking System (`sprint22-008`) | Upwork proposal | “I can deliver a modular build (imports → cleanup → dashboard → forecast) with a working MVP in 72 hours so you get value fast and low risk.” | **Today 8:05–8:25 AM PST** | If no view/invite by +6h: submit tighter variant with 3-bullet scope + fixed milestone split. |
| P1 | Upwork Client - Finance, QuickBooks & Excel Integration (`sprint21-001`) | Upwork proposal | “I’ll start with a 48-hour reconciliation + KPI model cleanup, then wire repeatable QBO-to-Excel reporting so month-end is mostly automated.” | **Today 8:25–8:45 AM PST** | If no response by EOD: send one follow-up clarifying first milestone deliverable and turnaround. |
| P1 | Upwork Client - TREKKA Suite Sheets/Excel Expert (`sprint22-012`) | Upwork proposal | “I can harden formulas, QA templates, and set a repeatable release pipeline so you can ship spreadsheet products faster with fewer revisions.” | **Today 8:45–9:05 AM PST** | If no action by +8h: send short proof-style follow-up with sample workflow outline. |
| P1 | Upwork Client - BI/Data Analytics with advanced Excel (`sprint21-012`) | Reddit DM + thread reply | “Can ship an executive KPI pack + automated refresh model so reporting becomes push-button instead of manual rebuilds.” | **Today 9:10–9:25 AM PST** | If no reply in 4h: one concise bump with a specific mini-deliverable (“I can mock your KPI tab first”). |
| P1 | Dallas Tax and Books (`sprint11-025`) | SMS | “I help bookkeeping teams cut month-end spreadsheet grind with automated reconciliation and client-ready KPI packs. Open to a quick 3-step workflow teardown?” | **Today 9:35–9:50 AM CST** | If no reply by 1:30 PM CST: one call attempt + 20s VM, then final SMS tomorrow 9:45 AM CST. |
| P1 | Champion Plumbing (`wave5-070`) | SMS | “Quick win idea: faster intake + follow-up flow for urgent water-heater calls so more inbound leads convert to booked jobs. Want the short version?” | **Today 9:20–9:35 AM CST** | If no reply in 3h: call once; if no pickup, VM + one-line SMS recap tomorrow morning. |
| P1 | SOSA The Plumber (`wave5-072`) | SMS | “I can share a simple dispatch + follow-up workflow that helps plumbing teams convert more same-day calls. Want a custom 3-point plan?” | **Today 9:40–9:55 AM CST** | If no reply by mid-afternoon CST: one follow-up SMS under 30 words; call fallback tomorrow 10:00 AM CST. |
| P2 | Upwork Client - Google Sheets KPI Dashboard Automation (`sprint22-007`) | Upwork proposal | “I’ll deliver a clean KPI dashboard MVP first, then automate refresh/export so weekly reporting runs without manual patchwork.” | **Today 10:05–10:20 AM PST** | If no response by +24h: send revised version focused on business outcome (time saved / reporting cadence). |
| P2 | Upwork Client - Excel VBA Student Time Tracking (`sprint21-003`) | Upwork proposal | “I can build a form-based tracker with validation and one-click monthly export so admins stop fixing input errors manually.” | **Today 10:20–10:35 AM PST** | If no response in 24h: one follow-up with phased scope and maintenance option. |
| P2 | r/forhire urgent rate-adjustment post (`sprint22-018`) | Reddit thread reply + DM | “I can fix the model today and add a locked what-if calculator so future rate updates don’t break totals.” | **Today 10:40–10:55 AM PST** | If no response by +3h: DM with single CTA and clear same-day turnaround promise. |
| P2 | Bookkeeper.com (`sprint21-021`) | LinkedIn connection + DM | “I help bookkeeping teams automate recurring KPI/report prep so staff spend less time in manual spreadsheet cleanup.” | **Today 1:05–1:20 PM PST** | If no accept in 24h: send InMail/follow-up touch with one specific automation use case. |
| P2 | MK Bookkeeping L.L.C (`sprint21-024`) | LinkedIn connection + DM | “I can set up automated AR aging, margin trend, and cash-runway sheets that are client-ready each month with minimal manual edits.” | **Today 1:20–1:35 PM PST** | If no response by tomorrow afternoon: one short nudge with optional 10-min audit offer. |
| P3 | Sacramento Property Management Services (`sprint21-027`) | Yelp message/request quote | “I can build rent-roll + maintenance KPI automation so owner reports are weekly, consistent, and mostly hands-off.” | **Today 2:10–2:25 PM PST** | If no response by +24h: second touch with concrete deliverable example (vacancy + turn-cost dashboard). |
| P3 | Apex Medical Reimbursement Solutions (`sprint21-029`) | Yelp message/request quote | “I help billing teams track denials, AR aging, and payer follow-up in one automated workbook to speed collections.” | **Today 2:30–2:45 PM MST** | If no response in 24h: send one final bump focused on denial-rate visibility outcome. |

## Queue Logic (Applied)
- **First:** high-intent buyer channels with immediate transaction path (Upwork + urgent Reddit).
- **Second:** phone-reachable SMBs (SMS-first, call fallback same local business day).
- **Third:** partnership/agency targets (LinkedIn + Yelp message) for pipeline compounding.
- **Message policy:** short, problem-first, no first-touch pricing, one CTA.

## Lightweight Execution Checklist

- [ ] Execute P1 sends inside listed windows before any new prospecting.
- [ ] Keep first-touch copy under ~90 words and personalized to service pain.
- [ ] Log every touch in `leads.jsonl` notes and set `status` to `contacted` immediately after send.
- [ ] For phone leads: do max **1** call fallback per trigger window (no spam loops).
- [ ] For Upwork: attach one concrete first milestone in proposal (scope + timeline).
- [ ] For Reddit: post public reply + DM when allowed; include same-day availability.
- [ ] End of window: mark each lead with `responsive` or `no_response` note for v24 rollover.

## Data Notes for Main Agent
- `sprint11-025` appears duplicated in `leads.jsonl` with different client entries; de-dup recommended before bulk ops.
- Several older “wave” leads are still `new`; prioritize by direct channel availability (`phone`/platform DM) before value alone.
