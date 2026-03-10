import glob,re
for f in glob.glob('sites/premium-v3-wave9/*/index.html'):
    t=open(f,encoding='utf-8').read()
    m=re.search(r"Contact:\s*<a href='(tel:[0-9]+)' aria-label='Call \(([^)]+)\) ([0-9-]+)'",t)
    if not m:
        # fallback parse contact link text
        m2=re.search(r"Contact:\s*<a href='(tel:[0-9]+)'[^>]*>\(([^)]+)\) ([0-9-]+)</a>",t)
        if not m2:
            print('SKIP no phone',f)
            continue
        tel,area,rest=m2.group(1),m2.group(2),m2.group(3)
    else:
        tel,area,rest=m.group(1),m.group(2),m.group(3)
    call_text=f"Call ({area}) {rest}"
    repl=f"<a class='btn sec' href='{tel}' aria-label='{call_text}'>{call_text}</a>"
    t2=t.replace("<a class='btn sec' href='' aria-label=''></a>",repl)
    # if original still exists and not broken
    t2=re.sub(r"<a class='btn sec' href='tel:[0-9]+'>(Call \([0-9]{3}\) [0-9-]+)</a>",lambda m: f"<a class='btn sec' href='{tel}' aria-label='{m.group(1)}'>{m.group(1)}</a>",t2)
    if t2!=t:
        open(f,'w',encoding='utf-8',newline='').write(t2)
        print('FIXED',f)
