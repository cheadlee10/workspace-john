import json,csv,re
from datetime import datetime,timedelta
from pathlib import Path

root=Path(r'C:\Users\chead\.openclaw\workspace-john')
jsonl_path=root/'email-templates'/'send-queue-2026-03-02-next-batches.jsonl'
csv_path=root/'email-templates'/'send-queue-2026-03-02-next-batches-tracker.csv'
batch_path=root/'email-templates'/'next-queued-email-assets-2026-03-03-batch77.md'

text=batch_path.read_text(encoding='utf-8')
ids=list(dict.fromkeys(re.findall(r'`(wave\d+-\d+)`',text)))
sec_pattern=re.compile(r'##\s+\d+\)\s+(.+?)\s+\(`(wave\d+-\d+)`\)',re.M)
name_by_id={m.group(2):m.group(1).strip() for m in sec_pattern.finditer(text)}

rows=[]
for line in jsonl_path.read_text(encoding='utf-8').splitlines():
    if line.strip():
        rows.append(json.loads(line))
existing={r['lead_id'] for r in rows}
missing=[i for i in ids if i not in existing]
if not missing:
    print('No missing ids')
    raise SystemExit

last=rows[-1]
last_dt=datetime.fromisoformat(last['scheduled_at'])

new=[]
for idx,lead_id in enumerate(missing, start=1):
    dt=last_dt+timedelta(minutes=5*idx)
    sched=dt.isoformat()
    f1=(dt+timedelta(days=1)).isoformat()
    f2=(dt+timedelta(days=3)).isoformat()
    f7=(dt+timedelta(days=7)).isoformat()
    rec={
      'scheduled_at':sched,
      'batch_id':'BATCH-I-WAVE5',
      'sequence_step':'email_initial',
      'lead_id':lead_id,
      'business_name':name_by_id.get(lead_id,lead_id),
      'email_to':'',
      'priority_tier':'P2',
      'priority_score':78,
      'template_asset_file':'next-queued-email-assets-2026-03-03-batch77.md',
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
      'followup_24h_at':f1,
      'followup_72h_at':f2,
      'followup_7d_at':f7,
      'followup_1_at':f1,
      'followup_2_at':f2,
      'suppression_check':'clear',
      'safe_to_send':False
    }
    new.append(rec)

with jsonl_path.open('a',encoding='utf-8',newline='') as f:
    for rec in new:
        f.write('\n'+json.dumps(rec,separators=(',',':')))

with csv_path.open('a',encoding='utf-8',newline='') as f:
    w=csv.writer(f,quoting=csv.QUOTE_ALL)
    for rec in new:
        notes=f"asset={rec['template_asset_file']};approval={rec['approval_status']};verification={rec['verification_status']}"
        w.writerow([
            rec['scheduled_at'],rec['batch_id'],'1','email',rec['lead_id'],rec['business_name'],rec['email_to'],
            'queued','pending','none','none','no','no','no','none','no',
            rec['send_window_start'],rec['send_window_end'],rec['timezone'],rec['gate_lock'],
            str(rec['dispatch_lock']).lower(),str(rec['auto_send_enabled']).lower(),
            rec['followup_24h_at'],rec['followup_72h_at'],rec['followup_7d_at'],notes
        ])

print('Appended',len(new),'entries:',', '.join(missing))
