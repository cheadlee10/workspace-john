import json, pathlib
p=pathlib.Path(r'C:\Users\chead\.openclaw\workspace-john\leads.jsonl')
rows=[]
for line in p.read_text(encoding='utf-8').splitlines():
    line=line.strip()
    if not line: continue
    try:d=json.loads(line)
    except: continue
    if d.get('status')!='new': continue
    phone=(d.get('phone') or '').strip()
    usable=d.get('outreach_usable')
    if usable is None: usable=bool(phone or d.get('email'))
    if usable and phone and (d.get('estimated_value') or 0)>=550:
        rows.append(d)
rows.sort(key=lambda x:(x.get('estimated_value') or 0, x.get('source','')), reverse=True)
for r in rows:
    print('|'.join([r.get('id',''),r.get('client',''),str(r.get('estimated_value','')),r.get('service',''),r.get('phone',''),r.get('location',''),r.get('source','')]))
print('count',len(rows))
