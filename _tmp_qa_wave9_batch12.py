import glob,re
issues=[]
files=glob.glob('sites/premium-v3-wave9/*/index.html')
for f in files:
    t=open(f,encoding='utf-8').read()
    for p in ['TODO','TBD','Lorem','example.com','@example','555-555','href="#"']:
        if p.lower() in t.lower():
            issues.append((f,'placeholder',p))
    m=re.search(r"<a class='btn sec' href='tel:[^']+'([^>]*)>Call",t)
    if not m or 'aria-label=' not in m.group(1):
        issues.append((f,'a11y','header call CTA missing aria-label'))
    for _,idv in re.findall(r"<(input|textarea)\b[^>]*id='([^']+)'[^>]*>",t,re.I):
        if not re.search(rf"<label[^>]*for='{re.escape(idv)}'",t,re.I):
            issues.append((f,'a11y',f'missing label for {idv}'))
    tels=re.findall(r"href='tel:[^']+'",t)
    if len(tels)<2:
        issues.append((f,'tel','expected 2+ tel links'))
    if "action='/contact'" in t:
        issues.append((f,'blocker','form endpoint is placeholder /contact'))

email='email-templates/next-queued-email-assets-2026-03-02-batch12.md'
et=open(email,encoding='utf-8').read()
blocks=et.split('\n---\n')
for i,b in enumerate(blocks[1:],1):
    if '{{live_url}}' not in b or '{{screenshot_url}}' not in b:
        issues.append((email,'email',f'block {i} missing required placeholders'))
    if 'we built your website' not in b.lower():
        issues.append((email,'email',f'block {i} missing required positioning phrase'))

print('ISSUES',len(issues))
for row in issues:
    print('|'.join(row))
