import re,glob,os
files=glob.glob('sites/premium-v3-wave20/*/index.html')
ph=re.compile(r'TODO|TBD|Lorem|\{\{.+?\}\}|\[Company|\[Your|placeholder',re.I)
for f in files:
    s=open(f,encoding='utf-8').read()
    ids=set(re.findall(r"\bid=['\"]([^'\"]+)['\"]",s))
    fors=re.findall(r"<label[^>]*\bfor=['\"]([^'\"]+)['\"]",s,re.I)
    missing=[x for x in fors if x not in ids]
    tels=re.findall(r"href=['\"]tel:([^'\"]+)['\"]",s,re.I)
    mailtos=re.findall(r"href=['\"]mailto:([^'\"]+)['\"]",s,re.I)
    aria_links=len(re.findall(r"<a[^>]*aria-label=['\"][^'\"]+['\"]",s,re.I))
    aria_buttons=len(re.findall(r"<button[^>]*aria-label=['\"][^'\"]+['\"]",s,re.I))
    print('---',os.path.basename(os.path.dirname(f)))
    print('missing_for',len(missing),'tel_links',len(tels),'mailto_links',len(mailtos),'placeholders',len(ph.findall(s)),'aria_links',aria_links,'aria_buttons',aria_buttons)
