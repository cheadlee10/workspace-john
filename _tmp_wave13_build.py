import textwrap
from pathlib import Path

root = Path(r'C:/Users/chead/.openclaw/workspace-john/sites/premium-v3-wave13')
root.mkdir(parents=True, exist_ok=True)

leads = [
    dict(id='gpass-us-293', est=1150, slug='texas-certified-roofing-houston-tx', name='Texas Certified Roofing', phone='17137818333', display='(713) 781-8333', area='Houston, TX', title='Houston Roofing Estimates with Faster Response and Cleaner Project Scope', desc='Premium roofing demo designed to convert emergency repair searches and replacement shoppers into booked estimate calls.', chips=['Free Estimate CTA','Residential + Commercial Roofing','Storm Damage Response'], services=['Emergency Leak Repair and Temporary Dry-In','Full Roof Replacement and Material Upgrades','Storm and Hail Damage Assessment','Maintenance Plans for Long-Term Roof Performance']),
    dict(id='gpass-us-285', est=1150, slug='langer-roofing-sheet-metal-milwaukee-wi', name='Langer Roofing & Sheet Metal', phone='14144765800', display='(414) 476-5800', area='Milwaukee, WI', title='Milwaukee Roofing and Sheet Metal Projects Built for Durability and Trust', desc='Premium lead-capture page focused on generating qualified calls and quote requests for repair and replacement work.', chips=['Roofing + Sheet Metal Expertise','High-Intent Quote Funnel','Local Milwaukee Coverage'], services=['Roof Leak Repair and Diagnostic Service','Asphalt, Metal, and Flat Roof Replacement','Custom Sheet Metal Flashing and Fabrication','Annual Roof Inspections and Preventive Maintenance']),
    dict(id='gpass-us-262', est=1150, slug='martin-tomlinson-roofing-dallas-tx', name='Martin-Tomlinson Roofing', phone='12143884671', display='(214) 388-4671', area='Dallas, TX', title='Dallas Roofing Services Designed to Win More Booked Inspections', desc='Premium conversion-focused demo that routes roof shoppers into fast callback scheduling and detailed quote capture.', chips=['Fast Callback Requests','Repair + Replacement Focus','Quote-Ready Homeowner Flow'], services=['Roof Repair for Active Leaks and Damage','Complete Roof Replacement Solutions','Storm Restoration and Insurance Scope Support','Roof Tune-Ups and Preventive Care Plans']),
    dict(id='gpass-us-294', est=1120, slug='moss-roofing-houston-houston-tx', name='Moss Roofing Houston', phone='18328408027', display='(832) 840-8027', area='Houston, TX', title='Houston Roofing Conversion Page for Higher-Quality Calls and Quote Submissions', desc='Premium demo landing page tuned for local roofing intent and immediate call-to-action engagement.', chips=['Houston Service Coverage','Emergency + Planned Projects','Clear Next-Step CTA'], services=['Leak Detection and Roof Repair','Roof Replacement and Re-Roofing','Storm Damage Repair Coordination','Maintenance Programs for Roof Longevity']),
    dict(id='gpass-us-288', est=1120, slug='walker-roofing-st-paul-minneapolis-mn', name='Walker Roofing', phone='16512510910', display='(651) 251-0910', area='St. Paul / Minneapolis, MN', title='Twin Cities Roofing Services That Convert Search Traffic into Booked Jobs', desc='Premium roof services page structured to convert homeowners into calls, callbacks, and project-ready quote requests.', chips=['Twin Cities Coverage','Inspection-to-Quote Flow','Repair and Full Replacement'], services=['Rapid Roof Repair and Leak Mitigation','Asphalt and Metal Roof Replacement','Storm and Wind Damage Restoration','Routine Inspections and Roof Health Plans']),
]

def esc(s: str) -> str:
    return s.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;')

