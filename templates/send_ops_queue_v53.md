# Send Ops Queue v53 — Next 24 Hours

**Window built:** 2026-03-04 16:40 PST  
**Source context:** `leads.jsonl`, `jobs.jsonl` (`job_2026_03_02_001` completed/paid)  
**Goal:** Prioritize direct-reach, higher-ticket, and freshest leads for immediate outreach + tight follow-up.

## Prioritization Logic
1. **Reachability first**: phone/SMS-capable leads only in primary lane.
2. **Revenue potential second**: roofing/GC/plumbing before landscaping/handyman.
3. **Freshness third**: wave4 and recent imports ahead of older records.
4. **Local-time compliance**: send during business-friendly response windows.

---

## A) Primary Outreach Queue (Next 24h)

| Pri | Lead ID | Client | Channel | Message snippet | Send window (lead local time) | Follow-up trigger |
|---|---|---|---|---|---|---|
| 1 | wave4-013 | Precision Plumbing (Austin, TX) | **SMS → Call** | “I help plumbing shops turn Yelp traffic into booked jobs in 48h. Open to a quick 5-min walkthrough?” | **Today 5:00–6:30 PM CT** | No reply in 90 min → call once; if no connect, SMS bump tomorrow 9:15 AM CT |
| 2 | wave4-003 | Northwest Plumbing of Tennessee (Nashville) | **SMS → Call** | “Spotted quick conversion wins for your listing traffic. Want a free 2-minute audit screenshot?” | **Today 5:15–6:45 PM CT** | No reply by tomorrow 10:00 AM CT → proof-style follow-up |
| 3 | nosite-068 | Quality Construction & Roofing (Houston) | **Call → SMS** | “I help roofers capture missed estimate requests from listing traffic. Can I show a before/after?” | **Today 4:45–6:15 PM CT** | If no answer, SMS in 10 min; retry call tomorrow 9:30 AM CT |
| 4 | nosite-037 | Regal Roofing & Contracting (Seattle) | **Call → SMS** | “You likely have high-intent visitors not converting. I can fix that with a lightweight lead page this week.” | **Today 4:45–6:15 PM PT** | No response by tomorrow 10:00 AM PT → one follow-up SMS |
| 5 | wa-google-002 | PMC General Contractor (Bellevue) | **Call → SMS** | “I help GCs convert listing views into booked estimates without a full website rebuild. Open tomorrow?” | **Today 5:00–6:30 PM PT** | Voicemail/no answer → SMS; 2nd call tomorrow 9:45 AM PT |
| 6 | wa-google-001 | PNW Landscaping & Services (Seattle) | **SMS first** | “Quick win: plug your listing-to-quote conversion gap and lift booked calls fast. Want the 3-point plan?” | **Today 5:15–6:45 PM PT** | No reply by tomorrow 9:30 AM PT → short value bump |
| 7 | wa-google-003 | Joc’s Landscaping (Everett) | **Call + SMS** | “You’re visible already—next step is turning views into booked estimates. I can set that up fast.” | **Today 5:15–6:45 PM PT** | No pickup → SMS immediately; 2nd call tomorrow 10:15 AM PT |
| 8 | wa-google-004 | Family Lawn Services (Everett) | **SMS → Call** | “I help lawn teams convert Yelp/Google traffic into more quote requests with a simple funnel.” | **Today 5:30–7:00 PM PT** | No reply by tomorrow 11:00 AM PT → one call attempt |
| 9 | wa-google-006 | Keith's Lawn & Landscape (Spokane) | **Call first** | “You can close more jobs with an estimate funnel + fast callback flow. Worth a quick walkthrough?” | **Tomorrow 8:45–10:15 AM PT** | If voicemail, send CTA SMS within 10 min |
| 10 | wa-google-005 | Environment West Landscape Services (Spokane) | **Call first** | “Found 3 fast fixes between discovery and quote capture—want the 5-minute version?” | **Tomorrow 9:00–10:30 AM PT** | No connect after 2 attempts → move to nurture_14d |
| 11 | nosite-033 | A A Landscaping (Bothell) | **SMS → Call** | “Can I send a free 3-point plan to turn listing traffic into more booked estimates this week?” | **Tomorrow 9:30–11:00 AM PT** | No reply in 4h → one call attempt |
| 12 | nosite-023 | Handy-Den (Tacoma) | **Personalized SMS** | “Den — quick idea to convert local listing views into more handyman bookings this week. Want it?” | **Tomorrow 10:00–11:30 AM PT** | No response by EOD → final bump, then nurture_14d |

---

## B) Secondary Queue (Yelp request-quote fallback; no phone shown)

| Pri | Lead ID | Client | Channel | Message snippet | Send window | Follow-up trigger |
|---|---|---|---|---|---|---|
| S1 | wave4-020 | Metroplex Water Heater & Plumbing (Dallas) | Yelp request-quote | “Water-heater calls are high intent; I can help you capture and route them faster.” | Today 6:30–7:30 PM CT | No reply in 18h → one bump |
| S2 | wave4-021 | Phoenix 24 Hr Plumbing | Yelp request-quote | “24-hour demand needs instant capture. I can share a quick 3-step conversion fix.” | Today 6:00–7:00 PM MT | No reply by next day noon MT → enrich for direct phone |
| S3 | wave4-031 | River City Plumbing & Leak Repair (Jacksonville) | Yelp request-quote | “Leak-repair leads are urgent; I can help route and close more in real time.” | Today 6:00–7:00 PM ET | No reply in 18h → enrich then retry |
| S4 | wave4-033 | Mile High Emergency Plumbing (Denver) | Yelp request-quote | “Emergency plumbing traffic drops fast without response flow. Want a free mini audit?” | Today 6:00–7:00 PM MT | No reply by next-day noon MT → nurture queue |
| S5 | wave4-037 | Gateway City Plumbing Pros (St. Louis) | Yelp request-quote | “I can tighten listing-to-call conversion with a lightweight funnel in 48h.” | Today 6:00–7:00 PM CT | No response in 18h → one final bump |

---

## Lightweight Execution Checklist

- [ ] Execute **Primary queue top-to-bottom** before Secondary queue.
- [ ] Keep first-touch messages under ~250 chars with one CTA.
- [ ] Log every touch in `leads.jsonl` notes: timestamp, channel, outcome, next step.
- [ ] Positive response → set status `proposal_sent` and schedule call same-day/next-day.
- [ ] Hard no → set `lost` with reason.
- [ ] No response after trigger path → keep `contacted`, tag `nurture_14d`.
- [ ] Use recent paid proof point when needed: “recent client delivered + paid within 48h.”

## Reusable opener

> “Hey {{company}} — I help {{service}} businesses turn Yelp/Google traffic into booked estimates with a simple lead-capture setup (usually live in 48h). Want a quick free 2-minute audit?”

## Ops Notes
- The highest-probability conversions in this 24h window are **phone-reachable plumbing/roofing/GC**.
- `jobs.jsonl` shows one recent completed/paid job, usable as light social proof in follow-ups.
