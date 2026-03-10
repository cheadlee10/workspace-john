# Send Ops Queue v16 — Next 24 Hours
**Window:** Wed 2026-03-04 06:30 PST → Thu 2026-03-05 06:30 PST  
**Built from:** `leads.jsonl` reachable leads (`outreach_usable=true`) + `jobs.jsonl` proof point (Acme Co, Excel Audit, completed/paid $299 on 2026-03-02).

## Prioritization Logic (v16)
1. **Immediate reachability:** phone/SMS-capable only for this 24h block.
2. **Revenue first:** $1,500/$900 tier first, then $800, then $700–$550.
3. **Urgency vertical bias:** roofing/HVAC/plumbing first, then landscaping/fencing, then handyman/pest.
4. **Timezone-safe delivery:** first touches in 9:00 AM–12:30 PM local business time.
5. **Simple cadence:** initial touch + one follow-up max in this window.

---

## Prioritized Outreach Queue (24h)

| Prio | Lead ID | Business | Est. Value | Channel | Message Snippet | Send Window (Lead Local) | Follow-up Trigger |
|---|---|---|---:|---|---|---|---|
| 1 | nosite-037 | Regal Roofing & Contracting (Seattle, WA) | $1500 | Call → SMS | "I help roofing teams capture more estimate requests from listing traffic by tightening callback flow. Want a 1-page sample?" | 9:00–9:30 AM PT | No pickup: 15-sec VM + SMS in 10 min; no reply by 2:30 PM PT = final bump. |
| 2 | nosite-068 | Quality Construction & Roofing (Houston, TX) | $1500 | Call → SMS | "Quick win for roofing/GC ops: faster first response and cleaner quote intake to book more jobs. Want the template?" | 9:10–9:45 AM CT | No pickup: VM + SMS in 10 min; no reply by 2:00 PM CT = final bump. |
| 3 | nosite-109 | San Diego Heating and Cooling (El Cajon, CA) | $900 | Call → SMS | "I can send a short dispatch + callback workflow that helps HVAC teams recover missed inbound calls." | 10:00–10:35 AM PT | No pickup: SMS in 10 min; no reply by 3:00 PM PT = one follow-up. |
| 4 | nosite-004 | Northwest Landscape and Patio Bellevue | $800 | Call → SMS | "I help landscape/patio crews convert more estimate requests with a simple mobile intake + callback sequence." | 9:40–10:10 AM PT | No pickup: SMS in 10 min; no reply by 3:00 PM PT = one follow-up. |
| 5 | nosite-001 | Perez Landscaping (Seattle, WA) | $800 | SMS → Call | "Can I send a short quote-booking workflow that helps landscaping teams book more estimate visits without extra ad spend?" | 10:15–10:45 AM PT | No SMS reply in 3h: call once. |
| 6 | nosite-002 | Ligaya Landscaping (Seattle, WA) | $800 | SMS → Call | "I built a quick process to turn Yelp inquiries into scheduled landscaping estimates faster—want it?" | 10:45–11:15 AM PT | No SMS reply in 3h: call once. |
| 7 | nosite-003 | Greenscapes Landscaping (Seattle, WA) | $800 | SMS → Call | "I can share a 1-page callback + estimate workflow that usually lifts booking rate for landscaping leads." | 11:00–11:30 AM PT | No SMS reply by 3:30 PM PT: call once. |
| 8 | nosite-005 | Envision Landscaping (Bellevue, WA) | $800 | Call → SMS | "Small ops tweak: faster response and cleaner quote handoff to close more landscaping jobs." | 11:20–11:50 AM PT | No pickup: SMS in 10 min; no reply by 4:00 PM PT = one follow-up. |
| 9 | nosite-050 | Valley Landscaping (Phoenix, AZ) | $800 | Call → SMS | "I help landscaping owners tighten estimate follow-up so more inbound calls turn into booked jobs." | 9:00–9:30 AM MT | No pickup: SMS in 10 min; no reply by 2:00 PM MT = one follow-up. |
| 10 | nosite-053 | RB Landscaping Service (Phoenix, AZ) | $800 | SMS → Call | "Want a quick intake + callback script to convert more landscaping inquiries this week?" | 9:35–10:05 AM MT | No SMS reply in 2.5h: call once. |
| 11 | nosite-115 | Ace Fencing (Las Vegas, NV) | $800 | Call → SMS | "Fence leads close faster with a clearer estimate path + same-day callback script. Want a short draft?" | 10:00–10:30 AM PT | No pickup: VM + SMS in 10 min; no reply by 3:30 PM PT = one follow-up. |
| 12 | nosite-101 | Cedar Fencing Plus (Portland, OR) | $800 | Call → SMS | "I can send a simple process to turn fence inquiries into booked estimate appointments faster." | 10:40–11:10 AM PT | No pickup: SMS in 10 min; no reply by 3:30 PM PT = one follow-up. |
| 13 | nosite-102 | Austin's Custom Fencing (Portland, OR) | $800 | SMS → Call | "Can I send a quick booking workflow for custom fencing leads?" | 11:15–11:45 AM PT | No SMS reply by 3:45 PM PT: call once. |
| 14 | nosite-061 | JV Pool Services (Dallas, TX) | $700 | Call → SMS | "I help service businesses reduce missed calls and book more appointments from inbound demand." | 10:15–10:45 AM CT | No pickup: SMS in 10 min; no reply by 3:00 PM CT = one follow-up. |
| 15 | nosite-116 | Bachman Lawn Care (Kansas City, MO) | $700 | SMS → Call | "Want a short lawn-care estimate booking workflow you can use this week?" | 10:00–10:30 AM CT | No SMS reply in 3h: call once. |
| 16 | nosite-085 | Bug Free Exterminating (Atlanta, GA) | $550 | Call → SMS | "Quick ops idea for pest-control leads: faster response + cleaner appointment handoff to book more calls." | 10:00–10:30 AM ET | No pickup: SMS in 10 min; no reply by 2:30 PM ET = one follow-up. |
| 17 | nosite-084 | American Termite & Pest Elimination (Atlanta, GA) | $550 | SMS → Call | "I can share a one-page lead-response workflow that helps pest teams convert more inbound requests." | 10:40–11:10 AM ET | No SMS reply by 2:30 PM ET: call once. |
| 18 | nosite-086 | CRC Services Termite & Pest Control (Atlanta, GA) | $550 | SMS → Call | "Can I send a short conversion playbook for termite/pest inquiries?" | 11:15–11:45 AM ET | No SMS reply by 3:00 PM ET: call once. |

