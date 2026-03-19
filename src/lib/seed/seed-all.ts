/**
 * Demo Data Seeder
 *
 * Populates all stores with realistic demo data.
 * Called once on first admin page load (idempotent).
 */

import { createLead, moveLeadToStage, addLeadNote, getLeadCount } from "@/lib/crm/lead-store";
import { createClient, getClientCount } from "@/lib/crm/client-store";
import { addExpense, addRevenue } from "@/lib/finance/pnl-store";
import { createFaq, createSop, getFaqCount } from "@/lib/support/faq-store";
import { createTicket } from "@/lib/support/ticket-store";
import { createSequence } from "@/lib/outreach/sequence-store";
import { logActivity } from "@/lib/activity/activity-store";
import { markSchemaUnavailable, isTableNotFoundError } from "@/lib/db/supabase";

let seeded = false;

export async function seedAll(): Promise<void> {
  if (seeded) return;

  try {
    const [leadCount, clientCount, faqCount] = await Promise.all([
      getLeadCount(),
      getClientCount(),
      getFaqCount(),
    ]);

    if (leadCount > 0 || clientCount > 0 || faqCount > 0) {
      seeded = true;
      return;
    }
  } catch (err: unknown) {
    // If DB tables don't exist yet, fall back to in-memory stores
    if (isTableNotFoundError(err as { code?: string; message?: string })) {
      markSchemaUnavailable();
    } else if (err instanceof Error && isTableNotFoundError({ message: err.message })) {
      markSchemaUnavailable();
    } else {
      console.error("[Seed] Error checking seed state:", err);
    }
  }

  seeded = true;

  try {
    await seedLeads();
    const clients = await seedClients();
    await seedSequences();
    await seedFinancials(clients);
    await seedFaqs();
    await seedSops();
    await seedTickets();
    await seedActivities();
  } catch (err) {
    console.error("[Seed] Error during seeding (non-fatal):", err);
  }
}

