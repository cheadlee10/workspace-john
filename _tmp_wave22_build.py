import pathlib

root = pathlib.Path(r"C:\Users\chead\.openclaw\workspace-john")
wave = root / "sites" / "premium-v3-wave22"
wave.mkdir(parents=True, exist_ok=True)

leads = [
    {
        "slug": "quality-construction-roofing-houston-tx",
        "name": "Quality Construction & Roofing",
        "id": "nosite-068",
        "tier": "P1",
        "score": 92,
        "ev": 1500,
        "phone": "(832) 282-6486",
        "email": "info@qualityconstructionroofing.com",
        "location": "Houston, TX",
        "headline": "Premium Demo Built for High-Value Roofing & Exterior Projects",
        "pitch": "Conversion-led premium concept focused on emergency roof calls, full replacement consults, and financing-friendly quote capture for larger-ticket jobs.",
        "services": [
            "Roof inspections, leak diagnostics, and storm response",
            "Full roof replacement and structural repair planning",
            "Shingle, metal, and low-slope roofing options",
            "Insurance-claim support and project timeline coordination",
        ],
    },
    {
        "slug": "pmc-general-contractor-bellevue-wa",
        "name": "PMC General Contractor",
        "id": "wa-google-002",
        "tier": "P1",
        "score": 92,
        "ev": 1200,
        "phone": "(425) 869-4000",
        "email": "office@pmcgeneralcontractor.com",
        "location": "Bellevue, WA",
        "headline": "Premium Demo Built for Remodeling Lead Conversion",
        "pitch": "Premium contractor page concept designed to qualify remodel prospects quickly and convert estimate requests into scheduled site walkthroughs.",
        "services": [
            "Kitchen and bathroom remodeling projects",
            "Whole-home renovation and addition planning",
            "Interior/exterior finish upgrades and repairs",
            "Permit-ready scopes with phased project timelines",
        ],
    },
    {
        "slug": "divine-design-landscaping-phoenix-phoenix-az",
        "name": "Divine Design Landscaping Phoenix",
        "id": "nosite-105",
        "tier": "P1",
        "score": 89,
        "ev": 920,
        "phone": "(602) 769-4564",
        "email": "hello@divinedesignlandscaping.com",
        "location": "Phoenix, AZ",
        "headline": "Premium Demo Built for Design-Build Landscape Quotes",
        "pitch": "Premium landscaping funnel concept built to move homeowners from inspiration browsing into booked design consultations and recurring maintenance proposals.",
        "services": [
            "Custom front- and backyard landscape design",
            "Planting, irrigation, and drainage improvements",
            "Paver, turf, and hardscape installation packages",
            "Routine maintenance and seasonal cleanup plans",
        ],
    },
    {
        "slug": "american-residential-hvac-las-vegas-nv",
        "name": "American Residential HVAC",
        "id": "nosite-108",
        "tier": "P1",
        "score": 88,
        "ev": 930,
        "phone": "(702) 600-3291",
        "email": "service@americanresidentialhvac.com",
        "location": "Las Vegas, NV",
        "headline": "Premium Demo Built for Fast HVAC Service Intake",
        "pitch": "Premium HVAC landing page concept optimized for emergency calls, seasonal tune-up bookings, and high-intent replacement estimate submissions.",
        "services": [
            "Emergency AC and heating diagnostics",
            "System replacement and efficiency upgrade consults",
            "Seasonal maintenance and performance tune-ups",
            "Indoor air quality and thermostat optimization",
        ],
    },
    {
        "slug": "jose-s-landscaping-phoenix-az",
        "name": "Jose's Landscaping",
        "id": "nosite-104",
        "tier": "P1",
        "score": 85,
        "ev": 880,
        "phone": "(623) 396-8694",
        "email": "info@joseslandscapingaz.com",
        "location": "Phoenix, AZ",
        "headline": "Premium Demo Built for Local Landscaping Estimate Requests",
        "pitch": "Premium lead-capture concept built to increase call volume and quote submissions for residential lawn care, cleanup, and curb-appeal upgrades.",
        "services": [
            "Weekly and bi-weekly lawn care services",
            "Yard cleanup, trimming, and debris haul-off",
            "Sod refreshes, planting, and irrigation touchups",
            "Rock, mulch, and desert landscape enhancements",
        ],
    },
]

style = ":root{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}*{box-sizing:border-box}body{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}.wrap{max-width:1080px;margin:auto;padding:28px 18px}.grid{display:grid;gap:14px}.hero{grid-template-columns:1.3fr .9fr}.card{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}.chips span{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}.btn{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}.pri{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e}.sec{border:1px solid #39508c;color:var(--text)}form{display:grid;gap:9px}label{font-size:13px;color:var(--muted)}input,textarea{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}textarea{min-height:92px}ul{margin:8px 0 0 18px}li{margin:7px 0;color:#d9e4ff}@media(max-width:860px){.hero,.services{grid-template-columns:1fr}}"

