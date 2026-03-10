import re, json
from pathlib import Path

wave = Path('sites/premium-v3-wave88')
batch = Path('email-templates/next-queued-email-assets-2026-03-03-batch91.md')
qj = Path('email-templates/send-queue-2026-03-02-next-batches.jsonl').read_text(encoding='utf-8', errors='ignore')
qc = Path('email-templates/send-queue-2026-03-02-next-batches-tracker.csv').read_text(encoding='utf-8', errors='ignore')

site_issues = {}
for d in wave.iterdir():
    if not d.is_dir():
        continue
    c = (d / 'index.html').read_text(encoding='utf-8', errors='ignore')
    issues = []
    forms = re.findall(r'<form\b[^>]*>', c, re.I)
    if re.search(r'\{\{[^}]+\}\}|TODO|TBD|lorem ipsum|example\.com', c, re.I):
        issues.append('placeholder_token')
    if len(forms) != 2:
        issues.append(f'form_count_{len(forms)}')
    for fm in forms:
        if not re.search(r"action=['\"]/contact['\"]", fm, re.I) or not re.search(r"method=['\"]post['\"]", fm, re.I):
            issues.append('form_action_method')
    if len(re.findall(r"name=['\"]business['\"]", c, re.I)) < 2 or len(re.findall(r"name=['\"]source['\"]", c, re.I)) < 2:
        issues.append('hidden_fields')

    vis = re.sub(r'<style[\s\S]*?</style>', ' ', c, flags=re.I)
    vis = re.sub(r'<script[\s\S]*?</script>', ' ', vis, flags=re.I)
    vis = re.sub(r'<[^>]+>', ' ', vis)
    if re.search(r'guarantee|top-rated|double your|increase\s+[0-9]+%|rank\s*#?1|\bROI\b', vis, re.I):
        issues.append('non_compliant_claim')
    phones = re.findall(r'\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}', vis)
    if any(re.search(r'555|123-456-7890|000', p) for p in phones):
        issues.append('fabricated_phone')

    checks = [('name', 'name_label_quick'), ('phone', 'phone_label_quick'), ('qname', 'name_label_quote'), ('qphone', 'phone_label_quote'), ('qdetails', 'details_label_quote')]
    for fid, tag in checks:
        if not (re.search(rf"<label[^>]+for=['\"]{fid}['\"]", c, re.I) and re.search(rf"id=['\"]{fid}['\"]", c, re.I)):
            issues.append(f'missing_{tag}')

    if issues:
        site_issues[d.name] = sorted(set(issues))

text = batch.read_text(encoding='utf-8', errors='ignore')
sections = [s for s in text.split('\n---\n') if re.search(r'^##\s+\d+\)', s, re.M)]
email_issues = []
for i, s in enumerate(sections, 1):
    m = re.search(r'`(sprint-\d{8}-\d{3})`', s)
    lid = m.group(1) if m else f'section_{i}'
    body = s.split('**Email body**', 1)[1] if '**Email body**' in s else ''
    if '{{live_url}}' not in body:
        email_issues.append((lid, 'missing_live_url'))
    if '{{screenshot_url}}' not in body:
        email_issues.append((lid, 'missing_screenshot_url'))
    if re.search(r'[\u2018\u2019\u201C\u201D\u2013\u2014\u2026]', s):
        email_issues.append((lid, 'non_ascii_punctuation'))
    if re.search(r'guarantee|top-rated|double your|increase\s+[0-9]+%|rank\s*#?1|\bROI\b', re.sub(r'`[^`]+`', ' ', s), re.I):
        email_issues.append((lid, 'non_compliant_claim'))

ids = sorted(set(re.findall(r'`(sprint-\d{8}-\d{3})`', text)))
missing_jsonl = [i for i in ids if i not in qj]
missing_csv = [i for i in ids if i not in qc]

print(json.dumps({
    'sites_total': len([d for d in wave.iterdir() if d.is_dir()]),
    'site_issues': site_issues,
    'sections': len(sections),
    'email_issues': email_issues,
    'ids': ids,
    'missing_jsonl': missing_jsonl,
    'missing_csv': missing_csv
}, indent=2))