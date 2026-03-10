import json,re
from pathlib import Path

def slug(s):
    s=(s or '').lower().replace('&',' and ')
    s=re.sub(r'[^a-z0-9]+','-',s)
    return re.sub(r'-+','-',s).strip('-')

def parse_many(text):
    dec=json.JSONDecoder()
    i=0
    n=len(text)
    out=[]
    while i<n:
        while i<n and text[i].isspace():
            i+=1
        if i>=n:
            break
        try:
            obj,j=dec.raw_decode(text,i)
            out.append(obj)
            i=j
        except Exception:
            i+=1
    return out

existing=set()
for p in Path('sites').glob('premium-v3-wave*/*'):
    if p.is_dir():
        existing.add(p.name)

text=Path('leads.jsonl').read_text(encoding='utf-8',errors='ignore')
leads=parse_many(text)
print('parsed',len(leads))

keywords=['emergency','urgent','same-day','same day','24/7','flood','leak','burst pipe','roof leak','water heater','sewer backup','fire damage','storm damage','mold','cleanup','repair']
rows=[]
for o in leads:
    if o.get('status')!='new':
        continue
    bn=o.get('business_name') or o.get('client') or ''
    service=o.get('service_type') or o.get('service') or ''
    notes=(o.get('notes') or '')
    loc=o.get('location','')
    city=o.get('city','')
    st=o.get('state','')
    if not city and loc:
        m=re.search(r'([A-Za-z .-]+),\s*([A-Z]{2})',loc)
        if m:
            city=m.group(1).strip()
            st=m.group(2)
    s=slug(f"{bn}-{city}-{st}")
    if not s or s in existing:
        continue
    txt=' '.join([bn,service,notes]).lower()
    ksum=sum(1 for k in keywords if k in txt)
    if ksum==0:
        continue
    val=o.get('estimated_value',0) or 0
    try: val=float(val)
    except: val=0
    rows.append((ksum,val,o.get('id',''),bn,city,st,service,notes,s))

rows.sort(key=lambda x:(x[0],x[1]), reverse=True)
print('candidates',len(rows))
for r in rows[:40]:
    print(json.dumps({'score':r[0],'value':r[1],'id':r[2],'business':r[3],'city':r[4],'state':r[5],'service':r[6],'slug':r[8],'notes':r[7][:140]}))
