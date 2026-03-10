# OUTBOUND SEND QUEUE — Thursday March 5, 2026
*Generated: 07:50 PST | Status: READY TO EXECUTE*

---

## 📊 Queue Summary

| Metric | Value |
|--------|-------|
| **Total Leads** | 45 |
| **Channel** | SMS (Twilio) |
| **Est. Pipeline Value** | $30,247 |
| **Send Windows** | 09:00-11:00 PT, 13:00-14:00 PT |
| **Expected Response Rate** | 5-10% (2-5 replies) |
| **Target Conversations** | 3+ |

### Priority Distribution
| Priority | Count | Value Range | Description |
|----------|-------|-------------|-------------|
| P1-HIGH | 12 | $800-$1,500 | Spring-seasonal outdoor + high-ticket |
| P2-MED | 18 | $550-$900 | Service trades, moderate ticket |
| P3-STD | 15 | $250-$400 | Standard local service businesses |

---

## ⚠️ PRE-SEND CHECKLIST

- [ ] **Twilio Status:** Verify trial upgraded OR recipient numbers verified
- [ ] **SMS Templates:** Load from `playbooks/sms_templates.md`
- [ ] **QA Lint:** Run `python scripts/qa_email_lint.py` on message text
- [ ] **Tracking Sheet:** This file + update `leads.jsonl` status on send

---

## 🟢 WINDOW 1: 09:00-11:00 PT (Primary — Highest Response)

### Batch 1A: P1-HIGH PRIORITY (Spring Landscaping — Peak Season)
*Send 09:00-09:30 PT — Seattle/Bellevue area (local time match)*

| # | Lead ID | Business | Phone | Location | Est Value | Service | Contact |
|---|---------|----------|-------|----------|-----------|---------|---------|
| 1 | nosite-001 | Perez Landscaping | +12066029766 | Seattle, WA | $800 | Landscaping | — |
| 2 | nosite-002 | Ligaya Landscaping | +12063517402 | Seattle, WA | $800 | Landscaping | — |
| 3 | nosite-003 | Greenscapes Landscaping | +12068028186 | Seattle, WA | $800 | Landscaping | — |
| 4 | nosite-004 | NW Landscape & Patio | +14253904959 | Bellevue, WA | $800 | Landscaping | — |
| 5 | nosite-005 | Envision Landscaping | +12066798525 | Bellevue, WA | $800 | Landscaping | — |
| 6 | nosite-033 | A A Landscaping | +12062518199 | Bothell, WA | $800 | Landscaping | — |

**Batch 1A Total: 6 leads | $4,800 pipeline**

### Batch 1B: P1-HIGH PRIORITY (Roofing/Construction — High Ticket)
*Send 09:30-10:00 PT*

| # | Lead ID | Business | Phone | Location | Est Value | Service | Contact |
|---|---------|----------|-------|----------|-----------|---------|---------|
| 7 | nosite-037 | Regal Roofing & Contracting | +12067842689 | Seattle, WA | $1,500 | Roofing | — |
| 8 | nosite-068 | Quality Construction & Roofing | +18322826486 | Houston, TX | $1,500 | Roofing/GC | — |

**Batch 1B Total: 2 leads | $3,000 pipeline**

### Batch 1C: P1-HIGH PRIORITY (Fencing — Spring Season)
*Send 10:00-10:30 PT*

| # | Lead ID | Business | Phone | Location | Est Value | Service | Contact |
|---|---------|----------|-------|----------|-----------|---------|---------|
| 9 | nosite-101 | Cedar Fencing Plus | +15032446216 | Portland, OR | $800 | Fencing | — |
| 10 | nosite-102 | Austin's Custom Fencing | +15037626010 | Portland, OR | $800 | Fencing | — |
| 11 | nosite-115 | Ace Fencing | +17025688330 | Las Vegas, NV | $800 | Fencing | — |

**Batch 1C Total: 3 leads | $2,400 pipeline**

### Batch 1D: P1-HIGH PRIORITY (Phoenix Landscaping — Already warm season)
*Send 10:30-11:00 PT (10:30am MST in Phoenix)*

