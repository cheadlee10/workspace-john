import json,re
from pathlib import Path
root=Path(r'C:/Users/chead/.openclaw/workspace-john')
queue_path=root/'outreach_queue.jsonl'
tracker_path=root/'outbound_send_tracker_2026-03-03.json'
rows=[json.loads(line) for line in queue_path.read_text(encoding='utf-8').splitlines() if line.strip()]
pat=re.compile(r'^gpass-us-(\d+)$')
us=sorted([r for r in rows if isinstance(r.get('id'),str) and pat.match(r['id'])], key=lambda r:int(pat.match(r['id']).group(1)))
target=us[-8:]
ids=[r['id'] for r in target]
by_id={r['id']:r for r in target}
for r in rows:
    if r.get('id') in by_id:
        r['approval_gate']='gate4_manual_unlock'
        r.setdefault('approval_gates',{})
        r['approval_gates'].update({'gate1_data_qa':'complete','gate2_message_qa':'complete','gate3_throughput_qa':'complete','gate4_manual_unlock':'pending'})
        r['gate_status']='locked_pending_manual_unlock';r['send_blocked_by_gate']=True;r['send_ready']=False
        r['send_state']='prepared_pending_gate_unlock';r['auto_send_enabled']=False;r['auto_sent']=False
        r['defer_reason']='manual gate lock active; do not auto-send';r['timezone_normalized']=True
queue_path.write_text('\n'.join(json.dumps(r,ensure_ascii=False,separators=(',',':')) for r in rows)+'\n',encoding='utf-8')

tracker=json.loads(tracker_path.read_text(encoding='utf-8'))
schedule=tracker['lead_schedule']
idx={s.get('lead_id'):i for i,s in enumerate(schedule) if isinstance(s,dict)}
fields=['timezone','window_id','send_after_local','send_before_local','send_after_utc','send_before_utc','gate4_unlock_by_local','gate4_unlock_by_utc','approval_gate','gate_status','send_blocked_by_gate','send_ready','send_state','auto_send_enabled','auto_sent','defer_reason','prepared_at_local','followup_1_at_local','followup_2_at_local','followup_3_at_local','followup_1_at_utc','followup_2_at_utc','followup_3_at_utc','followups','timezone_normalized','approval_gates']
for lid in ids:
    q=by_id[lid]; obj={'lead_id':lid}
    for f in fields:
        if f in q: obj[f]=q[f]
    if lid in idx: schedule[idx[lid]].update(obj)
    else: schedule.append(obj)

windows=tracker.get('windows',[])
if isinstance(windows,list):
    for w in windows:
        if isinstance(w,dict) and isinstance(w.get('lead_ids'),list):
            w['lead_ids']=[x for x in w['lead_ids'] if x not in ids]
    for lid in ids:
        wid=by_id[lid].get('window_id')
        for w in windows:
            if isinstance(w,dict) and w.get('id')==wid:
                w.setdefault('lead_ids',[])
                if lid not in w['lead_ids']: w['lead_ids'].append(lid)
    for w in windows:
        if isinstance(w,dict) and isinstance(w.get('lead_ids'),list):
            w['lead_count']=len(w['lead_ids'])

tracker_path.write_text(json.dumps(tracker,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('synced',ids)
