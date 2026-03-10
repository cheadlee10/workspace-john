import re, json, pathlib, csv
root=pathlib.Path(r'C:/Users/chead/.openclaw/workspace-john')
wave_dir=root/'sites'/'premium-v3-wave79'
email_file=root/'email-templates'/'next-queued-email-assets-2026-03-03-batch82.md'
jsonl=root/'email-templates'/'send-queue-2026-03-02-next-batches.jsonl'
csvf=root/'email-templates'/'send-queue-2026-03-02-next-batches-tracker.csv'

slugs=[p for p in wave_dir.iterdir() if p.is_dir()]
print('SITE_COUNT',len(slugs))
issues=[]
claims_re=re.compile(r'\b(guarantee(?:d)?|#1|number\s*1|best\s+in\s+|top\s*rated|increase\s+\d+%|results\s+guaranteed|rank\s*#?1)\b',re.I)
phone_fake_re=re.compile(r'\b(?:555[-\s]?01\d\d|123[-\s]?456[-\s]?7890|000[-\s]?000[-\s]?0000)\b')
placeholder_re=re.compile(r'\{\{[^}]+\}\}|\b(?:TODO|TBD|lorem ipsum|example\.com)\b',re.I)
for s in slugs:
    f=s/'index.html'
    t=f.read_text(encoding='utf-8')
    forms=re.findall(r'<form\b[\s\S]*?</form>',t,re.I)
    if len(forms)!=2: issues.append((s.name,'form_count',len(forms)))
    for i,form in enumerate(forms,1):
        if not re.search(r'action="/contact"',form,re.I): issues.append((s.name,f'form{i}_action','missing'))
        if not re.search(r'method="post"',form,re.I): issues.append((s.name,f'form{i}_method','missing'))
        for hidden in ('business','source'):
            if not re.search(rf'<input[^>]+type="hidden"[^>]+name="{hidden}"',form,re.I):
                issues.append((s.name,f'form{i}_hidden_{hidden}','missing'))
    if placeholder_re.search(t): issues.append((s.name,'placeholder','found'))
    if claims_re.search(t): issues.append((s.name,'claims','found'))
    if phone_fake_re.search(t): issues.append((s.name,'fake_phone','found'))
    ids=set(re.findall(r'<input[^>]*\bid="([^"]+)"',t,re.I)+re.findall(r'<textarea[^>]*\bid="([^"]+)"',t,re.I))
    for m in re.finditer(r'<label[^>]*\bfor="([^"]+)"',t,re.I):
        if m.group(1) not in ids: issues.append((s.name,'label_for_missing_id',m.group(1)))
print('SITE_ISSUES',len(issues))
for x in issues[:20]: print('ISSUE',x)

et=email_file.read_text(encoding='utf-8')
sections=re.split(r'\n---\n',et)
email_bodies=[sec for sec in sections if '**Email body**' in sec]
print('EMAIL_SECTIONS',len(email_bodies))
email_issues=[]
for idx,sec in enumerate(email_bodies,1):
    for ph in ('{{live_url}}','{{screenshot_url}}'):
        if ph not in sec: email_issues.append((idx,'missing',ph))
    if claims_re.search(sec): email_issues.append((idx,'claims','found'))
    if any(ord(ch)>127 for ch in sec): email_issues.append((idx,'non_ascii','found'))
print('EMAIL_ISSUES',len(email_issues))
for x in email_issues[:20]: print('EISSUE',x)

ids=re.findall(r'`(wave6-\d+)`',et)
seen=set(); bid=[]
for i in ids:
    if i not in seen:
        seen.add(i); bid.append(i)
print('BATCH_IDS',bid)
json_ids=set()
for line in jsonl.read_text(encoding='utf-8').splitlines():
    if not line.strip():
        continue
    try:
        obj=json.loads(line)
        json_ids.add(obj.get('lead_id') or obj.get('id') or '')
    except Exception:
        pass
missing_json=[i for i in bid if i not in json_ids]
print('MISSING_JSON',missing_json)

csv_ids=set()
with csvf.open(encoding='utf-8',newline='') as fh:
    r=csv.DictReader(fh)
    for row in r:
        csv_ids.add((row.get('lead_id') or row.get('id') or '').strip())
missing_csv=[i for i in bid if i not in csv_ids]
print('MISSING_CSV',missing_csv)
