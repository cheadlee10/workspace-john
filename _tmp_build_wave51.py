from pathlib import Path

root = Path(r'C:/Users/chead/.openclaw/workspace-john')
wave = root / 'sites' / 'premium-v3-wave51'
wave.mkdir(parents=True, exist_ok=True)

leads = [
    {
        'id': 'NS041',
        'business': 'License DFW Pest Control',
        'city': 'Dallas, TX',
        'phone': '214-430-4504',
        'service': 'Pest Control',
        'slug': 'license-dfw-pest-control-dallas-tx',
        'bullets': [
            'Urgency-focused hero highlights same-day and next-day pest treatment booking paths for homeowners ready to act now',
            'Service stack calls out ant, roach, rodent, spider, and preventative perimeter treatment plans',
            'Trust section reinforces licensed operation, family-owned credibility, and straightforward pricing expectations',
            'Quote flow captures infestation type, property size, and preferred visit window to speed dispatch and close rates',
        ],
    },
    {
        'id': 'NS044',
        'business': 'Dunn-Rite Roofing Houston',
        'city': 'Houston, TX',
        'phone': '877-537-3317',
        'service': 'Roof Repair & Replacement',
        'slug': 'dunn-rite-roofing-houston-houston-tx',
        'bullets': [
            'High-trust roofing hero positions rapid storm-response and leak-repair quote requests above the fold',
            'Offer modules cover emergency tarping, shingle and flat roof repairs, full replacements, and gutter tie-ins',
            'Credibility messaging emphasizes warranty-backed workmanship and clear project scheduling milestones',
            'Lead intake requests roof type, damage urgency, and insurance status to prioritize sales-qualified callbacks',
        ],
    },
    {
        'id': 'NS045',
        'business': 'Houston Roofing Repair Experts',
        'city': 'Houston, TX',
        'phone': '832-300-9947',
        'service': 'Roofing & Exterior Repairs',
        'slug': 'houston-roofing-repair-experts-houston-tx',
        'bullets': [
            'Conversion-led hero targets property owners comparing roofing crews and requesting fast estimates today',
            'Service cards feature leak fixes, flashing work, soffit and fascia repair, gutters, and preventive maintenance',
            'Authority section supports confidence with experienced-crew framing and transparent scope-to-price handoff',
            'Quote form captures roof issue details, property type, and timeline to increase appointment set rates',
        ],
    },
    {
        'id': 'NS018',
        'business': 'Austin Auto Doctor Mobile Mechanic',
        'city': 'Austin, TX',
        'phone': '512-502-4698',
        'service': 'Mobile Auto Repair',
        'slug': 'austin-auto-doctor-mobile-mechanic-austin-tx',
        'bullets': [
            'Mobile-mechanic hero is built to capture stranded and urgent repair leads with immediate callback CTA',
            'Core offers include diagnostics, battery and starter service, brake work, tune-ups, and roadside support',
            'Trust panel highlights on-site convenience, transparent recommendations, and no-shop-waiting value proposition',
            'Detailed request asks vehicle symptoms, make/model, and current location for faster dispatch qualification',
        ],
    },
    {
        'id': 'NS024',
        'business': 'Affordable Fence Repair Portland',
        'city': 'Portland, OR',
        'phone': '971-708-3671',
        'service': 'Fence Repair & Installation',
        'slug': 'affordable-fence-repair-portland-portland-or',
        'bullets': [
            'Fence-focused hero drives quote actions from homeowners needing repair or new privacy fence builds',
            'Service blocks cover cedar fencing, post replacement, gate fixes, full panels, and storm-damage restoration',
            'Trust messaging emphasizes licensed and insured operations with clean, durable workmanship standards',
            'Lead capture fields gather fence length, material preference, and site constraints to pre-qualify buyers',
        ],
    },
]

