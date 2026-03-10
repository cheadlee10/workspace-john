import json
from pathlib import Path
ids=['wave3-017','wave3-018','wave3-019','wave3-020','wave3-021','wave3-022','wave3-024','wave3-025','wave3-026','wave3-027']
want=set(ids)
for line in Path(r'C:/Users/chead/.openclaw/workspace-john/leads.jsonl').open(encoding='utf-8'):
    d=json.loads(line)
    if d.get('id') in want:
        print('ID',d['id'])
        for k in ['client','service','city','state','location','phone','status','notes']:
            if k in d:
                print(f'{k}: {d.get(k)}')
        print('---')
