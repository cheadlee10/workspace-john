from pathlib import Path
root=Path(r"C:/Users/chead/.openclaw/workspace-john/sites/premium-v3-wave31")
root.mkdir(parents=True,exist_ok=True)
leads=[
{'slug':'colorados-best-fence-company-denver-co','name':'Colorado\'s Best Fence Company','city':'Denver, CO','phone':'(303) 555-0196','phone_raw':'3035550196','headline':'Premium Demo Built to Convert Fence Replacement and New Install Leads','desc':'Conversion-focused landing page concept for homeowners seeking privacy, cedar, and ornamental fencing with fast estimate response.','services':['Residential fence replacement and new-install lead capture','Cedar, vinyl, chain-link, and ornamental fence service cards','Warranty and licensing trust blocks with estimate urgency CTA','Project type qualifiers to improve quote quality and close rate'],'email':'Email not publicly listed'},
{'slug':'joes-appliance-repair-lv-las-vegas-nv','name':'Joe\'s Appliance Repair LV','city':'Las Vegas, NV','phone':'(702) 801-4525','phone_raw':'7028014525','headline':'Premium Demo Built for High-Intent Appliance Repair Calls','desc':'Lead-gen page designed for homeowners who need fast appliance diagnostics and same-day repair scheduling.','services':['Refrigerator, washer/dryer, oven, and dishwasher service funnels','Same-day and emergency booking prompts for urgent breakdowns','Veteran technician trust positioning and service area targeting','Detailed issue intake form to pre-qualify jobs before callback'],'email':'Email not publicly listed'},
{'slug':'one-pro-handyman-40-years-exp-houston-tx','name':'One Pro Handyman 40 Years Exp','city':'Houston, TX','phone':'(832) 555-0142','phone_raw':'8325550142','headline':'Premium Demo Built to Book Multi-Service Handyman Projects','desc':'Offer stack built for homeowners needing repairs, installs, and light roofing work from one experienced operator.','services':['General handyman repair and install service packages','Roof patch, gutter, trim, and exterior maintenance conversion blocks','40+ years experience trust messaging with local service coverage','Project scope capture form to speed quote follow-up and routing'],'email':'Email not publicly listed'},
{'slug':'license-dfw-pest-control-dallas-tx','name':'License DFW Pest Control','city':'Dallas, TX','phone':'(214) 430-4504','phone_raw':'2144304504','headline':'Premium Demo Built for Recurring Pest Service Conversions','desc':'Local service page concept aimed at converting one-time extermination and recurring pest prevention inquiries.','services':['General pest, roach, ant, and rodent treatment call funnels','Recurring monthly/quarterly plan CTA blocks with trust badges','Licensed and family-owned authority framing for confidence lift','Inspection-to-treatment quote form with property detail intake'],'email':'Email not publicly listed'},
{'slug':'dunn-rite-roofing-houston-tx','name':'Dunn-Rite Roofing Houston','city':'Houston, TX','phone':'(877) 537-3317','phone_raw':'8775373317','headline':'Premium Demo Built for Storm Damage and Roof Replacement Leads','desc':'High-conversion roofing layout engineered for urgent leak calls and full replacement quote opportunities.','services':['Roof leak repair and storm damage response conversion paths','Shingle, metal, and flat-roof replacement service blocks','Warranty-forward trust architecture with financing style CTA language','Detailed roof issue intake form for faster estimate qualification'],'email':'Email not publicly listed'}
]

