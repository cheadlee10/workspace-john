# Send Ops Queue — Thu 2026-03-05 (PT)
## Ready-to-Execute Runbook

**Generated:** Thu 2026-03-05 07:40 PT  
**Queue File:** `send_queue/2026-03-05/queue.jsonl`  
**Owner:** John

---

## Executive Summary
| Metric | Value |
|--------|-------|
| **Total Queued Sends** | 45 |
| **Email Sends** | 14 (31%) |
| **SMS Sends** | 31 (69%) |
| **Estimated Pipeline Value** | $35,850 |
| **Target Response Rate** | 5-7% (2-3 responses) |

---

## Batch Schedule (All Times PT)

### 🔴 BATCH P1: HIGH-VALUE (09:15–09:55 PT)
**8 sends | Priority 1 | Highest-intent leads**
| Time | Lead | Business | Location | Channel | Est Value |
|------|------|----------|----------|---------|-----------|
| 09:15 | nosite-037 | Regal Roofing & Contracting | Seattle, WA | SMS | $1,500 |
| 09:20 | gpass-pnw-208 | Lobo Roofing LLC | Tacoma, WA | Email | $1,200 |
| 09:30 | gpass-pnw-214 | Forever Roofing | Seattle, WA | Email | $1,200 |
| 09:40 | gpass-pnw-219 | A Better Roofing Company | Seattle, WA | Email | $1,200 |
| 09:45 | gpass-pnw-220 | Quality Pacific Roofing | Seattle, WA | Email | $1,200 |
| 09:50 | gpass-pnw-210 | Elite Metal Roofing LLC | Vancouver, WA | Email | $1,200 |
| 09:55 | nosite-109 | San Diego Heating and Cooling | San Diego, CA | SMS | $900 |

**Batch P1 Subtotal:** $8,400

### 🟠 BATCH P2: MEDIUM-VALUE (10:00–11:00 PT)
**12 sends | Priority 2 | Solid prospects with verified contact**
| Time | Lead | Business | Location | Channel | Est Value |
|------|------|----------|----------|---------|-----------|
| 10:00 | gpass-pnw-224 | Greenscape Landscaping of Spokane | Spokane, WA | Email | $850 |
| 10:10 | gpass-pnw-213 | Handyman Rescue Team | Seattle, WA | Email | $900 |
| 10:15 | nosite-068 | Quality Construction & Roofing | Houston, TX | SMS | $1,500 |
| 10:20 | gpass-pnw-207 | Green Leaf Landscaping | Battle Ground, WA | Email | $800 |
| 10:30 | gpass-pnw-209 | Fitzpatrick Fence & Rail | Portland, OR | Email | $900 |
| 10:40 | gpass-pnw-223 | A1 Handyman | Boise, ID | Email | $700 |
| 10:45 | gpass-pnw-211 | Boise Landscaping and Lawn Care | Boise, ID | Email | $750 |
| 10:50 | nosite-001 | Perez Landscaping | Seattle, WA | SMS | $800 |
| 10:52 | nosite-002 | Ligaya Landscaping | Seattle, WA | SMS | $800 |
| 10:54 | nosite-003 | Greenscapes Landscaping | Seattle, WA | SMS | $800 |
| 10:56 | nosite-004 | Northwest Landscape and Patio | Bellevue, WA | SMS | $800 |
| 10:58 | nosite-005 | Envision Landscaping | Bellevue, WA | SMS | $800 |
| 11:00 | nosite-033 | A A Landscaping | Bothell, WA | SMS | $800 |

**Batch P2 Subtotal:** $10,200

### 🟡 BATCH P3: SMS AFTERNOON (13:00–14:15 PT)
**11 sends | Priority 3 | Afternoon SMS window**
| Time | Lead | Business | Location | Channel | Est Value |
|------|------|----------|----------|---------|-----------|
| 13:00 | nosite-006 | Home-Crafters-Handyman | Kirkland, WA | SMS | $600 |
| 13:05 | nosite-007 | Half-Price Handyman | Kirkland, WA | SMS | $600 |
| 13:10 | nosite-008 | R & S Cleaning Services | Redmond, WA | SMS | $500 |
| 13:15 | nosite-023 | Handy-Den | Tacoma, WA | SMS | $600 |
| 13:20 | nosite-049 | Valle Landscaping | Phoenix, AZ | SMS | $800 |
| 13:25 | nosite-050 | Valley Landscaping | Phoenix, AZ | SMS | $800 |
| 14:00 | nosite-055 | Tony Handyman Survives | Phoenix, AZ | SMS | $600 |
| 14:05 | nosite-056 | Rick The Handyman | Phoenix, AZ | SMS | $600 |
| 14:10 | nosite-057 | Manny Handyman Svcs | Phoenix, AZ | SMS | $600 |
| 14:00 | nosite-061 | JV Pool Services | Dallas, TX | SMS | $700 |

**Batch P3 Subtotal:** $6,400

