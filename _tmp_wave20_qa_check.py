import re,glob,os

files=glob.glob('sites/premium-v3-wave20/*/index.html')
ph=re.compile(r'TODO|TBD|Lorem|\{\{.+?\}\}|\[Company|\[Your|placeholder',re.I)
for f in files:
    s=open(f,encoding='utf-8').read()
    ids=set(re.findall(r"\bid=['\"]([^'\"]+)['\"]",s))
    fors=re.findall(r"<label[^>]*\bfor=['\"]([^'\"]+)['\"]",s,re.I)
    missing=[x for x in fors if x not in ids]
    tels=re.findall(r"href=['\"]tel:([^'\"]+)['\"]",s,re.I)
    bad_tel=[t for t in tels if not re.match(r'^\+?\d[\d\-() ]+$',t)]
    print('---',os.path.basename(os.path.dirname(f)))
    print('labels',len(fors),'missing_for',len(missing),'tel_links',len(tels),'bad_tel',len(bad_tel),'placeholders',len(ph.findall(s)))
    # rough a11y: check if form controls have id
    controls=re.findall(r'<(input|textarea|select)\b([^>]*)>',s,re.I)
    no_id=0
    for tag,attrs in controls:
        if re.search(r"type=['\"]hidden['\"]",attrs,re.I):
            continue
        if not re.search(r"\bid=['\"]",attrs,re.I):
            no_id += 1
    print('controls_no_id',no_id)
