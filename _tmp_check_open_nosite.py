import json,re
from pathlib import Path
root=Path(r"C:/Users/chead/.openclaw/workspace-john")
existing={p.name for p in root.glob('sites/premium-v3-wave*/*') if p.is_dir()}

def slug(s:str)->str:
    return re.sub(r'-+','-',re.sub(r'[^a-z0-9]+','-',s.lower()).strip('-'))

cands=[json.loads(l) for l in open(root/'nosite_top20_leads.jsonl',encoding='utf-8') if l.strip()]
for j in sorted(cands,key=lambda x:(x['priority'],x['id'])):
    s=slug(f"{j['business_name']} {j['city']}")
    print(("EXISTS" if s in existing else "OPEN").ljust(7),j['priority'],j['id'],s)
