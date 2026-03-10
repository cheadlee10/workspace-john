# -*- coding: utf-8 -*-
import json,re,csv
from pathlib import Path
p=Path(r'C:\Users\chead\.openclaw\workspace-john\leads.jsonl')
rows=[]
for ln in p.read_text(encoding='utf-8').splitlines():
    ln=ln.strip()
    if not ln: continue
    try: d=json.loads(ln)
    except: continue
    rows.append(d)

state_tz={'WA':'PT','OR':'PT','CA':'PT','NV':'PT','AZ':'MT','UT':'MT','CO':'MT','NM':'MT','TX':'CT','OK':'CT','MO':'CT','WI':'CT','MN':'CT','TN':'CT','LA':'CT','KS':'CT','NE':'CT','GA':'ET','FL':'ET','NC':'ET','SC':'ET','OH':'ET','MI':'ET','IN':'ET','KY':'ET','NY':'ET','PA':'ET'}
pt_windows={'ET':'06:30-08:30 PT','CT':'07:30-09:30 PT','MT':'08:30-10:30 PT','PT':'09:00-11:30 PT'}

def get_state(loc):
    if not isinstance(loc,str): return ''
    m=re.search(r'\b([A-Z]{2})\b(?:\s*\d{5})?\s*$',loc.strip())
    return m.group(1) if m else ''

cands=[]
for d in rows:
    flags=d.get('channel_flags') or {}
    phone=d.get('phone') or d.get('phone_normalized') or ''
    usable=d.get('outreach_usable')
    if usable is False: continue
    if not (flags.get('can_sms') or flags.get('can_call') or phone): continue
    est=d.get('estimated_value') or 0
    notes=(d.get('notes') or '').lower()
    pri=0
    pri += 4 if est>=1200 else 3 if est>=900 else 2 if est>=700 else 1
    if 'high priority' in notes: pri+=3
    svc=(d.get('service') or '').lower()
    if 'roof' in svc or 'contractor' in svc: pri+=1
    state=get_state(d.get('location',''))
    tz=state_tz.get(state,'CT')
    cands.append({'id':d.get('id',''),'client':d.get('client',''),'service':d.get('service',''),'state':state,'location':d.get('location',''),'phone':phone,'estimated_value':est,'source':d.get('source',''),'status':d.get('status','new'),'priority_score':pri,'tz':tz,'pt_window':pt_windows[tz],'notes':d.get('notes','')})

best={}
for c in cands:
    k=c['phone'] or c['client']
    if k not in best or (c['priority_score'],c['estimated_value'])>(best[k]['priority_score'],best[k]['estimated_value']):
        best[k]=c
cands=list(best.values())
cands.sort(key=lambda x:(x['priority_score'],x['estimated_value']), reverse=True)

queue=[]
for i,c in enumerate(cands[:36],1):
    batch='A' if i<=12 else ('B' if i<=24 else 'C')
    channel='sms' if i%3!=0 else 'call'
    queue.append({'queue_date':'2026-03-05','queue_id':f'Q20260305-{i:03d}','batch':batch,'priority_rank':i,'priority_tier':'P1' if i<=12 else ('P2' if i<=24 else 'P3'),'lead_id':c['id'],'client':c['client'],'service':c['service'],'location':c['location'],'state':c['state'],'tz':c['tz'],'send_window_pt':c['pt_window'],'channel_primary':channel,'channel_backup':'call' if channel=='sms' else 'sms','phone':c['phone'],'estimated_value':c['estimated_value'],'source':c['source'],'status_pre_send':c['status'],'owner':'john','script_variant':'nosite_v1','attempt_number':1,'last_contact_pt':'','send_status':'queued','response_status':'','response_time_pt':'','outcome':'','next_action':'','next_action_due_pt':'','crm_note':'','notes':c['notes'][:140]})

out_csv=Path(r'C:\Users\chead\.openclaw\workspace-john\outbound_send_queue_2026-03-05.csv')
with out_csv.open('w',newline='',encoding='utf-8') as f:
    w=csv.DictWriter(f,fieldnames=list(queue[0].keys())); w.writeheader(); w.writerows(queue)

from collections import Counter
mix=Counter(q['channel_primary'] for q in queue)
md=['# Outbound Send Queue - 2026-03-05 (PT)','',f'- Total queued: **{len(queue)}**',f"- Channel mix: **SMS {mix.get('sms',0)}** / **Call {mix.get('call',0)}**",'- Batch windows (PT): A 06:30-08:30, B 08:30-10:30, C 10:30-12:00','','## Prioritized Batches']
for b in ['A','B','C']:
    md.append(f'### Batch {b}')
    for q in [x for x in queue if x['batch']==b]:
        md.append(f"- {q['queue_id']} | {q['client']} | {q['service']} | {q['state'] or 'NA'} | {q['channel_primary'].upper()} | {q['send_window_pt']} | ${q['estimated_value']}")
    md.append('')
md += ['## Tracking Fields Included','queue_id, lead_id, priority_tier, batch, send_window_pt, channel_primary, channel_backup, attempt_number, send_status, response_status, response_time_pt, outcome, next_action, next_action_due_pt, crm_note','','Primary execution file: `outbound_send_queue_2026-03-05.csv`']
Path(r'C:\Users\chead\.openclaw\workspace-john\outbound_send_queue_2026-03-05.md').write_text('\n'.join(md),encoding='utf-8')
print('done',len(queue))
