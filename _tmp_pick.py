import json,re
from pathlib import Path
base=Path('.').resolve()
existing=set()
for p in (base/'sites').glob('premium-v3-wave*'):
    if p.is_dir():
        for c in p.iterdir():
            if c.is_dir(): existing.add(c.name)

def slugify(s):
    s=s.lower().replace('&',' and ')
    s=re.sub(r'[^a-z0-9]+','-',s)
    return re.sub(r'-+','-',s).strip('-')
rows=[]
with open('leads.jsonl',encoding='utf-8',errors='ignore') as f:
    for n,line in enumerate(f,1):
        line=line.strip()
        if not line or not line.startswith('{'): continue
        try:j=json.loads(line)
        except: continue
        if isinstance(j.get('id'),str) and j['id'].startswith('wave6-') and j.get('status')=='new':
            loc=slugify(j.get('location','')); client=slugify(j.get('client',''))
            slug=client if client.endswith(loc) else (f"{client}-{loc}" if loc else client)
            j['_slug']=slug; j['_existing']=slug in existing; rows.append(j)
rows.sort(key=lambda x:x.get('estimated_value',0), reverse=True)
for r in rows[:40]:
    print(f"{r['id']} {r.get('estimated_value')} existing={r['_existing']} {r['_slug']}")
print('total',len(rows),'uncovered',sum(1 for r in rows if not r['_existing']))
