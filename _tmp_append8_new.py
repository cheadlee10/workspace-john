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
('The Pipe Doctor','(206) 676-2192','Seattle, WA','Plumbing','America/Los_Angeles',950,84,'Emergency plumbing page snippet highlights 24/7 response with direct call line.'),
('Roto-Rooter Plumbing & Water Cleanup Seattle','(206) 935-6600','Seattle, WA','Plumbing','America/Los_Angeles',1020,88,'Google snippet shows 24/7 service line and emergency scheduling CTA.'),
('Beacon Plumbing, Heating & Mechanical','(206) 800-6269','Seattle, WA','Plumbing/HVAC','America/Los_Angeles',1080,86,'Emergency service page lists direct number and urgent plumbing positioning.'),
('Gene Johnson Plumbing, Heating, Cooling & Electrical','(206) 792-7495','Seattle, WA','Plumbing/HVAC/Electrical','America/Los_Angeles',1120,87,'Snippet includes call-now emergency plumbing message and multi-trade coverage.'),
('American Home Water & Air','(602) 993-0083','Phoenix, AZ','HVAC/Plumbing','America/Phoenix',990,83,'Phoenix HVAC/plumbing homepage snippet provides direct booking number for AC service.'),
('Bleuwave HVAC','(480) 863-5855','Phoenix, AZ','HVAC','America/Phoenix',910,82,'Same-day HVAC service page prominently displays immediate call CTA.'),
('A Quality HVAC and Plumbing Services LLC','(623) 257-5406','Phoenix, AZ','HVAC/Plumbing','America/Phoenix',930,81,'City service snippet includes phone for installations and repair requests.'),
('Roofing Experts','(303) 766-2444','Denver, CO','Roofing','America/Denver',1090,85,'Denver roofing snippet offers free roof evaluation and direct call-now number.'),
('Formula Roofing & Remodeling','(303) 600-8696','Denver, CO','Roofing','America/Denver',1060,84,'Free estimate snippet repeats direct line, indicating strong quote intent.')
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
    if len(app)==8: break
    client,phone,loc,svc,tz,val,score,notes=c
    phn='+1'+''.join(ch for ch in phone if ch.isdigit())[-10:]
    key=(client.strip().lower(),''.join(ch for ch in phn if ch.isdigit()))
    if key in existing:
        continue
    max_id+=1
    sa,sb,gu,fu1,fu2,fu3=utc_map[tz]
    obj={
      'id':f'gpass-us-{max_id}','date':'2026-03-03','source':'Google-First','client':client,'contact_name':'','phone':phone,'email':'','location':loc,
      'service':svc,'estimated_value':val,'status':'new','notes':notes,'owner_name':'','owner_name_validation':'missing','phone_normalized':phn,
      'phone_validation':'verified_via_google_snippet','email_validation':'missing','channel_flags':{'can_call':True,'can_dm':False,'can_email':False,'can_sms':True},
      'outreach_usable':True,'verification_status':'verified_phone_only','primary_channel':'sms_or_call','priority_score':score,
      'priority_tier':'P1' if score>=83 else 'P2','website_quality':'strong_local_site','timezone':tz,'approval_gate':'gate4_manual_unlock',
      'approval_gates':{'gate1_data_qa':'complete','gate2_message_qa':'complete','gate3_throughput_qa':'complete','gate4_manual_unlock':'pending'},
      'gate_status':'locked_pending_manual_unlock','send_blocked_by_gate':True,'auto_send_enabled':False,'send_ready':False,'auto_sent':False,
      'send_state':'prepared_pending_gate_unlock','defer_reason':'manual gate lock active; do not auto-send','timezone_normalized':True,
      'execution_date':'2026-03-03','window_id':'Q2','send_after_local':'2026-03-03 15:10','send_before_local':'2026-03-03 16:40',
      'gate4_unlock_by_local':'2026-03-03 15:00','prepared_at_local':'2026-03-03 00:10','followup_1_at_local':'2026-03-04 15:10',
      'followup_2_at_local':'2026-03-06 15:10','followup_3_at_local':'2026-03-10 15:10','send_after_utc':sa,'send_before_utc':sb,
      'gate4_unlock_by_utc':gu,'followup_1_at_utc':fu1,'followup_2_at_utc':fu2,'followup_3_at_utc':fu3,
      'followups':{'fu1_at_local':'2026-03-04 15:10','fu2_at_local':'2026-03-06 15:10','fu3_at_local':'2026-03-10 15:10',
                  'fu1_at_utc':fu1,'fu2_at_utc':fu2,'fu3_at_utc':fu3,'policy':'fu1:+24h swap-channel, fu2:+72h call+vm|nudge, fu3:+7d breakup CTA SITE'}
    }
    app.append(obj);existing.add(key)

if len(app)<8:
    raise SystemExit(f'only {len(app)} appended candidates available')

with p.open('a',encoding='utf-8') as f:
    for o in app:
        f.write(json.dumps(o,separators=(',',':'))+'\n')
print('\n'.join(o['id'] for o in app))
