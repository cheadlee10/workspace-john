// Pure API deployment - no CLI needed
const https = require('https');
const fs = require('fs');
const path = require('path');

const VERCEL_TOKEN = 'REDACTED';
const DOMAIN = 'northstar-synergy.dev';

function apiRequest(method, urlPath, data) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.vercel.com',
      path: urlPath,
      method: method,
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function deploy() {
  console.log('🚀 Deploying NorthStar Synergy via API...\n');

  try {
    // 1. Check if project exists or create it
    console.log('📦 Creating/checking project...');
    const projectRes = await apiRequest('POST', '/v9/projects', {
      name: 'northstar-synergy',
      framework: 'nextjs',
    });

    let projectId;
    if (projectRes.status === 409) {
      // Project exists, get it
      const listRes = await apiRequest('GET', '/v9/projects');
      const existing = listRes.data.projects.find(p => p.name === 'northstar-synergy');
      projectId = existing ? existing.id : null;
      console.log('✓ Using existing project:', projectId);
    } else if (projectRes.status === 200 || projectRes.status === 201) {
      projectId = projectRes.data.id;
      console.log('✓ Project created:', projectId);
    } else {
      throw new Error('Failed to create project: ' + JSON.stringify(projectRes));
    }

    if (!projectId) throw new Error('No project ID');

    // 2. Create deployment via Git integration or file upload
    console.log('\n📤 Creating deployment...');
    console.log('Note: Using Vercel CLI for file upload (requires manual trigger)');
    console.log('Visit: https://vercel.com/new/clone?repository-url=file://' + __dirname);
    
    // For now, we'll use the project creation and domain setup
    // The actual file deployment needs either Git or CLI with auth
    
    // 3. Register domain
    console.log('\n🔍 Checking domain availability...');
    const domainCheck = await apiRequest('GET', `/v4/domains/status?name=${DOMAIN}`);
    
    if (!domainCheck.data.available) {
      console.log('❌ Domain not available:', DOMAIN);
      console.log('Try: northstarsynergy.com');
      return;
    }

    console.log(`✓ Domain available: ${DOMAIN} ($${(domainCheck.data.price / 100).toFixed(2)})`);

    console.log('\n💳 Purchasing domain...');
    const buyRes = await apiRequest('POST', '/v5/domains/buy', {
      name: DOMAIN,
      expectedPrice: domainCheck.data.price,
    });

    if (buyRes.status !== 200) {
      console.error('❌ Domain purchase failed:', buyRes.data);
      console.log('\nPossible issues:');
      console.log('  - Payment method not on file');
      console.log('  - Add at: https://vercel.com/account/billing');
      return;
    }

    console.log('✓ Domain purchased!');

    // 4. Add domain to project
    console.log('\n🔗 Adding domain to project...');
    const addDomain = await apiRequest('POST', `/v9/projects/${projectId}/domains`, {
      name: DOMAIN,
    });

    if (addDomain.status === 200) {
      console.log('✓ Domain configured');
    }

    console.log('\n' + '='.repeat(60));
    console.log('✅ DEPLOYMENT SETUP COMPLETE!');
    console.log('='.repeat(60));
    console.log(`\n🌐 Domain: https://${DOMAIN} (will be live once deployed)`);
    console.log(`📊 Dashboard: https://vercel.com/dashboard`);
    console.log('\n⚠️  FINAL STEP NEEDED:');
    console.log('Go to https://vercel.com/new');
    console.log('Click "Import Git Repository"');
    console.log('Or upload this folder: ' + __dirname);
    console.log('Project will auto-deploy to the domain.');
    console.log('');

  } catch (error) {
    console.error('\n❌ Deployment failed:', error.message);
  }
}

deploy();
