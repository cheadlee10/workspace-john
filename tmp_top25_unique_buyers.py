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

kw_intent=['hiring','needed','need','asap','job post','job poster','specialist','expert','seeking','looking for','struggling']
kw_fit=['excel','google sheets','vba','automation','dashboard','reporting','power automate','api','scraping','quickbooks','netsuite','access','power bi','data entry']

def norm_url(u):
    if not u: return ''
    u=u.lower().strip()
    u=re.sub(r'https?://(www\.)?','',u)
    u=u.split('?')[0].rstrip('/')
    return u

def score(r):
    src=(r.get('source') or '').lower(); notes=(r.get('notes') or '').lower(); client=(r.get('client') or '').lower(); svc=(r.get('service') or '').lower(); txt=' '.join([src,notes,client,svc])
    s=0
    if 'upwork' in src: s+=26
    if 'linkedin' in src: s+=20
    if 'reddit' in src: s+=18
    if 'fiverr' in src: s+=8
    s+=7*sum(k in txt for k in kw_intent)
    s+=6*sum(k in txt for k in kw_fit)
    ev=float(r.get('estimated_value') or 0); s+=min(20,int(ev/100))
    if r.get('url'): s+=4
    if 'anonymous' in client: s-=4
    if re.fullmatch(r'[a-z0-9_]{4,}', r.get('client','')): s-=8
    return s

def is_buyer(r):
    if r.get('id') in exclude: return False
    if r.get('status') not in ('new','unclaimed'): return False
    src=(r.get('source') or '').lower()
    txt=' '.join([(r.get('client') or '').lower(),(r.get('notes') or '').lower(),(r.get('service') or '').lower(),src])
    if not any(k in txt for k in kw_fit): return False
    if any(m in txt for m in ['hiring','needed','job post','job poster','client -','[hiring]','struggling','specialist']): return True
    if 'linkedin-jobs' in src or 'linkedin jobs' in src: return True
    return False

cands=[r for r in leads if is_buyer(r)]
cands=sorted(cands,key=score,reverse=True)
unique=[]; seen=set()
for r in cands:
    key=norm_url(r.get('url')) or (r.get('source','').lower()+'|'+r.get('client','').lower())
    if key in seen: continue
    seen.add(key); unique.append(r)
    if len(unique)>=40: break

for i,r in enumerate(unique[:30],1):
    s=score(r)
    src=(r.get('source') or '').lower()
    channel='Platform DM'
    if 'upwork' in src: channel='Upwork proposal + DM'
    elif 'linkedin' in src: channel='LinkedIn DM/InMail'
    elif 'reddit' in src: channel='Reddit DM + reply'
    elif 'fiverr' in src: channel='Fiverr inbox'
    print(f"{i:02d}|{s}|{r.get('id')}|{r.get('source')}|{r.get('client')}|{r.get('service')}|{r.get('estimated_value')}|{channel}|{r.get('url','')}|{(r.get('notes') or '')[:90]}")
