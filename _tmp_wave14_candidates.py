import json, re
from pathlib import Path
root=Path(r'C:/Users/chead/.openclaw/workspace-john')
used=set()
for p in (root/'sites').glob('premium-v3-wave*/DEPLOYMENT_NOTES.md'):
    txt=p.read_text(encoding='utf-8', errors='ignore')
    used.update(re.findall(r'(gpass-us-\d+)', txt))
print('used_ids', len(used))
rows=[]
for line in (root/'outreach_queue.jsonl').read_text(encoding='utf-8', errors='ignore').splitlines():
    line=line.strip()
    if not line: continue
    try:
        r=json.loads(line)
    except Exception:
        continue
    rows.append(r)
print('queue_rows', len(rows))
c=[]
for r in rows:
    oid=(r.get('id') or r.get('outreach_id') or r.get('lead_id') or '').strip()
    if not oid or oid in used: continue
    est=r.get('estimated_value') or r.get('est_value') or 0
    if isinstance(est,str):
        try: est=float(est.replace('$','').replace(',','').strip())
        except Exception: est=0
    tier=str(r.get('tier') or r.get('priority') or '').strip()
    name=r.get('business_name') or r.get('name') or r.get('company') or ''
    phone=r.get('phone_e164') or r.get('phone') or ''
    city=r.get('city') or ''
    state=r.get('state') or ''
    slug=r.get('slug') or ''
    c.append({'id':oid,'est':float(est or 0),'tier':tier,'name':name,'phone':phone,'city':city,'state':state,'slug':slug})

def tier_rank(t):
    t=t.upper()
    if t=='P1': return 3
    if t=='P2': return 2
    if t=='P3': return 1
    return 0

c.sort(key=lambda x:(tier_rank(x['tier']), x['est']), reverse=True)
for row in c[:40]:
    print(json.dumps(row, ensure_ascii=False))
