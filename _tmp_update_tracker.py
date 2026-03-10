import json
from pathlib import Path
p=Path('outbound_send_tracker_2026-03-02.json')
data=json.loads(p.read_text(encoding='utf-8'))
planned=[]
for e in data.get('lead_schedule',[]):
    planned.append({
        'lead_id': e['lead_id'],
        'timezone': e.get('execution_timezone','America/Los_Angeles'),
        'window_id': e.get('window_id'),
        'send_after_local': e.get('send_after_local'),
        'send_before_local': e.get('send_before_local'),
        'gate4_unlock_by_local': e.get('gate4_unlock_by_local'),
        'approval_gate': 'gate4_manual_unlock',
        'gate_status': e.get('gate_status','locked_pending_manual_unlock'),
        'send_ready': False,
        'send_state': 'prepared_pending_gate_unlock',
        'auto_send_enabled': False,
        'auto_sent': False,
        'defer_reason': e.get('defer_reason','manual gate lock active; pending gate4 unlock'),
        'followups': {
            'fu1_at_local': e.get('followup_1_at_local'),
            'fu2_at_local': e.get('followup_2_at_local'),
            'fu3_at_local': e.get('followup_3_at_local'),
            'policy': 'fu1:+24h swap-channel, fu2:+72h call+vm|nudge, fu3:+7d breakup CTA SITE'
        }
    })

data['first_touches_planned']=planned
# Explicit hard-lock marker for this sprint
data['auto_send_enabled']=False
data['gate_status']='locked_pending_manual_unlock'
p.write_text(json.dumps(data,indent=2)+"\n",encoding='utf-8')
print('updated',len(planned),'planned entries')
