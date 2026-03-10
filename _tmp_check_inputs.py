import re, pathlib
for p in pathlib.Path('sites/premium-v3-wave7').rglob('index.html'):
    s=p.read_text(encoding='utf-8')
    tags=re.findall(r'<input[^>]*>',s)
    missing=[t for t in tags if "type='" not in t and 'type="' not in t]
    if missing:
        print(p, 'missing_type', len(missing))
