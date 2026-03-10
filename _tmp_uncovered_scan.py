import json,re
from pathlib import Path
root=Path(r'C:/Users/chead/.openclaw/workspace-john')
covered=set(s.strip() for s in (root/'covered_slugs.txt').read_text(encoding='utf-16',errors='ignore').splitlines() if s.strip())
items=[json.loads(l) for l in (root/'nosite_top20_leads.jsonl').read_text(encoding='utf-8').splitlines() if l.strip()]
rows=[]
for d in items:
    slug=re.sub(r'[^a-z0-9]+','-',((d.get('business_name') or '')+' '+(d.get('city') or '')).lower()).strip('-')
    rows.append((d.get('id'),d.get('priority'),d.get('business_name'),d.get('city'),d.get('category'),slug,slug in covered))
for r in rows:
    if not r[-1]: print(r)
print('uncovered',sum(1 for r in rows if not r[-1]),'of',len(rows))
