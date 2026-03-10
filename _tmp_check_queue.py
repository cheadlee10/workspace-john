import json
from pathlib import Path
from datetime import datetime,timedelta

root=Path(r"C:/Users/chead/.openclaw/workspace-john")
q=root/'outreach_queue.jsonl'
t=root/'outbound_send_tracker_2026-03-03.json'
FMT='%Y-%m-%d %H:%M'

qrecs=[json.loads(l) for l in q.read_text(encoding='utf-8').splitlines() if l.strip()]
new=[r for r in qrecs if r.get('status')=='new' and r.get('execution_date')=='2026-03-03']

missing=[]
issues=[]
for r in new[-20:]:
    tz=r.get('timezone')
    if not tz:
        issues.append((r.get('id'),'missing tz'))
        continue
    sa=r.get('send_after_local')
    for k,hrs in [('followup_1_at_local',24),('followup_2_at_local',72),('followup_3_at_local',168)]:
        if sa and r.get(k):
            a=datetime.strptime(sa,FMT)
            b=datetime.strptime(r[k],FMT)
            if b-a!=timedelta(hours=hrs):
                issues.append((r.get('id'),f'{k} delta {b-a}'))
        else:
            issues.append((r.get('id'),f'missing {k} or send_after_local'))
    for k,v in [('auto_send_enabled',False),('gate_status','locked_pending_manual_unlock'),('send_blocked_by_gate',True),('approval_gate','gate4_manual_unlock')]:
        if r.get(k)!=v:
            issues.append((r.get('id'),f'{k}={r.get(k)!r}'))

tracker=json.loads(t.read_text(encoding='utf-8'))
ids={r.get('id') for r in tracker.get('lead_schedule',[])}
for r in new[-20:]:
    if r.get('id') not in ids:
        missing.append(r.get('id'))

print('new_count',len(new),'last20_missing_in_tracker',len(missing))
print('missing_ids',missing)
print('issues',len(issues))
for i in issues[:20]:
    print(i)
