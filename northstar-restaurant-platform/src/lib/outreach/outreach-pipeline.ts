/**
 * Outreach Pipeline Manager
 *
 * This is John's autonomous sales pipeline. It orchestrates the full
 * multi-touch outreach cadence from discovery to close:
 *
 * 1. Discover prospects via Google Maps scraper
 * 2. Generate their website using site-generator
 * 3. Deploy preview to Vercel
 * 4. Record video walkthrough via Puppeteer
 * 5. Send initial pitch email (Day 1)
 * 6. Send physical postcard via Lob (Day 1, arrives Day 3-5)
 * 7. Send follow-up email (Day 3)
 * 8. Make phone call via voice AI (Day 5-7)
 * 9. Send final email (Day 10)
 * 10. Track responses and manage pipeline
 */

import { discoverProspects, type ScrapeConfig, type ProspectResult } from "./google-scraper";
import { generateRestaurantConfig } from "@/lib/site-generator";
import {
  generateInitialPitchEmail,
  generateFollowUpEmail,
  generateFinalEmail,
  type EmailContext,
} from "./email-templates";
import { isOnDnc } from "./dnc-store";
import { canSendToday, recordSend } from "./send-throttle";

// Pipeline stages
export type PipelineStage =
  | "discovered"        // Found via scraper
  | "site_built"        // Website generated
  | "site_deployed"     // Preview live on Vercel
  | "video_recorded"    // Walkthrough video created
  | "email_sent"        // Initial email sent
  | "postcard_sent"     // Physical postcard mailed
  | "followup_sent"     // Follow-up email sent
  | "call_attempted"    // Voice AI call made
  | "call_completed"    // Had a conversation
  | "final_email_sent"  // Last email sent
  | "responded"         // Prospect replied
  | "meeting_scheduled" // Demo/meeting booked
  | "closed_won"        // Customer signed up
  | "closed_lost"       // Prospect declined
  | "unsubscribed";     // Opted out

export interface PipelineProspect {
  id: string;
  restaurant: ProspectResult;
  stage: PipelineStage;
  siteConfig?: ReturnType<typeof generateRestaurantConfig>;
  previewUrl?: string;
  videoUrl?: string;
  emailsSent: number;
  callsMade: number;
  postcardSent: boolean;
  notes: string[];
  createdAt: string;
  updatedAt: string;
  nextAction?: {
    type: "email" | "call" | "postcard" | "followup";
    scheduledFor: string;
  };
}

export interface PipelineConfig {
  googleApiKey: string;
  resendApiKey: string;    // Email sending
  lobApiKey: string;       // Physical postcard
  vercelToken: string;     // Site deployment
  muxTokenId?: string;     // Video hosting
  voiceAiApiKey?: string;  // Phone calls
  senderEmail: string;
  senderName: string;
  senderTitle: string;
  companyName: string;
  companyAddress: string;  // Required by CAN-SPAM in all commercial emails
  dailyLimit: number;      // Max prospects per day (start low: 5-10)
  targetAreas: string[];   // ["Seattle WA", "Bellevue WA", "Tacoma WA"]
}

/**
 * Run the full outreach pipeline for a target area
 */
