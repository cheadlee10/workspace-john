import json
from pathlib import Path
q=[]
for l in Path('outreach_queue.jsonl').read_text(encoding='utf-8').splitlines():
    if l.strip(): q.append(json.loads(l))
qmap={r['id']:r for r in q}
t=json.loads(Path('outbound_send_tracker_2026-03-02.json').read_text(encoding='utf-8'))
ids=t['lead_ids']
print('tracker ids',len(ids))
missing=[i for i in ids if i not in qmap]
print('missing in queue',missing)
req=['timezone','execution_date','window_id','send_after_local','send_before_local','approval_gate','approval_gates','send_ready','send_state','auto_sent','prepared_at_local','defer_reason','followups','gate_status','send_blocked_by_gate']
miss=[]
for i in ids:
    o=qmap[i]
    m=[k for k in req if k not in o]
    if m: miss.append((i,m))
print('scheduled queue records missing fields',len(miss))
if miss: print(miss[:5])
# compare tracker schedule
smap={e['lead_id']:e for e in t['lead_schedule']}
print('lead_schedule entries',len(smap))
# mismatches key values
keys=[('timezone','execution_timezone'),('window_id','window_id'),('send_after_local','send_after_local'),('send_before_local','send_before_local'),('gate_status','gate_status')]
mm=[]
for i in ids:
    qrec=qmap[i]; s=smap.get(i)
    if not s: mm.append((i,'missing schedule')); continue
    for qk,sk in keys:
      if str(qrec.get(qk))!=str(s.get(sk)):
        mm.append((i,qk,qrec.get(qk),s.get(sk)))
print('mismatches',len(mm))
for m in mm[:15]: print(m)
# autosent safety
bad=[i for i in ids if qmap[i].get('auto_sent') not in (False,None)]
print('auto_sent true count',len(bad))
