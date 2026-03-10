import pathlib,re

# Site checks (wave45)
base=pathlib.Path('sites/premium-v3-wave45')
files=list(base.rglob('index.html'))
site_issues=[]
for f in files:
    s=f.read_text(encoding='utf-8')
    ids=set(re.findall(r"<(?:input|textarea|select)[^>]*\sid=['\"]([^'\"]+)['\"]",s,re.I))
    for_for=re.findall(r"<label[^>]*\sfor=['\"]([^'\"]+)['\"]",s,re.I)
    for x in for_for:
        if x not in ids:
            site_issues.append((str(f),f'label target missing: {x}'))
    for m in re.finditer(r"<(input|textarea|select)\b([^>]*)>",s,re.I):
        tag,attrs=m.group(1),m.group(2)
        if re.search(r"type=['\"]hidden['\"]",attrs,re.I):
            continue
        idm=re.search(r"\sid=['\"]([^'\"]+)['\"]",attrs,re.I)
        has_label=bool(idm and re.search(r"<label[^>]*for=['\"]"+re.escape(idm.group(1))+r"['\"]",s,re.I))
        has_aria=bool(re.search(r"aria-label=",attrs,re.I))
        if not (has_label or has_aria):
            site_issues.append((str(f),f'unlabeled {tag}'))
    if re.search(r"\{\{[^}]+\}\}|TODO|TBD|Lorem ipsum|example\.com",s,re.I):
        site_issues.append((str(f),'placeholder token present'))
    if re.search(r"guarantee|guaranteed|#1|best in|ranked\s+#?1",s,re.I):
        site_issues.append((str(f),'risky claim wording'))

# Email checks (batch48)
p=pathlib.Path('email-templates/next-queued-email-assets-2026-03-03-batch48.md')
s=p.read_text(encoding='utf-8')
sections=[sec for sec in re.split(r"\n---\n",s) if re.search(r"## \d+\)",sec)]
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

non_ascii=[ch for ch in s if ord(ch)>127]

print('SITE_FILES',len(files))
print('SITE_ISSUES',len(site_issues))
for a,b in site_issues:
    print('SITE',a,'--',b)
print('EMAIL_SECTIONS',len(sections))
print('EMAIL_ISSUES',len(email_issues))
for a,b in email_issues:
    print('EMAIL',a,'--',b)
print('NON_ASCII_COUNT',len(non_ascii))
if non_ascii:
    print('NON_ASCII_UNIQUE',''.join(sorted(set(non_ascii))[:50]))
