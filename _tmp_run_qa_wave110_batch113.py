import re,csv,json
from pathlib import Path

root=Path(r'C:/Users/chead/.openclaw/workspace-john')
wave_dir=root/'sites'/'premium-v3-wave110'
site_results=[]
for d in sorted([p for p in wave_dir.iterdir() if p.is_dir()]):
    f=d/'index.html'
    txt=f.read_text(encoding='utf-8')
    slug=d.name
    forms=list(re.finditer(r'<form\b[\s\S]*?</form>',txt,re.I))
    local=[]
    if len(forms)!=2:
        local.append(f'form_count={len(forms)}')
    for i,m in enumerate(forms,1):
        frag=m.group(0)
        if not re.search(r'action\s*=\s*["\']/contact["\']',frag,re.I): local.append(f'form{i}_action')
        if not re.search(r'method\s*=\s*["\']post["\']',frag,re.I): local.append(f'form{i}_method')
        if not re.search(r'(type\s*=\s*["\']hidden["\'][^>]*name\s*=\s*["\']business["\'])|(name\s*=\s*["\']business["\'][^>]*type\s*=\s*["\']hidden["\'])',frag,re.I):
            local.append(f'form{i}_hidden_business_missing')
        if not re.search(r'(type\s*=\s*["\']hidden["\'][^>]*name\s*=\s*["\']source["\'])|(name\s*=\s*["\']source["\'][^>]*type\s*=\s*["\']hidden["\'])',frag,re.I):
            local.append(f'form{i}_hidden_source_missing')
        m2=re.search(r'name\s*=\s*["\']business["\'][^>]*value\s*=\s*["\']([^"\']+)["\']|value\s*=\s*["\']([^"\']+)["\'][^>]*name\s*=\s*["\']business["\']',frag,re.I)
        val=(m2.group(1) or m2.group(2)) if m2 else None
        if val!=slug:
            local.append(f'form{i}_business_value={val}')
    if not re.search(r'<a[^>]+href=["\']#quote["\']',txt,re.I): local.append('hero_cta_href')
    if not re.search(r'id=["\']quote["\']',txt,re.I): local.append('quote_id')
    for p in [r'\{\{[^}]+\}\}',r'\bTODO\b',r'\bTBD\b',r'lorem ipsum',r'example\.com']:
        if re.search(p,txt,re.I): local.append(f'placeholder:{p}')
    for p in [r'\b#1\b',r'guarantee(?:d|s)?',r'\b100%\b',r'\btop-rated\b']:
        if re.search(p,txt,re.I): local.append(f'claim:{p}')
    if re.search(r'\(\d{3}\)\s*555-\d{4}|\b555-\d{4}\b',txt): local.append('fake_phone_555')
    ids=set(re.findall(r'<(?:input|textarea|select)[^>]*\sid=["\']([^"\']+)["\']',txt,re.I))
    label_fors=set(re.findall(r'<label[^>]*\sfor=["\']([^"\']+)["\']',txt,re.I))
    for iid in sorted(ids):
        if iid not in label_fors:
            local.append(f'missing_label_for:{iid}')
    site_results.append((slug,local))

batch=root/'email-templates'/'next-queued-email-assets-2026-03-03-batch113.md'
text=batch.read_text(encoding='utf-8')
lead_ids=sorted(set(re.findall(r'`(wave3-\d+)`',text)), key=lambda x:int(x.split('-')[1]))
email_issues=[]
if text.count('{{live_url}}')<10: email_issues.append('live_url_count_lt_10')
if text.count('{{screenshot_url}}')<10: email_issues.append('screenshot_url_count_lt_10')
if re.search(r'[\u2018\u2019\u201C\u201D\u2013\u2014\u2026]',text): email_issues.append('non_ascii_punct_present')
for p in [r'\b#1\b',r'guarantee(?:d|s)?',r'\b100%\b',r'\btop-rated\b',r'\bresults\b\s+in\s+\d+\s+days']:
    if re.search(p,text,re.I): email_issues.append(f'claim:{p}')

jsonl=root/'email-templates'/'send-queue-2026-03-02-next-batches.jsonl'
csvf=root/'email-templates'/'send-queue-2026-03-02-next-batches-tracker.csv'
json_ids=set(); csv_ids=set()
with jsonl.open(encoding='utf-8') as f:
    for line in f:
        line=line.strip()
        if not line: continue
        try:j=json.loads(line)
        except: continue
        lid=j.get('lead_id')
        if lid: json_ids.add(lid)
with csvf.open(encoding='utf-8-sig',newline='') as f:
    r=csv.DictReader(f)
    for row in r:
        lid=row.get('lead_id')
        if lid: csv_ids.add(lid)
missing_json=[i for i in lead_ids if i not in json_ids]
missing_csv=[i for i in lead_ids if i not in csv_ids]

print('SITE_RESULTS')
for s,l in site_results:
    print(s,'OK' if not l else 'ISSUES:'+'|'.join(l))
print('EMAIL_IDS',','.join(lead_ids))
print('EMAIL_ISSUES', 'NONE' if not email_issues else '|'.join(email_issues))
print('MISSING_JSON', 'NONE' if not missing_json else ','.join(missing_json))
print('MISSING_CSV', 'NONE' if not missing_csv else ','.join(missing_csv))