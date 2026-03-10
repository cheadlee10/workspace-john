const fs=require('fs');
const path=require('path');
const waveDir=path.join(process.cwd(),'sites','premium-v3-wave67');
for(const d of fs.readdirSync(waveDir,{withFileTypes:true}).filter(x=>x.isDirectory())){
 const file=path.join(waveDir,d.name,'index.html');
 const c=fs.readFileSync(file,'utf8');
 const ids=new Set([...c.matchAll(/\sid=['\"]([^'\"]+)['\"]/gi)].map(m=>m[1]));
 const fors=[...c.matchAll(/<label[^>]*\sfor=['\"]([^'\"]+)['\"]/gi)].map(m=>m[1]);
 const missing=fors.filter(f=>!ids.has(f));
 console.log(d.name, 'labels',fors.length,'missing',missing.length, missing.join(','));
}
