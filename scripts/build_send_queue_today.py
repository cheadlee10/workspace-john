import json, re, csv
from pathlib import Path

p=Path(r'C:\Users\chead\.openclaw\workspace-john\leads.jsonl')
rows=[]
for line in p.read_text(encoding='utf-8').splitlines():
    line=line.strip()
    if not line:
        continue
    try:
        o=json.loads(line)
    except Exception:
        continue
    if o.get('status') not in ('new','contacted','proposal_sent','negotiating'):
        continue
    flags=o.get('channel_flags',{})
    phone=o.get('phone') or o.get('phone_normalized')
    can_call=flags.get('can_call',False) or bool(phone)
    can_sms=flags.get('can_sms',False) or bool(phone)
    if not (can_call or can_sms):
        continue
    rows.append(o)

state_tz={
'WA':'PT','OR':'PT','CA':'PT','NV':'PT',
'AZ':'MT','UT':'MT','CO':'MT','NM':'MT',
'TX':'CT','OK':'CT','MO':'CT','TN':'CT','WI':'CT','MN':'CT','IL':'CT','KS':'CT','IA':'CT',
'GA':'ET','FL':'ET','NC':'ET','SC':'ET','OH':'ET','IN':'ET','MI':'ET','NY':'ET','KY':'ET'
}

def infer_state(loc=''):
    m=re.search(r'\b([A-Z]{2})\b(?:\s*\d{5})?\s*$',loc)
    if m: return m.group(1)
    m=re.search(r',\s*([A-Z]{2})\b',loc)
    if m: return m.group(1)
    return ''

def infer_tz_from_phone(phone=''):
    digits=''.join(ch for ch in str(phone) if ch.isdigit())
    if len(digits)==11 and digits.startswith('1'):
        digits=digits[1:]
    ac=digits[:3]
    # Focused map for current outbound pool
    if ac in {'206','253','360','425','509','619'}:
        return 'PT'
    if ac in {'480','602','623','505'}:
        return 'MT'
    if ac in {'817','915','214','512','615','832','314'}:
        return 'CT'
    if ac in {'404','770','919','614','317','216','704'}:
        return 'ET'
    return ''

def priority(o):
    est=o.get('estimated_value') or 0
    notes=(o.get('notes') or '').lower()
    score=est
    if 'high priority' in notes: score+=500
    if str(o.get('source','')).startswith('Google+'): score+=120
    if str(o.get('date',''))>='2026-03-03': score+=80
    return score

for o in rows:
    loc=o.get('location') or f"{o.get('city','')}, {o.get('state','')}".strip(', ')
    st=o.get('state') or infer_state(loc)
    tz=state_tz.get(st,'')
    if not tz:
        tz=infer_tz_from_phone(o.get('phone') or o.get('phone_normalized') or '') or 'CT'
    o['_state']=st
    o['_tz']=tz
    o['_priority_score']=priority(o)

rows=sorted(rows,key=lambda x:(x['_priority_score'],x.get('estimated_value',0)),reverse=True)

buckets={'PT':[], 'MT':[], 'CT':[], 'ET':[]}
for r in rows:
    buckets.setdefault(r['_tz'],[]).append(r)

selected=[]
quota={'PT':10,'MT':8,'CT':9,'ET':9}
for tz,q in quota.items():
    selected.extend(buckets.get(tz,[])[:q])
sel_ids={r['id'] for r in selected if 'id' in r}
remaining=[r for r in rows if r.get('id') not in sel_ids]
selected=sorted(selected,key=lambda x:x['_priority_score'],reverse=True)
while len(selected)<40 and remaining:
    selected.append(remaining.pop(0))
selected=selected[:40]

window_map={
'ET':[('08:40','10:00'),('11:45','12:30')],
'CT':[('09:40','11:00'),('12:45','13:30')],
'MT':[('10:40','12:00'),('13:45','14:30')],
'PT':[('11:40','13:00'),('14:45','16:30')],
}

out=[]
for i,r in enumerate(selected,1):
    tier='P1' if i<=12 else ('P2' if i<=26 else 'P3')
    batch='A' if i<=12 else ('B' if i<=26 else 'C')
    tz=r['_tz']
    w=window_map[tz][0 if batch in ('A','B') else 1]
    out.append({
        'queue_order':i,
        'priority_tier':tier,
        'batch':batch,
        'lead_id':r.get('id',''),
        'client':r.get('client',''),
        'service':r.get('service',''),
        'estimated_value':r.get('estimated_value',''),
        'location':r.get('location') or f"{r.get('city','')}, {r.get('state','')}",
        'phone':r.get('phone') or r.get('phone_normalized',''),
        'timezone_local':tz,
        'send_window_pt_start':w[0],
        'send_window_pt_end':w[1],
        'channel_plan':'call_first_sms_followup',
        'touch_1':'Call',
        'touch_2':'SMS (if no answer)',
        'touch_3':'Follow-up SMS + Yelp msg (if available) next-day',
        'status':'queued',
        'owner':'john',
        'response_status':'',
        'response_time_pt':'',
        'next_action':'',
        'next_action_due_pt':'',
        'notes':''
    })

csv_path=Path(r'C:\Users\chead\.openclaw\workspace-john\send_ops_queue_2026-03-05.csv')
with csv_path.open('w',newline='',encoding='utf-8') as f:
    w=csv.DictWriter(f,fieldnames=list(out[0].keys()))
    w.writeheader(); w.writerows(out)

counts={'P1':0,'P2':0,'P3':0,'PT':0,'MT':0,'CT':0,'ET':0}
for r in out:
    counts[r['priority_tier']]+=1
    counts[r['timezone_local']]+=1

md=Path(r'C:\Users\chead\.openclaw\workspace-john\send_ops_queue_2026-03-05.md')
md.write_text(f"""# Send-Ops Outbound Queue — 2026-03-05 (PT)

## Ready-to-Execute Plan
- **Total queued leads:** {len(out)}
- **Priority mix:** P1={counts['P1']} | P2={counts['P2']} | P3={counts['P3']}
- **Timezone mix:** PT={counts['PT']} | MT={counts['MT']} | CT={counts['CT']} | ET={counts['ET']}
- **Primary channel:** Call-first
- **Secondary channel:** SMS fallback within same window if no answer
- **Tertiary channel:** Next-day follow-up SMS (+ Yelp message where available)

## Batch Windows (PT)
- **Batch A (P1, first 12):** 08:40-12:00 PT (ET→CT→MT)
- **Batch B (P2, next 14):** 11:40-14:30 PT (MT→PT overlap)
- **Batch C (P3, final 14):** 12:45-16:30 PT (CT/MT/PT second touches)

## Execution Guardrails
1. Call attempt first (max 45s ring / one VM drop).
2. If no pickup, send short SMS in same window (<=160 chars, business name included, no shortened links).
3. Mark response outcome immediately using queue tracking fields.
4. Book callbacks into `next_action_due_pt` before moving to next lead.

## Tracking Fields Included (CSV)
`status, response_status, response_time_pt, next_action, next_action_due_pt, notes`

## Files
- `send_ops_queue_2026-03-05.csv`
- `send_ops_queue_2026-03-05.md`
""",encoding='utf-8')

print(f'Wrote {csv_path} and {md}')
print('Top5:',[(r['queue_order'],r['lead_id'],r['client']) for r in out[:5]])
