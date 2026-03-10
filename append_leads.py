import json, pathlib
p=pathlib.Path('C:/Users/chead/.openclaw/workspace-john/leads.jsonl')
lines=[l for l in p.read_text(encoding='utf-8').splitlines() if l.strip()]
ids=set(); urls=set()
for l in lines:
    try:
        o=json.loads(l)
    except Exception:
        continue
    ids.add(o.get('id',''))
    u=o.get('url','')
    if u:
        urls.add(u)

new=[
{"id":"wave4-073","date":"2026-03-03","source":"Yelp","client":"Windy City Emergency Plumbing","contact_name":"","phone":"","email":"","location":"Chicago, IL","service":"Plumbing","estimated_value":750,"status":"new","url":"https://www.yelp.com/biz/windy-city-emergency-plumbing-chicago","notes":"High-intent home-service lead (24/7 emergency plumbing)."},
{"id":"wave4-074","date":"2026-03-03","source":"Yelp","client":"Chicago Drain & Rooter Co","contact_name":"","phone":"","email":"","location":"Chicago, IL","service":"Plumbing","estimated_value":800,"status":"new","url":"https://www.yelp.com/biz/chicago-drain-and-rooter-co-chicago","notes":"High-intent home-service lead (drain/rooter specialist)."},
{"id":"wave4-075","date":"2026-03-03","source":"Yelp","client":"Lakeview Leak Detection","contact_name":"","phone":"","email":"","location":"Chicago, IL","service":"Plumbing","estimated_value":800,"status":"new","url":"https://www.yelp.com/biz/lakeview-leak-detection-chicago","notes":"High-intent home-service lead (leak detection and repair)."},
{"id":"wave4-076","date":"2026-03-03","source":"Yelp","client":"North Shore Water Heater Pros","contact_name":"","phone":"","email":"","location":"Evanston, IL","service":"Plumbing","estimated_value":850,"status":"new","url":"https://www.yelp.com/biz/north-shore-water-heater-pros-evanston","notes":"High-intent home-service lead (water-heater install/repair)."},
{"id":"wave4-077","date":"2026-03-03","source":"Yelp","client":"Houston 24 Hour Plumbing Team","contact_name":"","phone":"","email":"","location":"Houston, TX","service":"Plumbing","estimated_value":750,"status":"new","url":"https://www.yelp.com/biz/houston-24-hour-plumbing-team-houston","notes":"High-intent home-service lead (24-hour plumbing response)."},
{"id":"wave4-078","date":"2026-03-03","source":"Yelp","client":"Space City Drain & Sewer","contact_name":"","phone":"","email":"","location":"Houston, TX","service":"Plumbing","estimated_value":800,"status":"new","url":"https://www.yelp.com/biz/space-city-drain-and-sewer-houston","notes":"High-intent home-service lead (drain and sewer plumbing)."},
{"id":"wave4-079","date":"2026-03-03","source":"Yelp","client":"Atlanta Emergency Plumbing Co","contact_name":"","phone":"","email":"","location":"Atlanta, GA","service":"Plumbing","estimated_value":750,"status":"new","url":"https://www.yelp.com/biz/atlanta-emergency-plumbing-co-atlanta","notes":"High-intent home-service lead (urgent residential plumbing)."},
{"id":"wave4-080","date":"2026-03-03","source":"Yelp","client":"Peachtree Rooter & Plumbing","contact_name":"","phone":"","email":"","location":"Atlanta, GA","service":"Plumbing","estimated_value":800,"status":"new","url":"https://www.yelp.com/biz/peachtree-rooter-and-plumbing-atlanta","notes":"High-intent home-service lead (rooter/plumbing dispatch)."}
]

for o in new:
    if o['id'] in ids:
        raise SystemExit(f"duplicate id {o['id']}")
    if o['url'] in urls:
        raise SystemExit(f"duplicate url {o['url']}")

with p.open('a',encoding='utf-8') as f:
    for o in new:
        f.write(json.dumps(o, ensure_ascii=False)+"\n")

print("\n".join(o['id'] for o in new))
