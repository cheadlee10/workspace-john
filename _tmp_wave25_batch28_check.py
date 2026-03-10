import re, pathlib
site_root=pathlib.Path('sites/premium-v3-wave25')
email_file=pathlib.Path('email-templates/next-queued-email-assets-2026-03-02-batch28.md')
site_files=sorted(site_root.rglob('index.html'))
issues=[]
summary=[]
for f in site_files:
    t=f.read_text(encoding='utf-8')
    # placeholders
    for bad in ['{{','}}','TODO','TBD','REPLACE_ME','your business name','lorem ipsum']:
        if bad.lower() in t.lower():
            issues.append((f,'placeholder',bad))
    # tel links
    tels=re.findall(r"href='tel:([^']+)'|href=\"tel:([^\"]+)\"",t,re.I)
    tel_vals=[a or b for a,b in tels]
    if not tel_vals:
        issues.append((f,'tel','missing tel link'))
    for v in tel_vals:
        digits=re.sub(r'\D','',v)
        if len(digits)<10:
            issues.append((f,'tel',f'invalid tel target {v}'))
    # form control accessibility
    controls=re.findall(r'<(input|textarea|select)\b[^>]*>',t,re.I)
    labels={m.group(1) for m in re.finditer(r"<label\b[^>]*for='([^']+)'|<label\b[^>]*for=\"([^\"]+)\"",t,re.I)}
    for m in re.finditer(r'<(input|textarea|select)\b([^>]*)>',t,re.I):
        tag,attrs=m.group(1).lower(),m.group(2)
        if re.search(r"type=['\"]hidden['\"]",attrs,re.I):
            continue
        idm=re.search(r"\bid=['\"]([^'\"]+)['\"]",attrs,re.I)
        aria=re.search(r"\baria-label=['\"]([^'\"]+)['\"]",attrs,re.I)
        if not idm and not aria:
            issues.append((f,'a11y',f'{tag} missing id/aria-label'))
        if idm and idm.group(1) not in labels and not aria:
            issues.append((f,'a11y',f'{tag} id {idm.group(1)} missing matching label'))
    summary.append((f.name,len(tel_vals),len(re.findall(r'<label\b',t,re.I))))

et=email_file.read_text(encoding='utf-8')
sections=et.split('\n## ')[1:]
for s in sections:
    header=s.splitlines()[0]
    body=s
    if '{{live_url}}' not in body or '{{screenshot_url}}' not in body:
        issues.append((email_file,'email_placeholder',header))
    if re.search(r'\b#1\b|best in|guarantee|guaranteed|double your|top-ranked',body,re.I):
        issues.append((email_file,'compliance_claim',header))

print('SITE FILES:',len(site_files))
for row in summary:
    print(' -',row)
print('EMAIL ENTRIES:',len(sections))
print('ISSUES:',len(issues))
for i in issues:
    print(i[0],i[1],i[2])
