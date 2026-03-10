import json,glob,os,re

def slugify(s):
    s=s.lower()
    s=re.sub(r'[^a-z0-9]+','-',s)
    s=re.sub(r'-+','-',s).strip('-')
    return s

existing=set()
for d in glob.glob('sites/premium-v3-wave*'):
    if os.path.isdir(d):
        for c in os.listdir(d):
            p=os.path.join(d,c)
            if os.path.isdir(p):
                existing.add(c)

rows=[]
with open('outreach_queue.jsonl',encoding='utf-8') as f:
    for line in f:
        if not line.strip():
            continue
        j=json.loads(line)
        slug=slugify(f"{j.get('client','')} {j.get('location','')}")
        if slug in existing:
            continue
        rows.append((j.get('priority_score',0),j.get('estimated_value',0),slug,j))

rows.sort(key=lambda x:(x[0],x[1]),reverse=True)
for p,v,slug,j in rows[:20]:
    print(f"{p}\t{v}\t{j.get('id')}\t{slug}\t{j.get('client')}\t{j.get('location')}\t{j.get('service')}")
