const fs = require('fs');
const path = require('path');
const base = path.join(process.cwd(), 'sites', 'premium-v3-wave55');
for (const d of fs.readdirSync(base)) {
  const f = path.join(base, d, 'index.html');
  if (!fs.existsSync(f)) continue;
  const c = fs.readFileSync(f, 'utf8');
  const forms = (c.match(/<form[^>]*action=['\"]\/contact['\"][^>]*>/g) || []).length;
  const business = (c.match(/name=['\"]business['\"]/g) || []).length;
  const source = (c.match(/name=['\"]source['\"]/g) || []).length;
  const quick = /value=['\"]quick_callback['\"]/.test(c);
  const detailed = /value=['\"]detailed_quote['\"]/.test(c);
  const placeholders = (c.match(/\{\{|\}\}|TODO|TBD|lorem ipsum/gi) || []).length;
  const risky = (c.match(/guarantee|#1|best\s+in|no\.\s*1|ranked/gi) || []).length;
  const telLink = /href=['\"]tel:/i.test(c);
  console.log(`${d}|forms:${forms}|business:${business}|source:${source}|quick:${quick}|detailed:${detailed}|placeholders:${placeholders}|risky:${risky}|telLink:${telLink}`);
}
