import pathlib,re,json
root=pathlib.Path(r'C:/Users/chead/.openclaw/workspace-john/sites/premium-v3-wave80')
res=[]
for fp in sorted(root.glob('*/index.html')):
    t=fp.read_text(encoding='utf-8')
    forms=len(re.findall(r'<form\b',t,re.I))
    has_endpoints=(t.lower().count('action="/contact"')==2 and t.lower().count('method="post"')==2)
    placeholder=('{{' in t or '}}' in t or 'TODO' in t or 'lorem ipsum' in t.lower())
    ids=set(re.findall(r'id="([^"]+)"',t))
    labels=re.findall(r'<label[^>]*for="([^"]+)"',t,re.I)
    a11y=all(x in ids for x in labels)
    bad_claim=bool(re.search(r'\b(guarantee|guaranteed|number\s*one|ranked\s*#?1|double your|increase by \d+%)\b',t,re.I))
    res.append({"slug":fp.parent.name,"forms":forms,"has_endpoints":has_endpoints,"hidden_business":t.count('name="business"'),"hidden_source":t.count('name="source"'),"placeholder":placeholder,"a11y":a11y,"bad_claim":bad_claim})
print(json.dumps(res,indent=2))