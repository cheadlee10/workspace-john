const fs=require('fs');
const path=require('path');
const root=path.join(process.cwd(),'sites','premium-v3-wave61');
const files=[];
function walk(d){for(const n of fs.readdirSync(d)){const p=path.join(d,n);const s=fs.statSync(p);if(s.isDirectory())walk(p);else if(n==='index.html')files.push(p);}}
walk(root);
const badRes=[/convert more/gi,/increase qualified inbound/gi,/accelerate booked jobs/gi,/\bguarantee(s|d)?\b/gi,/\btop-rated\b/gi,/\bbest in\b/gi,/\brank\s*#?1\b/gi,/\b#1\s+(company|service|provider|team|choice)\b/gi];
for(const f of files){
 const c=fs.readFileSync(f,'utf8');
 const count=(r)=>(c.match(r)||[]).length;
 const issues=[];
 if(count(/action=['\"]\/contact['\"]/g)!==2)issues.push('contactAction!=2');
 if(count(/method=['\"]post['\"]/gi)!==2)issues.push('postMethod!=2');
 if(count(/name=['\"]business['\"]/g)!==2)issues.push('businessHidden!=2');
 if(count(/name=['\"]source['\"]/g)!==2)issues.push('sourceHidden!=2');
 if(count(/value=['\"]quick_callback['\"]/g)!==1)issues.push('quickSource!=1');
 if(count(/value=['\"]detailed_quote['\"]/g)!==1)issues.push('detailedSource!=1');
 const bad=badRes.reduce((n,r)=>n+count(r),0);
 if(bad>0)issues.push('aggressiveClaims:'+bad);
 const todo=count(/TODO|TBD|lorem ipsum|{{\s*[^}]+\s*}}/gi);
 if(todo>0)issues.push('placeholders:'+todo);
 console.log(path.basename(path.dirname(f))+'|'+(issues.length?issues.join(','):'OK'));
}