async function seedLeads() {
  const leadsData = [
    { name: "Bella Napoli", contact: "Marco Rossi", email: "marco@bellanapoli.com", phone: "(206) 555-0101", address: "245 Pine St", city: "Seattle", state: "WA", source: "google_scraper" as const, score: 85 },
    { name: "Golden Dragon", contact: "Wei Chen", email: "wei@goldendragon.com", phone: "(206) 555-0102", address: "1820 International Blvd", city: "Seattle", state: "WA", source: "google_scraper" as const, score: 72 },
    { name: "Taqueria El Sol", contact: "Maria Garcia", email: "maria@taqueriaelsol.com", phone: "(503) 555-0103", address: "4501 SE Division", city: "Portland", state: "OR", source: "referral" as const, score: 90 },
    { name: "Café Parisien", contact: "Jean-Luc Moreau", email: "jlmoreau@cafeparisien.com", phone: "(206) 555-0104", address: "515 Pike St", city: "Seattle", state: "WA", source: "inbound" as const, score: 78 },
    { name: "Sushi Zen", contact: "Yuki Tanaka", email: "yuki@sushizen.com", phone: "(425) 555-0105", address: "10230 NE 8th St", city: "Bellevue", state: "WA", source: "google_scraper" as const, score: 65 },
    { name: "BBQ Pitmaster", contact: "Jim Reynolds", email: "jim@bbqpitmaster.com", phone: "(253) 555-0106", address: "3300 Pacific Ave", city: "Tacoma", state: "WA", source: "google_scraper" as const, score: 55 },
    { name: "Pho Lucky", contact: "Tran Nguyen", email: "tran@pholucky.com", phone: "(206) 555-0107", address: "1032 S Jackson St", city: "Seattle", state: "WA", source: "manual" as const, score: 60 },
    { name: "The Greek Corner", contact: "Nikos Papadopoulos", email: "nikos@greekcorner.com", phone: "(206) 555-0108", address: "2201 1st Ave", city: "Seattle", state: "WA", source: "website" as const, score: 82 },
    { name: "Curry House", contact: "Priya Sharma", email: "priya@curryhouse.com", phone: "(425) 555-0109", address: "15600 NE 8th St", city: "Bellevue", state: "WA", source: "referral" as const, score: 88 },
    { name: "Fish & Chips Co", contact: "Oliver Wright", email: "oliver@fishandchips.com", phone: "(360) 555-0110", address: "100 Commercial Ave", city: "Anacortes", state: "WA", source: "google_scraper" as const, score: 45 },
    { name: "Pizza Roma", contact: "Antonio Bianchi", email: "antonio@pizzaroma.com", phone: "(509) 555-0111", address: "210 W Sprague Ave", city: "Spokane", state: "WA", source: "google_scraper" as const, score: 50 },
    { name: "Noodle Bar 88", contact: "David Liu", email: "david@noodlebar88.com", phone: "(206) 555-0112", address: "610 5th Ave S", city: "Seattle", state: "WA", source: "inbound" as const, score: 75 },
    { name: "Farm Table Bistro", contact: "Sarah Collins", email: "sarah@farmtable.com", phone: "(360) 555-0113", address: "45 Main St", city: "Olympia", state: "WA", source: "referral" as const, score: 92 },
    { name: "Sunrise Brunch", contact: "Amy Peters", email: "amy@sunrisebrunch.com", phone: "(206) 555-0114", address: "2300 NW Market St", city: "Seattle", state: "WA", source: "website" as const, score: 68 },
    { name: "Izakaya Tanuki", contact: "Kenji Watanabe", email: "kenji@izakayatanuki.com", phone: "(206) 555-0115", address: "1501 Pike Pl", city: "Seattle", state: "WA", source: "google_scraper" as const, score: 80 },
  ];

  const stages = [
    "prospect", "prospect", "prospect",
    "outreach", "outreach", "outreach",
    "demo", "demo",
    "proposal", "proposal",
    "close",
    "onboarding",
    "active", "active", "active",
  ];

  for (let i = 0; i < leadsData.length; i++) {
    const d = leadsData[i];
    const lead = await createLead({
      restaurantName: d.name,
      contactName: d.contact,
      email: d.email,
      phone: d.phone,
      address: d.address,
      city: d.city,
      state: d.state,
      source: d.source,
      score: d.score,
      value: d.score > 80 ? 249 : d.score > 60 ? 149 : 99,
    });

    const targetStage = stages[i];
    if (targetStage !== "prospect") {
      await moveLeadToStage(lead.id, targetStage as "outreach" | "demo" | "proposal" | "close" | "onboarding" | "active");
    }

    if (i % 3 === 0) {
      await addLeadNote(lead.id, `Initial research: ${d.name} looks like a good fit for our ${d.score > 80 ? "pro" : "growth"} plan.`);
    }
  }
}

async function seedClients(): Promise<{ id: string; name: string; amount: number }[]> {
  const clientsData = [
    { name: "Taqueria El Sol", contact: "Maria Garcia", email: "maria@taqueriaelsol.com", phone: "(503) 555-0103", plan: "pro" as const, domain: "taqueriaelsol.com", revenue: 249 },
    { name: "Farm Table Bistro", contact: "Sarah Collins", email: "sarah@farmtable.com", phone: "(360) 555-0113", plan: "pro" as const, domain: "farmtablebistro.com", revenue: 249 },
    { name: "Curry House", contact: "Priya Sharma", email: "priya@curryhouse.com", phone: "(425) 555-0109", plan: "growth" as const, domain: "curryhouse.com", revenue: 149 },
    { name: "The Greek Corner", contact: "Nikos Papadopoulos", email: "nikos@greekcorner.com", phone: "(206) 555-0108", plan: "growth" as const, domain: "greekcornerseattle.com", revenue: 149 },
    { name: "Izakaya Tanuki", contact: "Kenji Watanabe", email: "kenji@izakayatanuki.com", phone: "(206) 555-0115", plan: "starter" as const, domain: null, revenue: 99 },
    { name: "Sunrise Brunch", contact: "Amy Peters", email: "amy@sunrisebrunch.com", phone: "(206) 555-0114", plan: "starter" as const, domain: null, revenue: 99 },
    { name: "Sakura Kitchen (Demo)", contact: "Demo Owner", email: "demo@sakurakitchen.com", phone: "(206) 555-0200", plan: "pro" as const, domain: "sakurakitchen.com", revenue: 249 },
  ];

  const created: { id: string; name: string; amount: number }[] = [];
  for (const d of clientsData) {
    const client = await createClient({
      restaurantName: d.name,
      contactName: d.contact,
      email: d.email,
      phone: d.phone,
      plan: d.plan,
      domain: d.domain || undefined,
      deployUrl: `https://${(d.domain || d.name.toLowerCase().replace(/\s+/g, "-") + ".vercel.app")}`,
      monthlyRevenue: d.revenue,
    });
    created.push({ id: client.id, name: d.name, amount: d.revenue });
  }
  return created;
}

