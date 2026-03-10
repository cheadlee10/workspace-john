import re, json, csv
from pathlib import Path
root=Path(r'C:/Users/chead/.openclaw/workspace-john')
wave=root/'sites/premium-v3-wave94'
issues=[]
prohibited=[r'guarantee',r'best\s+in\s',r'rank(?:ed|ing)?',r'results?\s+guaranteed',r'overnight']
for p in sorted([d for d in wave.iterdir() if d.is_dir()]):
    f=p/'index.html'
    txt=f.read_text(encoding='utf-8',errors='ignore')
    name=p.name
    if re.search(r'\{\{.*?\}\}|TODO|TBD|lorem ipsum|example\.com',txt,re.I|re.S): issues.append((name,'placeholder leakage'))
    forms=re.findall(r'<form\b[^>]*>',txt,re.I)
    if len(forms)!=2: issues.append((name,f'form count {len(forms)}'))
    for m in forms:
        if not re.search(r'action\s*=\s*["\']/contact["\']',m,re.I): issues.append((name,'form missing action=/contact'))
        if not re.search(r'method\s*=\s*["\']post["\']',m,re.I): issues.append((name,'form missing method=post'))
    business_count=len(re.findall(r'<input[^>]+name=["\']business["\'][^>]+type=["\']hidden["\']|<input[^>]+type=["\']hidden["\'][^>]+name=["\']business["\']',txt,re.I))
    source_count=len(re.findall(r'<input[^>]+name=["\']source["\'][^>]+type=["\']hidden["\']|<input[^>]+type=["\']hidden["\'][^>]+name=["\']source["\']',txt,re.I))
    if business_count<2: issues.append((name,f'business hidden count {business_count}'))
    if source_count<2: issues.append((name,f'source hidden count {source_count}'))
    vals=re.findall(r'name=["\']business["\'][^>]*value=["\']([^"\']+)["\']|value=["\']([^"\']+)["\'][^>]*name=["\']business["\']',txt,re.I)
    flat=[a or b for a,b in vals]
    if not flat or any(v!=name for v in flat):
        issues.append((name,f'business value mismatch {flat}'))
    if not re.search(r'href=["\']#quote["\']',txt,re.I): issues.append((name,'missing href #quote'))
    if not re.search(r'id=["\']quote["\']',txt,re.I): issues.append((name,'missing id quote'))
    for pat in prohibited:
        if re.search(pat,txt,re.I): issues.append((name,f'prohibited claim match {pat}'))
    if re.search(r'\(\d{3}\)\s*555-|555-\d{4}',txt): issues.append((name,'fake 555 phone'))

print('SITE_ISSUES',len(issues))
for i in issues[:100]: print(i)

batch=root/'email-templates/next-queued-email-assets-2026-03-03-batch97.md'
text=batch.read_text(encoding='utf-8',errors='ignore')
sections=re.findall(r'^##\s+\d+\)',text, re.M)
print('SECTIONS',len(sections))
blocks=re.split(r'(?m)^##\s+\d+\)',text)[1:]
email_issues=[]
for idx,b in enumerate(blocks,1):
    if '{{live_url}}' not in b: email_issues.append((idx,'missing {{live_url}}'))
    if '{{screenshot_url}}' not in b: email_issues.append((idx,'missing {{screenshot_url}}'))
    if re.search(r'\b(guarantee|guaranteed|#1|ranked|best in|double your|increase by \d+%|results in \d+ days)\b',b,re.I): email_issues.append((idx,'prohibited claim'))
    if any(ord(ch)>127 for ch in b): email_issues.append((idx,'non-ascii char present'))
print('EMAIL_ISSUES',len(email_issues))
for i in email_issues: print(i)

ids=[f'nosite-{i:03d}' for i in range(31,41)]
jsonl=root/'email-templates/send-queue-2026-03-02-next-batches.jsonl'
csvp=root/'email-templates/send-queue-2026-03-02-next-batches-tracker.csv'
json_ids=set()
for line in jsonl.read_text(encoding='utf-8',errors='ignore').splitlines():
    line=line.strip()
    if not line: continue
    try:
        obj=json.loads(line)
    except:
        continue
    lid=obj.get('lead_id') or obj.get('id')
    if lid: json_ids.add(lid)
csv_ids=set()
with open(csvp,newline='',encoding='utf-8',errors='ignore') as f:
    for r in csv.DictReader(f):
        lid=r.get('lead_id') or r.get('id')
        if lid: csv_ids.add(lid)
print('MISSING_JSONL', [i for i in ids if i not in json_ids])
print('MISSING_CSV', [i for i in ids if i not in csv_ids])
