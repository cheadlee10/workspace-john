#!/bin/bash
# Daily Outreach Automation - Run every morning
# Usage: bash daily-outreach.sh

echo "🚀 Starting daily outreach workflow..."
echo ""

# 1. Monitor Reddit for new leads
echo "📱 Checking Reddit..."
node reddit-lead-monitor.js

echo ""

# 2. Monitor Twitter for new leads
echo "🐦 Checking Twitter..."
node twitter-lead-monitor.js

echo ""

# 3. Check LinkedIn (manual - open browser)
echo "💼 Open LinkedIn and check for leads:"
echo "   - Search for posts about 'manual processes'"
echo "   - Check saved searches"
echo "   - Send 10 connection requests"

echo ""

# 4. Update leads.jsonl with any new leads found
echo "📊 Lead summary:"
echo "   Reddit leads: $(cat ../leads/reddit-leads-*.json 2>/dev/null | grep -c url || echo 0)"
echo "   Twitter leads: $(cat ../leads/twitter-leads-*.json 2>/dev/null | grep -c url || echo 0)"

echo ""
echo "✅ Daily outreach check complete!"
echo ""
echo "Next steps:"
echo "  1. Review leads in ../leads/ directory"
echo "  2. Respond to top 10-15 most recent"
echo "  3. Log responses to leads.jsonl"
echo "  4. Follow up on yesterday's leads"
