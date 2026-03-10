import json,collections,re
rows=[]
with open('leads.jsonl',encoding='utf-8') as f:
    for line in f:
        line=line.strip()
        if not line: continue
        try: rows.append(json.loads(line))
        except: pass

# Exceptions
missing_direct=[r for r in rows if not r.get('outreach_usable')]
missing_phone=[r for r in rows if not (r.get('phone') or r.get('phone_normalized'))]
status_unclaimed=[r for r in rows if r.get('status')=='unclaimed']

# duplicate client names
by_client=collections.Counter((r.get('client') or '').strip().lower() for r in rows)
dup_clients=[(c,n) for c,n in by_client.items() if c and n>1]

# phone duplicates
phones=[]
for r in rows:
    p=(r.get('phone_normalized') or r.get('phone') or '').strip()
    if p: phones.append((p,r.get('id'),r.get('client')))
by_phone=collections.defaultdict(list)
for p,i,c in phones: by_phone[p].append((i,c))
phone_dups={p:v for p,v in by_phone.items() if len(v)>1}

# suspicious location mismatch in notes (if city/state fields and notes mention another state abbr)
state_re=re.compile(r'\b([A-Z]{2})\b')
mismatch=[]
for r in rows:
    st=(r.get('state') or '')
    notes=(r.get('notes') or '')
    if st and notes:
        found=set(state_re.findall(notes))
        if found and st not in found and any(s in found for s in ['NC','OH','GA','MI','MO','TX','AZ','WA','FL','CO','OR','NV','NM','UT','IN','KY','TN','WI']):
            mismatch.append((r.get('id'),r.get('client'),st,sorted(found)[:3],notes[:90]))

print('total',len(rows))
print('missing_direct',len(missing_direct))
print('missing_phone',len(missing_phone))
print('unclaimed_status',len(status_unclaimed))
print('dup_clients_count',len(dup_clients))
print('top_dup_clients',sorted(dup_clients,key=lambda x:x[1],reverse=True)[:10])
print('phone_dups',len(phone_dups))
for p,v in list(phone_dups.items())[:10]:
    print(' ',p,v)
print('state_note_mismatch',len(mismatch))
for x in mismatch[:12]:
    print(' ',x)
