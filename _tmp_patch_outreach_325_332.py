import json
from pathlib import Path
from datetime import datetime
from zoneinfo import ZoneInfo

path = Path('outreach_queue.jsonl')
lines = path.read_text(encoding='utf-8').splitlines()

TARGET_IDS = {f'gpass-us-{i}' for i in range(325, 333)}


def to_utc(local_dt: str, tz: str) -> str:
    dt = datetime.strptime(local_dt, '%Y-%m-%d %H:%M').replace(tzinfo=ZoneInfo(tz))
    return dt.astimezone(ZoneInfo('UTC')).strftime('%Y-%m-%d %H:%M')

out = []
updated = 0
for ln in lines:
    s = ln.strip()
    if not s:
        continue
    d = json.loads(s)
    if d.get('id') in TARGET_IDS:
        tz = d.get('timezone', 'America/New_York')
        is_p1 = d.get('priority_tier') == 'P1'
        window_id = 'Q1' if is_p1 else 'Q2'
        send_after_local = '2026-03-03 15:10'
        send_before_local = '2026-03-03 16:40'
        unlock_local = '2026-03-03 15:00'

        d['execution_date'] = '2026-03-03'
        d['window_id'] = window_id
        d['send_after_local'] = send_after_local
        d['send_before_local'] = send_before_local
        d['approval_gate'] = 'gate4_manual_unlock'
        d['approval_gates'] = {
            'gate1_data_qa': 'complete',
            'gate2_message_qa': 'complete',
            'gate3_throughput_qa': 'complete',
            'gate4_manual_unlock': 'pending'
        }
        d['gate4_unlock_by_local'] = unlock_local
        d['send_ready'] = False
        d['send_state'] = 'prepared_pending_gate_unlock'
        d['auto_sent'] = False
        d['prepared_at_local'] = '2026-03-02 21:50'
        d['defer_reason'] = 'manual gate lock active; do not auto-send'
        d['followups'] = {
            'fu1_at_local': '2026-03-04 15:10',
            'fu2_at_local': '2026-03-06 15:10',
            'fu3_at_local': '2026-03-10 15:10',
            'policy': 'fu1:+24h swap-channel, fu2:+72h call+vm|nudge, fu3:+7d breakup CTA SITE',
            'fu1_at_utc': to_utc('2026-03-04 15:10', tz),
            'fu2_at_utc': to_utc('2026-03-06 15:10', tz),
            'fu3_at_utc': to_utc('2026-03-10 15:10', tz),
        }
        d['gate_status'] = 'locked_pending_manual_unlock'
        d['send_blocked_by_gate'] = True
        d['auto_send_enabled'] = False
        d['send_after_utc'] = to_utc(send_after_local, tz)
        d['send_before_utc'] = to_utc(send_before_local, tz)
        d['gate4_unlock_by_utc'] = to_utc(unlock_local, tz)
        d['timezone_normalized'] = True
        updated += 1
    out.append(json.dumps(d, ensure_ascii=False))

path.write_text('\n'.join(out) + '\n', encoding='utf-8')
print('updated', updated)
