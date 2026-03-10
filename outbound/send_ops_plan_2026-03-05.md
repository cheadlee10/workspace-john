# Send Ops Queue — Thu 2026-03-05 (PT)

## Channel mix (today)
- **SMS-first:** 60%
- **Call-first:** 25%
- **Yelp DM:** 15%

## Send windows (PT)
- **Window A (Immediate): 10:05–11:00 PT** — High-ticket, same-time-zone speed-to-lead (WA/OR/CA/AZ/NV)
- **Window B (Midday): 11:30–12:30 PT** — TX/MT/CT leads (business-hours overlap)
- **Window C (Afternoon): 13:30–14:30 PT** — ET leads + second touches
- **Window D (Late push): 15:30–16:15 PT** — Yelp DM wave + no-response follow-up pings

## Prioritized batches

### Batch A — Priority P1 (Call + SMS, high-value)
1. nosite-037 — Regal Roofing & Contracting — Seattle — +12067842689
2. nosite-068 — Quality Construction & Roofing — Houston — +18322826486
3. nosite-109 — San Diego Heating and Cooling — El Cajon — +16194432665
4. nosite-005 — Envision Landscaping — Bellevue — +12066798525
5. nosite-004 — Northwest Landscape and Patio Bellevue — Bellevue — +14253904959
6. nosite-001 — Perez Landscaping — Seattle — +12066029766
7. nosite-002 — Ligaya Landscaping — Seattle — +12063517402
8. nosite-003 — Greenscapes Landscaping — Seattle — +12068028186

### Batch B — Priority P2 (SMS-first, call if no reply in 2h)
1. nosite-050 — Valley Landscaping — Phoenix — +16234864922
2. nosite-049 — Valle Landscaping — Phoenix — +14808069550
3. nosite-052 — CC Landscaping — Phoenix — +16233249775
4. nosite-053 — RB Landscaping Service — Phoenix — +14805408509
5. nosite-101 — Cedar Fencing Plus — Portland — +15032446216
6. nosite-102 — Austin's Custom Fencing — Portland — +15037626010
7. nosite-115 — Ace Fencing — Las Vegas — +17025688330
8. nosite-061 — JV Pool Services — Dallas — +12149294278

### Batch C — Priority P3 (Volume block, SMS-first)
1. nosite-023 — Handy-Den — Tacoma — +12532302928
2. nosite-007 — Half-Price Handyman — Kirkland — +14252698545
3. nosite-006 — Home-Crafters-Handyman — Kirkland — +12062356574
4. nosite-008 — R & S Cleaning Services — Redmond — +14257803018
5. nosite-085 — Bug Free Exterminating — Atlanta — +17709202288
6. nosite-084 — American Termite & Pest Elimination — Atlanta — +14048745250
7. nosite-087 — Contact Pest Control — Atlanta — +17709090444
8. nosite-086 — CRC Services Termite & Pest Control — Atlanta — +17709737103

### Batch D — Priority P2 (Yelp DM-only, no phone)
1. wave4-001 — Plumbers of Nashville — https://www.yelp.com/biz/plumbers-of-nashville-nashville
2. wave4-002 — Integrity Plumbing — https://www.yelp.com/biz/integrity-plumbing-nashville-2
3. wave4-004 — Buchi Plumbing — https://www.yelp.com/biz/buchi-plumbing-nashville
4. wave4-005 — East Nashville Plumbing — https://www.yelp.com/biz/east-nashville-plumbing-nashville
5. wave4-009 — Austin's Best Plumbing — https://www.yelp.com/biz/austins-best-plumbing-austin
6. wave4-010 — Austin Plumbing — https://www.yelp.com/biz/austin-plumbing-austin-4
7. wave4-017 — Dallas Emergency Plumbers — https://www.yelp.com/biz/dallas-emergency-plumbers-dallas
8. wave4-021 — Phoenix 24 Hr Plumbing — https://www.yelp.com/biz/phoenix-24-hr-plumbing-phoenix

## Templates
- **SMS-T1 (first touch):**
  "Hey {{first_name_or_business}}, quick one — I help local {{service}} companies capture more booked jobs from Yelp/Google with a simple web + lead follow-up setup. Can I send a 2-minute breakdown for {{business_name}}?"
- **CALL-T1 opener:**
  "Hi, is this the owner or manager for {{business_name}}? I’ll be brief — I noticed you’re getting demand from Yelp and wanted to share a quick way to convert more of those leads without adding headcount."
- **YELP-DM-T1:**
  "Hi {{business_name}} team — I work with local plumbing/home-service businesses to turn Yelp traffic into booked jobs (fast response automations + simple web presence). If helpful, I can send a 2-minute custom teardown for your listing."

## Follow-up rules (today)
- No reply after **2 hours**: send SMS follow-up T2
- No reply by **15:30 PT**: attempt 1 phone call (if number exists)
- No reply by end of day: set next touch for **Fri 09:30 PT**

## Tracking fields required
Use queue CSV columns exactly:
`queue_id,send_date_pt,priority,batch,lead_id,business_name,source,channel_primary,channel_secondary,phone,url,timezone_local,window_start_pt,window_end_pt,template_id,owner,status,attempt_count,last_attempt_pt,response_status,response_text,response_at_pt,next_followup_pt,notes`
