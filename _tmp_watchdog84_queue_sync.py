import json,re
from pathlib import Path
from datetime import datetime,timedelta
from zoneinfo import ZoneInfo

root=Path(r"C:/Users/chead/.openclaw/workspace-john")
queue_path=root/'outreach_queue.jsonl'
tracker_path=root/'outbound_send_tracker_2026-03-03.json'
md_path=root/'outreach_queue_2026-03-03.md'
FMT='%Y-%m-%d %H:%M'

queue=[json.loads(l) for l in queue_path.read_text(encoding='utf-8').splitlines() if l.strip()]

cand=[]
for r in queue:
    if r.get('status')=='new' and r.get('execution_date')=='2026-03-03':
        m=re.fullmatch(r'gpass-us-(\d+)', str(r.get('id','')))
        if m:
            cand.append((int(m.group(1)),r))
latest=[r for _,r in sorted(cand,key=lambda x:x[0])[-8:]]
latest_ids=[r['id'] for r in latest]
latest_set=set(latest_ids)

def to_utc(local_s,tz):
    dt=datetime.strptime(local_s,FMT).replace(tzinfo=ZoneInfo(tz))
    return dt.astimezone(ZoneInfo('UTC')).strftime(FMT)

def normalize(rec):
    changed=False
    tz=rec.get('timezone')
    sa=rec.get('send_after_local')
    sb=rec.get('send_before_local')
    g4=rec.get('gate4_unlock_by_local')
    if tz and sa:
        for k,v in [
            ('send_after_utc',to_utc(sa,tz)),
            ('followup_1_at_local',(datetime.strptime(sa,FMT)+timedelta(hours=24)).strftime(FMT)),
            ('followup_2_at_local',(datetime.strptime(sa,FMT)+timedelta(hours=72)).strftime(FMT)),
            ('followup_3_at_local',(datetime.strptime(sa,FMT)+timedelta(hours=168)).strftime(FMT)),
        ]:
            if rec.get(k)!=v:
                rec[k]=v; changed=True
        for lk,uk in [('followup_1_at_local','followup_1_at_utc'),('followup_2_at_local','followup_2_at_utc'),('followup_3_at_local','followup_3_at_utc')]:
            uv=to_utc(rec[lk],tz)
            if rec.get(uk)!=uv:
                rec[uk]=uv; changed=True
    if tz and sb:
        uv=to_utc(sb,tz)
        if rec.get('send_before_utc')!=uv:
            rec['send_before_utc']=uv; changed=True
    if tz and g4:
        uv=to_utc(g4,tz)
        if rec.get('gate4_unlock_by_utc')!=uv:
            rec['gate4_unlock_by_utc']=uv; changed=True
    fu=rec.get('followups')
    if not isinstance(fu,dict):
        fu={}; rec['followups']=fu; changed=True
    for a,b in [('fu1_at_local','followup_1_at_local'),('fu2_at_local','followup_2_at_local'),('fu3_at_local','followup_3_at_local'),('fu1_at_utc','followup_1_at_utc'),('fu2_at_utc','followup_2_at_utc'),('fu3_at_utc','followup_3_at_utc')]:
        if rec.get(b) and fu.get(a)!=rec.get(b):
            fu[a]=rec[b]; changed=True
    pol='fu1:+24h swap-channel, fu2:+72h call+vm|nudge, fu3:+7d breakup CTA SITE'
    if fu.get('policy')!=pol:
        fu['policy']=pol; changed=True

    enforce={
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
    for k,v in enforce.items():
        if rec.get(k)!=v:
            rec[k]=v; changed=True
    ag=rec.get('approval_gates')
    if not isinstance(ag,dict):
        ag={}; rec['approval_gates']=ag; changed=True
    for k,v in {
        'gate1_data_qa':'complete','gate2_message_qa':'complete','gate3_throughput_qa':'complete','gate4_manual_unlock':'pending'
    }.items():
        if ag.get(k)!=v:
            ag[k]=v; changed=True
    return changed

q_changed=0
for rec in queue:
    if rec.get('id') in latest_set:
        if normalize(rec):
            q_changed+=1
queue_path.write_text('\n'.join(json.dumps(r,separators=(',',':')) for r in queue)+'\n',encoding='utf-8')

tracker=json.loads(tracker_path.read_text(encoding='utf-8'))
ls=tracker.get('lead_schedule',[])
index={r.get('lead_id'):r for r in ls}
t_changed=0
for rec in latest:
    tid=rec['id']
    tr=index.get(tid)
    if tr is None:
        tr={
            'lead_id':tid,
            'timezone':rec.get('timezone'),
            'window_id':rec.get('window_id'),
            'send_after_local':rec.get('send_after_local'),
            'send_before_local':rec.get('send_before_local'),
            'prepared_at_local':rec.get('prepared_at_local'),
        }
        ls.append(tr)
        index[tid]=tr
        t_changed+=1
    for k in ['timezone','window_id','send_after_local','send_before_local','send_after_utc','send_before_utc','gate4_unlock_by_local','gate4_unlock_by_utc','approval_gate','gate_status','send_blocked_by_gate','send_ready','send_state','auto_send_enabled','auto_sent','defer_reason','prepared_at_local','followup_1_at_local','followup_2_at_local','followup_3_at_local','followup_1_at_utc','followup_2_at_utc','followup_3_at_utc','followups','timezone_normalized','approval_gates']:
        if tr.get(k)!=rec.get(k):
            tr[k]=rec.get(k)
            t_changed+=1

for w in tracker.get('windows',[]):
    ids=w.get('lead_ids')
    if not isinstance(ids,list):
        continue
    win=w.get('window_id')
    wanted=[r['id'] for r in latest if r.get('window_id')==win]
    if not wanted:
        continue
    s=set(ids)
    changed=False
    for lid in wanted:
        if lid not in s:
            ids.append(lid); s.add(lid); changed=True
    if changed:
        w['lead_count']=len(ids)
        t_changed+=1

tracker['auto_send_enabled']=False
tracker['gate_lock_state']='manual_lock_enforced'
tracker['gate_status']='locked_pending_manual_unlock'
tracker['send_blocked_by_gate']=True
tracker['timezone_normalized']=True
tracker['updated_at_local']='2026-03-03 14:10:00'
tracker['updated_by']='subagent-watchdog84-sendops-queueing'
tracker_path.write_text(json.dumps(tracker,indent=2)+'\n',encoding='utf-8')

append = """

## Watchdog84 refresh (14:10 PST)
Executed send-ops queue/tracker normalization for newest queued leads `gpass-us-502..509`.
- Re-synced tracker schedule fields from `outreach_queue.jsonl` source-of-truth (normalized send windows, UTC conversions, and gate unlock stamps)
- Re-enforced manual gate lock + send suppression (`approval_gate=gate4_manual_unlock`, `gate_status=locked_pending_manual_unlock`, `send_ready=false`, `send_blocked_by_gate=true`)
- Recomputed +24h / +72h / +7d follow-up timestamps in local + UTC fields and synced nested `followups`
- Kept auto-send disabled (`auto_send_enabled=false`, `auto_sent=false`) and refreshed tracker metadata to `updated_by=subagent-watchdog84-sendops-queueing` at `2026-03-03 14:10:00`
"""
text=md_path.read_text(encoding='utf-8')
if '## Watchdog84 refresh (14:10 PST)' not in text:
    md_path.write_text(text.rstrip()+append+'\n',encoding='utf-8')

print(json.dumps({'latest_ids':latest_ids,'queue_changed':q_changed,'tracker_changes':t_changed}))
