import re, glob
from pathlib import Path

wave = 'sites/premium-v3-wave41'
issues = []

for fp in glob.glob(wave + '/*/index.html'):
    text = Path(fp).read_text(encoding='utf-8')
    slug = Path(fp).parts[-2]

    if re.search(r'\{\{[^}]+\}\}|\[\s*(company|city|state|phone|email|name)\s*\]', text, re.I):
        issues.append((slug, 'placeholder_token'))

    for pat in ['lorem', 'ipsum', 'TODO', 'TBD', 'example.com', '@example']:
        if re.search(pat, text, re.I):
            issues.append((slug, f'dummy:{pat}'))

    forms = re.findall(r'<form[^>]*>(.*?)</form>', text, re.I | re.S)
    for i, form in enumerate(forms, 1):
        for inp in re.finditer(r'<(input|textarea|select)\b([^>]*)>', form, re.I):
            attrs = inp.group(2)
            if re.search(r"type=['\"]hidden['\"]", attrs, re.I):
                continue

            idm = re.search(r"\bid=['\"]([^'\"]+)['\"]", attrs, re.I)
            name = re.search(r"\bname=['\"]([^'\"]+)['\"]", attrs, re.I)
            aria = re.search(r"\baria-label=['\"]\s*([^'\"]*)", attrs, re.I)

            if idm:
                idv = idm.group(1)
                if not re.search(rf"<label[^>]*for=['\"]{re.escape(idv)}['\"]", form, re.I):
                    if not (aria and aria.group(1).strip()):
                        issues.append((slug, f'form{i}:missing_label_for_{idv}'))
            else:
                if not (aria and aria.group(1).strip()):
                    nm = name.group(1) if name else 'unnamed'
                    issues.append((slug, f'form{i}:missing_id_and_aria_{nm}'))

    tel_links = re.findall(r"href=['\"]tel:([^'\"]+)['\"]", text, re.I)
    if not tel_links:
        issues.append((slug, 'missing_tel_link'))
    for t in tel_links:
        if not re.fullmatch(r'\+?\d[\d\-\s\(\)]{6,}', t):
            issues.append((slug, f'bad_tel:{t}'))

if issues:
    print('ISSUES')
    for s, i in issues:
        print(f'{s} => {i}')
else:
    print('NO_ISSUES')

# email batch checks
batch = Path('email-templates/next-queued-email-assets-2026-03-03-batch44.md').read_text(encoding='utf-8')
print('\nEMAIL_CHECKS')
required = ['{{live_url}}', '{{screenshot_url}}']
for token in required:
    count = batch.count(token)
    print(f'{token}: {count}')

# split by entries
entries = re.split(r'\n---\n', batch)
email_sections = [e for e in entries if '**Email body**' in e]
print(f'email_sections: {len(email_sections)}')
for idx, sec in enumerate(email_sections, 1):
    missing = []
    for token in required:
        if token not in sec:
            missing.append(token)
    if missing:
        print(f'section {idx} missing: {missing}')

# non-ascii scan
non_ascii = sorted(set(ch for ch in batch if ord(ch) > 127))
print('non_ascii_chars:', ''.join(non_ascii) if non_ascii else 'NONE')
