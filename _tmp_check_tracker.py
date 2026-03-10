import json
from pathlib import Path
tr=json.loads(Path('outbound_send_tracker_2026-03-03.json').read_text(encoding='utf-8'))
ids=tr.get('lead_ids',[])
print('lead_ids count',len(ids),'last',ids[-12:])
s=tr.get('lead_schedule',{})
print('lead_schedule count',len(s))
for i in ids[-12:]:
    e=s.get(i,{})
    print(i, {k:e.get(k) for k in ['send_after_local','send_before_local','gate_status','auto_send_enabled','followup_1_at_local','followup_2_at_local','followup_3_at_local','prepared_at_local']})
