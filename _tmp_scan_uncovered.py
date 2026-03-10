import json,re
from pathlib import Path
root=Path(r'C:/Users/chead/.openclaw/workspace-john')
existing=set()
for p in (root/'sites').iterdir():
    if p.is_dir():
        if p.name.startswith('premium-v3-wave'):
            for d in p.iterdir():
                if d.is_dir():
                    existing.add(d.name)
        else:
            existing.add(p.name)

def slugify(s):
    s=s.lower()
    s=re.sub(r'[^a-z0-9]+','-',s).strip('-')
    s=re.sub(r'-+','-',s)
    return s

cands=[]
for line in (root/'leads.jsonl').open(encoding='utf-8'):
    d=json.loads(line)
    if not d.get('outreach_usable',True):
        continue
    if not d.get('phone'):
        continue
    client=d.get('client') or d.get('business_name') or ''
    loc=d.get('location') or d.get('city') or ''
    city_state=loc.split(',')[0:2]
    city='-'.join([x.strip() for x in city_state if x.strip()])
    slug=slugify(f"{client} {city}")
    if slug in existing:
        continue
    val=d.get('estimated_value') or 0
    notes=(d.get('notes') or '').lower()
    intent=0
    for k,w in [('same day',4),('urgent',3),('today',3),('24/7',3),('licensed',2),('insured',2),('years',2),('reviews',2),('high value',3),('no website',2),('quote',2),('phone-only',2),('master',2),('40 years',4)]:
        if k in notes:
            intent+=w
    cands.append((-(val),-intent,slug,d))

cands.sort()
print('count',len(cands))
for val,intent,slug,d in cands[:60]:
    print(f"{slug}|${-val}|intent{-intent}|{d.get('id')}|{d.get('client')}|{d.get('service')}|{d.get('location')}|{d.get('phone')}")
