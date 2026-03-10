import json
from pathlib import Path
tr=json.loads(Path('outbound_send_tracker_2026-03-03.json').read_text(encoding='utf-8'))
for e in tr['lead_schedule'][-2:]:
    print(e.keys())
    print(e)
