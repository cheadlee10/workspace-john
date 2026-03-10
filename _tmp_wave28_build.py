import json, re, pathlib, html

root = pathlib.Path(r"C:/Users/chead/.openclaw/workspace-john")
wave = root / "sites" / "premium-v3-wave28"
wave.mkdir(parents=True, exist_ok=True)

# Highest-priority uncovered leads from outreach_queue.jsonl
selected_ids = [
    "gpass-us-381",  # Minuteman Plumbing Heating Cooling
    "gpass-us-365",  # Boston Roofing (Natick)
    "gpass-us-382",  # Small Jobs Electric
    "gpass-wa-203",  # Frontier Landscaping
    "nosite-106",    # MasterAZscapes
]


def slugify(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", (s or "").lower()).strip("-")


def city_state(loc: str):
    m = re.search(r"([^,]+),\s*([A-Za-z]{2})", loc or "")
    if m:
        return m.group(1).strip(), m.group(2).upper()
    return (loc or "Local Market"), "US"


def digits(phone: str) -> str:
    d = "".join(ch for ch in (phone or "") if ch.isdigit())
    if len(d) == 11 and d.startswith("1"):
        d = d[1:]
    return d


service_content = {
    "Roofing": {
        "headline_suffix": "Roofing Inspection & Replacement Leads",
        "hero": "Premium roofing conversion page designed to capture leak emergencies and replacement projects with clear call-first CTAs.",
        "services": [
            "Emergency roof leak assessment and temporary protection",
            "Replacement planning with material and budget options",
            "Storm damage inspections and documentation support",
            "Maintenance and flashing repair for long-term roof health",
        ],
    },
    "Plumbing/HVAC": {
        "headline_suffix": "Plumbing & HVAC Emergency Service Calls",
        "hero": "Premium conversion layout built for urgent no-heat, leak, and comfort-system breakdown calls with immediate response CTAs.",
        "services": [
            "Emergency plumbing leaks, drain issues, and water-heater service",
            "AC and furnace diagnostics, tune-ups, and repairs",
            "System replacement planning with transparent quote intake",
            "Preventive maintenance to reduce repeat breakdowns",
        ],
    },
    "Electrical": {
        "headline_suffix": "Electrical Repair & Panel Upgrade Leads",
        "hero": "Premium electrician landing page focused on safety-driven service requests and high-intent panel/rewire project leads.",
        "services": [
            "Troubleshooting for outages, breakers, and unsafe wiring",
            "Panel upgrades and dedicated circuit installs",
            "Lighting, outlet, and device installations",
            "Code correction and pre-sale electrical remediation",
        ],
    },
    "Landscaping": {
        "headline_suffix": "Landscape Design & Maintenance Leads",
        "hero": "Premium landscaping conversion page tuned for homeowners ready to request design-build, cleanups, and recurring maintenance quotes.",
        "services": [
            "Full-yard landscape design and installation",
            "Seasonal cleanups, pruning, and restoration",
            "Lawn, irrigation, and planting bed maintenance",
            "Hardscape accents and curb-appeal upgrades",
        ],
    },
}

fallback_content = {
    "headline_suffix": "Local Service Leads",
    "hero": "Premium conversion layout focused on local lead capture and fast quote request conversion.",
    "services": [
        "Fast response booking workflow",
        "Service-specific landing section",
        "Quote qualification intake form",
        "Click-to-call conversion path",
    ],
}

rows = []
for ln in (root / "outreach_queue.jsonl").read_text(encoding="utf-8").splitlines():
    if not ln.strip():
        continue
    o = json.loads(ln)
    if o.get("id") in selected_ids:
        rows.append(o)

row_by_id = {r["id"]: r for r in rows}
rows = [row_by_id[i] for i in selected_ids if i in row_by_id]
if len(rows) != 5:
    raise SystemExit(f"Expected 5 selected leads, found {len(rows)}")

created = []
for o in rows:
    client = o.get("client", "Local Business")
    location = o.get("location", "")
    service = o.get("service", "Home Services")
    phone = o.get("phone", "")
    phone_href = digits(phone)

    city, st = city_state(location)
    slug = o.get("site_slug") or f"{slugify(client)}-{slugify(city)}-{st.lower()}"

    bundle = service_content.get(service, fallback_content)
    lis = "".join(f"<li>{html.escape(item)}</li>" for item in bundle["services"])

    if o.get("email"):
        safe_email = html.escape(o["email"])
        visible_contact = f"<a href='mailto:{safe_email}'>{safe_email}</a>"
    else:
        visible_contact = "Email not publicly listed"

    title = f"{client} | Premium Demo"
    h1 = f"{client} Premium Demo Built for {bundle['headline_suffix']}"

    html_doc = f"""<!doctype html><html lang='en'><head><meta charset='utf-8'/><meta name='viewport' content='width=device-width, initial-scale=1'/><title>{html.escape(title)}</title><style>:root{{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}}*{{box-sizing:border-box}}body{{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}}.wrap{{max-width:1080px;margin:auto;padding:28px 18px}}.grid{{display:grid;gap:14px}}.hero{{grid-template-columns:1.3fr .9fr}}.card{{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}}.chips span{{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}}.btn{{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}}.pri{{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e}}.sec{{border:1px solid #39508c;color:var(--text)}}form{{display:grid;gap:9px}}label{{font-size:13px;color:var(--muted)}}input,textarea{{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}}textarea{{min-height:92px}}ul{{margin:8px 0 0 18px}}li{{margin:7px 0;color:#d9e4ff}}@media(max-width:860px){{.hero,.services{{grid-template-columns:1fr}}}}</style></head><body><div class='wrap'><div class='grid hero'><section class='card'><p style='margin-top:0;color:var(--muted)'>{html.escape(location)}</p><h1 style='margin:.2rem 0'>{html.escape(h1)}</h1><p>{html.escape(bundle['hero'])}</p><p><a class='btn pri' href='tel:{phone_href}'>Call {html.escape(phone or 'Now')}</a> <a class='btn sec' href='#quote'>Get My Quote</a></p><div class='chips'><span>Fast Response CTA</span><span>Service-Led Offer Stack</span><span>Local Trust Layout</span></div></section><section class='card'><h2 style='margin-top:0'>Request a Quick Callback</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{slug}'/><input type='hidden' name='source' value='quick_callback'/><label for='name'>Full Name</label><input aria-label='Full Name' id='name' name='name' type='text' required autocomplete='name'/><label for='phone'>Phone Number</label><input aria-label='Phone Number' id='phone' name='phone' type='tel' required autocomplete='tel'/><button class='btn pri' type='submit'>Request Callback</button></form></section></div><div class='grid services' style='margin-top:12px;grid-template-columns:1fr 1fr'><section class='card'><h2 style='margin-top:0'>Core Services</h2><ul>{lis}</ul></section><section class='card' id='quote'><h2 style='margin-top:0'>Detailed Quote Request</h2><form action='/contact' method='post'><input type='hidden' name='business' value='{slug}'/><input type='hidden' name='source' value='detailed_quote'/><label for='qname'>Full Name</label><input aria-label='Full Name' id='qname' name='name' type='text' required autocomplete='name'/><label for='qphone'>Phone Number</label><input aria-label='Phone Number' id='qphone' name='phone' type='tel' required autocomplete='tel'/><label for='qdetails'>Project details</label><textarea aria-label='Project details' id='qdetails' name='details' required></textarea><button class='btn pri' type='submit'>Send My Quote Request</button></form><p><a href='tel:{phone_href}'>{html.escape(phone)}</a> | {visible_contact}<br/><small>Demo form routes to secure contact intake endpoint.</small></p></section></div></div></body></html>"""

    site_dir = wave / slug
    site_dir.mkdir(parents=True, exist_ok=True)
    (site_dir / "index.html").write_text(html_doc, encoding="utf-8")
    created.append((o, slug))

notes = [
    "# Premium V3 Wave 28 - Deployment Notes",
    "",
    "Date: 2026-03-03",
    "Wave Folder: `sites/premium-v3-wave28`",
    "",
    "## Built Pages (highest-priority uncovered leads)",
]

for i, (o, slug) in enumerate(created, 1):
    notes.append(
        f"{i}. `{slug}` (est. ${o.get('estimated_value', 0)}, outreach ID: `{o.get('id')}`, tier: `{o.get('priority_tier', '')}`, score: {o.get('priority_score', '')}, service: {o.get('service', '')})"
    )

notes += [
    "",
    "## Selection Notes",
    "- Source file: `outreach_queue.jsonl`",
    "- Selection criteria: top P1 leads not already represented in prior premium waves, ranked by `priority_score` then `estimated_value`.",
    "- Slug convention used: `client-city-state` (normalized lowercase hyphenation).",
    "",
    "## Conversion Structure Included",
    "- Hero section with dual CTA (`Call` + `Get My Quote`)",
    "- Above-the-fold quick callback form",
    "- Core services section tailored by service vertical",
    "- Detailed quote capture form with project-details textarea",
    "- Contact reinforcement row with click-to-call and verified-email handling",
    "",
    "## Form Endpoint Convention",
    "- All forms post to current endpoint convention: `/contact`",
    "- Hidden metadata fields on every form:",
    "  - `business` = site slug",
    "  - `source` = `quick_callback` or `detailed_quote`",
    "",
    "## Known Blockers / Follow-ups",
    "1. `/contact` backend handler still needs final CRM ingest mapping and owner routing.",
    "2. CTA click + form-submit analytics events are not embedded yet.",
    "3. Production host aliases/routes for wave28 are not yet wired.",
]

missing_email = sum(1 for o, _ in created if not o.get("email"))
if missing_email:
    notes.append(f"4. {missing_email} selected lead(s) do not expose a public email in queue; page contact row uses `Email not publicly listed` to avoid fabricated placeholders.")
else:
    notes.append("4. All selected leads include public email; no placeholder email copy was required.")

(wave / "DEPLOYMENT_NOTES.md").write_text("\n".join(notes) + "\n", encoding="utf-8")

print("created", wave)
for _, slug in created:
    print(slug)
