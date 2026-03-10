import re, json, csv
from pathlib import Path
root=Path(r'C:/Users/chead/.openclaw/workspace-john')
wave=root/'sites/premium-v3-wave105'
email_file=root/'email-templates/next-queued-email-assets-2026-03-03-batch108.md'
queue_jsonl=root/'email-templates/send-queue-2026-03-02-next-batches.jsonl'
queue_csv=root/'email-templates/send-queue-2026-03-02-next-batches-tracker.csv'
claims_re=re.compile(r'\b(guarantee(?:d|s)?|#1|number\s*1|top[-\s]?rated|rank(?:ed|ing)?\s*(?:#?1|first)|increase\s+\d+%|\d+%\s*(?:increase|lift|boost)|ROI|return\s+on\s+investment)\b',re.I)
placeholder_re=re.compile(r'\{\{[^}]+\}\}|\b(?:TODO|TBD|lorem ipsum)\b',re.I)

def site_checks():
    issues=[]
    for idx in sorted(wave.glob('*/index.html')):
        t=idx.read_text(encoding='utf-8')
        forms=re.findall(r'<form\b[\s\S]*?</form>',t,re.I)
        if len(forms)!=2: issues.append((str(idx),'form_count',len(forms)))
        for i,f in enumerate(forms,1):
            if 'action="/contact"' not in f and "action='/contact'" not in f:
                issues.append((str(idx),f'form{i}_action','missing /contact'))
            if not re.search(r'method=["\']post["\']',f,re.I):
                issues.append((str(idx),f'form{i}_method','not POST'))
            for hid in ('business','source'):
                if not re.search(rf'<input[^>]+type=["\']hidden["\'][^>]+name=["\']{hid}["\']',f,re.I):
                    issues.append((str(idx),f'form{i}_hidden_{hid}','missing'))
        if not re.search(r'<label[^>]*for=["\']name["\']',t,re.I): issues.append((str(idx),'label_name','missing'))
        if not re.search(r'<label[^>]*for=["\']email["\']',t,re.I): issues.append((str(idx),'label_email','missing'))
        if placeholder_re.search(t): issues.append((str(idx),'placeholder_token','found'))
        if claims_re.search(t): issues.append((str(idx),'non_compliant_claim','found'))
    return issues

text=email_file.read_text(encoding='utf-8')
ids=[]
for x in re.findall(r'sprint-20260303-\d{3}',text):
    if x not in ids: ids.append(x)
sections=text.split('\n---\n')
email_issues=[]
for sid in ids:
    sec=next((s for s in sections if sid in s),None)
    if not sec:
        email_issues.append((sid,'section_missing')); continue
    if '{{live_url}}' not in sec: email_issues.append((sid,'missing_live_url'))
    if '{{screenshot_url}}' not in sec: email_issues.append((sid,'missing_screenshot_url'))
    if claims_re.search(sec): email_issues.append((sid,'non_compliant_claim'))
    if any(ord(c)>127 for c in sec): email_issues.append((sid,'non_ascii'))

jsonl_ids=set()
for line in queue_jsonl.read_text(encoding='utf-8').splitlines():
    line=line.strip()
    if not line: continue
    try: obj=json.loads(line)
    except: continue
    lid=obj.get('lead_id')
    if lid: jsonl_ids.add(lid)
csv_ids=set()
with queue_csv.open(encoding='utf-8',newline='') as f:
    for row in csv.DictReader(f):
        lid=row.get('lead_id')
        if lid: csv_ids.add(lid)

missing_json=[i for i in ids if i not in jsonl_ids]
missing_csv=[i for i in ids if i not in csv_ids]

print('IDS',ids)
print('SITE_ISSUES',len(site_checks()))
for x in site_checks(): print('SITE',x)
print('EMAIL_ISSUES',email_issues)
print('MISSING_JSON',missing_json)
print('MISSING_CSV',missing_csv)
