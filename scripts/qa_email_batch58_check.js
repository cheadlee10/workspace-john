const fs=require('fs');
const p='email-templates/next-queued-email-assets-2026-03-03-batch58.md';
const c=fs.readFileSync(p,'utf8');
const nonAscii=[...c].filter(ch=>ch.charCodeAt(0)>127).length;
const sectionRegex=/## \d+\) ([^\n]+)[\s\S]*?\*\*Email body\*\*([\s\S]*?)(?=\n---\n\n## |$)/g;
let m; let idx=0; let fails=[];
while((m=sectionRegex.exec(c))!==null){
 idx++; const name=m[1].trim(); const body=m[2];
 const hasLive=body.includes('{{live_url}}');
 const hasShot=body.includes('{{screenshot_url}}');
 const banned=/(guarantee|guaranteed|#1|ranked|best in|results|increase|boost|more leads)/i.test(body);
 if(!hasLive||!hasShot||banned) fails.push({idx,name,hasLive,hasShot,banned});
}
console.log('sections',idx);
console.log('nonAsciiChars',nonAscii);
console.log('fails',JSON.stringify(fails,null,2));