async function seedSequences() {
  await createSequence({
    name: "New Prospect Introduction",
    description: "3-email sequence for newly discovered restaurants",
    steps: [
      { dayOffset: 0, subject: "I built a website for {{restaurantName}}", body: "Hi {{contactName}},\n\nI noticed {{restaurantName}} in {{city}} and I think your restaurant deserves a better online presence.\n\nI actually went ahead and built a demo website for you — check it out:\n{{previewUrl}}\n\nThis is a fully functional site with online ordering, SEO optimization, and mobile-first design.\n\nWould you be open to a quick 10-minute call to walk through it?\n\nBest,\nNorthStar Synergy" },
      { dayOffset: 3, subject: "Quick follow up — {{restaurantName}} demo site", body: "Hi {{contactName}},\n\nJust following up on the demo I built for {{restaurantName}}. Have you had a chance to take a look?\n\n{{previewUrl}}\n\nOur restaurants see an average 40% increase in online orders after switching to our platform.\n\nHappy to do a quick walkthrough whenever works for you.\n\nBest,\nNorthStar Synergy" },
      { dayOffset: 7, subject: "Last note about {{restaurantName}}'s website", body: "Hi {{contactName}},\n\nI don't want to be a pest, so this is my last note. The demo I built for {{restaurantName}} will stay live for another week if you want to check it out:\n\n{{previewUrl}}\n\nIf the timing isn't right, no worries at all. Just reply 'interested' whenever you're ready and I'll be here.\n\nCheers,\nNorthStar Synergy" },
    ],
  });

  await createSequence({
    name: "Post-Demo Follow Up",
    description: "2-email follow up after demo meeting",
    steps: [
      { dayOffset: 0, subject: "Great meeting, {{contactName}}!", body: "Hi {{contactName}},\n\nThanks for taking the time to look at the demo for {{restaurantName}}. I'm confident we can help grow your online presence.\n\nAs discussed, here's what's included in your plan:\n- Custom website matching your brand\n- Built-in online ordering\n- Google/Yelp review integration\n- SEO optimization for local search\n\nReady to get started? Just reply and we'll have you live in 48 hours.\n\nBest,\nNorthStar Synergy" },
      { dayOffset: 4, subject: "Quick question about {{restaurantName}}", body: "Hi {{contactName}},\n\nJust checking in. Were there any questions about the proposal I can help with?\n\nWe're running a launch special this month — 50% off the first 3 months for new clients.\n\nLet me know!\n\nBest,\nNorthStar Synergy" },
    ],
  });
}

