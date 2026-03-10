# Send Ops Queue v45 (Next 24 Hours)

**Window:** Wed 2026-03-04 14:50 PT → Thu 2026-03-05 14:50 PT  
**Objective:** Prioritize phone-verified, highest-value operators first (roofing/GC/HVAC/plumbing), then fill with strong landscaping/fencing/local-service leads.  
**Data basis:** `leads.jsonl` (usable phone + `outreach_usable: true`) and `jobs.jsonl` (recent paid proof: Acme Co, $299, completed).

## Prioritized Outreach Queue

| Priority | Lead ID | Client | Est. Value | Channel | Message Snippet (first touch) | Send Window (PT) | Follow-up Trigger |
|---|---|---|---:|---|---|---|---|
| 1 | nosite-037 | Regal Roofing & Contracting | $1,500 | Call + SMS | “I help roofing teams stop estimate leakage with a simple callback + quote follow-up flow. Open to a quick 10-min call?” | Wed 14:55–15:15 | No pickup/VM → SMS in 5 min; retry Thu 09:00 |
| 2 | nosite-068 | Quality Construction & Roofing | $1,500 | Call + SMS | “Quick idea for your crew: one lightweight pipeline for inbound leads, estimates, and booked jobs.” | Wed 15:15–15:35 | No connect → SMS immediately; retry Thu 09:20 |
| 3 | wa-google-002 | PMC General Contractor | $1,200 | Call + SMS | “GCs often lose margin between inquiry and scheduling—want a simple handoff workflow your team can use this week?” | Wed 15:35–15:55 | Gatekeeper/no answer → SMS recap; retry Thu 09:40 |
| 4 | wa-google-005 | Environment West Landscape Services | $1,000 | Call + SMS | “I can map a fast quote-to-schedule process to recover missed landscaping revenue without extra admin.” | Wed 15:55–16:15 | No answer → SMS in 10 min; retry Thu 10:00 |
| 5 | nosite-109 | San Diego Heating and Cooling | $900 | Call + SMS | “For HVAC shops, we tighten missed-call response and quote follow-up so dispatch stays full.” | Wed 16:15–16:35 | No pickup → SMS in 5 min; retry Thu 10:20 |
| 6 | wa-google-001 | PNW Landscaping & Services | $800 | Call + SMS | “Quick win: faster callback cadence + estimate reminders to lift booked landscaping jobs.” | Wed 16:35–16:55 | No connect → SMS; retry Thu 10:40 |
| 7 | wa-google-003 | Joc's Landscaping | $750 | Call + SMS | “Would a simple quote tracker + follow-up cadence help you close more of the work you already bid?” | Wed 16:55–17:15 | Voicemail → SMS; retry Thu 11:00 |
| 8 | wa-google-006 | Keith's Lawn & Landscape | $750 | Call + SMS | “I help lawn teams turn more inbound calls into booked work with a lightweight lead workflow.” | Wed 17:15–17:35 | No answer → SMS; retry Thu 11:20 |
| 9 | wa-google-007 | The Honest Handyman & Hauling LLC | $700 | Call + SMS | “For handyman operators, we simplify intake → quote → follow-up so fewer jobs go cold.” | Wed 17:35–17:55 | No pickup → SMS; retry Thu 11:40 |
| 10 | wave4-013 | Precision Plumbing | $500 | Call + SMS | “Plumbing teams usually win more jobs with tighter missed-call + dispatch follow-up. Worth a short walkthrough?” | Thu 08:30–08:50 | No answer → SMS in 5 min; retry Thu 12:30 |
| 11 | wave4-003 | Northwest Plumbing of Tennessee | $500 | Call + SMS | “I’ve got a simple urgent-call and estimate follow-up flow that works well for plumbing shops.” | Thu 08:50–09:10 | Voicemail → SMS immediately; retry Thu 12:45 |
| 12 | wave3-010 | Garman Plumbing | $350 | Call + SMS | “Can I share a 1-page process to improve callback speed and booked plumbing jobs?” | Thu 09:10–09:30 | No connect → SMS; retry Thu 13:00 |
| 13 | wave3-007 | Dazco Plumbing | $350 | Call + SMS | “Quick process tweak: faster follow-up timing to turn more quote requests into paid work.” | Thu 09:30–09:50 | No answer → SMS; retry Thu 13:15 |
| 14 | wave3-006 | Garrico Plumbing | $350 | Call + SMS | “I help local plumbing businesses close more inbound calls without adding heavy software.” | Thu 09:50–10:10 | No answer → SMS; retry Thu 13:30 |
| 15 | wave3-102 | Austin's Custom Fencing | $800 | Call + SMS | “Fence crews often lose deals in follow-up; I can show a simple board to recover them fast.” | Thu 10:10–10:30 | No pickup → SMS; retry Thu 13:45 |
| 16 | wave3-101 | Cedar Fencing Plus | $800 | Call + SMS | “Would a lightweight quote + callback workflow help you close more fence jobs this month?” | Thu 10:30–10:50 | No answer → SMS; final retry next cycle |

---

## Quick SMS Fallback Snippets

**Missed-call SMS:**  
“Hey {{client}}, John with NorthStar Synergy — just tried you. I help {{industry}} teams tighten follow-up + scheduling so fewer jobs slip. Open to a quick 10-min call?”

**Second-touch SMS:**  
“Quick follow-up, {{client}} — I drafted a simple idea to improve callbacks and quote conversion without changing your whole process. Worth a short walkthrough?”

## Lightweight Execution Checklist

- [ ] Execute in priority order during listed windows (call first, SMS second).
- [ ] Send fallback SMS within 5–10 minutes after missed/no-answer calls.
- [ ] Log each touch to `leads.jsonl` notes with timestamp, channel, and outcome (`no_answer`, `voicemail`, `connected`, `callback_set`, `not_fit`).
- [ ] Move lead status to `contacted` after first attempt.
- [ ] If connected: qualify lead volume, follow-up gaps, and decision-maker access in <10 minutes.
- [ ] Book next call inside 24–48 hours on positive responses.
- [ ] End of block: roll up totals (calls, SMS, connects, callbacks booked) for next queue version.
