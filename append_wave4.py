import json
from pathlib import Path

path = Path('C:/Users/chead/.openclaw/workspace-john/leads.jsonl')
existing_ids=set()
existing_urls=set()
with path.open('r', encoding='utf-8') as f:
    for line in f:
        line=line.strip()
        if not line:
            continue
        try:
            obj=json.loads(line)
        except Exception:
            continue
        if 'id' in obj:
            existing_ids.add(obj['id'])
        u=obj.get('url')
        if isinstance(u,str) and u.strip():
            existing_urls.add(u.strip())

candidates=[
    {"id":"wave4-009","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Austin's Best Plumbing","contact_name":"","phone":"","email":"","location":"Austin, TX","service":"Plumbing","estimated_value":450,"status":"new","url":"https://www.yelp.com/biz/austins-best-plumbing-austin","notes":"High-intent home-service lead (plumbing). Unclaimed Yelp listing surfaced via Google."},
    {"id":"wave4-010","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Austin Plumbing","contact_name":"","phone":"","email":"","location":"Austin, TX","service":"Plumbing","estimated_value":500,"status":"new","url":"https://www.yelp.com/biz/austin-plumbing-austin-4","notes":"High-intent home-service lead (24hr plumbing). Unclaimed Yelp listing surfaced via Google."},
    {"id":"wave4-011","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Standard Plumbing","contact_name":"","phone":"","email":"","location":"Austin, TX","service":"Plumbing","estimated_value":500,"status":"new","url":"https://www.yelp.com/biz/standard-plumbing-austin-5","notes":"High-intent home-service lead (residential plumbing). Unclaimed Yelp listing surfaced via Google."},
    {"id":"wave4-012","date":"2026-03-03","source":"Yelp-Unclaimed","client":"A&T Service Plumbing","contact_name":"","phone":"","email":"","location":"Austin, TX","service":"Plumbing","estimated_value":500,"status":"new","url":"https://www.yelp.com/biz/a-and-t-service-plumbing-austin","notes":"High-intent home-service lead (sewer/water-heater plumbing). Unclaimed Yelp listing surfaced via Google."},
    {"id":"wave4-013","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Precision Plumbing","contact_name":"","phone":"(512) 288-6684","email":"","location":"Austin, TX","service":"Plumbing","estimated_value":500,"status":"new","url":"https://www.yelp.com/biz/precision-plumbing-austin","notes":"High-intent home-service lead with phone. Unclaimed Yelp listing surfaced via Google."},
    {"id":"wave4-014","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Cold is on the Right Plumbing","contact_name":"","phone":"","email":"","location":"Austin, TX","service":"Plumbing","estimated_value":500,"status":"new","url":"https://www.yelp.com/biz/cold-is-on-the-right-plumbing-austin","notes":"High-intent home-service lead (residential plumbing). Unclaimed Yelp listing surfaced via Google."},
    {"id":"wave4-015","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Fast Plumbing","contact_name":"","phone":"","email":"","location":"Austin, TX","service":"Plumbing","estimated_value":500,"status":"new","url":"https://www.yelp.com/biz/fast-plumbing-austin-2","notes":"High-intent home-service lead (drain/leak/water-heater plumbing). Unclaimed Yelp listing surfaced via Google."},
    {"id":"wave4-016","date":"2026-03-03","source":"Yelp-Unclaimed","client":"USA Plumbing","contact_name":"","phone":"","email":"","location":"Austin, TX","service":"Plumbing","estimated_value":500,"status":"new","url":"https://www.yelp.com/biz/usa-plumbing-austin-2","notes":"High-intent home-service lead (local plumbing). Unclaimed Yelp listing surfaced via Google."}
]

added=[]
with path.open('a', encoding='utf-8') as f:
    for c in candidates:
        if c['id'] in existing_ids:
            continue
        if c['url'] in existing_urls:
            continue
        f.write(json.dumps(c, ensure_ascii=False)+'\n')
        added.append(c['id'])
        existing_ids.add(c['id'])
        existing_urls.add(c['url'])

print('\n'.join(added))
