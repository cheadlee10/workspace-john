import json
from pathlib import Path
p=Path(r'C:\Users\chead\.openclaw\workspace-john\leads.jsonl')
rows=[]
for line in p.open(encoding='utf-8', errors='ignore'):
    line=line.strip()
    if not line:
        continue
    try:
        d=json.loads(line)
    except Exception:
        continue
    if d.get('status')!='new':
        continue
    phone=d.get('phone') or d.get('phone_normalized')
    if not phone:
        continue
    if d.get('outreach_usable') is False:
        continue
    rows.append(d)

rows.sort(key=lambda d:(-(d.get('estimated_value') or 0), d.get('id','')))
for d in rows[:80]:
    loc=d.get('location') or ((d.get('city') or '') + ', ' + (d.get('state') or ''))
    print(f"{d.get('id')} | {d.get('client')} | {d.get('service')} | ${d.get('estimated_value')} | {loc} | {d.get('phone') or d.get('phone_normalized')}")
print('count',len(rows))
