import json,csv,re
from pathlib import Path
root=Path(r'C:/Users/chead/.openclaw/workspace-john')
# site checks
wave=root/'sites/premium-v3-wave111'
issues=[]
for d in sorted([p for p in wave.iterdir() if p.is_dir()]):
    t=(d/'index.html').read_text(encoding='utf-8')
    forms=re.findall(r'<form\b[\s\S]*?</form>',t,re.I)
    if len(forms)!=2: issues.append((d.name,'form_count',len(forms)))
    for i,f in enumerate(forms,1):
        if 'action="/contact"' not in f and "action='/contact'" not in f: issues.append((d.name,f'form{i}_action'))
        if re.search(r'method\s*=\s*["\']post["\']',f,re.I) is None: issues.append((d.name,f'form{i}_method'))
        for hidden in ('business','source'):
            if re.search(rf'name=["\']{hidden}["\']',f,re.I) is None: issues.append((d.name,f'form{i}_{hidden}'))
    if ('href="#quote"' not in t and "href='#quote'" not in t): issues.append((d.name,'cta_anchor'))
    if ('id="quote"' not in t and "id='quote'" not in t): issues.append((d.name,'quote_id'))
    if '{{' in t: issues.append((d.name,'placeholder_token'))

# email checks
em=(root/'email-templates/next-queued-email-assets-2026-03-03-batch114.md').read_text(encoding='utf-8')
email_issues=[]
if em.count('{{live_url}}')<10: email_issues.append('live_url_count')
if em.count('{{screenshot_url}}')<10: email_issues.append('screenshot_count')
if re.search(r'\b(guarantee|guaranteed|#1|top-rated|increase by \d+%|ROI)\b',em,re.I): email_issues.append('claim_scan')
ids=sorted(set(re.findall(r'`(wave3-\d{3})`',em)))

jids=set()
for line in (root/'email-templates/send-queue-2026-03-02-next-batches.jsonl').read_text(encoding='utf-8').splitlines():
    line=line.strip()
    if not line: continue
    try:
        obj=json.loads(line)
    except: continue
    lid=obj.get('lead_id')
    if lid: jids.add(lid)

cids=set()
with (root/'email-templates/send-queue-2026-03-02-next-batches-tracker.csv').open(encoding='utf-8',newline='') as f:
    for row in csv.DictReader(f):
        lid=row.get('lead_id')
        if lid: cids.add(lid)

print('SITE_ISSUES',issues)
print('EMAIL_ISSUES',email_issues)
print('MISSING_JSON',[i for i in ids if i not in jids])
print('MISSING_CSV',[i for i in ids if i not in cids])
