import json
leads=[]
with open('leads.jsonl','r',encoding='utf-8',errors='ignore') as f:
    for ln in f:
        ln=ln.strip()
        if not ln:
            continue
        try:
            d=json.loads(ln)
        except Exception:
            continue
        leads.append(d)
usable=[]
for d in leads:
    if d.get('status') not in ('new','contacted','proposal_sent','negotiating'):
        continue
    phone=d.get('phone_normalized') or d.get('phone') or ''
    flags=d.get('channel_flags') or {}
    can_sms=bool(flags.get('can_sms')) if isinstance(flags,dict) else False
    can_call=bool(flags.get('can_call')) if isinstance(flags,dict) else False
    if not (can_sms or can_call):
        if phone:
            can_sms=can_call=True
    if not (phone and (can_sms or can_call)):
        continue
    est=d.get('estimated_value') or 0
    notes=(d.get('notes') or '').lower()
    src=(d.get('source') or '').lower()
    lid=d.get('id') or ''
    score=est
    if 'high-intent' in notes:
        score+=120
    if 'high priority' in notes:
        score+=180
    if 'google' in src:
        score+=40
    if lid.startswith('wave4-'):
        score+=70
    if lid.startswith('wa-google-'):
        score+=50
    usable.append((score,d,phone,can_sms,can_call))
usable.sort(key=lambda x:(x[0],x[1].get('date','')), reverse=True)
for score,d,phone,can_sms,can_call in usable[:40]:
    loc=d.get('location') or (str(d.get('city',''))+', '+str(d.get('state','')))
    print(f"{d.get('id')} | {d.get('date')} | {d.get('client')} | ${d.get('estimated_value')} | {phone} | sms={can_sms} call={can_call} | {loc} | score={score}")
print('TOTAL_USABLE',len(usable))
