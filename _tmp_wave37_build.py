import os,re,textwrap

wave='sites/premium-v3-wave37'
os.makedirs(wave,exist_ok=True)
leads=[
 {'id':'gpass-us-400','client':'Parker & Sons','slug':'parker-and-sons-phoenix-az','city':'Phoenix, AZ','service':'Plumbing/HVAC/Electrical','est':1080,'score':88,'tier':'P1','phone':'(602) 273-7247','email':''},
 {'id':'gpass-us-423','client':'Michael & Son Services','slug':'michael-and-son-services-alexandria-va','city':'Alexandria, VA','service':'Plumbing/HVAC/Electrical','est':1080,'score':87,'tier':'P1','phone':'(800) 948-6453','email':''},
 {'id':'gpass-us-374','client':'Hiller Plumbing, Heating, Cooling & Electrical','slug':'hiller-plumbing-heating-cooling-and-electrical-nashville-tn','city':'Nashville, TN','service':'HVAC/Plumbing/Electrical','est':1120,'score':86,'tier':'P1','phone':'(615) 292-6110','email':''},
 {'id':'gpass-us-409','client':'Bonney Plumbing, Electrical, Heating & Air','slug':'bonney-plumbing-electrical-heating-and-air-sacramento-ca','city':'Sacramento, CA','service':'Plumbing/HVAC/Electrical','est':1090,'score':86,'tier':'P1','phone':'(916) 796-7992','email':''},
 {'id':'gpass-us-424','client':'Len The Plumber Heating & Air','slug':'len-the-plumber-heating-and-air-baltimore-md','city':'Baltimore, MD','service':'Plumbing/HVAC','est':1040,'score':85,'tier':'P1','phone':'(800) 950-4619','email':''},
]
services={
 'Plumbing/HVAC/Electrical':[
  'Emergency dispatch lane for plumbing, HVAC, and electrical issues with same-day booking CTA',
  'Service cards for drains, heating/cooling, and panel safety calls tuned to high-intent visitors',
  'Trust stack for licensed technicians, financing options, and workmanship guarantees above the fold',
  'Lead qualifier prompts for issue type, urgency, and property profile to pre-score inbound jobs'],
 'HVAC/Plumbing/Electrical':[
  'Emergency dispatch lane for plumbing, HVAC, and electrical issues with same-day booking CTA',
  'Service cards for drains, heating/cooling, and panel safety calls tuned to high-intent visitors',
  'Trust stack for licensed technicians, financing options, and workmanship guarantees above the fold',
  'Lead qualifier prompts for issue type, urgency, and property profile to pre-score inbound jobs'],
 'Plumbing/HVAC':[
  'Dual-path emergency section for plumbing and HVAC with rapid response CTA',
  'Conversion modules for drains, water heaters, heating, cooling, and seasonal tune-ups',
  'Credibility row covering licensing, guarantees, and maintenance-plan benefits',
  'Form fields for symptom details and urgency to route high-value calls first'],
}
css=":root{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}*{box-sizing:border-box}body{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}.wrap{max-width:1080px;margin:auto;padding:28px 18px}.grid{display:grid;gap:14px}.hero{grid-template-columns:1.3fr .9fr}.card{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}.chips span{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}.btn{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}.pri{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e}.sec{border:1px solid #39508c;color:var(--text)}form{display:grid;gap:9px}label{font-size:13px;color:var(--muted)}input,textarea{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}textarea{min-height:92px}ul{margin:8px 0 0 18px}li{margin:7px 0;color:#d9e4ff}@media(max-width:860px){.hero,.services{grid-template-columns:1fr}}"
for L in leads:
    items=''.join(f"<li>{x}</li>" for x in services[L['service']])
    digits=re.sub(r'[^0-9+]','',L['phone'])
    email=L['email'] if L['email'] else 'Email not publicly listed'
    html=f"<!doctype html><html lang='en'><head><meta charset='utf-8'/><meta name='viewport' content='width=device-width, initial-scale=1'/><title>{L['client']} | Premium Demo</title><style>{css}</style></head><body><div class='wrap'><div class='grid hero'><section class='card'><p style='margin-top:0;color:var(--muted)'>{L['city']}</p><h1 style='margin:.2rem 0'>{L['client']} Premium Demo Built to Convert More {L['service']} Leads</h1><p>Conversion-focused landing page concept designed to increase qualified inbound quote requests and accelerate booked jobs.</p><p><a class='btn pri' href='#quote'>Get My Quote</a> <a class='btn sec' href='tel:{digits}'>Call {L['phone']}</a></p><div class='chips'><span>Fast Response CTA</span><span>Service-Led Offer Stack</span><span>Trust-First Layout</span></div></section><section class='card'><h2 style='margin-top:0'>Request a Quick Callback</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{L['slug']}'/><input type='hidden' name='source' value='quick_callback'/><label for='name'>Full Name</label><input aria-label='Full Name' id='name' name='name' type='text' required autocomplete='name'/><label for='phone'>Phone Number</label><input aria-label='Phone Number' id='phone' name='phone' type='tel' required autocomplete='tel'/><button class='btn pri' type='submit'>Request Callback</button></form></section></div><div class='grid services' style='margin-top:12px;grid-template-columns:1fr 1fr'><section class='card'><h2 style='margin-top:0'>Core Services</h2><ul>{items}</ul></section><section class='card' id='quote'><h2 style='margin-top:0'>Detailed Quote Request</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{L['slug']}'/><input type='hidden' name='source' value='detailed_quote'/><label for='qname'>Full Name</label><input aria-label='Full Name' id='qname' name='name' type='text' required autocomplete='name'/><label for='qphone'>Phone Number</label><input aria-label='Phone Number' id='qphone' name='phone' type='tel' required autocomplete='tel'/><label for='qdetails'>Project details</label><textarea aria-label='Project details' id='qdetails' name='details' required></textarea><button class='btn pri' type='submit'>Send My Quote Request</button></form><p><a href='tel:{digits}' style='color:#9dd2ff;text-decoration:none;font-weight:700'>Call {L['phone']}</a> | {email}<br/><small>Demo form routes to secure contact intake endpoint.</small></p></section></div></div></body></html>"
    p=os.path.join(wave,L['slug'])
    os.makedirs(p,exist_ok=True)
    open(os.path.join(p,'index.html'),'w',encoding='utf-8').write(html)
