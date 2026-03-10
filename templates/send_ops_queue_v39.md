# Send Ops Queue v39 (Next 24 Hours)

**Window:** Wed 2026-03-04 13:30 PST → Thu 2026-03-05 13:30 PST  
**Source context used:** `leads.jsonl` (fresh wave4 + phone-validated legacy leads), `jobs.jsonl` (only 1 completed job, so outbound capacity is open)

## Priority Logic
1. **P1:** Phone-verified + higher ticket (plumbing/contractor/roofing)
2. **P2:** Phone-verified but lower ticket or older wave (still reachable)
3. **P3:** No direct phone/email (Yelp message only) for pipeline coverage

## Prioritized Outreach Queue (24h)

| Pri | Lead ID | Client | Channel | Message snippet (first touch) | Send window (PST) | Follow-up trigger |
|---|---|---|---|---|---|---|
| P1 | wave4-044 | Millennium Plumbing Specialist | Call + SMS fallback | "I help plumbing teams stop missed callbacks with a simple dispatch + follow-up board that increases booked jobs." | Wed 13:35–13:50 | No pickup → SMS in 2 min. No reply by Thu 09:00 → second call + short proof text. |
| P1 | wave4-013 | Precision Plumbing | Call + SMS fallback | "Quick win: one lead-to-job tracker for water-heater and emergency calls so quotes don’t stall." | Wed 13:50–14:05 | Missed call → SMS immediately. No response by Thu 09:20 → final call attempt. |
| P1 | wave4-003 | Northwest Plumbing of Tennessee | Call + SMS fallback | "We set up lightweight estimate/callback automation so plumbing leads are contacted faster and close rate improves." | Wed 14:05–14:20 | No answer → SMS. No reply by Thu 08:45 local → one more call. |
| P1 | wa-google-002 | PMC General Contractor | Call + SMS fallback | "I can tighten your estimate follow-up flow so fewer bids go cold and crew scheduling stays full." | Wed 14:20–14:35 | No pickup → SMS. If silent by Thu 09:45 → 1 concise ROI follow-up text. |
| P1 | nosite-037 | Regal Roofing & Contracting | Call + SMS fallback | "We help roofing teams track inbound leads, pending estimates, and callback dates in one place." | Wed 14:35–14:50 | No answer → SMS. If no response by Thu 10:00 → one final touch. |
| P2 | nosite-068 | Quality Construction & Roofing | Call + SMS fallback | "Fast ops upgrade: lead tracker + follow-up reminders so fewer roofing inquiries are lost." | Wed 15:05–15:20 | If unanswered, SMS. Retry once Thu morning; stop after 2 total attempts. |
| P2 | wa-google-005 | Environment West Landscape Services | Call + SMS fallback | "We can implement a landscaping quote + job-cost board to improve margin visibility by crew." | Wed 15:20–15:35 | No pickup → SMS. If no reply by Thu 10:15 → second call. |
| P2 | wa-google-003 | Joc's Landscaping | Call + SMS fallback | "I build simple quote-to-schedule systems that cut response lag and keep crews booked." | Wed 15:35–15:50 | Missed call → SMS. No response by Thu 10:30 → one final text. |
| P2 | wave3-180 | Stat Plumbing | Call + SMS fallback | "Can share a 10-min plumbing pipeline setup to improve follow-up speed without extra admin overhead." | Wed 15:50–16:05 | No pickup → SMS. If silent by Thu 09:30 local → one final call. |
| P2 | wave3-175 | Neighborhood Mechanic | Call + SMS fallback | "Quick system to track inbound jobs, pending approvals, and customer follow-up so bays stay full." | Wed 16:05–16:20 | No answer → SMS. If no response by Thu 11:00 → last follow-up text. |
| P3 | wave4-049 | Emerald City Plumbing & Drain | Yelp message/request quote | "Saw your Yelp presence—happy to share a simple dispatch and follow-up workflow to capture more emergency jobs." | Wed 16:35–16:45 | No reply by Thu 11:15 → short second Yelp touch with one metric. |
| P3 | wave4-054 | South Sound Drain & Sewer | Yelp message/request quote | "We help drain/sewer teams improve lead response time and booked-job conversion with a lightweight ops board." | Wed 16:45–16:55 | No response by Thu 11:30 → final concise Yelp follow-up. |

---

## Lightweight Execution Checklist

- [ ] Start a run log: `lead_id | priority | channel | sent_at | outcome | next_action_at | notes`.
- [ ] Execute all **P1** touches first (call-first, SMS-second).
- [ ] Keep first-touch SMS under 280–300 chars with one CTA: "Open to a 10-minute walkthrough?"
- [ ] Respect 2-attempt max in this 24h cycle for phone leads.
- [ ] Update `leads.jsonl` immediately after each touch (`status: contacted`, timestamp, channel, result).
- [ ] For Yelp-only leads, cap effort to 2 touches this cycle.
- [ ] End-of-window closeout (Thu ~13:15 PST): total touches, response count, callbacks booked, and roll-forward list for v40.

## Operator Notes
- Highest near-term conversion remains **phone-verified plumbing + contractor leads**.
- With delivery load currently light (`jobs.jsonl` minimal active obligations), bias toward **same-day contact velocity**.
- Keep messaging outcome-led (faster callbacks, more booked jobs, fewer cold estimates).