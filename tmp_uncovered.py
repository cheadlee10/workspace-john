import json,glob,re
covered=set()
for f in glob.glob('email-templates/next-queued-email-assets-*.md'):
    txt=open(f,encoding='utf-8',errors='ignore').read()
    covered.update(re.findall(r'`([A-Za-z0-9_-]+)`',txt))
unc=[]
with open('leads.jsonl',encoding='utf-8',errors='ignore') as fh:
    for ln in fh:
        ln=ln.strip()
        if not ln:
            continue
        try:
            obj=json.loads(ln)
        except Exception:
            continue
        if obj.get('status')=='new' and obj.get('id') not in covered:
            unc.append(obj)
print('count',len(unc))
for o in unc[:30]:
    print(o.get('id'), '|', o.get('client'), '|', o.get('service'))
