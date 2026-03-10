import json, pathlib
p=pathlib.Path('leads.jsonl')
leads=[]
for line in p.read_text(encoding='utf-8').splitlines():
    line=line.strip()
    if not line:
        continue
    try:
        d=json.loads(line)
    except Exception:
        continue
    flags=d.get('channel_flags',{})
    if d.get('status')=='new' and (d.get('outreach_usable') is True or flags.get('can_call') or flags.get('can_sms') or d.get('phone')):
        leads.append(d)
leads.sort(key=lambda d:(-(d.get('estimated_value') or 0), d.get('id','')))
print('count',len(leads))
for d in leads[:50]:
    loc=d.get('location') or ((d.get('city','')+', '+d.get('state','')).strip(', '))
    print(f"{d.get('id')}|{d.get('client')}|{d.get('estimated_value')}|{loc}|phone:{'Y' if d.get('phone') else 'N'}")
