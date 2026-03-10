from pathlib import Path

root = Path('C:/Users/chead/.openclaw/workspace-john')
wave = root / 'sites' / 'premium-v3-wave49'
wave.mkdir(parents=True, exist_ok=True)

leads = [
    {
        'id': 'nosite-067',
        'business': 'Roofers4U',
        'city': 'Houston, TX',
        'phone': 'Contact via Yelp listing',
        'service': 'Roofing',
        'slug': 'roofers4u-houston',
        'bullets': [
            'Conversion-led hero for storm-damage and leak repair requests with an urgent quote CTA above the fold',
            'Service stack highlights shingle replacement, flashing repair, flat-roof patching, and insurance-claim support',
            'Trust framing emphasizes licensed workmanship language, fast dispatch windows, and photo-backed project proof',
            'Quote capture asks roof type, leak urgency, and property details to prioritize close-ready homeowners',
        ],
    },
    {
        'id': 'nosite-069',
        'business': 'Houston Roofing Repairs',
        'city': 'Houston, TX',
        'phone': 'Contact via Yelp listing',
        'service': 'Roofing/General Contractor',
        'slug': 'houston-roofing-repairs-houston',
        'bullets': [
            'Premium repair-focused hero positions same-week inspection availability for residential and small commercial roofs',
            'Offer modules feature leak diagnostics, decking repair, emergency tarping, and preventative maintenance plans',
            'Authority section reinforces local market presence, reliability messaging, and transparent estimate expectations',
            'Lead form gathers roof age, visible damage, and preferred inspection slot to improve callback quality',
        ],
    },
    {
        'id': 'nosite-070',
        'business': 'Houston Roofing Contractor',
        'city': 'Houston, TX',
        'phone': 'Contact via Yelp listing',
        'service': 'Roofing',
        'slug': 'houston-roofing-contractor-houston',
        'bullets': [
            'High-urgency hero built for 24-hour roofing inquiries with clear action path for immediate estimate requests',
            'Service blocks cover full replacements, ventilation upgrades, ridge-cap fixes, and post-storm restoration scope',
            'Trust-first layout highlights insured crew messaging, workmanship guarantees, and straightforward project timelines',
            'Detailed form captures project scope, budget intent, and start date to surface higher-intent opportunities quickly',
        ],
    },
    {
        'id': 'nosite-071',
        'business': 'JP Roofing N Gutters',
        'city': 'Houston, TX',
        'phone': 'Contact via Yelp listing',
        'service': 'Roofing/Gutters',
        'slug': 'jp-roofing-n-gutters-houston',
        'bullets': [
            'Roof-and-gutter focused hero frames bundled exterior protection services with immediate quote CTA placement',
            'Service sequence promotes gutter replacements, drainage correction, roof tune-ups, and seasonal debris programs',
            'Credibility strip supports trust with established-company positioning and clean handoff from estimate to scheduling',
            'Quote intake fields collect water-intrusion symptoms, gutter length needs, and appointment preference for better sales routing',
        ],
    },
    {
        'id': 'nosite-072',
        'business': 'J R Jones Roofing',
        'city': 'Houston, TX',
        'phone': 'Contact via Yelp listing',
        'service': 'Roofing',
        'slug': 'j-r-jones-roofing-houston',
        'bullets': [
            'Trust-centric hero showcases professional roofing support for repairs and replacements with fast-response promise',
            'Service cards spotlight inspection services, underlayment repairs, flashing updates, and full-system replacements',
            'Social-proof-ready section is structured for review snippets, before-and-after imagery, and insurance-friendly messaging',
            'Lead form requests property type, issue description, and urgency so top-value callbacks can be prioritized',
        ],
    },
]

