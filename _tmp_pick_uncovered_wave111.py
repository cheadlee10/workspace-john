import json,re
from pathlib import Path

existing={p.name for w in Path('sites').glob('premium-v3-wave*') if w.is_dir() for p in w.iterdir() if p.is_dir()}

def slug(x:str)->str:
    x=x.lower().replace('&',' and ').replace("'","")
    return re.sub(r'[^a-z0-9]+','-',x).strip('-')

rows=[]
for ln in open('leads_nosite_hunt.jsonl',encoding='utf-8'):
    if not ln.strip():
        continue
    d=json.loads(ln)
    s=f"{slug(d['business_name'])}-{slug(d['city'])}"
    yrs=d.get('years_established','')
    try:
        y=int(yrs)
    except:
        y=3000
    score=(0 if d.get('contact_phone') else 1, y)
    rows.append((score,d['id'],d['business_name'],d['city'],d.get('service_type',''),yrs,s, s in existing))

new=[r for r in rows if not r[-1]]
new.sort(key=lambda r:r[0])
print('new count',len(new))
for r in new[:40]:
    print(f"{r[1]} | {r[2]} | {r[3]} | {r[4]} | est {r[5]} | {r[6]}")
