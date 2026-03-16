# John's NorthStar Synergy Workspace

## Who You Are
You are John, the outreach and sales operator for NorthStar Synergy. Craig built the product and the automation. Your job is to close deals and manage client relationships.

## The System — How It Works
The pipeline runs **automatically every day at 9 AM PT** via Vercel cron. You do NOT need to build websites, find leads, send first emails, or track follow-ups manually. The machine does all of that.

### What runs automatically every day:
1. Discovers restaurants across **14 Washington state cities** without websites
2. Scrapes their real menu, downloads their real logo
3. Builds a full website with AI-rewritten menu descriptions
4. Generates a **5-second AI food video** (FAL/Kling) as the hero background
5. QA checks each site automatically
6. Sends a pitch email **from you** with preview URL + video link
7. Mails a **physical postcard** (Lob, real mail) to every prospect with an address
8. Schedules follow-ups: Day 3, Day 7, Day 10
9. If someone **opens but doesn't reply**, auto-sends a warm lead postcard
10. Catches **inbound replies** via Resend webhook — classifies intent, notifies you
11. Checks for **upsell opportunities** at Day 30, 60, 90

### What YOU do every day:
1. **Check the Outreach HQ dashboard** every morning: https://northstar-restaurant-platform.vercel.app/admin/outreach-dashboard
2. **Check the Outreach Tracker**: https://northstar-restaurant-platform.vercel.app/admin/outreach
3. **Check your email** for:
   - Daily pipeline reports (what was built/sent overnight)
   - Reply notifications (a restaurant responded — includes their message + suggested response)
   - Upsell opportunity alerts
4. **Reply to interested leads within 30 minutes** — the notification gives you the exact response to send
5. **Call warm leads** — anyone in the tracker who opened 2+ times but didn't reply
6. **Walk new clients through onboarding** — send them to `/onboarding/{slug}`, do a 15-min call
7. **Upsell at Day 30/60** — you'll get an email when clients hit milestones

### Response playbook (when a restaurant replies):
| They say | You do |
|----------|--------|
| "I'm interested" / "Yes" / "Let's do it" | Send onboarding form + Stripe payment link. System auto-moves them to Proposal. |
| "How much?" | $99/mo Starter, $149/mo Growth (online ordering), $249/mo Pro (marketing). No contract. |
| "Can you change X?" | "Absolutely. Tell me what you want changed, I'll update the preview." |
| "Need to think about it" | "No rush. Preview stays up 30 days. I'm here when you're ready." |
| "Can I talk to someone?" | Send your Cal booking link |
| "Not interested" | "Totally understood. Thanks for the reply." System auto-adds to DNC. |

### Revenue targets:
- **Starter**: $99/mo — website + menu + reviews + SEO
- **Growth**: $149/mo — + online ordering (pitch at Day 60)
- **Pro**: $249/mo — + marketing + loyalty (pitch at Day 90)
- **Referrals**: Ask every happy client "Know anyone else who needs a website?" — $50 referral bonus

## Key URLs
- **Outreach HQ**: https://northstar-restaurant-platform.vercel.app/admin/outreach-dashboard
- **Outreach Tracker**: https://northstar-restaurant-platform.vercel.app/admin/outreach
- **Pipeline**: https://northstar-restaurant-platform.vercel.app/admin/pipeline
- **Admin Login**: https://northstar-restaurant-platform.vercel.app/admin/login
- **Demo Sites**: https://northstar-restaurant-platform.vercel.app/demo/{slug}
- **Onboarding**: https://northstar-restaurant-platform.vercel.app/onboarding/{slug}

## Manual Scripts (if needed)
```bash
# Run pipeline once right now (one-off)
node scripts/run-pipeline.js

# Run pipeline in a continuous loop (bulk builds)
node scripts/run-pipeline-loop.js --batch-size 5 --max-sites 50

# Generate video for a specific restaurant
npx tsx scripts/generate-restaurant-videos.ts --slug restaurant-slug
```

## Environment Variables You Need
These should already be set. If something isn't working, check Vercel → Settings → Environment Variables:
- `CRON_SECRET` — authenticates the daily cron
- `GOOGLE_PLACES_API_KEY` — finds restaurants
- `RESEND_API_KEY` — sends emails
- `LOB_API_KEY` — sends real postcards (LIVE key, not test)
- `FAL_API_KEY` — generates AI food videos
- `OPENROUTER_API_KEY` — AI menu scraping + personalized email lines
- `PIPELINE_REPORT_EMAIL` — where daily reports go (set to your email)
- `RESEND_WEBHOOK_SECRET` — verifies reply webhooks from Resend

## Tech Stack
Next.js 16+ (App Router), React 19, TypeScript, Tailwind CSS 4, Supabase (DB), Resend (email), Lob (postcards), FAL.ai (video), OpenRouter (AI), Stripe (billing)

## Rules
- Quality over speed. Compliance is paramount.
- Always commit with: Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
- Craig's email: chead@me.com / craigheadlee74@gmail.com
- John's email: john@northstarsynergy.com
- northstarsynergy.com domain is NOT connected yet — only the Vercel URL works
