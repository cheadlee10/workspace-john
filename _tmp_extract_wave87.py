import json
from pathlib import Path
root=Path(r'C:/Users/chead/.openclaw/workspace-john')
ids={'wave4-106','wave4-112','wave4-107','wave4-113','sprint-20260303-030'}
with open(root/'leads.jsonl','r',encoding='utf-8') as f:
    for line in f:
        if not line.strip():
            continue
        try:r=json.loads(line)
        except:continue
        if r.get('id') in ids:
            print(json.dumps(r,ensure_ascii=False))
