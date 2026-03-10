from pathlib import Path

root = Path(r'C:/Users/chead/.openclaw/workspace-john')
wave = root / 'sites' / 'premium-v3-wave52'
wave.mkdir(parents=True, exist_ok=True)

leads = [
    {
        'id': 'NS016',
        'business': 'ASAP Auto Repair Austin',
        'city': 'Austin, TX',
        'phone': '512-832-5800',
        'service': 'Mobile Auto Repair',
        'slug': 'asap-auto-repair-austin-austin-tx',
        'bullets': [
            'Urgency-first hero is tuned for same-day mobile repair intent and high-conversion call-to-quote traffic',
            'Offer stack highlights diagnostics, battery and starter replacement, brake service, and on-site troubleshooting',
            'Trust section emphasizes mobile convenience, transparent recommendations, and reduced vehicle downtime',
            'Quote flow captures vehicle issue, location, and preferred service window for faster dispatch-ready leads',
        ],
    },
    {
        'id': 'NS069',
        'business': 'Orlando Lawn Mowing Today',
        'city': 'Orlando, FL',
        'phone': '407-600-6881',
        'service': 'Lawn Care',
        'slug': 'orlando-lawn-mowing-today-orlando-fl',
        'bullets': [
            'Conversion-focused hero targets homeowners searching for immediate lawn service and fast callback confirmation',
            'Service modules cover mowing, edging, cleanup, recurring schedules, and same-day availability positioning',
            'Credibility panel reinforces local coverage consistency and reliable appointment windows for repeat clients',
            'Detailed quote intake collects property size, service frequency, and gate/access notes to qualify jobs',
        ],
    },
    {
        'id': 'NS070',
        'business': 'Affordable Lawn Care Orlando',
        'city': 'Orlando, FL',
        'phone': '(407) 951-0206',
        'service': 'Landscaping',
        'slug': 'affordable-lawn-care-orlando-orlando-fl',
        'bullets': [
            'Price-value hero frames affordable packages with prominent quote CTA to convert comparison shoppers',
            'Core offerings include mowing, trimming, yard cleanup, weed control, and routine maintenance bundles',
            'Trust messaging highlights responsiveness, clear service scope, and dependable follow-through for homeowners',
            'Lead form gathers lawn condition, preferred schedule, and urgency to improve booking quality',
        ],
    },
    {
        'id': 'NS011',
        'business': 'Tams Cleaning Solutions',
        'city': 'Chicago, IL',
        'phone': '(708) 295-6401',
        'service': 'Residential Cleaning',
        'slug': 'tams-cleaning-solutions-chicago-il',
        'bullets': [
            'Trust-led cleaning hero is crafted to convert homeowners requesting dependable recurring house cleaning',
            'Service tiers present standard cleans, deep cleans, move-in/out support, and customizable room priorities',
            'Social-proof style section reinforces professionalism, consistency, and respectful in-home service standards',
            'Quote request captures home size, target rooms, and preferred frequency for better-fit client intake',
        ],
    },
    {
        'id': 'NS052',
        'business': 'Lorena House Cleaner San Diego',
        'city': 'San Diego, CA',
        'phone': '(619) 908-0056',
        'service': 'House Cleaning',
        'slug': 'lorena-house-cleaner-san-diego-san-diego-ca',
        'bullets': [
            'Bilingual-friendly hero supports fast quote capture from local homeowners ready to schedule cleaning now',
            'Offer blocks feature recurring cleans, deep sanitation, kitchen and bath focus, and move-out prep',
            'Trust section communicates detail-oriented execution, flexible scheduling, and clear communication',
            'Detailed intake asks home type, cleaning priorities, and timeframe to accelerate qualified bookings',
        ],
    },
]

