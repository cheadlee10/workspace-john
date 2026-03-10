import json, os, re


def slug(s: str) -> str:
    s = s.lower().replace('&', ' and ')
    s = re.sub(r'[^a-z0-9]+', '-', s)
    return re.sub(r'-+', '-', s).strip('-')

covered = set()
for root, dirs, files in os.walk('sites'):
    for d in dirs:
        covered.add(d)

cands = []
seen = set()
with open('leads.jsonl', encoding='utf-8', errors='ignore') as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        try:
            o = json.loads(line)
        except Exception:
            continue
        if o.get('status') != 'new' or not o.get('outreach_usable'):
            continue
        s = slug(f"{o.get('client','')}-{o.get('location','')}")
        if not s or s in covered or s in seen:
            continue
        seen.add(s)
        notes = o.get('notes', '') or ''
        score = int(o.get('estimated_value') or 0)
        if 'HIGHEST VALUE' in notes:
            score += 400
        elif 'HIGH VALUE' in notes:
            score += 200
        cands.append({
            'score': score,
            'id': o.get('id'),
            'client': o.get('client'),
            'location': o.get('location'),
            'service': o.get('service'),
            'value': o.get('estimated_value'),
            'phone': o.get('phone',''),
            'slug': s,
            'notes': notes
        })

cands.sort(key=lambda x: x['score'], reverse=True)
for c in cands[:25]:
    print(json.dumps(c, ensure_ascii=False))
