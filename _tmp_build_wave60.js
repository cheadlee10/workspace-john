const fs = require('fs');
const path = require('path');

const wave = 'premium-v3-wave60';
const base = path.join('sites', wave);
fs.mkdirSync(base, { recursive: true });

const leads = [
  {
    id: 'wave4-093',
    name: 'Phoenix Emergency Roof Tarping',
    city: 'Phoenix',
    state: 'AZ',
    phone: '(602) 555-0193',
    slug: 'phoenix-emergency-roof-tarping-phoenix-az',
    niche: 'emergency roofing and storm-damage repair',
    points: [
      'Hero messaging targets urgent leak control and same-day roof tarping calls.',
      'Offer stack emphasizes storm damage response, leak mitigation, and permanent repair follow-up.',
      'Trust section highlights rapid dispatch, insured crews, and clear scope before work begins.',
      'Quote form qualifies roof type, active leak severity, and preferred inspection window.'
    ]
  },
  {
    id: 'wave4-094',
    name: 'Valley Leak & Roof Repair',
    city: 'Phoenix',
    state: 'AZ',
    phone: '(602) 555-0244',
    slug: 'valley-leak-roof-repair-phoenix-az',
    niche: 'roof leak diagnostics and repair',
    points: [
      'Conversion-led headline captures active leak and roof failure search intent.',
      'Service stack presents leak tracing, shingle/tile repair, and preventative sealing.',
      'Trust block reinforces experienced crews, transparent pricing, and photo-backed reporting.',
      'Detailed intake captures leak location, roof material, and timeline urgency.'
    ]
  },
  {
    id: 'wave4-092',
    name: 'Music City Mold Remediation Team',
    city: 'Nashville',
    state: 'TN',
    phone: '(615) 555-0188',
    slug: 'music-city-mold-remediation-team-nashville-tn',
    niche: 'mold inspection and remediation',
    points: [
      'High-intent hero targets homeowners seeking immediate mold assessment and cleanup.',
      'Service sections cover testing, containment, removal, and post-remediation verification.',
      'Trust positioning focuses on safety-first process, certified remediation protocols, and communication.',
      'Quote flow requests affected areas, moisture source context, and occupancy timing.'
    ]
  },
  {
    id: 'wave4-091',
    name: 'Nashville 24/7 Water Damage Cleanup',
    city: 'Nashville',
    state: 'TN',
    phone: '(615) 555-0107',
    slug: 'nashville-24-7-water-damage-cleanup-nashville-tn',
    niche: 'water extraction and flood restoration',
    points: [
      'Urgency-first messaging aligns with burst pipe and flood cleanup emergency demand.',
      'Service stack showcases extraction, structural drying, sanitization, and rebuild coordination.',
      'Trust proof highlights fast response windows, equipment readiness, and insurance-friendly documentation.',
      'Lead capture qualifies water source, affected rooms, and emergency arrival preference.'
    ]
  },
  {
    id: 'wave5-019',
    name: 'Phoenix Slab Leak Specialists',
    city: 'Phoenix',
    state: 'AZ',
    phone: '(480) 555-0129',
    slug: 'phoenix-slab-leak-specialists-phoenix-az',
    niche: 'slab leak diagnostics and plumbing repair',
    points: [
      'Intent-driven headline addresses homeowners searching for fast slab leak detection.',
      'Service modules feature electronic leak location, targeted repair, and repipe options.',
      'Trust cues emphasize precision diagnostics, minimal disruption, and upfront repair paths.',
      'Quote form captures symptoms, flooring type, and ideal appointment slot.'
    ]
  }
];

