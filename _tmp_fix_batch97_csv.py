import json,csv
from pathlib import Path

root=Path(r'C:/Users/chead/.openclaw/workspace-john')
jsonl=root/'email-templates/send-queue-2026-03-02-next-batches.jsonl'
csvp=root/'email-templates/send-queue-2026-03-02-next-batches-tracker.csv'
ids={f'nosite-{i:03d}' for i in range(31,41)}

rows=[]
for ln in jsonl.read_text(encoding='utf-8',errors='ignore').splitlines():
    try:o=json.loads(ln)
    except:continue
    if o.get('lead_id') in ids:
        rows.append(o)
rows.sort(key=lambda r:r.get('scheduled_at',''))

existing=set()
with csvp.open('r',encoding='utf-8',newline='') as f:
    rdr=csv.DictReader(f)
    fieldnames=rdr.fieldnames
    for r in rdr:
        existing.add(r.get('lead_id'))

missing=[r for r in rows if r.get('lead_id') not in existing]
if not missing:
    print('No CSV missing IDs')
    raise SystemExit

with csvp.open('a',encoding='utf-8',newline='') as f:
    w=csv.DictWriter(f,fieldnames=fieldnames)
    for r in missing:
        w.writerow({
            'timestamp': r['scheduled_at'],
            'batch_id': r.get('batch_id','BATCH-K-WAVE6'),
            'day':'1',
            'channel':'email',
            'lead_id': r['lead_id'],
            'business_name': r.get('business_name',''),
            'template_id':'',
            'send_status':'queued',
            'delivery_status':'pending',
            'open_status':'none',
            'reply_status':'none',
            'positive_reply':'no',
            'unsubscribe':'no',
            'complaint':'no',
            'bounce_type':'none',
            'suppressed':'no',
            'send_window_start': r.get('send_window_start','09:00'),
            'send_window_end': r.get('send_window_end','17:00'),
            'timezone': r.get('timezone','America/Los_Angeles'),
            'gate_lock': r.get('gate_lock','manual_approval_required'),
            'dispatch_lock': str(r.get('dispatch_lock',True)).lower(),
            'auto_send_enabled': str(r.get('auto_send_enabled',False)).lower(),
            'followup_24h_at': r.get('followup_24h_at',''),
            'followup_72h_at': r.get('followup_72h_at',''),
            'followup_7d_at': r.get('followup_7d_at',''),
            'notes': f"asset={r.get('template_asset_file','')};approval={r.get('approval_status','')};verification={r.get('verification_status','')}"
        })
print('Appended CSV IDs:', ', '.join(r['lead_id'] for r in missing))
