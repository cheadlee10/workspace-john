import json
home_kw=['plumb','hvac','electrical','electric','roof','landscap','lawn','pest','garage door','handyman','contractor','tree','cleaning','junk','remodel','fence','flooring','painting','window','gutter','appliance repair','locksmith']
exist=set()
with open('outreach_queue.jsonl',encoding='utf-8') as f:
    for line in f:
        if not line.strip():
            continue
        try:
            j=json.loads(line)
        except Exception:
            continue
        n=(j.get('client') or '').strip().lower()
        p=(j.get('phone_normalized') or '')
        if not p and j.get('phone'):
            d=''.join(ch for ch in j['phone'] if ch.isdigit())
            if len(d)==10:
                p='+1'+d
            elif len(d)==11 and d.startswith('1'):
                p='+'+d
        exist.add((n,p))

out=[]
seen=set()
with open('leads.jsonl',encoding='utf-8') as f:
    for line in f:
        if not line.strip():
            continue
        try:
            j=json.loads(line)
        except Exception:
            continue
        s=(j.get('service') or '').lower()
        if not any(k in s for k in home_kw):
            continue
        p=(j.get('phone_normalized') or '')
        if not p:
            d=''.join(ch for ch in (j.get('phone') or '') if ch.isdigit())
            if len(d)==10:
                p='+1'+d
            elif len(d)==11 and d.startswith('1'):
                p='+'+d
        if not p:
            continue
        n=(j.get('client') or '').strip().lower()
        key=(n,p)
        if key in exist or key in seen:
            continue
        seen.add(key)
        out.append(j)

print('count',len(out))
for j in out[:80]:
    print(f"{j.get('id')} | {j.get('client')} | {j.get('service')} | {j.get('phone') or j.get('phone_normalized')} | {j.get('source')}")
