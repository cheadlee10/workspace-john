import json
from pathlib import Path
p = Path(r'C:\Users\chead\.openclaw\workspace-john\leads.jsonl')
rows = []
for line in p.read_text(encoding='utf-8').splitlines():
    line = line.strip()
    if not line:
        continue
    try:
        o = json.loads(line)
    except Exception:
        continue
    i = o.get('id','')
    if i.startswith('nosite-'):
        try:
            n = int(i.split('-')[1])
        except Exception:
            continue
        if 51 <= n <= 60:
            rows.append(o)
rows.sort(key=lambda o: int(o['id'].split('-')[1]))
for o in rows:
    print(f"{o.get('id')}|{o.get('client')}|{o.get('service')}|{o.get('source')}|{o.get('status')}|{str(o.get('notes',''))[:180]}")
