const https = require('https');

const VERCEL_TOKEN = 'REDACTED';

const OPTIONS = [
  'northstar-synergy.com',
  'northstarsynergy.io',
  'getsynergy.io',
  'synergynorthstar.com',
  'northstar-systems.com',
  'northstar-tech.com',
  'nstarsynergy.com',
  'northstar-dev.com'
];

function check(domain) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'api.vercel.com',
      path: `/v4/domains/status?name=${domain}`,
      headers: { 'Authorization': `Bearer ${VERCEL_TOKEN}` }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ domain, available: parsed.available, price: parsed.price });
        } catch (e) {
          resolve({ domain, available: false });
        }
      });
    }).on('error', () => resolve({ domain, available: false }));
  });
}

async function find() {
  console.log('🔍 Checking domains...\n');
  
  for (const domain of OPTIONS) {
    const result = await check(domain);
    if (result.available) {
      console.log(`✅ ${domain} - AVAILABLE - $${(result.price / 100).toFixed(2)}`);
    } else {
      console.log(`❌ ${domain} - taken`);
    }
  }
}

find();
