# Send Ops Queue v30 — Next 24 Hours

**Generated:** 2026-03-04 09:00 PST  
**Horizon:** Next 24 hours  
**Objective:** High-probability first-contact touches (call/SMS first), with same-day follow-up and tight triggers.

## Prioritization Logic
1. **Direct channel available** (`can_call`/`can_sms` true)
2. **Higher estimated value** (>$600 prioritized)
3. **Recency/intent signals** (Wave4 plumbing + explicit emergency/rooter/leak terms)
4. **Named owner/contact bonus** (when present)

---

## A) Tier 1 — Do First (0–4 hours)

| Priority | Lead ID | Client | Channel | Message Snippet (first touch) | Send Window (local to lead) | Follow-up Trigger |
|---|---|---|---|---|---|---|
| 1 | nosite-068 | Quality Construction & Roofing (Houston) | SMS then call | "Quick one — noticed your Yelp profile is active but thin. We help roofing shops capture more booked jobs from search in 7 days. Want a 2-min teardown?" | 10:00–12:00 CT | No reply in 45 min → call once; no pickup → SMS #2 at 15:30 CT |
| 2 | nosite-037 | Regal Roofing & Contracting (Seattle) | Call then SMS | "Saw Regal Roofing on Yelp. I can show 2 fixes that usually improve call volume fast for roofing listings. Worth a quick 5-min review today?" | 10:00–11:30 PT | No answer → SMS in 10 min; no reply by 14:00 PT → second call |
| 3 | wave4-044 | Millennium Plumbing Specialist (Sacramento) | Call then SMS | "You’re showing strong plumbing intent terms already. We help convert that into booked calls with listing/quote funnel fixes. 5-min walkthrough?" | 10:00–12:00 PT | No answer → SMS immediately; no reply by 16:00 PT → final nudge |
| 4 | wave4-013 | Precision Plumbing (Austin) | SMS then call | "Noticed strong plumbing demand around your listing. We build simple no-website booking funnels that raise inbound calls quickly. Open to a short demo?" | 10:30–12:30 CT | No reply in 60 min → call; if voicemail → send proof-style SMS |
| 5 | wave4-003 | Northwest Plumbing of Tennessee (Nashville) | Call then SMS | "You’re in a high-intent plumbing market. I can share a fast playbook to convert Yelp/Google traffic into more booked jobs this week." | 10:00–12:00 CT | No pickup → SMS in 15 min; no response by 15:00 CT → second call |
| 6 | wa-google-002 | PMC General Contractor (Bellevue) | Call then SMS | "We help GCs with no-site/low-site visibility turn map traffic into quote requests fast. Want a quick before/after example?" | 10:00–12:00 PT | No answer → SMS; no reply by 15:30 PT → call once more |

---

## B) Tier 2 — Same-Day Expansion (4–10 hours)

| Priority | Lead ID | Client | Channel | Message Snippet (first touch) | Send Window (local to lead) | Follow-up Trigger |
|---|---|---|---|---|---|---|
| 7 | wa-google-005 | Environment West Landscape Services (Spokane) | Call then SMS | "We help landscapers turn profile views into scheduled estimates without a full website rebuild. Open to a quick audit?" | 13:00–15:00 PT | No answer → SMS; no reply by 17:30 PT → next-day AM retry |
| 8 | wa-google-001 | PNW Landscaping & Services (Seattle) | SMS then call | "I found 2 easy profile fixes that can lift inbound landscaping calls this week. Want me to text them over?" | 13:00–15:30 PT | No reply in 45 min → call |
| 9 | wa-google-003 | Joc’s Landscaping (Everett) | Call then SMS | "Quick outreach — we help landscaping teams increase estimate requests from Yelp/Google traffic. 5-minute walkthrough today?" | 13:00–16:00 PT | No pickup → SMS; no reply by EOD → follow-up tomorrow 09:30 PT |
| 10 | wa-google-004 | Family Lawn Services (Everett) | SMS then call | "We built a lightweight booking flow for lawn-care operators that boosts booked calls fast. Want a short example?" | 13:30–16:30 PT | No reply in 60 min → call |
| 11 | nosite-004 | Northwest Landscape and Patio Bellevue | Call then SMS | "We can help you capture more quote requests from people already finding you on Yelp/maps. Want a fast teardown?" | 13:00–16:00 PT | No answer → SMS; no reply by tomorrow 10:00 PT → retry |
| 12 | nosite-005 | Envision Landscaping (Bellevue) | SMS then call | "You already have discovery demand — we can help convert it to booked jobs with a simple funnel + follow-up text flow." | 13:00–16:30 PT | No reply in 60 min → call |