async function seedFinancials(clients: { id: string; name: string; amount: number }[]) {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthStr = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, "0")}`;

  const recurringExpenses = [
    { description: "Vercel Pro (Hosting)", amount: 20, category: "hosting" as const },
    { description: "Resend Pro (Email)", amount: 25, category: "email" as const },
    { description: "Twilio (SMS)", amount: 15, category: "sms" as const },
    { description: "Domain registrations (5)", amount: 12, category: "hosting" as const },
    { description: "Stripe fees (est.)", amount: 35, category: "payment_processing" as const },
    { description: "Figma (Design)", amount: 15, category: "software" as const },
    { description: "GitHub Pro", amount: 4, category: "software" as const },
  ];

  for (const exp of recurringExpenses) {
    await addExpense({ ...exp, isRecurring: true, recurringInterval: "monthly", date: `${lastMonthStr}-01` });
    await addExpense({ ...exp, isRecurring: false, date: `${currentMonth}-01` });
  }

  await addExpense({ description: "WA State LLC Filing", amount: 200, category: "tax", date: `${lastMonthStr}-05` });
  await addExpense({ description: "Google Workspace", amount: 7.20, category: "software", isRecurring: true, recurringInterval: "monthly", date: `${lastMonthStr}-01` });

  for (const client of clients) {
    await addRevenue({ clientId: client.id, clientName: client.name, amount: client.amount, type: "subscription", date: `${lastMonthStr}-01` });
    await addRevenue({ clientId: client.id, clientName: client.name, amount: client.amount, type: "subscription", date: `${currentMonth}-01` });
  }

  // Setup fees for specific clients (find by name from the created list)
  const izakaya = clients.find((c) => c.name === "Izakaya Tanuki");
  const sunrise = clients.find((c) => c.name === "Sunrise Brunch");
  if (izakaya) {
    await addRevenue({ clientId: izakaya.id, clientName: izakaya.name, amount: 150, type: "setup_fee", date: `${lastMonthStr}-10` });
  }
  if (sunrise) {
    await addRevenue({ clientId: sunrise.id, clientName: sunrise.name, amount: 150, type: "setup_fee", date: `${lastMonthStr}-15` });
  }
}

async function seedFaqs() {
  const faqsData = [
    { q: "How much does NorthStar Synergy cost?", a: "We offer three plans: Starter ($99/mo), Growth ($149/mo), and Pro ($249/mo). All plans include hosting, SSL, and basic SEO. See our pricing page for full details.", category: "Billing", tags: ["pricing", "cost", "plans"] },
    { q: "How do I update my payment method?", a: "You can update your payment method through the Stripe billing portal. Log in to your admin dashboard and click 'Billing' to access the portal. You can update your card, view invoices, and manage your subscription there.", category: "Billing", tags: ["payment", "card", "billing"] },
    { q: "Can I cancel my subscription?", a: "Yes, you can cancel anytime. Log in to your admin dashboard, go to Billing, and click 'Cancel Subscription'. Your site will remain active until the end of your current billing period. We don't charge cancellation fees.", category: "Billing", tags: ["cancel", "subscription"] },
    { q: "Why was I charged twice?", a: "Double charges can happen if a payment initially fails and is retried. Check your bank statement — one charge may show as 'pending' and will drop off within 3-5 business days. If both charges are confirmed, contact us and we'll issue a refund for the duplicate.", category: "Billing", tags: ["double charge", "refund"] },
    { q: "Do you offer a free trial?", a: "We offer a 14-day free trial on all plans. No credit card required to start. You'll get full access to all features during the trial period.", category: "Billing", tags: ["trial", "free"] },
    { q: "How do I update my menu?", a: "Log in to your admin dashboard, go to 'Menu Management', and you can add, edit, or remove menu items. Changes go live immediately. You can also update prices, descriptions, and photos.", category: "Website", tags: ["menu", "update", "edit"] },
    { q: "How do I change my restaurant's hours?", a: "Go to your admin dashboard, click 'Settings' > 'Business Hours'. You can set different hours for each day of the week, mark days as closed, and set holiday hours.", category: "Website", tags: ["hours", "schedule", "closed"] },
    { q: "Can I use my own domain name?", a: "Yes! On Growth and Pro plans, you can connect your own domain. Go to Settings > Domain, enter your domain, and follow the DNS setup instructions. We handle SSL certificates automatically.", category: "Website", tags: ["domain", "custom domain", "URL"] },
    { q: "My website is loading slowly. What can I do?", a: "First, check your image sizes — we recommend keeping images under 500KB each. If the issue persists, try clearing your browser cache. Our sites are built on Vercel's edge network for fast loading. If you're still experiencing issues, contact us and we'll investigate.", category: "Website", tags: ["slow", "loading", "performance", "speed"] },
    { q: "My website is showing an error / is down", a: "We monitor all sites 24/7. If your site is down, we're likely already working on it. You can check our status page for updates. If the issue persists for more than 15 minutes, email support@northstarsynergy.org with your restaurant name and we'll prioritize the fix.", category: "Website", tags: ["down", "error", "not working", "broken"] },
    { q: "How do online orders work?", a: "Customers place orders through your website. You receive notifications via email and SMS. Orders are processed through Square POS if integrated, or through our built-in order management dashboard. You can manage order status and notify customers of updates.", category: "Ordering", tags: ["order", "online ordering", "how it works"] },
    { q: "A customer says their payment didn't go through", a: "Have the customer check their bank statement. If the charge appears, the order was processed. If not, ask them to try again with a different card. Common issues: expired card, insufficient funds, or bank-side fraud prevention. We use Square for secure payment processing.", category: "Ordering", tags: ["payment", "failed", "declined", "charge"] },
    { q: "How do I issue a refund?", a: "Log in to your admin dashboard > Orders. Find the order, click on it, and select 'Refund'. For Square-processed payments, refunds appear on the customer's statement within 5-10 business days. For immediate issues, you can also process refunds directly through your Square dashboard.", category: "Ordering", tags: ["refund", "return", "money back"] },
    { q: "Can I set up delivery?", a: "Yes! On Growth and Pro plans, you can enable delivery through DoorDash Drive or Uber Direct (white-label delivery). This means customers order through YOUR website, and delivery is handled by professional drivers. No third-party branding. Set it up in Settings > Delivery.", category: "Ordering", tags: ["delivery", "doordash", "uber"] },
    { q: "How do I access my admin dashboard?", a: "Go to your website URL and add /admin to the end (e.g., yourrestaurant.com/admin). Log in with the credentials we set up during onboarding. If you've forgotten your password, click 'Reset Password' or contact us.", category: "Technical", tags: ["login", "admin", "dashboard", "access"] },
    { q: "Is my website mobile-friendly?", a: "Yes! All NorthStar websites are fully responsive and optimized for mobile. Over 70% of restaurant website traffic comes from mobile devices, so we prioritize the mobile experience.", category: "Technical", tags: ["mobile", "responsive", "phone"] },
    { q: "Do you offer SEO optimization?", a: "Yes, all plans include SEO optimization. This includes: Google-optimized page titles and descriptions, schema.org structured data for rich search results, individual SEO pages for each menu item, fast loading speeds, and mobile optimization. Pro plan includes advanced local SEO and Google Business Profile management.", category: "Technical", tags: ["SEO", "google", "search", "ranking"] },
    { q: "How do I get started?", a: "Getting started is easy: 1) Sign up at northstarsynergy.org/pricing, 2) We'll build your custom site within 48 hours, 3) Review and approve the design, 4) We handle domain setup and go live. You'll have a beautiful, functional restaurant website in under a week.", category: "Getting Started", tags: ["start", "sign up", "onboarding", "new"] },
    { q: "Can I see a demo?", a: "Absolutely! Visit northstarsynergy.org to see our Sakura Kitchen demo — a fully functional restaurant website with online ordering, menu management, and all the features included in our platform. Want a demo customized for YOUR restaurant? Just send us your restaurant name and we'll build one for free.", category: "Getting Started", tags: ["demo", "example", "preview"] },
    { q: "Who do I contact for support?", a: "You can reach us at:\n- Email: support@northstarsynergy.org\n- Response time: within 4 hours during business hours\n- Emergency (site down): Use the urgent flag in your email subject\n\nWe also have this FAQ and knowledge base available 24/7.", category: "Getting Started", tags: ["contact", "support", "help", "email"] },
  ];

  for (let i = 0; i < faqsData.length; i++) {
    const d = faqsData[i];
    await createFaq({ question: d.q, answer: d.a, category: d.category, tags: d.tags, isPublic: true, sortOrder: i });
  }
}

async function seedSops() {
  await createSop({
    title: "Website Down - Emergency Response",
    category: "Technical",
    triggers: ["down", "not working", "error", "offline", "502", "503"],
    steps: [
      "Check Vercel dashboard (vercel.com/northstar-synergy) for deployment status",
      "Verify the client's domain DNS is pointing correctly (use dig or nslookup)",
      "Check if the issue is isolated to one site or affects multiple clients",
      "If deployment error: Roll back to last successful deployment in Vercel",
      "If DNS issue: Check Vercel domain settings, ensure CNAME/A records are correct",
      "If platform-wide: Check Vercel status page (vercel-status.com)",
      "Send status update to affected client(s) within 15 minutes",
      "Once resolved, send resolution email with brief explanation",
      "Log incident in activity feed with duration and root cause",
    ],
  });

  await createSop({ title: "Payment Failed - Customer Resolution", category: "Billing", triggers: ["payment", "failed", "declined", "charge", "billing"], steps: ["Check Stripe dashboard for the specific payment attempt", "Identify failure reason", "Email customer asking to update payment method", "Allow 3 days grace period before sending past-due notice", "After 7 days: Send final notice", "After 14 days: Downgrade to limited access", "After 30 days: Schedule for deactivation"] });
  await createSop({ title: "New Client Onboarding", category: "Onboarding", triggers: ["new client", "onboarding", "setup"], steps: ["Welcome email sent automatically", "Collect restaurant info", "Build site using template", "Configure menu", "Set up Square POS", "Deploy to Vercel", "Send preview link", "Incorporate feedback", "Go live", "Schedule 1-week check-in"] });
  await createSop({ title: "Refund Processing", category: "Billing", triggers: ["refund", "money back", "overcharged"], steps: ["Verify refund request", "Determine refund type", "Process through Stripe", "Email customer confirming refund", "Log in activity feed"] });
  await createSop({ title: "Client Website Change Request", category: "Client Management", triggers: ["change", "update", "modify", "request"], steps: ["Acknowledge request within 4 hours", "Categorize request", "Menu updates: direct to admin dashboard", "Design changes: evaluate scope", "Feature requests: check plan", "Bug fixes: prioritize within 24 hours", "Deploy and confirm"] });
  await createSop({ title: "Weekly Business Review", category: "Operations", triggers: ["weekly review", "weekly digest"], steps: ["Generate weekly digest", "Review MRR trends", "Check pipeline", "Review outreach metrics", "Check client health", "Review support tickets", "Check past-due accounts", "Update P&L", "Identify top 3 action items", "Send digest email"] });
}

async function seedTickets() {
  await createTicket({ clientName: "Curry House", email: "priya@curryhouse.com", subject: "How do I change my menu prices?", message: "Hi, I need to update some of my menu prices for the new season. Where do I go to make these changes?", priority: "low" });
  await createTicket({ clientName: "The Greek Corner", email: "nikos@greekcorner.com", subject: "Online ordering not working", message: "Customers are telling me they can't complete their orders. They get an error after entering payment information. This is urgent!", priority: "urgent" });
  await createTicket({ clientName: "Sunrise Brunch", email: "amy@sunrisebrunch.com", subject: "Can I add a catering page?", message: "We do a lot of catering and I'd love to have a dedicated catering page. Is this something you can add?", priority: "medium" });
}

async function seedActivities() {
  const events = [
    { type: "system" as const, action: "startup", description: "NorthStar Synergy platform initialized" },
    { type: "client" as const, action: "health_check", description: "All 7 client sites healthy" },
    { type: "revenue" as const, action: "monthly_billing", description: "Monthly billing cycle completed — $1,243 collected" },
  ];

  for (const event of events) {
    await logActivity(event);
  }
}
