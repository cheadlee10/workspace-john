import json
from pathlib import Path
tr=json.loads(Path('outbound_send_tracker_2026-03-03.json').read_text(encoding='utf-8'))
ls=tr['lead_schedule']
print(type(ls).__name__, len(ls))
for e in ls[-8:]:
    print(e.get('id'), e.get('send_after_local'), e.get('gate_status'), e.get('auto_send_enabled'))
