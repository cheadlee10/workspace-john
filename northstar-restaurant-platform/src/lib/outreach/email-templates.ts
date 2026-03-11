/**
 * Outreach Email Templates
 *
 * Research finding: Plain text outperforms HTML 4x-9x for cold B2B email.
 * We use plain text for cold outreach but include a GIF thumbnail linking
 * to their video walkthrough.
 *
 * Multi-touch cadence:
 * Day 1: Initial pitch with live website preview
 * Day 3: Follow-up with value proposition
 * Day 5-7: Phone call (voice AI)
 * Day 3-5: Postcard arrives (Lob.com)
 * Day 10: Final email
 */

export interface EmailContext {
  restaurantName: string;
  ownerName?: string;
  city: string;
  previewUrl: string;
  videoUrl: string;
  gifThumbnailUrl: string;
  googleRating?: number;
  reviewCount?: number;
  cuisineType: string;
  senderName: string; // "John" or configured name
  senderTitle: string;
  companyName: string;
  companyAddress: string; // Required by CAN-SPAM
  unsubscribeUrl: string;
  bookingUrl?: string;
}

export function generateInitialPitchEmail(ctx: EmailContext): {
  subject: string;
  body: string;
} {
  const greeting = ctx.ownerName
    ? `Hi ${ctx.ownerName},`
    : `Hi there,`;

  // A/B test subjects - use whichever performs better
  const subjects = [
    `I built ${ctx.restaurantName} a website (it's free to preview)`,
    `${ctx.restaurantName}'s new website is ready to preview`,
    `Quick question about ${ctx.restaurantName}`,
  ];

  const subject = subjects[0];

  const ratingLine = ctx.googleRating
    ? `\nI noticed ${ctx.restaurantName} has a ${ctx.googleRating}-star rating with ${ctx.reviewCount} reviews on Google - your customers clearly love what you do.`
    : "";

  const body = `${greeting}

I came across ${ctx.restaurantName} while looking for great ${ctx.cuisineType} restaurants in ${ctx.city}, and I was genuinely impressed.${ratingLine}

I took the liberty of building you a website to see what it could look like:

${ctx.previewUrl}

Here's a quick 30-second walkthrough: ${ctx.videoUrl}

The site includes:
- Your full menu (searchable, filterable, mobile-optimized)
- Online ordering (no DoorDash/UberEats commissions)
- Your Google reviews front and center
- SEO so people searching "${ctx.cuisineType} near me" find YOU first
- Everything works on any phone, tablet, or computer

There's no cost to preview. If you like it, plans start at $49/mo - a fraction of what you'd pay anywhere else, and we handle everything.

Would you be open to a quick 5-minute chat this week? I'd love to hear what you think.

Want to see a quick walkthrough? Book 5 minutes here: ${ctx.bookingUrl ?? "[cal link]"}

Best,
${ctx.senderName}
${ctx.senderTitle}
${ctx.companyName}
${ctx.companyAddress}

P.S. - 77% of diners check a restaurant's website before visiting. The ones that don't have one are leaving money on the table.

---
Not interested? No worries at all: ${ctx.unsubscribeUrl}`;

  return { subject, body };
}

export function generateFollowUpEmail(ctx: EmailContext): {
  subject: string;
  body: string;
} {
  const greeting = ctx.ownerName
    ? `Hi ${ctx.ownerName},`
    : `Hi there,`;

  const subject = `Re: ${ctx.restaurantName}'s website`;

  const body = `${greeting}

Just wanted to follow up on the website I built for ${ctx.restaurantName}. Wanted to make sure you had a chance to see it:

${ctx.previewUrl}

A few things I think you'd find valuable:

1. Every dish on your menu gets its own page on Google. When someone searches "best ${ctx.cuisineType} in ${ctx.city}", your dishes show up individually.

2. Online ordering goes directly to you - no 25-30% fees to DoorDash or UberEats.

3. Your ${ctx.googleRating}-star Google reviews display automatically, building trust before people even walk in.

I know you're busy running a restaurant, so I'll keep this brief. If there's any interest, I'm happy to jump on a quick call at whatever time works for you.

Want to see a quick walkthrough? Book 5 minutes here: ${ctx.bookingUrl ?? "[cal link]"}

Either way, no pressure at all. Just thought it was worth sharing.

Best,
${ctx.senderName}
${ctx.companyName}
${ctx.companyAddress}

---
Not interested? ${ctx.unsubscribeUrl}`;

  return { subject, body };
}

export function generateFinalEmail(ctx: EmailContext): {
  subject: string;
  body: string;
} {
  const greeting = ctx.ownerName
    ? `Hi ${ctx.ownerName},`
    : `Hi there,`;

  const subject = `Last note about ${ctx.restaurantName}`;

  const body = `${greeting}

This will be my last email - I don't want to be a pest.

I built a website for ${ctx.restaurantName} because I genuinely think it could help bring in more customers. The preview is still live if you want to check it out:

${ctx.previewUrl}

If the timing isn't right, I completely understand. I'll keep the preview up for another 30 days in case you change your mind.

If you want a quick walkthrough before deciding: ${ctx.bookingUrl ?? "[cal link]"}

Wishing you and the team at ${ctx.restaurantName} all the best.

${ctx.senderName}
${ctx.companyName}
${ctx.companyAddress}

---
${ctx.unsubscribeUrl}`;

  return { subject, body };
}

/**
 * Subject line A/B variants for testing
 */
export const subjectLineVariants = {
  initial: [
    (name: string) => `I built ${name} a website (it's free to preview)`,
    (name: string) => `${name}'s new website is ready to preview`,
    (name: string) => `Quick question about ${name}`,
    (name: string) => `A gift for ${name}`,
    (name: string) => `${name} deserves a better website`,
  ],
  followUp: [
    (name: string) => `Re: ${name}'s website`,
    (name: string) => `Did you see ${name}'s new website?`,
    (name: string) => `Following up - ${name}`,
  ],
  final: [
    (name: string) => `Last note about ${name}`,
    (name: string) => `Closing the loop on ${name}'s website`,
  ],
};
