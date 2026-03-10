import json
from pathlib import Path
root=Path(r'C:/Users/chead/.openclaw/workspace-john')
existing=set()
for p in (root/'sites').iterdir():
    if not p.is_dir():
        continue
    if p.name.startswith('premium-v3-wave'):
        for d in p.iterdir():
            if d.is_dir():
                existing.add(d.name)
    else:
        existing.add(p.name)
items=[]
for line in (root/'outreach_queue.jsonl').read_text(encoding='utf-8').splitlines():
    if not line.strip():
        continue
    try:
        d=json.loads(line)
    except Exception:
        continue
    slug=d.get('slug') or ''
    if not slug or slug in existing:
        continue
    tier=d.get('tier')
    score=d.get('priority_score') or d.get('score') or 0
    est=d.get('estimated_value') or d.get('est_value') or 0
    items.append((0 if tier=='P1' else 1 if tier=='P2' else 2, -(score or 0), -(est or 0), slug,d))
items.sort()
print('available',len(items))
for t in items[:20]:
    _,ns,ne,slug,d=t
    print(f"{slug}|{d.get('tier')}|{-ns}|{-ne}|{d.get('business_name')}|{d.get('service_type')}|{d.get('city')},{d.get('state')}|{d.get('id')}|{d.get('phone') or ''}")
