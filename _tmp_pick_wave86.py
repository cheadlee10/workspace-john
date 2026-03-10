import glob,os,re,json

def slugify(s):
    s=s.lower().replace('&',' and ').replace('/',' ').replace("'",'')
    return re.sub(r'[^a-z0-9]+','-',s).strip('-')

def split_json_objects(s):
    objs=[]
    depth=0
    start=None
    in_str=False
    esc=False
    for i,ch in enumerate(s):
        if in_str:
            if esc:
                esc=False
            elif ch=='\\':
                esc=True
            elif ch=='"':
                in_str=False
            continue
        else:
            if ch=='"':
                in_str=True
                continue
            if ch=='{':
                if depth==0:
                    start=i
                depth+=1
            elif ch=='}' and depth>0:
                depth-=1
                if depth==0 and start is not None:
                    objs.append(s[start:i+1])
                    start=None
    return objs

existing=set()
for w in glob.glob('sites/premium-v3-wave*'):
    if os.path.isdir(w):
        for name in os.listdir(w):
            if os.path.isdir(os.path.join(w,name)):
                existing.add(name)

rows=[]
with open('leads.jsonl',encoding='utf-8') as f:
    for line in f:
        for js in split_json_objects(line):
            d=json.loads(js)
            if not str(d.get('id','')).startswith('wave6-'):
                continue
            slug=slugify(f"{d.get('client','')} {d.get('location','')}")
            if d.get('status')=='new' and slug not in existing:
                rows.append({
                    'estimated_value': d.get('estimated_value',0),
                    'id': d.get('id'),
                    'service': d.get('service'),
                    'client': d.get('client'),
                    'location': d.get('location'),
                    'slug': slug,
                    'score': d.get('score')
                })
rows.sort(key=lambda x:(x['estimated_value'], x.get('score') or 0), reverse=True)
print('count',len(rows))
for r in rows[:30]:
    print(r)
