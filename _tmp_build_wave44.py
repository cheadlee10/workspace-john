from pathlib import Path

root = Path(r"C:/Users/chead/.openclaw/workspace-john")
wave = root / "sites" / "premium-v3-wave44"
wave.mkdir(parents=True, exist_ok=True)

leads = [
    {
        "slug": "garcia-s-landscaping-services-phoenix-az",
        "business": "Garcia's Landscaping Services",
        "city": "Phoenix, AZ",
        "service": "Landscaping, Tree Services & Irrigation",
        "phone": "",
        "value": 900,
        "id": "nosite-051",
        "tier": "P2",
        "score": 72,
        "bullets": [
            "Seasonal landscaping hero CTA tuned for design, cleanup, and recurring yard-service requests",
            "Service stack for mowing, trimming, tree care, irrigation checks, and property refresh projects",
            "Trust section focused on reliable scheduling, clean worksites, and local climate-aware recommendations",
            "Detailed quote capture asks for lot size, desired services, and preferred onsite estimate window",
        ],
    },
    {
        "slug": "miami-cooling-miami-fl",
        "business": "Miami Cooling",
        "city": "Miami, FL",
        "service": "HVAC & Air Duct Cleaning",
        "phone": "",
        "value": 900,
        "id": "nosite-093",
        "tier": "P2",
        "score": 72,
        "bullets": [
            "High-intent emergency CTA for AC failure calls and same-day cooling restoration inquiries",
            "Service sections for AC repair, tune-ups, replacements, duct cleaning, and airflow diagnostics",
            "Credibility band highlighting licensed technicians, transparent pricing, and clean in-home service",
            "Form flow captures unit type, issue urgency, and property details to pre-qualify inbound jobs",
        ],
    },
    {
        "slug": "all-county-service-and-repair-miami-fl",
        "business": "All County Service and Repair",
        "city": "Miami, FL",
        "service": "Residential HVAC Service & Repair",
        "phone": "",
        "value": 900,
        "id": "nosite-094",
        "tier": "P2",
        "score": 71,
        "bullets": [
            "Conversion-focused CTA built for repair-first calls from homeowners and property managers",
            "Core service modules for diagnostics, refrigerant issues, thermostat upgrades, and system replacement",
            "Trust messaging centered on response speed, straightforward scope communication, and workmanship quality",
            "Lead intake prompts for symptom summary, system age, and preferred appointment time block",
        ],
    },
    {
        "slug": "hvac-denver-denver-co",
        "business": "HVAC Denver",
        "city": "Denver, CO",
        "service": "Heating & Cooling Services",
        "phone": "",
        "value": 900,
        "id": "nosite-095",
        "tier": "P2",
        "score": 70,
        "bullets": [
            "Urgency-led hero CTA for no-heat/no-cool problems and fast technician dispatch requests",
            "Service cards for furnace repair, AC maintenance, seasonal inspections, and full system installs",
            "Authority section emphasizing safety checks, clear recommendations, and quality component sourcing",
            "Detailed form gathers equipment type, comfort issue, and desired service timeframe",
        ],
    },
    {
        "slug": "enersave-hvac-denver-co",
        "business": "Enersave HVAC",
        "city": "Denver, CO",
        "service": "Energy-Efficient HVAC Solutions",
        "phone": "",
        "value": 900,
        "id": "nosite-096",
        "tier": "P2",
        "score": 69,
        "bullets": [
            "Primary CTA aimed at homeowners seeking lower utility costs and improved indoor comfort",
            "Service lineup for efficiency tune-ups, duct balancing, smart thermostat setup, and replacements",
            "Trust framework around practical upgrade recommendations and long-term performance outcomes",
            "Quote form captures current pain points, utility concerns, and project budget direction",
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

notes = """# Premium V3 Wave 44 - Deployment Notes

Date: 2026-03-03
Wave Folder: sites/premium-v3-wave44

## Built Pages (highest-priority uncovered leads)
1. garcia-s-landscaping-services-phoenix-az (est. $900, outreach ID: nosite-051, tier: P2, score: 72, service: Landscaping/Tree Services/Irrigation)
2. miami-cooling-miami-fl (est. $900, outreach ID: nosite-093, tier: P2, score: 72, service: HVAC/Air Duct Cleaning)
3. all-county-service-and-repair-miami-fl (est. $900, outreach ID: nosite-094, tier: P2, score: 71, service: HVAC)
4. hvac-denver-denver-co (est. $900, outreach ID: nosite-095, tier: P2, score: 70, service: HVAC)
5. enersave-hvac-denver-co (est. $900, outreach ID: nosite-096, tier: P2, score: 69, service: HVAC)

## Selection Notes
- Source files: leads.jsonl (`nosite-*` segment) cross-checked against existing `sites/` slugs.
- Queue file (`outreach_queue.jsonl`) currently has no uncovered candidates; all entries there are already represented in existing site folders.
- Selection criteria: highest estimated value uncovered leads remaining after wave43.
- Slug convention used: `business-city-state` (normalized lowercase hyphenation).

## Conversion Structure Included
- Hero with clear primary CTA (`Get My Quote`) and secondary call action fallback handling
- Above-the-fold quick callback form
- Service-specific core services section
- Detailed quote form with project detail capture field
- Contact reinforcement row with non-fabricated contact handling

## Form Endpoint Convention
- All forms post to current endpoint convention: `/contact`
- Hidden metadata fields included on every form:
  - `business` = page slug
  - `source` = `quick_callback` or `detailed_quote`

## Known Blockers / Follow-ups
1. Direct phone numbers are unavailable on all 5 selected leads; pages intentionally show `Phone not publicly listed`.
2. Public email unavailable for all 5 selected leads; pages intentionally show `Email not publicly listed`.
3. `/contact` intake backend routing (CRM owner assignment + notifications) remains pending final confirmation.
4. Analytics events for CTA clicks/form submits are still not embedded on-page.
5. Production deployment aliases and DNS/path mapping for wave44 are pending deploy config.
"""
(wave / "DEPLOYMENT_NOTES.md").write_text(notes, encoding="utf-8")

print('built', len(leads), 'pages in', wave)
