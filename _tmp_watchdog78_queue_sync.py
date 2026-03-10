import json
from datetime import datetime, timedelta
from pathlib import Path

queue_path = Path('outreach_queue.jsonl')
tracker_path = Path('outbound_send_tracker_2026-03-03.json')
md_path = Path('outreach_queue_2026-03-03.md')

# Target newest queued block for this sprint
TARGET_IDS = [f'gpass-us-{i}' for i in range(502, 510)]


def parse_dt(s: str) -> datetime:
    return datetime.strptime(s, '%Y-%m-%d %H:%M')


def fmt(dt: datetime) -> str:
    return dt.strftime('%Y-%m-%d %H:%M')

# ---- queue updates ----
lines = queue_path.read_text(encoding='utf-8-sig').splitlines()
queue_objs = []
for ln in lines:
    if not ln.strip():
        continue
    queue_objs.append(json.loads(ln))

q_by_id = {o.get('id'): o for o in queue_objs}

updated_ids = []
for lid in TARGET_IDS:
    o = q_by_id.get(lid)
    if not o:
        continue

    send_after_local = o.get('send_after_local')
    send_after_utc = o.get('send_after_utc')
    if not send_after_local or not send_after_utc:
        continue

    sal = parse_dt(send_after_local)
    sau = parse_dt(send_after_utc)

    o['approval_gate'] = 'gate4_manual_unlock'
    o['gate_status'] = 'locked_pending_manual_unlock'
    o['send_blocked_by_gate'] = True
    o['send_ready'] = False
    o['send_state'] = 'prepared_pending_gate_unlock'
    o['auto_send_enabled'] = False
    o['auto_sent'] = False
    o['defer_reason'] = 'manual gate lock active; do not auto-send'
    o['timezone_normalized'] = True

    # normalized follow-ups (+24h / +72h / +7d)
    fu1l = sal + timedelta(hours=24)
    fu2l = sal + timedelta(hours=72)
    fu3l = sal + timedelta(days=7)
    fu1u = sau + timedelta(hours=24)
    fu2u = sau + timedelta(hours=72)
    fu3u = sau + timedelta(days=7)

    o['followup_1_at_local'] = fmt(fu1l)
    o['followup_2_at_local'] = fmt(fu2l)
    o['followup_3_at_local'] = fmt(fu3l)
    o['followup_1_at_utc'] = fmt(fu1u)
    o['followup_2_at_utc'] = fmt(fu2u)
    o['followup_3_at_utc'] = fmt(fu3u)
    o['followups'] = {
        'fu1_at_local': fmt(fu1l),
        'fu2_at_local': fmt(fu2l),
        'fu3_at_local': fmt(fu3l),
        'fu1_at_utc': fmt(fu1u),
        'fu2_at_utc': fmt(fu2u),
        'fu3_at_utc': fmt(fu3u),
        'policy': 'fu1:+24h swap-channel, fu2:+72h call+vm|nudge, fu3:+7d breakup CTA SITE',
    }

    gates = o.get('approval_gates') or {}
    gates.setdefault('gate1_data_qa', 'complete')
    gates.setdefault('gate2_message_qa', 'complete')
    gates.setdefault('gate3_throughput_qa', 'complete')
    gates['gate4_manual_unlock'] = 'pending'
    o['approval_gates'] = gates

    updated_ids.append(lid)

queue_path.write_text('\n'.join(json.dumps(o, separators=(',', ':')) for o in queue_objs) + '\n', encoding='utf-8')

# ---- tracker updates ----
tracker = json.loads(tracker_path.read_text(encoding='utf-8-sig'))

lead_ids = tracker.get('lead_ids') or []
for lid in updated_ids:
    if lid not in lead_ids:
        lead_ids.append(lid)
tracker['lead_ids'] = lead_ids

schedule = tracker.get('lead_schedule') or []
sch_by_id = {s.get('lead_id'): s for s in schedule}

for lid in updated_ids:
    q = q_by_id[lid]
    s = sch_by_id.get(lid, {'lead_id': lid})
    for k in [
        'timezone', 'window_id', 'send_after_local', 'send_before_local', 'send_after_utc', 'send_before_utc',
        'gate4_unlock_by_local', 'gate4_unlock_by_utc', 'approval_gate', 'gate_status', 'send_blocked_by_gate',
        'send_ready', 'send_state', 'auto_send_enabled', 'auto_sent', 'defer_reason', 'prepared_at_local',
        'followup_1_at_local', 'followup_2_at_local', 'followup_3_at_local', 'followup_1_at_utc',
        'followup_2_at_utc', 'followup_3_at_utc', 'followups', 'timezone_normalized', 'approval_gates'
    ]:
        if k in q:
            s[k] = q[k]
    sch_by_id[lid] = s

# rebuild schedule preserving original order + append missing
ordered = []
seen = set()
for s in schedule:
    lid = s.get('lead_id')
    if lid in sch_by_id and lid not in seen:
        ordered.append(sch_by_id[lid])
        seen.add(lid)
for lid in updated_ids:
    if lid not in seen:
        ordered.append(sch_by_id[lid])
        seen.add(lid)
tracker['lead_schedule'] = ordered

# window membership + counts
wmap = {w.get('id'): w for w in tracker.get('windows', [])}
for lid in updated_ids:
    wid = q_by_id[lid].get('window_id')
    if wid and wid in wmap:
        arr = wmap[wid].setdefault('lead_ids', [])
        if lid not in arr:
            arr.append(lid)
for w in tracker.get('windows', []):
    w['lead_count'] = len(w.get('lead_ids', []))

# top-level posture
tracker['status'] = 'prepared_pending_manual_unlock'
tracker['gate_lock_state'] = 'manual_lock_enforced'
tracker['auto_send_enabled'] = False
tracker['gate_status'] = 'locked_pending_manual_unlock'
tracker['send_blocked_by_gate'] = True
tracker['first_touches_planned'] = len(tracker.get('lead_schedule', []))
tracker['prepared_not_sent_count'] = len(tracker.get('lead_schedule', []))
tracker['timezone_normalized'] = True
tracker['updated_at_local'] = '2026-03-03 10:50:00'
tracker['updated_by'] = 'subagent-watchdog78-sendops-queueing'

tracker_path.write_text(json.dumps(tracker, indent=4) + '\n', encoding='utf-8')

# ---- snapshot note ----
note = """

## Watchdog78 refresh (10:50 PST)
Executed send-ops queue/tracker normalization for newest queued leads `gpass-us-502..509`.
- Re-synced tracker schedule + window membership from queue source-of-truth for latest queued block
- Re-enforced manual gate lock posture and send suppression (`approval_gate=gate4_manual_unlock`, `send_ready=false`, `send_blocked_by_gate=true`)
- Recomputed +24h / +72h / +7d follow-up timestamps (local + UTC) and confirmed `auto_send_enabled=false`, `auto_sent=false`
- Refreshed tracker metadata to `updated_by=subagent-watchdog78-sendops-queueing` at `2026-03-03 10:50:00`
"""
md_path.write_text(md_path.read_text(encoding='utf-8') + note, encoding='utf-8')

print('updated_ids', updated_ids)
print('lead_ids_count', len(tracker.get('lead_ids', [])))
print('lead_schedule_count', len(tracker.get('lead_schedule', [])))