| # | Lead ID | Business | Phone | Location | Est Value | Service | Contact |
|---|---------|----------|-------|----------|-----------|---------|---------|
| 12 | nosite-049 | Valle Landscaping | +14808069550 | Phoenix, AZ | $800 | Landscaping | — |
| 13 | nosite-050 | Valley Landscaping | +16234864922 | Phoenix, AZ | $800 | Landscaping | — |
| 14 | nosite-052 | CC Landscaping | +16233249775 | Phoenix, AZ | $800 | Landscaping | — |
| 15 | nosite-053 | RB Landscaping Service | +14805408509 | Phoenix, AZ | $800 | Landscaping | — |

**Batch 1D Total: 4 leads | $3,200 pipeline**

---

## 🟡 WINDOW 2: 13:00-14:00 PT (Secondary — Post-Lunch)

### Batch 2A: P2-MEDIUM PRIORITY (Handyman Services)
*Send 13:00-13:20 PT*

| # | Lead ID | Business | Phone | Location | Est Value | Service | Contact |
|---|---------|----------|-------|----------|-----------|---------|---------|
| 16 | nosite-006 | Home-Crafters-Handyman | +12062356574 | Kirkland, WA | $600 | Handyman | — |
| 17 | nosite-007 | Half-Price Handyman | +14252698545 | Kirkland, WA | $600 | Handyman | — |
| 18 | nosite-023 | Handy-Den | +12532302928 | Tacoma, WA | $600 | Handyman | Den |
| 19 | nosite-055 | Tony Handyman Survives | +14807407144 | Phoenix, AZ | $600 | Handyman | Tony |
| 20 | nosite-056 | Rick The Handyman | +16022004521 | Phoenix, AZ | $600 | Handyman | Rick |
| 21 | nosite-057 | Manny Handyman Svcs | +14804508097 | Phoenix, AZ | $600 | Handyman | Manny |

**Batch 2A Total: 6 leads | $3,600 pipeline**

### Batch 2B: P2-MEDIUM PRIORITY (Pool/HVAC Services)
*Send 13:20-13:35 PT*

| # | Lead ID | Business | Phone | Location | Est Value | Service | Contact |
|---|---------|----------|-------|----------|-----------|---------|---------|
| 22 | nosite-061 | JV Pool Services | +12149294278 | Dallas, TX | $700 | Pool Service | — |
| 23 | nosite-109 | San Diego Heating & Cooling | +16194432665 | San Diego, CA | $900 | HVAC | — |
| 24 | nosite-116 | Bachman Lawn Care | +18165508823 | Kansas City, MO | $700 | Lawn Care | — |

**Batch 2B Total: 3 leads | $2,300 pipeline**

### Batch 2C: P2-MEDIUM PRIORITY (Pest Control — Atlanta)
*Send 13:35-13:50 PT (4:35pm ET — still business hours)*

| # | Lead ID | Business | Phone | Location | Est Value | Service | Contact |
|---|---------|----------|-------|----------|-----------|---------|---------|
| 25 | nosite-084 | American Termite & Pest | +14048745250 | Atlanta, GA | $550 | Pest Control | — |
| 26 | nosite-085 | Bug Free Exterminating | +17709202288 | Atlanta, GA | $550 | Pest Control | — |
| 27 | nosite-086 | CRC Services Termite | +17709737103 | Atlanta, GA | $550 | Pest Control | — |
| 28 | nosite-087 | Contact Pest Control | +17709090444 | Atlanta, GA | $550 | Pest Control | — |

**Batch 2C Total: 4 leads | $2,200 pipeline**

### Batch 2D: P2-MEDIUM PRIORITY (Cleaning/Detailing)
*Send 13:50-14:00 PT*

| # | Lead ID | Business | Phone | Location | Est Value | Service | Contact |
|---|---------|----------|-------|----------|-----------|---------|---------|
| 29 | nosite-008 | R & S Cleaning Services | +14257803018 | Redmond, WA | $500 | Cleaning | — |
| 30 | nosite-079 | New Image Mobile Auto Detailing | +14043419569 | Atlanta, GA | $600 | Auto Detail | — |

**Batch 2D Total: 2 leads | $1,100 pipeline**

---

## 🔵 OVERFLOW BATCH (Send if capacity allows, or queue for Friday)

### Batch 3: P3-STANDARD PRIORITY (Trades — Plumbing/Electrical/Flooring/Auto)

