import re,glob,os,json
base=r"C:\\Users\\chead\\.openclaw\\workspace-john\\sites\\premium-v3-wave22"
files=glob.glob(base+'/*/index.html')
issues={}
ph_pat=re.compile(r'(?:\{\{.*?\}\}|\[.*?\]|TODO|TBD|lorem ipsum|INSERT|REPLACE_ME)',re.I)
for f in files:
    t=open(f,encoding='utf-8').read()
    rel=os.path.relpath(f,base)
    i=[]
    ph=ph_pat.findall(t)
    if ph: i.append(('placeholders',sorted(set(ph))[:8]))
    tels=re.findall(r'href="tel:([^"]+)"',t,re.I)
    if not tels: i.append(('missing_tel_link',None))
    else:
        bad=[x for x in tels if re.search(r'[A-Za-z]',x)]
        if bad:i.append(('bad_tel',bad))
    if 'aria-label=""' in t or "aria-label=''" in t: i.append(('empty_aria_label',None))
    missing_alt=len(re.findall(r'<img(?![^>]*\balt=)[^>]*>',t,re.I))
    if missing_alt:i.append(('img_missing_alt',missing_alt))
    gen_alt=len(re.findall(r'alt="(?:image|photo|icon)"',t,re.I))
    if gen_alt:i.append(('generic_alt',gen_alt))
    for m in re.finditer(r'<a[^>]*href="tel:[^"]+"[^>]*>(.*?)</a>',t,re.I|re.S):
        txt=re.sub('<.*?>','',m.group(1)).strip()
        if not txt:
            i.append(('empty_tel_anchor_text',None));break
    if i: issues[rel]=i
print('files',len(files))
print(json.dumps(issues,indent=2))