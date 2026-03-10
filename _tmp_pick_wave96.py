import json,glob,os,re
base=r'C:\Users\chead\.openclaw\workspace-john'
existing=set()
for w in glob.glob(os.path.join(base,'sites','premium-v3-wave*')):
    if os.path.isdir(w):
        for name in os.listdir(w):
            p=os.path.join(w,name)
            if os.path.isdir(p):
                existing.add(name.lower())

def slugify(s):
    s=s.lower()
    s=re.sub(r'[^a-z0-9]+','-',s)
    s=re.sub(r'-+','-',s).strip('-')
    return s

rows=[]
with open(os.path.join(base,'outreach_queue.jsonl'),encoding='utf-8') as f:
    for line in f:
        if not line.strip():
            continue
        o=json.loads(line)
        slug=slugify(f"{o.get('client','')} {o.get('location','')}")
        covered=slug in existing
        rows.append((covered,o.get('priority_score',0),o.get('estimated_value',0),o.get('id'),o.get('client'),o.get('location'),o.get('service'),slug,o.get('priority_tier')))

un=[r for r in rows if not r[0]]
un.sort(key=lambda x:(x[1],x[2]), reverse=True)
for r in un[:30]:
    print(r[3],r[1],r[2],r[8],r[4],'|',r[5],'|',r[6],'|',r[7])
print('uncovered',len(un),'total',len(rows))
