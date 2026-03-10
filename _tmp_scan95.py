import json,glob,os
covered=set()
for p in glob.glob('sites/premium-v3-wave*/*/index.html'):
    covered.add(os.path.basename(os.path.dirname(p)))
print('covered count',len(covered))
rows=[]
with open('outreach_queue.jsonl','r',encoding='utf-8') as f:
    for line in f:
        line=line.strip()
        if not line: continue
        try: rows.append(json.loads(line))
        except: pass
print('rows',len(rows))
cands=[]
for r in rows:
    slug=r.get('slug') or r.get('business_slug') or r.get('site_slug')
    if not slug or slug in covered: continue
    est=r.get('estimated_value') or r.get('est') or r.get('value') or 0
    tags=' '.join(map(str,r.get('tags',[]))) if isinstance(r.get('tags'),list) else str(r.get('tags',''))
    txt=(' '.join(str(r.get(k,'')) for k in ['intent','priority','status','notes','service','segment'])+' '+tags).lower()
    hi=('high intent' in txt) or ('p1' in txt) or ('urgent' in txt)
    cands.append((1 if hi else 0,float(est or 0),r))
cands.sort(key=lambda t:(t[0],t[1]), reverse=True)
print('uncovered candidates',len(cands))
for hi,est,r in cands[:25]:
    print(hi,est,r.get('id'),r.get('business_name') or r.get('client') or r.get('name'),r.get('location'),r.get('service'),r.get('slug') or r.get('business_slug'))
