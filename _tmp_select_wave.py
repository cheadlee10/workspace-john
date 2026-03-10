import json, pathlib, re
root=pathlib.Path(r'C:\Users\chead\.openclaw\workspace-john')
b=(root/'covered_slugs.txt').read_bytes()
if b.startswith(b'\xff\xfe') or b.startswith(b'\xfe\xff'):
    txt=b.decode('utf-16')
else:
    txt=b.decode('utf-8','ignore')
covered=set(s.strip() for s in txt.splitlines() if s.strip())
print('covered',len(covered))

def norm(t): return re.sub(r'[^a-z0-9]+','-',t.lower()).strip('-')
rows=[]
for line in (root/'outreach_queue.jsonl').open(encoding='utf-8'):
    if not line.strip(): continue
    o=json.loads(line)
    slug=o.get('site_slug') or o.get('slug') or ''
    if not slug:
        cl=norm(o.get('client',''))
        loc=(o.get('location') or '').lower()
        m=re.search(r'([a-z .]+),\s*([a-z]{2})',loc)
        citystate=f"-{norm(m.group(1))}-{m.group(2)}" if m else ''
        slug=cl+citystate
    if slug in covered: continue
    tier=o.get('priority_tier')
    if not tier: continue
    ps=o.get('priority_score',-1)
    ev=o.get('estimated_value',0)
    rows.append({
        'tier':tier,'score':ps,'ev':ev,'slug':slug,'client':o.get('client'),'id':o.get('id'),'phone':o.get('phone'),'email':o.get('email'),'service':o.get('service'),'location':o.get('location')
    })
print('uncovered tiered',len(rows))
p1=[r for r in rows if r['tier']=='P1']
p1.sort(key=lambda r:(r['score'],r['ev']), reverse=True)
for r in p1[:15]:
    print(r)
