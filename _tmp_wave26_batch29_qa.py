import re, pathlib
root=pathlib.Path(r'C:/Users/chead/.openclaw/workspace-john')
wave=root/'sites/premium-v3-wave26'
issues=[]
for f in wave.glob('*/index.html'):
    t=f.read_text(encoding='utf-8')
    slug=f.parent.name
    for pat,name in [(r'\{\{[^}]+\}\}','placeholder'),(r'TODO|TBD|Lorem ipsum|\[Your|\[Business|\[City','todo')]:
        if re.search(pat,t,re.I):
            issues.append((slug,name,'contains placeholder/todo'))
    for m in re.finditer(r"href='tel:([^']+)'",t):
        num=re.sub(r'\D','',m.group(1))
        if len(num)<10:
            issues.append((slug,'tel',f"short tel link {m.group(1)}"))
    forms=re.findall(r'<form[\s\S]*?</form>',t,re.I)
    for fi,form in enumerate(forms,1):
        labels=set(re.findall(r"<label[^>]*for='([^']+)'",form,re.I))
        for m in re.finditer(r"<(input|textarea|select)([^>]*)>",form,re.I):
            tag=m.group(1).lower(); attrs=m.group(2)
            typem=re.search(r"type='([^']+)'",attrs,re.I)
            if tag=='input' and typem and typem.group(1).lower()=='hidden':
                continue
            idm=re.search(r"\sid='([^']+)'",attrs,re.I)
            ariam=re.search(r"\saria-label='([^']+)'",attrs,re.I)
            nm=re.search(r"\sname='([^']+)'",attrs,re.I)
            nmv=nm.group(1) if nm else '?'
            if not idm:
                issues.append((slug,'a11y',f'form{fi}:{tag} name={nmv} missing id'))
                continue
            if idm.group(1) not in labels and not ariam:
                issues.append((slug,'a11y',f'form{fi}:{tag} id={idm.group(1)} missing label+aria-label'))

email=(root/'email-templates/next-queued-email-assets-2026-03-02-batch29.md').read_text(encoding='utf-8')
sections=re.split(r'\n---\n',email)
for sec in sections:
    if '## ' not in sec or 'Email body' not in sec:
        continue
    head=re.search(r'##\s*\d+\)\s*(.*?)\s*\(`([^`]+)`\)',sec)
    biz=head.group(1) if head else 'unknown'
    oid=head.group(2) if head else 'unknown'
    for ph in ['{{live_url}}','{{screenshot_url}}']:
        if ph not in sec:
            issues.append((oid,'email',f'{biz} missing {ph}'))
    if re.search(r'TODO|TBD|Lorem',sec,re.I):
        issues.append((oid,'email',f'{biz} contains todo/lorem marker'))

print('ISSUES',len(issues))
for i in issues:
    print('|'.join(i))
