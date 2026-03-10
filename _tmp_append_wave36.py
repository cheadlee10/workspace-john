import json,re
from pathlib import Path
p=Path('outreach_queue.jsonl')
lines=p.read_text(encoding='utf-8').splitlines()
existing=set()
max_id=0
for ln in lines:
    if not ln.strip():
        continue
    o=json.loads(ln)
    name=o.get('client','').strip().lower()
    ph=''.join(ch for ch in o.get('phone_normalized','') if ch.isdigit())
    if not ph:
        ph=''.join(ch for ch in o.get('phone','') if ch.isdigit())
    existing.add((name,ph))
    m=re.match(r'gpass-us-(\d+)$',o.get('id',''))
    if m:
        max_id=max(max_id,int(m.group(1)))

cands=[
('Tony Handyman Survives','(480) 740-7144','Phoenix, AZ','Handyman','America/Phoenix',760,79,'Yelp unclaimed listing shows direct call line for handyman repair requests.'),
('Rick The Handyman','(602) 200-4521','Phoenix, AZ','Handyman','America/Phoenix',740,78,'Yelp unclaimed listing includes phone contact for residential handyman jobs.'),
('Manny Handyman Svcs','(480) 450-8097','Phoenix, AZ','Handyman','America/Phoenix',730,77,'Yelp unclaimed profile provides direct number for small-home repair demand.'),
('American Termite & Pest Elimination','(404) 874-5250','Atlanta, GA','Pest Control','America/New_York',900,84,'Yelp listing shows office line for termite and pest treatment inquiries.'),
('Bug Free Exterminating','(770) 920-2288','Douglasville, GA','Pest Control','America/New_York',870,82,'Yelp listing phone available for pest elimination and prevention service calls.'),
('CRC Services Termite & Pest Control','(770) 973-7103','Marietta, GA','Pest Control','America/New_York',860,81,'Yelp profile exposes direct number; termite/pest intent aligns with urgent service.'),
('Garrico Plumbing','(919) 910-8013','Raleigh, NC','Plumbing','America/New_York',920,85,'Yelp unclaimed plumbing listing includes direct line for repair and install calls.'),
('Dazco Plumbing','(919) 787-8256','Raleigh, NC','Plumbing','America/New_York',910,84,'Yelp listing provides direct plumbing contact number for homeowner quote requests.')
]

utc_map={
'America/New_York':('2026-03-03 20:10','2026-03-03 21:40','2026-03-03 20:00','2026-03-04 20:10','2026-03-06 20:10','2026-03-10 19:10'),
'America/Chicago':('2026-03-03 21:10','2026-03-03 22:40','2026-03-03 21:00','2026-03-04 21:10','2026-03-06 21:10','2026-03-10 20:10'),
'America/Denver':('2026-03-03 22:10','2026-03-03 23:40','2026-03-03 22:00','2026-03-04 22:10','2026-03-06 22:10','2026-03-10 21:10'),
'America/Los_Angeles':('2026-03-03 23:10','2026-03-04 00:40','2026-03-03 23:00','2026-03-04 23:10','2026-03-06 23:10','2026-03-10 22:10'),
'America/Phoenix':('2026-03-03 22:10','2026-03-03 23:40','2026-03-03 22:00','2026-03-04 22:10','2026-03-06 22:10','2026-03-10 22:10')
}

app=[]
for c in cands:
    client,phone,loc,svc,tz,val,score,notes=c
    phn='+1'+''.join(ch for ch in phone if ch.isdigit())[-10:]
    key=(client.strip().lower(),''.join(ch for ch in phn if ch.isdigit()))
    if key in existing:
        continue
    max_id+=1
    sa,sb,gu,fu1,fu2,fu3=utc_map[tz]
    obj={
      'id':f'gpass-us-{max_id}','date':'2026-03-03','source':'Yelp-Unclaimed','client':client,'contact_name':'','phone':phone,'email':'','location':loc,
      'service':svc,'estimated_value':val,'status':'new','notes':notes,'owner_name':'','owner_name_validation':'missing','phone_normalized':phn,
      'phone_validation':'verified_via_yelp_listing','email_validation':'missing','channel_flags':{'can_call':True,'can_dm':False,'can_email':False,'can_sms':True},
      'outreach_usable':True,'verification_status':'verified_phone_only','primary_channel':'sms_or_call','priority_score':score,
      'priority_tier':'P1' if score>=83 else 'P2','website_quality':'directory_presence_only','timezone':tz,'approval_gate':'gate4_manual_unlock',
      'approval_gates':{'gate1_data_qa':'complete','gate2_message_qa':'complete','gate3_throughput_qa':'complete','gate4_manual_unlock':'pending'},
      'gate_status':'locked_pending_manual_unlock','send_blocked_by_gate':True,'auto_send_enabled':False,'send_ready':False,'auto_sent':False,
      'send_state':'prepared_pending_gate_unlock','defer_reason':'manual gate lock active; do not auto-send','timezone_normalized':True,
      'execution_date':'2026-03-03','window_id':'Q2','send_after_local':'2026-03-03 15:10','send_before_local':'2026-03-03 16:40',
      'gate4_unlock_by_local':'2026-03-03 15:00','prepared_at_local':'2026-03-03 01:50','followup_1_at_local':'2026-03-04 15:10',
      'followup_2_at_local':'2026-03-06 15:10','followup_3_at_local':'2026-03-10 15:10','send_after_utc':sa,'send_before_utc':sb,
      'gate4_unlock_by_utc':gu,'followup_1_at_utc':fu1,'followup_2_at_utc':fu2,'followup_3_at_utc':fu3,
      'followups':{'fu1_at_local':'2026-03-04 15:10','fu2_at_local':'2026-03-06 15:10','fu3_at_local':'2026-03-10 15:10',
                  'fu1_at_utc':fu1,'fu2_at_utc':fu2,'fu3_at_utc':fu3,'policy':'fu1:+24h swap-channel, fu2:+72h call+vm|nudge, fu3:+7d breakup CTA SITE'}
    }
    app.append(obj)
    existing.add(key)

if len(app)!=8:
    raise SystemExit(f'expected 8 appended, got {len(app)}')

with p.open('a',encoding='utf-8') as f:
    for o in app:
        f.write(json.dumps(o,separators=(',',':'))+'\n')
print('\n'.join(o['id'] for o in app))
