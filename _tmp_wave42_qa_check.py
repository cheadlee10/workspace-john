import re,glob,os
base=r'C:\\Users\\chead\\.openclaw\\workspace-john\\sites\\premium-v3-wave42'
for f in glob.glob(base+'/*/index.html'):
    s=open(f,encoding='utf-8').read()
    slug=os.path.basename(os.path.dirname(f))
    issues=[]
    for pat,name in [(r'\{\{.+?\}\}','template braces'),(r'\[[^\]]+\]','bracket placeholder'),(r'TODO|TBD|lorem|ipsum','todo/lorem')]:
        if re.search(pat,s,re.I):
            issues.append(name)
    ids=set(re.findall(r"<(?:input|textarea)[^>]*\sid='([^']+)'",s))
    labels=set(re.findall(r"<label[^>]*for='([^']+)'",s))
    missing=[i for i in ids if i not in labels]
    if missing:
        issues.append('missing <label for>: '+','.join(missing))
    ctrls=re.findall(r"<(input|textarea)([^>]*)>",s)
    noaria=[]
    for tag,attrs in ctrls:
        if "type='hidden'" in attrs:
            continue
        if 'aria-label=' not in attrs:
            m=re.search(r"\sid='([^']+)'",attrs)
            noaria.append(m.group(1) if m else '?')
    if noaria:
        issues.append('missing aria-label: '+','.join(noaria))
    if re.search(r'\(\d{3}\)|\d{3}[-. ]\d{3}[-. ]\d{4}',s) and 'tel:' not in s:
        issues.append('phone number present without tel: link')
    print(f"{slug}: {'OK' if not issues else 'ISSUES: ' + '; '.join(issues)}")
