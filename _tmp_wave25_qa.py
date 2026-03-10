import re, pathlib
root=pathlib.Path('sites/premium-v3-wave25')
files=list(root.rglob('*.html'))
pat=re.compile(r'TODO|TBD|lorem|ipsum|\{\{|\}\}|example\.com|REPLACE_ME|placeholder',re.I)
print('PLACEHOLDER HITS')
for f in files:
    t=f.read_text(encoding='utf-8')
    for i,l in enumerate(t.splitlines(),1):
        if pat.search(l):
            print(f'{f}:{i}:{l.strip()[:180]}')
print('\nTEL/MAILTO/ANCHOR HREFS')
for f in files:
    t=f.read_text(encoding='utf-8')
    for i,l in enumerate(t.splitlines(),1):
        if 'href="tel:' in l or 'href="mailto:' in l or 'href="#"' in l:
            print(f'{f}:{i}:{l.strip()[:180]}')
print('\nLABEL/INPUT COUNTS')
for f in files:
    t=f.read_text(encoding='utf-8')
    labels=len(re.findall(r'<label\b',t,re.I))
    inputs=len(re.findall(r'<input\b|<textarea\b|<select\b',t,re.I))
    print(f'{f}: labels={labels} controls={inputs}')
