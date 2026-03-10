import json,re,csv
from pathlib import Path
root=Path('.')
wave=83
batch=86
wave_dir=root/'sites'/f'premium-v3-wave{wave}'
site_results=[]
for d in sorted([p for p in wave_dir.iterdir() if p.is_dir()]):
    f=d/'index.html'
    t=f.read_text(encoding='utf-8',errors='ignore') if f.exists() else ''
    placeholders=bool(re.search(r'\{\{[^}]+\}\}',t))
    forms=re.findall(r'<form\b[\s\S]*?</form>',t,re.I)
    form_count=len(forms)
    post_contact_all=True
    hidden_all=True
    for frm in forms[:2]:
        if not re.search(r'action="/contact"',frm,re.I) or not re.search(r'method="post"',frm,re.I):
            post_contact_all=False
        if not re.search(r'name="business"',frm,re.I) or not re.search(r'name="source"',frm,re.I):
            hidden_all=False
    ids=set(re.findall(r'<input[^>]*\sid="([^"]+)"',t,re.I)+re.findall(r'<textarea[^>]*\sid="([^"]+)"',t,re.I)+re.findall(r'<select[^>]*\sid="([^"]+)"',t,re.I))
    fors=re.findall(r'<label[^>]*\sfor="([^"]+)"',t,re.I)
    label_map=all(x in ids for x in fors) if fors else False
    fake555=bool(re.search(r'555[-\s]?\d{4}',t))
    prohibited=bool(re.search(r'\b(#1|number\s*1|guarantee(?:d)?|best\s+in\s+\w+|double your|results? guaranteed)\b',t,re.I))
    ok=(not placeholders and form_count==2 and post_contact_all and hidden_all and label_map and not fake555 and not prohibited)
    site_results.append((d.name,ok,{'placeholders':placeholders,'form_count':form_count,'post_contact_all':post_contact_all,'hidden_all':hidden_all,'label_map':label_map,'fake555':fake555,'prohibited':prohibited}))

email_file=root/'email-templates'/f'next-queued-email-assets-2026-03-03-batch{batch}.md'
et=email_file.read_text(encoding='utf-8',errors='ignore')
parts=re.split(r'(?m)^##\s+Lead\s+',et)
leads=[]
for part in parts[1:]:
    lid=part.splitlines()[0].strip()
    body='\n'.join(part.splitlines()[1:])
    leads.append((lid,body))

email_results=[]
for lid,body in leads:
    has_live='{{live_url}}' in body
    has_shot='{{screenshot_url}}' in body
    ascii_safe=all(ord(c)<128 for c in body)
    prohibited=bool(re.search(r'\b(#1|number\s*1|guarantee(?:d)?|best\s+in\s+\w+|double your|results? guaranteed)\b',body,re.I))
    ok=has_live and has_shot and ascii_safe and not prohibited
    email_results.append((lid,ok,{'has_live':has_live,'has_shot':has_shot,'ascii_safe':ascii_safe,'prohibited':prohibited}))

jsonl=root/'email-templates'/'send-queue-2026-03-02-next-batches.jsonl'
csvf=root/'email-templates'/'send-queue-2026-03-02-next-batches-tracker.csv'
ids=[lid for lid,_ in leads]
json_ids=set()
for line in jsonl.read_text(encoding='utf-8').splitlines():
    if not line.strip(): continue
    o=json.loads(line)
    json_ids.add(o.get('lead_id'))
missing_json=[i for i in ids if i not in json_ids]
with csvf.open(encoding='utf-8',newline='') as f:
    r=list(csv.DictReader(f))
    csv_ids={x.get('lead_id') for x in r}
missing_csv=[i for i in ids if i not in csv_ids]
print('SITES',len(site_results),sum(1 for _,ok,_ in site_results if ok))
for n,ok,d in site_results:
    if not ok: print('SITE_FAIL',n,d)
print('EMAIL',len(email_results),sum(1 for _,ok,_ in email_results if ok))
for lid,ok,d in email_results:
    if not ok: print('EMAIL_FAIL',lid,d)
print('LEAD_IDS',ids)
print('MISSING_JSON',len(missing_json),missing_json)
print('MISSING_CSV',len(missing_csv),missing_csv)
