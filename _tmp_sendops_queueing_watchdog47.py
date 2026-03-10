import json
from pathlib import Path
from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo

POLICY = "fu1:+24h swap-channel, fu2:+72h call+vm|nudge, fu3:+7d breakup CTA SITE"

queue_path = Path('outreach_queue.jsonl')
tracker_path = Path('outbound_send_tracker_2026-03-03.json')

tracker = json.loads(tracker_path.read_text(encoding='utf-8'))
lead_ids = set(tracker.get('lead_ids', []))

lines = queue_path.read_text(encoding='utf-8').splitlines()
out_lines = []
updated_queue = 0

for line in lines:
    if not line.strip():
        continue
    o = json.loads(line)
    if o.get('id') in lead_ids:
        o['send_ready'] = False
        o['auto_sent'] = False
        o['auto_send_enabled'] = False
        o['send_state'] = 'prepared_pending_gate_unlock'
        o['gate_status'] = 'locked_pending_manual_unlock'
        o['send_blocked_by_gate'] = True
        o['approval_gate'] = 'gate4_manual_unlock'
        o['defer_reason'] = 'manual gate lock active; do not auto-send'
        o['timezone_normalized'] = True

        fu = o.get('followups') or {}
        fu.setdefault('fu1_at_local', o.get('followup_1_at_local'))
        fu.setdefault('fu2_at_local', o.get('followup_2_at_local'))
        fu.setdefault('fu3_at_local', o.get('followup_3_at_local'))
        fu.setdefault('fu1_at_utc', o.get('followup_1_at_utc'))
        fu.setdefault('fu2_at_utc', o.get('followup_2_at_utc'))
        fu.setdefault('fu3_at_utc', o.get('followup_3_at_utc'))
        fu['policy'] = POLICY
        o['followups'] = fu
        updated_queue += 1

    out_lines.append(json.dumps(o, ensure_ascii=False))

queue_path.write_text('\n'.join(out_lines) + '\n', encoding='utf-8')

updated_sched = 0
for e in tracker.get('lead_schedule', []):
    e['approval_gate'] = 'gate4_manual_unlock'
    e['gate_status'] = 'locked_pending_manual_unlock'
    e['send_blocked_by_gate'] = True
    e['send_ready'] = False
    e['send_state'] = 'prepared_pending_gate_unlock'
    e['auto_send_enabled'] = False
    e['auto_sent'] = False
    e['defer_reason'] = 'manual gate lock active; do not auto-send'
    e['timezone_normalized'] = True

    f = e.get('followups') or {}
    f.setdefault('fu1_at_local', e.get('followup_1_at_local'))
    f.setdefault('fu2_at_local', e.get('followup_2_at_local'))
    f.setdefault('fu3_at_local', e.get('followup_3_at_local'))
    f.setdefault('fu1_at_utc', e.get('followup_1_at_utc'))
    f.setdefault('fu2_at_utc', e.get('followup_2_at_utc'))
    f.setdefault('fu3_at_utc', e.get('followup_3_at_utc'))
    f['policy'] = POLICY
    e['followups'] = f
    updated_sched += 1

tracker['gate_lock_state'] = 'manual_lock_enforced'
tracker['auto_send_enabled'] = False
tracker['gate_status'] = 'locked_pending_manual_unlock'
tracker['send_blocked_by_gate'] = True
tracker['prepared_not_sent_count'] = len(tracker.get('lead_ids', []))
tracker['first_touches_planned'] = len(tracker.get('lead_ids', []))
tracker['timezone_normalized'] = True
tracker['updated_at_local'] = datetime.now(ZoneInfo('America/Los_Angeles')).strftime('%Y-%m-%d %H:%M:%S')
tracker['updated_by'] = 'subagent-watchdog47-sendops-queueing'

tracker_path.write_text(json.dumps(tracker, indent=2) + '\n', encoding='utf-8')
print(json.dumps({'updated_queue_records': updated_queue, 'updated_schedule_records': updated_sched, 'lead_count': len(tracker.get('lead_ids', []))}))
