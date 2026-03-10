import json, pathlib, re
p=pathlib.Path('leads.jsonl')
text=p.read_text(encoding='utf-8')
ids=set(re.findall(r'"id"\s*:\s*"([^"]+)"', text))
urls=set(re.findall(r'"url"\s*:\s*"([^"]+)"', text))
lead={"id":"wave4-105","date":"2026-03-03","source":"Yelp","client":"Orlando 24-7 Water Damage Restoration","contact_name":"","phone":"","email":"","location":"Orlando, FL","service":"Water Damage Restoration","estimated_value":1400,"status":"new","url":"https://www.yelp.com/biz/orlando-24-7-water-damage-restoration-orlando","notes":"High-intent home-service lead (immediate mitigation demand)."}
if lead['id'] not in ids and lead['url'] not in urls:
  with p.open('a',encoding='utf-8') as f: f.write('\n'+json.dumps(lead, ensure_ascii=False))
  print('appended',lead['id'])
else:
  print('skipped')
