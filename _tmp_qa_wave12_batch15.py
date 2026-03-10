import re
from pathlib import Path
base=Path(r'C:/Users/chead/.openclaw/workspace-john/sites/premium-v3-wave12')
for f in sorted(base.glob('*/index.html')):
    t=f.read_text(encoding='utf-8')
    issues=[]
    if re.search(r'\b(TODO|lorem|ipsum)\b|\[.*?\]',t,re.I):
        issues.append('placeholder-token')
    for m in re.finditer(r"<a[^>]*href='(tel:[^']+)'[^>]*>",t):
        tag=m.group(0); href=m.group(1)
        if 'aria-label=' not in tag:
            issues.append(f'tel-missing-aria:{href}')
        if not re.match(r"tel:\+\d+",href):
            issues.append(f'tel-not-e164:{href}')
    labels=set(re.findall(r"<label[^>]*for='([^']+)'",t))
    for m in re.finditer(r"<(input|textarea|select)\b[^>]*id='([^']+)'[^>]*>",t):
        typ,idv=m.group(1),m.group(2)
        if typ=='input' and "type='hidden'" in m.group(0):
            continue
        if idv not in labels:
            issues.append(f'unlabeled-field:{idv}')
    print(f"{f.parent.name}: {'OK' if not issues else '; '.join(sorted(set(issues)))}")
