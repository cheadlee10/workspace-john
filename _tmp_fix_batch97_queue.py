import json, csv, re
from pathlib import Path
from datetime import datetime, timedelta

root=Path(r'C:/Users/chead/.openclaw/workspace-john')
jsonl_path=root/'email-templates/send-queue-2026-03-02-next-batches.jsonl'
csv_path=root/'email-templates/send-queue-2026-03-02-next-batches-tracker.csv'
batch_md=root/'email-templates/next-queued-email-assets-2026-03-03-batch97.md'
asset='next-queued-email-assets-2026-03-03-batch97.md'

text=batch_md.read_text(encoding='utf-8',errors='ignore')
pairs=re.findall(r'^##\s+\d+\)\s+(.+?)\s+\(`(nosite-\d+)`\)', text, flags=re.M)
lead_names={lid:name.strip() for name,lid in pairs}
ids=[f'nosite-{i:03d}' for i in range(31,41)]

existing=[]
max_dt=None
existing_ids=set()
for line in jsonl_path.read_text(encoding='utf-8',errors='ignore').splitlines():
    line=line.strip()
    if not line: continue
    try:
        obj=json.loads(line)
    except:
        continue
    existing.append(obj)
    lid=obj.get('lead_id')
    if lid: existing_ids.add(lid)
    s=obj.get('scheduled_at')
    if s:
        try:
            dt=datetime.fromisoformat(s)
            if max_dt is None or dt>max_dt: max_dt=dt
        except:
            pass

missing=[lid for lid in ids if lid not in existing_ids]
if not missing:
    print('No missing IDs')
    raise SystemExit

if max_dt is None:
    raise RuntimeError('Could not determine max scheduled_at')

rows=[]
for i,lid in enumerate(missing, start=1):
    sched=max_dt + timedelta(minutes=5*i)
    obj={
      'scheduled_at': sched.isoformat(),
      'batch_id':'BATCH-K-WAVE6',
      'sequence_step':'email_initial',
      'lead_id':lid,
      'business_name':lead_names.get(lid,''),
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
      'followup_24h_at':(sched+timedelta(days=1)).isoformat(),
      'followup_72h_at':(sched+timedelta(days=3)).isoformat(),
      'followup_7d_at':(sched+timedelta(days=7)).isoformat(),
      'followup_1_at':(sched+timedelta(days=1)).isoformat(),
      'followup_2_at':(sched+timedelta(days=3)).isoformat(),
      'suppression_check':'clear',
      'safe_to_send':False
    }
    rows.append(obj)

with jsonl_path.open('a',encoding='utf-8',newline='') as f:
    for r in rows:
        f.write(json.dumps(r, ensure_ascii=False)+"\n")

# append csv rows
with csv_path.open('r',encoding='utf-8',newline='') as f:
    reader=csv.DictReader(f)
    fieldnames=reader.fieldnames

if not fieldnames:
    raise RuntimeError('No CSV headers found')

with csv_path.open('a',encoding='utf-8',newline='') as f:
    w=csv.DictWriter(f, fieldnames=fieldnames)
    for r in rows:
        w.writerow({
          'scheduled_at':r['scheduled_at'],
          'batch_id':'BATCH-K-WAVE6',
          'step_number':'1',
          'channel':'email',
          'lead_id':r['lead_id'],
          'business_name':r['business_name'],
          'email_to':'',
          'queue_status':'queued',
          'approval_status':'pending',
          'sent_at':'none',
          'delivery_status':'none',
          'opened':'no',
          'clicked':'no',
          'replied':'no',
          'bounce_type':'none',
          'unsubscribed':'no',
          'send_window_start':'09:00',
          'send_window_end':'17:00',
          'timezone':'America/Los_Angeles',
          'gate_lock':'manual_approval_required',
          'dispatch_lock':'true',
          'auto_send_enabled':'false',
          'followup_1_at':r['followup_1_at'],
          'followup_2_at':r['followup_2_at'],
          'followup_7d_at':r['followup_7d_at'],
          'notes':f"asset={asset};approval=pending_main_agent_approval;verification=pending_contact_enrichment"
        })

print('Appended IDs:', ', '.join(missing))
print('From', (max_dt+timedelta(minutes=5)).isoformat(), 'to', rows[-1]['scheduled_at'])
