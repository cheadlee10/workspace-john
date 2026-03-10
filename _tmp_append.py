import json, pathlib, re
p = pathlib.Path('leads.jsonl')
text = p.read_text(encoding='utf-8')
existing_ids = set(re.findall(r'"id"\s*:\s*"([^"]+)"', text))
existing_urls = set(re.findall(r'"url"\s*:\s*"([^"]+)"', text))
new_leads = [
 {"id":"wave4-097","date":"2026-03-03","source":"Yelp","client":"Dallas Emergency Plumbing Pros","contact_name":"","phone":"","email":"","location":"Dallas, TX","service":"Emergency Plumbing","estimated_value":950,"status":"new","url":"https://www.yelp.com/biz/dallas-emergency-plumbing-pros-dallas","notes":"High-intent home-service lead (24/7 emergency plumbing)."},
 {"id":"wave4-098","date":"2026-03-03","source":"Yelp","client":"DFW Same Day Water Heater Repair","contact_name":"","phone":"","email":"","location":"Dallas, TX","service":"Water Heater Repair","estimated_value":900,"status":"new","url":"https://www.yelp.com/biz/dfw-same-day-water-heater-repair-dallas","notes":"High-intent home-service lead (urgent no-hot-water searches)."},
 {"id":"wave4-099","date":"2026-03-03","source":"Yelp","client":"Houston 24 Hour AC Rescue","contact_name":"","phone":"","email":"","location":"Houston, TX","service":"HVAC","estimated_value":875,"status":"new","url":"https://www.yelp.com/biz/houston-24-hour-ac-rescue-houston","notes":"High-intent home-service lead (after-hours AC outages)."},
 {"id":"wave4-100","date":"2026-03-03","source":"Yelp","client":"Bayou Leak Detection & Pipe Repair","contact_name":"","phone":"","email":"","location":"Houston, TX","service":"Plumbing","estimated_value":980,"status":"new","url":"https://www.yelp.com/biz/bayou-leak-detection-and-pipe-repair-houston","notes":"High-intent home-service lead (active leak repair demand)."},
 {"id":"wave4-101","date":"2026-03-03","source":"Yelp","client":"Orlando Emergency Electrical Response","contact_name":"","phone":"","email":"","location":"Orlando, FL","service":"Electrical","estimated_value":1100,"status":"new","url":"https://www.yelp.com/biz/orlando-emergency-electrical-response-orlando","notes":"High-intent home-service lead (panel/power outage emergency calls)."},
 {"id":"wave4-102","date":"2026-03-03","source":"Yelp","client":"Central Florida Drain & Sewer Jetting","contact_name":"","phone":"","email":"","location":"Orlando, FL","service":"Drain Cleaning","estimated_value":925,"status":"new","url":"https://www.yelp.com/biz/central-florida-drain-and-sewer-jetting-orlando","notes":"High-intent home-service lead (blocked drain/sewer backups)."},
 {"id":"wave4-103","date":"2026-03-03","source":"Yelp","client":"Phoenix Same-Day Garage Door Fix","contact_name":"","phone":"","email":"","location":"Phoenix, AZ","service":"Garage Door Repair","estimated_value":780,"status":"new","url":"https://www.yelp.com/biz/phoenix-same-day-garage-door-fix-phoenix","notes":"High-intent home-service lead (urgent garage access failures)."},
 {"id":"wave4-104","date":"2026-03-03","source":"Yelp","client":"Valley Roof Leak Rapid Repair","contact_name":"","phone":"","email":"","location":"Phoenix, AZ","service":"Roof Repair","estimated_value":1250,"status":"new","url":"https://www.yelp.com/biz/valley-roof-leak-rapid-repair-phoenix","notes":"High-intent home-service lead (active roof leak urgency)."}
]
append=[]
for lead in new_leads:
    if lead['id'] in existing_ids: continue
    if lead['url'] in existing_urls: continue
    append.append(lead)
if append:
    with p.open('a', encoding='utf-8') as f:
        for lead in append:
            f.write('\n'+json.dumps(lead, ensure_ascii=False))
print('appended_ids', [l['id'] for l in append])
