import json,re
from pathlib import Path
root=Path('C:/Users/chead/.openclaw/workspace-john')
text=(root/'covered_slugs.txt').read_text(encoding='utf-16')
covered=set(s.strip() for s in text.splitlines() if s.strip())
print('covered count',len(covered))
items=[json.loads(line) for line in (root/'nosite_top20_leads.jsonl').read_text(encoding='utf-8').splitlines() if line.strip()]
for d in items:
    slug=re.sub(r'[^a-z0-9]+','-',(d['business_name']+' '+d['city']).lower()).strip('-')
    print(d['id'],d['priority'],slug,'covered' if slug in covered else 'UNCOVERED')
