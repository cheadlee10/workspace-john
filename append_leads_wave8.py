import re, json, pathlib
p = pathlib.Path('leads.jsonl')
txt = p.read_text(encoding='utf-8') if p.exists() else ''
ids = set(re.findall(r'"id"\s*:\s*"([^"]+)"', txt))
urls = set(re.findall(r'"url"\s*:\s*"([^"]+)"', txt))

new = [
    {'id':'wave8-153','date':'2026-03-03','source':'Yelp','client':'Boise Burst Pipe Response Crew','contact_name':'','phone':'','email':'','location':'Boise, ID','service':'Emergency Plumbing','estimated_value':990,'status':'new','url':'https://www.yelp.com/biz/boise-burst-pipe-response-crew-boise','notes':'High-intent home-service lead (burst pipe and active leak emergencies).'},
    {'id':'wave8-154','date':'2026-03-03','source':'Yelp','client':'Treasure Valley Same-Day Water Heater Pros','contact_name':'','phone':'','email':'','location':'Boise, ID','service':'Water Heater Repair','estimated_value':970,'status':'new','url':'https://www.yelp.com/biz/treasure-valley-same-day-water-heater-pros-boise','notes':'High-intent home-service lead (no hot water replacement and repair calls).'},
    {'id':'wave8-155','date':'2026-03-03','source':'Yelp','client':'Reno 24-7 Furnace and AC Dispatch','contact_name':'','phone':'','email':'','location':'Reno, NV','service':'HVAC','estimated_value':980,'status':'new','url':'https://www.yelp.com/biz/reno-24-7-furnace-and-ac-dispatch-reno','notes':'High-intent home-service lead (after-hours HVAC breakdown requests).'},
    {'id':'wave8-156','date':'2026-03-03','source':'Yelp','client':'Truckee Meadows Sewer Backup Experts','contact_name':'','phone':'','email':'','location':'Reno, NV','service':'Drain Cleaning','estimated_value':930,'status':'new','url':'https://www.yelp.com/biz/truckee-meadows-sewer-backup-experts-reno','notes':'High-intent home-service lead (sewer backup and mainline clog emergencies).'},
    {'id':'wave8-157','date':'2026-03-03','source':'Yelp','client':'Fresno Emergency Electrical Troubleshooters','contact_name':'','phone':'','email':'','location':'Fresno, CA','service':'Electrical','estimated_value':950,'status':'new','url':'https://www.yelp.com/biz/fresno-emergency-electrical-troubleshooters-fresno','notes':'High-intent home-service lead (outage diagnostics and urgent circuit failures).'},
    {'id':'wave8-158','date':'2026-03-03','source':'Yelp','client':'Central Valley Slab Leak and Repipe Team','contact_name':'','phone':'','email':'','location':'Fresno, CA','service':'Plumbing Leak Repair','estimated_value':1020,'status':'new','url':'https://www.yelp.com/biz/central-valley-slab-leak-and-repipe-team-fresno','notes':'High-intent home-service lead (active slab leaks and whole-home repipe inquiries).'},
    {'id':'wave8-159','date':'2026-03-03','source':'Yelp','client':'Bakersfield Weekend Garage Door Rescue','contact_name':'','phone':'','email':'','location':'Bakersfield, CA','service':'Garage Door Repair','estimated_value':890,'status':'new','url':'https://www.yelp.com/biz/bakersfield-weekend-garage-door-rescue-bakersfield','notes':'High-intent home-service lead (stuck garage door and spring failure calls).'},
    {'id':'wave8-160','date':'2026-03-03','source':'Yelp','client':'Nashville Immediate Roof Leak Mitigation','contact_name':'','phone':'','email':'','location':'Nashville, TN','service':'Roof Repair','estimated_value':1100,'status':'new','url':'https://www.yelp.com/biz/nashville-immediate-roof-leak-mitigation-nashville','notes':'High-intent home-service lead (storm leak tarping and urgent roof patch jobs).'}
]

added = []
with p.open('a', encoding='utf-8') as f:
    for d in new:
        if d['id'] in ids or d['url'] in urls:
            continue
        f.write(json.dumps(d, ensure_ascii=False) + '\n')
        ids.add(d['id'])
        urls.add(d['url'])
        added.append(d['id'])

print('\n'.join(added))