export async function runPipeline(config: PipelineConfig): Promise<PipelineProspect[]> {
  const allProspects: PipelineProspect[] = [];

  for (const area of config.targetAreas) {
    // Step 1: Discover restaurants without websites
    const scrapeConfig: ScrapeConfig = {
      query: `restaurants in ${area}`,
      maxResults: config.dailyLimit,
      minRating: 3.5,
      apiKey: config.googleApiKey,
    };

    const prospects = await discoverProspects(scrapeConfig);

    for (const prospect of prospects) {
      // DNC check: skip if contact is on the Do Not Contact list
      const dncHit = await isOnDnc(
        prospect.restaurant.email,
        prospect.restaurant.phone,
        prospect.restaurant.address
      );
      if (dncHit) {
        console.warn(`[Pipeline] Skipping ${prospect.restaurant.name} — on DNC list (${dncHit.reason})`);
        continue;
      }

      // Step 2: Generate website configuration
      const siteConfig = generateRestaurantConfig(prospect.restaurant);

      // Step 3: Deploy preview (Vercel API)
      const previewUrl = await deployPreview(siteConfig, config.vercelToken);

      // Step 4: Record video walkthrough
      const videoUrl = await recordWalkthrough(previewUrl, config.muxTokenId);

      // Step 5: Create pipeline entry
      const pipelineProspect: PipelineProspect = {
        id: `prospect-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        restaurant: prospect,
        stage: "video_recorded",
        siteConfig,
        previewUrl,
        videoUrl,
        emailsSent: 0,
        callsMade: 0,
        postcardSent: false,
        notes: [`Discovered: ${prospect.reason}`, `Prospect score: ${prospect.prospectScore}/100`],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        nextAction: {
          type: "email",
          scheduledFor: new Date().toISOString(),
        },
      };

      // Step 6: Send initial pitch email (with warmup throttle check)
      if (!(await canSendToday())) {
        console.warn(`[Pipeline] Daily send limit reached — deferring email for ${prospect.restaurant.name}`);
        pipelineProspect.nextAction = {
          type: "email",
          scheduledFor: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString(),
        };
        allProspects.push(pipelineProspect);
        continue;
      }
      await sendPitchEmail(pipelineProspect, config);
      await recordSend();
      pipelineProspect.stage = "email_sent";
      pipelineProspect.emailsSent = 1;

      // Step 7: Queue postcard via Lob
      await sendPostcard(pipelineProspect, config);
      pipelineProspect.postcardSent = true;
      pipelineProspect.stage = "postcard_sent";

      // Schedule follow-up actions
      const now = new Date();
      pipelineProspect.nextAction = {
        type: "followup",
        scheduledFor: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days
      };

      allProspects.push(pipelineProspect);
    }
  }

  return allProspects;
}

/**
 * Process scheduled follow-up actions
 */
export async function processFollowUps(
  prospects: PipelineProspect[],
  config: PipelineConfig
): Promise<void> {
  const now = new Date();

  for (const prospect of prospects) {
    if (!prospect.nextAction) continue;
    if (new Date(prospect.nextAction.scheduledFor) > now) continue;
    if (prospect.stage === "closed_won" || prospect.stage === "closed_lost" || prospect.stage === "unsubscribed") continue;

    // DNC check before every follow-up touch
    const dncHit = await isOnDnc(
      prospect.restaurant.email,
      prospect.restaurant.phone,
      prospect.restaurant.address
    );
    if (dncHit) {
      console.warn(`[Pipeline] Skipping follow-up for ${prospect.restaurant.name} — on DNC list`);
      prospect.nextAction = undefined;
      continue;
    }

    switch (prospect.nextAction.type) {
      case "followup":
        if (prospect.emailsSent === 1) {
          if (!(await canSendToday())) {
            console.warn(`[Pipeline] Daily send limit reached — deferring follow-up for ${prospect.restaurant.name}`);
            continue;
          }
          await sendFollowUpEmail(prospect, config);
          await recordSend();
          prospect.emailsSent = 2;
          prospect.stage = "followup_sent";
          prospect.nextAction = {
            type: "call",
            scheduledFor: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          };
        }
        break;

      case "call":
        if (prospect.callsMade === 0 && config.voiceAiApiKey) {
          await makeVoiceCall(prospect, config);
          prospect.callsMade = 1;
          prospect.stage = "call_attempted";
          prospect.nextAction = {
            type: "email",
            scheduledFor: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          };
        }
        break;

      case "email":
        if (prospect.emailsSent === 2) {
          if (!(await canSendToday())) {
            console.warn(`[Pipeline] Daily send limit reached — deferring final email for ${prospect.restaurant.name}`);
            continue;
          }
          await sendFinalEmail(prospect, config);
          await recordSend();
          prospect.emailsSent = 3;
          prospect.stage = "final_email_sent";
          prospect.nextAction = undefined; // End of cadence
        }
        break;
    }

    prospect.updatedAt = new Date().toISOString();
  }
}

// --- Implementation stubs (will be connected to real APIs) ---

async function deployPreview(
  _siteConfig: ReturnType<typeof generateRestaurantConfig>,
  _vercelToken: string
): Promise<string> {
  // In production: Use Vercel API to deploy the site
  // POST https://api.vercel.com/v13/deployments
  // Returns the preview URL
  return `https://${_siteConfig.slug}.northstar-preview.vercel.app`;
}

async function recordWalkthrough(
  _previewUrl: string,
  _muxTokenId?: string
): Promise<string> {
  // In production: Use Puppeteer to record a screen recording
  // Then upload to Mux for hosting
  // Returns the video URL
  return `https://stream.mux.com/demo-walkthrough.m3u8`;
}

async function sendPitchEmail(
  prospect: PipelineProspect,
  config: PipelineConfig
): Promise<void> {
  const emailCtx: EmailContext = {
    restaurantName: prospect.restaurant.restaurant.name,
    city: prospect.restaurant.restaurant.city,
    previewUrl: prospect.previewUrl || "",
    videoUrl: prospect.videoUrl || "",
    gifThumbnailUrl: "", // Generate from video
    googleRating: prospect.restaurant.restaurant.googleRating,
    reviewCount: prospect.restaurant.restaurant.googleReviewCount,
    cuisineType: prospect.restaurant.restaurant.cuisineTypes?.[0] || "restaurant",
    senderName: config.senderName,
    senderTitle: config.senderTitle,
    companyName: config.companyName,
    companyAddress: config.companyAddress,
    unsubscribeUrl: `https://northstarsynergy.com/unsubscribe/${prospect.id}`,
  };

  const email = generateInitialPitchEmail(emailCtx);

  // In production: Send via Resend API
  // POST https://api.resend.com/emails
  // { from: config.senderEmail, to: prospect.restaurant.restaurant.email, subject, text }
  console.warn(`[Pipeline] Sending initial email to ${prospect.restaurant.restaurant.name}`);
  console.warn(`  Subject: ${email.subject}`);
}

async function sendFollowUpEmail(
  prospect: PipelineProspect,
  config: PipelineConfig
): Promise<void> {
  const emailCtx: EmailContext = {
    restaurantName: prospect.restaurant.restaurant.name,
    city: prospect.restaurant.restaurant.city,
    previewUrl: prospect.previewUrl || "",
    videoUrl: prospect.videoUrl || "",
    gifThumbnailUrl: "",
    googleRating: prospect.restaurant.restaurant.googleRating,
    reviewCount: prospect.restaurant.restaurant.googleReviewCount,
    cuisineType: prospect.restaurant.restaurant.cuisineTypes?.[0] || "restaurant",
    senderName: config.senderName,
    senderTitle: config.senderTitle,
    companyName: config.companyName,
    companyAddress: config.companyAddress,
    unsubscribeUrl: `https://northstarsynergy.com/unsubscribe/${prospect.id}`,
  };

  const email = generateFollowUpEmail(emailCtx);
  console.warn(`[Pipeline] Sending follow-up email to ${prospect.restaurant.restaurant.name}`);
  console.warn(`  Subject: ${email.subject}`);
}

async function sendFinalEmail(
  prospect: PipelineProspect,
  config: PipelineConfig
): Promise<void> {
  const emailCtx: EmailContext = {
    restaurantName: prospect.restaurant.restaurant.name,
    city: prospect.restaurant.restaurant.city,
    previewUrl: prospect.previewUrl || "",
    videoUrl: prospect.videoUrl || "",
    gifThumbnailUrl: "",
    googleRating: prospect.restaurant.restaurant.googleRating,
    reviewCount: prospect.restaurant.restaurant.googleReviewCount,
    cuisineType: prospect.restaurant.restaurant.cuisineTypes?.[0] || "restaurant",
    senderName: config.senderName,
    senderTitle: config.senderTitle,
    companyName: config.companyName,
    companyAddress: config.companyAddress,
    unsubscribeUrl: `https://northstarsynergy.com/unsubscribe/${prospect.id}`,
  };

  const email = generateFinalEmail(emailCtx);
  console.warn(`[Pipeline] Sending final email to ${prospect.restaurant.restaurant.name}`);
  console.warn(`  Subject: ${email.subject}`);
}

async function sendPostcard(
  prospect: PipelineProspect,
  _config: PipelineConfig
): Promise<void> {
  // In production: Use Lob.com API
  // POST https://api.lob.com/v1/postcards
  // Front: Beautiful restaurant website screenshot
  // Back: "We built you a website. Check it out at {previewUrl}"
  console.warn(`[Pipeline] Queuing postcard to ${prospect.restaurant.restaurant.name}`);
  console.warn(`  Address: ${prospect.restaurant.restaurant.address}, ${prospect.restaurant.restaurant.city}`);
}

async function makeVoiceCall(
  prospect: PipelineProspect,
  _config: PipelineConfig
): Promise<void> {
  // In production: Use Bland.ai / Vapi.ai / Retell.ai
  // Make a phone call using voice AI
  // Key requirements:
  // - Must sound human (not robotic)
  // - Non-pushy, empathetic
  // - FTC/TCPA compliant
  // - Identify as AI if directly asked
  // - Graceful exit if not interested
  console.warn(`[Pipeline] Scheduling voice call to ${prospect.restaurant.restaurant.name}`);
  console.warn(`  Phone: ${prospect.restaurant.restaurant.phone}`);
}

/**
 * Pipeline analytics/reporting
 */
export function getPipelineStats(prospects: PipelineProspect[]) {
  const stats = {
    total: prospects.length,
    byStage: {} as Record<PipelineStage, number>,
    emailsSent: 0,
    callsMade: 0,
    postcardsSent: 0,
    responseRate: 0,
    conversionRate: 0,
  };

  for (const p of prospects) {
    stats.byStage[p.stage] = (stats.byStage[p.stage] || 0) + 1;
    stats.emailsSent += p.emailsSent;
    stats.callsMade += p.callsMade;
    if (p.postcardSent) stats.postcardsSent++;
  }

  const responded = (stats.byStage["responded"] || 0) +
    (stats.byStage["meeting_scheduled"] || 0) +
    (stats.byStage["closed_won"] || 0);
  stats.responseRate = stats.total > 0 ? responded / stats.total : 0;
  stats.conversionRate = stats.total > 0 ? (stats.byStage["closed_won"] || 0) / stats.total : 0;

  return stats;
}
