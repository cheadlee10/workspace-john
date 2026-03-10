import glob
files=glob.glob('sites/premium-v3-wave86/*/index.html')
print('pages',len(files))
for f in files:
    s=open(f,encoding='utf-8').read()
    slug=f.replace('\\','/').split('/')[-2]
    print(slug, 'contact_forms', s.count('action="/contact"'), 'quick', 'quick_callback' in s, 'detailed', 'detailed_quote' in s, 'cta', 'href="#quote"' in s)
