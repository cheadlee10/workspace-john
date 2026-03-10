import re, json
from pathlib import Path
root=Path(r'C:\Users\chead\.openclaw\workspace-john\sites\premium-v3-wave33')
issues=[]
for f in root.glob('*/index.html'):
    t=f.read_text(encoding='utf-8',errors='ignore')
    for pat,name in [
        (r'\{\{[^}]+\}\}','template_placeholder'),
        (r'(?i)lorem ipsum|todo|tbd|coming soon|insert ','placeholder_text'),
        (r'\bXXX\b|\[[^\]]+\]','token')
    ]:
        m=re.search(pat,t)
        if m:
            s=m.group(0)
            if name=='token' and (s.startswith('[if ') or s.startswith('[endif')):
                pass
            else:
                issues.append({'site':f.parent.name,'type':name,'detail':s[:80]})
    for m in re.finditer(r'href\s*=\s*["\']tel:([^"\']+)["\']',t,re.I):
        val=m.group(1)
        if not re.fullmatch(r'\+?[0-9\-\(\)\s\.]+',val):
            issues.append({'site':f.parent.name,'type':'bad_tel','detail':val})
    if 'tel:' not in t.lower():
        issues.append({'site':f.parent.name,'type':'missing_tel_link','detail':'none'})

    def has_label_for(idv):
        return re.search(rf'<label[^>]+for\s*=\s*["\']{re.escape(idv)}["\']',t,re.I) is not None

    for inp in re.findall(r'<input\b[^>]*>',t,re.I):
        if re.search(r'type\s*=\s*["\']hidden["\']',inp,re.I):
            continue
        if re.search(r'\baria-label\s*=\s*["\'][^"\']+["\']',inp,re.I) or re.search(r'\baria-labelledby\s*=\s*["\'][^"\']+["\']',inp,re.I):
            continue
        idm=re.search(r'\bid\s*=\s*["\']([^"\']+)["\']',inp,re.I)
        if idm and has_label_for(idm.group(1)):
            continue
        issues.append({'site':f.parent.name,'type':'unlabeled_input','detail':inp[:120]})
        break

    for tag in ('textarea','select'):
        for el in re.findall(rf'<{tag}\b[^>]*>',t,re.I):
            if re.search(r'\baria-label\s*=\s*["\'][^"\']+["\']',el,re.I) or re.search(r'\baria-labelledby\s*=\s*["\'][^"\']+["\']',el,re.I):
                continue
            idm=re.search(r'\bid\s*=\s*["\']([^"\']+)["\']',el,re.I)
            if idm and has_label_for(idm.group(1)):
                continue
            issues.append({'site':f.parent.name,'type':f'unlabeled_{tag}','detail':el[:120]})
            break

print(json.dumps(issues,indent=2))
