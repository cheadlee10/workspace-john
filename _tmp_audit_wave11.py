from pathlib import Path
import re

root = Path('sites/premium-v3-wave11')
for p in sorted(root.glob('*/index.html')):
    s = p.read_text(encoding='utf-8')
    slug = p.parent.name
    bad = []
    if re.search(r'placeholder endpoint|lorem ipsum|\[[^\]]+\]|TODO|TBD|example\.com', s, re.I):
        bad.append('placeholder-token')
    tels = re.findall(r"href='tel:([^']+)'", s)
    if not tels:
        bad.append('no-tel-links')
    for t in tels:
        if not re.fullmatch(r'\+1\d{10}', t):
            bad.append(f'bad-tel:{t}')
    labels = set(re.findall(r"<label for='([^']+)'", s))
    for m in re.finditer(r"<(input|textarea)\b([^>]*)>", s):
        tag, attrs = m.groups()
        if "type='hidden'" in attrs:
            continue
        idm = re.search(r"\bid='([^']+)'", attrs)
        if not idm:
            bad.append('missing-id')
        elif idm.group(1) not in labels:
            bad.append(f"missing-label-for:{idm.group(1)}")
    print(slug, 'OK' if not bad else ' | '.join(sorted(set(bad))))
