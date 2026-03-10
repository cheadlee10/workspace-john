// Reddit Lead Monitor - Find gigs matching our services
// Run: node reddit-lead-monitor.js
// Requires: Brave Search API key

const KEYWORDS = [
  'need help with excel',
  'automate spreadsheet',
  'python script needed',
  'web scraper needed',
  'api integration help',
  'data cleaning service',
  'looking for developer',
  'need freelancer',
  'hire python developer',
  'excel automation'
]

const TARGET_SUBREDDITS = [
  'forhire',
  'slavelabour',
  'excel',
  'Python',
  'smallbusiness',
  'entrepreneur',
  'startups',
  'webdev',
  'learnpython'
]

async function searchReddit(keyword) {
  // Use Brave Search API when available
  const query = `site:reddit.com ${keyword}`
  
  // Placeholder - will use Brave API
  console.log(`Searching: ${query}`)
  
  // When Brave API ready:
  // const results = await braveSearch(query, { freshness: 'pd' }) // past day
  // return results.filter(r => r.age < 24) // last 24 hours
  
  return []
}

async function monitorKeywords() {
  console.log('🔍 Monitoring Reddit for leads...\n')
  
  const leads = []
  
  for (const keyword of KEYWORDS) {
    console.log(`Searching: "${keyword}"`)
    const results = await searchReddit(keyword)
    
    results.forEach(result => {
      leads.push({
        keyword,
        title: result.title,
        url: result.url,
        subreddit: extractSubreddit(result.url),
        age: result.age,
        snippet: result.snippet
      })
    })
  }
  
  // Sort by recency
  leads.sort((a, b) => a.age - b.age)
  
  // Display
  console.log(`\n✓ Found ${leads.length} potential leads\n`)
  
  leads.forEach((lead, i) => {
    console.log(`${i + 1}. r/${lead.subreddit}`)
    console.log(`   ${lead.title}`)
    console.log(`   ${lead.url}`)
    console.log(`   ${lead.age}h ago`)
    console.log('')
  })
  
  // Save to file
  const fs = require('fs')
  const timestamp = new Date().toISOString().split('T')[0]
  fs.writeFileSync(
    `../leads/reddit-leads-${timestamp}.json`,
    JSON.stringify(leads, null, 2)
  )
  
  console.log(`Saved to leads/reddit-leads-${timestamp}.json`)
}

function extractSubreddit(url) {
  const match = url.match(/reddit\.com\/r\/([^\/]+)/)
  return match ? match[1] : 'unknown'
}

// Run
monitorKeywords().catch(console.error)
