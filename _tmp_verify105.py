import json
q=[json.loads(l) for l in open('outreach_queue.jsonl',encoding='utf-8') if l.strip()]
ids=[f'gpass-us-{i}' for i in range(490,510)]
m={r['id']:r for r in q if r.get('id') in ids}
print('queue found',len(m))
for i in [490,495,500,509]:
 r=m[f'gpass-us-{i}']
 print(r['id'],r['timezone'],r['send_after_local'],r['followup_1_at_utc'],r['auto_send_enabled'],r['gate_status'])

tr=json.load(open('outbound_send_tracker_2026-03-03.json',encoding='utf-8'))
sm={e['lead_id']:e for e in tr['lead_schedule'] if e.get('lead_id') in ids}
print('tracker found',len(sm),'updated_by',tr.get('updated_by'),tr.get('updated_at_local'))
for i in [490,495,500,509]:
 t=sm[f'gpass-us-{i}']
 print(t['lead_id'],t['followup_1_at_utc'],t['auto_send_enabled'],t['gate_status'])
