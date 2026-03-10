import json
tr=json.load(open('outbound_send_tracker_2026-03-03.json','r',encoding='utf-8'))
ids=set(tr.get('lead_ids',[]))
for i in range(490,510):
    lid=f'gpass-us-{i}'
    if lid in ids:
        print('in lead_ids',lid)
ls_ids={e.get('lead_id') for e in tr.get('lead_schedule',[]) if isinstance(e,dict)}
for i in range(490,510):
    lid=f'gpass-us-{i}'
    if lid in ls_ids:
        print('in schedule',lid)
