import json, pathlib
w=pathlib.Path(r'C:/Users/chead/.openclaw/workspace-john')
qids=set(); qclients=set()
for line in (w/'outreach_queue.jsonl').read_text(encoding='utf-8').splitlines():
    line=line.strip()
    if not line: continue
    try: d=json.loads(line)
    except: continue
    qids.add(d.get('id')); qclients.add((d.get('client') or '').lower())

c=[]
for line in (w/'leads.jsonl').read_text(encoding='utf-8').splitlines():
    d=json.loads(line)
    if d.get('id') in qids or (d.get('client') or '').lower() in qclients: continue
    if 'WA' not in (d.get('location') or ''): continue
    svc=(d.get('service') or '').lower()
    if not any(x in svc for x in ['landscap','handyman','roof','fenc','contractor','clean']): continue
    if d.get('phone') or d.get('email'): continue
    c.append(d)

c=sorted(c,key=lambda d:d.get('estimated_value',0),reverse=True)
for d in c[:30]:
    print(f"{d['id']} {d.get('estimated_value')} {d.get('client')} | {d.get('location')} | {d.get('service')}")
print('count',len(c))
