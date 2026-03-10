const fs=require('fs'); const path=require('path');
const base=path.join(process.cwd(),'sites','premium-v3-wave55');
for(const d of fs.readdirSync(base)){
 const f=path.join(base,d,'index.html'); if(!fs.existsSync(f)) continue;
 let c=fs.readFileSync(f,'utf8');
 c=c.replace(/Premium Demo Built to Convert More [^<]+ Leads/g,'Premium Demo for Local Service Inquiries');
 c=c.replace(/Conversion-focused landing page concept designed to increase qualified inbound quote requests and accelerate booked jobs\./g,'Landing page concept structured to capture quote requests with clear project details.');
 fs.writeFileSync(f,c,'utf8');
 console.log('updated',d);
}
