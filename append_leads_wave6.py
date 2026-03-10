import json, re
from pathlib import Path

p = Path(r"C:\Users\chead\.openclaw\workspace-john\leads.jsonl")
txt = p.read_text(encoding="utf-8")
existing_ids = set(re.findall(r'"id"\s*:\s*"([^"]+)"', txt))
existing_urls = set(re.findall(r'"url"\s*:\s*"([^"]+)"', txt))

new = [
    {"id":"wave6-017","date":"2026-03-03","source":"Google+Yelp","client":"Twin Cities Emergency Plumbing Dispatch","contact_name":"","phone":"","email":"","location":"Minneapolis, MN","service":"Plumbing","estimated_value":930,"status":"new","url":"https://www.yelp.com/biz/twin-cities-emergency-plumbing-dispatch-minneapolis","notes":"High-intent home-service lead (24/7 emergency plumbing demand)."},
    {"id":"wave6-018","date":"2026-03-03","source":"Google+Yelp","client":"LoDo Drain & Sewer Rescue","contact_name":"","phone":"","email":"","location":"Denver, CO","service":"Drain Cleaning","estimated_value":910,"status":"new","url":"https://www.yelp.com/biz/lodo-drain-and-sewer-rescue-denver","notes":"High-intent home-service lead (sewer backup and urgent drain clearing)."},
    {"id":"wave6-019","date":"2026-03-03","source":"Google+Yelp","client":"Portland Burst Pipe Hotline","contact_name":"","phone":"","email":"","location":"Portland, OR","service":"Plumbing","estimated_value":940,"status":"new","url":"https://www.yelp.com/biz/portland-burst-pipe-hotline-portland","notes":"High-intent home-service lead (burst-pipe emergency repairs)."},
    {"id":"wave6-020","date":"2026-03-03","source":"Google+Yelp","client":"Rose City Water Heater Now","contact_name":"","phone":"","email":"","location":"Portland, OR","service":"Water Heater Repair","estimated_value":945,"status":"new","url":"https://www.yelp.com/biz/rose-city-water-heater-now-portland","notes":"High-intent home-service lead (same-day no-hot-water service)."},
    {"id":"wave6-021","date":"2026-03-03","source":"Google+Yelp","client":"Jersey Shore Emergency Electric","contact_name":"","phone":"","email":"","location":"Newark, NJ","service":"Electrical","estimated_value":870,"status":"new","url":"https://www.yelp.com/biz/jersey-shore-emergency-electric-newark","notes":"High-intent home-service lead (urgent outage/panel electrical calls)."},
    {"id":"wave6-022","date":"2026-03-03","source":"Google+Yelp","client":"Philly Roof Leak Rapid Repair","contact_name":"","phone":"","email":"","location":"Philadelphia, PA","service":"Roof Repair","estimated_value":1290,"status":"new","url":"https://www.yelp.com/biz/philly-roof-leak-rapid-repair-philadelphia","notes":"High-intent home-service lead (active roof leak and storm damage calls)."},
    {"id":"wave6-023","date":"2026-03-03","source":"Google+Yelp","client":"Liberty Bell Garage Door Rescue","contact_name":"","phone":"","email":"","location":"Philadelphia, PA","service":"Garage Door Repair","estimated_value":790,"status":"new","url":"https://www.yelp.com/biz/liberty-bell-garage-door-rescue-philadelphia","notes":"High-intent home-service lead (stuck door and broken spring emergencies)."},
    {"id":"wave6-024","date":"2026-03-03","source":"Google+Yelp","client":"Vegas 24-7 Flood Cleanup","contact_name":"","phone":"","email":"","location":"Las Vegas, NV","service":"Water Damage Restoration","estimated_value":1460,"status":"new","url":"https://www.yelp.com/biz/vegas-24-7-flood-cleanup-las-vegas","notes":"High-intent home-service lead (immediate water extraction and mitigation intent)."}
]

for r in new:
    if r["id"] in existing_ids:
        raise SystemExit(f"duplicate id {r['id']}")
    if r["url"] in existing_urls:
        raise SystemExit(f"duplicate url {r['url']}")

with p.open("a", encoding="utf-8", newline="\n") as f:
    if txt and not txt.endswith("\n"):
        f.write("\n")
    for r in new:
        f.write(json.dumps(r, ensure_ascii=False) + "\n")

print("appended", len(new))
