import re, pathlib
p=pathlib.Path('email-templates/next-queued-email-assets-2026-03-03-batch47.md')
s=p.read_text(encoding='utf-8')
issues=[]
sections=re.split(r"\n---\n",s)
email_sections=[sec for sec in sections if re.search(r"## \d+\)",sec)]
for sec in email_sections:
    head=re.search(r"## \d+\)\s*(.*?)\s*\(`?gpass",sec)
    name=head.group(1) if head else 'UNKNOWN'
    if sec.count('{{live_url}}')<1:
        issues.append((name,'missing {{live_url}}'))
    if sec.count('{{screenshot_url}}')<1:
        issues.append((name,'missing {{screenshot_url}}'))
    if re.search(r"\[|\]|<script|guarantee|#1|best in|ranked",sec,re.I):
        pass
# ASCII-safe punctuation check: flag non-ascii chars
non_ascii=[ch for ch in s if ord(ch)>127]
print('EMAIL_SECTIONS',len(email_sections))
print('ISSUES',len(issues))
for i in issues:
    print(i[0],'--',i[1])
print('NON_ASCII_COUNT',len(non_ascii))
if non_ascii:
    uniq=sorted(set(non_ascii))
    print('NON_ASCII_UNIQUE',''.join(uniq[:20]))
