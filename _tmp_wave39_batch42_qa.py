import re, pathlib
root=pathlib.Path(r'C:/Users/chead/.openclaw/workspace-john')
wave=root/'sites/premium-v3-wave39'
email=root/'email-templates/next-queued-email-assets-2026-03-03-batch42.md'
patterns=[r'\bTODO\b',r'\bTBD\b',r'placeholder',r'lorem',r'ipsum',r'example\.com',r'@example',r'555-555',r'\bXXX\b',r'\[COMPANY',r'\[PHONE',r'\[CITY',r'\{\{',r'\}\}']
files=list(wave.rglob('index.html'))+[email]
for f in files:
    t=f.read_text(encoding='utf-8',errors='ignore')
    print(f'\nFILE {f}')
    for p in patterns:
        m=re.search(p,t,re.I)
        if m:
            ln=t.count('\n',0,m.start())+1
            snippet=t[m.start():m.start()+100].replace('\n',' ')
            print(f' pattern {p} line {ln}: {snippet}')
    tels=re.findall(r'href="tel:([^"]*)"',t,re.I)
    print(' tel links:',len(tels),'empty' if any(x.strip()=='' for x in tels) else 'ok')
    bad_anchors=list(re.finditer(r'href="(#|javascript:void\(0\);?)"',t,re.I))
    if bad_anchors:
        print(' bad anchors:',len(bad_anchors))
    imgs=list(re.finditer(r'<img\b[^>]*>',t,re.I))
    missing_alt=0
    empty_alt=0
    for m in imgs:
        tag=m.group(0)
        a=re.search(r'\balt\s*=\s*"([^"]*)"',tag,re.I)
        if not a: missing_alt+=1
        elif a.group(1).strip()=='' : empty_alt+=1
    print(' imgs',len(imgs),'missing_alt',missing_alt,'empty_alt',empty_alt)

    controls=list(re.finditer(r'<(?:input|textarea|select)\b[^>]*>',t,re.I))
    ids={m.group(1) for m in re.finditer(r'<(?:input|textarea|select)\b[^>]*\bid="([^"]+)"',t,re.I)}
    labels_for={m.group(1) for m in re.finditer(r'<label\b[^>]*\bfor="([^"]+)"',t,re.I)}
    possibly_unlabeled=0
    for m in controls:
        tag=m.group(0)
        if re.search(r'type\s*=\s*"hidden"',tag,re.I):
            continue
        has_aria=bool(re.search(r'\baria-label\s*=\s*"[^"]+"|\baria-labelledby\s*=\s*"[^"]+"',tag,re.I))
        idm=re.search(r'\bid\s*=\s*"([^"]+)"',tag,re.I)
        has_label=idm and idm.group(1) in labels_for
        if not (has_aria or has_label):
            possibly_unlabeled+=1
    print(' controls',len(controls),'possibly_unlabeled',possibly_unlabeled)
