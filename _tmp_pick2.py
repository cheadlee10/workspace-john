import json, pathlib, re
root=pathlib.Path(r'C:\Users\chead\.openclaw\workspace-john')
# read covered list
b=(root/'covered_slugs.txt').read_bytes(); txt=b.decode('utf-16') if b[:2] in (b'\xff\xfe',b'\xfe\xff') else b.decode('utf-8','ignore')
covered=set(s.strip() for s in txt.splitlines() if s.strip())
# existing premium slug names
existing=set()
for w in (root/'sites').glob('premium-v3-wave*'):
    if w.is_dir():
        for d in w.iterdir():
            if d.is_dir(): existing.add(d.name)

def norm(t): return re.sub(r'[^a-z0-9]+','-',t.lower()).strip('-')

def is_covered(slug):
    if slug in covered or slug in existing:
        return True
    # relaxed match: strip trailing city-state token when possible
    parts=slug.split('-')
    base='-'.join(parts[:-2]) if len(parts)>3 and len(parts[-1])==2 else slug
    for s in covered|existing:
        if s==base or s.startswith(base+'-') or base.startswith(s+'-'):
            return True
    return False

rows=[]
for line in (root/'outreach_queue.jsonl').open(encoding='utf-8'):
    if not line.strip(): continue
    o=json.loads(line)
    if o.get('priority_tier')!='P1': continue
    slug=o.get('site_slug') or o.get('slug')
    if not slug:
        cl=norm(o.get('client','')); loc=(o.get('location') or '').lower(); m=re.search(r'([a-z .]+),\s*([a-z]{2})',loc)
        slug=cl+(f"-{norm(m.group(1))}-{m.group(2)}" if m else '')
    if is_covered(slug):
        continue
    rows.append((o.get('priority_score',-1),o.get('estimated_value',0),slug,o.get('client'),o.get('id'),o.get('phone'),o.get('email'),o.get('service'),o.get('location')))
rows.sort(key=lambda x:(x[0],x[1]), reverse=True)
for r in rows[:20]: print(r)
print('count',len(rows))
