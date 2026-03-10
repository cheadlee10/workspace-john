const fs = require('fs');
const path = require('path');
const ids = Array.from({length:10},(_,i)=>`nosite-${101+i}`);
const jsonlPath = path.join(process.cwd(),'email-templates','send-queue-2026-03-02-next-batches.jsonl');
const csvPath = path.join(process.cwd(),'email-templates','send-queue-2026-03-02-next-batches-tracker.csv');

function fmt(d){
  const pad=n=>String(n).padStart(2,'0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:00-08:00`;
}

let base = new Date('2026-03-04T10:15:00-08:00');
const schedule = {};
for(const id of ids){
  base = new Date(base.getTime()+5*60000);
  const f24 = new Date(base.getTime()+24*3600000);
  const f72 = new Date(base.getTime()+72*3600000);
  const f7d = new Date(base.getTime()+7*24*3600000);
  schedule[id] = {scheduled_at:fmt(base),f24:fmt(f24),f72:fmt(f72),f7d:fmt(f7d)};
}

const jLines = fs.readFileSync(jsonlPath,'utf8').split(/\r?\n/).filter(Boolean).map(l=>JSON.parse(l));
for(const row of jLines){
  if(schedule[row.lead_id]){
    const s=schedule[row.lead_id];
    row.scheduled_at=s.scheduled_at;
    row.followup_24h_at=s.f24;
    row.followup_72h_at=s.f72;
    row.followup_7d_at=s.f7d;
    row.followup_1_at=s.f24;
    row.followup_2_at=s.f72;
  }
}
fs.writeFileSync(jsonlPath,jLines.map(o=>JSON.stringify(o)).join('\n')+'\n');

const cLines = fs.readFileSync(csvPath,'utf8').split(/\r?\n/).filter(Boolean);
const head = cLines[0];
const body = cLines.slice(1).map(line=>{
  const cols = line.split('","');
  const id = cols[4]?.replace(/^"/,'').replace(/"$/,'');
  if(schedule[id]){
    const s=schedule[id];
    cols[0] = `"${s.scheduled_at}`;
    cols[22] = s.f24;
    cols[23] = s.f72;
    cols[24] = s.f7d+`"`;
  }
  return cols.join('","');
});
fs.writeFileSync(csvPath,[head,...body].join('\n')+'\n');

console.log('repaired', ids.length);
