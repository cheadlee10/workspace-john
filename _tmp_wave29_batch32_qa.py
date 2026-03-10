import re,glob,os
root=r'C:\Users\chead\.openclaw\workspace-john'
wave=os.path.join(root,'sites','premium-v3-wave29')
htmls=glob.glob(os.path.join(wave,'*','index.html'))
issues=[]
for f in htmls:
    t=open(f,encoding='utf-8').read()
    rel=os.path.relpath(f,root)
    pats=[r'\{\{[^}]+\}\}',r'\[[^\]]*placeholder[^\]]*\]',r'PLACEHOLDER',r'Lorem ipsum',r'example\.com',r'\bTBD\b',r'\bTODO\b']
    for p in pats:
        for m in re.finditer(p,t,re.I):
            issues.append((rel,'placeholder',m.group(0)[:80]))
    for m in re.finditer(r'href="tel:([^"]*)"',t,re.I):
        num=m.group(1)
        if not re.search(r'\d{10,}',re.sub(r'\D','',num)):
            issues.append((rel,'bad_tel',num))
    if 'href="#"' in t:
        issues.append((rel,'hash_link','href="#" present'))
    for m in re.finditer(r'<img\b[^>]*>',t,re.I):
        tag=m.group(0)
        if not re.search(r'\balt\s*=\s*"[^"]*"',tag,re.I):
            issues.append((rel,'img_alt_missing',tag[:120]))
    for m in re.finditer(r'aria-label\s*=\s*"\s*"',t,re.I):
        issues.append((rel,'aria_empty','empty aria-label'))

email=os.path.join(root,'email-templates','next-queued-email-assets-2026-03-03-batch32.md')
et=open(email,encoding='utf-8').read()
email_issues=[]
for p,name in [
    (r'\{\{[^}]+\}\}','template_token'),
    (r'\[[^\]]*(?:company|city|name|industry|service)[^\]]*\]','bracket_placeholder'),
    (r'PLACEHOLDER|Lorem ipsum|example\.com|\bTBD\b|\bTODO\b','obvious_placeholder'),
    (r'href="#"','hash_link'),
]:
    for m in re.finditer(p,et,re.I):
        email_issues.append((name,m.group(0)[:80]))
for m in re.finditer(r'tel:([^\)\]\s"\']+)',et,re.I):
    n=m.group(1)
    if len(re.sub(r'\D','',n))<10:
        email_issues.append(('bad_tel',n))

print('HTML files',len(htmls))
print('Site issues',len(issues))
for i in issues:
    print(' | '.join(i))
print('Email issues',len(email_issues))
for i in email_issues:
    print(' | '.join(i))
