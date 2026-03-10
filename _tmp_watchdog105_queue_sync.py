import json
from pathlib import Path
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo

POLICY = "fu1:+24h swap-channel, fu2:+72h call+vm|nudge, fu3:+7d breakup CTA SITE"
queue_path = Path('outreach_queue.jsonl')
tracker_path = Path('outbound_send_tracker_2026-03-03.json')

queue_rows=[json.loads(line) for line in queue_path.read_text(encoding='utf-8').splitlines() if line.strip()]
tracker=json.loads(tracker_path.read_text(encoding='utf-8'))

newest=[]
seen=set()
for row in reversed(queue_rows):
    lid=row.get('id')
    if not lid or lid in seen:
        continue
    seen.add(lid)
    newest.append(lid)
    if len(newest)>=20:
        break
newest=list(reversed(newest))
newest_set=set(newest)

sched=tracker.get('lead_schedule',[])
sched_map={e.get('lead_id'):e for e in sched if isinstance(e,dict) and e.get('lead_id')}

u_q=u_t=0
for row in queue_rows:
    lid=row.get('id')
    if lid not in newest_set:
        continue
    tzname=row.get('timezone') or 'America/Los_Angeles'
    tz=ZoneInfo(tzname)
    dt_local=datetime.strptime(row['send_after_local'],'%Y-%m-%d %H:%M').replace(tzinfo=tz)
    fu1=dt_local+timedelta(hours=24)
    fu2=dt_local+timedelta(hours=72)
    fu3=dt_local+timedelta(days=7)

    row['followup_1_at_local']=fu1.strftime('%Y-%m-%d %H:%M')
    row['followup_2_at_local']=fu2.strftime('%Y-%m-%d %H:%M')
    row['followup_3_at_local']=fu3.strftime('%Y-%m-%d %H:%M')
    row['followup_1_at_utc']=fu1.astimezone(ZoneInfo('UTC')).strftime('%Y-%m-%d %H:%M')
    row['followup_2_at_utc']=fu2.astimezone(ZoneInfo('UTC')).strftime('%Y-%m-%d %H:%M')
    row['followup_3_at_utc']=fu3.astimezone(ZoneInfo('UTC')).strftime('%Y-%m-%d %H:%M')

    row['approval_gate']='gate4_manual_unlock'
    row['gate_status']='locked_pending_manual_unlock'
    row['send_blocked_by_gate']=True
    row['send_ready']=False
    row['send_state']='prepared_pending_gate_unlock'
    row['auto_send_enabled']=False
    row['auto_sent']=False
    row['defer_reason']='manual gate lock active; do not auto-send'
    row['timezone_normalized']=True
    row['followups']={
        'fu1_at_local':row['followup_1_at_local'],
        'fu2_at_local':row['followup_2_at_local'],
        'fu3_at_local':row['followup_3_at_local'],
        'fu1_at_utc':row['followup_1_at_utc'],
        'fu2_at_utc':row['followup_2_at_utc'],
        'fu3_at_utc':row['followup_3_at_utc'],
        'policy':POLICY,
    }
    u_q+=1

    t=sched_map.get(lid)
    if t:
        t.update({
            'timezone': row.get('timezone'),
            'window_id': row.get('window_id'),
            'send_after_local': row.get('send_after_local'),
            'send_before_local': row.get('send_before_local'),
            'send_after_utc': row.get('send_after_utc'),
            'send_before_utc': row.get('send_before_utc'),
            'gate4_unlock_by_local': row.get('gate4_unlock_by_local'),
            'gate4_unlock_by_utc': row.get('gate4_unlock_by_utc'),
            'approval_gate': row.get('approval_gate'),
            'gate_status': row.get('gate_status'),
            'send_blocked_by_gate': row.get('send_blocked_by_gate'),
            'send_ready': row.get('send_ready'),
            'send_state': row.get('send_state'),
            'auto_send_enabled': row.get('auto_send_enabled'),
            'auto_sent': row.get('auto_sent'),
            'defer_reason': row.get('defer_reason'),
            'prepared_at_local': row.get('prepared_at_local'),
            'followup_1_at_local': row.get('followup_1_at_local'),
            'followup_2_at_local': row.get('followup_2_at_local'),
            'followup_3_at_local': row.get('followup_3_at_local'),
            'followup_1_at_utc': row.get('followup_1_at_utc'),
            'followup_2_at_utc': row.get('followup_2_at_utc'),
            'followup_3_at_utc': row.get('followup_3_at_utc'),
            'followups': row.get('followups'),
            'timezone_normalized': True,
            'approval_gates': row.get('approval_gates'),
        })
        u_t+=1

queue_path.write_text('\n'.join(json.dumps(r,ensure_ascii=False) for r in queue_rows)+'\n',encoding='utf-8')
tracker['lead_schedule']=sched
tracker['gate_lock_state']='manual_lock_enforced'
tracker['auto_send_enabled']=False
tracker['gate_status']='locked_pending_manual_unlock'
tracker['send_blocked_by_gate']=True
tracker['timezone_normalized']=True
tracker['updated_by']='subagent-watchdog105-sendops-queueing'
tracker['updated_at_local']='2026-03-03 17:50:00'
tracker_path.write_text(json.dumps(tracker,indent=2)+'\n',encoding='utf-8')

print(json.dumps({'newest_ids':newest,'updated_queue_rows':u_q,'updated_tracker_rows':u_t}))
