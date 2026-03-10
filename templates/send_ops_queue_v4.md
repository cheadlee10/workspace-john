# Send Ops Queue v4 — Next 24 Hours
**Window:** Wed 2026-03-04 04:30 PST → Thu 2026-03-05 04:30 PST  
**Source:** `leads.jsonl` + recent wave4 additions + phone-usable records

## Prioritization Logic (fast)
1. **Can contact now** (phone/SMS available)  
2. **Higher est. value** (>= $700 first, then $500+)  
3. **High-intent service** (plumbing/emergency, roofing, contractor)  
4. **Geography batching** to reduce context-switching

---

## Priority Outreach Queue (24h)

| Prio | Lead ID | Business | Est. Value | Primary Channel | Message Snippet (first touch) | Send Window | Follow-up Trigger |
|---|---|---|---:|---|---|---|---|
| 1 | nosite-068 | Quality Construction & Roofing (Houston) | $1500 | **SMS + Call** | “Quick note — saw your Yelp profile without a full website flow. I can launch a lead-capture page fast so roofing calls stop leaking. Want a 1-page mockup?” | **Today 9:05–10:15am CT** | If no reply in 4h: send proof-based bump (“I can mock this in 24h”). If no pickup: voicemail + SMS 15m later. |
| 2 | nosite-037 | Regal Roofing & Contracting (Seattle) | $1500 | **Call first, then SMS** | “You likely lose inbound roofing jobs without a clean web lead path. I can spin up a conversion page + form routing quickly. Open to seeing a draft?” | **Today 9:10–10:30am PT** | If call missed: SMS in 10–15m. If no response by tomorrow 9:30am PT: final nudge with CTA. |
| 3 | wa-google-002 | PMC General Contractor (Bellevue) | $1200 | **Call + SMS** | “Noticed your presence is directory-heavy; I can build a simple contractor site that turns searches into booked estimates. Want a preview?” | **Today 9:20–10:30am PT** | If no response by 2pm PT: short follow-up SMS with 1 concrete outcome (“booked estimate form”). |
| 4 | wa-google-005 | Environment West Landscape Services (Spokane) | $1000 | **SMS** | “You’ve already got local visibility — adding a conversion-focused site can turn that traffic into quote requests. Want a no-obligation draft?” | **Today 9:00–10:00am PT** | If no reply in 6h: send “can share a same-day mockup” follow-up. |
| 5 | nosite-004 | Northwest Landscape & Patio Bellevue | $800 | **SMS** | “You’re visible locally; a fast quote-request page can capture patio/landscape leads that Yelp misses. Open to a quick preview?” | **Today 10:15–11:00am PT** | If unread/no response by next morning: send brief social-proof follow-up. |
| 6 | wave4-044 | Millennium Plumbing Specialist (Sacramento) | $700 | **SMS + Call** | “Saw strong plumbing intent on your listing — I can put a conversion page live fast (call button + emergency form). Want to see a sample?” | **Today 9:05–10:15am PT** | If no answer: voicemail + SMS. If no response by 3pm PT: one-line bump. |
| 7 | wa-google-007 | The Honest Handyman & Hauling LLC (Vancouver) | $700 | **SMS** | “Handyman leads convert better with a simple services + booking page. I can draft one quickly for you. Want me to send a mockup?” | **Today 10:00–11:00am PT** | If no reply in 5h: follow-up with “before/after” value line. |
| 8 | nosite-109 | San Diego Heating and Cooling | $900 | **SMS** | “HVAC calls are high-intent; I can build a fast site flow that routes urgent service requests instantly. Want a draft?” | **Today 9:15–10:15am PT** | If no response by end of day: schedule 1 retry tomorrow 9:30am PT. |
| 9 | nosite-061 | JV Pool Services (Dallas) | $700 | **SMS** | “Pool service searches convert better with a clean quote funnel vs directory-only visibility. Want a quick homepage draft?” | **Today 9:10–10:00am CT** | No response in 4–6h: send short follow-up with single CTA. |
|10| wave4-013 | Precision Plumbing (Austin) | $500 | **SMS + Call** | “I help local plumbing teams capture more emergency + water-heater leads with a simple conversion-first site. Want a sample built for your brand?” | **Today 9:15–10:15am CT** | If no pickup: SMS in 10m. If no response by tomorrow 9:30am CT: final follow-up. |
|11| wave4-003 | Northwest Plumbing of Tennessee (Nashville) | $500 | **SMS** | “Quick idea: a focused plumbing landing page can turn Yelp traffic into booked jobs. Want me to mock one up today?” | **Today 9:00–10:00am CT** | If no response by 2pm CT: brief reminder + soft CTA. |
|12| nosite-101 | Cedar Fencing Plus (Portland) | $800 | **SMS** | “Fence projects are visual + trust-based; a clean site with quote form helps close better leads. Want a draft?” | **Today 9:30–10:30am PT** | No reply by tomorrow morning: one follow-up with specific outcome (“fewer price shoppers”). |
|13| nosite-102 | Austin’s Custom Fencing (Portland) | $800 | **SMS** | “If you want, I can create a one-page fence quote site mockup so inquiries stop depending on directory traffic only.” | **Today 10:30–11:15am PT** | If no response in 6h: send short nudge and close loop. |
|14| nosite-115 | Ace Fencing (Las Vegas) | $800 | **SMS** | “You could capture more install requests with a direct quote funnel instead of listing-only traffic. Open to a quick sample page?” | **Today 9:15–10:00am PT** | No response by EOD PT: one final follow-up next morning. |
|15| nosite-084 | American Termite & Pest Elimination (Atlanta) | $550 | **SMS** | “Pest leads convert fast with clear ‘Call Now + Same-Day Request’ pages. I can draft this quickly for you — want to see it?” | **Today 9:05–10:00am ET** | If no response by 1pm ET: one short reminder; stop after 2 touches. |

---

## Backup Queue (if capacity remains)
- `nosite-085` Bug Free Exterminating (Atlanta) — SMS
- `nosite-086` CRC Services Termite & Pest Control (Atlanta) — SMS
- `nosite-087` Contact Pest Control (Atlanta) — SMS
- `wave3-010` Garman Plumbing (Raleigh) — SMS
- `wave3-180` Stat Plumbing (Columbus) — SMS

---

## Lightweight Execution Checklist

### Pre-send (10 min)
- [ ] Confirm each number format + timezone from location
- [ ] Keep first touch under ~100 words, one CTA
- [ ] Remove pricing from first touch (per playbook)
- [ ] Personalize one line by service/location

### During send blocks
- [ ] Work in timezone batches (ET → CT → PT)
- [ ] Log each attempt immediately (`leads.jsonl` status note)
- [ ] For missed calls: voicemail then SMS within 15 min

### Follow-up control
- [ ] Trigger follow-up only if no reply in defined window
- [ ] Max 2 touches in 24h per lead
- [ ] If positive reply: move status to `contacted` and create next-action note

### End-of-window wrap
- [ ] Count: sent, replied, interested, not interested
- [ ] Flag top 5 warm leads for next-day priority
- [ ] Carry unresolved leads to next queue version with updated trigger state
