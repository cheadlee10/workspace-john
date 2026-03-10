import json,re
from pathlib import Path
p=Path('outreach_queue.jsonl')
lines=p.read_text(encoding='utf-8').splitlines()
existing=set(); max_id=0
for ln in lines:
    try:j=json.loads(ln)
    except:continue
    m=re.match(r'gpass-us-(\d+)$',j.get('id',''))
    if m:max_id=max(max_id,int(m.group(1)))
    existing.add((j.get('client','').strip().lower(),re.sub(r'\D','',j.get('phone',''))))
cands=[
    dict(client='Graham Plumbing Services',phone='(281) 302-6710',email='',location='Houston, TX',service='Plumbing',estimated_value=980,priority_score=83,priority_tier='P1',website_quality='strong_local_site',timezone='America/Chicago',verification_status='verified_phone_only',primary_channel='sms_or_call',notes='Brave snippet on grahamplumbingservices.com states "Call 281-302-6710" for Houston metro plumbing service.'),
    dict(client='Village Plumbing, Air & Electric',phone='(713) 526-1491',email='',location='Houston, TX',service='Plumbing/HVAC/Electrical',estimated_value=1060,priority_score=85,priority_tier='P1',website_quality='strong_local_site',timezone='America/Chicago',verification_status='verified_phone_only',primary_channel='sms_or_call',notes='Brave snippet for villageplumbing.com lists urgent assistance line: (713) 526-1491 in Houston metro.'),
    dict(client='Tribeca Plumbing, Inc.',phone='(214) 402-5454',email='',location='Dallas, TX',service='Plumbing/HVAC',estimated_value=990,priority_score=82,priority_tier='P1',website_quality='strong_local_site',timezone='America/Chicago',verification_status='verified_phone_only',primary_channel='sms_or_call',notes='Brave snippet for tribecaplumbinginc.com says call (214) 402-5454 for Dallas plumbing/HVAC contractor services.'),
    dict(client='Ares Plumbing',phone='(214) 865-8772',email='',location='Dallas, TX',service='Plumbing',estimated_value=940,priority_score=80,priority_tier='P2',website_quality='strong_local_site',timezone='America/Chicago',verification_status='verified_phone_only',primary_channel='sms_or_call',notes='Brave snippet for aresplumbingtx.com lists Dallas service phone (214) 865-8772.'),
    dict(client='Total Plumbing',phone='(972) 681-4434',email='',location='Dallas, TX',service='Plumbing',estimated_value=930,priority_score=79,priority_tier='P2',website_quality='strong_local_site',timezone='America/Chicago',verification_status='verified_phone_only',primary_channel='sms_or_call',notes='Brave snippet for totalplumbing.net/dallas-plumber provides licensed plumbers line 972-681-4434.'),
    dict(client='One Hour Heating & Air Conditioning of Charlotte',phone='(704) 703-4220',email='',location='Charlotte, NC',service='HVAC',estimated_value=970,priority_score=81,priority_tier='P1',website_quality='strong_local_site',timezone='America/New_York',verification_status='verified_phone_only',primary_channel='sms_or_call',notes='Brave snippet for onehourheatandair.com Charlotte emergency HVAC page shows (704) 703-4220.'),
    dict(client='Phoenix Roofing and Renovations',phone='(629) 356-5356',email='',location='Nashville, TN',service='Roofing',estimated_value=1110,priority_score=84,priority_tier='P1',website_quality='strong_local_site',timezone='America/Chicago',verification_status='verified_phone_only',primary_channel='sms_or_call',notes='Brave snippet for phoenixrnr.com shows Nashville inspection/contact number (629) 356-5356.'),
    dict(client='E Dennis Heating, Cooling, Plumbing & Electrical',phone='(770) 758-0501',email='',location='Atlanta, GA',service='Electrical/HVAC/Plumbing',estimated_value=1000,priority_score=82,priority_tier='P1',website_quality='strong_local_site',timezone='America/New_York',verification_status='verified_phone_only',primary_channel='sms_or_call',notes='Brave snippet for edennisacinc.com electrical services page says call (770) 758-0501 to schedule service.'),
]
new=[]
for c in cands:
    key=(c['client'].strip().lower(),re.sub(r'\D','',c['phone']))
    if key in existing: continue
    existing.add(key); max_id+=1; c['id']=f'gpass-us-{max_id}'; new.append(c)
