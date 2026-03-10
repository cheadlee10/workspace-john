const fs = require('fs');
const path = require('path');
const root = path.join(process.cwd(), 'sites', 'premium-v3-wave59');
const files = [];
function walk(d){
  for(const n of fs.readdirSync(d)){
    const p = path.join(d,n);
    const s = fs.statSync(p);
    if(s.isDirectory()) walk(p);
    else if(n === 'index.html') files.push(p);
  }
}
walk(root);
for(const f of files){
  const c = fs.readFileSync(f,'utf8');
  const m = (r)=>(c.match(r)||[]).length;
  const out = [
    path.basename(path.dirname(f)),
    `contact:${m(/action=['\"]\/contact['\"]/g)}`,
    `post:${m(/method=['\"]post['\"]/g)}`,
    `business:${m(/name=['\"]business['\"]/g)}`,
    `source:${m(/name=['\"]source['\"]/g)}`,
    `quick:${m(/value=['\"]quick_callback['\"]/g)}`,
    `detailed:${m(/value=['\"]detailed_quote['\"]/g)}`,
    `badHits:${m(/convert more|increase qualified inbound|accelerate booked jobs|guarantee|#1/gi)}`
  ];
  console.log(out.join('|'));
}
