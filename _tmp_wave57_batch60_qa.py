import re, pathlib, json
root=pathlib.Path(r'C:/Users/chead/.openclaw/workspace-john')
wave=root/'sites/premium-v3-wave57'
files=sorted(wave.glob('*/index.html'))
res=[]
for f in files:
    t=f.read_text(encoding='utf-8')
    item={'file':str(f.relative_to(root))}
    item['placeholders']=bool(re.search(r'\{\{[^}]+\}\}|\b(?:TODO|TBD|LOREM|Lorem ipsum|example\.com)\b',t,re.I))
    item['forms']=len(re.findall(r'<form\b',t,re.I))
    item['form_post_contact']=len(re.findall(r"<form[^>]*method=['\"]post['\"][^>]*action=['\"]/contact['\"]",t,re.I))
    item['hidden_business']=len(re.findall(r"<input[^>]*type=['\"]hidden['\"][^>]*name=['\"]business['\"]",t,re.I))
    item['hidden_source']=len(re.findall(r"<input[^>]*type=['\"]hidden['\"][^>]*name=['\"]source['\"]",t,re.I))
    labels=set(re.findall(r"<label[^>]*for=['\"]([^'\"]+)['\"]",t,re.I))
    unlabeled=[]
    for m in re.finditer(r"<(input|textarea|select)\b([^>]*)>",t,re.I):
        tag=m.group(1).lower(); attrs=m.group(2)
        if re.search(r"type=['\"]hidden['\"]",attrs,re.I):
            continue
        if tag=='input' and re.search(r"type=['\"](?:submit|button|checkbox|radio)['\"]",attrs,re.I):
            continue
        idm=re.search(r"id=['\"]([^'\"]+)['\"]",attrs,re.I)
        has_aria=bool(re.search(r"aria-label=['\"][^'\"]+['\"]",attrs,re.I))
        if has_aria:
            continue
        if idm and idm.group(1) in labels:
            continue
        unlabeled.append(idm.group(1) if idm else '(no-id)')
    item['unlabeled_count']=len(unlabeled)
    item['bad_claims']=len(re.findall(r"\b(#1|number\s*1|best\s+in\s+(?:the\s+)?(?:area|city|state)|top[-\s]?rated|guaranteed|guarantee|no\.?\s*1)\b",t,re.I))
    item['fake_phone']=bool(re.search(r"(?:000[-\s]?000[-\s]?0000|555[-\s]?\d{3}[-\s]?\d{4}|123[-\s]?456[-\s]?7890)",t))
    res.append(item)
print('SITE_RESULTS')
print(json.dumps({'count':len(files),'results':res},indent=2))

email=(root/'email-templates'/'next-queued-email-assets-2026-03-03-batch60.md').read_text(encoding='utf-8')
email_bodies=re.findall(r"\*\*Email body\*\*\n(.*?)(?=\n\*\*CTA options|\Z)",email,re.S)
print('EMAIL_BODY_COUNT',len(email_bodies))
issues=[]
for i,b in enumerate(email_bodies,1):
    if '{{live_url}}' not in b:
        issues.append((i,'missing_live_url'))
    if '{{screenshot_url}}' not in b:
        issues.append((i,'missing_screenshot_url'))
print('EMAIL_ISSUES',issues)
print('NON_ASCII_COUNT',sum(1 for c in email if ord(c)>127))
print('EMAIL_BAD_CLAIMS',len(re.findall(r"\b(#1|number\s*1|best\s+in\s+(?:the\s+)?(?:area|city|state)|top[-\s]?rated|guaranteed|guarantee|results?\s+guaranteed)\b",email,re.I)))