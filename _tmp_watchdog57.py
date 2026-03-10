import json
from datetime import datetime, timedelta
from pathlib import Path

root=Path(r'C:\Users\chead\.openclaw\workspace-john')
q_path=root/'outreach_queue.jsonl'
t_path=root/'outbound_send_tracker_2026-03-03.json'
FMT='%Y-%m-%d %H:%M'

def norm_record(r):
    changed=False
    if not isinstance(r, dict):
        return False
    if not str(r.get('id','')).startswith('gpass-'):
        return False
    if not r.get('send_after_local') or not r.get('send_after_utc'):
        return False
    defaults={
        'approval_gate':'gate4_manual_unlock',
        'gate_status':'locked_pending_manual_unlock',
        'send_blocked_by_gate':True,
        'send_ready':False,
        'send_state':'prepared_pending_gate_unlock',
        'auto_send_enabled':False,
        'auto_sent':False,
        'defer_reason':'manual gate lock active; do not auto-send',
        'timezone_normalized':True,
    }
    for k,v in defaults.items():
        if r.get(k)!=v:
            r[k]=v; changed=True
    req={'gate1_data_qa':'complete','gate2_message_qa':'complete','gate3_throughput_qa':'complete','gate4_manual_unlock':'pending'}
    ag=r.get('approval_gates')
    if not isinstance(ag,dict):
        r['approval_gates']=req.copy(); changed=True
    else:
        for k,v in req.items():
            if ag.get(k)!=v:
                ag[k]=v; changed=True
    try:
        sal=datetime.strptime(r['send_after_local'],FMT)
        sau=datetime.strptime(r['send_after_utc'],FMT)
    except Exception:
        return changed
    f1l=(sal+timedelta(hours=24)).strftime(FMT); f2l=(sal+timedelta(hours=72)).strftime(FMT); f3l=(sal+timedelta(days=7)).strftime(FMT)
    f1u=(sau+timedelta(hours=24)).strftime(FMT); f2u=(sau+timedelta(hours=72)).strftime(FMT); f3u=(sau+timedelta(days=7)).strftime(FMT)
    fields={'followup_1_at_local':f1l,'followup_2_at_local':f2l,'followup_3_at_local':f3l,'followup_1_at_utc':f1u,'followup_2_at_utc':f2u,'followup_3_at_utc':f3u}
    for k,v in fields.items():
        if r.get(k)!=v:
            r[k]=v; changed=True
    policy='fu1:+24h swap-channel, fu2:+72h call+vm|nudge, fu3:+7d breakup CTA SITE'
    target={'fu1_at_local':f1l,'fu2_at_local':f2l,'fu3_at_local':f3l,'fu1_at_utc':f1u,'fu2_at_utc':f2u,'fu3_at_utc':f3u,'policy':policy}
    fu=r.get('followups')
    if not isinstance(fu,dict):
        r['followups']=target; changed=True
    else:
        for k,v in target.items():
            if fu.get(k)!=v:
                fu[k]=v; changed=True
    return changed

lines=q_path.read_text(encoding='utf-8').splitlines()
out=[]; q_changed=0
for ln in lines:
    s=ln.strip()
    if not s:
        out.append(ln); continue
    try: obj=json.loads(s)
    except Exception:
        out.append(ln); continue
    if norm_record(obj):
        q_changed+=1
    out.append(json.dumps(obj,separators=(',',':')))
q_path.write_text('\n'.join(out)+'\n',encoding='utf-8')

tracker=json.loads(t_path.read_text(encoding='utf-8'))
t_changed=0
for rec in tracker.get('lead_schedule',[]):
    rec['id']=rec.get('lead_id','')
    if norm_record(rec):
        t_changed+=1
    rec.pop('id',None)
tracker['gate_lock_state']='manual_lock_enforced'
tracker['auto_send_enabled']=False
tracker['gate_status']='locked_pending_manual_unlock'
tracker['send_blocked_by_gate']=True
tracker['timezone_normalized']=True
tracker['updated_at_local']='2026-03-03 06:40:00'
tracker['updated_by']='subagent-watchdog57-sendops-queueing'
t_path.write_text(json.dumps(tracker,indent=2),encoding='utf-8')
print(f'queue_changed={q_changed} tracker_changed={t_changed}')