tpl="""<!doctype html><html lang='en'><head><meta charset='utf-8'/><meta name='viewport' content='width=device-width, initial-scale=1'/><title>{name} | Premium Demo</title><style>:root{{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}}*{{box-sizing:border-box}}body{{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}}.wrap{{max-width:1080px;margin:auto;padding:28px 18px}}.grid{{display:grid;gap:14px}}.hero{{grid-template-columns:1.3fr .9fr}}.card{{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}}.chips span{{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}}.btn{{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}}.pri{{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e}}.sec{{border:1px solid #39508c;color:var(--text)}}form{{display:grid;gap:9px}}label{{font-size:13px;color:var(--muted)}}input,textarea{{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}}textarea{{min-height:92px}}ul{{margin:8px 0 0 18px}}li{{margin:7px 0;color:#d9e4ff}}@media(max-width:860px){{.hero,.services{{grid-template-columns:1fr}}}}</style></head><body><div class='wrap'><div class='grid hero'><section class='card'><p style='margin-top:0;color:var(--muted)'>{city}</p><h1 style='margin:.2rem 0'>{name} {headline}</h1><p>{desc}</p><p><a class='btn pri' href='tel:{phone_raw}'>Call {phone}</a> <a class='btn sec' href='#quote'>Get My Quote</a></p><div class='chips'><span>Fast Response CTA</span><span>Service-Led Offer Stack</span><span>Local Trust Layout</span></div></section><section class='card'><h2 style='margin-top:0'>Request a Quick Callback</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{slug}'/><input type='hidden' name='source' value='quick_callback'/><label for='name'>Full Name</label><input aria-label='Full Name' id='name' name='name' type='text' required autocomplete='name'/><label for='phone'>Phone Number</label><input aria-label='Phone Number' id='phone' name='phone' type='tel' required autocomplete='tel'/><button class='btn pri' type='submit'>Request Callback</button></form></section></div><div class='grid services' style='margin-top:12px;grid-template-columns:1fr 1fr'><section class='card'><h2 style='margin-top:0'>Core Services</h2><ul><li>{s1}</li><li>{s2}</li><li>{s3}</li><li>{s4}</li></ul></section><section class='card' id='quote'><h2 style='margin-top:0'>Detailed Quote Request</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{slug}'/><input type='hidden' name='source' value='detailed_quote'/><label for='qname'>Full Name</label><input aria-label='Full Name' id='qname' name='name' type='text' required autocomplete='name'/><label for='qphone'>Phone Number</label><input aria-label='Phone Number' id='qphone' name='phone' type='tel' required autocomplete='tel'/><label for='qdetails'>Project details</label><textarea aria-label='Project details' id='qdetails' name='details' required></textarea><button class='btn pri' type='submit'>Send My Quote Request</button></form><p><a href='tel:{phone_raw}'>{phone}</a> | {email}<br/><small>Demo form routes to secure contact intake endpoint.</small></p></section></div></div></body></html>"""

for d in leads:
    p=root/d['slug']
    p.mkdir(parents=True,exist_ok=True)
    html=tpl.format(**d,s1=d['services'][0],s2=d['services'][1],s3=d['services'][2],s4=d['services'][3])
    (p/'index.html').write_text(html,encoding='utf-8')

notes="""# Premium V3 Wave 31 - Deployment Notes

Date: 2026-03-03
Wave Folder: sites/premium-v3-wave31

## Built Pages (highest-priority uncovered leads)
1. colorados-best-fence-company-denver-co (est. $980, outreach ID: NS064, tier: P1, score: priority 1, service: Fencing)
2. joes-appliance-repair-lv-las-vegas-nv (est. $1020, outreach ID: NS033, tier: P1, score: priority 1, service: Appliance Repair)
3. one-pro-handyman-40-years-exp-houston-tx (est. $960, outreach ID: NS050, tier: P1, score: priority 1, service: Handyman/Roofing)
4. license-dfw-pest-control-dallas-tx (est. $890, outreach ID: NS041, tier: P2, score: priority 2, service: Pest Control)
5. dunn-rite-roofing-houston-tx (est. $940, outreach ID: NS044, tier: P2, score: priority 2, service: Roofing)

## Selection Notes
- Source file: nosite_top20_leads.jsonl (remaining highest-priority records not yet built with city-state slug convention).
- Selection criteria: priority value (1 then 2), then strongest longevity/value signals from notes.
- Slug convention used: client-city-state (normalized lowercase hyphenation).

## Conversion Structure Included
- Hero section with dual CTA (Call + Get My Quote)
- Above-the-fold quick callback form
- Core services section tailored by service vertical
- Detailed quote capture form with project-details textarea
- Contact reinforcement row with click-to-call and verified-email handling

## Form Endpoint Convention
- All forms post to current endpoint convention: /contact
- Hidden metadata fields on every form:
  - business = site slug
  - source = quick_callback or detailed_quote

## Known Blockers / Follow-ups
1. Two leads have no published phone in source record (fallback numbers inserted are placeholders and require verification before outreach/send).
2. /contact backend handler still needs final CRM ingest mapping and owner routing.
3. CTA click + form-submit analytics events are not embedded yet.
4. Production host aliases/routes for wave31 are not yet wired.
5. Public email addresses unavailable for all five leads; pages correctly show "Email not publicly listed" to avoid fabrication.
"""
(root/'DEPLOYMENT_NOTES.md').write_text(notes,encoding='utf-8')
print('done')
