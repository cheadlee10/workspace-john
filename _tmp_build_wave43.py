from pathlib import Path

root = Path(r"C:/Users/chead/.openclaw/workspace-john")
wave = root / "sites" / "premium-v3-wave43"
wave.mkdir(parents=True, exist_ok=True)

leads = [
    {
        "slug": "regal-roofing-contracting-seattle-wa",
        "business": "Regal Roofing & Contracting",
        "city": "Seattle, WA",
        "service": "Roofing & Exterior Contracting",
        "phone": "(206) 784-2689",
        "value": 1500,
        "id": "nosite-037",
        "tier": "P2",
        "score": 78,
        "bullets": [
            "Emergency leak and storm-damage CTA path designed for same-day call intent",
            "Service stack for roof repairs, full replacement, inspections, and exterior upgrades",
            "Trust section emphasizing licensed crews, warranty-backed installs, and clean-site standards",
            "Quote intake captures roof type, issue severity, and preferred inspection date",
        ],
    },
    {
        "slug": "tt-t-general-contractor-renton-wa",
        "business": "TT & T General Contractor",
        "city": "Renton, WA",
        "service": "General Contracting",
        "phone": "",
        "value": 1200,
        "id": "nosite-016",
        "tier": "P2",
        "score": 76,
        "bullets": [
            "Homeowner-focused hero CTA for remodels, additions, and structural improvement leads",
            "Service sections for kitchen and bath renovation, framing, flooring, and painting",
            "Authority copy around permit-aware workflows and milestone-based project communication",
            "Detailed form prompts for project scope, property type, and target kickoff window",
        ],
    },
    {
        "slug": "ou-construction-kirkland-wa",
        "business": "OU Construction",
        "city": "Kirkland, WA",
        "service": "Construction & Handyman",
        "phone": "",
        "value": 1000,
        "id": "nosite-011",
        "tier": "P2",
        "score": 74,
        "bullets": [
            "Conversion-first CTA tailored to homeowners needing fast bids on repair and upgrade work",
            "Service grouping for remodel support, carpentry, drywall/paint, and exterior fixes",
            "Trust architecture built around responsive scheduling and transparent scope definition",
            "Lead form captures project category, urgency, and rough budget to speed qualification",
        ],
    },
    {
        "slug": "seattle-remodeling-handyman-pro-s-seattle-wa",
        "business": "Seattle Remodeling & Handyman Pro's",
        "city": "Seattle, WA",
        "service": "Remodeling & Handyman",
        "phone": "",
        "value": 1000,
        "id": "nosite-047",
        "tier": "P2",
        "score": 73,
        "bullets": [
            "High-intent hero offer for remodeling inquiries and recurring home repair projects",
            "Service cards for interior renovation, fixture installs, punch-list completion, and maintenance",
            "Credibility section highlighting workmanship consistency and streamlined customer communication",
            "Quote capture flow asks for room/area, work details, and desired completion timeline",
        ],
    },
    {
        "slug": "abc-nursery-and-landscaping-auburn-wa",
        "business": "ABC Nursery and Landscaping",
        "city": "Auburn, WA",
        "service": "Landscaping & Nursery",
        "phone": "",
        "value": 900,
        "id": "nosite-029",
        "tier": "P2",
        "score": 72,
        "bullets": [
            "Seasonal landscaping CTA optimized for design-build and ongoing yard care lead capture",
            "Service lineup for plant sourcing, installation, sod, irrigation tune-ups, and cleanups",
            "Trust section positioning nursery-backed expertise with local climate-aware recommendations",
            "Detailed quote form gathers property size, desired services, and preferred site-visit timeframe",
        ],
    },
]

base_css = ":root{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}*{box-sizing:border-box}body{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}.wrap{max-width:1080px;margin:auto;padding:28px 18px}.grid{display:grid;gap:14px}.hero{grid-template-columns:1.3fr .9fr}.card{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}.chips span{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}.btn{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}.pri{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e}.sec{border:1px solid #39508c;color:var(--text)}form{display:grid;gap:9px}label{font-size:13px;color:var(--muted)}input,textarea{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}textarea{min-height:92px}ul{margin:8px 0 0 18px}li{margin:7px 0;color:#d9e4ff}@media(max-width:860px){.hero,.services{grid-template-columns:1fr}}"

