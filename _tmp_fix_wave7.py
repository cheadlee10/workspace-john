import pathlib,re
base=pathlib.Path('sites/premium-v3-wave7')
for p in base.rglob('index.html'):
    s=p.read_text(encoding='utf-8')
    orig=s
    s=re.sub(r"<p>Contact: \((\d{3})\) (\d{3})-(\d{4})</p>", lambda m: f"<p>Contact: <a href='tel:{m.group(1)}{m.group(2)}{m.group(3)}'>({m.group(1)}) {m.group(2)}-{m.group(3)}</a></p>", s)
    if 'lorena-house-cleaner-san-diego' in str(p):
        s=s.replace('Solicitar Cotizaci\ufffdn','Solicitar Cotizacion').replace('Espa\ufffdol','Espanol')
    if s!=orig:
        p.write_text(s,encoding='utf-8')
        print('updated',p)