---

## Backup Bench (if completion pace >80%)
- `nosite-087` Contact Pest Control (Atlanta) — $550 — call/SMS  
- `nosite-079` New Image Mobile Auto Detailing & Fueling (Atlanta) — $600 — call/SMS  
- `nosite-056` Rick The Handyman (Phoenix) — $600 — call/SMS  
- `nosite-057` Manny Handyman Svcs (Phoenix) — $600 — call/SMS  
- `nosite-023` Handy-Den (Tacoma) — $600 — call/SMS  
- `nosite-033` A A Landscaping (Bothell) — $800 — call/SMS

---

## Lightweight Execution Checklist

### 1) Pre-send (5 min)
- [ ] Confirm phone + timezone before each touch.
- [ ] Personalize opener (business name + service + city).
- [ ] Keep first SMS to 55–85 words with one CTA.
- [ ] Use one proof line when needed: "We shipped a paid workflow project this week ($299)."

### 2) During send
- [ ] Execute in priority order unless number is invalid.
- [ ] If call unanswered: leave brief VM (12–18 sec), then SMS in ~10 min.
- [ ] Log each attempt in lead notes/status (`contacted`).

### 3) Follow-up control
- [ ] Max 2 touches per lead in this 24h cycle.
- [ ] Alternate channel on follow-up (Call→SMS or SMS→Call).
- [ ] Stop outreach immediately on reply.

### 4) End-of-window closeout
- [ ] Tally: attempted / connected / replied / interested.
- [ ] Move warm replies to top of next queue.
- [ ] Roll no-replies forward with a fresh opener (no copy/paste repeat).
