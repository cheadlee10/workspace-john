import re
from pathlib import Path

t = Path('leads.jsonl').read_text(encoding='utf-8')
ids = set(re.findall(r'"id"\s*:\s*"([^"]+)"', t))
urls = set(re.findall(r'"url"\s*:\s*"([^"]+)"', t))
print('id_count', len(ids))
wave4 = sorted([i for i in ids if i.startswith('wave4-')])
print('wave4_tail', wave4[-30:])
print('url_count', len(urls))
