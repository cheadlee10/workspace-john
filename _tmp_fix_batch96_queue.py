import json,csv
from pathlib import Path
from datetime import datetime,timedelta
root=Path(r'C:/Users/chead/.openclaw/workspace-john')
jsonl_path=root/'email-templates'/'send-queue-2026-03-02-next-batches.jsonl'
csv_path=root/'email-templates'/'send-queue-2026-03-02-next-batches-tracker.csv'
asset='next-queued-email-assets-2026-03-03-batch96.md'
ids=[f'nosite-{i:03d}' for i in range(21,31)]
names={
'nosite-021':'Premier Landcare',
'nosite-022':'Greenleaf Landscaping',
'nosite-023':'Handy-Den',
'nosite-024':'HK Handyman Services',
"nosite-025":"Rich's Handyman Services",
'nosite-026':'2dogs Handyman Services',
'nosite-027':'KC Landscaping',
'nosite-028':'Alvarez Landscaping',
'nosite-029':'ABC Nursery and Landscaping',
'nosite-030':'AAA Contractors',
}
existing=set()
for line in jsonl_path.read_text(encoding='utf-8').splitlines():
    line=line.strip()
    if not line: continue
    try:o=json.loads(line)
    except: continue
    lid=o.get('lead_id')
    if lid in ids: existing.add(lid)
missing=[i for i in ids if i not in existing]
start=datetime.fromisoformat('2026-03-04T03:40:00-08:00')
if missing:
    with jsonl_path.open('a',encoding='utf-8',newline='') as f:
        for idx,lid in enumerate(missing):
            t=start+timedelta(minutes=5*idx)
            rec={
                'scheduled_at':t.isoformat(), 'batch_id':'BATCH-K-WAVE6','sequence_step':'email_initial','lead_id':lid,
                'business_name':names[lid],'email_to':'','priority_tier':'P2','priority_score':79,
                'template_asset_file':asset,'asset_ready':True,'placeholder_check':'pass:{{live_url}},{{screenshot_url}}',
                'verification_status':'pending_contact_enrichment','approval_status':'pending_main_agent_approval',
                'send_window_start':'09:00','send_window_end':'17:00','timezone':'America/Los_Angeles',
                'gate_lock':'manual_approval_required','dispatch_lock':True,'auto_send_enabled':False,
                'followup_24h_at':(t+timedelta(days=1)).isoformat(),'followup_72h_at':(t+timedelta(days=3)).isoformat(),
                'followup_7d_at':(t+timedelta(days=7)).isoformat(),'followup_1_at':(t+timedelta(days=1)).isoformat(),
                'followup_2_at':(t+timedelta(days=3)).isoformat(),'suppression_check':'clear','safe_to_send':False
            }
            f.write(json.dumps(rec)+"\n")

existing_csv=set()
rows=[]
with csv_path.open(encoding='utf-8',newline='') as f:
    reader=csv.DictReader(f)
    fn=reader.fieldnames
    for r in reader:
        rows.append(r)
        if r.get('lead_id') in ids: existing_csv.add(r['lead_id'])
missing_csv=[i for i in ids if i not in existing_csv]
if missing_csv:
    with csv_path.open('a',encoding='utf-8',newline='') as f:
        w=csv.DictWriter(f,fieldnames=fn)
        for idx,lid in enumerate(missing_csv):
            t=start+timedelta(minutes=5*idx)
            w.writerow({
                'timestamp':t.isoformat(),'batch_id':'BATCH-K-WAVE6','day':'1','channel':'email','lead_id':lid,
                'business_name':names[lid],'template_id':'','send_status':'queued','delivery_status':'pending',
                'open_status':'none','reply_status':'none','positive_reply':'no','unsubscribe':'no','complaint':'no',
                'bounce_type':'none','suppressed':'no','send_window_start':'09:00','send_window_end':'17:00',
                'timezone':'America/Los_Angeles','gate_lock':'manual_approval_required','dispatch_lock':'true',
                'auto_send_enabled':'false','followup_24h_at':(t+timedelta(days=1)).isoformat(),
                'followup_72h_at':(t+timedelta(days=3)).isoformat(),'followup_7d_at':(t+timedelta(days=7)).isoformat(),
                'notes':f'asset={asset};approval=pending_main_agent_approval;verification=pending_contact_enrichment'
            })
print('added_jsonl',missing)
print('added_csv',missing_csv)
