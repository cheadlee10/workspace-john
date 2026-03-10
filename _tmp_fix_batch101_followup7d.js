const fs=require('fs');
const path=require('path');
const cwd=process.cwd();
const ids=Array.from({length:10},(_,i)=>`nosite-${String(71+i).padStart(3,'0')}`);
const jpath=path.join(cwd,'email-templates','send-queue-2026-03-02-next-batches.jsonl');
const cpath=path.join(cwd,'email-templates','send-queue-2026-03-02-next-batches-tracker.csv');

function plus7Date(iso){
  const m=iso.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}:\d{2}:\d{2})-08:00$/);
  if(!m) return null;
  const [_,y,mo,d,time]=m;
  const dt=new Date(Date.UTC(Number(y),Number(mo)-1,Number(d)+7));
  const yyyy=dt.getUTCFullYear();
  const mm=String(dt.getUTCMonth()+1).padStart(2,'0');
  const dd=String(dt.getUTCDate()).padStart(2,'0');
  return `${yyyy}-${mm}-${dd}T${time}-08:00`;
}

let lines=fs.readFileSync(jpath,'utf8').split('\n');
lines=lines.map(line=>{
  if(!line.trim()) return line;
  try{
    const o=JSON.parse(line);
    if(ids.includes(o.lead_id) && o.template_asset_file==='next-queued-email-assets-2026-03-03-batch101.md'){
      const f=plus7Date(o.scheduled_at);
      if(f){o.followup_7d_at=f; return JSON.stringify(o);}    
    }
  }catch{}
  return line;
});
fs.writeFileSync(jpath,lines.join('\n'));

let csv=fs.readFileSync(cpath,'utf8').split('\n');
csv=csv.map(line=>{
  const idm=line.match(/"(nosite-\d{3})"/);
  if(!idm || !ids.includes(idm[1]) || !line.includes('asset=next-queued-email-assets-2026-03-03-batch101.md')) return line;
  const sm=line.match(/^"(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}-08:00)"/);
  if(!sm) return line;
  const f=plus7Date(sm[1]);
  if(!f) return line;
  const parts=[];
  let cur='';
  let inQ=false;
  for(let i=0;i<line.length;i++){
    const ch=line[i];
    if(ch==='"') inQ=!inQ;
    if(ch===',' && !inQ){parts.push(cur);cur='';} else cur+=ch;
  }
  parts.push(cur);
  if(parts.length>=25){parts[24]=`"${f}"`;}
  return parts.join(',');
});
fs.writeFileSync(cpath,csv.join('\n'));
console.log('fixed');