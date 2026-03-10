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
seen_client=set();seen_id=set();seen_url=set()
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
    cid=o.get('id')
    if cid in seen_id:
        continue
    seen_id.add(cid)

    url=(o.get('url') or '').strip()
    if url:
        key=url.split('?')[0]
        if key in seen_url:
            continue
        seen_url.add(key)
    else:
        client=(o.get('client') or '').strip().lower()
        if client in seen_client:
            continue
        seen_client.add(client)

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
    o['_score']=score
    rows.append(o)

rows.sort(key=lambda o:(o['_score'],o.get('estimated_value',0)), reverse=True)
for i,o in enumerate(rows[:25],1):
    print(json.dumps({'rank':i,'id':o.get('id'),'score':o['_score'],'client':o.get('client'),'service':o.get('service'),'value':o.get('estimated_value'),'source':o.get('source'),'url':o.get('url',''),'notes':o.get('notes','')[:150]}))
print('TOTAL',len(rows))
