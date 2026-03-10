import json,glob,os,re
root=r'C:/Users/chead/.openclaw/workspace-john'

def slugify(s):
    return re.sub(r'[^a-z0-9]+','-',(s or '').lower()).strip('-')

def city_state(loc):
    m=re.search(r'([^,]+),\s*([A-Za-z]{2})',loc or '')
    if m:
        return m.group(1).strip(),m.group(2).upper()
    return (loc or 'Local Market'),'US'

covered=set()
for d in glob.glob(root+'/sites/premium-v3-wave*'):
    for name in os.listdir(d):
        if os.path.isdir(os.path.join(d,name)):
            covered.add(name)

items=[]
with open(root+'/outreach_queue.jsonl',encoding='utf-8') as f:
    for line in f:
        if line.strip():
            items.append(json.loads(line))

for o in items:
    c,st=city_state(o.get('location',''))
    o['calc_slug']=o.get('site_slug') or f"{slugify(o.get('client',''))}-{slugify(c)}-{st.lower()}"

cand=[o for o in items if o.get('priority_tier')=='P1' and o['calc_slug'] not in covered]
cand.sort(key=lambda x:(-(x.get('priority_score') or 0),-(x.get('estimated_value') or 0)))
for o in cand[:15]:
    print(o['id'],o['calc_slug'],o.get('priority_score'),o.get('estimated_value'),o.get('service'))
