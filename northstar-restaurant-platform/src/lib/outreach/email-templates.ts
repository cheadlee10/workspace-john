/**
 * Outreach Email Templates
 *
 * Research finding: Plain text outperforms HTML 4x-9x for cold B2B email.
 * All outreach is plain text — no HTML, no images, no tracking pixels.
 *
 * Pitch angle: These restaurants have NO website. They're invisible online.
 * The pitch is visibility and being found, not commission savings.
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
  senderName: string;
  senderTitle: string;
  companyName: string;
  companyAddress: string; // Required by CAN-SPAM
  unsubscribeUrl: string;
  bookingUrl?: string;
  personalizedLine?: string;
}

export function generateInitialPitchEmail(ctx: EmailContext): {
  subject: string;
  body: string;
} {
  const greeting = ctx.ownerName
    ? `Hi ${ctx.ownerName},`
    : `Hi there,`;

  const subject = subjectLineVariants.initial[0](ctx.restaurantName);

  const ratingLine = ctx.googleRating
    ? ` ${ctx.googleRating}-star rating, ${ctx.reviewCount} reviews — your customers love you.`
    : "";

  const body = `${greeting}

I was looking for ${ctx.cuisineType} in ${ctx.city} and came across ${ctx.restaurantName} on Google.${ratingLine}

${ctx.personalizedLine ? `${ctx.personalizedLine}\n` : ""}
But when I looked for your website, there wasn't one.

So I built you one: ${ctx.previewUrl}
${ctx.videoUrl ? `\nHere's a quick preview of what visitors will see: ${ctx.videoUrl}\n` : ""}
It has your full menu (works great on phones), your Google reviews, your hours and location, and a button for customers to call you or get directions.

77% of people check a restaurant's website before deciding where to eat. Right now, those people are finding your competitors instead.

The site is yours if you want it. $99/month, no setup fee, no contract. Takes 30 minutes to go live.

Want to see a quick walkthrough? Book 5 minutes: ${ctx.bookingUrl ?? "[cal link]"}

${ctx.senderName}
NorthStar Synergy
${ctx.companyAddress}

---
Not interested? No worries: ${ctx.unsubscribeUrl}`;

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

Just following up — your preview site is still live:

${ctx.previewUrl}

I built it with your actual menu, your real Google reviews, and your hours. It's not a template — it's YOUR restaurant.

If there's anything you'd want changed, I'm happy to tweak it. Menu items, photos, colors — whatever makes it feel right.

$99/month. No contract. Cancel anytime.

${ctx.senderName}
NorthStar Synergy
${ctx.companyAddress}

---
${ctx.unsubscribeUrl}`;

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

Last email from me — I don't want to be a pest.

Your preview site is still up for 30 days: ${ctx.previewUrl}

If the timing isn't right, totally understand. But every day without a website, the people searching for ${ctx.cuisineType} in ${ctx.city} are finding someone else.

Wishing you and the team all the best.

${ctx.senderName}
NorthStar Synergy
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
    (name: string) => `I built ${name} a website — take a look`,
    (name: string) => `${name} deserves to be found online`,
    (name: string) => `Your next customer just Googled "${name}" near me`,
  ],
  followUp: [
    (name: string) => `Re: ${name}'s website`,
    (name: string) => `Your preview site is still live — ${name}`,
  ],
  final: [
    (name: string) => `Last note about ${name}`,
    (name: string) => `Closing the loop on ${name}'s website`,
  ],
};
