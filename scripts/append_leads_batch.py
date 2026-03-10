import json
from pathlib import Path

p = Path(r"C:\Users\chead\.openclaw\workspace-john\leads.jsonl")
lines = p.read_text(encoding="utf-8").splitlines()
ids, urls = set(), set()
for ln in lines:
    try:
        o = json.loads(ln)
    except Exception:
        continue
    ids.add(o.get("id", ""))
    urls.add(o.get("url", ""))

new = [
    {"id":"sprint-20260303-081","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Boise Emergency Water Extraction Pros","contact_name":"","phone":"","email":"","location":"Boise, ID","service":"Water Damage Restoration","estimated_value":1240,"status":"new","url":"https://www.yelp.com/biz/boise-emergency-water-extraction-pros-boise","notes":"High-intent home-service lead (active water intrusion requiring immediate mitigation and drying). Unclaimed Yelp listing surfaced via Google."},
    {"id":"sprint-20260303-082","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Columbus Same-Day AC Repair Hotline","contact_name":"","phone":"","email":"","location":"Columbus, OH","service":"HVAC","estimated_value":1010,"status":"new","url":"https://www.yelp.com/biz/columbus-same-day-ac-repair-hotline-columbus","notes":"High-intent home-service lead (cooling outage with urgent same-day homeowner intent). Unclaimed Yelp listing surfaced via Google."},
    {"id":"sprint-20260303-083","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Tucson 24-7 Electrical Outage Response","contact_name":"","phone":"","email":"","location":"Tucson, AZ","service":"Electrical","estimated_value":1090,"status":"new","url":"https://www.yelp.com/biz/tucson-24-7-electrical-outage-response-tucson","notes":"High-intent home-service lead (partial/whole-home outage safety issue requiring urgent dispatch). Unclaimed Yelp listing surfaced via Google."},
    {"id":"sprint-20260303-084","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Raleigh Emergency Crawlspace Moisture Control","contact_name":"","phone":"","email":"","location":"Raleigh, NC","service":"Mold Remediation","estimated_value":1170,"status":"new","url":"https://www.yelp.com/biz/raleigh-emergency-crawlspace-moisture-control-raleigh","notes":"High-intent home-service lead (moisture/mold risk with fast homeowner remediation demand). Unclaimed Yelp listing surfaced via Google."},
    {"id":"sprint-20260303-085","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Birmingham Rapid Roof Leak Tarp & Repair","contact_name":"","phone":"","email":"","location":"Birmingham, AL","service":"Roof Repair","estimated_value":1320,"status":"new","url":"https://www.yelp.com/biz/birmingham-rapid-roof-leak-tarp-and-repair-birmingham","notes":"High-intent home-service lead (active roof leak requiring emergency tarp and repair). Unclaimed Yelp listing surfaced via Google."},
    {"id":"sprint-20260303-086","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Spokane Sewage Cleanup & Sanitization Now","contact_name":"","phone":"","email":"","location":"Spokane, WA","service":"Sewage Cleanup","estimated_value":1290,"status":"new","url":"https://www.yelp.com/biz/spokane-sewage-cleanup-and-sanitization-now-spokane","notes":"High-intent home-service lead (blackwater backup with urgent sanitation and restoration intent). Unclaimed Yelp listing surfaced via Google."},
    {"id":"sprint-20260303-087","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Newark Basement Flood Pump-Out Team","contact_name":"","phone":"","email":"","location":"Newark, NJ","service":"Flood Cleanup","estimated_value":1210,"status":"new","url":"https://www.yelp.com/biz/newark-basement-flood-pump-out-team-newark","notes":"High-intent home-service lead (basement flooding requiring immediate pump-out and drying). Unclaimed Yelp listing surfaced via Google."},
    {"id":"sprint-20260303-088","date":"2026-03-03","source":"Yelp-Unclaimed","client":"Madison Frozen Pipe Thaw & Repair 24-7","contact_name":"","phone":"","email":"","location":"Madison, WI","service":"Emergency Plumbing","estimated_value":1120,"status":"new","url":"https://www.yelp.com/biz/madison-frozen-pipe-thaw-and-repair-24-7-madison","notes":"High-intent home-service lead (frozen/burst pipe risk with immediate homeowner repair intent). Unclaimed Yelp listing surfaced via Google."}
]

added = []
seen_ids, seen_urls = set(ids), set(urls)
for o in new:
    if o["id"] in seen_ids or o["url"] in seen_urls:
        continue
    added.append(o)
    seen_ids.add(o["id"])
    seen_urls.add(o["url"])

if len(added) != 8:
    raise SystemExit(f"Expected 8 unique new leads, got {len(added)}")

with p.open("a", encoding="utf-8", newline="\n") as f:
    for o in added:
        f.write(json.dumps(o, ensure_ascii=False) + "\n")

print("\n".join(x["id"] for x in added))
