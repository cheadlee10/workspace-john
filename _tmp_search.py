from pathlib import Path
terms=['first_touches_planned','lead_schedule']
for p in Path('.').rglob('*'):
    if not p.is_file():
        continue
    if 'node_modules' in p.parts or '.git' in p.parts:
        continue
    try:
        txt=p.read_text(encoding='utf-8',errors='ignore')
    except:
        continue
    for t in terms:
        if t in txt:
            print(p)
            break
