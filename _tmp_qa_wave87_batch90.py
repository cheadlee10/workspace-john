import re, json
from pathlib import Path

wave='87'
batch='90'
wave_dir = Path(f'sites/premium-v3-wave{wave}')
site_rows = []
for d in sorted([p for p in wave_dir.iterdir() if p.is_dir()]):
    f = d / 'index.html'
    text = f.read_text(encoding='utf-8', errors='ignore') if f.exists() else ''
    forms = len(re.findall(r'<form\b', text, re.I))
    contact_posts = len(re.findall(r'<form[^>]*action=["\']/contact["\'][^>]*method=["\']post["\']', text, re.I | re.S))
    contact_posts += len(re.findall(r'<form[^>]*method=["\']post["\'][^>]*action=["\']/contact["\']', text, re.I | re.S))
    business_hidden = len(re.findall(r'<input[^>]*type=["\']hidden["\'][^>]*name=["\']business["\']', text, re.I))
    source_hidden = len(re.findall(r'<input[^>]*type=["\']hidden["\'][^>]*name=["\']source["\']', text, re.I))
    placeholders = bool(re.search(r'{{[^}]+}}', text))
    fake555 = bool(re.search(r'555[-\s]?\d{3,4}', text))
    claims = bool(re.search(r'\b(guarantee|guaranteed|#1|number\s*one|best\s+in\s+the\s+world|double your|increase by \d+%)\b', text, re.I))
    labels = set(re.findall(r'<label[^>]*for=["\']([^"\']+)["\']', text, re.I))
    ids = {x[1] for x in re.findall(r'<(input|textarea|select)[^>]*id=["\']([^"\']+)["\']', text, re.I)}
    missing_label_targets = sorted([l for l in labels if l not in ids])
    site_rows.append({
        'site': d.name,
        'forms': forms,
        'contact_posts': contact_posts,
        'business_hidden': business_hidden,
        'source_hidden': source_hidden,
        'placeholders': placeholders,
        'fake555': fake555,
        'claims': claims,
        'missing_label_targets': missing_label_targets,
    })

email_path = Path(f'email-templates/next-queued-email-assets-2026-03-03-batch{batch}.md')
email = email_path.read_text(encoding='utf-8', errors='ignore')
lead_ids = re.findall(r'`(sprint-\d{8}-\d{3})`', email)
lead_ids = sorted(set(lead_ids))
sections = len(re.findall(r'^##\s+\d+\)', email, flags=re.M))
live_tokens = len(re.findall(r'\{\{live_url\}\}', email))
screenshot_tokens = len(re.findall(r'\{\{screenshot_url\}\}', email))
non_ascii = sorted(set(ch for ch in email if ord(ch) > 127))
claims_email = bool(re.search(r'\b(guarantee|guaranteed|#1|number\s*one|double your|increase by \d+%)\b', email, re.I))

jsonl = Path('email-templates/send-queue-2026-03-02-next-batches.jsonl')
csvp = Path('email-templates/send-queue-2026-03-02-next-batches-tracker.csv')
json_ids = set()
csv_ids = set()
for line in jsonl.read_text(encoding='utf-8', errors='ignore').splitlines():
    if not line.strip():
        continue
    try:
        d = json.loads(line)
    except Exception:
        continue
    lid = str(d.get('lead_id', '')).strip()
    if lid:
        json_ids.add(lid)
for line in csvp.read_text(encoding='utf-8', errors='ignore').splitlines()[1:]:
    if not line.strip():
        continue
    parts = line.split(',')
    if parts:
        csv_ids.add(parts[0].strip())

missing_json = [x for x in lead_ids if x not in json_ids]
missing_csv = [x for x in lead_ids if x not in csv_ids]

print(json.dumps({
    'site_count': len(site_rows),
    'sites': site_rows,
    'email': {
        'sections': sections,
        'lead_ids': lead_ids,
        'live_tokens': live_tokens,
        'screenshot_tokens': screenshot_tokens,
        'non_ascii': non_ascii,
        'claims': claims_email,
    },
    'queue': {
        'missing_json': missing_json,
        'missing_csv': missing_csv,
    }
}, indent=2))
