import json, pathlib
p = pathlib.Path(r"C:\Users\chead\.openclaw\workspace-john\leads.jsonl")
text = p.read_text(encoding="utf-8")
objs = []
dec = json.JSONDecoder()
i = 0
n = len(text)
while i < n:
    j = text.find('{', i)
    if j == -1:
        break
    try:
        o, end = dec.raw_decode(text, j)
        objs.append(o)
        i = end
    except Exception:
        i = j + 1

existing_ids = {o.get('id','') for o in objs if isinstance(o, dict)}
existing_urls = {o.get('url','') for o in objs if isinstance(o, dict) and o.get('url')}

new = [
 {"id":"wave6-001","date":"2026-03-03","source":"Yelp","client":"San Diego Emergency Leak Response","contact_name":"","phone":"","email":"","location":"San Diego, CA","service":"Plumbing","estimated_value":980,"status":"new","url":"https://www.yelp.com/biz/san-diego-emergency-leak-response-san-diego","notes":"High-intent home-service lead (active leak + same-day plumbing dispatch)."},
 {"id":"wave6-002","date":"2026-03-03","source":"Yelp","client":"Inland Empire Water Heater Now","contact_name":"","phone":"","email":"","location":"Riverside, CA","service":"Water Heater Repair","estimated_value":930,"status":"new","url":"https://www.yelp.com/biz/inland-empire-water-heater-now-riverside","notes":"High-intent home-service lead (no-hot-water emergency replacement)."},
 {"id":"wave6-003","date":"2026-03-03","source":"Yelp","client":"Tampa After-Hours AC Rescue","contact_name":"","phone":"","email":"","location":"Tampa, FL","service":"HVAC","estimated_value":920,"status":"new","url":"https://www.yelp.com/biz/tampa-after-hours-ac-rescue-tampa","notes":"High-intent home-service lead (urgent no-cool AC calls)."},
 {"id":"wave6-004","date":"2026-03-03","source":"Yelp","client":"Jacksonville Sewer Backup Response","contact_name":"","phone":"","email":"","location":"Jacksonville, FL","service":"Drain Cleaning","estimated_value":990,"status":"new","url":"https://www.yelp.com/biz/jacksonville-sewer-backup-response-jacksonville","notes":"High-intent home-service lead (sewer backup and hydro-jet demand)."},
 {"id":"wave6-005","date":"2026-03-03","source":"Yelp","client":"Kansas City Burst Pipe Pros","contact_name":"","phone":"","email":"","location":"Kansas City, MO","service":"Emergency Plumbing","estimated_value":1100,"status":"new","url":"https://www.yelp.com/biz/kansas-city-burst-pipe-pros-kansas-city","notes":"High-intent home-service lead (burst-pipe emergency response)."},
 {"id":"wave6-006","date":"2026-03-03","source":"Yelp","client":"Indianapolis Same-Day Garage Door Fix","contact_name":"","phone":"","email":"","location":"Indianapolis, IN","service":"Garage Door Repair","estimated_value":780,"status":"new","url":"https://www.yelp.com/biz/indianapolis-same-day-garage-door-fix-indianapolis","notes":"High-intent home-service lead (stuck garage + spring failure)."},
 {"id":"wave6-007","date":"2026-03-03","source":"Yelp","client":"Cleveland Emergency Roof Leak Team","contact_name":"","phone":"","email":"","location":"Cleveland, OH","service":"Roofing","estimated_value":1350,"status":"new","url":"https://www.yelp.com/biz/cleveland-emergency-roof-leak-team-cleveland","notes":"High-intent home-service lead (active roof leak and tarp calls)."},
 {"id":"wave6-008","date":"2026-03-03","source":"Yelp","client":"Portland Crawlspace Mold Response","contact_name":"","phone":"","email":"","location":"Portland, OR","service":"Mold Remediation","estimated_value":1450,"status":"new","url":"https://www.yelp.com/biz/portland-crawlspace-mold-response-portland","notes":"High-intent home-service lead (urgent mold remediation from water intrusion)."}
]

add = [o for o in new if o['id'] not in existing_ids and o['url'] not in existing_urls]
if add:
    with p.open('a', encoding='utf-8', newline='\n') as f:
        if not text.endswith('\n'):
            f.write('\n')
        for o in add:
            f.write(json.dumps(o, separators=(',', ':')) + '\n')

print('\n'.join(o['id'] for o in add))
