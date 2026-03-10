# Outbound Send Queue — Thu 2026-03-05 (PT)

## Ready-to-Execute Plan
- **Total queued:** 20
- **Primary channel mix:** SMS first (20/20), Call fallback same window if no reply in 10–15 min
- **Vertical mix:** Plumbing (8), Landscaping (6), Auto (4), Roofing (2), HVAC (1), Painting (1), Tree (1)
- **Priority weighting:**
  - **P1 (6):** High-intent plumbing leads with verified phones (best near-term close odds)
  - **P2 (6):** WA/Pacific local home-service leads (cleaner timezone + relevance)
  - **P3 (8):** National phone-verified fill batch for volume

## Send Windows (PT)
1. **06:55–07:35 PT** — ET plumbing block (Raleigh/Columbus)
2. **08:35–09:15 PT** — CT high-intent plumbing block (Nashville/Austin)
3. **09:05–09:50 PT** — WA landscaping block
4. **10:00–10:45 PT** — CT mixed-services block
5. **10:40–11:25 PT** — PT roofing/HVAC block

## Execution Rules
- Use **one SMS template per vertical** (short, plain text, ROI-first, no pricing on first touch).
- If no response in 10–15 min and during same window, place **single call attempt**.
- If no pickup: mark `response_status=no_answer`, add short call note, queue follow-up for **Day+3**.
- Follow-up cadence target: **Day 0 / Day 3 / Day 10**.

## Tracking Fields (already in CSV)
- `queue_id`, `run_date_pt`, `priority`, `batch`, `lead_id`
- `client`, `service`, `location`, `timezone`
- `channel_primary`, `channel_secondary`, `phone_normalized`
- `send_window_pt`, `template`
- `status`, `next_followup_pt`, `last_touch_pt`
- `response_status`, `response_notes`, `owner`

## File
- `outbound_send_queue_2026-03-05.csv`
