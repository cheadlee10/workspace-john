import re, json, csv
from pathlib import Path
root=Path(r'C:/Users/chead/.openclaw/workspace-john')
wave=root/'sites'/'premium-v3-wave93'
site_dirs=[p for p in wave.iterdir() if p.is_dir()]
summary=[]
for d in sorted(site_dirs):
    f=d/'index.html'
    text=f.read_text(encoding='utf-8')
    s=[]
    if re.search(r'\{\{.*?\}\}|TODO|TBD|lorem ipsum|example\.com',text,re.I): s.append('placeholder leakage')
    forms=re.findall(r'<form\b[^>]*>',text,re.I)
    good=[tag for tag in forms if re.search(r'action=["\"]/contact["\"]',tag,re.I) and re.search(r'method=["\"]post["\"]',tag,re.I)]
    if len(forms)!=2: s.append(f'form count={len(forms)} (expected 2)')
    if len(good)!=2: s.append('forms missing action=/contact method=post')
    hidden_business=re.findall(r'<input[^>]*type=["\"]hidden["\"][^>]*name=["\"]business["\"][^>]*>',text,re.I)
    hidden_source=re.findall(r'<input[^>]*type=["\"]hidden["\"][^>]*name=["\"]source["\"][^>]*>',text,re.I)
    if len(hidden_business)!=2: s.append(f'business hidden fields={len(hidden_business)} (expected 2)')
    if len(hidden_source)!=2: s.append(f'source hidden fields={len(hidden_source)} (expected 2)')
    bvals=re.findall(r'name=["\"]business["\"][^>]*value=["\"]([^"\"]+)["\"]',text,re.I)
    if len(bvals)!=2 or any(v!=d.name for v in bvals): s.append(f'business value mismatch: {bvals}')
    if 'href="#quote"' not in text and "href='#quote'" not in text: s.append('missing hero link to #quote')
    if not re.search(r'id=["\"]quote["\"]',text,re.I): s.append('missing id="quote" anchor')
    if re.search(r'\b(guarantee(?:d)?|#1|best in|fastest|proven results?|top-rated|ranked)\b',text,re.I): s.append('prohibited claim language')
    if re.search(r'\b(?:\+?1[-.\s]?)?\(?555\)?[-.\s]?\d{3}[-.\s]?\d{4}\b',text): s.append('fake 555 phone')
    summary.append((d.name,s))

email_path=root/'email-templates'/'next-queued-email-assets-2026-03-03-batch96.md'
email=email_path.read_text(encoding='utf-8')
sections=re.split(r'\n---\n',email)
entry_sections=[s for s in sections if re.search(r'\(`nosite-0?(2[1-9]|30)`\)',s)]
email_issues=[]
for sec in entry_sections:
    mid=re.search(r'\(`(nosite-\d+)`\)',sec).group(1)
    if '{{live_url}}' not in sec or '{{screenshot_url}}' not in sec:
        email_issues.append((mid,'missing required placeholders'))
    if any(ord(ch)>127 for ch in sec):
        email_issues.append((mid,'non-ascii chars present'))
    if re.search(r'\b(guarantee(?:d)?|#1|best in|fastest|proven results?|top-rated|ranked)\b',sec,re.I):
        email_issues.append((mid,'prohibited claims language'))

ids=[f'nosite-{i:03d}' for i in range(21,31)]
jsonl=root/'email-templates'/'send-queue-2026-03-02-next-batches.jsonl'
csvp=root/'email-templates'/'send-queue-2026-03-02-next-batches-tracker.csv'
seen_j=set(); seen_c=set()
for line in jsonl.read_text(encoding='utf-8').splitlines():
    line=line.strip()
    if not line: continue
    try: obj=json.loads(line)
    except: continue
    if obj.get('lead_id') in ids: seen_j.add(obj['lead_id'])
with csvp.open(encoding='utf-8',newline='') as f:
    for r in csv.DictReader(f):
        if r.get('lead_id') in ids: seen_c.add(r['lead_id'])
miss_j=[i for i in ids if i not in seen_j]
miss_c=[i for i in ids if i not in seen_c]

print('SITE_SUMMARY')
for n,s in summary:
    print(f'{n}|{"PASS" if not s else "FAIL:"+"; ".join(s)}')
print('EMAIL_ENTRIES',len(entry_sections))
print('EMAIL_ISSUES',email_issues)
print('MISS_JSONL',miss_j)
print('MISS_CSV',miss_c)
