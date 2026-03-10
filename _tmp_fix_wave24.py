import pathlib,re
root=pathlib.Path(r"C:/Users/chead/.openclaw/workspace-john/sites/premium-v3-wave24")
files=list(root.glob('*/index.html'))
for p in files:
    t=p.read_text(encoding='utf-8',errors='ignore')
    orig=t
    # Add aria-labels to form fields by id/name
    repls=[
      (r"(<input\b[^>]*\bid=['\"]name['\"][^>]*)(/?>)", r"\1 aria-label='Full Name'\2"),
      (r"(<input\b[^>]*\bid=['\"]phone['\"][^>]*)(/?>)", r"\1 aria-label='Phone Number'\2"),
      (r"(<input\b[^>]*\bid=['\"]qname['\"][^>]*)(/?>)", r"\1 aria-label='Full Name'\2"),
      (r"(<input\b[^>]*\bid=['\"]qphone['\"][^>]*)(/?>)", r"\1 aria-label='Phone Number'\2"),
      (r"(<textarea\b[^>]*\bid=['\"]qdetails['\"][^>]*)(>)", r"\1 aria-label='Project details'\2"),
    ]
    for pat,repl in repls:
        t=re.sub(pat, lambda m: m.group(0) if 'aria-label' in m.group(1).lower() else re.sub(pat,repl,m.group(0),count=1), t, flags=re.I)

    # replace placeholder .example mailto blocks with non-placeholder text
    t=re.sub(r"\|\s*<a href=['\"]mailto:[^'\"]*\.example['\"][^>]*>[^<]*</a>", "| <span>Email available after callback request</span>", t, flags=re.I)

    if t!=orig:
        p.write_text(t,encoding='utf-8')
        print('updated',p)
    else:
        print('no change',p)