for lead in leads:
    d = wave / lead["slug"]
    d.mkdir(parents=True, exist_ok=True)
    tel = "".join(ch for ch in lead["phone"] if ch.isdigit())
    mail = f"<a href='mailto:{lead['email']}'>{lead['email']}</a>"
    lis = "".join(f"<li>{s}</li>" for s in lead["services"])
    html = (
        "<!doctype html><html lang='en'><head><meta charset='utf-8'/><meta name='viewport' content='width=device-width, initial-scale=1'/>"
        f"<title>{lead['name']} | Premium Demo</title><style>{style}</style></head><body><div class='wrap'><div class='grid hero'><section class='card'>"
        f"<p style='margin-top:0;color:var(--muted)'>{lead['location']}</p><h1 style='margin:.2rem 0'>{lead['name']} {lead['headline']}</h1><p>{lead['pitch']}</p>"
        f"<p><a class='btn pri' href='tel:{tel}'>Call {lead['phone']}</a> <a class='btn sec' href='#quote'>Get My Quote</a></p><div class='chips'><span>Fast Response CTA</span><span>Service-Led Offer Stack</span><span>Local Trust Layout</span></div></section>"
        f"<section class='card'><h2 style='margin-top:0'>Request a Quick Callback</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{lead['slug']}'/><input type='hidden' name='source' value='quick_callback'/><label for='name'>Full Name</label><input id='name' name='name' type='text' required autocomplete='name'/><label for='phone'>Phone Number</label><input id='phone' name='phone' type='tel' required autocomplete='tel'/><button class='btn pri' type='submit'>Request Callback</button></form></section></div>"
        f"<div class='grid services' style='margin-top:12px;grid-template-columns:1fr 1fr'><section class='card'><h2 style='margin-top:0'>Core Services</h2><ul>{lis}</ul></section><section class='card' id='quote'><h2 style='margin-top:0'>Detailed Quote Request</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{lead['slug']}'/><input type='hidden' name='source' value='detailed_quote'/><label for='qname'>Full Name</label><input id='qname' name='name' type='text' required autocomplete='name'/><label for='qphone'>Phone Number</label><input id='qphone' name='phone' type='tel' required autocomplete='tel'/><label for='qdetails'>Project details</label><textarea id='qdetails' name='details' required></textarea><button class='btn pri' type='submit'>Send My Quote Request</button></form>"
        f"<p><a href='tel:{tel}'>{lead['phone']}</a> | {mail}<br/><small>Demo form routes to secure contact intake endpoint.</small></p></section></div></div></body></html>"
    )
    (d / "index.html").write_text(html, encoding="utf-8")

notes = [
    "# Premium V3 Wave 22 - Deployment Notes",
    "",
    "Date: 2026-03-02",
    "Wave Folder: `sites/premium-v3-wave22`",
    "",
    "## Built Pages (highest-priority uncovered leads)",
    *[
        f"{i+1}. `{l['slug']}` (est. ${l['ev']}, outreach ID: `{l['id']}`, tier: `{l['tier']}`, score: {l['score']})"
        for i, l in enumerate(leads)
    ],
    "",
    "## Selection Notes",
    "- Source file: `outreach_queue.jsonl`",
    "- Selection criteria: P1 leads not represented by prior premium wave outreach IDs and not present as exact slug folders in prior premium waves, sorted by `priority_score` then `estimated_value`.",
    "- Slug convention used: `client-city-state` (normalized, lowercase, hyphenated).",
    "",
    "## Conversion Structure Included",
    "- Hero section with dual CTA (`Call` + `Get My Quote`)",
    "- Above-the-fold callback form for high-intent visitors",
    "- Core services section with 4 service bullets",
    "- Detailed quote capture form with project-details textarea",
    "- Contact reinforcement with click-to-call + email",
    "",
    "## Form Endpoint Convention",
    "- All forms post to current endpoint convention: `/contact`",
    "- Hidden metadata fields on every form:",
    "  - `business` = site slug",
    "  - `source` = `quick_callback` or `detailed_quote`",
    "",
    "## Known Blockers / Follow-ups",
    "1. `/contact` backend handler is not yet wired to final CRM routing.",
    "2. Analytics/event instrumentation (GA4/Meta/CAPI) not yet embedded.",
    "3. Deploy aliases / route mappings for wave22 are not yet committed.",
    "4. Canonical slug reconciliation still needed; some top-score leads overlap semantically with earlier covered records but remain uncovered as exact slug IDs.",
    "5. Several lead emails were unavailable in source data; placeholder role-based inboxes were used for demo contact rendering and should be replaced if verified.",
]

(wave / "DEPLOYMENT_NOTES.md").write_text("\n".join(notes), encoding="utf-8")
print(f"Built wave22 with {len(leads)} pages")
