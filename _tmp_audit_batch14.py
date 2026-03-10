from pathlib import Path
import re

p=Path('email-templates/next-queued-email-assets-2026-03-02-batch14.md')
s=p.read_text(encoding='utf-8')
sections=[sec for sec in s.split('\n## ')[1:] if re.match(r'\d+\) ', sec)]
issues=[]
for sec in sections:
    header=sec.splitlines()[0].strip()
    body=sec
    if '{{live_url}}' not in body: issues.append((header,'missing {{live_url}}'))
    if '{{screenshot_url}}' not in body: issues.append((header,'missing {{screenshot_url}}'))
    if re.search(r'we built your website', body, re.I) is None: issues.append((header,'missing positioning phrase'))
print('sections',len(sections))
print('issues',len(issues))
for i in issues:
    print(i[0], i[1])
