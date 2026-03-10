const fs=require('fs');
const lines=fs.readFileSync('leads.jsonl','utf8').trim().split(/\r?\n/);
const covered=new Set(fs.readFileSync('covered_slugs.txt','utf8').split(/\r?\n/).filter(Boolean));
const slug=s=>String(s||'').toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
let arr=[];
for(const l of lines){
  let d; try{d=JSON.parse(l)}catch{continue;}
  if(!d.client) continue;
  const location=d.location||d.city||'';
  const city=location.split(',')[0]||location;
  const state=((location.match(/,\s*([A-Z]{2})/)||[])[1])||'';
  const sl=slug(`${d.client} ${city} ${state}`);
  if(covered.has(sl)||covered.has(slug(d.client))||covered.has(slug(`${d.client}-${city}`))) continue;
  if(d.status && d.status!=='new') continue;
  arr.push({id:d.id,client:d.client,service:d.service,val:d.estimated_value||0,phone:d.phone||'',location,usable:!!d.outreach_usable,slug:sl});
}
arr=arr.filter(x=>x.usable).sort((a,b)=>b.val-a.val);
for(const x of arr.slice(0,40)) console.log(`${x.val}\t${x.client}\t${x.location}\t${x.phone}\t${x.slug}`);
