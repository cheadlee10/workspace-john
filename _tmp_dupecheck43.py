import json,re
from pathlib import Path
p=Path('outreach_queue.jsonl')
existing=set()
for ln in p.read_text(encoding='utf-8').splitlines():
    try:j=json.loads(ln)
    except:continue
    existing.add((j.get('client','').strip().lower(),re.sub(r'\D','',j.get('phone',''))))
cands=[('Graham Plumbing Services','(281) 302-6710'),('Village Plumbing, Air & Electric','(713) 526-1491'),('Tribeca Plumbing, Inc.','(214) 402-5454'),('Ares Plumbing','(214) 865-8772'),('Total Plumbing','(972) 681-4434'),('One Hour Heating & Air Conditioning of Charlotte','(704) 703-4220'),('Dilling Heating, Cooling, Plumbing & Electrical','(704) 741-8773'),('Phoenix Roofing and Renovations','(629) 356-5356')]
for n,p in cands:
 k=(n.lower(),re.sub(r'\D','',p))
 print(n,'DUP' if k in existing else 'NEW')
