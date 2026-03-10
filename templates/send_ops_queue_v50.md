# Send Ops Queue v50 (Next 24 Hours)

**Prepared:** 2026-03-04 16:10 PST  
**Window Covered:** Next 24 hours (through 2026-03-05 16:10 PST)  
**Source Data:** `leads.jsonl`, `jobs.jsonl`

## Prioritization Logic
1. **Direct channel available now** (phone present; call/SMS possible)
2. **Higher estimated value** and urgent intent tags (emergency, leak, roof, plumbing)
3. **Recency** (wave4/wave5 first when contactable; then older contactable leads)
4. **Follow-up speed** (same-day 2nd touch)

---

## 24-Hour Outreach Queue (Prioritized)

| Pri | Lead ID | Client | Location | EV | Channel | Message Snippet (personalize + send) | Send Window (local) | Follow-up Trigger |
|---|---|---|---|---:|---|---|---|---|
| 1 | wave4-044 | Millennium Plumbing Specialist | Sacramento, CA | $700 | **SMS → Call** | "Hey [Name], quick one—noticed your Yelp presence could convert more emergency plumbing calls. I can set up a fast no-site lead capture + instant callback flow in 24h. Want a free 2-min teardown?" | **Today 4:30–6:30 PM PT** | If no reply in 90m: call once. If no answer: VM + SMS #2 tomorrow 9:00–10:30 AM PT |
| 2 | wave4-013 | Precision Plumbing | Austin, TX | $500 | **SMS → Call** | "Saw Precision Plumbing in Austin—if you want more booked jobs from urgent plumbing searches, I can set up a simple conversion funnel + follow-up automation fast. Open to a 10-min walk-through?" | **Today 6:00–7:30 PM CT** | If unread/no response in 2h: call. If still no answer: retry tomorrow 8:30–10:00 AM CT |
| 3 | wave4-003 | Northwest Plumbing of Tennessee | Nashville, TN | $500 | **SMS → Call** | "Noticed Northwest Plumbing of TN. We help plumbing teams capture missed calls + turn them into booked jobs (same day). Want a quick free audit?" | **Today 5:30–7:00 PM CT** | No response by next morning: call + voicemail; send proof-style SMS follow-up |
| 4 | nosite-004 | Northwest Landscape and Patio Bellevue | Bellevue, WA | $800 | **Call → SMS** | "I help local landscaping companies without strong web funnels turn inbound demand into booked estimates. Can show 2 quick wins for Bellevue in 10 minutes." | **Today 4:45–6:15 PM PT** | If no pickup: leave VM, send SMS immediately; retry tomorrow 9:00–11:00 AM PT |
| 5 | nosite-005 | Envision Landscaping | Bellevue, WA | $800 | **Call → SMS** | "Noticed Envision Landscaping has strong service opportunity—can help you capture more quote requests without adding ad spend. Open to a short call?" | **Today 5:00–6:30 PM PT** | If no connect: SMS + next-day morning call |
| 6 | nosite-001 | Perez Landscaping | Seattle, WA | $800 | **Call → SMS** | "I work with landscaping businesses to generate more booked estimates from local search and missed-call follow-up. Can I share a quick no-cost plan for Perez Landscaping?" | **Today 4:30–6:00 PM PT** | If no response in 3h: follow-up SMS with specific result hook |
| 7 | nosite-002 | Ligaya Landscaping | Seattle, WA | $800 | **Call → SMS** | "Saw your Yelp presence—there’s likely easy upside in converting calls/reviews into booked jobs. I can map a simple done-for-you setup in 10 min." | **Today 4:45–6:15 PM PT** | If no answer: VM + SMS, then next-day AM retry |
| 8 | nosite-003 | Greenscapes Landscaping | Seattle, WA | $800 | **Call → SMS** | "We help landscapers turn local visibility into consistent estimate requests using lightweight automation. Want a fast audit for Greenscapes?" | **Today 5:00–6:30 PM PT** | If no reply by tomorrow noon: one final bump SMS |
| 9 | nosite-037 | Regal Roofing & Contracting | Seattle, WA | $1,500 | **Call → SMS** | "Roofing leads are high value—if missed calls or slow follow-up are leaking revenue, we can patch that quickly with an automated callback/qualification flow." | **Today 5:15–6:45 PM PT** | If voicemail only: send SMS with ‘roof leak response’ angle + next-day retry |
| 10 | wa-google-002 | PMC General Contractor | Bellevue, WA | $1,200 | **Call → SMS** | "I help GCs increase booked estimate calls from existing traffic using fast response + qualification automation. Worth a 10-minute intro?" | **Today 4:30–6:00 PM PT** | If no connect: tomorrow 8:30–10:30 AM PT follow-up |
| 11 | wa-google-003 | Joc's Landscaping | Everett, WA | $750 | **Call → SMS** | "Joc’s could likely add bookings without extra ad spend—quick workflow setup for inbound leads + follow-up. Open to a quick chat?" | **Today 4:45–6:15 PM PT** | No response: send case-style SMS tomorrow morning |
| 12 | wa-google-004 | Family Lawn Services | Everett, WA | $700 | **Call → SMS** | "I help lawn care teams respond faster and convert more quote requests into booked work. Can show what this would look like for Family Lawn Services." | **Today 5:00–6:30 PM PT** | If no answer: VM, then retry tomorrow AM |
| 13 | wa-google-001 | PNW Landscaping & Services | Seattle, WA | $800 | **Call → SMS** | "Quick idea for PNW Landscaping—capture and convert more inbound quote requests with a simple response system. Worth 10 minutes?" | **Today 5:15–6:45 PM PT** | If no reply: follow-up SMS tomorrow 9:30 AM PT |
| 14 | nosite-023 | Handy-Den | Tacoma, WA | $600 | **SMS → Call** | "Den—noticed Handy-Den could likely win more jobs with faster lead response and a cleaner quote funnel. I can map this free in 10 min." | **Tomorrow 8:30–10:00 AM PT** | If no response in 2h: call |
| 15 | nosite-033 | A A Landscaping | Bothell, WA | $800 | **Call → SMS** | "I help local landscaping businesses increase booked estimates from current demand channels. Want a quick no-cost audit for A A Landscaping?" | **Tomorrow 9:00–11:00 AM PT** | If unanswered: VM + one final SMS by 1 PM PT |
| 16 | nosite-006 | Home-Crafters-Handyman | Kirkland, WA | $600 | **Call → SMS** | "Can help Home-Crafters capture and close more handyman leads with a lightweight follow-up system. Open to a quick run-through?" | **Tomorrow 9:30–11:30 AM PT** | If no response: send objection-handling SMS and close loop |
| 17 | nosite-007 | Half-Price Handyman | Kirkland, WA | $600 | **Call → SMS** | "For price-sensitive handyman leads, fast follow-up wins. I can implement a simple response + quote flow quickly. Want details?" | **Tomorrow 10:00–12:00 PM PT** | If no pickup: 1 retry call after 3h |
| 18 | nosite-008 | R & S Cleaning Services | Redmond, WA | $500 | **SMS → Call** | "I help cleaning services convert more inbound requests into recurring clients using quick-response automation. Open to a short intro?" | **Tomorrow 10:00–11:30 AM PT** | If no reply in 2h: call |
| 19 | nosite-061 | JV Pool Services | Dallas, TX | $700 | **SMS → Call** | "Noticed JV Pool Services—if calls/requests aren’t converting consistently, I can set up a simple follow-up system to increase booked jobs." | **Tomorrow 10:30 AM–12:00 PM CT** | No response: call once + VM |
| 20 | nosite-068 | Quality Construction & Roofing | Houston, TX | $1,500 | **Call → SMS** | "Roofing + construction leads are high value; we help teams capture missed opportunities with faster qualification and callback automation." | **Tomorrow 11:00 AM–12:30 PM CT** | If no answer: VM + SMS; final bump next business day |

