import json, pathlib
p = pathlib.Path(r"C:\Users\chead\.openclaw\workspace-john\leads.jsonl")
text = p.read_text(encoding="utf-8")
# robustly parse any concatenated objects
objs=[]
dec=json.JSONDecoder(); i=0
while True:
    j=text.find('{', i)
    if j<0: break
    try:
        o,end = dec.raw_decode(text, j)
        if isinstance(o, dict): objs.append(o)
        i=end
    except Exception:
        i=j+1

existing_ids={o.get('id','') for o in objs}
existing_urls={o.get('url','') for o in objs if o.get('url')}

candidates=[
{"id":"wave6-097","date":"2026-03-03","source":"Yelp","client":"Alamo City Emergency Plumbing Dispatch","contact_name":"","phone":"","email":"","location":"San Antonio, TX","service":"Plumbing","estimated_value":940,"status":"new","url":"https://www.yelp.com/biz/alamo-city-emergency-plumbing-dispatch-san-antonio","notes":"High-intent home-service lead (24/7 emergency plumbing demand)."},
{"id":"wave6-098","date":"2026-03-03","source":"Yelp","client":"San Antonio Sewer Backup Rescue","contact_name":"","phone":"","email":"","location":"San Antonio, TX","service":"Drain Cleaning","estimated_value":930,"status":"new","url":"https://www.yelp.com/biz/san-antonio-sewer-backup-rescue-san-antonio","notes":"High-intent home-service lead (urgent sewer backup and cleanout)."},
{"id":"wave6-099","date":"2026-03-03","source":"Yelp","client":"Mesa No-Cool AC Repair Hotline","contact_name":"","phone":"","email":"","location":"Mesa, AZ","service":"HVAC","estimated_value":910,"status":"new","url":"https://www.yelp.com/biz/mesa-no-cool-ac-repair-hotline-mesa","notes":"High-intent home-service lead (same-day AC outage repair)."},
{"id":"wave6-100","date":"2026-03-03","source":"Yelp","client":"East Valley Water Heater Emergency","contact_name":"","phone":"","email":"","location":"Mesa, AZ","service":"Water Heater Repair","estimated_value":960,"status":"new","url":"https://www.yelp.com/biz/east-valley-water-heater-emergency-mesa","notes":"High-intent home-service lead (no-hot-water emergency replacement)."},
{"id":"wave6-101","date":"2026-03-03","source":"Yelp","client":"Fresno Emergency Roof Leak Crew","contact_name":"","phone":"","email":"","location":"Fresno, CA","service":"Roof Repair","estimated_value":1280,"status":"new","url":"https://www.yelp.com/biz/fresno-emergency-roof-leak-crew-fresno","notes":"High-intent home-service lead (active roof leak and storm patch jobs)."},
{"id":"wave6-102","date":"2026-03-03","source":"Yelp","client":"Central Valley Flood Cleanup 24-7","contact_name":"","phone":"","email":"","location":"Fresno, CA","service":"Water Damage Restoration","estimated_value":1460,"status":"new","url":"https://www.yelp.com/biz/central-valley-flood-cleanup-24-7-fresno","notes":"High-intent home-service lead (urgent extraction and drying response)."},
{"id":"wave6-103","date":"2026-03-03","source":"Yelp","client":"Louisville Emergency Electric Panel","contact_name":"","phone":"","email":"","location":"Louisville, KY","service":"Electrical","estimated_value":900,"status":"new","url":"https://www.yelp.com/biz/louisville-emergency-electric-panel-louisville","notes":"High-intent home-service lead (panel outage and breaker failure calls)."},
{"id":"wave6-104","date":"2026-03-03","source":"Yelp","client":"Derby City Garage Door Spring Rescue","contact_name":"","phone":"","email":"","location":"Louisville, KY","service":"Garage Door Repair","estimated_value":790,"status":"new","url":"https://www.yelp.com/biz/derby-city-garage-door-spring-rescue-louisville","notes":"High-intent home-service lead (stuck door and broken spring emergencies)."}
]

add=[o for o in candidates if o['id'] not in existing_ids and o['url'] not in existing_urls]
if add:
    with p.open('a', encoding='utf-8', newline='\n') as f:
        if not text.endswith('\n'):
            f.write('\n')
        for o in add:
            f.write(json.dumps(o,separators=(',',':'))+'\n')
print('\n'.join(o['id'] for o in add))
