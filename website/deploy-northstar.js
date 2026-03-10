// Complete deployment automation for NorthStar Synergy
// Run: node deploy-northstar.js

const https = require('https')
const { exec } = require('child_process')
const util = require('util')
const execPromise = util.promisify(exec)

const VERCEL_TOKEN = process.env.VERCEL_TOKEN || 'REDACTED'
const DOMAIN = 'northstar-synergy.dev'

// Simple fetch wrapper for Node without external deps
function fetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url)
    const reqOptions = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {},
    }

    const req = https.request(reqOptions, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try {
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            json: () => Promise.resolve(JSON.parse(data)),
            text: () => Promise.resolve(data),
          })
        } catch (e) {
          resolve({
            ok: false,
            status: res.statusCode,
            text: () => Promise.resolve(data),
          })
        }
      })
    })

    req.on('error', reject)
    
    if (options.body) {
      req.write(options.body)
    }
    
    req.end()
  })
}

async function deploy() {
  console.log('🚀 Starting NorthStar Synergy deployment...\n')

  try {
    // 1. Create Vercel project
    console.log('📦 Creating Vercel project...')
    const projectRes = await fetch('https://api.vercel.com/v9/projects', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'northstar-synergy',
        framework: 'nextjs',
      }),
    })

    if (!projectRes.ok) {
      const error = await projectRes.text()
      console.error('❌ Failed to create project:', error)
      
      // Check if project already exists
      console.log('Checking existing projects...')
      const listRes = await fetch('https://api.vercel.com/v9/projects', {
        headers: { 'Authorization': `Bearer ${VERCEL_TOKEN}` },
      })
      const projects = await listRes.json()
      const existing = projects.projects.find(p => p.name === 'northstar-synergy')
      
      if (existing) {
        console.log('✓ Using existing project:', existing.id)
        var projectId = existing.id
      } else {
        throw new Error('Could not create or find project')
      }
    } else {
      const project = await projectRes.json()
      var projectId = project.id
      console.log('✓ Project created:', projectId)
    }

    // 2. Deploy via Vercel CLI
    console.log('\n📤 Deploying website...')
    console.log('(This may take 1-2 minutes...)')
    
    try {
      const { stdout, stderr } = await execPromise(
        `cd "${__dirname}" && npx vercel --token ${VERCEL_TOKEN} --prod --yes`,
        { maxBuffer: 1024 * 1024 * 10 }
      )
      console.log(stdout)
      if (stderr) console.error(stderr)
      console.log('✓ Website deployed')
    } catch (deployError) {
      console.error('❌ Deployment failed:', deployError.message)
      console.log('\nYou can deploy manually:')
      console.log('  cd website')
      console.log('  npx vercel --prod')
      return
    }

    // 3. Check domain availability
    console.log('\n🔍 Checking domain availability...')
    const domainCheckRes = await fetch(
      `https://api.vercel.com/v4/domains/status?name=${DOMAIN}`,
      { headers: { 'Authorization': `Bearer ${VERCEL_TOKEN}` } }
    )
    const domainCheck = await domainCheckRes.json()

    if (!domainCheck.available) {
      console.log('❌ Domain not available:', DOMAIN)
      console.log('Try these alternatives:')
      console.log('  - northstarsynergy.com')
      console.log('  - northstar.services')
      console.log('  - northstar-automation.dev')
      return
    }

    console.log(`✓ Domain available: ${DOMAIN} ($${(domainCheck.price / 100).toFixed(2)})`)

    // 4. Purchase domain
    console.log('\n💳 Purchasing domain...')
    const buyRes = await fetch('https://api.vercel.com/v5/domains/buy', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: DOMAIN,
        expectedPrice: domainCheck.price,
      }),
    })

    if (!buyRes.ok) {
      const error = await buyRes.text()
      console.error('❌ Domain purchase failed:', error)
      console.log('\nPossible issues:')
      console.log('  - Payment method not on file')
      console.log('  - Insufficient funds')
      console.log('Add payment: https://vercel.com/account/billing')
      return
    }

    console.log('✓ Domain purchased:', DOMAIN)

    // 5. Wait for DNS propagation
    console.log('\n⏳ Waiting 30s for DNS setup...')
    await new Promise(resolve => setTimeout(resolve, 30000))

    // 6. Add domain to project
    console.log('🔗 Adding domain to project...')
    const addDomainRes = await fetch(
      `https://api.vercel.com/v9/projects/${projectId}/domains`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${VERCEL_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: DOMAIN }),
      }
    )

    if (!addDomainRes.ok) {
      const error = await addDomainRes.text()
      console.error('❌ Failed to add domain:', error)
      return
    }

    console.log('✓ Domain configured')

    // Done!
    console.log('\n' + '='.repeat(60))
    console.log('✅ DEPLOYMENT COMPLETE!')
    console.log('='.repeat(60))
    console.log(`\n🌐 Your site: https://${DOMAIN}`)
    console.log(`📊 Dashboard: https://vercel.com/dashboard`)
    console.log(`\n🔐 SSL certificate will be provisioned in 5-10 minutes`)
    console.log('\nNext steps:')
    console.log('  1. Add live Stripe keys (Vercel dashboard → Settings → Environment Variables)')
    console.log('  2. Update Stripe webhook: https://' + DOMAIN + '/api/webhooks/stripe')
    console.log('  3. Test payment flow with real card')
    console.log('  4. Set up Google Workspace: john@northstarsynergy.com')
    console.log('  5. Configure Resend for receipts')
    console.log('  6. Start prospecting for first client!')
    console.log('')

  } catch (error) {
    console.error('\n❌ Deployment failed:', error.message)
    console.error(error.stack)
    process.exit(1)
  }
}

// Run deployment
if (!VERCEL_TOKEN) {
  console.error('❌ VERCEL_TOKEN not set')
  console.log('Set it: export VERCEL_TOKEN="vcp_..."')
  process.exit(1)
}

deploy()
