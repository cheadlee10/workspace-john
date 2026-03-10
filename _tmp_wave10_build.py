import os, textwrap
root=r'C:\Users\chead\.openclaw\workspace-john\sites\premium-v3-wave10'
os.makedirs(root, exist_ok=True)
leads=[
    dict(id='gpass-pnw-208',slug='lobo-roofing-llc-tacoma-wa',name='Lobo Roofing LLC',phone='2536513106',display='(253) 651-3106',area='Tacoma, WA',title='Fast, Trusted Roofing for Tacoma Homes and Small Commercial Projects',desc='Premium roofing demo focused on emergency calls, inspection bookings, and higher close rates from local search traffic.',chips=['24/7 Leak Response','Roof Repair + Replacement','Insurance Claim Support'],services=['Leak Detection and Repair','Shingle, Metal, and Flat Roof Replacement','Storm Damage Inspection + Documentation','Preventive Roof Maintenance Plans']),
    dict(id='gpass-pnw-215',slug='seattle-pros-llc-federal-way-wa',name='Seattle Pros LLC',phone='2065572170',display='(206) 557-2170',area='Federal Way, WA',title='One Exterior Crew for Roofing, Siding, and High-Value Home Upgrades',desc='Premium exteriors demo designed to capture estimate requests and route urgent homeowner calls into booked jobs.',chips=['Roof + Siding Bundles','Free Exterior Inspection','Financing-Friendly Quotes'],services=['Roof Repair and Full Replacement','Siding Installation and Upgrade','Exterior Painting and Trim Restoration','Gutter and Drainage Improvements']),
    dict(id='gpass-pnw-217',slug='mckenzie-roofing-inc-springfield-or',name='McKenzie Roofing Inc.',phone='5417442448',display='(541) 744-2448',area='Springfield, OR',title='Springfield Roofing Built for Longevity, Safety, and Faster Turnaround',desc='Premium conversion page tailored to convert quote shoppers into scheduled inspections with trust-first messaging.',chips=['Residential + Light Commercial','Detailed Roof Reports','Warranty-Backed Work'],services=['Roof Tune-Ups and Preventive Maintenance','Full Tear-Off and Roof Replacement','Flashing, Ventilation, and Leak Corrections','Real Estate and Pre-Sale Roof Inspections']),
    dict(id='gpass-pnw-218',slug='pro-fence-solutions-wa-or',name='Pro Fence Solutions',phone='3609530343',display='(360) 953-0343',area='WA/OR Service Area',title='Fence Solutions That Balance Privacy, Security, and Curb Appeal',desc='Premium fencing demo built to increase booked site visits through clear service packaging and quote-first UX.',chips=['Wood + Vinyl + Chain Link','Custom Gate Builds','Fast Repair Scheduling'],services=['New Fence Design and Installation','Fence Repair and Storm Damage Fixes','Driveway and Walkway Gate Installation','Staining, Sealing, and Long-Term Care']),
    dict(id='gpass-pnw-229',slug='huckleberry-fence-and-deck-eugene-or',name='Huckleberry Fence & Deck',phone='5413458146',display='(541) 345-8146',area='Eugene, OR',title='Custom Fences and Decks That Add Usable Outdoor Living Space',desc='Premium deck/fence lead funnel built for stronger project qualification and higher-ticket estimate requests.',chips=['Fence + Deck Specialists','Repair + New Builds','Permit-Aware Planning'],services=['Custom Privacy and Perimeter Fencing','Deck Design, Build, and Rebuild Projects','Fence and Deck Repair Services','Railings, Gates, and Outdoor Upgrade Add-Ons']),
]

tpl="""<!doctype html>
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
    d=os.path.join(root,l['slug'])
    os.makedirs(d,exist_ok=True)
    html=tpl.format(**l,chip1=l['chips'][0],chip2=l['chips'][1],chip3=l['chips'][2],s1=l['services'][0],s2=l['services'][1],s3=l['services'][2],s4=l['services'][3])
    with open(os.path.join(d,'index.html'),'w',encoding='utf-8') as f:
        f.write(html)

notes=textwrap.dedent('''
# Premium V3 Wave 10 - Deployment Notes

Date: 2026-03-02
Wave Folder: sites/premium-v3-wave10

## Built Pages (highest-priority leads not yet covered in premium-v3 waves)
1. `lobo-roofing-llc-tacoma-wa` (P2, outreach ID: gpass-pnw-208)
2. `seattle-pros-llc-federal-way-wa` (P2, outreach ID: gpass-pnw-215)
3. `mckenzie-roofing-inc-springfield-or` (P2, outreach ID: gpass-pnw-217)
4. `pro-fence-solutions-wa-or` (P2, outreach ID: gpass-pnw-218)
5. `huckleberry-fence-and-deck-eugene-or` (P2, outreach ID: gpass-pnw-229)

## Conversion Structure Included
- Top-of-page CTA buttons (`Call Now`, `Get My Quote`)
- Quick callback form above fold
- Core services section with 4 service bullets
- Detailed quote capture form with hidden source tag
- Click-to-call footer contact reinforcement

## Form Endpoint Convention
- Current endpoint convention preserved: all forms post to `/contact`
- Hidden form metadata used: `business` + `source` (`quick_callback` / `detailed_quote`)

## Known Blockers / Follow-ups
1. **Production form handler not mapped** for `/contact` (needs webhook/backend binding).
2. **No analytics IDs configured** (GA4 / Meta Pixel not attached in static demos).
3. **No deployment alias map provided** (Vercel project/domain assignment pending).
4. **One remaining uncovered P2 lead** from current queue (`gpass-pnw-236`) if another page is needed in next wave.
''').strip()+"\n"
with open(os.path.join(root,'DEPLOYMENT_NOTES.md'),'w',encoding='utf-8') as f:
    f.write(notes)
print('created',len(leads),'pages')
