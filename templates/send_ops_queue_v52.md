# Send Ops Queue v52 — Next 24 Hours

**Window built:** 2026-03-04 16:30 PST  
**Source context:** `leads.jsonl`, `jobs.jsonl` (`job_2026_03_02_001` completed/paid)  
**Goal:** Execute highest-probability outreach first (reachable phone/SMS leads, higher-ticket home services, freshest records).

## Prioritization Logic
1. **Direct channel available now** (call/SMS) first.
2. **Higher estimated value** next (roofing/GC/plumbing > landscaping/handyman).
3. **Freshness** (wave4/wave3 recent imports) as tie-breaker.
4. **Local-time sendability** (avoid off-hours) for better pickup/reply rates.

---

## A) Primary Outreach Queue (Next 24h)

| Pri | Lead ID | Client | Channel | Message snippet | Send window (lead local time) | Follow-up trigger |
|---|---|---|---|---|---|---|
| 1 | wave4-013 | Precision Plumbing (Austin, TX) | **SMS → Call** | “Quick one: I help plumbing companies convert Yelp traffic into booked calls in 48h. Open to a 5-min walkthrough?” | **Today 5:00–6:30 PM CT** | No reply in 90 min → 1 call attempt; if no connect, SMS bump tomorrow 9:15 AM CT |
| 2 | wave4-003 | Northwest Plumbing of Tennessee (Nashville) | **SMS → Call** | “Saw your listing footprint—easy wins to capture more quote calls fast. Want a free 2-min audit screenshot?” | **Today 5:15–6:45 PM CT** | No response by tomorrow 10:00 AM CT → send proof-style follow-up |
| 3 | nosite-068 | Quality Construction & Roofing (Houston) | **Call → SMS** | “I help roofers recover missed estimate requests from listing traffic. Can I show a fast before/after?” | **Today 4:45–6:15 PM CT** | If voicemail/no answer → SMS in 10 min; retry call tomorrow 9:30 AM CT |
| 4 | nosite-037 | Regal Roofing & Contracting (Seattle) | **Call → SMS** | “You likely have high-intent visitors not converting. I can patch that with a simple lead-capture page this week.” | **Today 4:45–6:15 PM PT** | If no response, send follow-up SMS tomorrow 10:00 AM PT |
| 5 | wa-google-002 | PMC General Contractor (Bellevue) | **Call → SMS** | “I help GCs turn listing traffic into booked estimates without a full website rebuild. 5 minutes tomorrow?” | **Today 5:00–6:30 PM PT** | VM + SMS if no pickup; 2nd call tomorrow 9:45 AM PT |
| 6 | wa-google-001 | PNW Landscaping & Services (Seattle) | **SMS first** | “Noticed a quick conversion gap in your local listing presence—want a free mini audit to get more estimate calls?” | **Today 5:15–6:45 PM PT** | No reply by tomorrow 9:30 AM PT → short value bump |
| 7 | wa-google-003 | Joc’s Landscaping (Everett) | **Call + SMS** | “You’re visible locally—now it’s about converting views to booked estimates. I can set that up in 48h.” | **Today 5:15–6:45 PM PT** | If no pickup, SMS immediately; 2nd call tomorrow 10:15 AM PT |
| 8 | wa-google-004 | Family Lawn Services (Everett) | **SMS → Call** | “I help lawn teams capture more quote requests from Yelp/Google traffic with a lightweight funnel.” | **Today 5:30–7:00 PM PT** | No reply by tomorrow 11:00 AM PT → 1 call attempt |
| 9 | wa-google-006 | Keith's Lawn & Landscape (Spokane) | **Call first** | “You can close more jobs with a simple estimate funnel + callback workflow. Open to a quick walkthrough?” | **Tomorrow 8:45–10:15 AM PT** | If voicemail, send CTA SMS within 10 min |
| 10 | wa-google-005 | Environment West Landscape Services (Spokane) | **Call first** | “I found a conversion gap between discovery and quote. Can share 3 fast fixes in 5 minutes.” | **Tomorrow 9:00–10:30 AM PT** | No connect after 2 attempts → move to nurture list |
| 11 | nosite-033 | A A Landscaping (Bothell) | **SMS** | “Can I send a free 3-point plan to turn listing traffic into more booked estimates?” | **Tomorrow 9:30–11:00 AM PT** | No reply in 4h → call once |
| 12 | nosite-023 | Handy-Den (Tacoma) | **Personalized SMS** | “Den — quick idea to help your Yelp/local traffic turn into more handyman bookings this week.” | **Tomorrow 10:00–11:30 AM PT** | No response by EOD → final bump, then nurture tag |

---

## B) Secondary Queue (No phone visible; Yelp message/request-quote lane)

| Pri | Lead ID | Client | Channel | Message snippet | Send window | Follow-up trigger |
|---|---|---|---|---|---|---|
| S1 | wave4-010 | Austin Plumbing | Yelp request-quote | “I can help convert urgent plumbing searches into booked calls with a simple rapid-response flow.” | Today 6:30–7:30 PM CT | No reply in 18h → one bump |
| S2 | wave4-020 | Metroplex Water Heater & Plumbing | Yelp request-quote | “Water-heater leads convert fast with right routing. I can share a 2-minute fix plan.” | Today 6:30–7:30 PM CT | No reply in 18h → enrich for direct phone |
| S3 | wave4-021 | Phoenix 24 Hr Plumbing | Yelp request-quote | “24-hour demand needs instant capture. I can set up a lightweight conversion flow quickly.” | Today 6:00–7:00 PM MT | No reply by next day noon MT → park to nurture |
| S4 | wave4-031 | River City Plumbing & Leak Repair | Yelp request-quote | “Leak-repair traffic is high intent; I can help route those calls faster.” | Today 6:00–7:00 PM ET | No response in 18h → enrich for direct contact |
| S5 | wave4-033 | Mile High Emergency Plumbing | Yelp request-quote | “Emergency plumbing loses leads fast without quick response flow—want a free 3-point audit?” | Today 6:00–7:00 PM MT | No reply by next-day noon MT → archive to nurture |

---

## Lightweight Execution Checklist

- [ ] Run **Primary Queue** in order before Secondary Queue.
- [ ] Keep first-touch SMS under ~250 chars with one CTA.
- [ ] Log each attempt in lead notes: timestamp, channel, result, next action.
- [ ] On any positive response: set status `proposal_sent` and book same-day/next-day call.
- [ ] On explicit rejection: set `lost` + reason.
- [ ] After final no-response trigger: keep `contacted` and tag `nurture_14d`.

## Reusable opener

> “Hey {{company}} — I help {{service}} businesses turn Yelp/Google traffic into booked estimates with a simple lead-capture setup (usually live in 48h). Want a quick free 2-minute audit?”

## Ops Notes
- The strongest immediate opportunities are the **phone-available plumbing/roofing/GC** records.
- `jobs.jsonl` has a recent paid completion (`job_2026_03_02_001`) that can be used as light social proof in follow-ups.