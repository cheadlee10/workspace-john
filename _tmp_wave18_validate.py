from pathlib import Path
import re
base=Path(r"C:/Users/chead/.openclaw/workspace-john/sites/premium-v3-wave18")
for f in sorted(base.rglob('index.html')):
    s=f.read_text(encoding='utf-8')
    slug=f.parent.name
    issues=[]
    if 'pending verification' in s.lower():
        issues.append('placeholder-text')
    if re.search(r"href='tel:(?!\+1)\d{10}'", s):
        issues.append('tel-not-e164')
    for key in ["id='name'", "id='phone'", "id='qname'", "id='qphone'", "id='qdetails'"]:
        idx=s.find(key)
        if idx!=-1:
            end=s.find('>',idx)
            frag=s[idx:end]
            if "aria-label=" not in frag:
                issues.append(f'missing-aria-{key}')
    print(slug, 'PASS' if not issues else 'FAIL', ','.join(issues))