if len(new)!=8: raise SystemExit(f'Expected 8 new leads, got {len(new)} after dedupe')
common={'date':'2026-03-03','source':'Google-First','contact_name':'','status':'new','owner_name':'','owner_name_validation':'missing','phone_validation':'verified_via_google_snippet','email_validation':'missing','outreach_usable':True,'approval_gate':'gate4_manual_unlock','approval_gates':{'gate1_data_qa':'complete','gate2_message_qa':'complete','gate3_throughput_qa':'complete','gate4_manual_unlock':'pending'},'gate_status':'locked_pending_manual_unlock','send_blocked_by_gate':True,'send_ready':False,'send_state':'prepared_pending_gate_unlock','auto_send_enabled':False,'auto_sent':False,'defer_reason':'manual gate lock active; do not auto-send','timezone_normalized':True,'window_id':'Q2','execution_date':'2026-03-03','send_after_local':'2026-03-03 15:10','send_before_local':'2026-03-03 16:40','prepared_at_local':'2026-03-03 03:10'}
map_send_after={'America/New_York':'2026-03-03 20:10','America/Chicago':'2026-03-03 21:10','America/Denver':'2026-03-03 22:10','America/Los_Angeles':'2026-03-03 23:10','America/Phoenix':'2026-03-03 22:10'}
map_send_before={'America/New_York':'2026-03-03 21:40','America/Chicago':'2026-03-03 22:40','America/Denver':'2026-03-03 23:40','America/Los_Angeles':'2026-03-04 00:40','America/Phoenix':'2026-03-03 23:40'}
map_gate4={'America/New_York':'2026-03-03 20:00','America/Chicago':'2026-03-03 21:00','America/Denver':'2026-03-03 22:00','America/Los_Angeles':'2026-03-03 23:00','America/Phoenix':'2026-03-03 22:00'}
map_f1={'America/New_York':'2026-03-04 20:10','America/Chicago':'2026-03-04 21:10','America/Denver':'2026-03-04 22:10','America/Los_Angeles':'2026-03-04 23:10','America/Phoenix':'2026-03-04 22:10'}
map_f2={'America/New_York':'2026-03-06 20:10','America/Chicago':'2026-03-06 21:10','America/Denver':'2026-03-06 22:10','America/Los_Angeles':'2026-03-06 23:10','America/Phoenix':'2026-03-06 22:10'}
map_f3={'America/New_York':'2026-03-10 19:10','America/Chicago':'2026-03-10 20:10','America/Denver':'2026-03-10 21:10','America/Los_Angeles':'2026-03-10 22:10','America/Phoenix':'2026-03-10 22:10'}

def normphone(ph):
    d=re.sub(r'\D','',ph)
    return '+'+('1'+d if len(d)==10 else d)

with p.open('a',encoding='utf-8') as f:
  for c in new:
    tz=c['timezone']
    rec={**common,**c,'phone_normalized':normphone(c['phone']),'channel_flags':{'can_call':True,'can_sms':True,'can_email':bool(c['email']),'can_dm':False},'email_validation':'verified_via_google_snippet' if c['email'] else 'missing','send_after_utc':map_send_after.get(tz,'2026-03-03 21:10'),'send_before_utc':map_send_before.get(tz,'2026-03-03 22:40'),'gate4_unlock_by_local':'2026-03-03 15:00','gate4_unlock_by_utc':map_gate4.get(tz,'2026-03-03 21:00'),'followup_1_at_local':'2026-03-04 15:10','followup_2_at_local':'2026-03-06 15:10','followup_3_at_local':'2026-03-10 15:10','followup_1_at_utc':map_f1.get(tz,'2026-03-04 21:10'),'followup_2_at_utc':map_f2.get(tz,'2026-03-06 21:10'),'followup_3_at_utc':map_f3.get(tz,'2026-03-10 20:10')}
    rec['followups']={'fu1_at_local':rec['followup_1_at_local'],'fu2_at_local':rec['followup_2_at_local'],'fu3_at_local':rec['followup_3_at_local'],'fu1_at_utc':rec['followup_1_at_utc'],'fu2_at_utc':rec['followup_2_at_utc'],'fu3_at_utc':rec['followup_3_at_utc'],'policy':'fu1:+24h swap-channel, fu2:+72h call+vm|nudge, fu3:+7d breakup CTA SITE'}
    f.write('\n'+json.dumps(rec,separators=(',',':')))
for c in new: print(c['id'])
