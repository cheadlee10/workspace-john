import json,re
from pathlib import Path
p=Path('outreach_queue.jsonl')
existing=set(); maxid=0
for ln in p.read_text(encoding='utf-8').splitlines():
    if not ln.strip():
        continue
    j=json.loads(ln)
    m=re.match(r'gpass-us-(\d+)$',j.get('id',''))
    if m:
        maxid=max(maxid,int(m.group(1)))
    existing.add((j.get('client','').strip().lower(),re.sub(r'\D','',j.get('phone',''))))
print('maxid',maxid,'existing',len(existing))
for name,phone in [
('U.S. Plumbing','(919) 300-1563'),('US Plumbing','(760) 536-5056'),('U.S. Plumbing and Rooter','(925) 238-0940'),('MP Plumbing Co','(503) 664-9473'),('Rite Plumbing NYC','(347) 502-6441'),('Shelby Roofing & Exteriors','(636) 942-2300'),("Joe\'s Roofing",'(775) 369-1919'),('HydroForce Cleaning & Restoration','(630) 835-0862')]:
    k=(name.lower(),re.sub(r'\D','',phone))
    print(name, 'dupe' if k in existing else 'new')
