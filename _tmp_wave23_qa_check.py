import re,glob,os,json
base=r"C:\\Users\\chead\\.openclaw\\workspace-john\\sites\\premium-v3-wave23"
issues={}
for fp in glob.glob(base+'/*/index.html'):
    txt=open(fp,encoding='utf-8').read()
    slug=os.path.basename(os.path.dirname(fp))
    arr=[]
    ph=re.findall(r'\{\{[^}]+\}\}|\[\s*(?:TODO|TBD|PLACEHOLDER)[^\]]*\]|TODO|TBD',txt,re.I)
    if ph: arr.append(f'placeholders:{len(ph)}')
    ids=set(re.findall(r'<input[^>]*\sid="([^"]+)"',txt,re.I))|set(re.findall(r'<textarea[^>]*\sid="([^"]+)"',txt,re.I))|set(re.findall(r'<select[^>]*\sid="([^"]+)"',txt,re.I))
    fors=set(re.findall(r'<label[^>]*\sfor="([^"]+)"',txt,re.I))
    missing=[i for i in ids if i not in fors]
    hidden_ids=set(re.findall(r'<input[^>]*type="hidden"[^>]*id="([^"]+)"',txt,re.I))
    missing=[i for i in missing if i not in hidden_ids]
    if missing: arr.append('missing_label_for:'+','.join(sorted(missing)[:20]))
    phones=re.findall(r'href="tel:([^"]+)"',txt,re.I)
    if not phones: arr.append('no_tel_links')
    bad=[p for p in phones if not re.match(r'\+?\d[\d\-\s\(\)]*$',p)]
    if bad: arr.append('bad_tel:'+','.join(bad))
    img_no_alt=re.findall(r'<img\b(?![^>]*\balt=)[^>]*>',txt,re.I)
    if img_no_alt: arr.append(f'img_missing_alt:{len(img_no_alt)}')
    if arr: issues[slug]=arr
print(json.dumps(issues,indent=2))
