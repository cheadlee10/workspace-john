import re
from pathlib import Path
base=Path(r'C:/Users/chead/.openclaw/workspace-john/sites/premium-v3-wave12')
for f in sorted(base.glob('*/index.html')):
    t=f.read_text(encoding='utf-8')
    orig=t
    # normalize tel hrefs to E.164 (+ prefix)
    t=re.sub(r"href='tel:(\d+)'", r"href='tel:+\1'", t)
    # add aria-label to top CTA tel links missing it
    def add_aria(m):
        full=m.group(0)
        href=m.group(1)
        text=m.group(2)
        if 'aria-label=' in full:
            return full
        label=text.strip()
        return full.replace("'>", f"' aria-label='{label}'>",1)
    t=re.sub(r"<a class='btn sec' href='(tel:[^']+)'>([^<]+)</a>", add_aria, t)
    if t!=orig:
        f.write_text(t,encoding='utf-8')
        print('updated',f)
