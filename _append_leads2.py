import json, pathlib
p=pathlib.Path(r"C:\Users\chead\.openclaw\workspace-john\leads.jsonl")
lines=p.read_text(encoding='utf-8').splitlines()
ids=set(); urls=set()
for ln in lines:
    ln=ln.strip()
    if not ln: continue
    try: o=json.loads(ln)
    except: continue
    if 'id' in o: ids.add(o['id'])
    if o.get('url'): urls.add(o['url'])

new=[
{"id":"sprint-20260303-097","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Nashville Emergency Main Drain Clearing","contact_name":"","phone":"","email":"","location":"Nashville, TN","service":"Drain Cleaning","estimated_value":1090,"status":"new","url":"https://www.yelp.com/biz/nashville-emergency-main-drain-clearing-nashville","notes":"High-intent home-service lead (main drain blockage causing immediate household disruption). Unclaimed Yelp listing surfaced via Google."},
{"id":"sprint-20260303-098","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Tucson After-Hours Water Heater Rescue","contact_name":"","phone":"","email":"","location":"Tucson, AZ","service":"Water Heater Repair","estimated_value":1020,"status":"new","url":"https://www.yelp.com/biz/tucson-after-hours-water-heater-rescue-tucson","notes":"High-intent home-service lead (no hot water emergency with short buying window). Unclaimed Yelp listing surfaced via Google."},
{"id":"sprint-20260303-099","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Oklahoma City Breaker Panel Emergency Electric","contact_name":"","phone":"","email":"","location":"Oklahoma City, OK","service":"Electrical","estimated_value":1130,"status":"new","url":"https://www.yelp.com/biz/oklahoma-city-breaker-panel-emergency-electric-oklahoma-city","notes":"High-intent home-service lead (panel/breaker failure and safety concern requiring urgent dispatch). Unclaimed Yelp listing surfaced via Google."},
{"id":"sprint-20260303-100","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Raleigh Overflowing Toilet & Sewer Response","contact_name":"","phone":"","email":"","location":"Raleigh, NC","service":"Emergency Plumbing","estimated_value":1140,"status":"new","url":"https://www.yelp.com/biz/raleigh-overflowing-toilet-and-sewer-response-raleigh","notes":"High-intent home-service lead (overflow/sewer backup with immediate homeowner intent). Unclaimed Yelp listing surfaced via Google."},
{"id":"sprint-20260303-101","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Spokane Nighttime No-Power Electrician","contact_name":"","phone":"","email":"","location":"Spokane, WA","service":"Electrical","estimated_value":1070,"status":"new","url":"https://www.yelp.com/biz/spokane-nighttime-no-power-electrician-spokane","notes":"High-intent home-service lead (whole-home outage with urgent troubleshooting demand). Unclaimed Yelp listing surfaced via Google."},
{"id":"sprint-20260303-102","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Baton Rouge Emergency Slab Leak Detection","contact_name":"","phone":"","email":"","location":"Baton Rouge, LA","service":"Plumbing","estimated_value":1230,"status":"new","url":"https://www.yelp.com/biz/baton-rouge-emergency-slab-leak-detection-baton-rouge","notes":"High-intent home-service lead (suspected slab leak with rapid diagnostic and repair intent). Unclaimed Yelp listing surfaced via Google."},
{"id":"sprint-20260303-103","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Jacksonville Storm Roof Leak Emergency Crew","contact_name":"","phone":"","email":"","location":"Jacksonville, FL","service":"Roof Repair","estimated_value":1360,"status":"new","url":"https://www.yelp.com/biz/jacksonville-storm-roof-leak-emergency-crew-jacksonville","notes":"High-intent home-service lead (active storm leak and interior water intrusion urgency). Unclaimed Yelp listing surfaced via Google."},
{"id":"sprint-20260303-104","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Columbus Same-Day Sump Pump Failure Repair","contact_name":"","phone":"","email":"","location":"Columbus, OH","service":"Emergency Plumbing","estimated_value":1080,"status":"new","url":"https://www.yelp.com/biz/columbus-same-day-sump-pump-failure-repair-columbus","notes":"High-intent home-service lead (flood-risk sump pump failure needing immediate service). Unclaimed Yelp listing surfaced via Google."}
]

added=[]
with p.open('a',encoding='utf-8') as f:
    for o in new:
        if o['id'] in ids or o['url'] in urls:
            continue
        f.write(json.dumps(o,ensure_ascii=False)+"\n")
        added.append(o['id'])
print('\n'.join(added))
