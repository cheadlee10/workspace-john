import pathlib

root = pathlib.Path(r"C:\Users\chead\.openclaw\workspace-john")
wave = root / "sites" / "premium-v3-wave23"
wave.mkdir(parents=True, exist_ok=True)

leads = [
    {
        "slug": "you-columbus-roofing-team-columbus-oh",
        "name": "You Columbus Roofing Team",
        "id": "gpass-us-301",
        "tier": "P1",
        "score": 84,
        "ev": 1100,
        "phone": "(380) 214-2859",
        "email": "website@columbusroofingco.com",
        "location": "Columbus, OH",
        "headline": "Premium Demo Built for High-Intent Roofing Calls",
        "pitch": "Premium roofing lead-gen concept designed to convert storm-damage urgency and replacement inquiries into booked inspections.",
        "services": [
            "Emergency leak assessment and storm response",
            "Roof replacement estimates and material options",
            "Insurance-aligned documentation support",
            "Preventive inspections and maintenance plans",
        ],
    },
    {
        "slug": "ryan-hall-handyman-and-construction-services-llc-greater-portland-or",
        "name": "Ryan Hall Handyman and Construction Services, LLC",
        "id": "gpass-pnw-232",
        "tier": "P1",
        "score": 84,
        "ev": 800,
        "phone": "(503) 875-6202",
        "email": "ryanhallconstructionllc@gmail.com",
        "location": "Greater Portland, OR",
        "headline": "Premium Demo Built for Remodeling & Repair Intake",
        "pitch": "Premium handyman/remodeling page concept focused on fast quote capture for repair scopes, upgrades, and renovation walk-throughs.",
        "services": [
            "General handyman repairs and punch-list completion",
            "Kitchen, bath, and interior remodeling support",
            "Drywall, trim, and finish carpentry updates",
            "Small construction projects with phased scopes",
        ],
    },
    {
        "slug": "spokane-roofing-company-liberty-lake-wa",
        "name": "Spokane Roofing Company",
        "id": "gpass-pnw-248",
        "tier": "P1",
        "score": 83,
        "ev": 1250,
        "phone": "(509) 838-8633",
        "email": "info@spokaneroofing.com",
        "location": "Spokane / Liberty Lake, WA",
        "headline": "Premium Demo Built for Roofing Estimate Conversion",
        "pitch": "Premium roofing funnel concept designed to move local homeowners from ad click to inspection booking with clear urgency CTAs.",
        "services": [
            "Leak diagnostics and emergency roof repair",
            "Full replacement planning and product selection",
            "Residential and light commercial roofing",
            "Inspection reporting for maintenance and resale",
        ],
    },
    {
        "slug": "austin-roofing-company-austin-tx",
        "name": "Austin Roofing Company",
        "id": "gpass-us-334",
        "tier": "P1",
        "score": 83,
        "ev": 1020,
        "phone": "(512) 952-7454",
        "email": "info@austinroofingcompany.com",
        "location": "Austin, TX",
        "headline": "Premium Demo Built for Storm & Replacement Leads",
        "pitch": "Premium demo page tailored to capture storm-repair urgency and replacement consultations for higher-ticket roofing projects.",
        "services": [
            "Storm damage inspections and rapid patch services",
            "Asphalt, metal, and flat-roof replacement quotes",
            "Insurance-claim assistance and scope alignment",
            "Ongoing maintenance programs and roof tune-ups",
        ],
    },
    {
        "slug": "summit-handyman-denver-co",
        "name": "Summit Handyman",
        "id": "gpass-us-256",
        "tier": "P1",
        "score": 83,
        "ev": 820,
        "phone": "(720) 738-8452",
        "email": "SummitHandymanCO@gmail.com",
        "location": "Denver, CO",
        "headline": "Premium Demo Built for Handyman Service Bookings",
        "pitch": "Premium local-services layout created to increase booked handyman calls and qualified project requests from homeowners.",
        "services": [
            "Home repair diagnostics and same-week fixes",
            "Installations, mounting, and fixture replacements",
            "Exterior upkeep and seasonal maintenance tasks",
            "Small remodel support and project finishing",
        ],
    },
]

