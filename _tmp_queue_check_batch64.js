const fs=require('fs');
const path=require('path');
const batch=fs.readFileSync(path.join(process.cwd(),'email-templates','next-queued-email-assets-2026-03-03-batch64.md'),'utf8');
const ids=[...new Set([...batch.matchAll(/`(wave\d+-\d+)`/g)].map(m=>m[1]))];
const qj=fs.readFileSync(path.join(process.cwd(),'email-templates','send-queue-2026-03-02-next-batches.jsonl'),'utf8');
const qc=fs.readFileSync(path.join(process.cwd(),'email-templates','send-queue-2026-03-02-next-batches-tracker.csv'),'utf8');
const missJson=ids.filter(id=>!qj.includes(id));
const missCsv=ids.filter(id=>!qc.includes(id));
console.log(JSON.stringify({ids,missingJsonl:missJson,missingCsv:missCsv},null,2));
