import json
from pathlib import Path
rows=[]
for l in Path('leads.jsonl').read_text(encoding='utf-8').splitlines():
    l=l.strip()
    if not l:
        continue
    try:
        d=json.loads(l)
    except Exception:
        continue
    cf=d.get('channel_flags') or {}
    phone=d.get('phone_normalized') or d.get('phone') or ''
    if not (cf.get('can_sms') or cf.get('can_call') or phone):
        continue
    if d.get('status') not in ('new','contacted','proposal_sent','negotiating','unclaimed'):
        continue
    rows.append({
        'id':d.get('id',''),'date':d.get('date',''),'client':d.get('client',''),
        'location':d.get('location',d.get('city','')),'service':d.get('service',''),
        'estimated_value':d.get('estimated_value',0),'notes':d.get('notes',''),
        'source':d.get('source',''),'phone':phone,'can_sms':cf.get('can_sms'), 'can_call':cf.get('can_call')
    })
rows.sort(key=lambda r:(-(r.get('estimated_value') or 0), r.get('date',''), r.get('id','')))
for r in rows[:120]:
    print(f"{r['id']} | {r['estimated_value']} | {r['client']} | {r['location']} | sms:{r['can_sms']} call:{r['can_call']} | {r['phone']}")