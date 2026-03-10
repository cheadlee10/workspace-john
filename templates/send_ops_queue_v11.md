# Send Ops Queue v11 — Next 24 Hours
**Window:** Wed 2026-03-04 05:40 PST → Thu 2026-03-05 05:40 PST  
**Built from:** `leads.jsonl` (phone-reachable + status=`new`) and `jobs.jsonl` (proof point: Acme Co Excel Audit completed/paid $299 on 2026-03-02).

## Prioritization Logic (v11)
1. **Channel-ready first:** only leads with callable/SMS-capable numbers.
2. **Revenue-weighted:** higher estimated value and emergency/urgent service intent first.
3. **Freshness boost:** recent wave4/wave3 leads prioritized when reachable.
4. **Local-time compliance:** first touch in 9:00–11:30 AM lead local time.
5. **Two-touch cap (24h):** initial touch + one follow-up trigger only.

---

## Prioritized Outreach Queue (24h)

| Prio | Lead ID | Business | Est. Value | Channel | Message Snippet | Send Window (Lead Local) | Follow-up Trigger |
|---|---|---|---:|---|---|---|---|
| 1 | nosite-068 | Quality Construction & Roofing (Houston, TX) | $1500 | Call → SMS | “Quick win idea: tighten your estimate intake so storm/emergency roofing calls turn into booked jobs faster. Open to a 1-page draft?” | 9:00–9:45 AM CT | No pickup: VM + SMS in 10 min. No response by 2:30 PM CT: final bump. |
| 2 | nosite-037 | Regal Roofing & Contracting (Seattle, WA) | $1500 | Call → SMS | “I help roofing teams convert listing traffic into booked estimates with a cleaner mobile-first quote flow. Want a fast mockup?” | 9:00–9:45 AM PT | No answer: VM + SMS in 10 min. No response by 3:00 PM PT: final CTA. |
| 3 | wa-google-002 | PMC General Contractor (Bellevue, WA) | $1200 | Call → SMS | “I can map a simple bid-request workflow to capture more qualified remodel leads from your current listing traffic. Worth a quick look?” | 9:15–10:00 AM PT | No pickup: SMS in 10 min. No reply by 3:00 PM PT: one follow-up. |
| 4 | wave4-044 | Millennium Plumbing Specialist (Sacramento, CA) | $700 | Call → SMS | “For 24-hour plumbing, a call-first intake flow usually lifts booked dispatches quickly. Want a tailored sample for Sacramento?” | 9:00–9:45 AM PT | No answer: VM + SMS in 10 min. No reply by 2:30 PM PT: final bump. |
| 5 | wave4-013 | Precision Plumbing (Austin, TX) | $500 | Call → SMS | “I help plumbers reduce missed high-intent calls with a tighter dispatch + quote flow. Open to a quick draft?” | 9:05–9:50 AM CT | Missed call: SMS in 10 min. No response by 2:00 PM CT: final CTA. |
| 6 | wave4-003 | Northwest Plumbing of Tennessee (Nashville, TN) | $500 | SMS → Call | “I can share a short workflow that helps convert urgent plumbing inquiries into booked jobs faster. Want the 1-page version?” | 9:10–10:00 AM CT | No SMS reply in 2.5h: one call attempt. |
| 7 | nosite-109 | San Diego Heating and Cooling (El Cajon, CA) | $900 | Call → SMS | “HVAC leads convert better when dispatch + quote steps are clear. I can send a quick conversion layout for your market.” | 10:00–10:45 AM PT | No pickup: SMS in 10 min. No response by 3:30 PM PT: final follow-up. |
| 8 | wa-google-005 | Environment West Landscape Services (Spokane, WA) | $1000 | Call → SMS | “I help landscaping companies turn directory views into booked estimates with a cleaner request/callback path. Want a sample?” | 9:00–9:45 AM PT | No answer: VM + SMS in 10 min. No response by 2:00 PM PT: one follow-up. |
| 9 | wa-google-001 | PNW Landscaping & Services (Seattle, WA) | $800 | SMS → Call | “I can send a fast mobile quote-flow concept to help landscaping leads call/request estimates more often.” | 10:00–10:45 AM PT | No SMS reply by 1:30 PM PT: one call attempt. |
| 10 | nosite-004 | Northwest Landscape and Patio Bellevue | $800 | Call → SMS | “Patio/landscape traffic usually converts better with a direct ‘book estimate’ path. I can draft one around your top services.” | 10:30–11:15 AM PT | No answer: SMS in 10 min. No response by EOD PT: hold for next AM block. |
| 11 | nosite-001 | Perez Landscaping (Seattle, WA) | $800 | SMS → Call | “I help landscaping crews get more estimate requests with a simple call/quote workflow. Want a quick example?” | 11:00–11:30 AM PT | No SMS response in 3h: one call attempt. |
| 12 | nosite-002 | Ligaya Landscaping (Seattle, WA) | $800 | SMS → Call | “Can I send a short idea to help convert more Yelp/listing traffic into booked landscaping estimates?” | 11:00–11:30 AM PT | No reply in 3h: one call attempt. |
| 13 | nosite-003 | Greenscapes Landscaping (Seattle, WA) | $800 | SMS → Call | “Quick idea: tighten estimate intake + callback timing to lift booked landscaping jobs. Want the 1-page draft?” | 11:15 AM–12:00 PM PT | No reply by 3:30 PM PT: one call attempt. |
| 14 | nosite-005 | Envision Landscaping (Bellevue, WA) | $800 | Call → SMS | “I can map a simple estimate-request flow to help your landscaping leads book faster from mobile.” | 11:30 AM–12:00 PM PT | No pickup: SMS in 10 min. No response by 4:00 PM PT: final bump. |
| 15 | nosite-101 | Cedar Fencing Plus (Portland, OR) | $800 | Call → SMS | “Fence buyers convert better with a direct estimate intake and quick callback loop. Want a same-day mockup?” | 9:00–9:45 AM PT (Thu retry slot if missed today) | No pickup: SMS in 10 min. No response by 1:30 PM PT: one follow-up. |
| 16 | nosite-102 | Austin's Custom Fencing (Portland, OR) | $800 | SMS → Call | “I can share a quick quote-flow concept to help your fence leads book faster from listing traffic.” | 9:45–10:30 AM PT (Thu retry slot if missed today) | No SMS response by 1:30 PM PT: one call attempt. |
| 17 | nosite-115 | Ace Fencing (Las Vegas, NV) | $800 | Call → SMS | “I help fencing teams convert inquiry traffic into booked estimates with a tighter intake path. Interested?” | 10:00–10:45 AM PT | No answer: VM + SMS in 10 min. No response by 2:30 PM PT: one follow-up. |
| 18 | nosite-116 | Bachman Lawn Care (Kansas City, MO) | $700 | SMS → Call | “I can send a short workflow to help convert more lawn-care inquiries into booked jobs.” | 9:15–10:00 AM CT | No SMS response in 2.5h: one call attempt. |

