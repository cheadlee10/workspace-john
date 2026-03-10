import json, re, os

def slug(s):
    s = s.lower().replace('&', ' and ')
    s = re.sub(r'[^a-z0-9]+', '-', s)
    s = re.sub(r'-+', '-', s).strip('-')
    return s

all_leads = []
for fn in ['nosite_top20_leads.jsonl', 'leads_nosite_hunt.jsonl']:
    with open(fn, encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line:
                all_leads.append(json.loads(line))

dirs = set()
for root, subdirs, files in os.walk('sites'):
    for d in subdirs:
        dirs.add(d)

seen = set()
uniq = []
for l in all_leads:
    s = slug(f"{l.get('business_name','')}-{l.get('city','')}")
    if s and s not in dirs and s not in seen:
        seen.add(s)
        uniq.append({
            'id': l.get('id', ''),
            'business_name': l.get('business_name', ''),
            'city': l.get('city', ''),
            'service_type': l.get('service_type', ''),
            'priority': l.get('priority', ''),
            'slug': s,
            'notes': l.get('notes', '')
        })

print('uncovered', len(uniq))
for o in uniq[:50]:
    print(json.dumps(o))
