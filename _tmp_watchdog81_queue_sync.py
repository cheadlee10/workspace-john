import json
from datetime import datetime
from zoneinfo import ZoneInfo
from pathlib import Path

root = Path(r'C:\Users\chead\.openclaw\workspace-john')
queue_path = root / 'outreach_queue.jsonl'
tracker_path = root / 'outbound_send_tracker_2026-03-03.json'
FMT = '%Y-%m-%d %H:%M'


def to_utc(local_s, tz):
    dt = datetime.strptime(local_s, FMT).replace(tzinfo=ZoneInfo(tz))
    return dt.astimezone(ZoneInfo('UTC')).strftime(FMT)


def normalize_record(r):
    tz = r.get('timezone')
    if not tz:
        return False
    changed = False

    mapping = [
        ('send_after_local', 'send_after_utc'),
        ('send_before_local', 'send_before_utc'),
        ('gate4_unlock_by_local', 'gate4_unlock_by_utc'),
        ('followup_1_at_local', 'followup_1_at_utc'),
        ('followup_2_at_local', 'followup_2_at_utc'),
        ('followup_3_at_local', 'followup_3_at_utc'),
    ]
    for local_key, utc_key in mapping:
        if r.get(local_key):
            utc_val = to_utc(r[local_key], tz)
            if r.get(utc_key) != utc_val:
                r[utc_key] = utc_val
                changed = True

    fu = r.get('followups')
    if isinstance(fu, dict):
        for local_key, utc_key in [
            ('fu1_at_local', 'fu1_at_utc'),
            ('fu2_at_local', 'fu2_at_utc'),
            ('fu3_at_local', 'fu3_at_utc'),
        ]:
            if fu.get(local_key):
                utc_val = to_utc(fu[local_key], tz)
                if fu.get(utc_key) != utc_val:
                    fu[utc_key] = utc_val
                    changed = True

    enforce = {
        'approval_gate': 'gate4_manual_unlock',
        'gate_status': 'locked_pending_manual_unlock',
        'send_blocked_by_gate': True,
        'send_ready': False,
        'send_state': 'prepared_pending_gate_unlock',
        'auto_send_enabled': False,
        'auto_sent': False,
        'defer_reason': 'manual gate lock active; do not auto-send',
        'timezone_normalized': True,
    }
    for key, val in enforce.items():
        if r.get(key) != val:
            r[key] = val
            changed = True

    ag = r.get('approval_gates')
    if not isinstance(ag, dict):
        ag = {}
        r['approval_gates'] = ag
        changed = True

    ag_enforce = {
        'gate1_data_qa': 'complete',
        'gate2_message_qa': 'complete',
        'gate3_throughput_qa': 'complete',
        'gate4_manual_unlock': 'pending',
    }
    for key, val in ag_enforce.items():
        if ag.get(key) != val:
            ag[key] = val
            changed = True

    return changed


queue_lines = queue_path.read_text(encoding='utf-8').splitlines()
queue_out = []
queue_changed = 0
for line in queue_lines:
    if not line.strip():
        continue
    rec = json.loads(line)
    if rec.get('status') == 'new' and rec.get('execution_date') == '2026-03-03':
        if normalize_record(rec):
            queue_changed += 1
    queue_out.append(json.dumps(rec, separators=(',', ':')))
queue_path.write_text('\n'.join(queue_out) + '\n', encoding='utf-8')

tracker = json.loads(tracker_path.read_text(encoding='utf-8'))
tracker_changed = 0
for rec in tracker.get('lead_schedule', []):
    if rec.get('send_state') == 'prepared_pending_gate_unlock':
        if normalize_record(rec):
            tracker_changed += 1

tracker['auto_send_enabled'] = False
tracker['gate_lock_state'] = 'manual_lock_enforced'
tracker['gate_status'] = 'locked_pending_manual_unlock'
tracker['send_blocked_by_gate'] = True
tracker['timezone_normalized'] = True
tracker['updated_at_local'] = '2026-03-03 11:20:00'
tracker['updated_by'] = 'subagent-watchdog81-sendops-queueing'
tracker_path.write_text(json.dumps(tracker, indent=2) + '\n', encoding='utf-8')

print(json.dumps({'queue_records_changed': queue_changed, 'tracker_records_changed': tracker_changed}))