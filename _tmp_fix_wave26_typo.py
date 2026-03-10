from pathlib import Path
root=Path(r'C:/Users/chead/.openclaw/workspace-john')
files=[
 root/'sites/premium-v3-wave26/san-diego-pro-hadyman-services-san-diego-ca/index.html',
 root/'email-templates/next-queued-email-assets-2026-03-02-batch29.md',
]
for f in files:
    t=f.read_text(encoding='utf-8')
    t2=t.replace('Hadyman','Handyman').replace('hadyman','handyman')
    if t2!=t:
        f.write_text(t2,encoding='utf-8')
        print('updated',f)
    else:
        print('nochange',f)
