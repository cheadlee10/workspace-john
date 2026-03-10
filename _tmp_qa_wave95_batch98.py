import re, pathlib, json

root = pathlib.Path(r"C:/Users/chead/.openclaw/workspace-john/sites/premium-v3-wave95")
issues = {}
for p in sorted(root.glob('*/index.html')):
    s = p.read_text(encoding='utf-8', errors='ignore')
    slug = p.parent.name
    prob = []

    if re.search(r'\{\{[^}]+\}\}|\b(TODO|TBD|lorem ipsum|example\.com)\b', s, re.I):
        prob.append('placeholder leakage')

    forms = re.findall(r'<form\b[^>]*>', s, re.I)
    if len(forms) != 2:
        prob.append(f'form count {len(forms)} != 2')

    for i, m in enumerate(forms, 1):
        ml = m.lower()
        if 'action="/contact"' not in ml and "action='/contact'" not in ml:
            prob.append(f'form{i} bad action')
        if 'method="post"' not in ml and "method='post'" not in ml:
            prob.append(f'form{i} bad method')

    hidden_business = len(re.findall(r'<input[^>]*type=["\']hidden["\'][^>]*name=["\']business["\']', s, re.I))
    hidden_source = len(re.findall(r'<input[^>]*type=["\']hidden["\'][^>]*name=["\']source["\']', s, re.I))
    if hidden_business < 2:
        prob.append(f'business hidden fields {hidden_business}<2')
    if hidden_source < 2:
        prob.append(f'source hidden fields {hidden_source}<2')

    if f'value="{slug}"' not in s and f"value='{slug}'" not in s:
        prob.append('business hidden value not matching slug')

    if 'href="#quote"' not in s and "href='#quote'" not in s:
        prob.append('missing CTA href #quote')
    if 'id="quote"' not in s and "id='quote'" not in s:
        prob.append('missing quote anchor id')

    if re.search(r'\b(#1|number\s*1|best in|guarantee(?:d)? results|results guaranteed|top[- ]rated|ranked)\b', s, re.I):
        prob.append('prohibited claim language')

    issues[slug] = prob

batch_path = pathlib.Path(r"C:/Users/chead/.openclaw/workspace-john/email-templates/next-queued-email-assets-2026-03-03-batch98.md")
text = batch_path.read_text(encoding='utf-8', errors='ignore')
email_issues = []
sections = re.findall(r'^##\s+\d+\)', text, flags=re.M)
if len(sections) != 10:
    email_issues.append(f'section count {len(sections)} != 10')

split = re.split(r'^##\s+\d+\)', text, flags=re.M)[1:]
for idx, sec in enumerate(split, 1):
    if '{{live_url}}' not in sec:
        email_issues.append(f'section {idx} missing {{live_url}}')
    if '{{screenshot_url}}' not in sec:
        email_issues.append(f'section {idx} missing {{screenshot_url}}')
    if re.search(r'[\u2018\u2019\u201C\u201D\u2013\u2014\u2026]', sec):
        email_issues.append(f'section {idx} has non-ascii punctuation')
    if re.search(r'\b(#1|number\s*1|guarantee(?:d)?|top[- ]rated|ranked|best in)\b', sec, re.I):
        email_issues.append(f'section {idx} prohibited claim language')

# expected ids
ids = re.findall(r'`(nosite-\d{3})`', text)
expected = [f'nosite-{i:03d}' for i in range(41, 51)]
missing_in_doc = [x for x in expected if x not in ids]
if missing_in_doc:
    email_issues.append(f'missing ids in batch doc: {missing_in_doc}')

# queue sync checks
q_jsonl = pathlib.Path(r"C:/Users/chead/.openclaw/workspace-john/email-templates/send-queue-2026-03-02-next-batches.jsonl")
q_csv = pathlib.Path(r"C:/Users/chead/.openclaw/workspace-john/email-templates/send-queue-2026-03-02-next-batches-tracker.csv")
jsonl_ids = set()
for line in q_jsonl.read_text(encoding='utf-8', errors='ignore').splitlines():
    line=line.strip()
    if not line: continue
    try:
        obj=json.loads(line)
    except Exception:
        continue
    if obj.get('lead_id') in expected:
        jsonl_ids.add(obj.get('lead_id'))

csv_ids = set()
for line in q_csv.read_text(encoding='utf-8', errors='ignore').splitlines()[1:]:
    if not line.strip():
        continue
    parts = line.split(',')
    if parts and parts[0] in expected:
        csv_ids.add(parts[0])

print(json.dumps({
    'site_issues': issues,
    'email_issues': email_issues,
    'missing_jsonl_ids': sorted(set(expected)-jsonl_ids),
    'missing_csv_ids': sorted(set(expected)-csv_ids)
}, indent=2))