---

## Hold/Research Bucket (Not in send queue yet)
- High-value but **no direct phone/email** currently (many wave4/wave5 leads).
- Action: enrich contacts before queuing (Google Business phone scrape + manual Yelp “Request a Quote” workflow).
- Example high-value holds: `wave5-063`, `wave5-064`, `wave4-100`, `wave5-031`, `wave5-032`.

---

## Lightweight Execution Checklist

### Before sending (10 min)
- [ ] Confirm Twilio sender and sending limits for non-verified recipients
- [ ] Open dialer + SMS templates
- [ ] Personalize 1 line per lead (city/service)
- [ ] Track all touches in lead notes

### During execution
- [ ] Run Priority 1–10 in first block (today PM)
- [ ] Run Priority 11–20 in second block (tomorrow AM/noon)
- [ ] For each lead: first touch + timestamp + outcome (replied/no reply/voicemail)
- [ ] Trigger follow-up exactly per queue rule

### After each touch
- [ ] Update `leads.jsonl` status (`contacted` if touched)
- [ ] Append note with channel + short outcome
- [ ] Flag hot replies for immediate manual call

### End of 24h block
- [ ] Summarize: sent count, connect rate, reply rate, meetings booked
- [ ] Move non-responders to next wave with new angle
- [ ] Promote responders to proposal pipeline
