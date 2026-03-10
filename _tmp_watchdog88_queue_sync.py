import json, pathlib, datetime
from zoneinfo import ZoneInfo

root=pathlib.Path('.')
queue_path=root/'outreach_queue.jsonl'
tracker_path=root/'outbound_send_tracker_2026-03-03.json'
ids=[f'gpass-us-{i}' for i in range(502,510)]

q=[]
for ln in queue_path.read_text(encoding='utf-8').splitlines():
    if ln.strip():
        o=json.loads(ln)
        if o.get('id') in ids:
            q.append(o)
if len(q)!=len(ids):
    missing=[i for i in ids if i not in {x.get('id') for x in q}]
    raise SystemExit(f'missing queue ids: {missing}')
q_by={x['id']:x for x in q}

t=json.loads(tracker_path.read_text(encoding='utf-8'))
ls=t.get('lead_schedule',[])
idx={r.get('lead_id'):i for i,r in enumerate(ls)}

def make_row(o):
    return {
      'lead_id':o['id'],'timezone':o.get('timezone'),'window_id':o.get('window_id'),
      'send_after_local':o.get('send_after_local'),'send_before_local':o.get('send_before_local'),
      'send_after_utc':o.get('send_after_utc'),'send_before_utc':o.get('send_before_utc'),
      'gate4_unlock_by_local':o.get('gate4_unlock_by_local'),'gate4_unlock_by_utc':o.get('gate4_unlock_by_utc'),
      'approval_gate':'gate4_manual_unlock','gate_status':'locked_pending_manual_unlock','send_blocked_by_gate':True,
      'send_ready':False,'send_state':'prepared_pending_gate_unlock','auto_send_enabled':False,'auto_sent':False,
      'defer_reason':'manual gate lock active; do not auto-send','prepared_at_local':o.get('prepared_at_local'),
      'followup_1_at_local':o.get('followup_1_at_local'),'followup_2_at_local':o.get('followup_2_at_local'),
      'followup_3_at_local':o.get('followup_3_at_local'),'followup_1_at_utc':o.get('followup_1_at_utc'),
      'followup_2_at_utc':o.get('followup_2_at_utc'),'followup_3_at_utc':o.get('followup_3_at_utc'),
      'followups':o.get('followups'),'timezone_normalized':True,'approval_gates':o.get('approval_gates')
    }

for lid in ids:
    row=make_row(q_by[lid])
    if lid in idx:
        ls[idx[lid]]=row
    else:
        ls.append(row)

t['lead_schedule']=ls
lead_ids=t.get('lead_ids',[])
for lid in ids:
    if lid not in lead_ids:
        lead_ids.append(lid)
t['lead_ids']=lead_ids

for w in t.get('windows',[]):
    wid=w.get('window_id')
    s={x for x in w.get('lead_ids',[]) if isinstance(x,str)}
    for lid in ids:
        if q_by[lid].get('window_id')==wid:
            s.add(lid)
    w['lead_ids']=sorted(s)
    w['lead_count']=len(w['lead_ids'])

t['auto_send_enabled']=False
t['send_blocked_by_gate']=True
t['gate_status']='locked_pending_manual_unlock'
t['gate_lock_state']='manual_lock_enabled'
t['prepared_not_sent_count']=len(t.get('lead_ids',[]))
now=datetime.datetime.now(ZoneInfo('America/Los_Angeles')).replace(second=0,microsecond=0)
t['updated_at_local']=now.strftime('%Y-%m-%d %H:%M:%S')
t['updated_by']='subagent-watchdog88-sendops-queueing'

tracker_path.write_text(json.dumps(t,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')

idx2={r.get('lead_id'):r for r in t['lead_schedule']}
check=['window_id','send_after_local','send_before_local','send_after_utc','send_before_utc','gate4_unlock_by_local','gate4_unlock_by_utc','followup_1_at_local','followup_2_at_local','followup_3_at_local','followup_1_at_utc','followup_2_at_utc','followup_3_at_utc']
errs=[]
for lid in ids:
    qrow=q_by[lid]; r=idx2.get(lid)
    if not r:
        errs.append((lid,'missing schedule'))
        continue
    for f in check:
        if r.get(f)!=qrow.get(f):
            errs.append((lid,f,r.get(f),qrow.get(f)))
    if not (r.get('auto_send_enabled') is False and r.get('auto_sent') is False and r.get('send_ready') is False and r.get('send_blocked_by_gate') is True):
        errs.append((lid,'lock flags'))

print('updated',len(ids),'ids')
print('errors',len(errs))
if errs:
    print(errs[:3])
print('updated_at_local',t['updated_at_local'])
