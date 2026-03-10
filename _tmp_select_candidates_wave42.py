import json,re
from pathlib import Path

root=Path(r"C:/Users/chead/.openclaw/workspace-john")

existing=set()
for p in (root/'sites').iterdir():
    if not p.is_dir():
        continue
    if p.name.startswith('premium-v3-wave'):
        for d in p.iterdir():
            if d.is_dir(): existing.add(d.name)
    else:
        existing.add(p.name)

def slugify(s):
    s=s.lower()
    s=re.sub(r"[^a-z0-9]+","-",s).strip('-')
    return s

cands=[]
for fp in [root/'nosite_top20_leads.jsonl', root/'leads.jsonl']:
    with open(fp,encoding='utf-8') as f:
        for line in f:
            line=line.strip()
            if not line: continue
            try:d=json.loads(line)
            except: continue
            name=d.get('business_name') or d.get('client')
            city=d.get('city') or d.get('location','').split(',')[0]
            state=d.get('state')
            if not state:
                loc=d.get('city') or d.get('location','')
                m=re.search(r',\s*([A-Z]{2})\b',loc)
                state=m.group(1) if m else ''
            if not name: continue
            slug=slugify(name)
            if city: slug += '-' + slugify(city)
            if state: slug += '-' + state.lower()
            if slug in existing: continue
            val=d.get('estimated_value',0)
            pri=d.get('priority', 2)
            phone=d.get('contact_phone') or d.get('phone') or ''
            cands.append((pri,-val,slug,name,d.get('service_type') or d.get('service'),city,state,phone,d.get('id')))

# unique by slug keep best pri/value
best={}
for item in cands:
    slug=item[2]
    if slug not in best or item[:2] < best[slug][:2]:
        best[slug]=item

arr=sorted(best.values(), key=lambda x:(x[0],x[1]))
for it in arr[:30]:
    pri,nval,slug,name,svc,city,state,phone,_id=it
    print(f"{slug}|P{pri}|{ -nval }|{name}|{svc}|{city},{state}|{phone}|{_id}")
print('count',len(arr))