notes=textwrap.dedent('''# Premium V3 Wave 37 - Deployment Notes

Date: 2026-03-03
Wave Folder: sites/premium-v3-wave37

## Built Pages (highest-priority uncovered leads)
1. parker-and-sons-phoenix-az (est. $1080, outreach ID: gpass-us-400, tier: P1, score: 88, service: Plumbing/HVAC/Electrical)
2. michael-and-son-services-alexandria-va (est. $1080, outreach ID: gpass-us-423, tier: P1, score: 87, service: Plumbing/HVAC/Electrical)
3. hiller-plumbing-heating-cooling-and-electrical-nashville-tn (est. $1120, outreach ID: gpass-us-374, tier: P1, score: 86, service: HVAC/Plumbing/Electrical)
4. bonney-plumbing-electrical-heating-and-air-sacramento-ca (est. $1090, outreach ID: gpass-us-409, tier: P1, score: 86, service: Plumbing/HVAC/Electrical)
5. len-the-plumber-heating-and-air-baltimore-md (est. $1040, outreach ID: gpass-us-424, tier: P1, score: 85, service: Plumbing/HVAC)

## Selection Notes
- Source file: outreach_queue.jsonl
- Selection criteria: highest-priority tier (P1) and highest available scores not yet present in prior premium-v3 wave folders.
- Slug convention used: business-city-state (normalized lowercase hyphenation).

## Conversion Structure Included
- Hero with clear primary CTA (`Get My Quote`) and secondary click-to-call CTA
- Above-the-fold quick callback form
- Service-specific core services section for each vertical
- Detailed quote form with project details capture
- Contact reinforcement row with verified phone and non-fabricated email handling

## Form Endpoint Convention
- All forms post to current endpoint convention: `/contact`
- Hidden metadata fields on every form:
  - `business` = site slug
  - `source` = `quick_callback` or `detailed_quote`

## Known Blockers / Follow-ups
1. Public email is unavailable for 5/5 selected leads; pages intentionally display `Email not publicly listed`.
2. `/contact` intake backend mapping to CRM + owner routing still pending final confirmation.
3. CTA click and form-submit analytics events are not yet embedded.
4. Wave37 production domain/path wiring and deploy aliases remain pending deployment config.
5. Large-brand multi-location entities can create duplicate-variant risk in outreach queue; keep outreach linkage pinned to listed wave37 IDs.
''')
open(os.path.join(wave,'DEPLOYMENT_NOTES.md'),'w',encoding='utf-8').write(notes)
print('built',len(leads),'pages in',wave)
