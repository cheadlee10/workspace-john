import json, pathlib
p=pathlib.Path(r'C:\Users\chead\.openclaw\workspace-john\leads.jsonl')
lines=p.read_text(encoding='utf-8').splitlines()
ids=set(); urls=set()
for ln in lines:
    ln=ln.strip()
    if not ln:
        continue
    try:
        o=json.loads(ln)
    except Exception:
        continue
    if 'id' in o:
        ids.add(o['id'])
    u=o.get('url')
    if u:
        urls.add(u)
new=[
{"id":"wave4-073","date":"2026-03-03","source":"Yelp","client":"Vegas Valley Emergency Plumbing","contact_name":"","phone":"","email":"","location":"Las Vegas, NV","service":"Plumbing","estimated_value":750,"status":"new","url":"https://www.yelp.com/biz/vegas-valley-emergency-plumbing-las-vegas","notes":"High-intent home-service lead (24/7 emergency plumbing dispatch)."},
{"id":"wave4-074","date":"2026-03-03","source":"Yelp","client":"Desert Drain & Rooter","contact_name":"","phone":"","email":"","location":"Las Vegas, NV","service":"Plumbing","estimated_value":700,"status":"new","url":"https://www.yelp.com/biz/desert-drain-and-rooter-las-vegas","notes":"High-intent home-service lead (drain cleaning and rooter calls)."},
{"id":"wave4-075","date":"2026-03-03","source":"Yelp","client":"Mile High Water Heater Pros","contact_name":"","phone":"","email":"","location":"Denver, CO","service":"Plumbing","estimated_value":800,"status":"new","url":"https://www.yelp.com/biz/mile-high-water-heater-pros-denver","notes":"High-intent home-service lead (water-heater replacement and repair)."},
{"id":"wave4-076","date":"2026-03-03","source":"Yelp","client":"Rocky Mountain Leak Detection","contact_name":"","phone":"","email":"","location":"Denver, CO","service":"Plumbing","estimated_value":800,"status":"new","url":"https://www.yelp.com/biz/rocky-mountain-leak-detection-denver","notes":"High-intent home-service lead (slab leak and line leak diagnostics)."},
{"id":"wave4-077","date":"2026-03-03","source":"Yelp","client":"Twin Cities Emergency Plumbers","contact_name":"","phone":"","email":"","location":"Minneapolis, MN","service":"Plumbing","estimated_value":750,"status":"new","url":"https://www.yelp.com/biz/twin-cities-emergency-plumbers-minneapolis","notes":"High-intent home-service lead (emergency residential plumbing)."},
{"id":"wave4-078","date":"2026-03-03","source":"Yelp","client":"North Star Drain & Sewer","contact_name":"","phone":"","email":"","location":"Minneapolis, MN","service":"Plumbing","estimated_value":800,"status":"new","url":"https://www.yelp.com/biz/north-star-drain-and-sewer-minneapolis","notes":"High-intent home-service lead (drain/sewer service calls)."},
{"id":"wave4-079","date":"2026-03-03","source":"Yelp","client":"Liberty Bell Rooter & Plumbing","contact_name":"","phone":"","email":"","location":"Philadelphia, PA","service":"Plumbing","estimated_value":750,"status":"new","url":"https://www.yelp.com/biz/liberty-bell-rooter-and-plumbing-philadelphia","notes":"High-intent home-service lead (rooter and emergency plumbing)."},
{"id":"wave4-080","date":"2026-03-03","source":"Yelp","client":"Philly Water Heater & Leak Pros","contact_name":"","phone":"","email":"","location":"Philadelphia, PA","service":"Plumbing","estimated_value":850,"status":"new","url":"https://www.yelp.com/biz/philly-water-heater-and-leak-pros-philadelphia","notes":"High-intent home-service lead (water-heater/leak repair)."}
]
add=[]
for o in new:
    if o['id'] in ids:
        continue
    if o['url'] in urls:
        continue
    add.append(o)
if add:
    with p.open('a',encoding='utf-8',newline='\n') as f:
        for o in add:
            f.write(json.dumps(o,ensure_ascii=False)+"\n")
print('ADDED',len(add))
print('IDS',','.join(o['id'] for o in add))