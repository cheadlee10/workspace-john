import re, pathlib, json
root=pathlib.Path(r'C:/Users/chead/.openclaw/workspace-john')
wave=root/'sites'/'premium-v3-wave54'
email=root/'email-templates'/'next-queued-email-assets-2026-03-03-batch57.md'
issues=[]
site_results=[]
for p in sorted(wave.glob('*/index.html')):
    t=p.read_text(encoding='utf-8')
    r={'file':str(p.relative_to(root)),'placeholder':True,'forms':True,'hidden':True,'labels':True,'claims':True,'fake_phone':True}
    if re.search(r'\{\{[^}]+\}\}|TODO|TBD|lorem ipsum|example\.com',t,re.I):
        r['placeholder']=False
        issues.append((p,'placeholder artifact'))
    forms=list(re.finditer(r'<form\b[^>]*>',t,re.I))
    if len(forms)!=2:
        r['forms']=False; issues.append((p,f'expected 2 forms got {len(forms)}'))
    for m in forms:
        tag=m.group(0)
        if not re.search(r'method\s*=\s*["\']post["\']',tag,re.I) or not re.search(r'action\s*=\s*["\']/contact["\']',tag,re.I):
            r['forms']=False; issues.append((p,'form method/action noncompliant'))
    blocks=re.findall(r'(<form\b[^>]*>.*?</form>)',t,re.I|re.S)
    for i,b in enumerate(blocks,1):
        if not re.search(r'type\s*=\s*["\']hidden["\'][^>]*name\s*=\s*["\']business["\']',b,re.I):
            r['hidden']=False; issues.append((p,f'form {i} missing hidden business'))
        if not re.search(r'type\s*=\s*["\']hidden["\'][^>]*name\s*=\s*["\']source["\']',b,re.I):
            r['hidden']=False; issues.append((p,f'form {i} missing hidden source'))
    ctrls=re.findall(r'<(input|textarea|select)\b([^>]*)>',t,re.I)
    ids=set(re.findall(r'<label\b[^>]*for\s*=\s*["\']([^"\']+)["\']',t,re.I))
    for tag,attrs in ctrls:
        if re.search(r'type\s*=\s*["\'](hidden|submit|button)["\']',attrs,re.I):
            continue
        idm=re.search(r'\bid\s*=\s*["\']([^"\']+)["\']',attrs,re.I)
        aria=bool(re.search(r'aria-label\s*=\s*["\'][^"\']+["\']',attrs,re.I))
        if not ((idm and idm.group(1) in ids) or aria):
            r['labels']=False; issues.append((p,f'unlabeled control: <{tag} {attrs[:60]}>'))
            break
    if re.search(r'\b(guarantee(?:d)?|#1|number\s*1|top[- ]?rated|best in|no\.1)\b',t,re.I):
        r['claims']=False; issues.append((p,'noncompliant claim language'))
    if re.search(r'\b(?:000[- ]?000[- ]?0000|555[- ]?\d{3}[- ]?\d{4}|123[- ]?456[- ]?7890)\b',t):
        r['fake_phone']=False; issues.append((p,'placeholder phone'))
    site_results.append(r)

et=email.read_text(encoding='utf-8')
bodies=re.findall(r'\*\*Email body\*\*\n(.*?)(?=\n---\n|\Z)',et,re.S)
email_result={'count':len(bodies),'placeholders':True,'ascii':True,'claims':True}
for i,b in enumerate(bodies,1):
    for ph in ('{{live_url}}','{{screenshot_url}}'):
        if ph not in b:
            email_result['placeholders']=False; issues.append((email,f'email {i} missing {ph}'))
if any(ord(ch)>127 for ch in et):
    email_result['ascii']=False; issues.append((email,'contains non-ascii chars'))
if re.search(r'\b(guarantee(?:d)?|#1|number\s*1|top[- ]?rated|no\.1)\b',et,re.I):
    email_result['claims']=False; issues.append((email,'noncompliant claim language'))

print(json.dumps({'site_files':len(site_results),'site_results':site_results,'email_result':email_result,'issues':[f"{str(p)}: {msg}" for p,msg in issues]},indent=2))