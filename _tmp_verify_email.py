import re, pathlib
for f in ['email-templates/next-queued-email-assets-2026-03-02-batch9.md','email-templates/next-queued-email-assets-2026-03-02-batch10.md']:
    s=pathlib.Path(f).read_text(encoding='utf-8')
    bodies=s.split('**Email body**')[1:]
    wb=sum(1 for b in bodies if 'we built your website' in b.lower())
    lu=sum(1 for b in bodies if '{{live_url}}' in b)
    su=sum(1 for b in bodies if '{{screenshot_url}}' in b)
    print(f, 'bodies',len(bodies),'webuilt',wb,'live',lu,'shot',su)
