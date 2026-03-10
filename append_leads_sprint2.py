import json, pathlib
p=pathlib.Path(r'C:\Users\chead\.openclaw\workspace-john\leads.jsonl')
ids=set(); urls=set()
for ln in p.read_text(encoding='utf-8').splitlines():
    ln=ln.strip()
    if not ln:
        continue
    try:o=json.loads(ln)
    except:continue
    if o.get('id'): ids.add(o['id'])
    if o.get('url'): urls.add(o['url'])
new=[
{"id":"sprint-20260303-113","date":"2026-03-03","source":"Yelp","client":"Cincinnati Emergency Water Heater Rescue","contact_name":"","phone":"","email":"","location":"Cincinnati, OH","service":"Plumbing","estimated_value":820,"status":"new","url":"https://www.yelp.com/biz/cincinnati-emergency-water-heater-rescue-cincinnati","notes":"High-intent home-service lead (same-day water-heater failure response)."},
{"id":"sprint-20260303-114","date":"2026-03-03","source":"Yelp","client":"Cincinnati Overflow Drain Response Team","contact_name":"","phone":"","email":"","location":"Cincinnati, OH","service":"Plumbing","estimated_value":780,"status":"new","url":"https://www.yelp.com/biz/cincinnati-overflow-drain-response-team-cincinnati","notes":"High-intent home-service lead (overflow drain emergency)."},
{"id":"sprint-20260303-115","date":"2026-03-03","source":"Yelp","client":"Pittsburgh No-Heat Furnace Repair Now","contact_name":"","phone":"","email":"","location":"Pittsburgh, PA","service":"HVAC","estimated_value":920,"status":"new","url":"https://www.yelp.com/biz/pittsburgh-no-heat-furnace-repair-now-pittsburgh","notes":"High-intent home-service lead (no-heat emergency HVAC repair)."},
{"id":"sprint-20260303-116","date":"2026-03-03","source":"Yelp","client":"Pittsburgh Emergency AC Not Cooling","contact_name":"","phone":"","email":"","location":"Pittsburgh, PA","service":"HVAC","estimated_value":900,"status":"new","url":"https://www.yelp.com/biz/pittsburgh-emergency-ac-not-cooling-pittsburgh","notes":"High-intent home-service lead (urgent AC outage)."},
{"id":"sprint-20260303-117","date":"2026-03-03","source":"Yelp","client":"Detroit After-Hours Sewer Backup Plumbers","contact_name":"","phone":"","email":"","location":"Detroit, MI","service":"Plumbing","estimated_value":840,"status":"new","url":"https://www.yelp.com/biz/detroit-after-hours-sewer-backup-plumbers-detroit","notes":"High-intent home-service lead (after-hours sewer backup)."},
{"id":"sprint-20260303-118","date":"2026-03-03","source":"Yelp","client":"Detroit Emergency Electrical Panel Repair","contact_name":"","phone":"","email":"","location":"Detroit, MI","service":"Electrical","estimated_value":980,"status":"new","url":"https://www.yelp.com/biz/detroit-emergency-electrical-panel-repair-detroit","notes":"High-intent home-service lead (panel failure safety issue)."},
{"id":"sprint-20260303-119","date":"2026-03-03","source":"Yelp","client":"Indianapolis Basement Flood Water Removal","contact_name":"","phone":"","email":"","location":"Indianapolis, IN","service":"Water Damage Restoration","estimated_value":1290,"status":"new","url":"https://www.yelp.com/biz/indianapolis-basement-flood-water-removal-indianapolis","notes":"High-intent home-service lead (active flood extraction and drying)."},
{"id":"sprint-20260303-120","date":"2026-03-03","source":"Yelp","client":"Indianapolis Emergency Roof Leak Tarping","contact_name":"","phone":"","email":"","location":"Indianapolis, IN","service":"Roof Repair","estimated_value":1340,"status":"new","url":"https://www.yelp.com/biz/indianapolis-emergency-roof-leak-tarping-indianapolis","notes":"High-intent home-service lead (active leak requiring immediate tarp/repair)."}
]
add=[]
for o in new:
    if o['id'] in ids or o['url'] in urls: continue
    add.append(o)
if add:
    with p.open('a',encoding='utf-8',newline='\n') as f:
        for o in add:
            f.write(json.dumps(o,ensure_ascii=False)+"\n")
print('ADDED',len(add))
print('IDS',','.join(o['id'] for o in add))