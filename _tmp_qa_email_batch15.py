import re
from pathlib import Path
p=Path(r'C:/Users/chead/.openclaw/workspace-john/email-templates/next-queued-email-assets-2026-03-02-batch15.md')
t=p.read_text(encoding='utf-8')
blocks=t.split('\n---\n')
email_sections=[b for b in blocks if b.strip().startswith('## ')]
print('sections',len(email_sections))
for b in email_sections:
    title=b.splitlines()[0]
    issues=[]
    if '{{live_url}}' not in b: issues.append('missing {{live_url}}')
    if '{{screenshot_url}}' not in b: issues.append('missing {{screenshot_url}}')
    if 'we built your website' not in b.lower(): issues.append('missing explicit phrase')
    if re.search(r'\b(#1|best|guarantee|guaranteed|\d+%|top-rated)\b',b,re.I): issues.append('possible claim language')
    print(title, 'OK' if not issues else '; '.join(issues))
