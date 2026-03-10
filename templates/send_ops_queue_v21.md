# Send Ops Queue v21 (Next 24 Hours)

**Window:** Wed 2026-03-04 07:24 PST → Thu 2026-03-05 07:24 PST  
**Objective:** Max replies from phone-reachable leads first (SMS + call), prioritize higher-value and freshest records.

## Prioritized Outreach Queue

| Priority | Lead (ID) | Channel | Message Snippet | Send Window | Follow-up Trigger |
|---|---|---|---|---|---|
| P1 | Dallas Tax and Books (`sprint11-025`) | SMS | “Hey — quick one: I build bookkeeping/reporting automations that cut reconciliation/admin time fast. If I send a 2-step idea tailored to your workflow, open to a look?” | **Today 9:20–9:40 AM CST** (7:20–7:40 AM PST; immediate) | If no reply in 3h, call once + leave 20s VM; if still no reply, SMS bump next day 10:30 AM local. |
| P1 | Champion Plumbing (`wave5-070`) | SMS | “I help plumbing shops capture more emergency jobs with a fast, conversion-ready web/lead flow setup. Want a quick teardown of your current funnel?” | **Today 9:45–10:05 AM CST** | If no reply in 4h, send proof-style follow-up (“I can mock this for your service area in 24h”). |
| P1 | SOSA The Plumber (`wave5-072`) | SMS | “I build simple systems for plumbers: faster lead response + cleaner booking flow. Want a 3-point growth fix list for your setup?” | **Today 10:15–10:35 AM CST** | If no reply by EOD local, call once tomorrow 10:00 AM local. |
| P1 | Northwest Plumbing of Tennessee (`wave4-003`) | SMS | “You likely get urgent calls off-hours. I can set up a lightweight response + booking workflow to convert more of those jobs. Worth a quick look?” | **Today 9:10–9:30 AM CST** | If no reply in 3h, send urgency follow-up with one concrete outcome (“fewer missed emergency calls”). |
| P1 | Precision Plumbing (`wave4-013`) | SMS | “I help plumbing teams tighten dispatch + intake so emergency leads don’t leak. Open to a quick audit summary for your operation?” | **Today 9:30–9:50 AM CST** | If no response in 4h, call once; if no pickup, send concise VM recap text. |
| P2 | Millennium Plumbing Specialist (`wave4-044`) | SMS | “I can help increase booked jobs from high-intent calls with a cleaner intake/quote flow. Want a short custom improvement plan?” | **Today 9:15–9:35 AM PST** | If no reply same day, follow up tomorrow 9:45 AM PST with one-line case-style result. |
| P2 | Regal Roofing & Contracting (`nosite-037`) | SMS | “Quick thought: roof leads convert better with a clean trust-first web presence + faster estimate flow. Want me to send a simple before/after plan?” | **Today 10:10–10:30 AM PST** | If no reply by +5h, call once; if no answer, day+1 SMS with storm-response angle. |
| P2 | Quality Construction & Roofing (`nosite-068`) | SMS | “I build lightweight systems for contractors to close more inbound jobs (estimate request + follow-up automation). Open to a 2-minute breakdown?” | **Today 9:20–9:40 AM CST** | If no reply same day, day+1 10:30 AM CST follow-up with concrete CTA. |
| P2 | PMC General Contractor (`wa-google-002`) | SMS | “I help GCs tighten lead-to-estimate workflow so fewer opportunities stall. Want a short custom audit for your current process?” | **Today 10:40–11:00 AM PST** | If no response in 24h, move to call-first sequence. |
| P2 | Environment West Landscape Services (`wa-google-005`) | SMS | “Landscape teams usually lose leads on response lag. I can map a quick fix workflow for bookings and follow-ups — want it?” | **Today 11:10–11:30 AM PST** | If no reply in 4h, send one proof-oriented nudge (specific KPI improvement). |
| P3 | Perez Landscaping (`nosite-001`) | SMS | “I help local landscaping businesses get more booked estimates with a better online lead flow. Open to a quick custom recommendation?” | **Today 1:05–1:25 PM PST** | If no reply by next morning, send brief bump + offer 10-min call window. |
| P3 | A A Landscaping (`nosite-033`) | SMS | “Want a simple way to turn more local inquiries into booked jobs? I can send a custom 3-step improvement plan.” | **Today 1:30–1:50 PM PST** | If no reply in 24h, call once during 10–11 AM local next day. |
| P3 | Joc’s Landscaping (`wa-google-003`) | SMS | “I can help streamline your estimate follow-up flow so more requests turn into paid jobs. Want a short plan tailored to your business?” | **Today 1:55–2:15 PM PST** | If no reply by EOD, queue day+1 SMS with local-competition angle. |
| P3 | Family Lawn Services (`wa-google-004`) | SMS | “If you’re open, I can share a fast lead-response setup that helps lawn/landscape teams book more work each week.” | **Today 2:20–2:40 PM PST** | If no response in 24h, downgrade priority; retry once next week. |

## Queue Logic (applied)
- **Priority stack:** Fresh + reachable + higher estimated value first.
- **Channel rule:** Phone-present leads = SMS first, call second.
- **Timing rule:** 9–11 AM local primary, 1–2 PM local secondary.
- **Cadence rule:** Touch 1 (SMS) → Touch 2 (same-day nudge or call) → Touch 3 (next-day final short bump).

## Lightweight Execution Checklist

- [ ] Validate each phone number format before send (skip if invalid).
- [ ] Personalize first line with client name/service niche before each send.
- [ ] Send P1 block first (5 leads) within local morning windows.
- [ ] Log each attempt in `leads.jsonl` notes/status (`contacted`) with timestamp + channel.
- [ ] Run same-day follow-up triggers exactly as queued (no extra copy bloat).
- [ ] End-of-window review: mark `responsive` vs `no_response`, then roll no-response leads into next queue version.
