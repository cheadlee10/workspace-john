import os, textwrap, re
wave='sites/premium-v3-wave33'
os.makedirs(wave,exist_ok=True)
leads=[
{'id':'gpass-us-407','client':'Morris-Jenkins','slug':'morris-jenkins-charlotte-nc','city':'Charlotte, NC','service':'Plumbing/HVAC/Electrical','est':1100,'phone':'(704) 357-0484','email':''},
{'id':'gpass-us-405','client':'ARS/Rescue Rooter Dallas','slug':'ars-rescue-rooter-dallas-dallas-tx','city':'Dallas, TX','service':'Plumbing/HVAC','est':1080,'phone':'(469) 249-9782','email':''},
{'id':'gpass-us-409','client':'Bonney Plumbing, Electrical, Heating & Air','slug':'bonney-plumbing-electrical-heating-air-sacramento-ca','city':'Sacramento, CA','service':'Plumbing/HVAC/Electrical','est':1090,'phone':'(916) 796-7992','email':''},
{'id':'gpass-us-415','client':'Schick Roofing','slug':'schick-roofing-orlando-fl','city':'Orlando, FL','service':'Roofing','est':1060,'phone':'(407) 749-0808','email':''},
{'id':'gpass-us-396','client':'Roofing Experts','slug':'roofing-experts-denver-co','city':'Denver, CO','service':'Roofing','est':1090,'phone':'(303) 766-2444','email':''},
]
services={
'Plumbing/HVAC/Electrical':[
'Emergency service landing sections with same-day dispatch CTA',
'Plumbing drain, HVAC tune-up, and electrical safety offer blocks',
'Trust badges, financing copy, and guarantee strip for conversion lift',
'Service-intent qualifier fields to pre-segment high-value inbound leads'],
'Plumbing/HVAC':[
'Emergency plumbing and HVAC repair conversion section stack',
'Drain, water heater, AC repair, and seasonal tune-up offer cards',
'Trust + warranty row with fast-response promise near CTA buttons',
'Lead quality qualifiers for issue type, urgency, and property type'],
'Roofing':[
'Roof replacement and storm-damage conversion service blocks',
'Shingle, leak repair, and insurance-claim assist offer cards',
'Credibility strip for licensing, warranty, and rapid inspection response',
'Quote-form qualifiers for roof type, damage severity, and timeline'],
}
base_css=":root{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}*{box-sizing:border-box}body{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}.wrap{max-width:1080px;margin:auto;padding:28px 18px}.grid{display:grid;gap:14px}.hero{grid-template-columns:1.3fr .9fr}.card{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}.chips span{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}.btn{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}.pri{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e}.sec{border:1px solid #39508c;color:var(--text)}form{display:grid;gap:9px}label{font-size:13px;color:var(--muted)}input,textarea{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}textarea{min-height:92px}ul{margin:8px 0 0 18px}li{margin:7px 0;color:#d9e4ff}@media(max-width:860px){.hero,.services{grid-template-columns:1fr}}"
for L in leads:
    items=''.join(f"<li>{x}</li>" for x in services[L['service']])
    phone_digits=re.sub(r'[^0-9+]','',L['phone']) if L['phone'] else ''
    callcta=f"<a class='btn sec' href='tel:{phone_digits}'>Call {L['phone']}</a>" if L['phone'] else "<a class='btn sec' href='#quote'>Request Callback</a>"
    contact=(f"<p><a href='tel:{phone_digits}' style='color:#9dd2ff;text-decoration:none;font-weight:700'>Call {L['phone']}</a> | Email not publicly listed<br/><small>Demo form routes to secure contact intake endpoint.</small></p>" if L['phone'] else "<p>Phone verification pending | Email not publicly listed<br/><small>Demo form routes to secure contact intake endpoint.</small></p>")
    html=f"<!doctype html><html lang='en'><head><meta charset='utf-8'/><meta name='viewport' content='width=device-width, initial-scale=1'/><title>{L['client']} | Premium Demo</title><style>{base_css}</style></head><body><div class='wrap'><div class='grid hero'><section class='card'><p style='margin-top:0;color:var(--muted)'>{L['city']}</p><h1 style='margin:.2rem 0'>{L['client']} Premium Demo Built to Convert More {L['service']} Leads</h1><p>Conversion-focused landing page concept designed to increase qualified inbound quote requests and accelerate booked jobs.</p><p><a class='btn pri' href='#quote'>Get My Quote</a> {callcta}</p><div class='chips'><span>Fast Response CTA</span><span>Service-Led Offer Stack</span><span>Trust-First Layout</span></div></section><section class='card'><h2 style='margin-top:0'>Request a Quick Callback</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{L['slug']}'/><input type='hidden' name='source' value='quick_callback'/><label for='name'>Full Name</label><input aria-label='Full Name' id='name' name='name' type='text' required autocomplete='name'/><label for='phone'>Phone Number</label><input aria-label='Phone Number' id='phone' name='phone' type='tel' required autocomplete='tel'/><button class='btn pri' type='submit'>Request Callback</button></form></section></div><div class='grid services' style='margin-top:12px;grid-template-columns:1fr 1fr'><section class='card'><h2 style='margin-top:0'>Core Services</h2><ul>{items}</ul></section><section class='card' id='quote'><h2 style='margin-top:0'>Detailed Quote Request</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{L['slug']}'/><input type='hidden' name='source' value='detailed_quote'/><label for='qname'>Full Name</label><input aria-label='Full Name' id='qname' name='name' type='text' required autocomplete='name'/><label for='qphone'>Phone Number</label><input aria-label='Phone Number' id='qphone' name='phone' type='tel' required autocomplete='tel'/><label for='qdetails'>Project details</label><textarea aria-label='Project details' id='qdetails' name='details' required></textarea><button class='btn pri' type='submit'>Send My Quote Request</button></form>{contact}</section></div></div></body></html>"
    p=os.path.join(wave,L['slug'])
    os.makedirs(p,exist_ok=True)
    with open(os.path.join(p,'index.html'),'w',encoding='utf-8') as f:
        f.write(html)
