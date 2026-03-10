import glob,re,sys
site_files=glob.glob('sites/premium-v3-wave30/*/index.html')
email_file='email-templates/next-queued-email-assets-2026-03-03-batch33.md'
critical=[]
for f in site_files:
    t=open(f,encoding='utf-8').read()
    # unresolved template placeholders (exclude css braces)
    if re.search(r'\{\{\s*[^}]+\s*\}\}',t):
        critical.append((f,'unresolved_template_placeholder'))
    # tel links
    tels=re.findall(r"href=['\"]tel:([^'\"]+)['\"]",t,re.I)
    if len(tels)==0:
        critical.append((f,'missing_tel_link'))
    for tel in tels:
        digits=re.sub(r'\D','',tel)
        if len(digits)<10:
            critical.append((f,f'invalid_tel_link:{tel}'))
    # form accessibility: each input/textarea/select should have label[for=id] or aria-label
    ids_with_labels=set(re.findall(r"<label[^>]*for=['\"]([^'\"]+)['\"]",t,re.I))
    for m in re.finditer(r"<(input|textarea|select)\b([^>]*)>",t,re.I):
        attrs=m.group(2)
        if re.search(r"type=['\"]hidden['\"]",attrs,re.I):
            continue
        idm=re.search(r"\bid=['\"]([^'\"]+)['\"]",attrs,re.I)
        has_aria=bool(re.search(r"\baria-label=['\"][^'\"]+['\"]",attrs,re.I))
        has_label=bool(idm and idm.group(1) in ids_with_labels)
        if not (has_aria or has_label):
            critical.append((f,'field_missing_label'))
    # button type
    for bm in re.finditer(r"<button\b([^>]*)>",t,re.I):
        if not re.search(r"\btype=['\"](button|submit|reset)['\"]",bm.group(1),re.I):
            critical.append((f,'button_missing_type'))

et=open(email_file,encoding='utf-8').read()
# required placeholders in every email body section
sections=re.split(r"\n---\n",et)
email_bodies=[s for s in sections if '**Email body**' in s]
for i,s in enumerate(email_bodies,1):
    if '{{live_url}}' not in s or '{{screenshot_url}}' not in s:
        critical.append((email_file,f'email_{i}_missing_required_placeholder'))
# catch obvious accidental placeholders
bad_tokens=re.findall(r"\[(?:Your|Business|Phone|Email)[^\]]*\]|<[^>]*placeholder[^>]*>",et,re.I)
if bad_tokens:
    critical.append((email_file,'obvious_placeholder_token_present'))

print('sites_checked',len(site_files),'emails_checked',len(email_bodies))
if critical:
    print('CRITICAL_FOUND',len(critical))
    for c in critical:
        print(c[0],'::',c[1])
    sys.exit(1)
print('PASS_NO_CRITICAL')