---

## C) Tier 3 — Fill Remaining Capacity / Time-Zone Sweep (10–24 hours)

| Priority | Lead ID | Client | Channel | Message Snippet (first touch) | Send Window (local to lead) | Follow-up Trigger |
|---|---|---|---|---|---|---|
| 13 | nosite-061 | JV Pool Services (Dallas) | SMS then call | "Pool-service operators using our quick quote workflow usually see faster callback-to-book rates. Open to seeing it?" | 09:30–11:30 CT (next morning) | No reply in 60 min → call |
| 14 | nosite-084 | American Termite & Pest Elimination (Atlanta) | Call then SMS | "We help pest-control teams convert local demand into more scheduled inspections. Can I share a 2-min audit?" | 10:00–12:00 ET (next morning) | No answer → SMS; no reply by 15:00 ET → second attempt |
| 15 | nosite-085 | Bug Free Exterminating (Atlanta) | SMS then call | "Got a quick idea to increase booked pest inspections from your listing traffic this week. Want details?" | 10:30–12:30 ET (next morning) | No reply in 45 min → call |
| 16 | nosite-086 | CRC Services Termite & Pest Control (Atlanta) | Call then SMS | "We can tighten your lead response flow so inbound calls convert to paid jobs faster. 5-minute review?" | 11:00–13:00 ET (next morning) | No answer → SMS follow-up |
| 17 | nosite-087 | Contact Pest Control (Atlanta) | SMS then call | "We help local pest companies lift booked jobs via listing + text follow-up optimization. Interested in a quick test?" | 11:00–13:30 ET (next morning) | No reply in 60 min → call |
| 18 | wave3-106 | Picasso Painting (Milwaukee) | Call then SMS | "We help painting contractors turn profile traffic into quote requests with simple conversion upgrades. Quick chat?" | 10:00–12:00 CT (next morning) | No answer → SMS; retry once at 15:00 CT |

---

## Message Framework (for all touches)
- **Opening:** proof of relevance (city/service + listing visibility)
- **Value claim:** more booked calls/quotes in 7 days (no heavy rebuild)
- **CTA:** 5-min walkthrough or text audit
- **Tone:** brief, local, no jargon, no long pitch

---

## Lightweight Execution Checklist

### Prep (10 min)
- [ ] Load this queue and mark owner for each touch.
- [ ] Confirm local timezone for each lead before send.
- [ ] Keep one SMS template per vertical (plumbing/roofing/landscaping/pest).

### Execute (primary block)
- [ ] Work Tier 1 top-to-bottom, complete both first-touch + first follow-up trigger.
- [ ] Log each touch outcome immediately (`contacted`, `left_voicemail`, `no_answer`, `replied`).
- [ ] Move warm replies to **proposal_sent** same day.

### Mid-cycle control
- [ ] At +4 hours, start Tier 2 for any open capacity.
- [ ] Re-attempt Tier 1 non-responders once in late afternoon local time.

### End-of-cycle handoff
- [ ] Queue Tier 3 for next-morning local send windows.
- [ ] Post concise KPI summary: sent / reached / replied / meetings booked.
- [ ] Flag numbers that bounce/invalid for data cleanup pass.

---

## Notes for Operator
- Focus only leads with direct phone/SMS paths in this 24h queue.
- Leads lacking direct channels stay in research/verification backlog; do not block send ops.
- If reply sentiment is positive, skip scripted follow-up and move directly to booking call.