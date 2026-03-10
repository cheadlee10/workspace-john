import json,re,urllib.parse

queued=set()
with open('outreach_queue.jsonl',encoding='utf-8') as f:
    for line in f:
        s=line.strip()
        if s:
            try:
                queued.add(json.loads(s)['id'])
            except:
                pass

intent_kw=re.compile(r'(excel|google sheets|sheets|vba|automation|automate|power query|dashboard|quickbooks|netsuite|api|integration|data|report|workflow|n8n|zapier|airtable|crm|script)',re.I)
urgent_kw=re.compile(r'(asap|urgent|needed|expert needed|hiring|specialist)',re.I)
complex_kw=re.compile(r'(integration|netsuite|quickbooks|api|large data|pipeline|crm|n8n|zapier|power automate|vba)',re.I)

def src_pts(src):
 s=(src or '').lower()
 if 'upwork' in s: return 30
 if 'fiverr' in s: return 24
 if 'reddit-r/forhire' in s: return 18
 if 'reddit-r/slavelabour' in s: return 14
 if 'reddit' in s: return 12
 if 'linkedin' in s: return 10
 return 8

def canon_url(u):
 if not u: return ''
 try:
  p=urllib.parse.urlparse(u)
  return (p.netloc+p.path).lower().rstrip('/')
 except: return u.lower()

rows=[]
for line in open('leads.jsonl',encoding='utf-8'):
 t=line.strip()
 if not t: continue
 o=json.loads(t)
 if o.get('status')!='new': continue
 if o.get('id') in queued: continue
 txt=' '.join(str(o.get(k,'')) for k in ['client','service','notes'])
 if not intent_kw.search(txt): continue
 val=float(o.get('estimated_value') or 0)
 score=src_pts(o.get('source','')) + min(25,int(val//100))
 if urgent_kw.search(txt): score+=8
 if complex_kw.search(txt): score+=7
 d=o.get('date','')
 if d>='2026-03-04': score+=5
 elif d>='2026-03-03': score+=3
 o['_score']=score
 o['_txt']=txt
 o['_u']=canon_url(o.get('url',''))
 rows.append(o)

best={}
for o in rows:
 key=o['_u'] or re.sub(r'\s+',' ',(o.get('client') or '').strip().lower())
 cur=best.get(key)
 if cur is None or (o['_score'],o.get('estimated_value',0))>(cur['_score'],cur.get('estimated_value',0)):
  best[key]=o
uniq=list(best.values())
uniq.sort(key=lambda o:(o['_score'],o.get('estimated_value',0)),reverse=True)
print('unique',len(uniq))
for i,o in enumerate(uniq[:35],1):
 print(f"{i:02d}|{o['id']}|{o['_score']}|{int(o.get('estimated_value') or 0)}|{o.get('source','')}|{o.get('client','')}|{o.get('service','')}")
