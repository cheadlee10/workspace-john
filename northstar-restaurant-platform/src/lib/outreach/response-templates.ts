export interface ResponseTemplateContext {
  restaurantName: string;
  ownerName?: string;
  previewUrl?: string;
  onboardingUrl?: string;
  senderName?: string;
  calBookingUrl?: string;
  stripeStarter?: string;
  stripeGrowth?: string;
  stripePro?: string;
}

function links() {
  return {
    cal: process.env.CAL_BOOKING_URL || "[cal link]",
    starter: process.env.STRIPE_LINK_STARTER || "[starter link]",
    growth: process.env.STRIPE_LINK_GROWTH || "[growth link]",
    pro: process.env.STRIPE_LINK_PRO || "[pro link]",
  };
}

export function replyYesIWantIt(ctx: ResponseTemplateContext): { subject: string; body: string } {
  const l = links();
  const owner = ctx.ownerName || "there";
  return {
    subject: `Welcome to NorthStar — let's get ${ctx.restaurantName} live`,
    body: `Hi ${owner},\n\nThrilled to have you on board. Here's how this works:\n\nStep 1: I'll send you a quick onboarding form (takes 5 minutes)\nStep 2: You fill in your full menu, upload any photos you want, and tell me what you'd like changed\nStep 3: I update your site and send you a final preview\nStep 4: You approve it, we flip it live\n\nYour preview site stays up the whole time: ${ctx.previewUrl || "[preview URL]"}\n\nHere's the onboarding form: ${ctx.onboardingUrl || "[onboarding URL]"}\n\nOnce I get your info back, your site goes live within 48 hours.\n\nFor payment, here's your subscription link:\nStarter ($99/mo): ${ctx.stripeStarter || l.starter}\n\nYou won't be charged until the site is live.\n\n${ctx.senderName || "John"}\nNorthStar Synergy`,
  };
}

export function replyHowMuch(): string {
  const l = links();
  return `Great question — we keep it simple:\n\nStarter — $99/mo\nWebsite + menu + reviews + SEO\n${l.starter}\n\nGrowth — $149/mo\nEverything in Starter + online ordering\n${l.growth}\n\nPro — $249/mo\nEverything in Growth + marketing + loyalty\n${l.pro}`;
}

export function replyCanISeeChanges(): string {
  return "Absolutely. Tell me exactly what you want changed and I’ll update your preview first so you can review it before anything goes live.";
}

export function replyNeedToThink(): string {
  return "No rush at all. Your preview stays up for 30 days, and I’m here whenever you’re ready.";
}

export function replyCanITalkToSomeone(ctx?: ResponseTemplateContext): string {
  const cal = ctx?.calBookingUrl || links().cal;
  return `Definitely — happy to talk. Grab any time that works here: ${cal}`;
}

export function replyNotInterested(): { body: string; shouldAddToDnc: boolean; dncReason: string } {
  return {
    body: "Totally understood — thanks for the reply. I’ll close this out on my side. If plans change later, we’re here to help.",
    shouldAddToDnc: true,
    dncReason: "prospect_not_interested",
  };
}
