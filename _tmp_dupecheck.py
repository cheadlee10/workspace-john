import json, pathlib, re
q=[json.loads(l) for l in pathlib.Path('outreach_queue.jsonl').read_text(encoding='utf-8-sig').splitlines() if l.strip()]
keys=set()
for o in q:
    name=(o.get('client') or '').strip().lower()
    p=o.get('phone_normalized') or ''.join(ch for ch in (o.get('phone') or '') if ch.isdigit())
    p=p[1:] if p.startswith('+') else p
    keys.add((name,p))
new=[('Valle Landscaping','4808069550'),("Jose's Landscaping",'6233968694'),('Divine Design Landscaping Phoenix','6027694564'),('MasterAZScapes','6029753648'),('License DFW Pest Control','2144304504'),('American Residential HVAC','7026003291'),('Dunn-Rite Roofing Houston','8775373317'),('Affordable Fence Repair Portland','9717083671')]
for n,p in new:
    print(n, (n.lower(),p) in keys)
