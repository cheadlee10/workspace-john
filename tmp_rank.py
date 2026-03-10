import json
from pathlib import Path
p=Path('C:/Users/chead/.openclaw/workspace-john/leads.jsonl')
rows=[]
for line in p.read_text(encoding='utf-8').splitlines():
    if not line.strip():
        continue
    try:
        r=json.loads(line)
    except:
        continue
    if r.get('status')!='new':
        continue
    cf=r.get('channel_flags',{})
    if not (cf.get('can_call') or cf.get('can_sms') or cf.get('can_email')):
        continue
    score=0
    ev=r.get('estimated_value') or 0
    score += ev/10
    src=(r.get('source') or '').lower()
    notes=(r.get('notes') or '').lower()
    svc=(r.get('service') or '').lower()
    loc=(r.get('location') or '')
    if 'wave4' in (r.get('id') or '') or 'high-intent' in notes or 'emergency' in notes or '24hr' in notes or '24-hour' in notes or 'rooter' in notes or 'leak' in notes:
        score += 25
    if 'unclaimed' in src or 'unclaimed' in notes:
        score += 10
    if cf.get('can_call'): score += 12
    if cf.get('can_sms'): score += 8
    if r.get('owner_name'): score += 5
    if any(k in svc for k in ['plumbing','roofing','hvac','general contractor']): score += 10
    if any(k in notes for k in ['high priority','founded','established','reviews','photos']): score += 4
    if any(st in loc for st in ['WA','TX','AZ','TN','CO','FL','NC','OH']): score += 3
    r['_score']=round(score,1)
    rows.append(r)
rows=sorted(rows,key=lambda x:(x['_score'],x.get('estimated_value',0)), reverse=True)
for i,r in enumerate(rows[:60],1):
    print(f"{i}. {r.get('id')} | {r.get('client')} | ${r.get('estimated_value')} | score {r['_score']} | {r.get('phone','')} | {r.get('location','')}")