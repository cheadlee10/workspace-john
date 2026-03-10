import json
ids=[f'gpass-us-{i}' for i in range(502,510)]
q={}
with open('outreach_queue.jsonl',encoding='utf-8') as f:
    for ln in f:
        if ln.strip():
            o=json.loads(ln)
            if o.get('id') in ids:
                q[o['id']]=o

t=json.load(open('outbound_send_tracker_2026-03-03.json',encoding='utf-8'))
ls={r.get('lead_id'):r for r in t.get('lead_schedule',[])}
check=['window_id','send_after_local','send_before_local','send_after_utc','send_before_utc','gate4_unlock_by_local','gate4_unlock_by_utc','followup_1_at_local','followup_2_at_local','followup_3_at_local','followup_1_at_utc','followup_2_at_utc','followup_3_at_utc','gate_status','send_blocked_by_gate','auto_send_enabled','send_ready','send_state','approval_gate']
err=[]
for i in ids:
    if i not in ls:
        err.append((i,'missing'))
        continue
    for f in check:
        qv=q[i].get(f)
        tv=ls[i].get(f)
        if qv!=tv:
            err.append((i,f,tv,qv))
print('errs',len(err))
for e in err[:40]:
    print(e)
print('tracker flags',t.get('auto_send_enabled'),t.get('send_blocked_by_gate'),t.get('gate_status'))
