import pathlib,re
base=pathlib.Path('sites/premium-v3-wave44')
bad=[]
files=list(base.rglob('index.html'))
for f in files:
    s=f.read_text(encoding='utf-8')
    ids=set(re.findall(r"<(?:input|textarea|select)[^>]*\sid=['\"]([^'\"]+)['\"]",s,re.I))
    for_for=re.findall(r"<label[^>]*\sfor=['\"]([^'\"]+)['\"]",s,re.I)
    for x in for_for:
        if x not in ids:
            bad.append((str(f),f'label target missing: {x}'))
    for m in re.finditer(r"<(input|textarea|select)\b([^>]*)>",s,re.I):
        tag,attrs=m.group(1),m.group(2)
        if re.search(r"type=['\"]hidden['\"]",attrs,re.I):
            continue
        idm=re.search(r"\sid=['\"]([^'\"]+)['\"]",attrs,re.I)
        has_label=False
        if idm and re.search(r"<label[^>]*for=['\"]"+re.escape(idm.group(1))+r"['\"]",s,re.I):
            has_label=True
        has_aria=bool(re.search(r"aria-label=",attrs,re.I))
        if not (has_label or has_aria):
            bad.append((str(f),f'unlabeled {tag}: {attrs[:40]}'))
    for m in re.finditer(r"href=['\"]tel:([^'\"]+)['\"]",s,re.I):
        num=m.group(1)
        if not re.fullmatch(r"[0-9+()\-\s\.]+",num):
            bad.append((str(f),f'invalid tel href: {num}'))
    if re.search(r"\{\{[^}]+\}\}|TODO|TBD|Lorem ipsum|example\.com",s,re.I):
        bad.append((str(f),'placeholder token present'))

print('FILES',len(files))
print('ISSUES',len(bad))
for row in bad:
    print(row[0],'--',row[1])
