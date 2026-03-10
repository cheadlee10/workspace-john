import re, pathlib
root=pathlib.Path('sites/premium-v3-wave25')
issues=[]
for f in sorted(root.rglob('index.html')):
    t=f.read_text(encoding='utf-8')
    if '.example' in t: issues.append((f,'contains .example'))
    if '{{' in t or '}}' in t or 'TODO' in t or 'REPLACE_ME' in t: issues.append((f,'contains placeholder token'))
    tels=re.findall(r"href='tel:([^']+)'|href=\"tel:([^\"]+)\"",t,re.I)
    vals=[a or b for a,b in tels]
    if len(vals)<2: issues.append((f,f'expected >=2 tel links, got {len(vals)}'))
    labels={a or b for a,b in re.findall(r"<label\b[^>]*for='([^']+)'|<label\b[^>]*for=\"([^\"]+)\"",t,re.I)}
    for m in re.finditer(r'<(input|textarea|select)\b([^>]*)>',t,re.I):
        tag,attrs=m.group(1).lower(),m.group(2)
        if re.search(r"type=['\"]hidden['\"]",attrs,re.I):
            continue
        idm=re.search(r"\bid=['\"]([^'\"]+)['\"]",attrs,re.I)
        aria=re.search(r"\baria-label=['\"]([^'\"]+)['\"]",attrs,re.I)
        if not idm and not aria:
            issues.append((f,f'{tag} missing id/aria-label'))
        elif idm and idm.group(1) not in labels and not aria:
            issues.append((f,f'{tag} id {idm.group(1)} missing label'))

email=pathlib.Path('email-templates/next-queued-email-assets-2026-03-02-batch28.md').read_text(encoding='utf-8')
entries=[s for s in email.split('\n## ')[1:] if ') - ' in s.splitlines()[0]]
for e in entries:
    hdr=e.splitlines()[0]
    if '{{live_url}}' not in e or '{{screenshot_url}}' not in e:
        issues.append(('batch28',f'missing required placeholders in {hdr}'))

print('entries',len(entries))
print('issues',len(issues))
for i in issues: print(i)
