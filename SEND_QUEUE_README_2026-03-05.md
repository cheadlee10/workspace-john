# Send Queue — Thursday March 5, 2026

## Queue Summary

| Metric | Value |
|--------|-------|
| **Total Leads** | 48 |
| **Channel** | SMS (all leads phone-only) |
| **Batches** | 3 |
| **Pipeline Value** | ~$29,850 |
| **Queue File** | `send_queue_2026-03-05.jsonl` |

---

## Send Windows (Pacific Time)

| Window | Time (PT) | Batch | Lead Count | Rationale |
|--------|-----------|-------|------------|-----------|
| **Window 1** | 09:00-11:00 | Batch 1 (P1) | 10 | Peak open rate (44% per KNOWLEDGE.md) — High-value leads |
| **Window 2** | 13:00-14:00 | Batch 2 (P2) | 10 | Secondary peak — Named owners + regional mix |
| **Window 3** | 16:00-17:00 | Batch 3 (P3) | 28 | Volume tier — Trades and remaining pipeline |

---

## Priority Tiers

### Batch 1: P1_HIGH_VALUE (09:00-11:00 PT)
**Focus:** Highest-value leads (Roofing $1,500, HVAC $900, Landscaping $800)
**Geography:** Seattle/Bellevue/Bothell (local priority) + Houston

| ID | Business | Service | Location | Value | Phone |
|----|----------|---------|----------|-------|-------|
| nosite-037 | Regal Roofing & Contracting | Roofing | Seattle, WA | $1,500 | +12067842689 |
| nosite-068 | Quality Construction & Roofing | Roofing | Houston, TX | $1,500 | +18322826486 |
| nosite-109 | San Diego Heating and Cooling | HVAC | El Cajon, CA | $900 | +16194432665 |
| nosite-001 | Perez Landscaping | Landscaping | Seattle, WA | $800 | +12066029766 |
| nosite-002 | Ligaya Landscaping | Landscaping | Seattle, WA | $800 | +12063517402 |
| nosite-003 | Greenscapes Landscaping | Landscaping | Seattle, WA | $800 | +12068028186 |
| nosite-004 | Northwest Landscape & Patio | Landscaping | Bellevue, WA | $800 | +14253904959 |
| nosite-005 | Envision Landscaping | Landscaping | Bellevue, WA | $800 | +12066798525 |
| nosite-033 | A A Landscaping | Landscaping | Bothell, WA | $800 | +12062518199 |

**Batch 1 Value: $8,500**

---

### Batch 2: P2_NAMED_OWNER + P2_REGIONAL_MIX (13:00-14:00 PT)
**Focus:** Leads with owner names (personal touch) + regional expansion

| ID | Business | Service | Location | Value | Owner | Phone |
|----|----------|---------|----------|-------|-------|-------|
| nosite-023 | Handy-Den | Handyman | Tacoma, WA | $600 | **Den** | +12532302928 |
| nosite-055 | Tony Handyman Survives | Handyman | Phoenix, AZ | $600 | **Tony** | +14807407144 |
| nosite-056 | Rick The Handyman | Handyman | Phoenix, AZ | $600 | **Rick** | +16022004521 |
| nosite-057 | Manny Handyman Svcs | Handyman | Phoenix, AZ | $600 | **Manny** | +14804508097 |
| nosite-101 | Cedar Fencing Plus | Fencing | Portland, OR | $800 | — | +15032446216 |
| nosite-102 | Austin's Custom Fencing | Fencing | Portland, OR | $800 | — | +15037626010 |
| nosite-115 | Ace Fencing | Fencing | Las Vegas, NV | $800 | — | +17025688330 |
| nosite-049 | Valle Landscaping | Landscaping | Phoenix, AZ | $800 | — | +14808069550 |
| nosite-050 | Valley Landscaping | Landscaping | Phoenix, AZ | $800 | — | +16234864922 |

**Batch 2 Value: $6,400**

---

### Batch 3: P3_VOLUME_TIER (16:00-17:00 PT)
**Focus:** Remaining pipeline — Handyman, Cleaning, Auto, Pest Control, Trades

**28 leads across:** Kirkland, Redmond, Phoenix, Dallas, Kansas City, Atlanta, Milwaukee, Raleigh, Albuquerque, Tucson, El Paso, Oklahoma City, Cleveland, St. Louis

**Batch 3 Value: $14,950**

---

## Tracking Fields (Per Lead)

```json
{
  "status": "queued|sent|delivered|replied|converted|failed",
  "sent_at": "ISO timestamp when SMS dispatched",
  "response_at": "ISO timestamp of first reply",
  "response_type": "positive|negative|question|no_response",
  "notes": "Context for follow-up"
}
```

---

## SMS Template (Compliant with Playbook)

**First Touch — Plain text, <100 words, soft CTA:**

```
Hi [Name/there], this is John from NorthStar Synergy. I noticed [Business Name] doesn't have a website yet — I actually built you a free preview already.

76% of customers search online before calling. Want me to send the link?
```

**For Named Owners (Den, Tony, Rick, Manny):**

```
Hi [Owner Name], this is John. I saw your [Business Type] business on Yelp and built you a free website preview — looks great with your [X reviews/photos].

Want me to text you the link?
```

---

## Execution Checklist

- [ ] **08:45 PT** — Verify Twilio credits available
- [ ] **09:00 PT** — Send Batch 1 (10 leads)
- [ ] **09:30 PT** — Log sent_at timestamps in queue file
- [ ] **12:45 PT** — Prep Batch 2 personalization (owner names)
- [ ] **13:00 PT** — Send Batch 2 (10 leads)
- [ ] **15:45 PT** — Prep Batch 3
- [ ] **16:00 PT** — Send Batch 3 (28 leads)
- [ ] **18:00 PT** — Update response tracking, log to observations.md

---

## Response Logging

After each batch, update `send_queue_2026-03-05.jsonl` with:
1. `status: "sent"` + `sent_at` timestamp
2. On reply: `status: "replied"` + `response_at` + `response_type`
3. On conversion: `status: "converted"` + move to jobs.jsonl

**EOD Metrics to Report:**
- Total sent: X/48
- Delivery rate: X%
- Reply rate: X%
- Positive responses: X
- Follow-up queue for Day 3: X leads

---

## Follow-Up Cadence (Per KNOWLEDGE.md)

| Touch | Day | Action |
|-------|-----|--------|
| Initial | Day 0 (today) | First SMS |
| Follow-up 1 | Day 3 (Mar 8) | "Just checking in..." |
| Follow-up 2 | Day 10 (Mar 15) | Final value add |
| Breakup | Day 17 (Mar 22) | "Should I close your file?" |

---

**Queue ready for execution. Let's cook.**
