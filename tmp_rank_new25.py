import json
from pathlib import Path

def load_jsonl(p):
    rows=[]
    with open(p,encoding='utf-8') as f:
        for ln in f:
            ln=ln.strip('\ufeff\n\r ')
            if not ln:
                continue
            try:
                rows.append(json.loads(ln))
            except Exception:
                pass
    return rows

leads=load_jsonl('leads.jsonl')
q=load_jsonl('outreach_queue.jsonl')
ids_q={r.get('id') for r in q}
if Path('send_queue_2026-03-05.jsonl').exists():
    ids_q |= {r.get('id') for r in load_jsonl('send_queue_2026-03-05.jsonl')}

kw_hi=['urgent','asap','immediately','today','this week','need help','looking for','seeking','hiring','quote','proposal']
kw_auto=['automation','automate','vba','macro','script','dashboard','excel','google sheets','api','scrape','data','report','workflow','integration','power bi']

rows=[]
for r in leads:
    if r.get('id') in ids_q:
        continue
    if r.get('status') not in ('new','unclaimed'):
        continue
    src=(r.get('source') or '').lower()
    notes=(r.get('notes') or '').lower()
    svc=(r.get('service') or '').lower()
    score=0
    if any(s in src for s in ['upwork','fiverr','reddit','linkedin']):
        score+=25
    if 'yelp' in src:
        score+=8
    score += 15*sum(k in notes for k in kw_hi)
    score += 10*sum(k in (notes+' '+svc) for k in kw_auto)
    ev=float(r.get('estimated_value') or 0)
    score += min(20,int(ev/100))
    cf=r.get('channel_flags') or {}
    if cf.get('can_email'):
        score+=8
    if cf.get('can_call') or cf.get('can_sms'):
        score+=6
    if cf.get('can_dm'):
        score+=5
    if r.get('url'):
        score+=4
    if r.get('email'):
        score+=3
    if r.get('phone'):
        score+=3
    if 'unclaimed yelp listing' in notes:
        score-=8
    if len(notes)<40:
        score-=5
    rows.append((score,r))

rows.sort(key=lambda x:x[0],reverse=True)
for i,(s,r) in enumerate(rows[:60],1):
    note=(r.get('notes') or '').replace('|','/')[:110]
    print(f"{i:02d}|{s}|{r.get('id')}|{r.get('source')}|{r.get('client')}|{r.get('service')}|{r.get('estimated_value')}|{note}")
