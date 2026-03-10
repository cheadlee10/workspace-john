# 📬 Send Queue Execution Guide — Thursday March 5, 2026

**Queue ID:** `sendops-2026-03-05`  
**Status:** ✅ READY FOR EXECUTION  
**Day Quality:** 🔥 OPTIMAL — Thursday is #2 best day for cold outreach (44% open rate 9-11am)

---

## 📊 Queue Summary

| Metric | Value |
|--------|-------|
| Total First-Touch | 40 leads |
| Email Sends | 15 |
| SMS Sends | 25 |
| Est. Pipeline Value | $34,900 |
| Expected Response Rate | 7-10% |
| Expected Replies | 3-4 |

---

## ⏰ Send Windows (All Times in PT)

### 🌅 Window AM1: 09:00-10:00 PT — "Morning Prime"
**Priority:** P1 High-Value  
**Channel:** Email-first  
**Lead Count:** 8 leads  
**Focus:** Roofing contractors ($1200-1500)

| # | Client | Service | Value | Channel | Send Time |
|---|--------|---------|-------|---------|-----------|
| 1 | Regal Roofing & Contracting | Roofing | $1,500 | SMS | 09:15 |
| 2 | Quality Construction & Roofing | Roofing | $1,500 | SMS | 10:15 CT |
| 3 | Lobo Roofing LLC | Roofing | $1,200 | EMAIL | 09:20 |
| 4 | Forever Roofing | Roofing | $1,200 | EMAIL | 09:30 |
| 5 | A Better Roofing Company | Roofing | $1,200 | EMAIL | 09:40 |
| 6 | Quality Pacific Roofing ⭐ | Roofing | $1,200 | EMAIL | 09:45 |
| 7 | Elite Metal Roofing LLC | Roofing | $1,200 | EMAIL | 09:50 |
| 8 | San Diego Heating and Cooling | HVAC | $900 | SMS | 09:55 |

---

### 🌤️ Window AM2: 10:00-11:00 PT — "Morning Secondary"
**Priority:** P2 Medium-Value  
**Channel:** Email + SMS mix  
**Lead Count:** 12 leads  
**Focus:** Landscaping, Fencing, Handyman ($750-900)

| # | Client | Service | Value | Channel | Send Time |
|---|--------|---------|-------|---------|-----------|
| 1 | Greenscape Landscaping of Spokane ⭐ | Landscaping | $850 | EMAIL | 10:00 |
| 2 | Handyman Rescue Team ⭐ | Handyman | $900 | EMAIL | 10:10 |
| 3 | Green Leaf Landscaping of WA | Landscaping | $800 | EMAIL | 10:20 |
| 4 | Fitzpatrick Fence & Rail | Fencing | $900 | EMAIL | 10:30 |
| 5 | A1 Handyman | Handyman | $700 | EMAIL | 10:40 MT |
| 6 | Boise Landscaping | Landscaping | $750 | EMAIL | 10:45 MT |
| 7 | Perez Landscaping | Landscaping | $800 | SMS | 10:50 |
| 8 | Ligaya Landscaping | Landscaping | $800 | SMS | 10:52 |
| 9 | Greenscapes Landscaping | Landscaping | $800 | SMS | 10:54 |
| 10 | NW Landscape & Patio | Landscaping | $800 | SMS | 10:56 |
| 11 | Envision Landscaping | Landscaping | $800 | SMS | 10:58 |
| 12 | A A Landscaping | Landscaping | $800 | SMS | 11:00 |

---

### 🌤️ Window PM1: 13:00-14:00 PT — "Afternoon Prime"
**Priority:** P3 SMS Batch  
**Channel:** SMS-only (phone-first leads)  
**Lead Count:** 10 leads  
**Focus:** Handyman, Cleaning, Pool ($500-800)

| # | Client | Contact | Service | Value | Send Time |
|---|--------|---------|---------|-------|-----------|
| 1 | Home-Crafters-Handyman | — | Handyman | $600 | 13:00 |
| 2 | Half-Price Handyman | — | Handyman | $600 | 13:05 |
| 3 | R & S Cleaning Services | — | Cleaning | $500 | 13:10 |
| 4 | Handy-Den | **Den** | Handyman | $600 | 13:15 |
| 5 | Valle Landscaping | — | Landscaping | $800 | 13:20 |
| 6 | Valley Landscaping | — | Landscaping | $800 | 13:25 |
| 7 | Tony Handyman | **Tony** | Handyman | $600 | 14:00 AZ |
| 8 | Rick The Handyman | **Rick** | Handyman | $600 | 14:05 AZ |
| 9 | Manny Handyman | **Manny** | Handyman | $600 | 14:10 AZ |
| 10 | JV Pool Services | — | Pool | $700 | 14:00 CT |

