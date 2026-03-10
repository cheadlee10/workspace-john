# Send Ops Queue — Thu 2026-03-05 (PT)

## Ready-to-Execute Summary
- **Total queued sends:** 48
- **Primary channel mix:** SMS 29 (60.4%), Platform DM 13 (27.1%), LinkedIn DM 6 (12.5%)
- **Primary objective:** book discovery calls + open white-label partner lanes
- **Queue file:** `send_ops/send_queue_2026-03-05.csv`

## Prioritized Batches (PT)
1. **Batch A (08:35–09:05) — HOT local SMB phone leads**
   - 6 sends, highest close intent, direct phone channels
2. **Batch B (09:10–09:45) — HIGH WA/PNW NOSITE phone leads**
   - 10 sends, same-day call booking push
3. **Batch C (10:00–10:40) — HIGH LinkedIn partner outreach**
   - 6 sends, overflow/partner channels for delivery capacity
4. **Batch D (11:10–11:50) — MED Fiverr/Upwork partner DMs**
   - 10 sends, white-label pipeline expansion
5. **Batch E (13:10–13:40) — MED national SMS (plumbing/roofing/fencing)**
   - 10 sends, 2nd best response window
6. **Batch F (14:05–14:35) — MED Reddit direct-response + partner DMs**
   - 6 sends, intent capture + collaboration

## Send Cadence Guardrails
- SMS pacing target: **1 message every 60–90 sec** (avoid burst/spam patterns)
- DM pacing target: **1 message every 2–3 min**
- Follow-up SLA: if no response, trigger the queued follow-up action at `next_step_due_pt`
- Quality gate before send: business name + service-specific pain point + one CTA

## Message Variant Key
- `SMB-OPS-01`: local service ops automation opener (dispatch/scheduling/profit dashboard)
- `SMB-OPS-02`: bookkeeping/close process workflow opener
- `NOSITE-01`: no-website/low-digital-presence opportunity opener + quick call CTA
- `LI-PARTNER-01/02`: LinkedIn partner/collab opener (referral + implementation split)
- `FV-WL-01/02`: Fiverr white-label partnership opener
- `UP-WL-01/02`: Upwork white-label/referral opener
- `TX-OPS-01/02`, `CA-OPS-01`, `PNW-OPS-01`: geo-tuned ops automation opener
- `RD-INTENT-01/02`: Reddit task-response opener with scope + turnaround framing
- `RD-PARTNER-01`: Reddit collaborator partnership opener

## Response Logging Fields (already in CSV)
- `status`, `sent_at_pt`, `response_at_pt`, `response_type`, `response_summary`
- `next_step_if_no_reply`, `next_step_due_pt`
- Keep `owner` fixed to `john` unless reassigned.

## Execution Order
Execute strictly by queue_id (`Q260305-001` → `Q260305-048`) to preserve pacing and window integrity.
