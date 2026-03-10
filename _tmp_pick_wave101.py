import json,glob,os,re

def slugify(s):
    s=s.lower()
    s=re.sub(r"[^a-z0-9]+","-",s)
    s=re.sub(r"-+","-",s).strip('-')
    return s

covered=set()
for d in glob.glob('sites/premium-v3-wave*'):
    if os.path.isdir(d):
        for name in os.listdir(d):
            p=os.path.join(d,name)
            if os.path.isdir(p):
                covered.add(name)

cands=[]
with open('outreach_queue.jsonl','r',encoding='utf-8') as f:
    for line in f:
        line=line.strip()
        if not line: continue
        try: o=json.loads(line)
        except: continue
        client=o.get('client') or o.get('business_name') or ''
        location=o.get('location') or ', '.join([x for x in [o.get('city'),o.get('state')] if x])
        if not client or not location: continue
        slug=slugify(f"{client} {location}")
        if slug in covered: continue
        pr=o.get('priority_score',0) or 0
        est=o.get('estimated_value',0) or 0
        industry=o.get('industry') or o.get('service') or o.get('segment') or 'Home Services'
        lead_id=o.get('id') or o.get('lead_id') or ''
        cands.append((pr,est,client,location,industry,lead_id,slug))

cands.sort(key=lambda x:(x[0],x[1]), reverse=True)
print('uncovered',len(cands))
for r in cands[:15]:
    print(r)
