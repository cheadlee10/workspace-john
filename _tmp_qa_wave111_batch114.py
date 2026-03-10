import json, csv, re
from pathlib import Path
root=Path(r'C:/Users/chead/.openclaw/workspace-john')
wave=root/'sites/premium-v3-wave111'
issues=[]
for d in sorted([p for p in wave.iterdir() if p.is_dir()]):
    idx=d/'index.html'
    txt=idx.read_text(encoding='utf-8')
    forms=re.findall(r'<form\b[\s\S]*?</form>',txt,re.I)
    if len(forms)!=2: issues.append((d.name,'form_count',len(forms)))
    for i,f in enumerate(forms,1):
        if 'action="/contact"' not in f and "action='/contact'" not in f: issues.append((d.name,f'form{i}_action','missing'))
        if re.search(r'method\s*=\s*["\']post["\']',f,re.I) is None: issues.append((d.name,f'form{i}_method','missing_post'))
        if re.search(r'<input[^>]+name=["\']business["\'][^>]+type=["\']hidden["\']',f,re.I) is None and re.search(r'<input[^>]+type=["\']hidden["\'][^>]+name=["\']business["\']',f,re.I) is None:
            issues.append((d.name,f'form{i}_business_hidden','missing'))
        if re.search(r'<input[^>]+name=["\']source["\'][^>]+type=["\']hidden["\']',f,re.I) is None and re.search(r'<input[^>]+type=["\']hidden["\'][^>]+name=["\']source["\']',f,re.I) is None:
            issues.append((d.name,f'form{i}_source_hidden','missing'))
        m=re.search(r'name=["\']business["\'][^>]*value=["\']([^"\']+)["\']',f,re.I)
        if not m:
            m=re.search(r'value=["\']([^"\']+)["\'][^>]*name=["\']business["\']',f,re.I)
        if m and m.group(1)!=d.name:
            issues.append((d.name,f'form{i}_business_value',m.group(1)))
    if 'href="#quote"' not in txt and "href='#quote'" not in txt:
        issues.append((d.name,'hero_cta_href','missing'))
    if 'id="quote"' not in txt and "id='quote'" not in txt:
        issues.append((d.name,'quote_id','missing'))
    toks=['{{','}}','TODO','TBD','lorem ipsum','example.com',' 555-','(555)']
    for t in toks:
        if t.lower() in txt.lower():
            issues.append((d.name,'token',t))
    if re.search(r'\b(guarantee|guaranteed|#1|best in|top-rated|increase by \d+%|ROI)\b',txt,re.I):
        issues.append((d.name,'claim_scan','flag'))
    ids=set(re.findall(r'<input[^>]*\sid=["\']([^"\']+)["\']',txt,re.I))|set(re.findall(r'<textarea[^>]*\sid=["\']([^"\']+)["\']',txt,re.I))|set(re.findall(r'<select[^>]*\sid=["\']([^"\']+)["\']',txt,re.I))
    fors=set(re.findall(r'<label[^>]*\sfor=["\']([^"\']+)["\']',txt,re.I))
    missing=[i for i in ids if i not in fors and i not in ('business','source')]
    if missing: issues.append((d.name,'label_missing',','.join(sorted(missing))))

batch=root/'email-templates/next-queued-email-assets-2026-03-03-batch114.md'
em=batch.read_text(encoding='utf-8')
email_issues=[]
if em.count('{{live_url}}')<10: email_issues.append(('placeholder_live_url',em.count('{{live_url}}')))
if em.count('{{screenshot_url}}')<10: email_issues.append(('placeholder_screenshot_url',em.count('{{screenshot_url}}')))
if re.search(r'[\u2018\u2019\u201c\u201d\u2013\u2014]',em): email_issues.append(('ascii_punctuation','non_ascii_found'))
if re.search(r'\b(guarantee|guaranteed|#1|top-rated|increase by \d+%|ROI)\b',em,re.I): email_issues.append(('claim_scan','flag'))
ids=sorted(set(re.findall(r'`(wave3-\d{3})`',em)))
qjson=root/'email-templates/send-queue-2026-03-02-next-batches.jsonl'
qcsv=root/'email-templates/send-queue-2026-03-02-next-batches-tracker.csv'
json_ids=set()
for line in qjson.read_text(encoding='utf-8').splitlines():
    if not line.strip(): continue
    try:
        j=json.loads(line)
        lid=j.get('lead_id')
        if lid: json_ids.add(lid)
    except Exception:
        pass
csv_ids=set()
with qcsv.open(encoding='utf-8',newline='') as f:
    for row in csv.DictReader(f):
        lid=row.get('lead_id')
        if lid: csv_ids.add(lid)
missing_json=[i for i in ids if i not in json_ids]
missing_csv=[i for i in ids if i not in csv_ids]
print('SITE_ISSUE_COUNT',len(issues))
for i in issues: print('SITE_ISSUE',i)
print('EMAIL_ISSUES',email_issues)
print('BATCH_IDS',ids)
print('MISSING_JSON',missing_json)
print('MISSING_CSV',missing_csv)
