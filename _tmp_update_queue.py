import json
from pathlib import Path
qpath=Path('outreach_queue.jsonl')
tracker=json.loads(Path('outbound_send_tracker_2026-03-02.json').read_text(encoding='utf-8'))
ids=set(tracker.get('lead_ids',[]))
lines=qpath.read_text(encoding='utf-8').splitlines()
out=[]
count=0
for l in lines:
    if not l.strip():
        continue
    o=json.loads(l)
    if o.get('id') in ids:
        # enforce queue lock semantics and timezone normalization fields
        o.setdefault('timezone','America/Los_Angeles')
        o['send_ready']=False
        o['auto_sent']=False
        o['auto_send_enabled']=False
        o['send_state']='prepared_pending_gate_unlock'
        o['gate_status']='locked_pending_manual_unlock'
        o['send_blocked_by_gate']=True
        o.setdefault('defer_reason','manual gate lock active; do not auto-send')
        if 'followups' in o:
            fu=o['followups']
            fu.setdefault('policy','fu1:+24h swap-channel, fu2:+72h call+vm|nudge, fu3:+7d breakup CTA SITE')
            o['followups']=fu
        count+=1
    out.append(json.dumps(o,ensure_ascii=False))
qpath.write_text('\n'.join(out)+'\n',encoding='utf-8')
print('updated queue records',count)
