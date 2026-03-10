import re, pathlib
text = pathlib.Path('leads.jsonl').read_text(encoding='utf-8')
ids = set(re.findall(r'"id":"([^"]+)"', text))
urls = set(re.findall(r'"url":"([^"]+)"', text))
print('ids', len(ids), 'urls', len(urls))
waves = sorted([i for i in ids if i.startswith('wave')])
print('last waves', waves[-20:])
