# Send Ops Queue v49 (Next 24 Hours)

**Window covered:** Wed 2026-03-04 16:00 PST -> Thu 2026-03-05 16:00 PST  
**Queue basis:** `leads.jsonl` callable/usable leads + highest estimated value + timezone sequencing for live call windows.  
**Proof anchor:** `jobs.jsonl` shows latest completed/paid job (`job_2026_03_02_001`, $299).

## Prioritized Outreach Queue

| Priority | Lead ID | Prospect | Channel | Message snippet | Send window (local) | Follow-up trigger |
|---|---|---|---|---|---|---|
| P1 | nosite-037 | Regal Roofing & Contracting (Seattle) | Call + SMS | “Quick idea for roofing ops: tighten missed-call recovery + estimate follow-up so hot leads don’t die in voicemail.” | Wed 4:05-4:25 PM PT | No pickup -> voicemail + SMS in 5 min; retry Thu 9:05 AM PT |
| P1 | nosite-068 | Quality Construction & Roofing (Houston) | Call + SMS | “I can map one simple pipeline from first inquiry to booked roof job so no estimate falls through.” | Wed 6:05-6:25 PM CT | No connect -> SMS recap; retry Thu 9:10 AM CT |
| P1 | nosite-109 | San Diego Heating and Cooling (El Cajon) | Call + SMS | “HVAC teams usually win fast by tightening callback speed and dispatch visibility. Want a 10-minute walkthrough?” | Wed 4:30-4:50 PM PT | No answer -> SMS in 5 min; retry Thu 9:30 AM PT |
| P1 | wave4-013 | Precision Plumbing (Austin) | Call + SMS | “I help plumbing teams reduce missed callbacks and keep jobs/invoices visible in one simple flow.” | Wed 6:30-6:50 PM CT | No pickup -> voicemail + SMS; retry Thu 9:40 AM CT |
| P1 | wave4-003 | Northwest Plumbing of Tennessee (Nashville) | Call + SMS | “If urgent calls are getting scattered, I can send a lightweight intake + follow-up process you can run this week.” | Wed 6:55-7:15 PM CT | No answer -> SMS CTA; retry Thu 9:55 AM CT |
| P2 | nosite-004 | Northwest Landscape and Patio Bellevue | Call + SMS | “Landscaping crews usually get an easy lift by tightening quote follow-up and reminder timing.” | Thu 9:15-9:35 AM PT | No connect -> SMS + second call Thu 1:30 PM PT |
| P2 | nosite-005 | Envision Landscaping (Bellevue) | Call + SMS | “Want a one-page follow-up cadence that helps convert more inbound landscaping requests?” | Thu 9:40-10:00 AM PT | No answer -> SMS in 10 min; retry Thu 1:50 PM PT |
| P2 | nosite-001 | Perez Landscaping (Seattle) | Call + SMS | “I can share a simple lead-to-estimate tracker that keeps every landscaping inquiry moving.” | Thu 10:05-10:25 AM PT | No pickup -> SMS + move to FU1 if silent by 2:30 PM PT |
| P2 | nosite-033 | A A Landscaping (Bothell) | Call + SMS | “Quick growth fix: faster callback + quote reminder loop for local landscaping leads.” | Thu 10:30-10:50 AM PT | No answer -> SMS + retry Thu 2:45 PM PT |
| P2 | nosite-023 | Handy-Den (Tacoma) | Call + SMS | “Handyman shops usually close more by tracking first call -> scheduled job in one view.” | Thu 11:00-11:20 AM PT | No connect -> SMS follow-up; retry Thu 3:10 PM PT |
| P3 | nosite-007 | Half-Price Handyman (Kirkland) | Call + SMS | “I can send a lightweight booking + follow-up template you can use immediately.” | Thu 11:25-11:45 AM PT | No response after 2 attempts -> park in FU1 for Fri morning |
| P3 | nosite-008 | R & S Cleaning Services (Redmond) | Call + SMS | “Cleaning teams often recover extra bookings with a tighter inquiry-to-reminder process.” | Thu 11:50 AM-12:10 PM PT | No response -> SMS nudge, then final retry Fri 9:20 AM PT |

---

## Lightweight Execution Checklist

- [ ] Run P1 fully before touching P2/P3.
- [ ] For every missed call: voicemail (if available) + SMS within 5-10 minutes.
- [ ] Keep first-touch SMS under 320 chars; one CTA only.
- [ ] Log each attempt in `leads.jsonl` notes with timestamp + outcome.
- [ ] Flip `status` from `new` -> `contacted` after first outbound touch.
- [ ] Execute same-day retry windows exactly; do not skip order.
- [ ] End of cycle: summarize attempts, connects, callbacks booked, and FU1 carryover.

## Quick Operator Notes

- Queue is weighted toward **phone-verified, high-estimated-value home-service leads** for fastest close probability.
- PST-local leads are packed into morning blocks for tighter manual control.
- Core value prop stays consistent: missed-call recovery, estimate follow-up speed, and simple pipeline visibility.