---

### 🌆 Window PM2: 15:00-16:00 PT — "Late Afternoon"
**Priority:** P4 Catch-Up  
**Channel:** SMS-only  
**Lead Count:** 10 leads  
**Focus:** Multi-geo catch-up (AZ, TX, WI, NC, OK)

| # | Client | Service | Value | TZ | Send Time |
|---|--------|---------|-------|-------|-----------|
| 1 | CC Landscaping | Landscaping | $800 | AZ | 15:00 |
| 2 | RB Landscaping | Landscaping | $800 | AZ | 15:05 |
| 3 | Cedar Fencing Plus | Fencing | $900 | PT | 15:10 |
| 4 | Austin's Custom Fencing | Fencing | $900 | PT | 15:15 |
| 5 | Ace Fencing | Fencing | $900 | PT | 15:20 |
| 6 | Nash Auto Repair | Auto | $800 | CT | 15:30 |
| 7 | Electrical Solutions | Electrical | $1,000 | CT | 15:45 |
| 8 | Bachman Lawn Care | Lawn | $700 | CT | 16:00 |
| 9 | Garrico Plumbing | Plumbing | $900 | ET | 16:00 |
| 10 | Dazco Plumbing | Plumbing | $900 | ET | 16:05 |

---

## 📱 Channel Routing

### Email Sends (15 total)
- **API:** Resend → john@northstarsynergy.com
- **Template:** First-touch cold email (<100 words, soft CTA)
- **QA:** Run `python scripts/qa_email_lint.py email.txt` before each send
- **Proof:** Log Message-ID for every send

### SMS Sends (25 total)
- **API:** Twilio (+1 425-600-2267)
- **Note:** Trial mode — only verified numbers
- **Template:** Short intro (160 chars max), soft CTA
- **Example:**
  ```
  Hi [Name], this is John from NorthStar. Noticed [Business] doesn't have a website yet. 
  We just built a demo for you — want me to send the link? No cost to look.
  ```

---

## ✅ Execution Checklist

```
[ ] Gate2: Run qa_email_lint.py on email templates
[ ] Gate4: Craig unlock or auto-proceed per STANDING_ORDERS Tier 2
[ ] 09:00 PT: Start AM1 window (P1 high-value)
[ ] 10:00 PT: Start AM2 window (P2 medium-value)
[ ] 13:00 PT: Start PM1 window (SMS batch)
[ ] 15:00 PT: Start PM2 window (catch-up)
[ ] Log all message_ids to response tracker
[ ] Update leads.jsonl with send status
[ ] 18:00 PT: Post EOD pipeline update in Discord #general
```

---

## 📈 Response Tracking

After each send, update the lead record with:

```json
{
  "sent_at": "2026-03-05T09:20:00-08:00",
  "message_id": "msg_abc123...",
  "channel_used": "email",
  "delivery_status": "delivered",
  "response_status": "pending"
}
```

### Response Outcomes
| Status | Next Action |
|--------|-------------|
| `opened` | Wait for reply, schedule fu1 if no reply in 24h |
| `replied_positive` | Move to `negotiating`, schedule call |
| `replied_negative` | Mark `lost`, log reason |
| `bounced` | Swap to SMS channel |
| `no_response_24h` | Send fu1 via SMS |

---

## 🔁 Follow-Up Schedule (Auto-Queue)

| Touchpoint | Timing | Channel | Action |
|------------|--------|---------|--------|
| FU1 | +24h | Swap (email→SMS) | Nudge if no response |
| FU2 | +72h | Call/VM | Direct call attempt |
| FU3 | +7d | Breakup email | Final CTA with demo link |

---

## 📊 Expected Outcomes

Based on KNOWLEDGE.md benchmarks:
- **Response rate:** 7-10% (3-4 replies from 40 sends)
- **Positive interest:** 30-50% of replies (~1-2 warm leads)
- **Meeting booked:** 10-20% conversion (~0-1 meetings)
- **Pipeline addition:** $2,000-5,000 potential MRR

---

## 📁 Files

- `queue_tracker.json` — Machine-readable queue with all lead details
- `EXECUTION_GUIDE.md` — This file
- `../leads.jsonl` — Master lead database
- `../jobs.jsonl` — Closed deals log

---

**Generated:** 2026-03-05 07:11 PT  
**By:** John (Sales Agent)  
**Next:** Execute AM1 window at 09:00 PT