tpl = """<!doctype html>
<html><head><meta charset='UTF-8'/><meta name='viewport' content='width=device-width,initial-scale=1'/>
<title>{name} | {area} Premium Service Demo</title><meta name='description' content='{desc}'/><link rel='canonical' href='https://preview.northstarsynergy.com/{slug}/'/>
<style>body{{font-family:Inter,system-ui;background:#0b1220;color:#dbeafe;margin:0}}.w{{max-width:1080px;margin:auto;padding:22px}}.card{{background:#111c33;border:1px solid #284067;border-radius:16px;padding:20px}}.hero{{display:grid;grid-template-columns:1.15fr .85fr;gap:14px}}.btn{{display:inline-block;padding:11px 14px;border-radius:10px;text-decoration:none;font-weight:700}}.pri{{background:#38bdf8;color:#082f49}}.sec{{border:1px solid #7dd3fc;color:#e0f2fe}}.chips span{{display:inline-block;border:1px solid #365782;border-radius:999px;padding:6px 10px;margin:4px 6px 0 0}}.grid{{display:grid;grid-template-columns:1fr 1fr;gap:12px}}input,textarea{{width:100%;padding:11px;border-radius:10px;border:1px solid #365782;background:#0b1220;color:#fff;margin:6px 0}}textarea{{min-height:100px}}label{{display:block;margin-top:8px}}ul{{margin:0;padding-left:20px;line-height:1.8}}small{{color:#93c5fd}}@media(max-width:900px){{.hero,.grid{{grid-template-columns:1fr}}}}</style></head>
<body><div class='w'>
  <div class='card' style='display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap'>
    <strong>{name}</strong>
    <div><a class='btn sec' href='tel:{phone}'>Call {display}</a> <a class='btn pri' href='#quote'>Get My Quote</a></div>
  </div>
  <div class='hero' style='margin-top:12px'>
    <section class='card'><p>{area}</p><h1>{title}</h1><p>{desc}</p><div class='chips'><span>{chip1}</span><span>{chip2}</span><span>{chip3}</span></div></section>
    <section class='card'><h2>Request a Quick Callback</h2><form action='/contact' method='post'>
      <input type='hidden' name='business' value='{slug}'/><input type='hidden' name='source' value='quick_callback'/>
      <label for='name'>Full Name</label><input id='name' name='name' type='text' required autocomplete='name'/>
      <label for='phone'>Phone Number</label><input id='phone' name='phone' type='tel' required autocomplete='tel'/>
      <button class='btn pri' type='submit'>Request Callback</button></form></section>
  </div>
  <div class='grid' style='margin-top:12px'>
    <section class='card'><h2>Core Services</h2><ul><li>{s1}</li><li>{s2}</li><li>{s3}</li><li>{s4}</li></ul></section>
    <section class='card' id='quote'><h2>Detailed Quote Request</h2><form action='/contact' method='post'>
      <input type='hidden' name='business' value='{slug}'/><input type='hidden' name='source' value='detailed_quote'/>
      <label for='qname'>Full Name</label><input id='qname' name='name' type='text' required autocomplete='name'/>
      <label for='qphone'>Phone Number</label><input id='qphone' name='phone' type='tel' required autocomplete='tel'/>
      <label for='qemail'>Email</label><input id='qemail' name='email' type='email' required autocomplete='email'/>
      <label for='qdetails'>Project details</label><textarea id='qdetails' name='details' required></textarea>
      <button class='btn pri' type='submit'>Send My Quote Request</button></form>
      <p>Contact: <a href='tel:{phone}' aria-label='Call {display}'>{display}</a> <small>Demo form posts to placeholder endpoint: /contact</small></p></section>
  </div>
</div></body></html>
"""

for l in leads:
    d = root / l['slug']
    d.mkdir(parents=True, exist_ok=True)
    safe = {k: esc(v) if isinstance(v, str) else v for k, v in l.items()}
    html = tpl.format(**safe, chip1=esc(l['chips'][0]), chip2=esc(l['chips'][1]), chip3=esc(l['chips'][2]), s1=esc(l['services'][0]), s2=esc(l['services'][1]), s3=esc(l['services'][2]), s4=esc(l['services'][3]))
    (d / 'index.html').write_text(html, encoding='utf-8')

notes = textwrap.dedent('''
# Premium V3 Wave 13 - Deployment Notes

Date: 2026-03-02
Wave Folder: sites/premium-v3-wave13

## Built Pages (highest-priority uncovered leads)
1. `texas-certified-roofing-houston-tx` (est. $1150, outreach ID: gpass-us-293, tier: P1)
2. `langer-roofing-sheet-metal-milwaukee-wi` (est. $1150, outreach ID: gpass-us-285, tier: P1)
3. `martin-tomlinson-roofing-dallas-tx` (est. $1150, outreach ID: gpass-us-262, tier: P2)
4. `moss-roofing-houston-houston-tx` (est. $1120, outreach ID: gpass-us-294, tier: P1)
5. `walker-roofing-st-paul-minneapolis-mn` (est. $1120, outreach ID: gpass-us-288, tier: P1)

## Selection Notes
- Selected from uncovered queue records with highest `estimated_value` among IDs not represented in prior premium-v3 wave folders.
- Prior wave leads were excluded to avoid duplicate demo coverage.

## Conversion Structure Included
- Hero with immediate dual CTA (`Call` + `Get My Quote`)
- Above-the-fold callback form for high-intent visitors
- Core services section (4 offer blocks)
- Detailed quote form with project detail capture
- Contact reinforcement with click-to-call in conversion section

## Form Endpoint Convention
- Current endpoint convention preserved: all forms post to `/contact`
- Hidden form metadata included on all forms:
  - `business` (site slug)
  - `source` (`quick_callback` / `detailed_quote`)

## Known Blockers / Follow-ups
1. **`/contact` backend handler still unbound** in production environment (needs webhook/API route).
2. **No analytics instrumentation present** (GA4/Meta events not configured on these static demos).
3. **No per-site deploy alias mapping committed** yet for this wave.
4. **Queue quality caveat:** source mixes P1 and P2 tiers with no hard global rank field, so selection used uncovered status + estimated value.
''').strip() + "\n"
(root / 'DEPLOYMENT_NOTES.md').write_text(notes, encoding='utf-8')
print(f'created {len(leads)} pages in {root}')
