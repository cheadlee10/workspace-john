const fs=require('fs');
const path=require('path');
const root=path.join(process.cwd(),'sites','premium-v3-wave61');
function walk(d){
  for(const n of fs.readdirSync(d)){
    const p=path.join(d,n);
    const s=fs.statSync(p);
    if(s.isDirectory()) walk(p);
    else if(n==='index.html'){
      let c=fs.readFileSync(p,'utf8');
      const before=c;
      c=c.replace(/Premium Demo Built to Convert More /g,'Premium Demo for ');
      c=c.replace('Conversion-focused landing page concept designed to drive higher-quality inbound quote requests and faster booking velocity.','Service-focused landing page concept designed for clear customer intake and fast follow-up.');
      c=c.replace(/follow-up guarantees\./g,'follow-up planning.');
      if(c!==before){
        fs.writeFileSync(p,c,'utf8');
        console.log('updated '+p);
      }
    }
  }
}
walk(root);