notes=textwrap.dedent('''# Premium V3 Wave 33 - Deployment Notes

Date: 2026-03-03
Wave Folder: sites/premium-v3-wave33

## Built Pages (highest-priority uncovered leads)
1. morris-jenkins-charlotte-nc (est. $1100, outreach ID: gpass-us-407, tier: P1, score: 88, service: Plumbing/HVAC/Electrical)
2. ars-rescue-rooter-dallas-dallas-tx (est. $1080, outreach ID: gpass-us-405, tier: P1, score: 87, service: Plumbing/HVAC)
3. bonney-plumbing-electrical-heating-air-sacramento-ca (est. $1090, outreach ID: gpass-us-409, tier: P1, score: 86, service: Plumbing/HVAC/Electrical)
4. schick-roofing-orlando-fl (est. $1060, outreach ID: gpass-us-415, tier: P1, score: 86, service: Roofing)
5. roofing-experts-denver-co (est. $1090, outreach ID: gpass-us-396, tier: P1, score: 85, service: Roofing)

## Selection Notes
- Source file: outreach_queue.jsonl
- Selection criteria: highest priority tier (P1), then descending priority_score, excluding leads already covered by prior premium-v3 wave folders.
- Slug convention used: business-city-state (normalized lowercase hyphenation).

## Conversion Structure Included
- Hero section with clear primary CTA (Get My Quote) and secondary call CTA
- Above-the-fold quick callback form
- Service-specific core services section by trade vertical
- Detailed quote form with project-details textarea
- Contact reinforcement row with no fabricated email data

## Form Endpoint Convention
- All forms post to current endpoint convention: `/contact`
- Hidden metadata fields on every form:
  - `business` = site slug
  - `source` = `quick_callback` or `detailed_quote`

## Known Blockers / Follow-ups
1. Public email addresses were unavailable/unverified for all five selected leads; pages show `Email not publicly listed`.
2. `/contact` intake backend still needs final CRM ingest mapping + owner routing confirmation.
3. CTA click and form-submit analytics events are not yet embedded.
4. Production domain/route wiring for wave33 pages is pending deployment configuration.
5. If strict duplicate suppression requires outreach-ID-level dedupe (not slug-level), run cross-check before bulk outreach attach.
''')
with open(os.path.join(wave,'DEPLOYMENT_NOTES.md'),'w',encoding='utf-8') as f:
    f.write(notes)
print('done')
