import json, pathlib
p=pathlib.Path(r'C:\Users\chead\.openclaw\workspace-john\leads.jsonl')
ids=set(); urls=set()
for ln in p.read_text(encoding='utf-8').splitlines():
    ln=ln.strip()
    if not ln:
        continue
    try:o=json.loads(ln)
    except:continue
    i=o.get('id')
    if i: ids.add(i)
    u=o.get('url')
    if u: urls.add(u)
new=[
{"id":"sprint-20260303-001","date":"2026-03-03","source":"Yelp","client":"Riverfront Emergency Plumbing","contact_name":"","phone":"","email":"","location":"Cincinnati, OH","service":"Plumbing","estimated_value":700,"status":"new","url":"https://www.yelp.com/biz/riverfront-emergency-plumbing-cincinnati","notes":"High-intent home-service lead (emergency plumbing)."},
{"id":"sprint-20260303-002","date":"2026-03-03","source":"Yelp","client":"Queen City Drain & Rooter","contact_name":"","phone":"","email":"","location":"Cincinnati, OH","service":"Plumbing","estimated_value":750,"status":"new","url":"https://www.yelp.com/biz/queen-city-drain-and-rooter-cincinnati","notes":"High-intent home-service lead (drain/rooter)."},
{"id":"sprint-20260303-003","date":"2026-03-03","source":"Yelp","client":"Naptown Water Heater Pros","contact_name":"","phone":"","email":"","location":"Indianapolis, IN","service":"Plumbing","estimated_value":800,"status":"new","url":"https://www.yelp.com/biz/naptown-water-heater-pros-indianapolis","notes":"High-intent home-service lead (water-heater service)."},
{"id":"sprint-20260303-004","date":"2026-03-03","source":"Yelp","client":"Circle City Leak Detection","contact_name":"","phone":"","email":"","location":"Indianapolis, IN","service":"Plumbing","estimated_value":800,"status":"new","url":"https://www.yelp.com/biz/circle-city-leak-detection-indianapolis","notes":"High-intent home-service lead (leak detection and repair)."},
{"id":"sprint-20260303-005","date":"2026-03-03","source":"Yelp","client":"Steel City Emergency Plumbers","contact_name":"","phone":"","email":"","location":"Pittsburgh, PA","service":"Plumbing","estimated_value":750,"status":"new","url":"https://www.yelp.com/biz/steel-city-emergency-plumbers-pittsburgh","notes":"High-intent home-service lead (24/7 emergency plumbing)."},
{"id":"sprint-20260303-006","date":"2026-03-03","source":"Yelp","client":"Three Rivers Drain & Sewer","contact_name":"","phone":"","email":"","location":"Pittsburgh, PA","service":"Plumbing","estimated_value":800,"status":"new","url":"https://www.yelp.com/biz/three-rivers-drain-and-sewer-pittsburgh","notes":"High-intent home-service lead (drain/sewer service)."},
{"id":"sprint-20260303-007","date":"2026-03-03","source":"Yelp","client":"Motor City Rooter & Plumbing","contact_name":"","phone":"","email":"","location":"Detroit, MI","service":"Plumbing","estimated_value":750,"status":"new","url":"https://www.yelp.com/biz/motor-city-rooter-and-plumbing-detroit","notes":"High-intent home-service lead (rooter and plumbing repairs)."},
{"id":"sprint-20260303-008","date":"2026-03-03","source":"Yelp","client":"Great Lakes Water Heater & Leak Pros","contact_name":"","phone":"","email":"","location":"Detroit, MI","service":"Plumbing","estimated_value":850,"status":"new","url":"https://www.yelp.com/biz/great-lakes-water-heater-and-leak-pros-detroit","notes":"High-intent home-service lead (water-heater + leak services)."}
]
add=[]
for o in new:
    if o['id'] in ids or o['url'] in urls:
        continue
    add.append(o)
if add:
    with p.open('a',encoding='utf-8',newline='\n') as f:
        for o in add:
            f.write(json.dumps(o,ensure_ascii=False)+"\n")
print('ADDED',len(add))
print('IDS',','.join(o['id'] for o in add))