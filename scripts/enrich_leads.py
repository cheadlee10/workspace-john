import json,re
from pathlib import Path

root=Path(r'C:\Users\chead\.openclaw\workspace-john')
leads_path=root/'leads.jsonl'
queue_path=root/'outreach_queue.jsonl'
unver_path=root/'leads_unverifiable.jsonl'

owner_patterns=[
    re.compile(r'([A-Z][a-z]+\s+[A-Z]\.?)\s*-\s*Business Owner',re.I),
    re.compile(r'Founded\s+\d{4}\s+by\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)',re.I),
    re.compile(r'founded\s+\d{4}\s+by\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)',re.I),
]

email_re=re.compile(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')

def norm_phone(p):
    if not p:
        return ''
    d=''.join(ch for ch in p if ch.isdigit())
    if len(d)==10:
        return f'+1{d}'
    if len(d)==11 and d.startswith('1'):
        return f'+{d}'
    return ''

records=[]
with leads_path.open('r',encoding='utf-8') as f:
    for line in f:
        line=line.strip()
        if not line:
            continue
        try:
            records.append(json.loads(line))
        except json.JSONDecodeError:
            continue

enriched=[]
queue=[]
unver=[]

for r in records:
    note=r.get('notes','') or ''
    contact=(r.get('contact_name','') or '').strip()
    owner=''
    owner_val='missing'
    if contact:
        owner=contact
        owner_val='provided_contact_name'
    else:
        for pat in owner_patterns:
            m=pat.search(note)
            if m:
                owner=m.group(1).strip()
                owner_val='parsed_from_notes'
                break

    phone=(r.get('phone','') or '').strip()
    phone_norm=norm_phone(phone)
    phone_val='missing'
    if phone:
        phone_val='valid_us_format' if phone_norm else 'present_unparseable'

    email=(r.get('email','') or '').strip().lower()
    email_val='missing'
    if email:
        email_val='valid_syntax' if email_re.match(email) else 'invalid_syntax'

    channels={
        'can_call': bool(phone_norm),
        'can_sms': bool(phone_norm),
        'can_email': bool(email and email_val=='valid_syntax'),
        'can_dm': False,
    }
    reachable=channels['can_call'] or channels['can_sms'] or channels['can_email']

    r['owner_name']=owner
    r['owner_name_validation']=owner_val
    r['phone_normalized']=phone_norm
    r['phone_validation']=phone_val
    r['email_validation']=email_val
    r['channel_flags']=channels
    r['outreach_usable']=reachable
    r['verification_status']='usable' if reachable else 'unverifiable_no_direct_channel'

    enriched.append(r)
    if reachable:
        q=dict(r)
        q['primary_channel']='sms_or_call' if channels['can_sms'] else 'email'
        queue.append(q)
    else:
        unver.append(r)

with leads_path.open('w',encoding='utf-8',newline='\n') as f:
    for rec in enriched:
        f.write(json.dumps(rec,ensure_ascii=False)+"\n")

with queue_path.open('w',encoding='utf-8',newline='\n') as f:
    for rec in queue:
        f.write(json.dumps(rec,ensure_ascii=False)+"\n")

with unver_path.open('w',encoding='utf-8',newline='\n') as f:
    for rec in unver:
        f.write(json.dumps(rec,ensure_ascii=False)+"\n")

print(f'total={len(enriched)} usable={len(queue)} unverifiable={len(unver)}')
