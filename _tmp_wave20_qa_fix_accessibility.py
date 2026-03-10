import glob,re

files=glob.glob('sites/premium-v3-wave20/*/index.html')
for f in files:
    s=open(f,encoding='utf-8').read()
    original=s

    # Add aria-labels to phone/mail links when missing
    s=re.sub(r"<a class='btn pri' href='tel:([^']+)'>", r"<a class='btn pri' href='tel:\1' aria-label='Call now'>", s)
    s=re.sub(r"<a href='tel:([^']+)'>(.*?)</a>", r"<a href='tel:\1' aria-label='Call this business'>\2</a>", s)
    s=re.sub(r"<a href='mailto:([^']+)'>(.*?)</a>", r"<a href='mailto:\1' aria-label='Email this business'>\2</a>", s)

    # Add aria-labels to submit buttons when missing
    s=s.replace("<button class='btn pri' type='submit'>Request Callback</button>", "<button class='btn pri' type='submit' aria-label='Request callback'>Request Callback</button>")
    s=s.replace("<button class='btn pri' type='submit'>Send My Quote Request</button>", "<button class='btn pri' type='submit' aria-label='Send quote request'>Send My Quote Request</button>")

    if s!=original:
        open(f,'w',encoding='utf-8').write(s)
        print('updated',f)
    else:
        print('nochange',f)
