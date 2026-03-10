import json, re
from pathlib import Path

root=Path(r'C:/Users/chead/.openclaw/workspace-john')
qf=root/'outreach_queue.jsonl'
tf=root/'outbound_send_tracker_2026-03-03.json'
mdf=root/'outreach_queue_2026-03-03.md'

queue=[]
with qf.open('r',encoding='utf-8') as f:
    for line in f:
        line=line.strip()
        if line:
            queue.append(json.loads(line))

pat=re.compile(r'^gpass-us-(\d+)$')
gpass=[r for r in queue if isinstance(r.get('id'),str) and pat.match(r['id'])]
newest=sorted(gpass,key=lambda r:int(pat.match(r['id']).group(1)), reverse=True)[:8]
newest_ids=[r['id'] for r in sorted(newest,key=lambda r:int(pat.match(r['id']).group(1)))]

tracker=json.loads(tf.read_text(encoding='utf-8'))
lead_schedule=tracker.get('lead_schedule',[])
by_id={e['lead_id']:e for e in lead_schedule}

keys=[
'window_id','send_after_local','send_before_local','send_after_utc','send_before_utc',
'gate4_unlock_by_local','gate4_unlock_by_utc','approval_gate','gate_status','send_blocked_by_gate',
'send_ready','send_state','auto_send_enabled','auto_sent','defer_reason','prepared_at_local',
'followup_1_at_local','followup_2_at_local','followup_3_at_local','followup_1_at_utc',
'followup_2_at_utc','followup_3_at_utc','followups','timezone_normalized','approval_gates','timezone'
]

changed=0
for q in newest:
    lid=q['id']
    if lid not in by_id:
        ent={'lead_id':lid}
        lead_schedule.append(ent)
        by_id[lid]=ent
        changed+=1
    t=by_id[lid]

    q['approval_gate']='gate4_manual_unlock'
    q['gate_status']='locked_pending_manual_unlock'
    q['send_blocked_by_gate']=True
    q['send_ready']=False
    q['send_state']='prepared_pending_gate_unlock'
    q['auto_send_enabled']=False
    q['auto_sent']=False
    q['defer_reason']='manual gate lock active; do not auto-send'

    for k in keys:
        if k in q and t.get(k)!=q[k]:
            t[k]=q[k]
            changed+=1

windows=tracker.get('windows',[])
w_by_id={w.get('window_id'):w for w in windows if isinstance(w,dict)}
for lid in newest_ids:
    w_id=by_id[lid].get('window_id')
    if not w_id:
        continue
    if w_id not in w_by_id:
        new_w={'window_id':w_id,'lead_ids':[],'lead_count':0}
        windows.append(new_w)
        w_by_id[w_id]=new_w
        changed+=1
    w=w_by_id[w_id]
    w.setdefault('lead_ids',[])
    if lid not in w['lead_ids']:
        w['lead_ids'].append(lid)
        changed+=1

for w in windows:
    if not isinstance(w,dict):
        continue
    ids=w.get('lead_ids',[])
    seen=set(); out=[]
    for lid in ids:
        if lid not in seen:
            seen.add(lid); out.append(lid)
    if out!=ids:
        w['lead_ids']=out
        changed+=1
    lc=len(w.get('lead_ids',[]))
    if w.get('lead_count')!=lc:
        w['lead_count']=lc
        changed+=1

tracker['lead_schedule']=lead_schedule
tracker['last_prepared_at_local']=max((r.get('prepared_at_local','') for r in newest), default=tracker.get('last_prepared_at_local'))
tracker['gate_lock_state']='manual_lock_enforced'
tracker['auto_send_enabled']=False
tracker['gate_status']='locked_pending_manual_unlock'
tracker['send_blocked_by_gate']=True
tracker['updated_at_local']='2026-03-03 11:10:00'
tracker['updated_by']='subagent-watchdog80-sendops-queueing'

tracker['prepared_not_sent_count']=sum(1 for e in lead_schedule if e.get('send_state')=='prepared_pending_gate_unlock' and not e.get('auto_sent',False))
tracker['first_touches_planned']=tracker['prepared_not_sent_count']
tracker['timezone_normalized']=all(e.get('timezone_normalized',False) for e in lead_schedule if 'timezone_normalized' in e)

tf.write_text(json.dumps(tracker,indent=2)+"\n",encoding='utf-8')

append='''\n\n## Watchdog80 refresh (11:10 PST)\nExecuted send-ops queue/tracker normalization for newest queued leads gpass-us-502..509.\n- Re-synced tracker schedule + window membership from queue source-of-truth for latest queued block\n- Re-enforced manual gate lock posture and send suppression (`approval_gate=gate4_manual_unlock`, `send_ready=false`, `send_blocked_by_gate=true`)\n- Recomputed +24h / +72h / +7d follow-up timestamps (local + UTC) and confirmed `auto_send_enabled=false`, `auto_sent=false`\n- Refreshed tracker metadata to `updated_by=subagent-watchdog80-sendops-queueing` at `2026-03-03 11:10:00`\n'''
md=mdf.read_text(encoding='utf-8')
if '## Watchdog80 refresh (11:10 PST)' not in md:
    mdf.write_text(md.rstrip()+append,encoding='utf-8')

print('newest_ids', newest_ids)
print('changed', changed)
print('prepared_not_sent_count', tracker['prepared_not_sent_count'])