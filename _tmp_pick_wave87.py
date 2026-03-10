import json,glob,re
from pathlib import Path
root=Path(r'C:/Users/chead/.openclaw/workspace-john')
used=set()
for d in glob.glob(str(root/'sites'/'premium-v3-wave*')):
    for sub in Path(d).iterdir():
        if sub.is_dir():
            used.add(sub.name)
rows=[]
with open(root/'leads.jsonl','r',encoding='utf-8') as f:
    for line in f:
        line=line.strip()
        if not line:
            continue
        try:
            r=json.loads(line)
        except Exception:
            continue
        rows.append(r)

cand=[]
for r in rows:
    if str(r.get('status','')).lower()!='new':
        continue
    slug=r.get('site_slug') or r.get('slug')
    if not slug:
        b=(r.get('business_name') or r.get('client') or '').strip().lower()
        loc=(r.get('city') or r.get('location') or '').strip().lower()
        slug=re.sub(r'[^a-z0-9]+','-',(b+'-'+loc).strip('-'))
    if not slug or slug in used:
        continue
    ev=r.get('estimated_value') or r.get('value') or 0
    try:
        ev=float(ev)
    except Exception:
        ev=0
    intent=((r.get('service') or '')+' '+(r.get('notes') or '')+' '+(r.get('title') or '')+' '+(r.get('business_name') or '')).lower()
    score=ev
    if any(k in intent for k in ['emergency','urgent','same day','24/7','water heater','electric','plumbing','hvac','roof leak']):
        score+=80
    cand.append((score,ev,r,slug))

cand.sort(key=lambda x:(x[0],x[1]),reverse=True)
print('candidates',len(cand))
for sc,ev,r,slug in cand[:30]:
    print(f"{r.get('id')} | ev={ev:.0f} | score={sc:.0f} | slug={slug} | {(r.get('business_name') or r.get('client') or '')} | {r.get('location') or ''} | {r.get('service') or ''}")
