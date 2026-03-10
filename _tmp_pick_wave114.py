import json,re
from pathlib import Path
root=Path(r"C:/Users/chead/.openclaw/workspace-john")
existing={p.name for p in root.glob('sites/premium-v3-wave*/*') if p.is_dir()}

def slug(s):
    return re.sub(r'-+','-',re.sub(r'[^a-z0-9]+','-',s.lower()).strip('-'))

rows=[]
for line in open(root/'outreach_queue.jsonl',encoding='utf-8'):
    if not line.strip():
        continue
    j=json.loads(line)
    s=slug(f"{j.get('client','')} {j.get('location','')}")
    if s in existing:
        continue
    rows.append((j.get('priority_score',0),j.get('estimated_value',0),j.get('id',''),j.get('client',''),j.get('location',''),j.get('service',''),s))

rows.sort(key=lambda x:(-x[0],-x[1],x[2]))
for r in rows[:20]:
    print(r)
