import json, collections
from pathlib import Path
p=Path(r'C:\Users\chead\.openclaw\workspace-john\leads.jsonl')
rows=[]
for line in p.read_text(encoding='utf-8').splitlines():
    line=line.strip()
    if not line:
        continue
    try:
        rows.append(json.loads(line))
    except Exception:
        pass
usable=[r for r in rows if r.get('status')=='new' and r.get('outreach_usable')==True and (r.get('phone') or r.get('phone_normalized'))]
for r in usable:
    loc=(r.get('location','') or '')
    r['score']=(r.get('estimated_value') or 0)+(100 if 'WA' in loc else 0)
usable.sort(key=lambda r:(r['score'],r.get('estimated_value',0)),reverse=True)
print('usable_with_phone',len(usable))

def state(r):
    loc=(r.get('location','') or '')
    return loc.split(',')[-1].strip() if ',' in loc else 'UNK'

print('top_states',collections.Counter([state(r) for r in usable]).most_common(10))
for r in usable[:40]:
    print('|'.join([
        str(r.get('id','')),
        str(r.get('client','')),
        str(r.get('location','')),
        str(r.get('phone') or r.get('phone_normalized') or ''),
        str(r.get('estimated_value','')),
        str(r.get('source','')),
    ]))