for lead in leads:
    folder = wave / lead['slug']
    folder.mkdir(parents=True, exist_ok=True)
    lis = ''.join(f"<li>{b}</li>" for b in lead['bullets'])
    html = f"""<!doctype html><html lang='en'><head><meta charset='utf-8'/><meta name='viewport' content='width=device-width, initial-scale=1'/><title>{lead['business']} | Premium Demo</title><style>:root{{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}}*{{box-sizing:border-box}}body{{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}}.wrap{{max-width:1080px;margin:auto;padding:28px 18px}}.grid{{display:grid;gap:14px}}.hero{{grid-template-columns:1.3fr .9fr}}.card{{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}}.chips span{{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}}.btn{{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}}.pri{{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e;border:none;cursor:pointer}}.sec{{border:1px solid #39508c;color:var(--text)}}form{{display:grid;gap:9px}}label{{font-size:13px;color:var(--muted)}}input,textarea{{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}}textarea{{min-height:92px}}ul{{margin:8px 0 0 18px}}li{{margin:7px 0;color:#d9e4ff}}@media(max-width:860px){{.hero,.services{{grid-template-columns:1fr}}}}</style></head><body><div class='wrap'><div class='grid hero'><section class='card'><p style='margin-top:0;color:var(--muted)'>{lead['city']}</p><h1 style='margin:.2rem 0'>{lead['business']} Premium Demo Built to Convert More {lead['service']} Leads</h1><p>Conversion-focused landing page concept designed to increase qualified inbound quote requests and accelerate booked jobs.</p><p><a class='btn pri' href='#quote'>Get My Quote</a> <span class='btn sec'>{lead['phone']}</span></p><div class='chips'><span>Fast Response CTA</span><span>Service-Led Offer Stack</span><span>Trust-First Layout</span></div></section><section class='card'><h2 style='margin-top:0'>Request a Quick Callback</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{lead['slug']}'/><input type='hidden' name='source' value='quick_callback'/><label for='name'>Full Name</label><input aria-label='Full Name' id='name' name='name' type='text' required autocomplete='name'/><label for='phone'>Phone Number</label><input aria-label='Phone Number' id='phone' name='phone' type='tel' required autocomplete='tel'/><button class='btn pri' type='submit'>Request Callback</button></form></section></div><div class='grid services' style='margin-top:12px;grid-template-columns:1fr 1fr'><section class='card'><h2 style='margin-top:0'>Core Services</h2><ul>{lis}</ul></section><section class='card' id='quote'><h2 style='margin-top:0'>Detailed Quote Request</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{lead['slug']}'/><input type='hidden' name='source' value='detailed_quote'/><label for='qname'>Full Name</label><input aria-label='Full Name' id='qname' name='name' type='text' required autocomplete='name'/><label for='qphone'>Phone Number</label><input aria-label='Phone Number' id='qphone' name='phone' type='tel' required autocomplete='tel'/><label for='qdetails'>Project details</label><textarea aria-label='Project details' id='qdetails' name='details' required></textarea><button class='btn pri' type='submit'>Send My Quote Request</button></form><p>{lead['phone']}<br/><small>Demo form routes to secure contact intake endpoint.</small></p></section></div></div></body></html>"""
    (folder / 'index.html').write_text(html, encoding='utf-8')

notes = """# Premium V3 Wave 51 Deployment Notes

Generated: 2026-03-03
Wave folder: `sites/premium-v3-wave51`
Pages built: 5

## Included demos
1. `license-dfw-pest-control-dallas-tx` (NS041)
2. `dunn-rite-roofing-houston-houston-tx` (NS044)
3. `houston-roofing-repair-experts-houston-tx` (NS045)
4. `austin-auto-doctor-mobile-mechanic-austin-tx` (NS018)
5. `affordable-fence-repair-portland-portland-or` (NS024)

## Selection rationale
- Chosen from currently uncovered highest-intent records in `nosite_top20_leads.jsonl` not used in the latest wave set.
- Prioritized urgent-service categories with strong quote intent: pest control, roofing, mobile mechanic, and fence repair.

## Endpoint convention used
- Both forms post to: `/contact`
- Hidden fields:
  - `business=<slug>`
  - `source=quick_callback` or `source=detailed_quote`

## Deployment checklist
- Publish each slug folder as static route under the demo host.
- Verify `/contact` handler accepts POST fields: `name`, `phone`, optional `details`, `business`, `source`.
- Confirm lead routing/notification maps new business slugs to outreach records.
- Smoke test both forms per page after deploy.

## Blockers / risks
- No live endpoint verification was performed in this build pass (static artifact only).
"""
(wave / 'DEPLOYMENT_NOTES.md').write_text(notes, encoding='utf-8')

print('Built', wave)
for l in leads:
    print('-', l['slug'])
