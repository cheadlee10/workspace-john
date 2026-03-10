import re, json, csv
from pathlib import Path

root=Path(r'C:/Users/chead/.openclaw/workspace-john')
site_dir=root/'sites'/'premium-v3-wave98'
email_file=root/'email-templates'/'next-queued-email-assets-2026-03-03-batch101.md'
jsonl=root/'email-templates'/'send-queue-2026-03-02-next-batches.jsonl'
csvf=root/'email-templates'/'send-queue-2026-03-02-next-batches-tracker.csv'

print('SITE_DIR_EXISTS',site_dir.exists())
print('EMAIL_FILE_EXISTS',email_file.exists())

prohibited=[r'guarantee',r'#1',r'best in',r'rank(?:ed|ing)?',r'performance']
site_results=[]
for p in sorted(site_dir.glob('*/index.html')):
    txt=p.read_text(encoding='utf-8',errors='ignore')
    slug=p.parent.name
    issues=[]
    if re.search(r'\{\{.*?\}\}|TODO|TBD|lorem|example\.com',txt,re.I|re.S):
        issues.append('placeholder leakage')
    forms=list(re.finditer(r'<form\b[^>]*>',txt,re.I))
    if len(forms)!=2: issues.append(f'form count {len(forms)} !=2')
    if len(re.findall(r'<form[^>]*action="/contact"[^>]*method="post"|<form[^>]*method="post"[^>]*action="/contact"',txt,re.I))!=2:
        issues.append('forms action/method mismatch')
    if len(re.findall(r'<input[^>]*type="hidden"[^>]*name="business"[^>]*>',txt,re.I))!=2:
        issues.append('business hidden count !=2')
    if len(re.findall(r'<input[^>]*type="hidden"[^>]*name="source"[^>]*>',txt,re.I))!=2:
        issues.append('source hidden count !=2')
    if len(re.findall(rf'<input[^>]*name="business"[^>]*value="{re.escape(slug)}"[^>]*>|<input[^>]*value="{re.escape(slug)}"[^>]*name="business"[^>]*>',txt,re.I))!=2:
        issues.append('business value != slug on both forms')
    if '#quote' not in txt or 'id="quote"' not in txt:
        issues.append('missing quote anchor linkage')
    if re.search('|'.join(prohibited),txt,re.I):
        issues.append('possible prohibited claim text')
    for fld in ['name','phone','email','details']:
        if not re.search(rf'<label[^>]*for="[^\"]*{fld}[^\"]*"',txt,re.I):
            issues.append(f'missing label for {fld}')
            break
    site_results.append((slug,issues))

print('SITES')
for slug,issues in site_results:
    print(slug,'PASS' if not issues else 'FAIL:'+ '; '.join(issues))

etxt=email_file.read_text(encoding='utf-8',errors='ignore')
lead_ids=sorted(set(re.findall(r'nosite-\d{3}',etxt)))
email_issues=[]
for lid in lead_ids:
    m=re.search(rf'(?s)(?:^|\n)##\s*Lead\s*{re.escape(lid)}\b(.*?)(?=\n##\s*Lead\s*nosite-\d{{3}}\b|\Z)',etxt,re.I)
    chunk=m.group(1) if m else ''
    if '{{live_url}}' not in chunk: email_issues.append((lid,'missing {{live_url}}'))
    if '{{screenshot_url}}' not in chunk: email_issues.append((lid,'missing {{screenshot_url}}'))
    if re.search('|'.join(prohibited),chunk,re.I): email_issues.append((lid,'prohibited claim text'))
    if re.search(r'[“”’—–]',chunk): email_issues.append((lid,'non-ascii punctuation'))

print('LEAD_IDS',lead_ids)
print('EMAIL_ISSUE_COUNT',len(email_issues))
for x in email_issues:
    print('EMAIL_FAIL',x)

want=lead_ids
json_ids=[]
for line in jsonl.read_text(encoding='utf-8').splitlines():
    if not line.strip():
        continue
    try:
        obj=json.loads(line)
    except Exception:
        continue
    if obj.get('lead_id') in want and obj.get('asset_file')==email_file.name:
        json_ids.append(obj.get('lead_id'))
missing_json=[x for x in want if x not in set(json_ids)]

csv_ids=[]
with csvf.open('r',encoding='utf-8',newline='') as f:
    r=csv.DictReader(f)
    for row in r:
        if row.get('lead_id') in want and row.get('asset_file')==email_file.name:
            csv_ids.append(row.get('lead_id'))
missing_csv=[x for x in want if x not in set(csv_ids)]
print('MISSING_JSON',missing_json)
print('MISSING_CSV',missing_csv)
