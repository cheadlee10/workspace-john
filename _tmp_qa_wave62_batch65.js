const fs=require('fs');
const path=require('path');

const waveDir=path.join(process.cwd(),'sites','premium-v3-wave62');
const dirs=fs.readdirSync(waveDir,{withFileTypes:true}).filter(d=>d.isDirectory()).map(d=>d.name);
const siteIssues=[];
for(const d of dirs){
  const f=path.join(waveDir,d,'index.html');
  const c=fs.readFileSync(f,'utf8');
  if(/\{\{[^}]+\}\}|TODO|TBD|lorem ipsum|example\.com/i.test(c)) siteIssues.push({slug:d,issue:'placeholder'});
  const forms=[...c.matchAll(/<form\b[^>]*>/gi)].map(m=>m[0]);
  if(forms.length!==2) siteIssues.push({slug:d,issue:`form_count_${forms.length}`});
  for(const fm of forms){
    if(!/action=['\"]\/contact['\"]/i.test(fm) || !/method=['\"]post['\"]/i.test(fm)) siteIssues.push({slug:d,issue:'form_action_method'});
  }
  const hiddenBusiness=(c.match(/type='hidden' name='business'/g)||[]).length + (c.match(/type="hidden" name="business"/g)||[]).length;
  const hiddenSource=(c.match(/type='hidden' name='source'/g)||[]).length + (c.match(/type="hidden" name="source"/g)||[]).length;
  if(hiddenBusiness<2 || hiddenSource<2) siteIssues.push({slug:d,issue:'hidden_fields'});
  if((c.match(/guarantee|#1|top-rated|best in|double your|increase [0-9]+%|ROI|rank #1/gi)||[]).length) siteIssues.push({slug:d,issue:'bad_claim'});
  const phones=(c.match(/(?:\(?(?:\d{3})\)?[-\s]?){2}\d{4}|\(\d{3}\)\s*\d{3}-\d{4}|\d{3}-\d{3}-\d{4}/g)||[]);
  if(phones.some(p=>/555|123-456-7890|000/.test(p))) siteIssues.push({slug:d,issue:'fake_phone',phones});
  if(!((/<label[^>]+for='name'/.test(c)||/<label[^>]+for="name"/.test(c)) && (/(id='name'|id="name")/.test(c)))) siteIssues.push({slug:d,issue:'missing_name_label'});
}

const batchFile=path.join(process.cwd(),'email-templates','next-queued-email-assets-2026-03-03-batch65.md');
const e=fs.readFileSync(batchFile,'utf8');
const ids=[...new Set([...e.matchAll(/`(wave\d+-\d+)`/g)].map(m=>m[1]))];
const qj=fs.readFileSync(path.join(process.cwd(),'email-templates','send-queue-2026-03-02-next-batches.jsonl'),'utf8');
const qc=fs.readFileSync(path.join(process.cwd(),'email-templates','send-queue-2026-03-02-next-batches-tracker.csv'),'utf8');

const out={
  waveDirs:dirs.length,
  siteIssues,
  email:{
    sections:(e.match(/^##\s+\d+\)/gm)||[]).length,
    live:(e.match(/\{\{live_url\}\}/g)||[]).length,
    screenshot:(e.match(/\{\{screenshot_url\}\}/g)||[]).length,
    nonAscii:[...e].filter(ch=>ch.charCodeAt(0)>127).length,
    badClaims:(e.match(/guarantee|#1|top-rated|best in|double your|increase [0-9]+%|ROI|rank #1/gi)||[]).length,
    ids,
    missingJsonl:ids.filter(id=>!qj.includes(id)),
    missingCsv:ids.filter(id=>!qc.includes(id))
  }
};
console.log(JSON.stringify(out,null,2));