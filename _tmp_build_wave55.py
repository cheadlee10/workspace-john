from pathlib import Path

root = Path(r'C:/Users/chead/.openclaw/workspace-john')
wave = root / 'sites' / 'premium-v3-wave55'
wave.mkdir(parents=True, exist_ok=True)

leads = [
    {
        'id': 'wa-google-001',
        'business': 'PNW Landscaping & Services',
        'city': 'Seattle, WA',
        'phone': '(206) 922-9440',
        'service': 'Landscaping',
        'slug': 'pnw-landscaping-services-seattle-wa',
        'bullets': [
            'Local-intent hero is built to convert Seattle homeowners comparing landscaping providers this week',
            'Service stack highlights mowing, edging, cleanups, planting support, and recurring maintenance packages',
            'Trust section reinforces responsive communication, clear scope, and reliable service windows',
            'Quote flow captures property size, target services, and start-date urgency for qualified callbacks',
        ],
    },
    {
        'id': 'wa-google-003',
        'business': "Joc's Landscaping",
        'city': 'Everett, WA',
        'phone': '(425) 791-1800',
        'service': 'Landscaping & Lawn Care',
        'slug': 'joc-s-landscaping-everett-wa',
        'bullets': [
            'Conversion-first hero targets homeowners actively searching for dependable Everett lawn and yard service',
            'Offer blocks include mowing, hedge trimming, debris cleanup, and scheduled lawn-care programs',
            'Credibility messaging emphasizes consistency, timely arrivals, and practical property care recommendations',
            'Detailed intake captures lawn condition, access notes, and timeline to prioritize ready-to-book leads',
        ],
    },
    {
        'id': 'wa-google-006',
        'business': "Keith's Lawn & Landscape",
        'city': 'Spokane, WA',
        'phone': '(509) 466-5938',
        'service': 'Lawn & Landscape',
        'slug': 'keith-s-lawn-landscape-spokane-wa',
        'bullets': [
            'Urgency-led hero focuses on quote requests from Spokane homeowners needing immediate lawn improvements',
            'Service modules cover mowing, edging, seasonal cleanup, bed refresh, and routine maintenance visits',
            'Trust panel highlights local familiarity, straightforward communication, and dependable follow-through',
            'Lead form gathers property type, service priorities, and preferred timing for stronger booking quality',
        ],
    },
    {
        'id': 'wa-google-004',
        'business': 'Family Lawn Services',
        'city': 'Everett, WA',
        'phone': '(360) 961-2955',
        'service': 'Lawn Care',
        'slug': 'family-lawn-services-everett-wa',
        'bullets': [
            'High-intent hero positions fast response for homeowners requesting recurring lawn service quotes',
            'Core offerings present mowing, trimming, yard cleanup, and scheduled maintenance plan options',
            'Trust-first section communicates dependable care, transparent scope, and respectful property handling',
            'Quote capture asks lot size, lawn issues, and ideal service cadence to route best-fit inquiries',
        ],
    },
    {
        'id': 'wa-google-007',
        'business': 'The Honest Handyman & Hauling LLC',
        'city': 'Vancouver, WA',
        'phone': '(503) 765-2489',
        'service': 'Handyman Services',
        'slug': 'the-honest-handyman-hauling-llc-vancouver-wa',
        'bullets': [
            'Action-oriented hero is tuned for homeowners ready to book repair and hauling help quickly',
            'Service sections include punch-list repairs, fixture installs, light carpentry, and junk-haul support',
            'Trust messaging reinforces on-time communication, practical workmanship, and clear expectations',
            'Detailed quote path collects task scope, photos/details, and scheduling urgency for qualified jobs',
        ],
    },
]