style = ":root{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}*{box-sizing:border-box}body{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}.wrap{max-width:1080px;margin:auto;padding:28px 18px}.grid{display:grid;gap:14px}.hero{grid-template-columns:1.3fr .9fr}.card{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}.chips span{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}.btn{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}.pri{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e}.sec{border:1px solid #39508c;color:var(--text)}form{display:grid;gap:9px}label{font-size:13px;color:var(--muted)}input,textarea{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}textarea{min-height:92px}ul{margin:8px 0 0 18px}li{margin:7px 0;color:#d9e4ff}@media(max-width:860px){.hero,.services{grid-template-columns:1fr}}"

for lead in leads:
    d = wave / lead["slug"]
    d.mkdir(parents=True, exist_ok=True)
    tel = "".join(ch for ch in lead["phone"] if ch.isdigit())
    lis = "".join(f"<li>{s}</li>" for s in lead["services"])
    html = (
        "<!doctype html><html lang='en'><head><meta charset='utf-8'/><meta name='viewport' content='width=device-width, initial-scale=1'/>"
        f"<title>{lead['name']} | Premium Demo</title><style>{style}</style></head><body><div class='wrap'><div class='grid hero'><section class='card'>"
        f"<p style='margin-top:0;color:var(--muted)'>{lead['location']}</p><h1 style='margin:.2rem 0'>{lead['name']} {lead['headline']}</h1><p>{lead['pitch']}</p>"
        f"<p><a class='btn pri' href='tel:{tel}'>Call {lead['phone']}</a> <a class='btn sec' href='#quote'>Get My Quote</a></p><div class='chips'><span>Fast Response CTA</span><span>Service-Led Offer Stack</span><span>Local Trust Layout</span></div></section>"
        f"<section class='card'><h2 style='margin-top:0'>Request a Quick Callback</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{lead['slug']}'/><input type='hidden' name='source' value='quick_callback'/><label for='name'>Full Name</label><input id='name' name='name' type='text' required autocomplete='name'/><label for='phone'>Phone Number</label><input id='phone' name='phone' type='tel' required autocomplete='tel'/><button class='btn pri' type='submit'>Request Callback</button></form></section></div>"
        f"<div class='grid services' style='margin-top:12px;grid-template-columns:1fr 1fr'><section class='card'><h2 style='margin-top:0'>Core Services</h2><ul>{lis}</ul></section><section class='card' id='quote'><h2 style='margin-top:0'>Detailed Quote Request</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{lead['slug']}'/><input type='hidden' name='source' value='detailed_quote'/><label for='qname'>Full Name</label><input id='qname' name='name' type='text' required autocomplete='name'/><label for='qphone'>Phone Number</label><input id='qphone' name='phone' type='tel' required autocomplete='tel'/><label for='qdetails'>Project details</label><textarea id='qdetails' name='details' required></textarea><button class='btn pri' type='submit'>Send My Quote Request</button></form>"
        f"<p><a href='tel:{tel}'>{lead['phone']}</a> | <a href='mailto:{lead['email']}'>{lead['email']}</a><br/><small>Demo form routes to secure contact intake endpoint.</small></p></section></div></div></body></html>"
    )
    (d / "index.html").write_text(html, encoding="utf-8")

notes = [
    "# Premium V3 Wave 23 - Deployment Notes",
    "",
    "Date: 2026-03-02",
    "Wave Folder: `sites/premium-v3-wave23`",
    "",
    "## Built Pages (highest-priority uncovered leads)",
    *[
        f"{i+1}. `{l['slug']}` (est. ${l['ev']}, outreach ID: `{l['id']}`, tier: `{l['tier']}`, score: {l['score']})"
        for i, l in enumerate(leads)
    ],
    "",
    "## Selection Notes",
    "- Source file: `outreach_queue.jsonl`",
    "- Selection criteria: highest-priority P1 leads not covered in existing premium waves by outreach ID or exact slug; ranked by `priority_score` then `estimated_value`.",
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
    "1. `/contact` backend handler is still not mapped to final CRM ingest and lead-owner routing.",
    "2. Analytics + conversion events are not yet embedded for form submits and CTA clicks.",
    "3. Deployment aliases/routes for wave23 are not yet committed in the host routing layer.",
    "4. Canonical lead de-duplication remains partial; semantic business-name overlaps may still exist.",
    "5. Several remaining high-score leads in queue have missing/blank emails and will need verified inbox enrichment before outreach send.",
]

(wave / "DEPLOYMENT_NOTES.md").write_text("\n".join(notes), encoding="utf-8")
print(f"Built wave23 with {len(leads)} pages")