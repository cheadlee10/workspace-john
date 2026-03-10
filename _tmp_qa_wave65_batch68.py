import re,glob,os,json

wave_base='sites/premium-v3-wave65'
email_file='email-templates/next-queued-email-assets-2026-03-03-batch68.md'

site_files=glob.glob(wave_base+'/*/index.html')
site_summary={}
for f in site_files:
    t=open(f,encoding='utf-8').read()
    name=os.path.basename(os.path.dirname(f))
    issues=[]

    if re.search(r'\{\{[^}]+\}\}|\bTODO\b|\bTBD\b|lorem ipsum|example\.com',t,re.I):
        issues.append('placeholder_or_token')

    forms=re.findall(r'<form\b[^>]*>',t,re.I)
    if len(forms)!=2:
        issues.append(f'form_count_{len(forms)}')
    for i,m in enumerate(forms,1):
        if "action='/contact'" not in m and 'action="/contact"' not in m:
            issues.append(f'form{i}_bad_action')
        if "method='post'" not in m.lower() and 'method="post"' not in m.lower():
            issues.append(f'form{i}_bad_method')

    form_blocks=re.findall(r'(<form\b.*?</form>)',t,re.I|re.S)
    for i,b in enumerate(form_blocks,1):
        if not re.search(r'name=["\']business["\']',b,re.I):
            issues.append(f'form{i}_missing_business')
        if not re.search(r'name=["\']source["\']',b,re.I):
            issues.append(f'form{i}_missing_source')

    controls=re.findall(r'<(input|textarea|select)\b([^>]*)>',t,re.I)
    fors=set(re.findall(r'<label[^>]*\sfor=["\']([^"\']+)',t,re.I))
    for tag,attrs in controls:
        if re.search(r'type=["\'](hidden|submit|button|reset)["\']',attrs,re.I):
            continue
        m=re.search(r'\sid=["\']([^"\']+)',attrs,re.I)
        if not m or m.group(1) not in fors:
            issues.append('unlabeled_form_control')
            break

    if re.search(r'\b(number\s*1|best in|guarantee|guaranteed|double your|results? in \d+ days|#1|no\.1)\b',t,re.I):
        issues.append('noncompliant_claim_keyword')

    if re.search(r'555[-\s\)]|123[-\s]456[-\s]7890|000[-\s]?\d{3}[-\s]?\d{4}',t):
        issues.append('fabricated_phone_pattern')

    site_summary[name]=issues

# Email checks
et=open(email_file,encoding='utf-8').read()
chunks=re.split(r'\n---\n',et)
email_bodies=[c for c in chunks if '**Email body**' in c]
email_issues=[]
for idx,c in enumerate(email_bodies,1):
    body=c.split('**Email body**',1)[1]
    if '{{live_url}}' not in body:
        email_issues.append(f'email{idx}_missing_live_url')
    if '{{screenshot_url}}' not in body:
        email_issues.append(f'email{idx}_missing_screenshot_url')

# ascii punctuation check
bad_chars=[ch for ch in et if ord(ch)>127]
if bad_chars:
    email_issues.append('non_ascii_chars_present')

if re.search(r'\b(number\s*1|#1|best in|guarantee|guaranteed|double your|results? in \d+ days|top-ranked|no\.1)\b',et,re.I):
    email_issues.append('noncompliant_claim_keyword')

print(json.dumps({
    'wave':'65',
    'site_count':len(site_files),
    'site_summary':site_summary,
    'email_count':len(email_bodies),
    'email_issues':email_issues
},indent=2))
