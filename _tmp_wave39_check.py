import re, pathlib
root=pathlib.Path(r'C:/Users/chead/.openclaw/workspace-john/sites/premium-v3-wave39')
for f in root.rglob('index.html'):
    t=f.read_text(encoding='utf-8',errors='ignore')
    print('\n',f)
    # placeholder tokens in site html
    for p in [r'\[COMPANY\]|\[CITY\]|\[STATE\]|\[PHONE\]', r'\{\{[^}]+\}\}', r'TODO|TBD|lorem|ipsum|example\\.com|@example|555-555|\bXXX\b']:
        ms=list(re.finditer(p,t,re.I))
        if ms:
            print(' placeholder-like',p,'count',len(ms))
    tels=re.findall(r"href\s*=\s*['\"]tel:([^'\"]*)['\"]",t,re.I)
    print(' tel links',len(tels),'empty',sum(1 for x in tels if not x.strip()))
    # controls labeling
    label_for={m.group(1) for m in re.finditer(r"<label[^>]*for\s*=\s*['\"]([^'\"]+)['\"]",t,re.I)}
    for m in re.finditer(r"<(input|textarea|select)\b[^>]*>",t,re.I):
        tag=m.group(0)
        if re.search(r"type\s*=\s*['\"]hidden['\"]",tag,re.I):
            continue
        idm=re.search(r"\bid\s*=\s*['\"]([^'\"]+)['\"]",tag,re.I)
        has_label=idm and idm.group(1) in label_for
        has_aria=bool(re.search(r"aria-label\s*=\s*['\"][^'\"]+['\"]|aria-labelledby\s*=\s*['\"][^'\"]+['\"]",tag,re.I))
        if not(has_label or has_aria):
            print(' unlabeled control:',tag[:120])
    # buttons names
    for m in re.finditer(r"<button\b[^>]*>",t,re.I):
        tag=m.group(0)
        if not re.search(r"aria-label\s*=\s*['\"][^'\"]+['\"]",tag,re.I):
            pass
