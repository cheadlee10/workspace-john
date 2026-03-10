import json
from pathlib import Path
ids={'nosite-037','wa-google-002','nosite-109','sprint26-029','sprint26-028','sprint26-027','nosite-001','wa-google-001','wa-google-003','wa-google-007','wave4-044','wave4-013'}
p=Path(r'C:\Users\chead\.openclaw\workspace-john\leads.jsonl')
for line in p.open(encoding='utf-8',errors='ignore'):
    line=line.strip()
    if not line:
        continue
    try:
        d=json.loads(line)
    except Exception:
        continue
    if d.get('id') in ids:
        out={k:d.get(k) for k in ['id','date','source','client','service','estimated_value','phone','location','status','notes']}
        print(json.dumps(out,ensure_ascii=False))
