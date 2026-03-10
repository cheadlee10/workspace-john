# Send Ops Queue v6 — Next 24 Hours
**Window:** Wed 2026-03-04 04:50 PST → Thu 2026-03-05 04:50 PST  
**Source context:** `leads.jsonl` (phone-present, open leads) + `jobs.jsonl` (latest completed service: Excel Audit)

## Prioritization Logic (v6)
1. **Reachable now**: valid phone present (call/SMS executable)
2. **Higher value first**: est. value weighted above $900
3. **Urgency verticals**: roofing/HVAC/plumbing before general landscaping
4. **Proof alignment**: include one finance/bookkeeping automation lead tied to recent completed Excel Audit job
5. **Timezone batching**: CT first blocks, then PT/MT, with same-day follow-up windows

---

## Priority Outreach Queue (24h)

| Prio | Lead ID | Business | Est. Value | Primary Channel | Message Snippet (first touch) | Send Window | Follow-up Trigger |
|---|---|---|---:|---|---|---|---|
| 1 | nosite-037 | Regal Roofing & Contracting (Seattle) | $1500 | **Call → SMS** | “Quick win idea for Regal: a direct roof-repair quote page can convert emergency searches into booked calls. Want a 24h mockup?” | **Today 9:00–10:15am PT** | No pickup: voicemail + SMS in 10–15m. No reply by 2:30pm PT: 1 proof bump. |
| 2 | nosite-068 | Quality Construction & Roofing (Houston) | $1500 | **Call → SMS** | “You’re likely losing high-intent roofing leads without a dedicated quote page. I can send a same-day draft—open to a preview?” | **Today 9:00–10:00am CT** | Missed call: SMS in 10m. No response by 1:30pm CT: short nudge. |
| 3 | wa-google-002 | PMC General Contractor (Bellevue) | $1200 | **Call** | “I can help turn local searches into estimate requests with a simple contractor conversion page. Want to see a fast draft?” | **Today 10:00–11:15am PT** | No answer: retry 3:30–4:15pm PT. |
| 4 | wa-google-005 | Environment West Landscape Services (Spokane) | $1000 | **Call → SMS** | “You already have visibility; adding a quote-focused page can increase booked landscaping jobs. Want a no-obligation sample?” | **Today 9:30–10:30am PT** | No response in 4h: one concise SMS follow-up. |
| 5 | nosite-109 | San Diego Heating and Cooling | $900 | **Call → SMS** | “HVAC calls are high-intent—adding call-now + form routing can stop urgent jobs leaking to competitors. Want a quick preview?” | **Today 9:10–10:10am PT** | Missed call: SMS in 10m. No response by 3pm PT: final same-day nudge. |
| 6 | sprint11-025 | Dallas Tax and Books | $900 | **SMS → Call** | “I just wrapped an Excel Audit project; we can automate recurring tax/bookkeeping reporting so you save manual hours weekly. Open to a 15-min fit check?” | **Today 10:15–11:15am CT** | No SMS reply in 2h: call once. No response by EOD CT: send one ROI-focused follow-up. |
| 7 | nosite-001 | Perez Landscaping | $800 | **SMS** | “A simple 1-page quote funnel can convert more landscaping inquiries than directory-only traffic. Want a personalized draft?” | **Today 11:00–11:45am PT** | No response by tomorrow 9:30am PT: final nudge then pause. |
| 8 | nosite-004 | Northwest Landscape and Patio Bellevue | $800 | **SMS + Call** | “You can capture more patio/landscape quote requests with a clean conversion page. Want me to mock one up?” | **Today 10:30–11:15am PT** | No reply in 4h: one follow-up call attempt. |
| 9 | nosite-002 | Ligaya Landscaping | $800 | **SMS** | “I help landscapers turn listing traffic into estimate requests with a lightweight quote page. Interested in a fast mockup?” | **Today 11:15am–12:00pm PT** | No response by late afternoon: one proof-based bump. |
| 10 | nosite-003 | Greenscapes Landscaping | $800 | **SMS** | “Can send a quick page concept that turns browse traffic into quote requests for Greenscapes. Want me to draft it?” | **Today 11:30am–12:15pm PT** | No reply in 6h: one concise follow-up. |
| 11 | nosite-101 | Cedar Fencing Plus (Portland) | $800 | **Call → SMS** | “Fence leads convert better with photos + direct quote form. Want a same-day sample page for Cedar Fencing Plus?” | **Today 9:45–10:30am PT** | No pickup: SMS in 10m; no response by 2pm PT: one nudge. |
| 12 | nosite-102 | Austin’s Custom Fencing (Portland) | $800 | **SMS** | “I can build a one-page fence quote flow so you’re not relying only on directories. Open to a quick preview?” | **Today 10:45–11:30am PT** | No reply by tomorrow 10am PT: final follow-up. |
| 13 | nosite-115 | Ace Fencing (Las Vegas) | $800 | **Call → SMS** | “A direct quote funnel can increase install requests without extra ad spend. Want a no-pressure mockup?” | **Today 9:15–10:00am PT** | No answer: SMS in 10m. No response by EOD PT: one last nudge next morning. |
| 14 | nosite-061 | JV Pool Services (Dallas) | $700 | **Call → SMS** | “Pool-service leads close faster with a clear ‘book now’ + quote flow. Want me to send a sample draft?” | **Today 9:15–10:00am CT** | Missed call: SMS in 10m. No response in 4h: one CTA-only follow-up. |
| 15 | wave4-044 | Millennium Plumbing Specialist (Sacramento) | $700 | **Call → SMS** | “Plumbing intent is high; a call-first page can lift booked jobs quickly. Want a fast mockup built around your top services?” | **Today 9:05–10:00am PT** | No pickup: voicemail + SMS in 15m; final bump at 3pm PT. |

---

## Backup Queue (if capacity remains)
- `wa-google-001` PNW Landscaping & Services — call-first PT block
- `wa-google-003` Joc's Landscaping — call-first PT block
- `wa-google-006` Keith's Lawn & Landscape — call-first PT block
- `wa-google-007` The Honest Handyman & Hauling — call-first PT block
- `nosite-116` Bachman Lawn Care — SMS + call CT block
- `nosite-049` Valle Landscaping — SMS MT block
- `nosite-050` Valley Landscaping — SMS MT block

---

## Lightweight Execution Checklist

### 1) Pre-send QA (8–10 min)
- [ ] Confirm phone format + local timezone for each queued lead
- [ ] Keep first touch under ~90 words and 1 CTA
- [ ] Personalize with service + city in line 1
- [ ] No links or pricing in first touch

### 2) Send-block execution
- [ ] Run CT block first, then PT/MT
- [ ] Log each touch immediately in `leads.jsonl` notes/status
- [ ] Missed calls: voicemail + SMS within 15 minutes
- [ ] Cap touches at max 2 per lead in 24h

### 3) Follow-up control
- [ ] Trigger follow-up only after the defined expiry window
- [ ] Use channel swap for follow-up 1 (call↔SMS)
- [ ] If positive reply, mark as `contacted` and assign exact next step/time

### 4) End-of-window wrap (5 min)
- [ ] Tally attempted / reached / replied / interested
- [ ] Promote top 5 warm leads into next queue version
- [ ] Roll unreached leads with updated trigger state and next send window
