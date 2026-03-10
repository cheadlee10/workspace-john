from pathlib import Path

root = Path(r'C:/Users/chead/.openclaw/workspace-john')
wave = root / 'sites' / 'premium-v3-wave54'
wave.mkdir(parents=True, exist_ok=True)

leads = [
    {
        'id': 'nosite-050',
        'business': 'Valley Landscaping',
        'city': 'Phoenix, AZ',
        'phone': '(623) 486-4922',
        'service': 'Landscaping',
        'slug': 'valley-landscaping-phoenix-az',
        'bullets': [
            'Urgency-led hero built for homeowners actively searching for immediate yard and curb-appeal upgrades',
            'Service stack highlights lawn care, trimming, cleanups, irrigation checks, and recurring maintenance plans',
            'Trust section emphasizes local responsiveness, clear scope, and dependable arrival windows',
            'Quote intake captures property size, requested services, and ideal start date for better lead qualification',
        ],
    },
    {
        'id': 'nosite-052',
        'business': 'CC Landscaping',
        'city': 'Phoenix, AZ',
        'phone': '(623) 324-9775',
        'service': 'Landscaping',
        'slug': 'cc-landscaping-phoenix-az',
        'bullets': [
            'Conversion-focused hero positions fast quote response for Phoenix homeowners comparing landscaping providers',
            'Offer modules cover mowing, edging, hardscape refresh, seasonal cleanup, and ongoing yard care packages',
            'Credibility messaging reinforces consistent quality, transparent communication, and reliable project follow-through',
            'Lead form gathers property details, scope priorities, and timeline to improve booked-job conversion',
        ],
    },
    {
        'id': 'nosite-053',
        'business': 'RB Landscaping Service',
        'city': 'Phoenix, AZ',
        'phone': '(480) 540-8509',
        'service': 'Landscaping',
        'slug': 'rb-landscaping-service-phoenix-az',
        'bullets': [
            'High-intent hero messaging targets prospects ready to request pricing and schedule landscaping work now',
            'Core services present yard cleanup, hedge work, desert-friendly planting support, and routine maintenance',
            'Trust-first content highlights local market familiarity, clear expectations, and responsive communication',
            'Detailed quote path captures project goals, property type, and urgency to route stronger opportunities',
        ],
    },
    {
        'id': 'nosite-055',
        'business': 'Tony Handyman Survives',
        'city': 'Phoenix, AZ',
        'phone': '(480) 740-7144',
        'service': 'Handyman Services',
        'slug': 'tony-handyman-survives-phoenix-az',
        'bullets': [
            'Action-first hero is tuned for homeowners needing quick-turn small repairs and maintenance help',
            'Service blocks include drywall patching, fixture installation, door/hardware fixes, and punch-list tasks',
            'Trust section communicates dependable workmanship, clear pricing conversations, and punctual service windows',
            'Quote capture asks repair type, photos/details, and preferred appointment timing for qualified callbacks',
        ],
    },
    {
        'id': 'nosite-056',
        'business': 'Rick The Handyman',
        'city': 'Phoenix, AZ',
        'phone': '(602) 200-4521',
        'service': 'Handyman Services',
        'slug': 'rick-the-handyman-phoenix-az',
        'bullets': [
            'Lead-generation hero focuses on immediate quote requests from homeowners with active repair needs',
            'Offer sections feature general home fixes, carpentry touch-ups, assembly work, and maintenance visits',
            'Trust panel emphasizes communication clarity, on-time arrival, and practical repair recommendations',
            'Form flow gathers job scope, home area impacted, and urgency to prioritize high-intent inquiries',
        ],
    },
]

