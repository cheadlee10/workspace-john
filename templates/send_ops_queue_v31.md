# Send Ops Queue v31 — Next 24 Hours

**Generated:** 2026-03-04 09:10 PST  
**Horizon:** Next 24 hours  
**Objective:** Prioritized outreach queue using leads with direct contact paths (call/SMS first), with explicit send windows and follow-up triggers.

## Prioritization Logic
1. **Usable direct channel** (`can_call` / `can_sms` true)
2. **Higher estimated value** ($500+ weighted first)
3. **High-intent verticals** (plumbing, roofing, contractor, emergency terms)
4. **Geographic clustering** for faster execution blocks (PT then CT/ET)

---

## A) Tier 1 — Immediate Push (0–4 hours)

| Priority | Lead ID | Client | Channel | Message Snippet (first touch) | Send Window (lead local time) | Follow-up Trigger |
|---|---|---|---|---|---|---|
| 1 | wave4-044 | Millennium Plumbing Specialist (Sacramento) | Call → SMS | "Saw your Sacramento plumbing visibility is strong. I can show a 2-step fix to turn more profile views into booked calls this week—open to a 5-min walkthrough?" | 09:30–11:00 PT | No pickup → SMS in 10 min; no reply by 14:30 PT → second call |
| 2 | nosite-037 | Regal Roofing & Contracting (Seattle) | Call → SMS | "Quick one: we help roofing companies convert Yelp/Google traffic into quote requests fast without a full rebuild. Want a quick teardown today?" | 10:00–11:30 PT | No answer → SMS in 15 min; no reply by 15:00 PT → retry call |
| 3 | wa-google-002 | PMC General Contractor (Bellevue) | Call → SMS | "Noticed PMC has local visibility but likely missed quote capture. I can share a short before/after flow that increases inbound requests." | 10:00–12:00 PT | No pickup → SMS; no response by 15:30 PT → one final call |
| 4 | wave4-013 | Precision Plumbing (Austin) | SMS → Call | "You’re in a high-intent plumbing market. We build simple booking funnels that usually increase inbound calls in days. Want a quick example?" | 11:00–12:30 CT | No reply in 45 min → call; voicemail → proof SMS follow-up |
| 5 | wave4-003 | Northwest Plumbing of Tennessee (Nashville) | Call → SMS | "I can show 2 fast wins to capture more emergency-plumbing leads from your listing traffic this week. Open to 5 minutes today?" | 10:00–12:00 CT | No pickup → SMS in 10 min; no reply by 15:00 CT → second call |
| 6 | nosite-068 | Quality Construction & Roofing (Houston) | SMS → Call | "We help roofing/GC teams convert map traffic into booked estimates with a lightweight follow-up system. Want a 2-min overview?" | 10:30–12:30 CT | No reply in 60 min → call once; no contact → late-day SMS bump |

---

## B) Tier 2 — Same-Day Expansion (4–10 hours)

| Priority | Lead ID | Client | Channel | Message Snippet (first touch) | Send Window (lead local time) | Follow-up Trigger |
|---|---|---|---|---|---|---|
| 7 | wa-google-001 | PNW Landscaping & Services (Seattle) | SMS → Call | "Found 2 simple updates that can lift landscaping call volume from your existing profile traffic. Want me to text them over?" | 13:00–15:00 PT | No reply in 45 min → call |
| 8 | wa-google-003 | Joc’s Landscaping (Everett) | Call → SMS | "We help landscaping crews turn profile views into estimate requests without adding tech overhead. Worth a quick 5-minute review?" | 13:00–16:00 PT | No answer → SMS; no reply by EOD → tomorrow 09:30 PT retry |
| 9 | wa-google-004 | Family Lawn Services (Everett) | SMS → Call | "Quick idea to increase booked lawn jobs from search traffic this week. Open to a short walkthrough?" | 13:30–16:30 PT | No reply in 60 min → call |
| 10 | nosite-004 | Northwest Landscape and Patio Bellevue | Call → SMS | "You’re already getting discovered—next step is converting that traffic into more quote requests. Want a fast teardown?" | 13:00–16:00 PT | No pickup → SMS; no response by next day 10:00 PT → retry |
| 11 | nosite-005 | Envision Landscaping (Bellevue) | SMS → Call | "I can share a simple booking + follow-up text flow that usually lifts close rate for landscaping teams quickly." | 13:00–16:30 PT | No reply in 60 min → call |
| 12 | nosite-033 | A A Landscaping (Bothell) | Call → SMS | "We help local landscaping operators turn listing traffic into scheduled estimates faster. Open to a quick 5-min chat?" | 14:00–17:00 PT | No answer → SMS in 10 min; no reply by 18:00 PT → queue next-day AM |

