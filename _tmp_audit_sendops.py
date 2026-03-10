import json
from pathlib import Path
p=Path('outreach_queue.jsonl')
req=['timezone','execution_date','window_id','send_after_local','send_before_local','approval_gate','approval_gates','send_ready','send_state','auto_sent','prepared_at_local','defer_reason','followups','gate_status','send_blocked_by_gate']
rows=[]
for i,l in enumerate(p.read_text(encoding='utf-8').splitlines(),1):
    if not l.strip():
        continue
    o=json.loads(l)
    rows.append((i,o))
usable=[(i,o) for i,o in rows if o.get('outreach_usable') is True]
print('total',len(rows),'usable',len(usable))
missing=[]
for i,o in usable:
    miss=[k for k in req if k not in o]
    if miss:
        missing.append((i,o.get('id'),miss))
print('usable missing req fields',len(missing))
for rec in missing[:25]:
    print(rec)

t= json.loads(Path('outbound_send_tracker_2026-03-02.json').read_text(encoding='utf-8'))
entries=t.get('first_touches_planned',[])
print('planned first touches',len(entries))
req2=['lead_id','timezone','window_id','send_after_local','send_before_local','approval_gate','gate_status','send_state','auto_send_enabled','followups']
missing2=[]
for e in entries:
    miss=[k for k in req2 if k not in e]
    if miss:
        missing2.append((e.get('lead_id'),miss))
print('tracker entries missing',len(missing2))
for rec in missing2[:10]:
    print(rec)
