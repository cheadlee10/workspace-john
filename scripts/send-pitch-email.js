// Quick email sender using nodemailer with a free SMTP relay
// Uses Brevo (formerly Sendinblue) SMTP - free tier: 300 emails/day
// Or falls back to direct SMTP

const nodemailer = require('nodemailer');

const pitches = [
  {
    to: 'evergreen_landscaping@ymail.com',
    business: 'Ever-Green Landscaping',
    city: 'Everett',
    years: '25+',
    reviews: '10',
    phone: '(425) 346-4961',
  },
  {
    to: 'pandalandscapin8242@gmail.com', 
    business: 'Panda Landscaping',
    city: 'Everett',
    years: '',
    reviews: '',
    phone: '(425) 530-8242',
  }
];

function buildEmail(p) {
  const yearsLine = p.years ? `${p.years} years in business — that's incredible! ` : '';
  const reviewsLine = p.reviews ? `${p.reviews} reviews on Yelp show your customers trust you. ` : '';
  
  return {
    from: '"John at NorthStar Synergy" <northstarsynergy@gmail.com>',
    to: p.to,
    subject: `I'd like to build a website for ${p.business}`,
    text: `Hi there,

I came across ${p.business} while researching landscaping companies in ${p.city}. ${yearsLine}${reviewsLine}

I noticed you don't have a website, and I wanted to reach out because I build professional websites specifically for landscaping businesses.

Here's what I can create for you:
• Professional website with your services, reviews, and photos
• Mobile-optimized (80% of customers search on their phones)
• Contact form so customers can reach you 24/7
• SEO optimized to show up when people Google "landscaping ${p.city} WA"
• Click-to-call button that goes straight to ${p.phone}

The cost: $250 one-time. Hosting is $10/month, first month free.

Most web designers charge $2,000-5,000 for a site like this. I specialize in local service businesses so I can offer it at a fraction of the cost.

If you get just ONE extra customer from Google search, this pays for itself immediately.

Interested? Reply to this email and I'll build a custom demo site for your business within 48 hours — no commitment, no charge for the demo.

Best,
John
NorthStar Synergy
(877) 748-1356
https://website-one-vert-92.vercel.app`,
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; line-height: 1.6; color: #333;">
<p>Hi there,</p>

<p>I came across <strong>${p.business}</strong> while researching landscaping companies in ${p.city}. ${yearsLine}${reviewsLine}</p>

<p>I noticed you don't have a website, and I wanted to reach out because I build professional websites specifically for landscaping businesses.</p>

<p><strong>Here's what I can create for you:</strong></p>
<ul>
<li>Professional website with your services, reviews, and photos</li>
<li>Mobile-optimized (80% of customers search on their phones)</li>
<li>Contact form so customers can reach you 24/7</li>
<li>SEO optimized to show up when people Google "landscaping ${p.city} WA"</li>
<li>Click-to-call button that goes straight to ${p.phone}</li>
</ul>

<p><strong>The cost:</strong> $250 one-time. Hosting is $10/month, first month free.</p>

<p>Most web designers charge $2,000-$5,000 for a site like this. I specialize in local service businesses so I can offer it at a fraction of the cost.</p>

<p><em>If you get just ONE extra customer from Google search, this pays for itself immediately.</em></p>

<p><strong>Interested?</strong> Reply to this email and I'll build a custom demo site for your business within 48 hours — no commitment, no charge for the demo.</p>

<p>Best,<br>
<strong>John</strong><br>
NorthStar Synergy<br>
(877) 748-1356</p>
</div>`
  };
}

// For now, output the emails as JSON so we can send them
pitches.forEach(p => {
  const email = buildEmail(p);
  console.log(JSON.stringify({ to: email.to, subject: email.subject, textPreview: email.text.substring(0, 200) + '...' }));
});

console.log('\nEmails ready. Need SMTP credentials to send.');
