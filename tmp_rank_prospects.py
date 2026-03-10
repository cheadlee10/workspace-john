import json,re

queued=set()
for line in open('outreach_queue.jsonl',encoding='utf-8'):
    s=line.strip()
    if s:
        queued.add(json.loads(s)['id'])

kw=re.compile(r'(excel|google sheets|sheets|vba|automation|automate|power query|dashboard|quickbooks|netsuite|api|integration|data|report|workflow|n8n|zapier|airtable|crm)',re.I)

def src_pts(src):
    s=(src or '').lower()
    if 'upwork' in s: return 30
    if 'fiverr' in s: return 26
    if 'reddit-r/forhire' in s: return 20
    if 'reddit-r/slavelabour' in s: return 16
    if 'reddit' in s: return 14
    if 'linkedin' in s: return 12
    return 8

rows=[]
seen=set()
for line in open('leads.jsonl',encoding='utf-8'):
    t=line.strip()
    if not t:
        continue
    o=json.loads(t)
    if o.get('status')!='new':
        continue
    if o.get('id') in queued:
        continue
    text=' '.join(str(o.get(k,'')) for k in ['client','service','notes'])
    if not kw.search(text):
        continue
    client=(o.get('client') or '').strip().lower()
    if client in seen:
        continue
    seen.add(client)

    score=src_pts(o.get('source',''))
    val=o.get('estimated_value') or 0
    score+=min(25,val//100)
    if re.search(r'need asap|urgent|needed|job post|expert needed',text,re.I):
        score+=8
    if re.search(r'integration|netsuite|quickbooks|api|100k\+ rows|machine learning|automation|pipeline|crm',text,re.I):
        score+=7
    date=o.get('date','')
    if date>='2026-03-04': score+=5
    elif date>='2026-03-03': score+=3
    rows.append((score,o))

rows.sort(key=lambda x:(x[0],x[1].get('estimated_value',0)), reverse=True)
print('count',len(rows))
for s,o in rows[:60]:
    print(f"{o.get('id')}\t{s}\t{o.get('source')}\t{o.get('estimated_value')}\t{o.get('client')}")
