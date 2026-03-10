import json
from pathlib import Path
q=Path('outreach_queue.jsonl')
rows=[json.loads(l) for l in q.read_text(encoding='utf-8').splitlines() if l.strip()]
latest=rows[-20:]
print('latest ids', [r.get('id') for r in latest])
req=['send_after_local','send_before_local','gate_status','send_blocked_by_gate','auto_send_enabled','followup_1_at_local','followup_2_at_local','followup_3_at_local']
for r in latest:
    miss=[k for k in req if k not in r]
    bad=[]
    if r.get('auto_send_enabled') is not False: bad.append('auto_send_enabled not false')
    if r.get('gate_status')!='locked_pending_manual_unlock': bad.append('gate_status')
    if r.get('send_blocked_by_gate') is not True: bad.append('send_blocked_by_gate')
    if miss or bad:
        print(r['id'], 'miss',miss,'bad',bad)

tr=json.loads(Path('outbound_send_tracker_2026-03-03.json').read_text(encoding='utf-8'))
print('tracker keys', list(tr.keys())[:20])
items=tr.get('queued_leads') or tr.get('leads') or tr.get('entries')
print('items type', type(items).__name__, 'len', len(items) if isinstance(items,list) else 'na')
if isinstance(items,list):
    idx={it.get('id'):it for it in items if isinstance(it,dict)}
    for r in latest:
        it=idx.get(r.get('id'))
        if not it:
            print('missing in tracker',r.get('id'))
            continue
        bad=[]
        for k in ['send_after_local','send_before_local','followup_1_at_local','followup_2_at_local','followup_3_at_local','auto_send_enabled','gate_status']:
            if k not in it: bad.append('no '+k)
        if it.get('auto_send_enabled') is not False: bad.append('auto false')
        if it.get('gate_status')!='locked_pending_manual_unlock': bad.append('gate')
        if bad: print('tracker',r['id'],bad)
else:
    print('tracker format unknown')