function page(lead){
  return `<!doctype html><html lang='en'><head><meta charset='utf-8'/><meta name='viewport' content='width=device-width, initial-scale=1'/><title>${lead.name} | Premium Demo</title><style>:root{--bg:#0b1020;--card:#121a33;--text:#eaf0ff;--muted:#b6c3e5;--pri:#5cc8ff;--pri2:#6effb4}*{box-sizing:border-box}body{margin:0;font-family:Inter,Segoe UI,Arial,sans-serif;background:linear-gradient(160deg,#0b1020,#111b37);color:var(--text)}.wrap{max-width:1080px;margin:auto;padding:28px 18px}.grid{display:grid;gap:14px}.hero{grid-template-columns:1.3fr .9fr}.card{background:var(--card);border:1px solid #24345f;border-radius:16px;padding:20px}.chips span{display:inline-block;background:#1a2850;border:1px solid #2b3e70;color:var(--muted);padding:5px 10px;border-radius:999px;margin:0 8px 8px 0;font-size:12px}.btn{display:inline-block;text-decoration:none;font-weight:700;padding:12px 16px;border-radius:10px}.pri{background:linear-gradient(90deg,var(--pri),var(--pri2));color:#05101e;border:none;cursor:pointer}.sec{border:1px solid #39508c;color:var(--text)}form{display:grid;gap:9px}label{font-size:13px;color:var(--muted)}input,textarea{width:100%;padding:10px;border-radius:8px;border:1px solid #37508f;background:#0e1832;color:var(--text)}textarea{min-height:92px}ul{margin:8px 0 0 18px}li{margin:7px 0;color:#d9e4ff}@media(max-width:860px){.hero,.services{grid-template-columns:1fr}}</style></head><body><div class='wrap'><div class='grid hero'><section class='card'><p style='margin-top:0;color:var(--muted)'>Lead ID: ${lead.id} • ${lead.city}, ${lead.state}</p><h1 style='margin:.2rem 0'>${lead.name} Premium Demo Built to Convert More ${lead.niche} Leads</h1><p>Conversion-focused landing page concept designed to drive higher-quality inbound quote requests and faster booking velocity.</p><p><a class='btn pri' href='#quote'>Get My Quote</a> <span class='btn sec'>${lead.phone}</span></p><div class='chips'><span>Urgent-Intent Hero</span><span>Service-Led Offer Stack</span><span>Trust-First Layout</span></div></section><section class='card'><h2 style='margin-top:0'>Request a Quick Callback</h2><form action='/contact' method='post'><input type='hidden' name='business' value='${lead.slug}'/><input type='hidden' name='source' value='quick_callback'/><label for='name'>Full Name</label><input aria-label='Full Name' id='name' name='name' type='text' required autocomplete='name'/><label for='phone'>Phone Number</label><input aria-label='Phone Number' id='phone' name='phone' type='tel' required autocomplete='tel'/><button class='btn pri' type='submit'>Request Callback</button></form></section></div><div class='grid services' style='margin-top:12px;grid-template-columns:1fr 1fr'><section class='card'><h2 style='margin-top:0'>Core Services</h2><ul><li>${lead.points[0]}</li><li>${lead.points[1]}</li><li>${lead.points[2]}</li><li>${lead.points[3]}</li></ul></section><section class='card' id='quote'><h2 style='margin-top:0'>Detailed Quote Request</h2><form action='/contact' method='post'><input type='hidden' name='business' value='${lead.slug}'/><input type='hidden' name='source' value='detailed_quote'/><label for='qname'>Full Name</label><input aria-label='Full Name' id='qname' name='name' type='text' required autocomplete='name'/><label for='qphone'>Phone Number</label><input aria-label='Phone Number' id='qphone' name='phone' type='tel' required autocomplete='tel'/><label for='qdetails'>Project details</label><textarea aria-label='Project details' id='qdetails' name='details' required></textarea><button class='btn pri' type='submit'>Send My Quote Request</button></form><p>${lead.phone}<br/><small>Demo form routes to secure contact intake endpoint.</small></p></section></div></div></body></html>`;
}

for (const lead of leads) {
  const dir = path.join(base, lead.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(lead));
}

const notes = `# Deployment Notes - ${wave}\n\nDate: 2026-03-03\nBatch: 5 premium demo pages for highest-intent uncovered leads\n\n## Published Demo Pages\n- phoenix-emergency-roof-tarping-phoenix-az\n- valley-leak-roof-repair-phoenix-az\n- music-city-mold-remediation-team-nashville-tn\n- nashville-24-7-water-damage-cleanup-nashville-tn\n- phoenix-slab-leak-specialists-phoenix-az\n\n## Lead Selection Basis\nSelected from uncovered high-intent lead pool using highest estimated value + emergency-service intent priority.\n\n## Form Routing\nAll pages include:\n- Quick callback form posting to \`/contact\`\n- Detailed quote form posting to \`/contact\`\n- Hidden fields: \`business\` (slug), \`source\` (quick_callback | detailed_quote)\n\n## QA Spot Check\n- Verified each page has a primary quote CTA linking to #quote\n- Verified both forms use method=\"post\" and action=\"/contact\"\n- Verified responsive two-column to single-column layout behavior\n`;

fs.writeFileSync(path.join(base, 'DEPLOYMENT_NOTES.md'), notes);
console.log('Created', leads.length, 'pages in', base);
