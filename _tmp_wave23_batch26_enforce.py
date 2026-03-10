import re,glob,os
from pathlib import Path
root=Path(r"C:\Users\chead\.openclaw\workspace-john")
site_dir=root/'sites'/'premium-v3-wave23'
email_file=root/'email-templates'/'next-queued-email-assets-2026-03-02-batch26.md'

site_issues=[]
for fp in sorted(site_dir.glob('*/index.html')):
    txt=fp.read_text(encoding='utf-8')
    slug=fp.parent.name
    # placeholders
    if re.search(r'\{\{[^}]+\}\}|\b(TODO|TBD|LOREM|PLACEHOLDER)\b',txt,re.I):
        site_issues.append((slug,'placeholder token found'))
    # tel links (single/double quote)
    tels=re.findall(r"href\s*=\s*['\"]tel:([^'\"]+)['\"]",txt,re.I)
    if not tels:
        site_issues.append((slug,'missing tel: link'))
    # form controls with id should have label for
    ids=set(re.findall(r"<(?:input|textarea|select)\b[^>]*\bid=['\"]([^'\"]+)['\"]",txt,re.I))
    labels=set(re.findall(r"<label\b[^>]*\bfor=['\"]([^'\"]+)['\"]",txt,re.I))
    hidden=set(re.findall(r"<input\b[^>]*type=['\"]hidden['\"][^>]*\bid=['\"]([^'\"]+)['\"]",txt,re.I))
    missing=sorted(i for i in ids if i not in labels and i not in hidden)
    if missing:
        site_issues.append((slug,'missing labels: '+', '.join(missing)))

email_issues=[]
et=email_file.read_text(encoding='utf-8')
if any(ord(ch)>127 for ch in et):
    email_issues.append('non-ASCII punctuation/chars present')
sections=re.split(r'\n---\n',et)
for i,s in enumerate(sections,1):
    if '## ' not in s:
        continue
    if '{{live_url}}' not in s or '{{screenshot_url}}' not in s:
        email_issues.append(f'section {i} missing required placeholder(s)')
    if re.search(r'\b(#1|best|guarantee|guaranteed|increase by|\d+%)\b',s,re.I):
        email_issues.append(f'section {i} potential claim language')

print('SITE_ISSUES')
for x in site_issues: print('|'.join(x))
print('EMAIL_ISSUES')
for x in email_issues: print(x)
print('COUNTS',len(site_issues),len(email_issues))
