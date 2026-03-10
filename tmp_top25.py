import json, pathlib
rows=[]
for l in pathlib.Path('leads.jsonl').read_text(encoding='utf-8').splitlines():
    l=l.strip()
    if not l or not l.startswith('{'):
        continue
    try:
        rows.append(json.loads(l))
    except Exception:
        pass

C=[]
for r in rows:
    p=(r.get('phone') or '').strip()
    if not p:
        continue
    st=(r.get('status') or '').lower()
    if st in {'lost','closed'}:
        continue
    ev=float(r.get('estimated_value') or 0)
    notes=(r.get('notes') or '').lower()
    service=str(r.get('service') or '').lower()
    source=str(r.get('source') or '')
    score=ev/10 + 15
    if any(k in notes for k in ['high priority','emergency','24hr','24-hour','24 hour','urgent','rooter','leak']):
        score+=10
    if any(k in service for k in ['plumbing','roof','hvac','contractor','bookkeeping','accounting','excel','automation']):
        score+=8
    if source.startswith('Google'):
        score+=6
    if (r.get('owner_name') or '').strip():
        score+=4
    C.append((score,r))

C.sort(key=lambda x:x[0], reverse=True)
print('count',len(C))
for i,(s,r) in enumerate(C[:40],1):
    print(f"{i:02d}|{s:.1f}|{r.get('id')}|{r.get('client')}|{r.get('service')}|${r.get('estimated_value')}|{r.get('phone')}|{r.get('location','')}|{r.get('status')}")
