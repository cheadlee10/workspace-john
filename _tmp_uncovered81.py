import json,glob,os,re

def slugify(s):
    s=s.lower().replace('&',' and ').replace('/',' ').replace("'",'')
    s=re.sub(r'[^a-z0-9]+','-',s).strip('-')
    return s

existing=set()
for w in glob.glob('sites/premium-v3-wave*'):
    if os.path.isdir(w):
        for name in os.listdir(w):
            p=os.path.join(w,name)
            if os.path.isdir(p):
                existing.add(name)

rows=[]
with open('leads.jsonl',encoding='utf-8') as f:
    for line in f:
        if '"id":"wave6-' not in line:
            continue
        d=json.loads(line)
        slug=slugify(f"{d['client']} {d.get('location','')}")
        d['slug']=slug
        d['exists']=slug in existing
        rows.append(d)

cand=[r for r in rows if (not r['exists']) and r.get('status')=='new']
cand.sort(key=lambda x:x.get('estimated_value',0), reverse=True)
for r in cand[:30]:
    print(r['id'],r['estimated_value'],r['service'],'|',r['client'],'|',r['location'],'|',r['slug'])
print('total uncovered',len(cand),'of',len(rows))
