import re,csv,json
from pathlib import Path
from datetime import datetime,timedelta

root=Path(r'C:/Users/chead/.openclaw/workspace-john')
batch_file=root/'email-templates'/'next-queued-email-assets-2026-03-03-batch116.md'
jsonl_path=root/'email-templates'/'send-queue-2026-03-02-next-batches.jsonl'
csv_path=root/'email-templates'/'send-queue-2026-03-02-next-batches-tracker.csv'

text=batch_file.read_text(encoding='utf-8')
entries=[]
for m in re.finditer(r'^##\s+\d+\)\s+(.+?)\s+\(`(wave3-\d+)`\)',text,re.M):
    entries.append((m.group(2),m.group(1).strip()))

existing=set()
with jsonl_path.open(encoding='utf-8') as f:
    for line in f:
        line=line.strip()
        if not line: continue
        try: obj=json.loads(line)
        except: continue
        lid=obj.get('lead_id')
        if lid: existing.add(lid)

to_add=[(lid,biz) for lid,biz in entries if lid not in existing]
if not to_add:
    print('NOOP: all IDs already present')
    raise SystemExit(0)

last_dt=None
with jsonl_path.open(encoding='utf-8') as f:
    for line in f:
        line=line.strip()
        if not line: continue
        try: obj=json.loads(line)
        except: continue
        s=obj.get('scheduled_at')
        if not s: continue
        try: dt=datetime.fromisoformat(s)
        except: continue
        if last_dt is None or dt>last_dt:
            last_dt=dt
if last_dt is None:
    last_dt=datetime.fromisoformat('2026-03-05T09:00:00-08:00')

asset='next-queued-email-assets-2026-03-03-batch116.md'
batch_id='BATCH-P-WAVE10'
new_json=[]
for i,(lid,biz) in enumerate(to_add,1):
    sch=last_dt+timedelta(minutes=5*i)
    rec={
        'scheduled_at':sch.isoformat(),
        'batch_id':batch_id,
        'sequence_step':'email_initial',
        'lead_id':lid,
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
        'followup_24h_at':(sch+timedelta(hours=24)).isoformat(),
        'followup_72h_at':(sch+timedelta(hours=72)).isoformat(),
        'followup_7d_at':(sch+timedelta(days=7)).isoformat(),
        'followup_1_at':(sch+timedelta(hours=24)).isoformat(),
        'followup_2_at':(sch+timedelta(hours=72)).isoformat(),
        'suppression_check':'clear',
        'safe_to_send':False,
    }
    new_json.append(rec)

with jsonl_path.open('a',encoding='utf-8',newline='') as f:
    for rec in new_json:
        f.write(json.dumps(rec,separators=(',',':'))+'\n')

with csv_path.open(encoding='utf-8-sig',newline='') as f:
    reader=csv.DictReader(f)
    fieldnames=reader.fieldnames
if not fieldnames:
    raise RuntimeError('CSV headers missing')

rows=[]
for rec in new_json:
    rows.append({
        'timestamp':rec['scheduled_at'],
        'batch_id':rec['batch_id'],
        'day':'1',
        'channel':'email',
        'lead_id':rec['lead_id'],
        'business_name':rec['business_name'],
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
        'send_window_start':'09:00',
        'send_window_end':'17:00',
        'timezone':'America/Los_Angeles',
        'gate_lock':'manual_approval_required',
        'dispatch_lock':'true',
        'auto_send_enabled':'false',
        'followup_24h_at':rec['followup_24h_at'],
        'followup_72h_at':rec['followup_72h_at'],
        'followup_7d_at':rec['followup_7d_at'],
        'notes':f"asset={asset};approval=pending_main_agent_approval;verification=pending_contact_enrichment"
    })

with csv_path.open('a',encoding='utf-8',newline='') as f:
    w=csv.DictWriter(f,fieldnames=fieldnames,quoting=csv.QUOTE_ALL)
    for row in rows:
        w.writerow(row)

print(f'APPENDED_JSONL={len(new_json)}')
print(f'APPENDED_CSV={len(rows)}')
print('FIRST_SCHEDULED',new_json[0]['scheduled_at'])
print('LAST_SCHEDULED',new_json[-1]['scheduled_at'])
