import json,re
from pathlib import Path
root=Path(r'C:/Users/chead/.openclaw/workspace-john')
sites=root/'sites'
used_ids=set()
used_slugs=set()
for p in sites.glob('premium-v3-wave*/DEPLOYMENT_NOTES.md'):
    txt=p.read_text(encoding='utf-8',errors='ignore')
    for m in re.findall(r'outreach ID:\s*([a-z0-9-]+)', txt, flags=re.I):
        used_ids.add(m)
    for m in re.findall(r'`([a-z0-9-]+)` \(est\.', txt):
        used_slugs.add(m)
print('used_ids',len(used_ids),'used_slugs',len(used_slugs))
rows=[]
for line in (root/'outreach_queue.jsonl').read_text(encoding='utf-8',errors='ignore').splitlines():
    if not line.strip():
        continue
    try:r=json.loads(line)
    except:continue
    rows.append(r)

def slugify(s):
    s=s.lower()
    s=re.sub(r'[^a-z0-9]+','-',s).strip('-')
    s=re.sub(r'-+','-',s)
    return s

cand=[]
for r in rows:
    oid=str(r.get('id','')).strip()
    if not oid or oid in used_ids:
        continue
    client=r.get('client') or ''
    loc=r.get('location') or ''
    city=''
    state=''
    if ',' in loc:
        parts=[x.strip() for x in loc.split(',')]
        if len(parts)>=2:
            city=parts[0]
            state=parts[1].split()[0]
    slug=slugify('-'.join([client,city,state]).strip('-'))
    if slug in used_slugs:
        continue
    est=float(r.get('estimated_value') or 0)
    tier=r.get('priority_tier') or ''
    score=int(r.get('priority_score') or 0)
    cand.append({
        'id':oid,'client':client,'location':loc,'phone':r.get('phone',''),'service':r.get('service',''),
        'estimated_value':est,'priority_tier':tier,'priority_score':score,'slug':slug
    })

def tr(t):
    return {'P1':3,'P2':2,'P3':1}.get(str(t).upper(),0)

cand.sort(key=lambda x:(tr(x['priority_tier']), x['priority_score'], x['estimated_value']), reverse=True)
for c in cand[:20]:
    print(json.dumps(c,ensure_ascii=False))
