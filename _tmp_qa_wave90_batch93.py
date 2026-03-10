import re, json, csv
from pathlib import Path
root=Path(r'C:/Users/chead/.openclaw/workspace-john')
wave=root/'sites'/'premium-v3-wave90'
site_results=[]
for d in sorted([p for p in wave.iterdir() if p.is_dir()]):
    f=d/'index.html'
    if not f.exists():
        site_results.append((d.name,'FAIL','missing index.html'))
        continue
    t=f.read_text(encoding='utf-8',errors='ignore')
    errs=[]
    if re.search(r'\{\{[^}]+\}\}|\b(TODO|TBD|lorem ipsum|example\.com)\b',t,re.I):
        errs.append('placeholder leakage')
    if re.search(r'\b(guarantee|#1|number one|best in|top-rated|top rated|ranked|results guaranteed|instant results|double your|triple your)\b',t,re.I):
        errs.append('prohibited claim language')
    if re.search(r'\b555[-)\s]',t):
        errs.append('fabricated phone pattern (555)')
    forms=list(re.finditer(r'<form\b[^>]*>',t,re.I))
    if len(forms)!=2:
        errs.append(f'form count {len(forms)} !=2')
    else:
        for i,m in enumerate(forms,1):
            tag=m.group(0)
            if not re.search(r'action\s*=\s*["\']/contact["\']',tag,re.I):
                errs.append(f'form{i} action not /contact')
            if not re.search(r'method\s*=\s*["\']post["\']',tag,re.I):
                errs.append(f'form{i} method not post')
        if len(re.findall(r'type\s*=\s*["\']hidden["\'][^>]*name\s*=\s*["\']business["\']',t,re.I))<2:
            errs.append('business hidden field missing on both forms')
        if len(re.findall(r'type\s*=\s*["\']hidden["\'][^>]*name\s*=\s*["\']source["\']',t,re.I))<2:
            errs.append('source hidden field missing on both forms')
    site_results.append((d.name,'FAIL' if errs else 'PASS','; '.join(errs)))

batch=root/'email-templates'/'next-queued-email-assets-2026-03-03-batch93.md'
text=batch.read_text(encoding='utf-8',errors='ignore')
ids=[]
for i in re.findall(r'sprint-20260303-\d{3}',text):
    if i not in ids: ids.append(i)
body_blocks=re.findall(r'\*\*Email body\*\*[\s\S]*?(?=\n---\n|\Z)',text)
email_err=[]
for bi,b in enumerate(body_blocks,1):
    if '{{live_url}}' not in b or '{{screenshot_url}}' not in b:
        email_err.append(f'section{bi} missing required placeholders')
    if re.search(r'[\u2018\u2019\u201c\u201d\u2013\u2014\u2026]',b):
        email_err.append(f'section{bi} non-ascii punctuation')
    if re.search(r'\b(guarantee|#1|number one|best in|top-rated|top rated|ranked|results guaranteed|instant results|double your|triple your)\b',b,re.I):
        email_err.append(f'section{bi} prohibited claim language')

jsonl=root/'email-templates'/'send-queue-2026-03-02-next-batches.jsonl'
csvp=root/'email-templates'/'send-queue-2026-03-02-next-batches-tracker.csv'
json_ids=set()
with jsonl.open(encoding='utf-8') as fh:
    for line in fh:
        line=line.strip()
        if not line: continue
        try:o=json.loads(line)
        except: continue
        lid=o.get('lead_id')
        if lid: json_ids.add(lid)
csv_ids=set()
with csvp.open(encoding='utf-8',newline='') as fh:
    r=csv.DictReader(fh)
    for row in r:
        lid=row.get('lead_id')
        if lid: csv_ids.add(lid)
missing_json=[i for i in ids if i not in json_ids]
missing_csv=[i for i in ids if i not in csv_ids]

print('SITES')
for r in site_results: print('\t'.join(r))
print('EMAIL_IDS',ids)
print('EMAIL_BODY_COUNT',len(body_blocks))
print('EMAIL_ERRORS',email_err)
print('MISSING_JSON',missing_json)
print('MISSING_CSV',missing_csv)