for lead in leads:
    folder = wave / lead['slug']
    folder.mkdir(parents=True, exist_ok=True)
    lis = ''.join(f"<li>{b}</li>" for b in lead['bullets'])
    html = f"""<!doctype html><html lang='en'><head><meta charset='utf-8'/><meta name='viewport' content='width=device-width, initial-scale=1'/><title>{lead['business']} | Premium Demo</title><style>:root{{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}}*{{box-sizing:border-box}}body{{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}}.wrap{{max-width:1080px;margin:auto;padding:28px 18px}}.grid{{display:grid;gap:14px}}.hero{{grid-template-columns:1.3fr .9fr}}.card{{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}}.chips span{{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}}.btn{{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}}.pri{{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e}}.sec{{border:1px solid #39508c;color:var(--text)}}form{{display:grid;gap:9px}}label{{font-size:13px;color:var(--muted)}}input,textarea{{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}}textarea{{min-height:92px}}ul{{margin:8px 0 0 18px}}li{{margin:7px 0;color:#d9e4ff}}@media(max-width:860px){{.hero,.services{{grid-template-columns:1fr}}}}</style></head><body><div class='wrap'><div class='grid hero'><section class='card'><p style='margin-top:0;color:var(--muted)'>{lead['city']}</p><h1 style='margin:.2rem 0'>{lead['business']} Premium Demo Built to Convert More {lead['service']} Leads</h1><p>Conversion-focused landing page concept designed to increase qualified inbound quote requests and accelerate booked jobs.</p><p><a class='btn pri' href='#quote'>Get My Quote</a> <span class='btn sec'>{lead['phone']}</span></p><div class='chips'><span>Fast Response CTA</span><span>Service-Led Offer Stack</span><span>Trust-First Layout</span></div></section><section class='card'><h2 style='margin-top:0'>Request a Quick Callback</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{lead['slug']}'/><input type='hidden' name='source' value='quick_callback'/><label for='name'>Full Name</label><input aria-label='Full Name' id='name' name='name' type='text' required autocomplete='name'/><label for='phone'>Phone Number</label><input aria-label='Phone Number' id='phone' name='phone' type='tel' required autocomplete='tel'/><button class='btn pri' type='submit'>Request Callback</button></form></section></div><div class='grid services' style='margin-top:12px;grid-template-columns:1fr 1fr'><section class='card'><h2 style='margin-top:0'>Core Services</h2><ul>{lis}</ul></section><section class='card' id='quote'><h2 style='margin-top:0'>Detailed Quote Request</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{lead['slug']}'/><input type='hidden' name='source' value='detailed_quote'/><label for='qname'>Full Name</label><input aria-label='Full Name' id='qname' name='name' type='text' required autocomplete='name'/><label for='qphone'>Phone Number</label><input aria-label='Phone Number' id='qphone' name='phone' type='tel' required autocomplete='tel'/><label for='qdetails'>Project details</label><textarea aria-label='Project details' id='qdetails' name='details' required></textarea><button class='btn pri' type='submit'>Send My Quote Request</button></form><p>{lead['phone']}<br/><small>Demo form routes to secure contact intake endpoint.</small></p></section></div></div></body></html>"""
    (folder / 'index.html').write_text(html, encoding='utf-8')

notes = """# Premium V3 Wave 49 Deployment Notes

Generated: 2026-03-03
Wave folder: `sites/premium-v3-wave49`
Pages built: 5

## Included demos
1. `roofers4u-houston` (nosite-067)
2. `houston-roofing-repairs-houston` (nosite-069)
3. `houston-roofing-contractor-houston` (nosite-070)
4. `jp-roofing-n-gutters-houston` (nosite-071)
5. `j-r-jones-roofing-houston` (nosite-072)

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
- Source leads are from unclaimed/no-direct-channel records; direct business phone numbers were unavailable.
- Contact badge text is set to "Contact via Yelp listing" and should be replaced if verified phone data is obtained.
"""
(wave / 'DEPLOYMENT_NOTES.md').write_text(notes, encoding='utf-8')
print('built', wave)
