import json,re
from pathlib import Path

root=Path('C:/Users/chead/.openclaw/workspace-john')
existing=set()
for d in (root/'sites').glob('premium-v3-wave*'):
    if d.is_dir():
        for c in d.iterdir():
            if c.is_dir():
                existing.add(c.name)

def slugify(s:str)->str:
    s=s.lower()
    s=re.sub(r'[^a-z0-9]+','-',s)
    s=re.sub(r'-+','-',s).strip('-')
    return s

cands=[]
with open(root/'outreach_queue.jsonl','r',encoding='utf-8') as f:
    for line in f:
        line=line.strip()
        if not line:
            continue
        try:
            o=json.loads(line)
        except Exception:
            continue
        client=(o.get('client') or '').strip()
        loc=(o.get('location') or '').strip()
        if not client or not loc:
            continue
        slug=slugify(f"{client} {loc}")
        if slug in existing:
            continue
        ps=o.get('priority_score') or 0
        ev=o.get('estimated_value') or 0
        cands.append((ps,ev,slug,o))

cands.sort(key=lambda x:(x[0],x[1]), reverse=True)
print('count',len(cands))
for ps,ev,slug,o in cands[:25]:
    print(f"{ps}\t{ev}\t{slug}\t{o.get('id')}\t{o.get('client')}\t{o.get('location')}\t{o.get('service')}")
