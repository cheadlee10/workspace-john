import json, pathlib
p=pathlib.Path(r"C:\Users\chead\.openclaw\workspace-john\leads.jsonl")
rows=[]
for line in p.read_text(encoding='utf-8').splitlines():
    line=line.strip()
    if not line:
        continue
    try:
        r=json.loads(line)
    except:
        continue
    if r.get('status')=='new' and ((r.get('outreach_usable') is True) or (r.get('phone') and str(r.get('phone')).strip())):
        rows.append(r)
rows.sort(key=lambda r:(r.get('estimated_value',0), 'HIGH PRIORITY' in str(r.get('notes','')).upper(), '24' in str(r.get('notes','')) or 'emergency' in str(r.get('notes','')).lower()), reverse=True)
print('count',len(rows))
for r in rows[:120]:
    loc=r.get('location') or f"{r.get('city','')}, {r.get('state','')}"
    print(f"{r.get('id')}|{r.get('client')}|{r.get('estimated_value')}|{r.get('phone','')}|{loc}")
