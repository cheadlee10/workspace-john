import json, re, pathlib
root=pathlib.Path('C:/Users/chead/.openclaw/workspace-john')
leads=[json.loads(l) for l in open(root/'nosite_top20_leads.jsonl',encoding='utf-8') if l.strip()]
existing=set()
for w in (root/'sites').glob('premium-v3-wave*'):
    if w.is_dir():
        for d in w.iterdir():
            if d.is_dir():
                existing.add(d.name)

def slug(s):
    s=s.lower()
    s=re.sub(r'[^a-z0-9]+','-',s).strip('-')
    s=re.sub(r'-+','-',s)
    return s

for lead in leads:
    city=lead['city'].split('/')[0].strip()
    cand=f"{slug(lead['business_name'])}-{slug(city)}"
    status='COVERED' if cand in existing else 'NEW'
    print(f"{lead['id']} p{lead['priority']} {status} {cand}")
