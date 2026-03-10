import json, os, re


def slug(s: str) -> str:
    s = s.lower().replace('&', ' and ')
    s = re.sub(r'[^a-z0-9]+', '-', s)
    return re.sub(r'-+', '-', s).strip('-')

def clean_location(loc: str) -> str:
    # remove zip codes
    return re.sub(r'\b\d{5}(?:-\d{4})?\b', '', loc or '').replace('  ', ' ').strip(' ,')

covered = set()
for root, dirs, files in os.walk('sites'):
    for d in dirs:
        covered.add(d)

seen = set()
cands = []
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
        loc = clean_location(o.get('location',''))
        s = slug(f"{o.get('client','')}-{loc}")
        if not s or s in covered or s in seen:
            continue
        seen.add(s)
        score = int(o.get('estimated_value') or 0)
        notes=(o.get('notes') or '')
        if 'HIGHEST VALUE' in notes: score += 400
        elif 'HIGH VALUE' in notes: score += 200
        cands.append((score, {
            'id': o.get('id'), 'client': o.get('client'), 'location': loc,
            'service': o.get('service'), 'value': o.get('estimated_value'),
            'phone': o.get('phone',''), 'slug': s, 'notes': notes
        }))

cands.sort(key=lambda x: x[0], reverse=True)
for score, c in cands[:30]:
    c['score']=score
    print(json.dumps(c, ensure_ascii=False))
