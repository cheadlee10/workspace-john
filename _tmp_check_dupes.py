import json,re
from pathlib import Path
p=Path('outreach_queue.jsonl')
phones=set(); pairs=set(); maxid=0
for line in p.read_text(encoding='utf-8').splitlines():
    if not line.strip():
        continue
    o=json.loads(line)
    n=o.get('client','').strip().lower(); ph=o.get('phone_normalized') or ''
    pairs.add((n,ph)); phones.add(ph)
    m=re.match(r'gpass-us-(\d+)$',o.get('id',''))
    if m: maxid=max(maxid,int(m.group(1)))
print('maxid',maxid)
cands=[('DeGeorge Plumbing & HVAC','+16026413172'),('Arid Valley Plumbing','+16029994741'),('Smiley Plumbing','+16029106582'),('Suburban Heating & Air Conditioning','+12143811127'),('EHS HVAC','+12146127493'),('InPhaze Electric','+14075997777'),('Frank Gay Services','+14075128102'),('Mister Sparky Orlando','+14074772159')]
for name,ph in cands:
    print(name,'dup_pair',((name.lower(),ph) in pairs),'dup_phone',(ph in phones))
