import glob,re
files=glob.glob('sites/premium-v3-wave30/*/index.html')
email='email-templates/next-queued-email-assets-2026-03-03-batch33.md'
patterns=[r'\{\{',r'\}\}',r'\[Your',r'\[Business',r'\[Phone',r'\[Email',r'TODO',r'TBD',r'lorem',r'placeholder']
print('SITE FILES',len(files))
for f in files:
    t=open(f,encoding='utf-8').read()
    issues=[p for p in patterns if re.search(p,t,re.I)]
    tel=len(re.findall(r'href="tel:[^"]+"',t,re.I))
    inputs=len(re.findall(r'<input\b|<textarea\b|<select\b',t,re.I))
    labels=len(re.findall(r'<label\b',t,re.I))
    arias=len(re.findall(r'aria-label=',t,re.I))
    print('\n'+f)
    print('  placeholder_hits:', issues if issues else 'none')
    print(f'  tel_links:{tel} form_fields:{inputs} labels:{labels} aria_labels:{arias}')

te=open(email,encoding='utf-8').read()
print('\nEMAIL',email)
issues=[p for p in patterns if re.search(p,te,re.I)]
print('  placeholder_hits:', issues if issues else 'none')
print('  tel_refs:',len(re.findall(r'tel:[^\s\)\]>]+',te,re.I)))
