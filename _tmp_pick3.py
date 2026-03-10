import json,re,pathlib
root=pathlib.Path(r'C:/Users/chead/.openclaw/workspace-john')
used=set()
for p in (root/'sites').glob('premium-v3-wave*/DEPLOYMENT_NOTES.md'):
    txt=p.read_text(encoding='utf-8',errors='ignore')
    used.update(re.findall(r'`([a-z0-9-]+)`',txt))

b=(root/'covered_slugs.txt').read_bytes()
txt=b.decode('utf-16') if b[:2] in (b'\xff\xfe',b'\xfe\xff') else b.decode('utf-8','ignore')
covered={s.strip() for s in txt.splitlines() if s.strip()}
existing={d.name for w in (root/'sites').glob('premium-v3-wave*') if w.is_dir() for d in w.iterdir() if d.is_dir()}

def norm(t):
    return re.sub(r'[^a-z0-9]+','-',(t or '').lower()).strip('-')

def mk(o):
    slug=o.get('site_slug') or o.get('slug') or ''
    if not slug:
        cl=norm(o.get('client',''))
        loc=(o.get('location') or '').lower()
        m=re.search(r'([a-z .]+),\s*([a-z]{2})',loc)
        slug=cl+(f"-{norm(m.group(1))}-{m.group(2)}" if m else '')
    return slug

def coveredish(slug):
    if slug in covered or slug in existing:
        return True
    parts=slug.split('-')
    base='-'.join(parts[:-2]) if len(parts)>3 and len(parts[-1])==2 else slug
    for s in covered|existing:
        if s==base or s.startswith(base+'-') or base.startswith(s+'-'):
            return True
    return False

rows=[]
for ln in (root/'outreach_queue.jsonl').read_text(encoding='utf-8').splitlines():
    if not ln.strip():
        continue
    o=json.loads(ln)
    if o.get('priority_tier')!='P1':
        continue
    slug=mk(o)
    if coveredish(slug):
        continue
    oid=o.get('id','')
    if oid in used:
        continue
    rows.append((o.get('priority_score',-1),o.get('estimated_value',0),slug,o.get('client'),oid,o.get('phone'),o.get('email'),o.get('service'),o.get('location')))
rows.sort(key=lambda x:(x[0],x[1]),reverse=True)
for r in rows[:20]:
    print(r)
print('count',len(rows))
