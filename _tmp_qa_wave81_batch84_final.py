import re, json, pathlib
from datetime import datetime

root=pathlib.Path(r'C:/Users/chead/.openclaw/workspace-john')
wave_dir=root/'sites'/'premium-v3-wave81'
email_file=root/'email-templates'/'next-queued-email-assets-2026-03-03-batch84.md'
jsonl_path=root/'email-templates'/'send-queue-2026-03-02-next-batches.jsonl'
csv_path=root/'email-templates'/'send-queue-2026-03-02-next-batches-tracker.csv'

report={"site":{},"email":{},"queue":{}}

def visible_text(html:str)->str:
    html=re.sub(r'<style\b.*?</style>',' ',html,flags=re.I|re.S)
    html=re.sub(r'<script\b.*?</script>',' ',html,flags=re.I|re.S)
    html=re.sub(r'<[^>]+>',' ',html)
    return re.sub(r'\s+',' ',html).strip()

site_fail=[]
site_pass=0
html_files=sorted(wave_dir.glob('*/index.html'))
for fp in html_files:
    t=fp.read_text(encoding='utf-8')
    v=visible_text(t)
    checks=[]
    checks.append(('no_template_placeholders', re.search(r'\{\{\s*[^}]+\s*\}\}', t) is None))
    checks.append(('two_forms', len(re.findall(r'<form\b', t, flags=re.I))==2))
    forms=re.findall(r'<form[^>]*>', t, flags=re.I)
    checks.append(('form_post_contact', len(forms)==2 and all('action="/contact"' in f and 'method="post"' in f.lower() for f in forms)))
    checks.append(('hidden_business_2x', len(re.findall(r'name="business"', t))==2))
    checks.append(('hidden_source_2x', len(re.findall(r'name="source"', t))==2))
    checks.append(('no_fake_555', re.search(r'\b555[- .]?\d{4}\b', v) is None))
    ids=set(re.findall(r'id="([^"]+)"', t))
    fors=re.findall(r'<label[^>]*for="([^"]+)"', t)
    checks.append(('labels_map_inputs', len(fors)>0 and all(x in ids for x in fors)))
    claims=re.search(r'\bguarantee(?:d)?\b|\bnumber\s*one\b|\branked\s*#?1\b|\bdouble your\b|\bincrease by\s+\d+%\b|\b#1\b', v, flags=re.I)
    checks.append(('claims_compliance', claims is None))

    bad=[k for k,ok in checks if not ok]
    if bad:
        site_fail.append((fp.parent.name,bad))
    else:
        site_pass+=1

report['site']={'total':len(html_files),'passed':site_pass,'failed':site_fail}

text=email_file.read_text(encoding='utf-8')
sections=re.findall(r'##\s+\d+\)\s+(.+?)\s+\(`(wave6-\d+)`\).*?(?=\n---\n|\Z)', text, flags=re.S)
lead_ids=[lead for _,lead in sections]
email_fail=[]
non_ascii=sorted(set(ch for ch in text if ord(ch)>127))
if non_ascii:
    email_fail.append('non_ascii_present')
for chunk in re.findall(r'##\s+\d+\).*?(?=\n---\n|\Z)', text, flags=re.S):
    m=re.search(r'`(wave6-\d+)`', chunk)
    lid=m.group(1) if m else 'unknown'
    if '{{live_url}}' not in chunk or '{{screenshot_url}}' not in chunk:
        email_fail.append(f'{lid}:missing_required_placeholders')
    if re.search(r'\bguarantee(?:d)?\b|\bnumber\s*one\b|\branked\s*#?1\b|\bdouble your\b|\bincrease by\s+\d+%\b|\b#1\b', chunk, flags=re.I):
        email_fail.append(f'{lid}:claims_noncompliant')
report['email']={'total_sections':len(re.findall(r'##\s+\d+\)', text)),'lead_ids':lead_ids,'failures':email_fail}

json_lines=jsonl_path.read_text(encoding='utf-8').splitlines()
csv_text=csv_path.read_text(encoding='utf-8')
missing_json=[lid for lid in lead_ids if not any(f'"lead_id":"{lid}"' in ln for ln in json_lines)]
missing_csv=[lid for lid in lead_ids if f'"{lid}"' not in csv_text and f',{lid},' not in csv_text]
report['queue']={'missing_json':missing_json,'missing_csv':missing_csv}

print(json.dumps(report,indent=2))
