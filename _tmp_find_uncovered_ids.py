import json, re, glob
from pathlib import Path
root=Path(r'C:/Users/chead/.openclaw/workspace-john')
covered=set()
for fp in glob.glob(str(root/'email-templates'/'next-queued-email-assets-*.md')):
    txt=Path(fp).read_text(encoding='utf-8',errors='ignore')
    covered.update(re.findall(r'`([A-Za-z0-9_-]+)`', txt))
# keep likely ids only from leads dataset
leads=[]
for line in (root/'leads.jsonl').open(encoding='utf-8'):
    try:d=json.loads(line)
    except:continue
    lid=d.get('id')
    if lid: leads.append(d)

uncovered=[d for d in leads if d['id'] not in covered]
print('covered',len(covered),'total leads',len(leads),'uncovered',len(uncovered))
for d in uncovered[:25]:
    print(d['id'],'|',d.get('client'),'|',d.get('service'),'|',d.get('status'))