---

## C) Tier 3 — Next-Morning Time-Zone Sweep (10–24 hours)

| Priority | Lead ID | Client | Channel | Message Snippet (first touch) | Send Window (lead local time) | Follow-up Trigger |
|---|---|---|---|---|---|---|
| 13 | nosite-061 | JV Pool Services (Dallas) | SMS → Call | "Pool operators using our quick quote workflow usually book more callbacks. Want a quick example for your market?" | 09:30–11:30 CT (next day) | No reply in 60 min → call |
| 14 | nosite-084 | American Termite & Pest Elimination (Atlanta) | Call → SMS | "We help pest-control teams convert local demand into booked inspections with faster response flow. Want a short audit?" | 10:00–12:00 ET (next day) | No answer → SMS; no reply by 15:00 ET → second attempt |
| 15 | nosite-085 | Bug Free Exterminating (Atlanta) | SMS → Call | "Quick idea to increase booked pest jobs from current listing traffic. Want the 2-step version?" | 10:30–12:30 ET (next day) | No reply in 45 min → call |
| 16 | nosite-086 | CRC Services Termite & Pest Control (Atlanta) | Call → SMS | "I can show where calls leak in the current flow and how to recover more booked jobs this week. Open to 5 mins?" | 11:00–13:00 ET (next day) | No pickup → SMS follow-up |
| 17 | nosite-087 | Contact Pest Control (Atlanta) | SMS → Call | "We help local service businesses improve response-to-booking rate without expensive rebuilds. Want details?" | 11:00–13:30 ET (next day) | No reply in 60 min → call |
| 18 | wave3-106 | Picasso Painting (Milwaukee) | Call → SMS | "We help painting contractors turn profile traffic into quote requests with a simple conversion setup. Quick chat?" | 10:00–12:00 CT (next day) | No answer → SMS; retry once at 15:00 CT |

---

## Lightweight Execution Checklist

### 1) Pre-send (10 minutes)
- [ ] Confirm each lead timezone before sending.
- [ ] Keep 4 short vertical variants ready (plumbing / roofing / landscaping / pest).
- [ ] Open tracker for live status logging (`contacted`, `no_answer`, `voicemail`, `replied`, `booked`).

### 2) Execution
- [ ] Run Tier 1 in order, no skipping.
- [ ] Apply follow-up trigger immediately when condition is met.
- [ ] Keep first messages under ~45 words with one CTA.

### 3) Control point (+4 hours)
- [ ] Review Tier 1 outcomes.
- [ ] Promote any warm responders to meeting-booking flow immediately.
- [ ] Start Tier 2 to fill remaining capacity.

### 4) End-of-cycle handoff
- [ ] Queue Tier 3 for next-day local windows.
- [ ] Post KPI snapshot: total sent / live connects / replies / calls booked.
- [ ] Flag bad numbers for cleanup in leads file.

---

## Operator Notes
- This queue intentionally favors **direct phone/SMS leads** for speed to conversation.
- Leads with no direct contact path remain in verification/research backlog.
- Reference recent completed delivery proof if needed: one paid/completed job exists in `jobs.jsonl` (Acme Co Excel Audit, completed/paid).