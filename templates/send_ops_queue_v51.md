# Send Ops Queue v51 — Next 24 Hours

**Window built:** 2026-03-04 16:20 PST  
**Source context:** `leads.jsonl`, `jobs.jsonl` (`job_2026_03_02_001` completed), active project load check  
**Goal:** Prioritize near-term conversations most likely to convert into paid website/lead-capture work.

## Prioritization Rules Used
1. **Reachable now** (phone present / call+SMS possible) outranks no direct channel.
2. **Higher estimated value** outranks lower value.
3. **Fresher leads** (wave4 from 2026-03-03) outrank older waves when channel quality is equal.
4. **Home-service verticals** (plumbing/roofing/contractor) get priority due to urgency + higher ticket behavior.

---

## A) Primary Outreach Queue (execute in order)

| Pri | Lead ID | Client | Channel | Message snippet | Send window (local to lead) | Follow-up trigger |
|---|---|---|---|---|---|---|
| 1 | wave4-013 | Precision Plumbing (Austin) | **SMS then Call** | “Quick win: I help plumbing shops book more calls by fixing no-website gaps in 48h. Want a 2-min audit?” | **Today 4:45–6:15 PM CT** | If no reply in 2h → call once. If still no answer → SMS bump tomorrow 9:15 AM CT |
| 2 | wave4-003 | Northwest Plumbing of Tennessee | **SMS then Call** | “I found your Yelp listing and can set up a simple lead page + call capture fast. Open to a quick 5-min walkthrough?” | **Today 5:00–6:30 PM CT** | If no response by tomorrow 10:00 AM CT → second SMS with proof-style offer (“1 free lead-flow audit screenshot”) |
| 3 | nosite-068 | Quality Construction & Roofing (Houston) | **Call then SMS VM-drop** | “I work with roofing crews to capture missed quote requests from Yelp/Google traffic. Can I show a fast before/after?” | **Today 4:30–6:00 PM CT** | If voicemail/no connect → SMS immediately + retry call tomorrow 9:30 AM CT |
| 4 | nosite-037 | Regal Roofing & Contracting (Seattle) | **Call then SMS** | “You’re likely losing high-intent calls from unclaimed/low-conversion presence. I can patch that this week.” | **Today 4:30–6:00 PM PT** | If no response overnight → SMS follow-up tomorrow 10:00 AM PT |
| 5 | wa-google-002 | PMC General Contractor (Bellevue) | **Call then SMS** | “I help contractors turn listing traffic into booked estimates without a full rebuild. Can I show 2 quick fixes?” | **Today 4:45–6:15 PM PT** | If no answer, leave concise VM; SMS at +15 min; retry tomorrow 9:45 AM PT |
| 6 | wa-google-001 | PNW Landscaping & Services (Seattle) | **SMS** | “Noticed your local listing footprint—easy opportunity to convert more quote requests. Want a free mini audit?” | **Today 5:00–6:30 PM PT** | If unread/no reply by tomorrow 9:30 AM PT → send short case-style bump |
| 7 | wa-google-003 | Joc’s Landscaping (Everett) | **Call + SMS** | “You’re visible but under-converting. I can stand up a lightweight lead page + tracking in 48h.” | **Today 5:15–6:45 PM PT** | If no pickup → SMS immediately; second call tomorrow 10:15 AM PT |
| 8 | wa-google-004 | Family Lawn Services (Everett) | **SMS first** | “I help lawn companies capture more booked estimates from listing traffic—no long setup.” | **Today 5:15–6:45 PM PT** | If no reply by tomorrow 11:00 AM PT → call once |
| 9 | wa-google-006 | Keith’s Lawn & Landscape (Spokane) | **Call** | “You can close more inbound jobs with a simple estimate funnel + callback workflow. Open to 5 minutes?” | **Tomorrow 8:45–10:15 AM PT** | If voicemail → SMS within 10 min with direct CTA |
| 10 | wa-google-005 | Environment West Landscape Services (Spokane) | **Call** | “I spotted a conversion gap between discovery and quote request—can share fix plan quickly.” | **Tomorrow 9:00–10:30 AM PT** | If no connect after 2 attempts → park to nurture queue |
| 11 | nosite-033 | A A Landscaping (Bothell) | **SMS** | “Can I send you a free 3-point fix list to turn more calls from local listing traffic?” | **Tomorrow 9:30–11:00 AM PT** | If no response in 4h → call once |
| 12 | nosite-023 | Handy-Den (Tacoma) | **SMS (personalized)** | “Den—quick idea to get more handyman bookings from local search without a full website rebuild.” | **Tomorrow 10:00–11:30 AM PT** | If no reply by EOD → one final bump + archive if silent |

---

## B) Secondary Queue (Yelp URL but no phone — DM/request-quote lane)

Use these only after Primary queue sends are completed.

| Pri | Lead ID | Client | Channel | Message snippet | Send window | Follow-up trigger |
|---|---|---|---|---|---|---|
| S1 | wave4-010 | Austin Plumbing | Yelp message/request quote | “Saw your unclaimed presence; I can help convert local intent into booked calls quickly.” | Today 6:30–7:30 PM CT | If no response in 18h → one short Yelp bump |
| S2 | wave4-020 | Metroplex Water Heater & Plumbing | Yelp message/request quote | “You likely have high-intent water-heater traffic. I can build a fast conversion funnel in 48h.” | Today 6:30–7:30 PM CT | If no reply in 18h → move to enrichment for phone lookup |
| S3 | wave4-021 | Phoenix 24 Hr Plumbing | Yelp message/request quote | “24-hour plumbing demand converts best with instant-response flow; can share a rapid setup.” | Today 6:00–7:00 PM MT | If no response in 18h → one bump + park |
| S4 | wave4-031 | River City Plumbing & Leak Repair | Yelp message/request quote | “Leak-repair searches are urgent; I can help capture and route those calls immediately.” | Today 6:00–7:00 PM ET | If no response in 18h → enrich for direct phone |
| S5 | wave4-033 | Mile High Emergency Plumbing | Yelp message/request quote | “Emergency leads drop fast without conversion flow. Want a no-cost 3-point audit?” | Today 6:00–7:00 PM MT | If no reply by next day noon MT → archive to nurture |

---

## Lightweight Execution Checklist

- [ ] Work top-to-bottom in **Primary Queue** before any secondary tasks.
- [ ] For phone leads: send SMS first unless marked call-first; keep first touch under 280 chars.
- [ ] Log each touch immediately in lead notes (`contacted`, timestamp, channel, outcome).
- [ ] Trigger follow-up exactly as defined (no custom delays unless lead replies).
- [ ] If positive reply: move lead to `proposal_sent` and schedule same-day quote call.
- [ ] If hard no: mark `lost` with reason.
- [ ] If no response after final trigger: keep as `contacted` + tag `nurture_14d`.

## Fast Copy Block (Reusable opener)

> “Hey {{name/company}} — I help {{service}} businesses turn Yelp/Google traffic into booked estimates with a simple lead-capture setup (usually live in 48h). Want a quick free 2-minute audit screenshot?”

---

## Notes for next cycle
- Most wave4 leads are high intent but missing direct phone; enrichment pass will materially increase conversion.
- Completed paid job in `jobs.jsonl` can be used as social-proof anchor in follow-ups.
