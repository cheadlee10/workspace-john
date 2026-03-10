import json, re, glob, pathlib
root=pathlib.Path('C:/Users/chead/.openclaw/workspace-john')
used_ids=set()
for p in glob.glob(str(root/'sites'/'premium-v3-wave*'/'DEPLOYMENT_NOTES.md')):
    txt=pathlib.Path(p).read_text(encoding='utf-8',errors='ignore')
    used_ids.update(re.findall(r'outreach ID: ([\w-]+)',txt))
print('used ids',len(used_ids))
rows=[]
with open(root/'outreach_queue.jsonl',encoding='utf-8') as f:
    for ln in f:
        d=json.loads(ln)
        if d['id'] in used_ids: continue
        if not d.get('outreach_usable',True): continue
        rows.append(d)
rows.sort(key=lambda d:(d.get('estimated_value',0), d.get('id','')), reverse=True)
for d in rows[:30]:
    print(d['id'],d.get('estimated_value'),d.get('client'),d.get('location'),d.get('service'))
