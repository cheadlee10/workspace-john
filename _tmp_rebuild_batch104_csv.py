from pathlib import Path
import json
root=Path('.')
csvp=root/'email-templates'/'send-queue-2026-03-02-next-batches-tracker.csv'
jsonlp=root/'email-templates'/'send-queue-2026-03-02-next-batches.jsonl'
ids=[f'nosite-{i}' for i in range(101,111)]

lines=csvp.read_text(encoding='utf-8').splitlines()
header=lines[0]
body=[ln for ln in lines[1:] if not any(f'"{i}"' in ln for i in ids)]

# map names/schedule from jsonl authoritative
rows=[]
for ln in jsonlp.read_text(encoding='utf-8').splitlines():
    if not ln.strip():
        continue
    o=json.loads(ln)
    if o.get('lead_id') in ids:
        rows.append(o)
rows=sorted(rows,key=lambda o:o['lead_id'])

for o in rows:
    vals=[
        o['scheduled_at'],'BATCH-K-WAVE6','1','email',o['lead_id'],o['business_name'],'','queued','pending','none','none','no','no','no','none','no','09:00','17:00','America/Los_Angeles','manual_approval_required','true','false',o['followup_24h_at'],o['followup_72h_at'],o['followup_7d_at'],
        'asset=next-queued-email-assets-2026-03-03-batch104.md;approval=pending_main_agent_approval;verification=pending_contact_enrichment'
    ]
    body.append(','.join('"'+str(v).replace('"','""')+'"' for v in vals))

csvp.write_text('\n'.join([header]+body)+'\n',encoding='utf-8')
print('rebuilt rows',len(rows))