---

## Backup Bench (Activate if queue clears early)
- `nosite-084` American Termite & Pest Elimination — Atlanta — $550 — call/SMS
- `nosite-085` Bug Free Exterminating — Atlanta — $550 — call/SMS
- `nosite-086` CRC Services Termite & Pest Control — Atlanta — $550 — call/SMS
- `nosite-087` Contact Pest Control — Atlanta — $550 — call/SMS
- `wave3-180` Stat Plumbing — Columbus — $350 — call/SMS
- `wave3-010` Garman Plumbing — Raleigh — $350 — call/SMS

---

## Lightweight Execution Checklist

### 1) Pre-send (5–7 min)
- [ ] Confirm number format + timezone per lead before touch.
- [ ] Personalize first sentence with business name + service type.
- [ ] Keep first-touch SMS under ~85 words with one CTA.

### 2) Live execution
- [ ] Run by timezone blocks (ET/CT first, then PT).
- [ ] If call no-answer: leave 12–18 sec VM, send SMS within 10 minutes.
- [ ] Log every touch immediately in `leads.jsonl` notes/status.

### 3) Follow-up control
- [ ] Max 2 touches in this 24h window.
- [ ] Alternate channel on follow-up (Call→SMS or SMS→Call).
- [ ] Stop outreach once lead engages; move to active handling.

### 4) End-of-window closeout (5 min)
- [ ] Tally: attempted / reached / replied / interested.
- [ ] Promote warm responders to top of next queue.
- [ ] Carry non-responders with refreshed send windows for v12.
