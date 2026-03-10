import re, json, pathlib, csv
from datetime import datetime, timedelta

root=pathlib.Path(r'C:/Users/chead/.openclaw/workspace-john')
email_file=root/'email-templates'/'next-queued-email-assets-2026-03-03-batch86.md'
jsonl_path=root/'email-templates'/'send-queue-2026-03-02-next-batches.jsonl'
csv_path=root/'email-templates'/'send-queue-2026-03-02-next-batches-tracker.csv'

text=email_file.read_text(encoding='utf-8')
pairs=re.findall(r'##\s+\d+\)\s+(.+?)\s+\(`(wave6-\d+)`\)', text)
lead_to_name={lead:name for name,lead in pairs}
lead_ids=[lead for _,lead in pairs]

existing_json=[]
for ln in jsonl_path.read_text(encoding='utf-8').splitlines():
    if not ln.strip():
        continue
    try:
        existing_json.append(json.loads(ln))
    except Exception:
        pass
existing_ids={o.get('lead_id') for o in existing_json}
missing=[lid for lid in lead_ids if lid not in existing_ids]
print('MISSING',missing)
if not missing:
    raise SystemExit(0)

latest=max(datetime.fromisoformat(o['scheduled_at']) for o in existing_json if o.get('scheduled_at'))
batch_id='BATCH-K-WAVE6'
asset_file='next-queued-email-assets-2026-03-03-batch86.md'
new_objs=[]
for i,lid in enumerate(missing,1):
    sched=latest+timedelta(minutes=5*i)
    o={
        'scheduled_at':sched.isoformat(),
        'batch_id':batch_id,
        'sequence_step':'email_initial',
        'lead_id':lid,
        'business_name':lead_to_name[lid],
        'email_to':'',
        'priority_tier':'P2',
        'priority_score':79,
        'template_asset_file':asset_file,
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
        'followup_24h_at':(sched+timedelta(days=1)).isoformat(),
        'followup_72h_at':(sched+timedelta(days=3)).isoformat(),
        'followup_7d_at':(sched+timedelta(days=7)).isoformat(),
        'followup_1_at':(sched+timedelta(days=1)).isoformat(),
        'followup_2_at':(sched+timedelta(days=3)).isoformat(),
        'suppression_check':'clear',
        'safe_to_send':False
    }
    new_objs.append(o)

with jsonl_path.open('a',encoding='utf-8',newline='') as f:
    for o in new_objs:
        f.write(json.dumps(o,separators=(',',':'))+'\n')

with csv_path.open('r',encoding='utf-8',newline='') as f:
    reader=csv.DictReader(f)
    fieldnames=reader.fieldnames

with csv_path.open('a',encoding='utf-8',newline='') as f:
    w=csv.DictWriter(f,fieldnames=fieldnames,quoting=csv.QUOTE_ALL)
    for o in new_objs:
        w.writerow({
            'timestamp':o['scheduled_at'],'batch_id':batch_id,'day':'1','channel':'email','lead_id':o['lead_id'],'business_name':o['business_name'],'template_id':'',
            'send_status':'queued','delivery_status':'pending','open_status':'none','reply_status':'none','positive_reply':'no','unsubscribe':'no','complaint':'no','bounce_type':'none','suppressed':'no',
            'send_window_start':'09:00','send_window_end':'17:00','timezone':'America/Los_Angeles','gate_lock':'manual_approval_required','dispatch_lock':'true','auto_send_enabled':'false',
            'followup_24h_at':o['followup_24h_at'],'followup_72h_at':o['followup_72h_at'],'followup_7d_at':o['followup_7d_at'],
            'notes':f'asset={asset_file};approval=pending_main_agent_approval;verification=pending_contact_enrichment'
        })

print('APPENDED',len(new_objs))
