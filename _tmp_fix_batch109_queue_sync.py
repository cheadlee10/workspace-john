import json,csv
from datetime import datetime,timedelta
from pathlib import Path

root=Path(r'C:/Users/chead/.openclaw/workspace-john')
jsonl_path=root/'email-templates/send-queue-2026-03-02-next-batches.jsonl'
csv_path=root/'email-templates/send-queue-2026-03-02-next-batches-tracker.csv'
asset='next-queued-email-assets-2026-03-03-batch109.md'
batch_id='BATCH-O-WAVE9'
ids=[
('wave3-028',"Mike's Repairs"),
('wave3-030',"Witwell's Auto Repair"),
('wave3-031','Precise Mobile Power Washing'),
('wave3-032','Old Pueblo Pressure Washing'),
('wave3-033','Arrow Pressure Washing & Sealing'),
('wave3-034',"Joel's Mobile Detailing & Power Washing"),
('wave3-035','Tucson Brick Cleaning'),
('wave3-036','El Paso Capitol Plumbing'),
('wave3-037','Perfect Plumbing'),
('wave3-038','Dunn Plumbing'),
]

# existing ids
existing=set()
for line in jsonl_path.read_text(encoding='utf-8',errors='ignore').splitlines():
    line=line.strip()
    if not line: continue
    try: o=json.loads(line)
    except: continue
    if isinstance(o.get('lead_id'),str): existing.add(o['lead_id'])

start=datetime.fromisoformat('2026-03-05T12:55:00-08:00')
new_json=[]
for i,(lead_id,biz) in enumerate(ids):
    if lead_id in existing: continue
    dt=start+timedelta(minutes=5*i)
    rec={
      'scheduled_at':dt.isoformat(),
      'batch_id':batch_id,
      'sequence_step':'email_initial',
      'lead_id':lead_id,
      'business_name':biz,
      'email_to':'',
      'priority_tier':'P2',
      'priority_score':79,
      'template_asset_file':asset,
      'asset_ready':True,
      'placeholder_check':'pass:{{live_url}},{{screenshot_url}}',
      'verification_status':'pending_contact_enrichment',
      'approval_status':'pending_main_agent_approval',
      'send_window_start':'09:00',
      'send_window_end':'17:00',
      'timezone':'America/Los_Angeles',
      'gate_lock':'manual_approval_required',
      'dispatch_lock':True,
      'auto_send_enabled':False,
      'followup_24h_at':(dt+timedelta(hours=24)).isoformat(),
      'followup_72h_at':(dt+timedelta(hours=72)).isoformat(),
      'followup_7d_at':(dt+timedelta(days=7)).isoformat(),
      'followup_1_at':(dt+timedelta(hours=24)).isoformat(),
      'followup_2_at':(dt+timedelta(hours=72)).isoformat(),
      'suppression_check':'clear',
      'safe_to_send':False
    }
    new_json.append(rec)

if new_json:
    with jsonl_path.open('a',encoding='utf-8',newline='') as f:
        for r in new_json:
            f.write(json.dumps(r,separators=(',',':'))+'\n')

# csv update
with csv_path.open(encoding='utf-8',errors='ignore',newline='') as f:
    rows=list(csv.DictReader(f))
    headers=f.seek(0) or []

fieldnames=['timestamp','batch_id','day','channel','lead_id','business_name','template_id','send_status','delivery_status','open_status','reply_status','positive_reply','unsubscribe','complaint','bounce_type','suppressed','send_window_start','send_window_end','timezone','gate_lock','dispatch_lock','auto_send_enabled','followup_24h_at','followup_72h_at','followup_7d_at','notes']
existing_csv={r.get('lead_id','').strip() for r in rows}
for i,(lead_id,biz) in enumerate(ids):
    if lead_id in existing_csv: continue
    dt=start+timedelta(minutes=5*i)
    rows.append({
      'timestamp':dt.isoformat(),'batch_id':batch_id,'day':'1','channel':'email','lead_id':lead_id,'business_name':biz,
      'template_id':'','send_status':'queued','delivery_status':'pending','open_status':'none','reply_status':'none',
      'positive_reply':'no','unsubscribe':'no','complaint':'no','bounce_type':'none','suppressed':'no',
      'send_window_start':'09:00','send_window_end':'17:00','timezone':'America/Los_Angeles','gate_lock':'manual_approval_required',
      'dispatch_lock':'true','auto_send_enabled':'false',
      'followup_24h_at':(dt+timedelta(hours=24)).isoformat(),
      'followup_72h_at':(dt+timedelta(hours=72)).isoformat(),
      'followup_7d_at':(dt+timedelta(days=7)).isoformat(),
      'notes':f'asset={asset};approval=pending_main_agent_approval;verification=pending_contact_enrichment'
    })

with csv_path.open('w',encoding='utf-8',newline='') as f:
    w=csv.DictWriter(f,fieldnames=fieldnames)
    w.writeheader(); w.writerows(rows)

print(f'jsonl_added={len(new_json)}')
print(f'csv_total_rows={len(rows)}')