for lead in leads:
    folder = wave / lead['slug']
    folder.mkdir(parents=True, exist_ok=True)
    lis = ''.join(f"<li>{b}</li>" for b in lead['bullets'])
    html = f"""<!doctype html><html lang='en'><head><meta charset='utf-8'/><meta name='viewport' content='width=device-width, initial-scale=1'/><title>{lead['business']} | Premium Demo</title><style>:root{{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}}*{{box-sizing:border-box}}body{{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}}.wrap{{max-width:1080px;margin:auto;padding:28px 18px}}.grid{{display:grid;gap:14px}}.hero{{grid-template-columns:1.3fr .9fr}}.card{{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}}.chips span{{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}}.btn{{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}}.pri{{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e;border:none;cursor:pointer}}.sec{{border:1px solid #39508c;color:var(--text)}}form{{display:grid;gap:9px}}label{{font-size:13px;color:var(--muted)}}input,textarea{{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}}textarea{{min-height:92px}}ul{{margin:8px 0 0 18px}}li{{margin:7px 0;color:#d9e4ff}}@media(max-width:860px){{.hero,.services{{grid-template-columns:1fr}}}}</style></head><body><div class='wrap'><div class='grid hero'><section class='card'><p style='margin-top:0;color:var(--muted)'>{lead['city']}</p><h1 style='margin:.2rem 0'>{lead['business']} Premium Demo Built to Convert More {lead['service']} Leads</h1><p>Conversion-focused landing page concept designed to increase qualified inbound quote requests and accelerate booked jobs.</p><p><a class='btn pri' href='#quote'>Get My Quote</a> <span class='btn sec'>{lead['phone']}</span></p><div class='chips'><span>Fast Response CTA</span><span>Service-Led Offer Stack</span><span>Trust-First Layout</span></div></section><section class='card'><h2 style='margin-top:0'>Request a Quick Callback</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{lead['slug']}'/><input type='hidden' name='source' value='quick_callback'/><label for='name'>Full Name</label><input aria-label='Full Name' id='name' name='name' type='text' required autocomplete='name'/><label for='phone'>Phone Number</label><input aria-label='Phone Number' id='phone' name='phone' type='tel' required autocomplete='tel'/><button class='btn pri' type='submit'>Request Callback</button></form></section></div><div class='grid services' style='margin-top:12px;grid-template-columns:1fr 1fr'><section class='card'><h2 style='margin-top:0'>Core Services</h2><ul>{lis}</ul></section><section class='card' id='quote'><h2 style='margin-top:0'>Detailed Quote Request</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{lead['slug']}'/><input type='hidden' name='source' value='detailed_quote'/><label for='qname'>Full Name</label><input aria-label='Full Name' id='qname' name='name' type='text' required autocomplete='name'/><label for='qphone'>Phone Number</label><input aria-label='Phone Number' id='qphone' name='phone' type='tel' required autocomplete='tel'/><label for='qdetails'>Project details</label><textarea aria-label='Project details' id='qdetails' name='details' required></textarea><button class='btn pri' type='submit'>Send My Quote Request</button></form><p>{lead['phone']}<br/><small>Demo form routes to secure contact intake endpoint.</small></p></section></div></div></body></html>"""
    (folder / 'index.html').write_text(html, encoding='utf-8')

notes = """# Premium V3 Wave 52 Deployment Notes

Generated: 2026-03-03
Wave folder: `sites/premium-v3-wave52`
Pages built: 5

## Included demos
1. `asap-auto-repair-austin-austin-tx` (NS016)
2. `orlando-lawn-mowing-today-orlando-fl` (NS069)
3. `affordable-lawn-care-orlando-orlando-fl` (NS070)
4. `tams-cleaning-solutions-chicago-il` (NS011)
5. `lorena-house-cleaner-san-diego-san-diego-ca` (NS052)

## Selection rationale
- Chosen from highest-intent uncovered records remaining in `nosite_top20_leads.jsonl` after prior premium wave builds.
- Prioritized urgent/mobile service categories with strong quote intent: auto repair, lawn care, and cleaning.

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
