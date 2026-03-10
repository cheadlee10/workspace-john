import re, pathlib
for p in pathlib.Path('sites/premium-v3-wave7').rglob('index.html'):
    s=p.read_text(encoding='utf-8')
    ids=set(re.findall(r"<label for='([^']+)'",s))
    issues=[]
    for tag in re.findall(r"<input[^>]*>",s):
        if "type='hidden'" in tag: continue
        m=re.search(r"id='([^']+)'",tag)
        if not m: issues.append('input_without_id'); continue
        if m.group(1) not in ids: issues.append('missing_label_for_'+m.group(1))
        if "type='" not in tag: issues.append('missing_type_'+m.group(1))
    for tag in re.findall(r"<textarea[^>]*>",s):
        m=re.search(r"id='([^']+)'",tag)
        if not m or m.group(1) not in ids: issues.append('textarea_label')
    tel_links=len(re.findall(r"href='tel:[0-9]+'",s))
    print(p.name, 'issues='+(','.join(issues) if issues else 'none'), 'tel_links='+str(tel_links))