### 🟢 BATCH P4: LATE AFTERNOON (15:00–16:05 PT)
**14 sends | Priority 4 | End-of-day coverage**
| Time | Lead | Business | Location | Channel | Est Value |
|------|------|----------|----------|---------|-----------|
| 15:00 | nosite-052 | CC Landscaping | Phoenix, AZ | SMS | $800 |
| 15:05 | nosite-053 | RB Landscaping Service | Phoenix, AZ | SMS | $800 |
| 15:10 | nosite-101 | Cedar Fencing Plus | Portland, OR | SMS | $900 |
| 15:15 | nosite-102 | Austin's Custom Fencing | Portland, OR | SMS | $900 |
| 15:20 | nosite-115 | Ace Fencing | Las Vegas, NV | SMS | $900 |
| 15:30 | wave3-002 | Nash Auto Repair | Milwaukee, WI | SMS | $800 |
| 15:45 | wave3-047 | Electrical Solutions | Oklahoma City, OK | SMS | $1,000 |
| 16:00 | nosite-116 | Bachman Lawn Care | Kansas City, MO | SMS | $700 |
| 16:00 | wave3-006 | Garrico Plumbing | Raleigh, NC | SMS | $900 |
| 16:05 | wave3-007 | Dazco Plumbing | Raleigh, NC | SMS | $900 |

**Batch P4 Subtotal:** $8,600

---

## Channel Strategy

### Email (14 sends)
- **Template:** NOSITE-01 / PNW-OPS-01 based on lead type
- **Subject:** Personalized hook (use personalization_hook field)
- **CTA:** Soft ask — "Worth a quick chat?"
- **Pacing:** 1 email every 5-10 min (avoid spam triggers)
- **QA:** Run `qa_email_lint.py` before each send

### SMS (31 sends)
- **Pacing:** 1 SMS every 60-90 sec
- **Character Limit:** <160 chars
- **Template Format:**
  ```
  Hi [Name], saw [Business] on [Source]. We help [service] businesses get more leads without a big website. Interested in a free mockup? - NorthStar
  ```
- **Twilio Note:** Trial mode — verify numbers or upgrade account

---

## Send Windows (Optimal Response Times)

| Window | PT Time | Best For |
|--------|---------|----------|
| AM1 | 09:00-10:00 | Email opens, high-value leads |
| AM2 | 10:00-11:30 | Follow-up batch, email + SMS mix |
| PM1 | 13:00-14:30 | SMS primary (lunch break checks) |
| PM2 | 15:00-16:30 | End-of-day catches, voicemail preps |

---

## Tracking Fields (Per Send)

Each queue entry includes:
```json
{
  "status": "pending|sent|delivered|failed|responded",
  "sent_at": null,
  "message_id": null,
  "delivery_status": null,
  "response_status": null,
  "response_at": null,
  "response_summary": null,
  "next_step_if_no_reply": "fu1_24h_swap_channel",
  "next_step_due_pt": "2026-03-06 [send_time]"
}
```

### Response Logging Protocol
1. **On Send:** Update `status` → "sent", populate `sent_at`, `message_id`
2. **On Delivery:** Update `delivery_status` → "delivered|bounced|failed"
3. **On Response:** Update `response_status` → "replied|booked|declined|spam", add `response_summary`
4. **No Response by next_step_due_pt:** Trigger follow-up action

---

## Execution Checklist

### Pre-Send (Before 09:00 PT)
- [ ] Verify Twilio account active
- [ ] Verify SMTP credentials working
- [ ] Run `qa_email_lint.py` on first 5 email templates
- [ ] Review personalization hooks for accuracy

### During Send Windows
- [ ] Execute sends in queue_id order
- [ ] Log each send immediately
- [ ] Monitor for delivery failures
- [ ] Flag any bounces for removal

### Post-Send (After 17:00 PT)
- [ ] Update queue.jsonl with all send statuses
- [ ] Log response count to daily memory
- [ ] Identify any hot leads for immediate follow-up
- [ ] Queue follow-ups for non-responders (Day+3)

---

## Guardrails

### Rate Limits
- SMS: Max 1/min to avoid carrier flags
- Email: Max 10/hour from single address
- Total daily: <100 cold touches

### Quality Gates
- All emails pass QA lint (≥90%)
- No pricing in first touch
- Personalization verified for each send
- Links tested before send

### Compliance
- Include opt-out in SMS: "Reply STOP to opt out"
- Email footer with business address
- No deceptive subject lines
- Respect TCPA timing (8am-9pm local time)

---

## Quick Commands

```powershell
# View queue status
Get-Content "send_queue/2026-03-05/queue.jsonl" | ConvertFrom-Json | Group-Object status

# Count pending
(Get-Content "send_queue/2026-03-05/queue.jsonl" | ConvertFrom-Json | Where-Object { $_.status -eq "pending" }).Count

# Run QA lint
python scripts/qa_email_lint.py [email_file]
```

---

**Execute in order. Log everything. Revenue > cost.**
