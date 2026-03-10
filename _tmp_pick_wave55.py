import json,re
from pathlib import Path
root=Path(r'C:/Users/chead/.openclaw/workspace-john')

existing=set()
for p in (root/'sites').iterdir():
    if not p.is_dir():
        continue
    if p.name.startswith('premium-v3-wave'):
        for d in p.iterdir():
            if d.is_dir():
                existing.add(d.name.lower())
    else:
        existing.add(p.name.lower())

covered_text=(root/'covered_slugs.txt').read_bytes().decode('utf-16',errors='ignore')
covered=set(s.strip().lower() for s in covered_text.splitlines() if s.strip())
all_known=existing|covered

def slugify(s):
    s=s.lower()
    s=re.sub(r'[^a-z0-9]+','-',s).strip('-')
    s=re.sub(r'-+','-',s)
    return s

def city_state(loc):
    if not loc:
        return ''
    parts=[x.strip() for x in loc.split(',') if x.strip()]
    if len(parts)>=2:
        st=parts[1].split()[0]
        return f"{parts[0]} {st}"
    return parts[0]

def is_covered(slug):
    if slug in all_known:
        return True
    for k in all_known:
        if slug.startswith(k) or k.startswith(slug):
            return True
    return False

cands=[]
for line in (root/'leads.jsonl').open(encoding='utf-8'):
    d=json.loads(line)
    if not d.get('phone'):
        continue
    if not d.get('outreach_usable',True):
        continue
    cid=d.get('id','')
    if cid.startswith('wave3-'):
        continue
    client=d.get('client') or ''
    loc=d.get('location') or ''
    slug=slugify(f"{client} {city_state(loc)}")
    if not slug or is_covered(slug):
        continue
    val=d.get('estimated_value') or 0
    notes=(d.get('notes') or '').lower()
    intent=0
    for k,w in [('high value',4),('highest value',6),('same day',4),('today',3),('urgent',3),('licensed',2),('insured',2),('years',2),('review',2),('no website',2),('phone-only',2),('veteran',2),('master',2),('40 years',4),('36 years',4),('15+ years',3),('20+ years',3),('24/7',3)]:
        if k in notes:
            intent += w
    cands.append((-(val),-intent,slug,d))

cands.sort()
print('candidates',len(cands))
for val,intent,slug,d in cands[:30]:
    print(f"{slug}|${-val}|intent{-intent}|{d.get('id')}|{d.get('client')}|{d.get('service')}|{d.get('location')}|{d.get('phone')}")
