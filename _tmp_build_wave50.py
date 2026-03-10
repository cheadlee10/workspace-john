from pathlib import Path

root = Path(r'C:/Users/chead/.openclaw/workspace-john')
wave = root / 'sites' / 'premium-v3-wave50'
wave.mkdir(parents=True, exist_ok=True)

leads = [
    {
        'id': 'NS001',
        'business': 'Valle Landscaping',
        'city': 'Phoenix, AZ',
        'phone': 'Contact via listing',
        'service': 'Landscaping',
        'slug': 'valle-landscaping-phoenix-az',
        'bullets': [
            'High-conversion hero positions fast landscaping estimates for homeowners ready to book this week',
            'Service blocks emphasize lawn installs, irrigation tune-ups, desert-friendly planting, and cleanup packages',
            'Trust section highlights reliable scheduling, clean jobsite standards, and straightforward quote expectations',
            'Quote funnel captures yard size, service priority, and timeline to prioritize close-ready inbound calls',
        ],
    },
    {
        'id': 'NS005',
        'business': "Jose\'s Landscaping",
        'city': 'Phoenix, AZ',
        'phone': 'Contact via listing',
        'service': 'Landscaping',
        'slug': 'jose-s-landscaping-phoenix-az',
        'bullets': [
            'Premium local-service hero frames seasonal yard upgrades with immediate quote CTA placement',
            'Offer stack covers lawn maintenance, mulch refresh, shrub trimming, and one-time property cleanups',
            'Credibility modules reinforce dependable communication, on-time arrivals, and transparent scope approvals',
            'Lead form requests property type, current issues, and preferred start date for higher-intent callbacks',
        ],
    },
    {
        'id': 'NS004',
        'business': 'MasterAZScapes',
        'city': 'Phoenix, AZ',
        'phone': 'Contact via listing',
        'service': 'Landscape Design & Build',
        'slug': 'masterazscapes-phoenix-az',
        'bullets': [
            'Design-build focused hero targets homeowners planning premium outdoor upgrades in the next 30 days',
            'Service narrative showcases paver patios, turf installs, lighting accents, and drought-smart landscape plans',
            'Authority strip supports premium positioning with process clarity from consultation through final walkthrough',
            'Detailed intake asks project goals, budget range, and target completion window to improve lead quality',
        ],
    },
    {
        'id': 'NS110',
        'business': 'Divine Design Landscaping Phoenix',
        'city': 'Phoenix, AZ',
        'phone': 'Contact via listing',
        'service': 'Landscaping',
        'slug': 'divine-design-landscaping-phoenix-phoenix-az',
        'bullets': [
            'Conversion-oriented hero highlights curb-appeal upgrades with same-day consultation request pathway',
            'Core services feature planting design, rock installs, irrigation repair, and recurring maintenance options',
            'Trust framework emphasizes local expertise, photo-ready results, and simple approval-to-schedule handoff',
            'Quote form gathers lot details, desired services, and urgency for faster sales follow-up',
        ],
    },
    {
        'id': 'NS064',
        'business': "Colorado\'s Best Fence Company",
        'city': 'Denver, CO',
        'phone': 'Contact via listing',
        'service': 'Fence Installation & Repair',
        'slug': 'colorado-s-best-fence-company-denver-co',
        'bullets': [
            'Fence-conversion hero built for homeowners comparing installers and requesting project quotes now',
            'Service cards cover wood, vinyl, chain-link, gate installs, and storm or wear-and-tear repair work',
            'Trust messaging supports buying confidence with warranty language, clean workmanship, and clear timelines',
            'Lead capture requests fence length, material preference, and HOA constraints to accelerate close rates',
        ],
    },
]

