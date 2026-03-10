import os,re,textwrap
wave='sites/premium-v3-wave36'
os.makedirs(wave,exist_ok=True)
leads=[
 {'id':'gpass-us-431','client':'Baker Brothers Plumbing, Air & Electrical','slug':'baker-brothers-plumbing-air-and-electrical-dallas-tx','city':'Dallas, TX','service':'Plumbing/HVAC/Electrical','est':1080,'score':87,'tier':'P1','phone':'(214) 892-2225','email':''},
 {'id':'gpass-us-317','client':'H&S Roofing and Gutters','slug':'h-and-s-roofing-and-gutters-charlotte-nc','city':'Charlotte, NC','service':'Roofing/Gutters','est':1140,'score':86,'tier':'P1','phone':'(704) 334-9934','email':'sales@hsroofing.com'},
 {'id':'gpass-us-391','client':'Beacon Plumbing, Heating & Mechanical','slug':'beacon-plumbing-heating-and-mechanical-seattle-wa','city':'Seattle, WA','service':'Plumbing/HVAC','est':1080,'score':86,'tier':'P1','phone':'(206) 800-6269','email':''},
 {'id':'gpass-us-430','client':'Lee Company','slug':'lee-company-nashville-tn','city':'Nashville, TN','service':'HVAC/Plumbing/Electrical','est':1050,'score':86,'tier':'P1','phone':'(615) 567-1000','email':''},
 {'id':'gpass-pnw-213','client':'Handyman Rescue Team','slug':'handyman-rescue-team-seattle-wa','city':'Seattle, WA','service':'Handyman/Remodeling','est':900,'score':86,'tier':'P1','phone':'(206) 736-3060','email':'sos@handymanrescue.team'},
]
services={
 'Plumbing/HVAC/Electrical':[
  'Emergency service lane for plumbing, HVAC, and electrical issues with same-day booking CTA',
  'High-intent service cards for drains, cooling/heating, and panel/safety calls with direct quote trigger',
  'Trust stack for licensed techs, financing options, and workmanship guarantees above the fold break',
  'Lead qualifier prompts for issue type, urgency, and property profile to pre-score inbound jobs'],
 'HVAC/Plumbing/Electrical':[
  'Emergency service lane for plumbing, HVAC, and electrical issues with same-day booking CTA',
  'High-intent service cards for drains, cooling/heating, and panel/safety calls with direct quote trigger',
  'Trust stack for licensed techs, financing options, and workmanship guarantees above the fold break',
  'Lead qualifier prompts for issue type, urgency, and property profile to pre-score inbound jobs'],
 'Roofing/Gutters':[
  'Roof repair/replacement and gutter protection offer stack tuned for storm and leak intent',
  'Inspection-first CTA path with insurance and warranty trust signals to reduce friction',
  'Before-and-after proof section placeholder and licensing row positioned before long form',
  'Quote qualifiers for roof age, leak severity, and timeline to improve estimator readiness'],
 'Plumbing/HVAC':[
  'Dual-path emergency section for plumbing and HVAC with rapid dispatch CTA',
  'Service modules for drains, water heaters, heating, cooling, and tune-ups for scan-friendly conversion',
  'Credibility row covering licensing, guarantees, and maintenance-plan benefits',
  'Form fields for symptom details and urgency to route high-value calls first'],
 'Handyman/Remodeling':[
  'Small-job and remodel service cards grouped by speed-to-book priorities',
  'Project scoping CTA with clear next-step timeline and scope confirmation flow',
  'Trust content for years in business, workmanship standards, and communication updates',
  'Intake prompts for task list, property type, and target completion window to improve fit'],
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
notes=textwrap.dedent('''# Premium V3 Wave 36 - Deployment Notes

Date: 2026-03-03
Wave Folder: sites/premium-v3-wave36

## Built Pages (highest-priority uncovered leads)
1. baker-brothers-plumbing-air-and-electrical-dallas-tx (est. $1080, outreach ID: gpass-us-431, tier: P1, score: 87, service: Plumbing/HVAC/Electrical)
2. h-and-s-roofing-and-gutters-charlotte-nc (est. $1140, outreach ID: gpass-us-317, tier: P1, score: 86, service: Roofing/Gutters)
3. beacon-plumbing-heating-and-mechanical-seattle-wa (est. $1080, outreach ID: gpass-us-391, tier: P1, score: 86, service: Plumbing/HVAC)
4. lee-company-nashville-tn (est. $1050, outreach ID: gpass-us-430, tier: P1, score: 86, service: HVAC/Plumbing/Electrical)
5. handyman-rescue-team-seattle-wa (est. $900, outreach ID: gpass-pnw-213, tier: P1, score: 86, service: Handyman/Remodeling)

## Selection Notes
- Source file: outreach_queue.jsonl
- Selection criteria: highest-priority tier (P1) and top available priority scores among uncovered leads, excluding outreach IDs already listed in prior premium-v3 wave deployment notes.
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
1. Public email is unavailable for 3/5 leads; pages intentionally display `Email not publicly listed`.
2. `/contact` intake backend mapping to CRM + owner routing still pending final confirmation.
3. CTA click and form-submit analytics events are not yet embedded.
4. Wave36 production domain/path wiring and deploy aliases still pending deployment config.
5. Seattle market has existing similar-brand entries in prior waves; keep outreach linkage pinned to wave36 outreach IDs to avoid duplicate-send confusion.
''')
open(os.path.join(wave,'DEPLOYMENT_NOTES.md'),'w',encoding='utf-8').write(notes)
print('built',len(leads),'pages in',wave)
