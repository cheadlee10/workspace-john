import re
from pathlib import Path

wave=Path(r'C:/Users/chead/.openclaw/workspace-john/sites/premium-v3-wave52')
files=sorted(wave.glob('*/index.html'))
issues=[]
pat_tokens=[r'\{\{[^}]+\}\}',r'\bTODO\b',r'\bTBD\b',r'lorem ipsum',r'example\.com']
claim_re=re.compile(r'\b(best|#1|number\s*one|guarantee(?:d)?|top[- ]rated|award[- ]winning)\b',re.I)
phone_bad=re.compile(r'(?:\(\d{3}\)\s*000-0000|000-0000|555[-\s]?\d{4}|123[-\s]?4567|null|null phone)',re.I)

for f in files:
    txt=f.read_text(encoding='utf-8',errors='ignore')
    for p in pat_tokens:
        if re.search(p,txt,re.I):
            issues.append((str(f),'token',p))

    if not re.search(r'<form\b[^>]*>',txt,re.I): issues.append((str(f),'form','missing form'))
    if not re.search(r'<form[^>]*method=["\']?post',txt,re.I): issues.append((str(f),'form','method post missing'))
    if not re.search(r'<form[^>]*action=["\'][^"\']*/contact',txt,re.I): issues.append((str(f),'form','action /contact missing'))
    if not re.search(r'<input[^>]*type=["\']hidden["\'][^>]*name=["\']source["\']',txt,re.I): issues.append((str(f),'form','hidden source missing'))
    if not re.search(r'<input[^>]*type=["\']hidden["\'][^>]*name=["\']business["\']',txt,re.I): issues.append((str(f),'form','hidden business missing'))

    labels_for=set(m.group(1) for m in re.finditer(r'<label[^>]*for=["\']([^"\']+)',txt,re.I))
    for m in re.finditer(r'<input\b([^>]*)>',txt,re.I):
        attrs=m.group(1)
        t=re.search(r'type=["\']?([^"\'\s>]+)',attrs,re.I)
        typ=(t.group(1).lower() if t else 'text')
        if typ in ('hidden','submit','button','image','reset'): continue
        idm=re.search(r'id=["\']([^"\']+)',attrs,re.I)
        ar=re.search(r'aria-label=["\']([^"\']+)',attrs,re.I)
        if ar: continue
        if idm and idm.group(1) in labels_for: continue
        issues.append((str(f),'a11y',f'unlabeled input type={typ}'))
    for m in re.finditer(r'<textarea\b([^>]*)>',txt,re.I):
        attrs=m.group(1)
        idm=re.search(r'id=["\']([^"\']+)',attrs,re.I)
        ar=re.search(r'aria-label=["\']([^"\']+)',attrs,re.I)
        if ar: continue
        if idm and idm.group(1) in labels_for: continue
        issues.append((str(f),'a11y','unlabeled textarea'))

    mm=claim_re.search(txt)
    if mm: issues.append((str(f),'claims',mm.group(0)))
    mm=phone_bad.search(txt)
    if mm: issues.append((str(f),'phone',mm.group(0)))

print('FILES',len(files))
print('ISSUES',len(issues))
for i in issues:
    print('|'.join(i))

email=Path(r'C:/Users/chead/.openclaw/workspace-john/email-templates/next-queued-email-assets-2026-03-03-batch55.md')
etxt=email.read_text(encoding='utf-8',errors='ignore')
sections=re.split(r'\n---\n',etxt)
bodies=0
missing_live=[]
missing_shot=[]
for idx,s in enumerate(sections,1):
    if '**Email body**' in s:
        bodies+=1
        if '{{live_url}}' not in s: missing_live.append(idx)
        if '{{screenshot_url}}' not in s: missing_shot.append(idx)
nonascii=sum(1 for c in etxt if ord(c)>127)
mm=claim_re.search(etxt)
print('EMAIL_BODIES',bodies)
print('EMAIL_MISSING_LIVE',missing_live)
print('EMAIL_MISSING_SHOT',missing_shot)
print('EMAIL_NONASCII',nonascii)
print('EMAIL_CLAIM_HIT',mm.group(0) if mm else '')
