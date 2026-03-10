import json,re
from pathlib import Path

def slugify(s):
    s=(s or '').lower().replace('&',' and ')
    s=re.sub(r'[^a-z0-9]+','-',s)
    return re.sub(r'-+','-',s).strip('-')

def city_state(loc):
    loc=loc or ''
    m=re.search(r'([A-Za-z .\'-]+),\s*([A-Z]{2})\b',loc)
    if m: return m.group(1).strip(),m.group(2)
    parts=[p.strip() for p in loc.split(',') if p.strip()]
    if len(parts)>=2:
        st=re.search(r'\b([A-Z]{2})\b',parts[-1])
        return parts[0], (st.group(1) if st else '')
    return parts[0] if parts else '', ''

root=Path('C:/Users/chead/.openclaw/workspace-john')
covered_ids=set()
for n in (root/'sites').glob('premium-v3-wave*/DEPLOYMENT_NOTES.md'):
    txt=n.read_text(encoding='utf-8',errors='ignore')
    covered_ids.update(re.findall(r'outreach ID:\s*([A-Za-z0-9-]+)',txt))

covered_slugs=set()
for p in (root/'sites').glob('premium-v3-wave*/*'):
    if p.is_dir(): covered_slugs.add(p.name)

rows=[]
for ln in open(root/'outreach_queue.jsonl',encoding='utf-8'):
    try:r=json.loads(ln)
    except:continue
    rid=r.get('id','')
    if rid in covered_ids: continue
    client=r.get('client','')
    city,st=city_state(r.get('location',''))
    slug='-'.join([x for x in [slugify(client),slugify(city),slugify(st)] if x])
    if slug in covered_slugs: continue
    t=r.get('priority_tier','')
    s=float(r.get('priority_score',0) or 0)
    e=float(r.get('estimated_value',0) or 0)
    rows.append((t,s,e,slug,rid,r,city,st))

rows.sort(key=lambda x: ((x[0]!='P1'),-x[1],-x[2]))
for t,s,e,slug,rid,r,city,st in rows[:15]:
    print(f"{rid}|{slug}|{t}|{int(s)}|{int(e)}|{r.get('service')}|{r.get('client')}|{city},{st}|{r.get('phone')}|{r.get('email')}")
print('covered_ids',len(covered_ids))
