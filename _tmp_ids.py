import re, pathlib
text = pathlib.Path('leads.jsonl').read_text(encoding='utf-8')
ids = re.findall(r'"id"\s*:\s*"([^"]+)"', text)
urls = set(re.findall(r'"url"\s*:\s*"([^"]+)"', text))
print('ids', len(ids), 'unique', len(set(ids)))
print('urls', len(urls))
print('wave4_tail', sorted([i for i in set(ids) if i.startswith('wave4-')])[-12:])
