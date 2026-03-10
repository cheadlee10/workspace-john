import pathlib,re

wave=pathlib.Path('sites/premium-v3-wave47')
files=list(wave.rglob('index.html'))
site_issues=[]
for f in files:
    s=f.read_text(encoding='utf-8')
    if re.search(r"\{\{[^}]+\}\}|TODO|TBD|Lorem ipsum|example\.com",s,re.I):
        site_issues.append((f,'placeholder token present'))
    if re.search(r"guarantee|guaranteed|#1|best in|ranked\s+#?1",s,re.I):
        site_issues.append((f,'risky claim wording'))
    ids=set(re.findall(r"<(?:input|textarea|select)[^>]*\sid=['\"]([^'\"]+)['\"]",s,re.I))
    for target in re.findall(r"<label[^>]*\sfor=['\"]([^'\"]+)['\"]",s,re.I):
        if target not in ids:
            site_issues.append((f,f'label target missing: {target}'))
    for m in re.finditer(r"<(input|textarea|select)\b([^>]*)>",s,re.I):
        tag,attrs=m.group(1),m.group(2)
        if re.search(r"type=['\"]hidden['\"]",attrs,re.I):
            continue
        idm=re.search(r"\sid=['\"]([^'\"]+)['\"]",attrs,re.I)
        has_label=bool(idm and re.search(r"<label[^>]*for=['\"]"+re.escape(idm.group(1))+r"['\"]",s,re.I))
        has_aria=bool(re.search(r"aria-label=",attrs,re.I))
        if not (has_label or has_aria):
            site_issues.append((f,f'unlabeled {tag}'))
    if not re.search(r"<form[^>]*method=['\"]post['\"][^>]*action=['\"]/contact['\"]",s,re.I):
        site_issues.append((f,'missing POST /contact form'))
    if not re.search(r"<input[^>]*type=['\"]hidden['\"][^>]*name=['\"]source['\"]",s,re.I):
        site_issues.append((f,'missing hidden source field'))
    if not re.search(r"<input[^>]*type=['\"]hidden['\"][^>]*name=['\"]business['\"]",s,re.I):
        site_issues.append((f,'missing hidden business field'))
    for tel in re.findall(r'href=["\'](tel:[^"\']+)["\']',s,re.I):
        if not re.match(r"tel:\+?[0-9()\-\.\s]+$",tel,re.I):
            site_issues.append((f,f'invalid tel link: {tel}'))

email_path=pathlib.Path('email-templates/next-queued-email-assets-2026-03-03-batch50.md')
es=email_path.read_text(encoding='utf-8')
sections=[sec for sec in re.split(r"\n---\n",es) if re.search(r"## \d+\)",sec)]
email_issues=[]
for sec in sections:
    m=re.search(r"## \d+\)\s*(.*?)\s*\(`?gpass",sec)
    name=m.group(1).strip() if m else 'UNKNOWN'
    if '{{live_url}}' not in sec:
        email_issues.append((name,'missing {{live_url}}'))
    if '{{screenshot_url}}' not in sec:
        email_issues.append((name,'missing {{screenshot_url}}'))
    if re.search(r"guarantee|guaranteed|#1|best in|ranked\s+#?1",sec,re.I):
        email_issues.append((name,'risky claim wording'))
non_ascii=[ch for ch in es if ord(ch)>127]

print('SITE_FILES',len(files))
print('SITE_ISSUES',len(site_issues))
for f,i in site_issues:
    print('SITE',f.as_posix(),'--',i)
print('EMAIL_SECTIONS',len(sections))
print('EMAIL_ISSUES',len(email_issues))
for n,i in email_issues:
    print('EMAIL',n,'--',i)
print('EMAIL_NON_ASCII',len(non_ascii))