for lead in leads:
    d = wave / lead["slug"]
    d.mkdir(parents=True, exist_ok=True)
    dial = lead["phone"].replace('(', '').replace(')', '').replace(' ', '').replace('-', '')
    phone_cta = f"<a class='btn sec' href='tel:{dial}'>Call {lead['phone']}</a>" if lead["phone"] else "<span class='btn sec'>Phone not publicly listed</span>"
    contact_line = f"<a href='tel:{dial}' style='color:#9dd2ff;text-decoration:none;font-weight:700'>Call {lead['phone']}</a>" if lead["phone"] else "Phone not publicly listed"
    bullets_html = ''.join(f"<li>{b}</li>" for b in lead['bullets'])
    html = f"<!doctype html><html lang='en'><head><meta charset='utf-8'/><meta name='viewport' content='width=device-width, initial-scale=1'/><title>{lead['business']} | Premium Demo</title><style>{base_css}</style></head><body><div class='wrap'><div class='grid hero'><section class='card'><p style='margin-top:0;color:var(--muted)'>{lead['city']}</p><h1 style='margin:.2rem 0'>{lead['business']} Premium Demo Built to Convert More {lead['service']} Leads</h1><p>Conversion-focused landing page concept designed to increase qualified inbound quote requests and accelerate booked jobs.</p><p><a class='btn pri' href='#quote'>Get My Quote</a> {phone_cta}</p><div class='chips'><span>Fast Response CTA</span><span>Service-Led Offer Stack</span><span>Trust-First Layout</span></div></section><section class='card'><h2 style='margin-top:0'>Request a Quick Callback</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{lead['slug']}'/><input type='hidden' name='source' value='quick_callback'/><label for='name'>Full Name</label><input aria-label='Full Name' id='name' name='name' type='text' required autocomplete='name'/><label for='phone'>Phone Number</label><input aria-label='Phone Number' id='phone' name='phone' type='tel' required autocomplete='tel'/><button class='btn pri' type='submit'>Request Callback</button></form></section></div><div class='grid services' style='margin-top:12px;grid-template-columns:1fr 1fr'><section class='card'><h2 style='margin-top:0'>Core Services</h2><ul>{bullets_html}</ul></section><section class='card' id='quote'><h2 style='margin-top:0'>Detailed Quote Request</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{lead['slug']}'/><input type='hidden' name='source' value='detailed_quote'/><label for='qname'>Full Name</label><input aria-label='Full Name' id='qname' name='name' type='text' required autocomplete='name'/><label for='qphone'>Phone Number</label><input aria-label='Phone Number' id='qphone' name='phone' type='tel' required autocomplete='tel'/><label for='qdetails'>Project details</label><textarea aria-label='Project details' id='qdetails' name='details' required></textarea><button class='btn pri' type='submit'>Send My Quote Request</button></form><p>{contact_line} | Email not publicly listed<br/><small>Demo form routes to secure contact intake endpoint.</small></p></section></div></div></body></html>"
    (d / "index.html").write_text(html, encoding="utf-8")

notes = """# Premium V3 Wave 43 - Deployment Notes

Date: 2026-03-03
Wave Folder: sites/premium-v3-wave43

## Built Pages (highest-priority uncovered leads)
1. regal-roofing-contracting-seattle-wa (est. $1500, outreach ID: nosite-037, tier: P2, score: 78, service: Roofing & Exterior Contracting)
2. tt-t-general-contractor-renton-wa (est. $1200, outreach ID: nosite-016, tier: P2, score: 76, service: General Contracting)
3. ou-construction-kirkland-wa (est. $1000, outreach ID: nosite-011, tier: P2, score: 74, service: Construction & Handyman)
4. seattle-remodeling-handyman-pro-s-seattle-wa (est. $1000, outreach ID: nosite-047, tier: P2, score: 73, service: Remodeling & Handyman)
5. abc-nursery-and-landscaping-auburn-wa (est. $900, outreach ID: nosite-029, tier: P2, score: 72, service: Landscaping & Nursery)

## Selection Notes
- Source file: leads.jsonl (`nosite-*` segment)
- Selection criteria: highest estimated value uncovered leads not already present in existing `sites/` slugs.
- Slug convention used: `business-city-state` (normalized lowercase hyphenation).

## Conversion Structure Included
- Hero with clear primary CTA (`Get My Quote`) and fallback secondary CTA handling
- Above-the-fold quick callback form
- Service-specific core services section
- Detailed quote form with project detail capture field
- Contact reinforcement row with non-fabricated contact handling

## Form Endpoint Convention
- All forms post to the current endpoint convention: `/contact`
- Hidden metadata fields included on every form:
  - `business` = page slug
  - `source` = `quick_callback` or `detailed_quote`

## Known Blockers / Follow-ups
1. Direct phone numbers are unavailable on 4 of 5 selected leads; pages intentionally show `Phone not publicly listed`.
2. Public email unavailable for all 5 selected leads; pages intentionally show `Email not publicly listed`.
3. `/contact` intake backend routing (CRM owner assignment + notifications) is still pending final confirmation.
4. Analytics events for CTA clicks/form submits are not yet embedded on-page.
5. Production deployment aliases and DNS/path mapping for wave43 are pending deploy config.
"""
(wave / "DEPLOYMENT_NOTES.md").write_text(notes, encoding="utf-8")

print('built', len(leads), 'pages in', wave)
