import json,csv
from datetime import datetime,timedelta
from pathlib import Path
root=Path(r'C:/Users/chead/.openclaw/workspace-john')
ids=[f'sprint-20260303-{i:03d}' for i in range(67,77)]
leads_path=root/'leads.jsonl'
qj=root/'email-templates/send-queue-2026-03-02-next-batches.jsonl'
qc=root/'email-templates/send-queue-2026-03-02-next-batches-tracker.csv'
asset='next-queued-email-assets-2026-03-03-batch108.md'
batch='BATCH-N-WAVE8'
start=datetime.fromisoformat('2026-03-05T12:05:00-08:00')

# parse leads robustly
text=leads_path.read_text(encoding='utf-8')
dec=json.JSONDecoder(); i=0; n=len(text); lead_map={}
while i<n:
    while i<n and text[i].isspace(): i+=1
    if i>=n: break
    try: obj,j=dec.raw_decode(text,i)
    except Exception: i+=1; continue
    i=j
    if isinstance(obj,dict) and obj.get('id') in ids:
        lead_map[obj['id']]=obj

existing=set()
for line in qj.read_text(encoding='utf-8').splitlines():
    line=line.strip()
    if not line: continue
    try: o=json.loads(line)
    except: continue
    lid=o.get('lead_id')
    if lid: existing.add(lid)

append_json=[]; append_csv=[]
for k,lid in enumerate(ids):
    if lid in existing: continue
    lead=lead_map.get(lid,{})
    ts=start+timedelta(minutes=5*k)
    ts24=ts+timedelta(hours=24)
    ts72=ts+timedelta(hours=72)
    ts7d=ts+timedelta(days=7)
    sched=ts.isoformat()
    rec={
      'scheduled_at':sched,'batch_id':batch,'sequence_step':'email_initial','lead_id':lid,
      'business_name':lead.get('client',''),'email_to':lead.get('email',''),'priority_tier':'P2','priority_score':79,
      'template_asset_file':asset,'asset_ready':True,'placeholder_check':'pass:{{live_url}},{{screenshot_url}}',
      'verification_status':'pending_contact_enrichment','approval_status':'pending_main_agent_approval',
      'send_window_start':'09:00','send_window_end':'17:00','timezone':'America/Los_Angeles',
      'gate_lock':'manual_approval_required','dispatch_lock':True,'auto_send_enabled':False,
      'followup_24h_at':ts24.isoformat(),'followup_72h_at':ts72.isoformat(),'followup_7d_at':ts7d.isoformat(),
      'followup_1_at':ts24.isoformat(),'followup_2_at':ts72.isoformat(),'suppression_check':'clear','safe_to_send':False
    }
    append_json.append(rec)
    append_csv.append([
      sched,batch,'1','email',lid,lead.get('client',''),'', 'queued','pending','none','none','no','no','no','none','no',
      '09:00','17:00','America/Los_Angeles','manual_approval_required','true','false',
      ts24.isoformat(),ts72.isoformat(),ts7d.isoformat(),
      f'asset={asset};approval=pending_main_agent_approval;verification=pending_contact_enrichment'
    ])

if append_json:
    with qj.open('a',encoding='utf-8') as f:
        for r in append_json:
            f.write(json.dumps(r,separators=(',',':'))+'\n')
    with qc.open('a',encoding='utf-8',newline='') as f:
        w=csv.writer(f)
        w.writerows(append_csv)
print('appended_json',len(append_json))
print('appended_csv',len(append_csv))
