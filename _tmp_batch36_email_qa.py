import re
from pathlib import Path
p=Path(r'C:\Users\chead\.openclaw\workspace-john\email-templates\next-queued-email-assets-2026-03-03-batch36.md')
t=p.read_text(encoding='utf-8')
sections=re.split(r'\n---\n',t)
email_sections=[s for s in sections if re.search(r'## \d+\)',s)]
missing=[]
for s in email_sections:
    hdr=re.search(r'## \d+\) (.+?) \(`',s)
    name=hdr.group(1) if hdr else 'unknown'
    has_live='{{live_url}}' in s
    has_shot='{{screenshot_url}}' in s
    if not (has_live and has_shot):
        missing.append((name,has_live,has_shot))
print(f'emails={len(email_sections)} missing={len(missing)}')
for m in missing:
    print(m)