for lead in leads:
    folder = wave / lead['slug']
    folder.mkdir(parents=True, exist_ok=True)
    lis = ''.join(f"<li>{b}</li>" for b in lead['bullets'])
    html = f"""<!doctype html><html lang='en'><head><meta charset='utf-8'/><meta name='viewport' content='width=device-width, initial-scale=1'/><title>{lead['business']} | Premium Demo</title><style>:root{{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}}*{{box-sizing:border-box}}body{{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}}.wrap{{max-width:1080px;margin:auto;padding:28px 18px}}.grid{{display:grid;gap:14px}}.hero{{grid-template-columns:1.3fr .9fr}}.card{{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}}.chips span{{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}}.btn{{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}}.pri{{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e;border:none;cursor:pointer}}.sec{{border:1px solid #39508c;color:var(--text)}}form{{display:grid;gap:9px}}label{{font-size:13px;color:var(--muted)}}input,textarea{{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}}textarea{{min-height:92px}}ul{{margin:8px 0 0 18px}}li{{margin:7px 0;color:#d9e4ff}}@media(max-width:860px){{.hero,.services{{grid-template-columns:1fr}}}}</style></head><body><div class='wrap'><div class='grid hero'><section class='card'><p style='margin-top:0;color:var(--muted)'>{lead['city']}</p><h1 style='margin:.2rem 0'>{lead['business']} Premium Demo Built to Convert More {lead['service']} Leads</h1><p>Conversion-focused landing page concept designed to increase qualified inbound quote requests and accelerate booked jobs.</p><p><a class='btn pri' href='#quote'>Get My Quote</a> <span class='btn sec'>{lead['phone']}</span></p><div class='chips'><span>Fast Response CTA</span><span>Service-Led Offer Stack</span><span>Trust-First Layout</span></div></section><section class='card'><h2 style='margin-top:0'>Request a Quick Callback</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{lead['slug']}'/><input type='hidden' name='source' value='quick_callback'/><label for='name'>Full Name</label><input aria-label='Full Name' id='name' name='name' type='text' required autocomplete='name'/><label for='phone'>Phone Number</label><input aria-label='Phone Number' id='phone' name='phone' type='tel' required autocomplete='tel'/><button class='btn pri' type='submit'>Request Callback</button></form></section></div><div class='grid services' style='margin-top:12px;grid-template-columns:1fr 1fr'><section class='card'><h2 style='margin-top:0'>Core Services</h2><ul>{lis}</ul></section><section class='card' id='quote'><h2 style='margin-top:0'>Detailed Quote Request</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{lead['slug']}'/><input type='hidden' name='source' value='detailed_quote'/><label for='qname'>Full Name</label><input aria-label='Full Name' id='qname' name='name' type='text' required autocomplete='name'/><label for='qphone'>Phone Number</label><input aria-label='Phone Number' id='qphone' name='phone' type='tel' required autocomplete='tel'/><label for='qdetails'>Project details</label><textarea aria-label='Project details' id='qdetails' name='details' required></textarea><button class='btn pri' type='submit'>Send My Quote Request</button></form><p>{lead['phone']}<br/><small>Demo form routes to secure contact intake endpoint.</small></p></section></div></div></body></html>"""
    (folder / 'index.html').write_text(html, encoding='utf-8')

notes = """# Premium V3 Wave 54 Deployment Notes

Generated: 2026-03-03
Wave folder: `sites/premium-v3-wave54`
Pages built: 5

## Included demos
1. `valley-landscaping-phoenix-az` (nosite-050)
2. `cc-landscaping-phoenix-az` (nosite-052)
3. `rb-landscaping-service-phoenix-az` (nosite-053)
4. `tony-handyman-survives-phoenix-az` (nosite-055)
5. `rick-the-handyman-phoenix-az` (nosite-056)

## Selection rationale
- Pulled from highest-intent uncovered no-website records still not represented by an existing site slug.
- Prioritized outreach-usable Phoenix leads with direct phone contacts and clear quote-ready home-service demand.

## Endpoint convention used
- Both forms post to: `/contact`
- Hidden fields:
  - `business=<slug>`
  - `source=quick_callback` or `source=detailed_quote`

## Deployment checklist
- Publish each slug folder as static route under the demo host.
- Verify `/contact` handler accepts POST fields: `name`, `phone`, optional `details`, `business`, `source`.
- Confirm CRM or notifier routing maps the five new slugs to lead records.
- Smoke test both forms on each page after deployment.

## Blockers / risks
- Static build pass only; no live endpoint posting validation run in this task.
"""
(wave / 'DEPLOYMENT_NOTES.md').write_text(notes, encoding='utf-8')

print('Built', wave)
for l in leads:
    print('-', l['slug'])
