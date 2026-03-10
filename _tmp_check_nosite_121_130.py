import json
from pathlib import Path
p = Path(r'C:/Users/chead/.openclaw/workspace-john/leads.jsonl')
ids = [f'nosite-{i}' for i in range(121,131)]
found = {}
with p.open(encoding='utf-8') as f:
    for line in f:
        try:
            d = json.loads(line)
        except Exception:
            continue
        if d.get('id') in ids:
            found[d['id']] = d
for i in ids:
    d = found.get(i)
    if not d:
        print(i, 'MISSING')
    else:
        print(i, d.get('client'), '|', d.get('service'), '|', d.get('source'))
