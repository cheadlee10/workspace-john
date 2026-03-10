import re, pathlib
root=pathlib.Path('sites/premium-v3-wave25')
count=0
for f in root.rglob('index.html'):
    t=f.read_text(encoding='utf-8')
    new=re.sub(r"\|\s*<a href='mailto:[^']+\.example'>[^<]+</a>","| <span>Email not publicly listed</span>",t)
    if new!=t:
        f.write_text(new,encoding='utf-8')
        count+=1
        print('patched',f)
print('total patched',count)
