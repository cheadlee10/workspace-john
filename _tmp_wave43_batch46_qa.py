import re,glob
from pathlib import Path
issues=[]
site_files=glob.glob('sites/premium-v3-wave43/*/index.html')
phone_re=re.compile(r'(?<!\d)(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}(?!\d)')
for f in site_files:
    txt=Path(f).read_text(encoding='utf-8')
    if re.search(r'\{\{[^}]+\}\}|\[[^\]]+\]',txt):
        issues.append((f,'placeholder-like token found'))
    label_ids=set(re.findall(r"<label[^>]*for='([^']+)'",txt))
    for m in re.finditer(r"<(input|textarea|select)([^>]*)>",txt):
        tag,attrs=m.groups()
        if "type='hidden'" in attrs:
            continue
        idm=re.search(r"\bid='([^']+)'",attrs)
        ariam=re.search(r"\baria-label='([^']*)'",attrs)
        if not idm:
            issues.append((f,f'{tag} missing id'))
            continue
        iid=idm.group(1)
        if iid not in label_ids:
            issues.append((f,f'{tag} id={iid} missing matching label'))
        if not ariam or not ariam.group(1).strip():
            issues.append((f,f'{tag} id={iid} missing non-empty aria-label'))
    numbers=set(phone_re.findall(txt))
    href_tels=set(re.findall(r"href='tel:([^']+)'",txt))
    if numbers:
        norm_nums={re.sub(r'\D','',n)[-10:] for n in numbers}
        norm_tels={re.sub(r'\D','',n)[-10:] for n in href_tels}
        missing=norm_nums-norm_tels
        if missing:
            issues.append((f,f'phone numbers without tel link digits={sorted(missing)}'))

print('SITE FILES',len(site_files))
if issues:
    for i in issues:
        print('ISSUE',i)
else:
    print('No site issues found')

email='email-templates/next-queued-email-assets-2026-03-03-batch46.md'
et=Path(email).read_text(encoding='utf-8')
body_blocks=re.findall(r"\*\*Email body\*\*[\s\S]*?Best,\nJohn\nNorthStar Synergy",et)
print('EMAIL BODIES',len(body_blocks))
for idx,b in enumerate(body_blocks,1):
    for req in ['{{live_url}}','{{screenshot_url}}']:
        if req not in b:
            print('ISSUE email body',idx,'missing',req)
for m in re.findall(r'\{\{[^}]+\}\}',et):
    if m not in ('{{live_url}}','{{screenshot_url}}'):
        print('ISSUE unapproved placeholder',m)
print('Email checks complete')
