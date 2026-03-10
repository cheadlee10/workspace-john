import pathlib

root = pathlib.Path(r"C:\Users\chead\.openclaw\workspace-john")
wave = root / "sites" / "premium-v3-wave19"
wave.mkdir(parents=True, exist_ok=True)

leads = [
    {
        "slug": "hd-roofing-and-repairs-austin-tx",
        "name": "HD Roofing and Repairs",
        "id": "gpass-us-289",
        "tier": "P1",
        "score": 87,
        "ev": 1150,
        "phone": "(512) 458-6800",
        "email": "contact@hdroofingandrepairs.com",
        "location": "Austin, TX",
        "headline": "Premium Demo Built for Roof Repair & Replacement Conversions",
        "pitch": "High-conversion roofing concept focused on storm urgency, rapid inspection booking, and clear financing-first CTAs for homeowners.",
        "services": [
            "Emergency leak mitigation and storm repair",
            "Full roof replacement (asphalt, metal, flat)",
            "Preventive inspections and maintenance plans",
            "Insurance documentation and claim support",
        ],
    },
    {
        "slug": "elrod-fence-company-phoenix-az",
        "name": "Elrod Fence Company",
        "id": "gpass-us-255",
        "tier": "P1",
        "score": 84,
        "ev": 980,
        "phone": "(480) 595-7528",
        "email": "elrodfencingaz@gmail.com",
        "location": "Phoenix, AZ",
        "headline": "Premium Demo Built for Fence Install Lead Capture",
        "pitch": "Premium fencing page concept designed to turn quote shoppers into booked site visits with trust-forward before/after framing.",
        "services": [
            "Wood, vinyl, and ornamental fence installs",
            "Gate design and secure access upgrades",
            "Fence repair and section replacements",
            "Property-line planning and permit guidance",
        ],
    },
    {
        "slug": "dallas-plumbing-pros-dallas-tx",
        "name": "Dallas Plumbing Pros",
        "id": "gpass-us-277",
        "tier": "P1",
        "score": 84,
        "ev": 980,
        "phone": "(469) 459-5550",
        "email": "",
        "location": "Dallas, TX",
        "headline": "Premium Demo Built for Emergency Plumbing Intake",
        "pitch": "Conversion-first plumbing concept tuned for urgent-call actions, fast callback requests, and project qualification for higher-ticket jobs.",
        "services": [
            "24/7 leak and burst pipe response",
            "Drain cleaning and sewer diagnostics",
            "Water heater replacement and repair",
            "Fixture upgrades and whole-home repiping",
        ],
    },
    {
        "slug": "hometown-plumbing-pros-phoenix-az",
        "name": "Hometown Plumbing Pros",
        "id": "gpass-us-319",
        "tier": "P1",
        "score": 84,
        "ev": 970,
        "phone": "(623) 302-4215",
        "email": "",
        "location": "Phoenix, AZ",
        "headline": "Premium Demo Built for Fast Plumbing Quote Requests",
        "pitch": "Premium plumbing page concept built to convert service searches into booked callbacks with concise trust signals and frictionless forms.",
        "services": [
            "Leak detection and targeted repair",
            "Tank and tankless water heater service",
            "Drain clearing and hydro-jet options",
            "Kitchen/bath fixture installation upgrades",
        ],
    },
    {
        "slug": "first-call-hvac-nashville-tn",
        "name": "First Call HVAC",
        "id": "gpass-us-346",
        "tier": "P1",
        "score": 84,
        "ev": 970,
        "phone": "(615) 364-7230",
        "email": "info@hvacfirstcall.com",
        "location": "Nashville, TN",
        "headline": "Premium Demo Built for HVAC Service-to-Install Conversion",
        "pitch": "Premium HVAC concept aimed at converting emergency no-cool/no-heat traffic and seasonal tune-up shoppers into qualified estimate appointments.",
        "services": [
            "AC and furnace diagnostics + repair",
            "Full system replacement consultations",
            "Seasonal tune-up and maintenance plans",
            "Indoor air quality and thermostat upgrades",
        ],
    },
]

style = ":root{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}*{box-sizing:border-box}body{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}.wrap{max-width:1080px;margin:auto;padding:28px 18px}.grid{display:grid;gap:14px}.hero{grid-template-columns:1.3fr .9fr}.card{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}.chips span{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}.btn{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}.pri{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e}.sec{border:1px solid #39508c;color:var(--text)}form{display:grid;gap:9px}label{font-size:13px;color:var(--muted)}input,textarea{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}textarea{min-height:92px}ul{margin:8px 0 0 18px}li{margin:7px 0;color:#d9e4ff}@media(max-width:860px){.hero,.services{grid-template-columns:1fr}}"

for lead in leads:
    d = wave / lead["slug"]
    d.mkdir(parents=True, exist_ok=True)
    tel = "".join(ch for ch in lead["phone"] if ch.isdigit())
    mail = (
        f"<a href='mailto:{lead['email']}'>{lead['email']}</a>"
        if lead["email"]
        else "<span style='color:var(--muted)'>Email pending verification</span>"
    )
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
    "# Premium V3 Wave 19 - Deployment Notes",
    "",
    "Date: 2026-03-02",
    "Wave Folder: `sites/premium-v3-wave19`",
    "",
    "## Built Pages (highest-priority uncovered leads)",
    *[
        f"{i+1}. `{l['slug']}` (est. ${l['ev']}, outreach ID: `{l['id']}`, tier: `{l['tier']}`, score: {l['score']})"
        for i, l in enumerate(leads)
    ],
    "",
    "## Selection Notes",
    "- Source file: `outreach_queue.jsonl`",
    "- Selection criteria: P1 leads not listed in `covered_slugs.txt` and not present as exact slug folders in prior premium waves, sorted by `priority_score` then `estimated_value`.",
    "- Slug convention used: `client-city-state` (normalized, lowercase, hyphenated).",
    "",
    "## Conversion Structure Included",
    "- Hero section with dual CTA (`Call` + `Get My Quote`)",
    "- Above-the-fold callback form for high-intent visitors",
    "- Core services section with 4 service bullets",
    "- Detailed quote capture form with project-details textarea",
    "- Contact reinforcement with click-to-call + email (or verification placeholder)",
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
    "3. Deploy aliases / route mappings for wave19 are not yet committed.",
    "4. Dallas Plumbing Pros and Hometown Plumbing Pros are missing verified email addresses; email CTA left as verification placeholder.",
    "5. Canonical slug reconciliation is still needed to prevent duplicate-coverage across older slug variants.",
]

(wave / "DEPLOYMENT_NOTES.md").write_text("\n".join(notes), encoding="utf-8")
print(f"Built wave19 with {len(leads)} pages")