for lead in leads:
    folder = wave / lead['slug']
    folder.mkdir(parents=True, exist_ok=True)
    lis = ''.join(f"<li>{b}</li>" for b in lead['bullets'])
    html = f"""<!doctype html><html lang='en'><head><meta charset='utf-8'/><meta name='viewport' content='width=device-width, initial-scale=1'/><title>{lead['business']} | Premium Demo</title><style>:root{{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}}*{{box-sizing:border-box}}body{{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}}.wrap{{max-width:1080px;margin:auto;padding:28px 18px}}.grid{{display:grid;gap:14px}}.hero{{grid-template-columns:1.3fr .9fr}}.card{{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}}.chips span{{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}}.btn{{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}}.pri{{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e;border:none;cursor:pointer}}.sec{{border:1px solid #39508c;color:var(--text)}}form{{display:grid;gap:9px}}label{{font-size:13px;color:var(--muted)}}input,textarea{{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}}textarea{{min-height:92px}}ul{{margin:8px 0 0 18px}}li{{margin:7px 0;color:#d9e4ff}}@media(max-width:860px){{.hero,.services{{grid-template-columns:1fr}}}}</style></head><body><div class='wrap'><div class='grid hero'><section class='card'><p style='margin-top:0;color:var(--muted)'>{lead['city']}</p><h1 style='margin:.2rem 0'>{lead['business']} Premium Demo Built to Convert More {lead['service']} Leads</h1><p>Conversion-focused landing page concept designed to increase qualified inbound quote requests and accelerate booked jobs.</p><p><a class='btn pri' href='#quote'>Get My Quote</a> <span class='btn sec'>{lead['phone']}</span></p><div class='chips'><span>Fast Response CTA</span><span>Service-Led Offer Stack</span><span>Trust-First Layout</span></div></section><section class='card'><h2 style='margin-top:0'>Request a Quick Callback</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{lead['slug']}'/><input type='hidden' name='source' value='quick_callback'/><label for='name'>Full Name</label><input aria-label='Full Name' id='name' name='name' type='text' required autocomplete='name'/><label for='phone'>Phone Number</label><input aria-label='Phone Number' id='phone' name='phone' type='tel' required autocomplete='tel'/><button class='btn pri' type='submit'>Request Callback</button></form></section></div><div class='grid services' style='margin-top:12px;grid-template-columns:1fr 1fr'><section class='card'><h2 style='margin-top:0'>Core Services</h2><ul>{lis}</ul></section><section class='card' id='quote'><h2 style='margin-top:0'>Detailed Quote Request</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{lead['slug']}'/><input type='hidden' name='source' value='detailed_quote'/><label for='qname'>Full Name</label><input aria-label='Full Name' id='qname' name='name' type='text' required autocomplete='name'/><label for='qphone'>Phone Number</label><input aria-label='Phone Number' id='qphone' name='phone' type='tel' required autocomplete='tel'/><label for='qdetails'>Project details</label><textarea aria-label='Project details' id='qdetails' name='details' required></textarea><button class='btn pri' type='submit'>Send My Quote Request</button></form><p>{lead['phone']}<br/><small>Demo form routes to secure contact intake endpoint.</small></p></section></div></div></body></html>"""
    (folder / 'index.html').write_text(html, encoding='utf-8')

notes = """# Premium V3 Wave 50 Deployment Notes

Generated: 2026-03-03
Wave folder: `sites/premium-v3-wave50`
Pages built: 5

## Included demos
1. `valle-landscaping-phoenix-az` (NS001)
2. `jose-s-landscaping-phoenix-az` (NS005)
3. `masterazscapes-phoenix-az` (NS004)
4. `divine-design-landscaping-phoenix-phoenix-az` (NS110)
5. `colorado-s-best-fence-company-denver-co` (NS064)

## Selection rationale
- Chosen from uncovered highest-intent records in `nosite_top20_leads.jsonl` (priority=1 cohort).
- Focused on service categories with strong quote intent (landscaping and fence installation).

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
- Public listing-based placeholders are used where direct business phone numbers were unavailable.
"""
(wave / 'DEPLOYMENT_NOTES.md').write_text(notes, encoding='utf-8')

print('Built', wave)
for l in leads:
    print('-', l['slug'])
