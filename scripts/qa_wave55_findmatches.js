const fs=require('fs'); const path=require('path');
const base=path.join(process.cwd(),'sites','premium-v3-wave55');
const risky=/guarantee|#1|best\s+in|no\.\s*1|ranked/gi;
for(const d of fs.readdirSync(base)){
 const f=path.join(base,d,'index.html'); if(!fs.existsSync(f)) continue;
 const c=fs.readFileSync(f,'utf8');
 const m=[...c.matchAll(risky)].map(x=>x[0]);
 console.log('\n'+d, m);
}