| # | Lead ID | Business | Phone | Location | Est Value | Service |
|---|---------|----------|-------|----------|-----------|---------|
| 31 | wave3-002 | Nash Auto Repair | +14143930200 | Milwaukee, WI | $299 | Auto Repair |
| 32 | wave3-004 | Sam & Dave's Auto Repair | +14142631993 | Milwaukee, WI | $299 | Auto Repair |
| 33 | wave3-006 | Garrico Plumbing | +19199108013 | Raleigh, NC | $350 | Plumbing |
| 34 | wave3-007 | Dazco Plumbing | +19197878256 | Raleigh, NC | $350 | Plumbing |
| 35 | wave3-010 | Garman Plumbing | +19198319898 | Raleigh, NC | $350 | Plumbing |
| 36 | wave3-016 | NM Flooring Specialist | +15054014695 | Albuquerque, NM | $400 | Flooring |
| 37 | wave3-023 | Sernas Flooring & Tile | +15054807659 | Albuquerque, NM | $400 | Flooring |
| 38 | wave3-029 | JC Auto Repair | +15208820150 | Tucson, AZ | $299 | Auto Repair |
| 39 | wave3-044 | MNR Auto Service | +19155439418 | El Paso, TX | $299 | Auto Repair |
| 40 | wave3-045 | Horizon Auto Center | +19158520069 | El Paso, TX | $299 | Auto Repair |
| 41 | wave3-047 | Electrical Solutions | +14057940200 | Oklahoma City, OK | $400 | Electrical |
| 42 | wave3-048 | Metro Electrical Contractors | +14052322535 | Oklahoma City, OK | $400 | Electrical |
| 43 | wave3-050 | The BBC Electric | +12167800808 | Cleveland, OH | $400 | Electrical |
| 44 | wave3-090 | Top Tree Service | +13144278699 | St. Louis, MO | $300 | Tree Service |
| 45 | wave3-106 | Picasso Painting | +14147959881 | Milwaukee, WI | $400 | Painting |

**Batch 3 Total: 15 leads | $5,245 pipeline**

---

## 📝 SMS MESSAGE TEMPLATES

### Template A: Landscaping/Outdoor (Spring Urgency)
```
Hey [NAME/there], this is John from NorthStar. Saw your [Yelp/Google] listing - busy season's here and you're losing jobs to competitors with websites. I built you a free preview site. Want me to send it? Takes 30 sec to look.
```
*Use for: Batches 1A, 1C, 1D, 2B (lawn care)*

### Template B: High-Ticket Trades (Roofing/Construction)
```
Hi, John from NorthStar. Noticed [BUSINESS] has great reviews but no website - that's costing you bigger jobs. Built you a professional site preview (free). Worth a quick look?
```
*Use for: Batch 1B*

### Template C: Handyman (Personal Touch)
```
Hey [NAME/there], John here. Found your handyman business on Yelp - no website means you're invisible to half the people searching. Made you a free site mockup. Want to see it?
```
*Use for: Batch 2A*

### Template D: Service Trades (General)
```
Hi, this is John from NorthStar. Saw [BUSINESS] on Yelp - you've got reviews but no website to capture new customers. I put together a free preview for you. Interested?
```
*Use for: Batches 2B, 2C, 2D, Batch 3*

---

## 📊 RESPONSE TRACKING LOG

### Instructions
After each send, update status. After each response, log immediately.

| Lead ID | Sent Time | Delivered | Response | Response Time | Outcome | Notes |
|---------|-----------|-----------|----------|---------------|---------|-------|
| | | ☐ | ☐ | | | |
| | | ☐ | ☐ | | | |
| | | ☐ | ☐ | | | |

### Outcome Codes
- **INT** = Interested (schedule follow-up)
- **REQ** = Requested more info
- **OPT** = Opted out / Not interested
- **WRG** = Wrong number
- **NR** = No response (after 48h)

---

## 🔄 FOLLOW-UP CADENCE (3-7-7)

| Touch | Timing | Action |
|-------|--------|--------|
| SMS #1 | Today (Day 0) | Initial outreach |
| SMS #2 | Monday Mar 9 (Day 3) | "Hey, just checking if you saw my message about the free site preview?" |
| SMS #3 | Thursday Mar 12 (Day 7) | "Last follow-up - the preview's ready whenever you want to see it. No pressure." |

---

## 📈 END-OF-DAY METRICS TO CAPTURE

- [ ] Total sent: ___
- [ ] Delivered: ___
- [ ] Responses: ___
- [ ] Response rate: ___%
- [ ] Interested leads: ___
- [ ] Opt-outs: ___
- [ ] Conversations started: ___

---

*Queue built by John | Subagent: watchdog-send-ops | 2026-03-05 07:50 PT*