for lead in leads:
    folder = wave / lead['slug']
    folder.mkdir(parents=True, exist_ok=True)
    lis = ''.join(f"<li>{b}</li>" for b in lead['bullets'])
    html = f"""<!doctype html><html lang='en'><head><meta charset='utf-8'/><meta name='viewport' content='width=device-width, initial-scale=1'/><title>{lead['business']} | Premium Demo</title><style>:root{{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}}*{{box-sizing:border-box}}body{{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}}.wrap{{max-width:1080px;margin:auto;padding:28px 18px}}.grid{{display:grid;gap:14px}}.hero{{grid-template-columns:1.3fr .9fr}}.card{{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}}.chips span{{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}}.btn{{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}}.pri{{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e;border:none;cursor:pointer}}.sec{{border:1px solid #39508c;color:var(--text)}}form{{display:grid;gap:9px}}label{{font-size:13px;color:var(--muted)}}input,textarea{{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}}textarea{{min-height:92px}}ul{{margin:8px 0 0 18px}}li{{margin:7px 0;color:#d9e4ff}}@media(max-width:860px){{.hero,.services{{grid-template-columns:1fr}}}}</style></head><body><div class='wrap'><div class='grid hero'><section class='card'><p style='margin-top:0;color:var(--muted)'>{lead['city']}</p><h1 style='margin:.2rem 0'>{lead['business']} Premium Demo Built to Convert More {lead['service']} Leads</h1><p>Conversion-focused landing page concept designed to increase qualified inbound quote requests and accelerate booked jobs.</p><p><a class='btn pri' href='#quote'>Get My Quote</a> <span class='btn sec'>{lead['phone']}</span></p><div class='chips'><span>Fast Response CTA</span><span>Service-Led Offer Stack</span><span>Trust-First Layout</span></div></section><section class='card'><h2 style='margin-top:0'>Request a Quick Callback</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{lead['slug']}'/><input type='hidden' name='source' value='quick_callback'/><label for='name'>Full Name</label><input aria-label='Full Name' id='name' name='name' type='text' required autocomplete='name'/><label for='phone'>Phone Number</label><input aria-label='Phone Number' id='phone' name='phone' type='tel' required autocomplete='tel'/><button class='btn pri' type='submit'>Request Callback</button></form></section></div><div class='grid services' style='margin-top:12px;grid-template-columns:1fr 1fr'><section class='card'><h2 style='margin-top:0'>Core Services</h2><ul>{lis}</ul></section><section class='card' id='quote'><h2 style='margin-top:0'>Detailed Quote Request</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{lead['slug']}'/><input type='hidden' name='source' value='detailed_quote'/><label for='qname'>Full Name</label><input aria-label='Full Name' id='qname' name='name' type='text' required autocomplete='name'/><label for='qphone'>Phone Number</label><input aria-label='Phone Number' id='qphone' name='phone' type='tel' required autocomplete='tel'/><label for='qdetails'>Project details</label><textarea aria-label='Project details' id='qdetails' name='details' required></textarea><button class='btn pri' type='submit'>Send My Quote Request</button></form><p>{lead['phone']}<br/><small>Demo form routes to secure contact intake endpoint.</small></p></section></div></div></body></html>"""
    (folder / 'index.html').write_text(html, encoding='utf-8')

notes = """# Premium V3 Wave 55 Deployment Notes

Generated: 2026-03-03
Wave folder: `sites/premium-v3-wave55`
Pages built: 5

## Included demos
1. `pnw-landscaping-services-seattle-wa` (wa-google-001)
2. `joc-s-landscaping-everett-wa` (wa-google-003)
3. `keith-s-lawn-landscape-spokane-wa` (wa-google-006)
4. `family-lawn-services-everett-wa` (wa-google-004)
5. `the-honest-handyman-hauling-llc-vancouver-wa` (wa-google-007)

## Selection rationale
- Chosen as highest-intent uncovered leads remaining outside previously generated premium-v3 wave slug coverage.
- Prioritized local home-service categories with direct phone contact and immediate quote-ready demand.

## Endpoint convention used
- Both forms post to: `/contact`
- Hidden fields:
  - `business=<slug>`
  - `source=quick_callback` or `source=detailed_quote`

## Deployment checklist
- Publish each slug folder as static route under the demo host.
- Verify `/contact` handler accepts POST fields: `name`, `phone`, optional `details`, `business`, `source`.
- Confirm notifier/CRM routing maps each new slug to its lead record ID.
- Smoke test quick callback + detailed quote submission for all five pages.

## Blockers / risks
- Static artifact build only; no live `/contact` endpoint integration test run in this task.
"""
(wave / 'DEPLOYMENT_NOTES.md').write_text(notes, encoding='utf-8')

print('Built', wave)
for l in leads:
    print('-', l['slug'])
