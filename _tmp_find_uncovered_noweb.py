import json, re, os

def slug(s):
    s = s.lower().replace('&', ' and ')
    s = re.sub(r'[^a-z0-9]+', '-', s)
    return re.sub(r'-+', '-', s).strip('-')

dirs = set()
for root, subdirs, files in os.walk('sites'):
    dirs.update(subdirs)

out=[]
with open('leads_nowebsite.jsonl',encoding='utf-8') as f:
    for line in f:
        if not line.strip():
            continue
        l=json.loads(line)
        city=l.get('city','')
        state=l.get('state','')
        loc=f"{city}, {state}".strip(', ')
        s=slug(f"{l.get('business_name','')}-{loc}")
        if s and s not in dirs:
            out.append({'id':l.get('id'),'business_name':l.get('business_name'),'category':l.get('category'),'city':city,'state':state,'slug':s,'notes':l.get('notes','')})

seen=set(); uniq=[]
for o in out:
    if o['slug'] not in seen:
        seen.add(o['slug']); uniq.append(o)

print('uncovered_noweb',len(uniq))
for o in uniq[:80]:
    print(json.dumps(o))
