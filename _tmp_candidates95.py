import json, re, glob, os, unicodedata
rows=[]
with open('outreach_queue.jsonl','r',encoding='utf-8') as f:
  for ln in f:
    ln=ln.strip();
    if not ln: continue
    try: rows.append(json.loads(ln))
    except: pass
print('rows',len(rows))
print('sample keys',sorted(rows[0].keys()))

def slugify(name, location=''):
  s=(name+' '+location).lower()
  s=unicodedata.normalize('NFKD',s).encode('ascii','ignore').decode('ascii')
  s=re.sub(r'[^a-z0-9]+','-',s).strip('-')
  s=re.sub(r'-+','-',s)
  return s
covered=set(os.path.basename(os.path.dirname(p)) for p in glob.glob('sites/premium-v3-wave*/*/index.html'))

c=[]
for r in rows:
  name=r.get('business_name') or r.get('client') or r.get('name') or ''
  loc=r.get('location') or ''
  slug=r.get('slug') or r.get('business_slug') or slugify(name,loc)
  est=float(r.get('estimated_value') or 0)
  if not name: continue
  c.append((est,slug,r))
c.sort(reverse=True,key=lambda x:x[0])
for est,slug,r in c[:40]:
  print(int(est), 'covered' if slug in covered else 'open', r.get('id'), r.get('business_name') or r.get('client') or r.get('name'),'|',r.get('location'),'|',r.get('service'),'|',slug)
