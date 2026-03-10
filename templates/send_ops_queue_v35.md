# Send Ops Queue v35 (Next 24 Hours)

**Window covered:** Wed 2026-03-04 12:30 PST → Thu 2026-03-05 12:30 PST  
**Context used:** `leads.jsonl` (new + reachable phone leads), `jobs.jsonl` (recent proof point: Excel Audit completed/paid on 2026-03-02)

## Prioritized Outreach Queue

| Priority | Lead ID | Prospect | Channel | Send Window (local to lead) | Message Snippet | Follow-up Trigger |
|---|---|---|---|---|---|---|
| P1 | nosite-037 | Regal Roofing & Contracting (Seattle) | **Call + SMS** | **Wed 12:45–13:30 PST** | “Quick one — we help roofing teams capture missed calls + quote follow-up automatically. Want a 10-min walkthrough built around your current intake flow?” | If no pickup/reply in 2h: send short SMS bump. If no reply by Thu 10:00 PST: call once more. |
| P1 | wa-google-002 | PMC General Contractor (Bellevue) | **Call + SMS** | **Wed 13:30–14:15 PST** | “I can set up a lightweight ops dashboard for inbound jobs, estimate follow-up, and close-rate tracking without changing your tools. Open to a fast demo?” | If no response in 3h: SMS with one-line value + callback ask. If silent overnight: Thu 09:30 PST retry call. |
| P1 | sprint26-029 | Spokane Landscaping & Maintenance | **Call + SMS** | **Wed 14:00–15:00 PST** | “Built for landscapers: crew scheduling + job-cost visibility in one sheet so margins are visible weekly. Worth a 10-minute look?” | If no answer: SMS immediately after call. If no response by Thu 08:30 PST: follow-up call. |
| P1 | sprint26-028 | Freedom Garage Door Services | **Call + SMS** | **Wed 15:00–16:00 PST** | “We can automate repeat-service reminders + revenue tracking so office time drops and repeat jobs rise. Can I show a sample setup?” | If no reply by EOD: Thu 09:00 PST call + text combo. |
| P1 | sprint26-027 | Garage Door Repair Tacoma | **Call + SMS** | **Wed 16:00–17:00 PST** | “For emergency service shops, we build intake + dispatch tracking that stops lead leakage. Open to a quick walkthrough?” | If missed: SMS in 10 min. If no response by Thu 10:30 PST: second call. |
| P2 | nosite-001 | Perez Landscaping (SeaTac/Tukwila) | **Call + SMS (bilingual-friendly tone)** | **Wed 17:00–18:00 PST** | “Helping local landscaping teams win more recurring work with simple follow-up automation and quote tracking. Want a quick look?” | No response in 2h: concise SMS. Next-day retry Thu 09:30 PST. |
| P2 | wa-google-001 | PNW Landscaping & Services (Seattle) | **Call + SMS** | **Wed 18:00–19:00 PST** | “We set up a simple system so inbound calls become booked estimates with less admin effort. Can I show a 10-min version?” | If no reply tonight: Thu 10:00 PST call retry + short case-style SMS. |
| P2 | wa-google-003 | Joc’s Landscaping (Everett) | **Call + SMS** | **Thu 08:30–09:30 PST** | “I can help tighten estimate follow-up + scheduling so fewer jobs slip. Worth a quick 10-minute demo this week?” | If no pickup: send SMS immediately. If no reply by Thu 12:00 PST: queue for day+1 follow-up. |
| P2 | wa-google-007 | The Honest Handyman & Hauling LLC (Vancouver) | **Call + SMS** | **Thu 09:30–10:30 PST** | “For handyman teams, we build a lightweight job tracker for requests, quotes, and close rate — fast to use, no software switch.” | If no response in 3h: SMS bump with one specific outcome (faster quote turnaround). |
| P2 | wave4-044 | Millennium Plumbing Specialist (Sacramento) | **Call + SMS** | **Wed 15:30–16:30 PST** | “I help plumbing shops automate call-to-quote tracking so emergency leads get follow-up fast. Open to a quick run-through?” | No response in 2h: SMS. If no response by Thu 09:00 PST: second call attempt. |
| P3 | nosite-109 | San Diego Heating and Cooling (El Cajon) | **Call + SMS** | **Wed 16:30–17:30 PST** | “HVAC lead flow usually breaks at callbacks — we fix that with simple tracking + follow-up automation. Want to see a quick template?” | If no answer: immediate SMS. If no response by Thu 10:00 PST: one retry call. |
| P3 | wave4-013 | Precision Plumbing (Austin) | **Call + SMS** | **Thu 09:30–10:30 CST** | “We help plumbing operators convert more inbound jobs with dispatch + follow-up visibility in one place. Open to 10 minutes?” | If no pickup: SMS in 5 min. If no reply by Thu noon CST: move to 48h nurture queue. |

---

## Lightweight Execution Checklist

- [ ] Work queue in order (P1 → P2 → P3), do not skip P1 unless unreachable.
- [ ] For each lead: call first, then SMS within 5–10 minutes if no live connect.
- [ ] Log outcome immediately in `leads.jsonl` notes/status (`contacted` when touched).
- [ ] Tag each touch with timestamp + channel used + next follow-up time.
- [ ] If positive response: create same-day proposal slot and mark `proposal_sent` when delivered.
- [ ] If no response after trigger: execute one retry, then defer to 48h nurture queue.
- [ ] End-of-window check: summarize sent count, replies, meetings booked, and carry-overs.
