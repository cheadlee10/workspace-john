# Send Ops Queue v5 — Next 24 Hours
**Window:** Wed 2026-03-04 04:40 PST → Thu 2026-03-05 04:40 PST  
**Source:** `leads.jsonl` (phone-usable + highest-value actionable leads)

## Prioritization Logic
1. Reachable now (phone/SMS present)
2. Higher deal size ($1500–$700 first)
3. Service urgency (roofing, plumbing, HVAC, contractor)
4. Batch by timezone to keep send velocity high

---

## Priority Outreach Queue (24h)

| Prio | Lead ID | Business | Est. Value | Primary Channel | Message Snippet (first touch) | Send Window | Follow-up Trigger |
|---|---|---|---:|---|---|---|---|
| 1 | nosite-037 | Regal Roofing & Contracting (Seattle) | $1500 | **Call → SMS** | “Quick idea: you can capture more roof-repair calls with a direct quote page instead of listing-only traffic. Want me to mock one up for Regal?” | **Today 9:05–10:15am PT** | Missed call: SMS in 10–15m. No reply in 4h: one proof bump (“can deliver mockup in 24h”). |
| 2 | nosite-068 | Quality Construction & Roofing (Houston) | $1500 | **Call → SMS** | “You’re likely losing high-intent roofing leads without a tight web funnel. I can build a conversion page fast. Open to a same-day preview?” | **Today 9:10–10:15am CT** | If no pickup: voicemail + SMS in 15m. If no response by 2pm CT: one-line follow-up. |
| 3 | wa-google-002 | PMC General Contractor (Bellevue) | $1200 | **Call + optional Yelp DM** | “Saw strong local presence; adding a simple contractor site can turn searches into booked estimates. Want a quick draft?” | **Today 10:00–11:00am PT** | No answer: retry once at 3:30pm PT. If still no response, queue next-day SMS/call. |
| 4 | wa-google-005 | Environment West Landscape Services (Spokane) | $1000 | **Call** | “You already have visibility; a quote-focused page can convert that into booked landscape jobs. Want to see a no-obligation mockup?” | **Today 9:30–10:30am PT** | No response in 5h: brief follow-up call attempt + short text if SMS-capable. |
| 5 | nosite-109 | San Diego Heating and Cooling | $900 | **Call → SMS** | “HVAC calls are high-intent. I can set up a fast page with call-now + service form routing so urgent jobs don’t leak. Want a sample?” | **Today 9:15–10:15am PT** | Missed call: SMS in 10m. No response by 3pm PT: one concise nudge. |
| 6 | nosite-004 | Northwest Landscape and Patio Bellevue | $800 | **SMS + Call** | “A simple quote-request page can capture patio/landscape leads beyond Yelp. Want me to send a quick mockup?” | **Today 10:15–11:00am PT** | No reply in 4–6h: short follow-up with one CTA only. |
| 7 | nosite-001 | Perez Landscaping | $800 | **SMS** | “You can convert more landscaping inquiries with a clean one-page quote funnel. Want a fast draft personalized to your service area?” | **Today 11:00–11:45am PT** | No response by next morning: one final nudge, then pause. |
| 8 | nosite-003 | Greenscapes Landscaping | $800 | **SMS** | “I help local landscapers turn listing traffic into quote requests with a simple high-conversion page. Open to a quick preview?” | **Today 11:15am–12:00pm PT** | No reply in 6h: send one proof-based follow-up. |
| 9 | nosite-101 | Cedar Fencing Plus (Portland) | $800 | **SMS + Call** | “Fence jobs close better with visual proof + direct quote form. I can mock a page for Cedar Fencing quickly—want to see it?” | **Today 9:30–10:30am PT** | If no response by 2pm PT: one follow-up with specific outcome (“fewer price-shop leads”). |
| 10 | nosite-102 | Austin’s Custom Fencing (Portland) | $800 | **SMS** | “I can build a one-page fence quote flow so inquiries don’t rely only on directories. Want a sample draft?” | **Today 10:30–11:15am PT** | No response by tomorrow 9:30am PT: final quick follow-up. |
| 11 | nosite-115 | Ace Fencing (Las Vegas) | $800 | **SMS + Call** | “A direct quote funnel could capture more install requests than listing-only traffic. Open to a same-day mockup?” | **Today 9:20–10:00am PT** | No pickup: SMS in 10m. No response by EOD: one final follow-up next morning. |
| 12 | nosite-061 | JV Pool Services (Dallas) | $700 | **SMS + Call** | “Pool-service leads convert better with a clear quote flow and ‘book now’ CTA. Want me to draft one for JV Pool Services?” | **Today 9:15–10:00am CT** | No response in 4h: short follow-up + one CTA. |
| 13 | wave4-044 | Millennium Plumbing Specialist (Sacramento) | $700 | **Call + SMS** | “You’ve got high-intent plumbing traffic—adding a call-first conversion page can raise booked jobs quickly. Want a sample page?” | **Today 9:05–10:00am PT** | No pickup: voicemail + SMS in 15m; one final bump at 3pm PT. |
| 14 | wa-google-007 | The Honest Handyman & Hauling LLC | $700 | **Call** | “Handyman leads convert better with simple services + quote flow. I can ship a draft fast. Want to review one?” | **Today 10:45–11:30am PT** | If no response by late afternoon: one retry call only. |
| 15 | wave4-013 | Precision Plumbing (Austin) | $500 | **Call + SMS** | “I help plumbing teams capture more emergency/water-heater jobs with a conversion-first page. Want a fast sample?” | **Today 9:00–9:45am CT** | No answer: SMS in 10m. No response by 1pm CT: one final follow-up. |

---

## Backup Queue (if capacity remains)
- `wave4-003` Northwest Plumbing of Tennessee (Nashville) — call-first
- `nosite-084` American Termite & Pest Elimination (Atlanta) — SMS/call
- `nosite-085` Bug Free Exterminating (Atlanta) — SMS/call
- `nosite-086` CRC Services Termite & Pest Control (Atlanta) — SMS/call
- `nosite-087` Contact Pest Control (Atlanta) — SMS/call
- `wa-google-001` PNW Landscaping & Services (Seattle) — call-first

---

## Lightweight Execution Checklist

### Pre-send (10 min)
- [ ] Confirm phone format + timezone per lead
- [ ] Keep first-touch under ~90 words with one CTA
- [ ] Personalize one line (service + city)
- [ ] Remove links/pricing from first touch

### During send blocks
- [ ] Run in timezone order (CT/ET first if in morning, then PT)
- [ ] Log every touch immediately in `leads.jsonl` notes/status
- [ ] For missed calls: voicemail + SMS within 15 minutes

### Follow-up control
- [ ] Trigger follow-up only when window expires and no reply
- [ ] Max 2 touches in 24h per lead
- [ ] Positive response → set status `contacted` + next action + timestamp

### End-of-window wrap
- [ ] Tally: attempted, reached, replied, interested
- [ ] Promote top 5 warm leads into tomorrow’s first block
- [ ] Roll unreached leads into v6 with updated trigger state
