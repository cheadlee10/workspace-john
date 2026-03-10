import re
import pathlib

base = pathlib.Path('sites/premium-v3-wave16')
for s in sorted([p for p in base.iterdir() if p.is_dir()]):
    h = (s / 'index.html').read_text(encoding='utf-8')
    title = re.search(r'<title>(.*?)</title>', h, re.I | re.S)
    h1 = re.search(r'<h1[^>]*>(.*?)</h1>', h, re.I | re.S)
    phones = re.findall(r'tel:([^"\']+)', h)
    mails = re.findall(r'mailto:([^"\']+)', h)
    placeholders = bool(re.search(r'lorem|ipsum|TODO|TBD|your business|insert', h, re.I))
    forms = len(re.findall(r'<form\b', h, re.I))
    contact_posts = len(re.findall(r'action="/contact"', h, re.I))
    print(f'\n{s.name}')
    print(' title:', title.group(1).strip() if title else 'MISSING')
    raw_h1 = h1.group(1) if h1 else ''
    clean_h1 = re.sub(r'<.*?>', '', raw_h1).strip() if raw_h1 else 'MISSING'
    print(' h1:', clean_h1)
    print(' phones', phones[:3], 'mails', mails[:2], 'forms', forms, '/contact', contact_posts, 'placeholder', placeholders)
