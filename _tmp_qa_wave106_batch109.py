import re, json, csv
from pathlib import Path

root=Path(r'C:/Users/chead/.openclaw/workspace-john')
wave_dir=root/'sites/premium-v3-wave106'
email_file=root/'email-templates/next-queued-email-assets-2026-03-03-batch109.md'
queue_jsonl=root/'email-templates/send-queue-2026-03-02-next-batches.jsonl'
queue_csv=root/'email-templates/send-queue-2026-03-02-next-batches-tracker.csv'

site_results=[]
critical=[]
for p in sorted(wave_dir.glob('*/index.html')):
    t=p.read_text(encoding='utf-8',errors='ignore')
    forms=list(re.finditer(r'<form\b[^>]*>',t,re.I|re.S))
    form_count=len(forms)
    bad_form=[]
    for m in forms:
        tag=m.group(0)
        act=re.search(r'action\s*=\s*["\']([^"\']+)["\']',tag,re.I)
        meth=re.search(r'method\s*=\s*["\']([^"\']+)["\']',tag,re.I)
        if (not act) or act.group(1).strip()!='/contact' or (not meth) or meth.group(1).strip().lower()!='post':
            bad_form.append(tag[:120])
    business_hidden=len(re.findall(r'<input[^>]*type=["\']hidden["\'][^>]*name=["\']business["\']',t,re.I))
    source_hidden=len(re.findall(r'<input[^>]*type=["\']hidden["\'][^>]*name=["\']source["\']',t,re.I))
    labels_ok=bool(re.search(r'<label[^>]*for=["\'][^"\']*name',t,re.I)) and bool(re.search(r'<label[^>]*for=["\'][^"\']*email',t,re.I))
    placeholders=re.findall(r'\{\{[^}]+\}\}|TODO|TBD|lorem ipsum',t,re.I)
    claims=re.findall(r'guarantee(?:d|s)?|#1|best in|top-rated|increase\s+\d+%|rank(?:ed|ing)',t,re.I)
    slug=p.parent.name
    site_results.append({
      'slug':slug,'form_count':form_count,'bad_form_count':len(bad_form),'business_hidden':business_hidden,'source_hidden':source_hidden,
      'labels_ok':labels_ok,'placeholder_hits':len(placeholders),'claims_hits':len(claims)
    })
    if form_count!=2: critical.append(f'{slug}: expected 2 forms, found {form_count}')
    if bad_form: critical.append(f'{slug}: form action/method non-compliant')
    if business_hidden<2 or source_hidden<2: critical.append(f'{slug}: hidden fields missing in one or more forms')

et=email_file.read_text(encoding='utf-8',errors='ignore')
m=re.search(r'Included leads:\s*(.+)', et)
ids=[]
if m:
    ids=re.findall(r'`([^`]+)`', m.group(1))
if not ids:
    ids=sorted(set(re.findall(r'wave\d+-\d+',et)))

bodies=re.findall(r'\*\*Email body\*\*\s*(.*?)\n\n\*\*CTA options',et,re.S)
email_checks=[]
for i,b in enumerate(bodies,1):
    has_live='{{live_url}}' in b
    has_shot='{{screenshot_url}}' in b
    ascii_safe=all(ord(ch)<128 for ch in b)
    claims=bool(re.search(r'guarantee(?:d|s)?|#1|best in|top-rated|increase\s+\d+%|rank(?:ed|ing)',b,re.I))
    email_checks.append({'email_num':i,'has_live':has_live,'has_screenshot':has_shot,'ascii_safe':ascii_safe,'claims_flag':claims})

jsonl_ids=set()
for line in queue_jsonl.read_text(encoding='utf-8',errors='ignore').splitlines():
    line=line.strip()
    if not line: continue
    try:
        obj=json.loads(line)
    except Exception:
        continue
    for k in ('lead_id','id','leadId'):
        if k in obj and isinstance(obj[k],str):
            jsonl_ids.add(obj[k])

csv_ids=set()
with queue_csv.open(encoding='utf-8',errors='ignore',newline='') as f:
    rdr=csv.DictReader(f)
    headers=rdr.fieldnames or []
    id_col=None
    for c in headers:
        if c.lower() in ('lead_id','leadid','id'):
            id_col=c
            break
    if id_col:
        for r in rdr:
            v=(r.get(id_col) or '').strip()
            if v: csv_ids.add(v)

missing_jsonl=[i for i in ids if i not in jsonl_ids]
missing_csv=[i for i in ids if i not in csv_ids]
if missing_jsonl: critical.append('Batch109 missing in queue JSONL: ' + ', '.join(missing_jsonl))
if missing_csv: critical.append('Batch109 missing in queue CSV: ' + ', '.join(missing_csv))
if any((not x['has_live']) or (not x['has_screenshot']) for x in email_checks): critical.append('Email placeholders missing in one or more emails')
if any((not x['ascii_safe']) for x in email_checks): critical.append('Non-ASCII punctuation detected in one or more emails')
if any(x['claims_flag'] for x in email_checks): critical.append('Non-compliant claims language detected in one or more emails')

print(json.dumps({
 'site_results':site_results,
 'email_total':len(email_checks),
 'ids':ids,
 'missing_jsonl':missing_jsonl,
 'missing_csv':missing_csv,
 'email_checks':email_checks,
 'critical':critical
},indent=2))