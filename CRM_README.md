# Sales CRM System — John's Pipeline Tracker

## Overview
Every pitch, every response, every dollar tracked automatically.

---

## Files

### 1. `sales-crm.csv` (Human-Readable Spreadsheet)
**Open in Excel/Google Sheets**

**Columns:**
- Date, Time
- Business Name, Contact Name, Phone, Email
- Source (Yelp/Google), Yelp Link
- Services
- Pitch Channel (Email/Phone/Text)
- Pitch Sent (full text)
- Response (what they said)
- Status (READY_TO_PITCH | CONTACTED | PROPOSAL_SENT | NEGOTIATING | CLOSED | LOST)
- Estimated Income (One-Time)
- Estimated Income (Monthly)
- Notes

**Usage:** Open in Excel, sort/filter, analyze conversion rates

### 2. `sales-crm-pitch-log.jsonl` (Machine-Readable Log)
**One JSON object per line**

**Fields:**
```json
{
  "date": "YYYY-MM-DD",
  "time": "HH:MM AM/PM",
  "business": "Business Name",
  "contact": "Contact Name",
  "phone": "(XXX) XXX-XXXX",
  "email": "email@example.com or PENDING",
  "source": "Yelp|Google",
  "yelp_url": "https://...",
  "website_built": "https://...",
  "services": ["Service 1", "Service 2"],
  "reviews": 155,
  "rating": 4.4,
  "pitch_channel": "EMAIL|PHONE|TEXT",
  "pitch_text": "Full pitch text",
  "response": "Their response",
  "status": "READY_TO_PITCH|CONTACTED|PROPOSAL_SENT|NEGOTIATING|CLOSED|LOST",
  "estimated_income_onetime": 250,
  "estimated_income_monthly": 10,
  "notes": "Additional context"
}
```

**Usage:** Cliff's dashboard can parse this, visualize pipeline, calculate revenue

---

## Automatic Logging

**Every time I:**
1. Find a target business → Log to CRM with status: READY_TO_PITCH
2. Send pitch (email/phone/text) → Update with pitch_text, pitch_channel, status: CONTACTED
3. Get response → Update with response text, new status
4. Close deal → Update status: CLOSED, record actual income
5. Lose deal → Update status: LOST, note why

**Both files stay in sync** (CSV for humans, JSONL for automation)

---

## Status Definitions

| Status | Meaning | Next Action |
|--------|---------|-------------|
| READY_TO_PITCH | Verified no website, site built, contact info ready | Send pitch |
| CONTACTED | Initial pitch sent, waiting for response | Follow up in 2-3 days |
| PROPOSAL_SENT | Sent detailed proposal/pricing | Follow up in 1-2 days |
| NEGOTIATING | Back-and-forth on price/terms | Close or walk |
| CLOSED | Deal signed, payment received | Deliver & collect testimonial |
| LOST | They declined or ghosted | Note reason, move on |

---

## Integration with Cliff's Dashboard

**For Cliff to add:**

1. **Pipeline View**
   - Parse `sales-crm-pitch-log.jsonl`
   - Show: READY_TO_PITCH (X leads) | CONTACTED (Y) | PROPOSAL_SENT (Z) | etc.
   - Visualize as funnel chart

2. **Revenue Projections**
   - Sum `estimated_income_onetime` for all READY_TO_PITCH + CONTACTED + PROPOSAL_SENT
   - Sum `estimated_income_monthly` × 12 for annual recurring
   - Show: "Pipeline Value: $X one-time + $Y/year recurring"

3. **Conversion Metrics**
   - % of CONTACTED → CLOSED
   - % of PROPOSAL_SENT → CLOSED
   - Avg time from CONTACTED → CLOSED
   - Avg deal size

4. **Activity Log**
   - Recent pitches (last 10)
   - Recent responses (last 10)
   - Next follow-ups due (sorted by date)

**Data sync:** John appends to JSONL → Cliff's dashboard auto-refreshes (check every 5 min or on page load)

---

## Example Usage

### Scenario: Just pitched Kevin

**Update CSV:**
```
2026-02-25,3:00 PM,Kevin's Yard Work,Kevin,(206) 369-3776,kevin@example.com,Yelp,https://...,EMAIL,Hey Kevin! I noticed you have 155 five-star reviews but no website...,PENDING,CONTACTED,$250,$10,Sent via email
```

**Update JSONL:**
```json
{"date":"2026-02-25","time":"3:00 PM","business":"Kevin's Yard Work","pitch_channel":"EMAIL","pitch_text":"Hey Kevin! I noticed you have 155 five-star reviews but no website...","status":"CONTACTED"}
```

### Scenario: Kevin replies "Interested"

**Update both files:**
- CSV: Add to Response column: "Interested. Asked about timeline."
- JSONL: `{"response":"Interested. Asked about timeline.","status":"PROPOSAL_SENT"}`

### Scenario: Kevin pays $250

**Update both files:**
- CSV: Status → CLOSED, Notes → "Paid 2026-02-26 via Venmo"
- JSONL: `{"status":"CLOSED","actual_income_onetime":250,"close_date":"2026-02-26","payment_method":"Venmo"}`

---

## Current Pipeline (As of 2026-02-25 3:00 PM)

| Business | Status | Est. Income | Notes |
|----------|--------|-------------|-------|
| Kevin's Yard Work | READY_TO_PITCH | $250 + $10/mo | Site built, ready to pitch |

**Total Pipeline Value:**
- One-time: $250
- Recurring: $10/month ($120/year)

**Next Action:** Pitch Kevin (email or phone)

---

## File Locations

```
C:\Users\chead\.openclaw\workspace-john\sales-crm.csv
C:\Users\chead\.openclaw\workspace-john\sales-crm-pitch-log.jsonl
```

**For Cliff:** Dashboard should read from `sales-crm-pitch-log.jsonl` (JSONL is easier to parse)

---

## Logging Template (For Future Pitches)

### When finding a new target:
```python
# Python example
import json
from datetime import datetime

lead = {
    "date": datetime.now().strftime("%Y-%m-%d"),
    "time": datetime.now().strftime("%I:%M %p"),
    "business": "ABC Landscaping",
    "contact": "Unknown",
    "phone": "(555) 123-4567",
    "email": "PENDING",
    "source": "Yelp",
    "yelp_url": "https://...",
    "website_built": "https://...",
    "services": ["Landscaping", "Hardscaping"],
    "reviews": 89,
    "rating": 4.2,
    "pitch_channel": "PENDING",
    "pitch_text": "PENDING",
    "response": "PENDING",
    "status": "READY_TO_PITCH",
    "estimated_income_onetime": 250,
    "estimated_income_monthly": 10,
    "notes": "NO website verified. Built site."
}

# Append to JSONL
with open('sales-crm-pitch-log.jsonl', 'a') as f:
    f.write(json.dumps(lead) + '\n')

# Append to CSV
with open('sales-crm.csv', 'a') as f:
    f.write(f"{lead['date']},{lead['time']},{lead['business']},...\n")
```

---

## Status: READY TO USE

✅ CSV created (open in Excel)  
✅ JSONL created (ready for Cliff's dashboard)  
✅ Kevin's Yard Work logged as first lead  
✅ Documentation complete  

**Next:** Coordinate with Cliff to integrate JSONL into dashboard.
