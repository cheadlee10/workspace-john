import json,re
from pathlib import Path

def load_jsonl(p):
    rows=[]
    with open(p,encoding='utf-8') as f:
        for ln in f:
            ln=ln.strip('\ufeff\n\r ')
            if not ln: continue
            try: rows.append(json.loads(ln))
            except: pass
    return rows

leads=load_jsonl('leads.jsonl')
exclude=set(r.get('id') for r in load_jsonl('outreach_queue.jsonl'))
if Path('send_queue_2026-03-05.jsonl').exists():
    exclude |= set(r.get('id') for r in load_jsonl('send_queue_2026-03-05.jsonl'))

kw_intent=['hiring','needed','need','asap','job post','job poster','specialist','expert','seeking','looking for']
kw_fit=['excel','google sheets','vba','automation','dashboard','reporting','power automate','api','scraping','quickbooks','netsuite','access']

def score(r):
    src=(r.get('source') or '').lower()
    notes=(r.get('notes') or '').lower()
    client=(r.get('client') or '').lower()
    svc=(r.get('service') or '').lower()
    txt=' '.join([src,notes,client,svc])
    s=0
    if 'upwork' in src: s+=28
    if 'linkedin' in src: s+=20
    if 'reddit' in src: s+=18
    if 'fiverr' in src: s+=10
    s+=8*sum(k in txt for k in kw_intent)
    s+=7*sum(k in txt for k in kw_fit)
    ev=float(r.get('estimated_value') or 0)
    s+=min(20,int(ev/100))
    if r.get('url'): s+=4
    if 'anonymous' in client: s-=6
    if re.fullmatch(r'[a-z0-9_]{4,}', r.get('client','')): s-=12
    if any(x in client for x in ['freelancers directory','seller','fiverr']): s-=20
    return s

def is_buyer(r):
    src=(r.get('source') or '').lower()
    txt=' '.join([(r.get('client') or '').lower(),(r.get('notes') or '').lower(),(r.get('service') or '').lower()])
    if r.get('id') in exclude: return False
    if r.get('status') not in ('new','unclaimed'): return False
    if not any(k in txt for k in kw_fit): return False
    buyer_markers=['hiring','needed','need','job post','job poster','client -','[hiring]','specialist']
    if any(m in txt for m in buyer_markers): return True
    if 'linkedin-jobs' in src or 'linkedin jobs' in src: return True
    if 'upwork' in src and 'expert' in txt and 'needed' in txt: return True
    return False

cands=[r for r in leads if is_buyer(r)]
ranked=sorted(cands,key=score,reverse=True)[:25]

for i,r in enumerate(ranked,1):
    src=(r.get('source') or '').lower()
    if 'upwork' in src:
        channel='Upwork proposal + direct message'
    elif 'linkedin' in src:
        channel='LinkedIn DM / InMail'
    elif 'reddit' in src:
        channel='Reddit DM + comment reply'
    elif 'fiverr' in src:
        channel='Fiverr inbox offer'
    else:
        channel='Platform DM'

    ev=float(r.get('estimated_value') or 0)
    if ev>=1500: tier='High-ticket'
    elif ev>=900: tier='Mid-high'
    else: tier='Core'

    print(json.dumps({
        'rank':i,'id':r.get('id'),'client':r.get('client'),'source':r.get('source'),'service':r.get('service'),
        'estimated_value':r.get('estimated_value'),'score':score(r),'intent_signal':(r.get('notes') or '')[:120],
        'url':r.get('url',''),'outreach_channel':channel,'value_tier':tier
    },ensure_ascii=False))
