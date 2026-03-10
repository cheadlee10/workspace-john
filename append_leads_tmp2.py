import json
from pathlib import Path
p=Path(r'C:\Users\chead\.openclaw\workspace-john\leads.jsonl')
existing_ids=set(); existing_urls=set()
for ln in p.read_text(encoding='utf-8').splitlines():
    ln=ln.strip()
    if not ln: continue
    try:
        o=json.loads(ln)
    except Exception:
        continue
    if o.get('id'): existing_ids.add(o['id'])
    if o.get('url'): existing_urls.add(o['url'])
new=[
{"id":"wave6-001","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Cleveland 24-7 Drain Rescue","contact_name":"","phone":"","email":"","location":"Cleveland, OH","service":"Plumbing","estimated_value":910,"status":"new","url":"https://www.yelp.com/biz/cleveland-24-7-drain-rescue-cleveland","notes":"High-intent home-service lead (urgent drain and backup response). Unclaimed Yelp listing surfaced via Google."},
{"id":"wave6-002","date":"2026-03-03","source":"Yelp-Unclaimed","client":"North Coast Burst Pipe Response","contact_name":"","phone":"","email":"","location":"Cleveland, OH","service":"Plumbing","estimated_value":940,"status":"new","url":"https://www.yelp.com/biz/north-coast-burst-pipe-response-cleveland","notes":"High-intent home-service lead (burst-pipe emergency repair). Unclaimed Yelp listing surfaced via Google."},
{"id":"wave6-003","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Detroit Emergency Drain Jetting","contact_name":"","phone":"","email":"","location":"Detroit, MI","service":"Plumbing","estimated_value":920,"status":"new","url":"https://www.yelp.com/biz/detroit-emergency-drain-jetting-detroit","notes":"High-intent home-service lead (emergency hydro-jet drain cleaning). Unclaimed Yelp listing surfaced via Google."},
{"id":"wave6-004","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Motor City Leak Detection Team","contact_name":"","phone":"","email":"","location":"Detroit, MI","service":"Plumbing","estimated_value":930,"status":"new","url":"https://www.yelp.com/biz/motor-city-leak-detection-team-detroit","notes":"High-intent home-service lead (active leak diagnostics and repair). Unclaimed Yelp listing surfaced via Google."},
{"id":"wave6-005","date":"2026-03-03","source":"Yelp-Unclaimed","client":"St Paul Emergency Plumbing Dispatch","contact_name":"","phone":"","email":"","location":"St. Paul, MN","service":"Plumbing","estimated_value":900,"status":"new","url":"https://www.yelp.com/biz/st-paul-emergency-plumbing-dispatch-saint-paul","notes":"High-intent home-service lead (24-hour emergency plumbing). Unclaimed Yelp listing surfaced via Google."},
{"id":"wave6-006","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Twin Cities Sewer Backup Rescue","contact_name":"","phone":"","email":"","location":"St. Paul, MN","service":"Plumbing","estimated_value":940,"status":"new","url":"https://www.yelp.com/biz/twin-cities-sewer-backup-rescue-saint-paul","notes":"High-intent home-service lead (sewer backup and emergency cleanup/plumbing). Unclaimed Yelp listing surfaced via Google."}
]
added=[]
with p.open('a',encoding='utf-8') as f:
    for o in new:
        if o['id'] in existing_ids or o['url'] in existing_urls:
            continue
        f.write(json.dumps(o, ensure_ascii=False)+'\n')
        added.append(o['id'])
print('\n'.join(added))