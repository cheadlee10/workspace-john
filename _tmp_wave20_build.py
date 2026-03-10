import pathlib

root = pathlib.Path(r"C:\Users\chead\.openclaw\workspace-john")
wave = root / "sites" / "premium-v3-wave20"
wave.mkdir(parents=True, exist_ok=True)

leads = [
    {
        "slug": "aguilar-fence-inc-sacramento-ca",
        "name": "Aguilar Fence, Inc.",
        "id": "gpass-us-286",
        "tier": "P1",
        "score": 84,
        "ev": 980,
        "phone": "(916) 990-0429",
        "email": "info@aguilarfence.com",
        "location": "Sacramento, CA",
        "headline": "Premium Demo Built for Fence Quote Conversion",
        "pitch": "High-trust fence page concept built to turn estimate shoppers into booked site visits with stronger proof, timeline clarity, and financing-friendly CTA flow.",
        "services": [
            "Wood, vinyl, and ornamental fence installation",
            "Custom gates and secure access upgrades",
            "Fence repair and storm-damage restoration",
            "Permit-ready planning and property-line guidance",
        ],
    },
    {
        "slug": "xtreme-electric-kc-kansas-city-ks",
        "name": "Xtreme Electric KC",
        "id": "gpass-us-335",
        "tier": "P1",
        "score": 84,
        "ev": 970,
        "phone": "(913) 526-6591",
        "email": "info@xtremelectrickc.com",
        "location": "Kansas City, KS",
        "headline": "Premium Demo Built for Electrical Service Intake",
        "pitch": "Premium electrician landing page concept designed for urgent-call captures, panel-upgrade consultations, and higher-ticket project qualification.",
        "services": [
            "Emergency electrical troubleshooting and repairs",
            "Panel upgrades and safety code corrections",
            "EV charger and dedicated-circuit installs",
            "Lighting, switches, and smart-home wiring",
        ],
    },
    {
        "slug": "country-estate-fence-co-inc-anaheim-ca",
        "name": "Country Estate Fence Co. Inc",
        "id": "gpass-us-264",
        "tier": "P1",
        "score": 84,
        "ev": 960,
        "phone": "(800) 286-0999",
        "email": "office@cefwest.com",
        "location": "Anaheim, CA",
        "headline": "Premium Demo Built for Residential Fence Leads",
        "pitch": "Premium fence conversion concept focused on driving quote form completion with design options, trust framing, and clear installation timelines.",
        "services": [
            "Residential perimeter fence installations",
            "Decorative and privacy fence configurations",
            "Gate automation and access control options",
            "Repair, replacement, and lifecycle upgrades",
        ],
    },
    {
        "slug": "alpine-fence-co-seattle-wa",
        "name": "Alpine Fence Co.",
        "id": "gpass-pnw-243",
        "tier": "P1",
        "score": 84,
        "ev": 950,
        "phone": "(206) 248-1310",
        "email": "fences@alpinefenceco.com",
        "location": "Seattle, WA",
        "headline": "Premium Demo Built for Seattle Fence Install Quotes",
        "pitch": "Conversion-first Seattle fencing page concept tuned to move visitors from browsing to booked on-site estimates with stronger service packaging.",
        "services": [
            "Cedar, chain-link, and ornamental fence builds",
            "Commercial and residential gate solutions",
            "Fence repairs and weatherwear rebuilds",
            "On-site planning with material recommendations",
        ],
    },
    {
        "slug": "green-leaf-landscaping-of-washington-battle-ground-wa",
        "name": "Green Leaf Landscaping of Washington",
        "id": "gpass-pnw-207",
        "tier": "P1",
        "score": 84,
        "ev": 800,
        "phone": "(360) 947-4166",
        "email": "info@greenleaflandscapingwa.com",
        "location": "Battle Ground, WA",
        "headline": "Premium Demo Built for Landscaping Lead Capture",
        "pitch": "Premium landscaping conversion page concept created to increase design consult requests and ongoing maintenance quote submissions.",
        "services": [
            "Landscape design and front-yard refresh plans",
            "Sod, planting, and irrigation improvements",
            "Retaining walls, edging, and hardscape accents",
            "Recurring lawn and seasonal cleanup programs",
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
    "# Premium V3 Wave 20 - Deployment Notes",
    "",
    "Date: 2026-03-02",
    "Wave Folder: `sites/premium-v3-wave20`",
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
    "3. Deploy aliases / route mappings for wave20 are not yet committed.",
    "4. Canonical slug reconciliation is still needed to prevent duplicate-coverage across older slug variants.",
]

(wave / "DEPLOYMENT_NOTES.md").write_text("\n".join(notes), encoding="utf-8")
print(f"Built wave20 with {len(leads)} pages")
