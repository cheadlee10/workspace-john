from pathlib import Path
root=Path('sites/premium-v3-wave87')
for p in root.iterdir():
    if p.is_dir():
        t=(p/'index.html').read_text(encoding='utf-8')
        ok=(t.count('action="/contact"')>=2 and 'href="#quote"' in t and 'name="source" value="quick_callback"' in t and 'name="source" value="detailed_quote"' in t)
        print(p.name, 'OK' if ok else 'FAIL')
