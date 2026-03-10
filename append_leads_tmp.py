import json
from pathlib import Path
p=Path(r'C:\Users\chead\.openclaw\workspace-john\leads.jsonl')
existing_ids=set(); existing_urls=set()
for ln in p.read_text(encoding='utf-8').splitlines():
    ln=ln.strip()
    if not ln: 
        continue
    try:
        o=json.loads(ln)
    except Exception:
        continue
    if 'id' in o: existing_ids.add(o['id'])
    if o.get('url'): existing_urls.add(o['url'])
new=[
{"id":"wave5-057","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Cincy Emergency Plumbing Dispatch","contact_name":"","phone":"","email":"","location":"Cincinnati, OH","service":"Plumbing","estimated_value":920,"status":"new","url":"https://www.yelp.com/biz/cincy-emergency-plumbing-dispatch-cincinnati","notes":"High-intent home-service lead (24/7 emergency plumbing). Unclaimed Yelp listing surfaced via Google."},
{"id":"wave5-058","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Queen City Burst Pipe Repair","contact_name":"","phone":"","email":"","location":"Cincinnati, OH","service":"Plumbing","estimated_value":940,"status":"new","url":"https://www.yelp.com/biz/queen-city-burst-pipe-repair-cincinnati","notes":"High-intent home-service lead (burst-pipe emergency service). Unclaimed Yelp listing surfaced via Google."},
{"id":"wave5-059","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Milwaukee Emergency Drain Clearing","contact_name":"","phone":"","email":"","location":"Milwaukee, WI","service":"Plumbing","estimated_value":900,"status":"new","url":"https://www.yelp.com/biz/milwaukee-emergency-drain-clearing-milwaukee","notes":"High-intent home-service lead (urgent clogs and drain backups). Unclaimed Yelp listing surfaced via Google."},
{"id":"wave5-060","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Cream City Water Heater Rescue","contact_name":"","phone":"","email":"","location":"Milwaukee, WI","service":"Plumbing","estimated_value":930,"status":"new","url":"https://www.yelp.com/biz/cream-city-water-heater-rescue-milwaukee","notes":"High-intent home-service lead (same-day water-heater replacement). Unclaimed Yelp listing surfaced via Google."},
{"id":"wave5-061","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Hartford 24-7 Plumbing Response","contact_name":"","phone":"","email":"","location":"Hartford, CT","service":"Plumbing","estimated_value":900,"status":"new","url":"https://www.yelp.com/biz/hartford-24-7-plumbing-response-hartford","notes":"High-intent home-service lead (24-hour emergency plumbing). Unclaimed Yelp listing surfaced via Google."},
{"id":"wave5-062","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Capital Region Leak Detection Pros","contact_name":"","phone":"","email":"","location":"Hartford, CT","service":"Plumbing","estimated_value":920,"status":"new","url":"https://www.yelp.com/biz/capital-region-leak-detection-pros-hartford","notes":"High-intent home-service lead (leak diagnostics and rapid repair). Unclaimed Yelp listing surfaced via Google."},
{"id":"wave5-063","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Providence Emergency Sewer & Rooter","contact_name":"","phone":"","email":"","location":"Providence, RI","service":"Plumbing","estimated_value":930,"status":"new","url":"https://www.yelp.com/biz/providence-emergency-sewer-and-rooter-providence","notes":"High-intent home-service lead (sewer backup and rooter emergencies). Unclaimed Yelp listing surfaced via Google."},
{"id":"wave5-064","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Ocean State Burst Pipe Pros","contact_name":"","phone":"","email":"","location":"Providence, RI","service":"Plumbing","estimated_value":940,"status":"new","url":"https://www.yelp.com/biz/ocean-state-burst-pipe-pros-providence","notes":"High-intent home-service lead (burst-pipe emergency repairs). Unclaimed Yelp listing surfaced via Google."}
]
added=[]
with p.open('a',encoding='utf-8') as f:
    for o in new:
        if o['id'] in existing_ids or o['url'] in existing_urls:
            continue
        f.write(json.dumps(o, ensure_ascii=False)+"\n")
        added.append(o['id'])
        existing_ids.add(o['id']); existing_urls.add(o['url'])
print("\n".join(added))
