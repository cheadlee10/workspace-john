import re,glob,os,json
root=r"C:\\Users\\chead\\.openclaw\\workspace-john"
wave=os.path.join(root,'sites','premium-v3-wave22')
email=os.path.join(root,'email-templates','next-queued-email-assets-2026-03-02-batch25.md')
site_issues={}
for f in glob.glob(os.path.join(wave,'*','index.html')):
    t=open(f,encoding='utf-8').read()
    rel=os.path.relpath(f,wave)
    issues=[]
    # placeholders/todos
    if re.search(r'\{\{[^}]+\}\}|\[[^\]]+\]|\b(?:TODO|TBD|lorem ipsum|replace me)\b',t,re.I):
        issues.append('placeholder_or_todo_text_present')
    # tel links present
    tels=re.findall(r"href\s*=\s*['\"]tel:([^'\"]+)['\"]",t,re.I)
    if not tels:
        issues.append('no_tel_link_found')
    else:
        for tel in tels:
            digits=re.sub(r'\D','',tel)
            if len(digits)<10:
                issues.append(f'invalid_tel_link:{tel}')
    # label coverage
    labels=set(re.findall(r"<label[^>]*for=['\"]([^'\"]+)['\"]",t,re.I))
    for m in re.finditer(r"<(input|textarea|select)\b([^>]*)>",t,re.I):
        tag,attrs=m.group(1).lower(),m.group(2)
        if re.search(r"\btype=['\"]hidden['\"]",attrs,re.I):
            continue
        idm=re.search(r"\bid=['\"]([^'\"]+)['\"]",attrs,re.I)
        if idm:
            iid=idm.group(1)
            if iid not in labels and not re.search(r"\baria-label=['\"][^'\"]+['\"]",attrs,re.I):
                issues.append(f'missing_label_for_id:{iid}')
        else:
            if not re.search(r"\baria-label=['\"][^'\"]+['\"]",attrs,re.I):
                issues.append(f'unlabeled_{tag}_without_id')
    # empty aria-label
    if re.search(r"aria-label=['\"]\s*['\"]",t,re.I):
        issues.append('empty_aria_label')
    # dead CTA links
    if re.search(r"href=['\"]#['\"]",t,re.I):
        issues.append('dead_hash_link')
    if issues:
        site_issues[rel]=sorted(set(issues))

et=open(email,encoding='utf-8').read()
email_issues=[]
# each section should have both placeholders in body
sections=[s for s in et.split('\n---\n') if '## ' in s and '**Email body**' in s]
for idx,s in enumerate(sections,1):
    if '{{live_url}}' not in s: email_issues.append(f'section_{idx}_missing_live_url')
    if '{{screenshot_url}}' not in s: email_issues.append(f'section_{idx}_missing_screenshot_url')
# disallow other unresolved placeholders
for ph in re.findall(r'\{\{[^}]+\}\}',et):
    if ph not in ('{{live_url}}','{{screenshot_url}}'):
        email_issues.append(f'unexpected_placeholder:{ph}')
# obvious compliance claims scan
if re.search(r'\b(#1|guarantee|guaranteed|best in|top-rated|ranked)\b',et,re.I):
    email_issues.append('possible_unsubstantiated_claim_language')
print(json.dumps({'site_issues':site_issues,'email_issues':sorted(set(email_issues))},indent=2))