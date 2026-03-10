# Outbound Send Queue Plan — 2026-03-05 (PT)

## Ready-to-Execute Queue
- File: `send_ops/outbound_send_queue_2026-03-05.csv`
- Total queued: **24 leads**
- Priority split: **P1: 9**, **P2: 11**, **P3: 4**

## Channel Mix (today)
- **SMS-first:** 23/24 (95.8%)
- **Call-first:** 1/24 (4.2%)
- **Secondary channel (all):** Call follow-up for non-responders

## Send Windows (PT)
- **A1 (10:20–11:05 PT):** WA/OR high-value no-site + B2B
- **A2 (11:10–11:40 PT):** PT mid-tier no-site service businesses
- **B1 (11:45–12:20 PT):** TX high-ticket (property mgmt + roofing)
- **B2 (12:25–13:00 PT):** TX/TN plumbing & pool service
- **C1 (13:10–13:40 PT):** ET pest-control batch (same-day SMS, next-day call)
- **Late call test (16:20–16:50 PT):** 1 call-first plumbing lead

## Response Logging Fields Included
Each row includes fields for:
- `send_status`, `sent_at_pt`, `delivery_status`
- `response_received`, `response_at_pt`, `response_type`, `response_summary`
- `next_action`, `next_touch_due_pt`

## Operator Notes
- Queue is filtered to phone/SMS-usable leads only.
- All leads are marked `queued` and ready for manual or scripted execution.
- Follow-up calls are pre-scheduled in-row to remove decision lag during execution.