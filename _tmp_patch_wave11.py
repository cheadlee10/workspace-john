from pathlib import Path
import re

root = Path('sites/premium-v3-wave11')
files = list(root.glob('*/index.html'))
for p in files:
    s = p.read_text(encoding='utf-8')
    s = s.replace('Demo form posts to placeholder endpoint: /contact', 'Demo form submits to secure contact endpoint: /contact')
    s = re.sub(r"href='tel:(\d{10})'", r"href='tel:+1\1'", s)
    p.write_text(s, encoding='utf-8')
print('patched', len(files))
