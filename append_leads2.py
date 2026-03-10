import json, pathlib
p=pathlib.Path('C:/Users/chead/.openclaw/workspace-john/leads.jsonl')
ids=set(); urls=set()
for l in p.read_text(encoding='utf-8').splitlines():
    l=l.strip()
    if not l: continue
    try:o=json.loads(l)
    except: continue
    if o.get('id'): ids.add(o['id'])
    if o.get('url'): urls.add(o['url'])

new=[
{"id":"sprint-20260303-105","date":"2026-03-03","source":"Yelp","client":"Milwaukee Emergency Sewer Backup Team","contact_name":"","phone":"","email":"","location":"Milwaukee, WI","service":"Plumbing","estimated_value":780,"status":"new","url":"https://www.yelp.com/biz/milwaukee-emergency-sewer-backup-team-milwaukee","notes":"High-intent home-service lead (emergency sewer backup response)."},
{"id":"sprint-20260303-106","date":"2026-03-03","source":"Yelp","client":"Cleveland Frozen Pipe Rescue 24/7","contact_name":"","phone":"","email":"","location":"Cleveland, OH","service":"Plumbing","estimated_value":760,"status":"new","url":"https://www.yelp.com/biz/cleveland-frozen-pipe-rescue-24-7-cleveland","notes":"High-intent home-service lead (frozen pipe emergency repair)."},
{"id":"sprint-20260303-107","date":"2026-03-03","source":"Yelp","client":"Detroit Emergency Drain Unclog Service","contact_name":"","phone":"","email":"","location":"Detroit, MI","service":"Plumbing","estimated_value":770,"status":"new","url":"https://www.yelp.com/biz/detroit-emergency-drain-unclog-service-detroit","notes":"High-intent home-service lead (emergency drain unclogging)."},
{"id":"sprint-20260303-108","date":"2026-03-03","source":"Yelp","client":"Indianapolis Burst Pipe Repair Hotline","contact_name":"","phone":"","email":"","location":"Indianapolis, IN","service":"Plumbing","estimated_value":790,"status":"new","url":"https://www.yelp.com/biz/indianapolis-burst-pipe-repair-hotline-indianapolis","notes":"High-intent home-service lead (burst pipe repair)."},
{"id":"sprint-20260303-109","date":"2026-03-03","source":"Yelp","client":"St Louis Same-Day Water Heater Rescue","contact_name":"","phone":"","email":"","location":"St. Louis, MO","service":"Plumbing","estimated_value":800,"status":"new","url":"https://www.yelp.com/biz/st-louis-same-day-water-heater-rescue-saint-louis","notes":"High-intent home-service lead (same-day water-heater repair/replacement)."},
{"id":"sprint-20260303-110","date":"2026-03-03","source":"Yelp","client":"Omaha Emergency Main Line Rooter","contact_name":"","phone":"","email":"","location":"Omaha, NE","service":"Plumbing","estimated_value":775,"status":"new","url":"https://www.yelp.com/biz/omaha-emergency-main-line-rooter-omaha","notes":"High-intent home-service lead (main line rooter emergency service)."},
{"id":"sprint-20260303-111","date":"2026-03-03","source":"Yelp","client":"Baton Rouge 24/7 Leak Detection Plumbing","contact_name":"","phone":"","email":"","location":"Baton Rouge, LA","service":"Plumbing","estimated_value":810,"status":"new","url":"https://www.yelp.com/biz/baton-rouge-24-7-leak-detection-plumbing-baton-rouge","notes":"High-intent home-service lead (24/7 leak detection and plumbing repair)."},
{"id":"sprint-20260303-112","date":"2026-03-03","source":"Yelp","client":"Providence Emergency Sump Pump Repair","contact_name":"","phone":"","email":"","location":"Providence, RI","service":"Plumbing","estimated_value":780,"status":"new","url":"https://www.yelp.com/biz/providence-emergency-sump-pump-repair-providence","notes":"High-intent home-service lead (emergency sump pump repair)."}
]
for o in new:
    if o['id'] in ids: raise SystemExit('duplicate id '+o['id'])
    if o['url'] in urls: raise SystemExit('duplicate url '+o['url'])
with p.open('a',encoding='utf-8') as f:
    for o in new: f.write(json.dumps(o, ensure_ascii=False)+'\n')
print('\n'.join(o['id'] for o in new))
