/**
 * Daily Pipeline Orchestrator
 *
 * The autonomous brain of NorthStar Synergy. Connects all modules into
 * a single daily pipeline that runs without human intervention:
 *
 *   1. Discover prospects (Google Places API)
 *   2. For each: scrape real menu, download real logo, rewrite descriptions
 *   3. Build restaurant config via site-generator with real data
 *   4. Create restaurant record in Supabase
 *   5. Create lead record in CRM
 *   6. Run lightweight QA check (HTTP fetch, verify key elements)
 *   7. Send outreach (email if contact found, postcard if not)
 *   8. Schedule follow-ups
 *   9. Process past-due follow-ups
 *  10. Compile and return results
 *
 * Every function handles errors gracefully -- never throws, always logs
 * and continues. Missing API keys degrade gracefully, not fatally.
 */

import { discoverProspects, type ScrapeConfig, type ProspectResult } from "@/lib/outreach/google-scraper";
import { generateRestaurantConfig, type ScrapedRestaurantData } from "@/lib/site-generator";
import { createRestaurant } from "@/lib/tenant/restaurant-store";
import {
  createLead,
  getAllLeads,
  updateLead,
  addOutreachEvent,
} from "@/lib/crm/lead-store";
import { isOnDnc } from "@/lib/outreach/dnc-store";
import { canSendToday, recordSend, getWarmupStatus } from "@/lib/outreach/send-throttle";
import {
  generateInitialPitchEmail,
  type EmailContext,
} from "@/lib/outreach/email-templates";
import {
  sendPostcard as lobSendPostcard,
  type PostcardConfig,
} from "@/lib/outreach/postcard-mailer";
import { scrapeMenu, type ScrapedMenuItem } from "@/lib/scraping/menu-scraper";
import { downloadRealLogo } from "@/lib/scraping/logo-downloader";
import { rewriteMenuDescriptions } from "@/lib/scraping/description-rewriter";
import { logActivity } from "@/lib/activity/activity-store";
import {
  getNextTargetAreas,
  updateGeoProgress,
  markCityExhausted,
  getExpansionStatus,
  type GeoTarget,
} from "@/lib/pipeline/geo-expansion";
import type { Lead } from "@/types/business";

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export interface PipelineConfig {
  googleApiKey?: string;
  resendApiKey?: string;
  lobApiKey?: string;
  openRouterApiKey?: string;
  targetAreas?: string[];
  dailyProspectLimit: number;
  dryRun: boolean;
  reportEmail?: string;
  baseUrl: string; // e.g., "https://northstar-restaurant-platform.vercel.app"
  senderEmail?: string;
  senderName?: string;
  companyAddress?: string;
}

export interface QaCheckResult {
  slug: string;
  passed: boolean;
  issues: string[];
}

export interface PipelineResult {
  discovered: number;
  sitesBuilt: number;
  emailsSent: number;
  postcardsQueued: number;
  followUpsProcessed: number;
  qaResults: QaCheckResult[];
  errors: string[];
  startedAt: string;
  completedAt: string;
  durationMs: number;
  expansionStatus?: {
    currentRing: number;
    currentState: string;
    citiesProspected: number;
    citiesRemaining: number;
  };
  /** Cities targeted in this specific run */
  citiesTargeted?: string[];
  /** Cities marked exhausted during this run */
  citiesExhausted?: string[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SENDER_NAME_DEFAULT = "Craig";
const SENDER_EMAIL_DEFAULT = "hello@northstarsynergy.com";
const COMPANY_ADDRESS_DEFAULT = "NorthStar Synergy, Seattle, WA";
const FOLLOW_UP_DAYS = 3; // days before first follow-up

// ---------------------------------------------------------------------------
// Main entry: runDailyPipeline
// ---------------------------------------------------------------------------

/**
 * Execute the full daily autonomous pipeline.
 * Returns a comprehensive result object for reporting.
 */
export async function runDailyPipeline(
  config: PipelineConfig
): Promise<PipelineResult> {
  const startedAt = new Date().toISOString();
  const startMs = Date.now();

  const result: PipelineResult = {
    discovered: 0,
    sitesBuilt: 0,
    emailsSent: 0,
    postcardsQueued: 0,
    followUpsProcessed: 0,
    qaResults: [],
    errors: [],
    startedAt,
    completedAt: "",
    durationMs: 0,
  };

  console.warn(`[Pipeline] Starting daily pipeline at ${startedAt}`);
  console.warn(`[Pipeline] Config: dryRun=${config.dryRun}, areas=${(config.targetAreas || []).join(", ") || "(auto-geo)"}, limit=${config.dailyProspectLimit}`);

  // Log warmup status
  try {
    const warmup = await getWarmupStatus();
    console.warn(`[Pipeline] Warmup: day ${warmup.warmupDay}, limit ${warmup.dailyLimit}, sent ${warmup.sentToday}, remaining ${warmup.remaining}`);
  } catch (err) {
    console.warn("[Pipeline] Could not fetch warmup status:", err instanceof Error ? err.message : err);
  }

  // -----------------------------------------------------------------------
  // Phase 1: Discover prospects (with geographic expansion)
  // -----------------------------------------------------------------------
  let allProspects: ProspectResult[] = [];
  const citiesTargeted: string[] = [];
  const citiesExhausted: string[] = [];

  if (config.googleApiKey) {
    // Determine target areas: use explicit config if provided, otherwise auto-geo
    let targetEntries: { area: string; city: string; stateCode: string }[] = [];

    if (config.targetAreas && config.targetAreas.length > 0) {
      // Backward compatible: use explicit target areas
      targetEntries = config.targetAreas.map((area) => {
        // Parse "City, ST" format if possible, otherwise use area as-is
        const parts = area.split(",").map((s) => s.trim());
        return {
          area,
          city: parts[0] || area,
          stateCode: parts[1] || "WA",
        };
      });
      console.warn(`[Pipeline] Using ${targetEntries.length} explicit target areas`);
    } else {
      // Auto-geographic expansion: get next cities from the expansion engine
      try {
        const geoTargets: GeoTarget[] = await getNextTargetAreas(config.dailyProspectLimit);
        targetEntries = geoTargets.map((gt) => ({
          area: gt.searchQuery,
          city: gt.city,
          stateCode: gt.stateCode,
        }));
        console.warn(`[Pipeline] Geo-expansion selected ${targetEntries.length} target areas: ${targetEntries.map((t) => t.area).join(", ")}`);
      } catch (err) {
        const msg = `Geo-expansion failed: ${err instanceof Error ? err.message : String(err)}`;
        console.warn(`[Pipeline] ${msg}`);
        result.errors.push(msg);
      }
    }

    // Discover prospects in each target area
    for (const target of targetEntries) {
      try {
        console.warn(`[Pipeline] Discovering prospects in "${target.area}"...`);
        const scrapeConfig: ScrapeConfig = {
          query: `restaurants in ${target.area}`,
          maxResults: config.dailyProspectLimit,
          minRating: 3.5,
          apiKey: config.googleApiKey,
        };

        const prospects = await discoverProspects(scrapeConfig);
        const prospectsFound = prospects.length;
        console.warn(`[Pipeline] Found ${prospectsFound} prospects in "${target.area}"`);
        allProspects.push(...prospects);
        citiesTargeted.push(`${target.city}, ${target.stateCode}`);

        // Update geo progress for this area
        try {
          await updateGeoProgress(target.city, target.stateCode, prospectsFound, 0);
        } catch (err) {
          console.warn(`[Pipeline] Geo progress update failed for ${target.area}:`, err instanceof Error ? err.message : err);
        }

        // Mark exhausted if fewer than 2 prospects found
        if (prospectsFound < 2) {
          try {
            await markCityExhausted(target.city, target.stateCode);
            citiesExhausted.push(`${target.city}, ${target.stateCode}`);
            console.warn(`[Pipeline] Marked "${target.area}" as exhausted (only ${prospectsFound} prospects)`);
          } catch (err) {
            console.warn(`[Pipeline] Could not mark ${target.area} as exhausted:`, err instanceof Error ? err.message : err);
          }
        }
      } catch (err) {
        const msg = `Discovery failed for "${target.area}": ${err instanceof Error ? err.message : String(err)}`;
        console.warn(`[Pipeline] ${msg}`);
        result.errors.push(msg);
      }
    }

    result.discovered = allProspects.length;
    result.citiesTargeted = citiesTargeted;
    result.citiesExhausted = citiesExhausted;
    console.warn(`[Pipeline] Total discovered: ${allProspects.length} prospects across ${citiesTargeted.length} cities`);

    // Cap to daily limit across all areas
    if (allProspects.length > config.dailyProspectLimit) {
      allProspects = allProspects
        .sort((a, b) => b.prospectScore - a.prospectScore)
        .slice(0, config.dailyProspectLimit);
      console.warn(`[Pipeline] Capped to top ${config.dailyProspectLimit} by prospect score`);
    }
  } else {
    console.warn("[Pipeline] No Google API key — skipping discovery phase");
  }

  // -----------------------------------------------------------------------
  // Phase 2: Build sites, create records, QA, outreach
  // -----------------------------------------------------------------------
  for (const prospect of allProspects) {
    const restaurantName = prospect.restaurant.name;
    console.warn(`[Pipeline] Processing: ${restaurantName} (score: ${prospect.prospectScore})`);

    try {
      // DNC check
      const dncHit = await isOnDnc(
        prospect.restaurant.email,
        prospect.restaurant.phone,
        prospect.restaurant.address
      );
      if (dncHit) {
        console.warn(`[Pipeline] Skipping ${restaurantName} -- on DNC list (${dncHit.reason})`);
        continue;
      }

      // -- Step 2a: Scrape real menu --
      let enrichedData: ScrapedRestaurantData = { ...prospect.restaurant };
      let menuItems: ScrapedMenuItem[] = [];

      if (config.openRouterApiKey || process.env.OPENROUTER_API_KEY) {
        try {
          const menuResult = await scrapeMenu({
            restaurantName,
            websiteUrl: prospect.websiteUrl,
            cuisineType: prospect.restaurant.cuisineTypes?.[0],
          });

          if (menuResult.items.length > 0) {
            console.warn(`[Pipeline] Scraped ${menuResult.items.length} menu items from ${menuResult.source} (confidence: ${menuResult.confidence})`);
            menuItems = menuResult.items;

            // Rewrite descriptions for better presentation
            try {
              const rewritten = await rewriteMenuDescriptions(
                menuItems.map((i) => ({
                  name: i.name,
                  description: i.description,
                  category: i.category,
                })),
                prospect.restaurant.cuisineTypes?.[0] || "american"
              );

              // Merge rewritten descriptions back
              menuItems = menuItems.map((item, idx) => ({
                ...item,
                description: rewritten[idx]?.description || item.description,
              }));
              console.warn(`[Pipeline] Rewrote ${rewritten.length} menu descriptions`);
            } catch (err) {
              console.warn(`[Pipeline] Description rewrite failed for ${restaurantName}:`, err instanceof Error ? err.message : err);
            }

            // Apply scraped menu to the restaurant data
            enrichedData = {
              ...enrichedData,
              menuItems: menuItems.map((i) => ({
                name: i.name,
                description: i.description,
                price: i.price,
                category: i.category,
              })),
            };
          } else {
            console.warn(`[Pipeline] No menu items found for ${restaurantName} -- using generated menu`);
          }
        } catch (err) {
          console.warn(`[Pipeline] Menu scrape failed for ${restaurantName}:`, err instanceof Error ? err.message : err);
        }
      } else {
        console.warn(`[Pipeline] No OpenRouter key -- skipping menu enrichment for ${restaurantName}`);
      }

      // -- Step 2b: Download real logo --
      let logoUrl: string | undefined;
      try {
        const logoResult = await downloadRealLogo({
          restaurantName,
          websiteUrl: prospect.websiteUrl,
          googleApiKey: config.googleApiKey,
        });
        if (logoResult.url) {
          logoUrl = logoResult.url;
          console.warn(`[Pipeline] Logo found via ${logoResult.source} for ${restaurantName}`);
        } else {
          console.warn(`[Pipeline] No logo found for ${restaurantName} -- will use AI-generated`);
        }
      } catch (err) {
        console.warn(`[Pipeline] Logo download failed for ${restaurantName}:`, err instanceof Error ? err.message : err);
      }

      // -- Step 2c: Generate restaurant config --
      const siteConfig = generateRestaurantConfig(enrichedData);

      // Apply real logo if found
      if (logoUrl) {
        siteConfig.branding = {
          ...siteConfig.branding,
          logo: logoUrl,
        };
      }

      if (config.dryRun) {
        console.warn(`[Pipeline] [DRY RUN] Would create restaurant: ${siteConfig.slug}`);
        result.sitesBuilt++;
        result.qaResults.push({ slug: siteConfig.slug, passed: true, issues: ["dry run -- skipped"] });
        continue;
      }

      // -- Step 2d: Create restaurant record in Supabase --
      try {
        await createRestaurant(siteConfig);
        result.sitesBuilt++;
        console.warn(`[Pipeline] Restaurant record created: ${siteConfig.slug}`);

        // Update geo progress with the site build
        const prospectCity = prospect.restaurant.city;
        const prospectState = prospect.restaurant.state;
        if (prospectCity && prospectState) {
          try {
            await updateGeoProgress(prospectCity, prospectState, 0, 1);
          } catch {
            // Non-critical — don't block the pipeline
          }
        }
      } catch (err) {
        const msg = `Restaurant creation failed for ${restaurantName}: ${err instanceof Error ? err.message : String(err)}`;
        console.warn(`[Pipeline] ${msg}`);
        result.errors.push(msg);
        continue; // Can't proceed without a restaurant record
      }

      // -- Step 2e: Create lead record --
      const previewUrl = `${config.baseUrl}/demo/${siteConfig.slug}`;
      let lead: Lead;
      try {
        lead = await createLead({
          restaurantName,
          contactName: undefined,
          email: prospect.restaurant.email,
          phone: prospect.restaurant.phone,
          website: prospect.websiteUrl,
          address: prospect.restaurant.address,
          city: prospect.restaurant.city,
          state: prospect.restaurant.state,
          source: "google_scraper",
          score: prospect.prospectScore,
          tags: prospect.restaurant.cuisineTypes || [],
          value: 149, // $149/mo growth plan
        });
        console.warn(`[Pipeline] Lead created: ${lead.id} for ${restaurantName}`);
      } catch (err) {
        const msg = `Lead creation failed for ${restaurantName}: ${err instanceof Error ? err.message : String(err)}`;
        console.warn(`[Pipeline] ${msg}`);
        result.errors.push(msg);
        continue;
      }

      // Set the preview URL on the lead
      try {
        await updateLead(lead.id, { previewUrl });
      } catch (err) {
        console.warn(`[Pipeline] Could not set preview URL on lead ${lead.id}:`, err instanceof Error ? err.message : err);
      }

      // -- Step 2f: QA check --
      const qaResult = await runQaCheck(siteConfig.slug, config.baseUrl);
      result.qaResults.push(qaResult);

      if (!qaResult.passed) {
        console.warn(`[Pipeline] QA FAILED for ${siteConfig.slug}: ${qaResult.issues.join(", ")}`);
        // Don't block outreach on QA failure -- log it and continue
      } else {
        console.warn(`[Pipeline] QA passed for ${siteConfig.slug}`);
      }

      // -- Step 2g: Send outreach --
      const hasEmail = !!prospect.restaurant.email;
      const hasAddress = !!(
        prospect.restaurant.address &&
        prospect.restaurant.city &&
        prospect.restaurant.state &&
        prospect.restaurant.zip
      );

      // Try email first
      if (hasEmail && config.resendApiKey) {
        try {
          const canSend = await canSendToday();
          if (canSend) {
            await sendPitchEmail(lead, prospect, previewUrl, config);
            await recordSend();

            await addOutreachEvent(lead.id, {
              type: "email",
              subject: `I built ${restaurantName} a website`,
              status: "sent",
              sentAt: new Date().toISOString(),
            });

            result.emailsSent++;
            console.warn(`[Pipeline] Pitch email sent to ${restaurantName}`);
          } else {
            console.warn(`[Pipeline] Daily send limit reached -- deferring email for ${restaurantName}`);
          }
        } catch (err) {
          const msg = `Email send failed for ${restaurantName}: ${err instanceof Error ? err.message : String(err)}`;
          console.warn(`[Pipeline] ${msg}`);
          result.errors.push(msg);
        }
      }

      // Send postcard if no email or as supplement
      if (hasAddress && config.lobApiKey && !hasEmail) {
        try {
          await sendProspectPostcard(prospect, previewUrl, config);

          await addOutreachEvent(lead.id, {
            type: "postcard",
            status: "sent",
            sentAt: new Date().toISOString(),
          });

          result.postcardsQueued++;
          console.warn(`[Pipeline] Postcard queued for ${restaurantName}`);
        } catch (err) {
          const msg = `Postcard failed for ${restaurantName}: ${err instanceof Error ? err.message : String(err)}`;
          console.warn(`[Pipeline] ${msg}`);
          result.errors.push(msg);
        }
      }

      // -- Step 2h: Schedule follow-up --
      try {
        const followUpDate = new Date(
          Date.now() + FOLLOW_UP_DAYS * 24 * 60 * 60 * 1000
        ).toISOString();
        await updateLead(lead.id, {
          stage: "outreach",
          nextFollowUpAt: followUpDate,
          lastContactedAt: new Date().toISOString(),
        });
        console.warn(`[Pipeline] Follow-up scheduled for ${restaurantName} at ${followUpDate}`);
      } catch (err) {
        console.warn(`[Pipeline] Could not schedule follow-up for ${restaurantName}:`, err instanceof Error ? err.message : err);
      }
    } catch (err) {
      const msg = `Unexpected error processing ${restaurantName}: ${err instanceof Error ? err.message : String(err)}`;
      console.warn(`[Pipeline] ${msg}`);
      result.errors.push(msg);
    }
  }

  // -----------------------------------------------------------------------
  // Phase 3: Process scheduled follow-ups
  // -----------------------------------------------------------------------
  try {
    const followUpResult = await processScheduledFollowUps(config);
    result.followUpsProcessed = followUpResult.processed;
    if (followUpResult.errors.length > 0) {
      result.errors.push(...followUpResult.errors);
    }
  } catch (err) {
    const msg = `Follow-up processing failed: ${err instanceof Error ? err.message : String(err)}`;
    console.warn(`[Pipeline] ${msg}`);
    result.errors.push(msg);
  }

  // -----------------------------------------------------------------------
  // Phase 4: Fetch geographic expansion status
  // -----------------------------------------------------------------------
  try {
    const expansion = await getExpansionStatus();
    result.expansionStatus = {
      currentRing: expansion.currentRing,
      currentState: expansion.currentState,
      citiesProspected: expansion.citiesProspected,
      citiesRemaining: expansion.citiesRemaining,
    };
    console.warn(`[Pipeline] Expansion status: ring ${expansion.currentRing} (${expansion.currentState}), ${expansion.citiesProspected} cities prospected, ${expansion.citiesRemaining} remaining`);
  } catch (err) {
    console.warn("[Pipeline] Could not fetch expansion status:", err instanceof Error ? err.message : err);
  }

  // -----------------------------------------------------------------------
  // Finalize
  // -----------------------------------------------------------------------
  result.completedAt = new Date().toISOString();
  result.durationMs = Date.now() - startMs;

  console.warn(`[Pipeline] Completed in ${(result.durationMs / 1000).toFixed(1)}s`);
  console.warn(`[Pipeline] Results: ${result.discovered} discovered, ${result.sitesBuilt} sites built, ${result.emailsSent} emails, ${result.postcardsQueued} postcards, ${result.followUpsProcessed} follow-ups, ${result.errors.length} errors`);

  // Log to activity store
  try {
    await logActivity({
      type: "system",
      action: "pipeline_completed",
      description: `Daily pipeline: ${result.discovered} discovered, ${result.sitesBuilt} built, ${result.emailsSent} emails, ${result.postcardsQueued} postcards, ${result.errors.length} errors (${(result.durationMs / 1000).toFixed(1)}s)`,
      metadata: {
        discovered: String(result.discovered),
        sitesBuilt: String(result.sitesBuilt),
        emailsSent: String(result.emailsSent),
        postcardsQueued: String(result.postcardsQueued),
        followUpsProcessed: String(result.followUpsProcessed),
        errorCount: String(result.errors.length),
        durationMs: String(result.durationMs),
      },
    });
  } catch {
    // Fire-and-forget
  }

  return result;
}

// ---------------------------------------------------------------------------
// Follow-up processor
// ---------------------------------------------------------------------------

/**
 * Process all leads with past-due follow-ups.
 * Sends follow-up emails for leads that haven't been contacted recently.
 */
export async function processScheduledFollowUps(
  config: PipelineConfig
): Promise<{ processed: number; errors: string[] }> {
  const errors: string[] = [];
  let processed = 0;
  const now = new Date();

  console.warn("[Pipeline] Processing scheduled follow-ups...");

  let leads: Lead[];
  try {
    leads = await getAllLeads();
  } catch (err) {
    const msg = `Could not fetch leads for follow-ups: ${err instanceof Error ? err.message : String(err)}`;
    console.warn(`[Pipeline] ${msg}`);
    return { processed: 0, errors: [msg] };
  }

  // Filter to leads with past-due follow-ups in active stages
  const dueLeads = leads.filter((lead) => {
    if (!lead.nextFollowUpAt) return false;
    if (new Date(lead.nextFollowUpAt) > now) return false;

    // Only follow up on leads in outreach or demo stages
    const activeStages = ["outreach", "demo", "proposal"];
    if (!activeStages.includes(lead.stage)) return false;

    return true;
  });

  console.warn(`[Pipeline] ${dueLeads.length} leads due for follow-up`);

  for (const lead of dueLeads) {
    try {
      // DNC check before every touch
      const dncHit = await isOnDnc(lead.email, lead.phone, lead.address);
      if (dncHit) {
        console.warn(`[Pipeline] Skipping follow-up for ${lead.restaurantName} -- on DNC list`);
        try {
          await updateLead(lead.id, { nextFollowUpAt: undefined });
        } catch {
          // Best effort
        }
        continue;
      }

      // Check send limits
      const canSend = await canSendToday();
      if (!canSend) {
        console.warn(`[Pipeline] Daily send limit reached -- deferring follow-up for ${lead.restaurantName}`);
        break; // Stop processing follow-ups for today
      }

      // Count how many outreach events this lead has
      const emailCount = lead.outreachHistory.filter((e) => e.type === "email").length;

      if (emailCount >= 3) {
        // Cadence complete -- no more follow-ups
        console.warn(`[Pipeline] Cadence complete for ${lead.restaurantName} (${emailCount} emails sent)`);
        try {
          await updateLead(lead.id, { nextFollowUpAt: undefined });
        } catch {
          // Best effort
        }
        continue;
      }

      // Send follow-up email
      if (lead.email && config.resendApiKey) {
        if (config.dryRun) {
          console.warn(`[Pipeline] [DRY RUN] Would send follow-up to ${lead.restaurantName} (${lead.email})`);
          processed++;
          continue;
        }

        try {
          await sendFollowUpViaResend(lead, config);
          await recordSend();

          await addOutreachEvent(lead.id, {
            type: "email",
            subject: `Re: ${lead.restaurantName}'s website`,
            status: "sent",
            sentAt: new Date().toISOString(),
          });

          // Schedule next follow-up in 3 days, or clear if cadence complete
          const nextEmailCount = emailCount + 1;
          const nextFollowUpAt =
            nextEmailCount >= 3
              ? undefined
              : new Date(
                  Date.now() + FOLLOW_UP_DAYS * 24 * 60 * 60 * 1000
                ).toISOString();

          await updateLead(lead.id, {
            lastContactedAt: new Date().toISOString(),
            nextFollowUpAt,
          });

          processed++;
          console.warn(`[Pipeline] Follow-up sent to ${lead.restaurantName} (email #${nextEmailCount})`);
        } catch (err) {
          const msg = `Follow-up email failed for ${lead.restaurantName}: ${err instanceof Error ? err.message : String(err)}`;
          console.warn(`[Pipeline] ${msg}`);
          errors.push(msg);
        }
      } else {
        // No email -- try postcard if we haven't sent one
        const postcardCount = lead.outreachHistory.filter((e) => e.type === "postcard").length;
        if (postcardCount === 0 && config.lobApiKey && lead.address && lead.city && lead.state) {
          console.warn(`[Pipeline] No email for ${lead.restaurantName} -- would send postcard (not implemented in follow-up path)`);
        }

        // Clear the follow-up since we can't act on it
        try {
          await updateLead(lead.id, { nextFollowUpAt: undefined });
        } catch {
          // Best effort
        }
      }
    } catch (err) {
      const msg = `Follow-up processing error for ${lead.restaurantName}: ${err instanceof Error ? err.message : String(err)}`;
      console.warn(`[Pipeline] ${msg}`);
      errors.push(msg);
    }
  }

  console.warn(`[Pipeline] Follow-ups: ${processed} processed, ${errors.length} errors`);
  return { processed, errors };
}

// ---------------------------------------------------------------------------
// QA checker
// ---------------------------------------------------------------------------

/**
 * Lightweight QA check: fetch the demo URL and verify key elements
 * are present in the rendered HTML.
 */
async function runQaCheck(slug: string, baseUrl: string): Promise<QaCheckResult> {
  const url = `${baseUrl}/demo/${slug}`;
  const issues: string[] = [];

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15_000);

    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; NorthStarQA/1.0)",
        Accept: "text/html",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Check 1: HTTP 200
    if (!response.ok) {
      issues.push(`HTTP ${response.status} (expected 200)`);
      return { slug, passed: false, issues };
    }

    const html = await response.text();

    // Check 2: Logo image present (img tag with logo in class, alt, or src)
    if (!/logo/i.test(html)) {
      issues.push("No logo reference found in HTML");
    }

    // Check 3: At least 3 menu items (look for menu-item class or repeated item patterns)
    // Count menu item indicators
    const menuItemMatches = html.match(/menu-item|menuItem|data-item|class=".*item.*"/gi) || [];
    // Also count price-like patterns ($X.XX)
    const priceMatches = html.match(/\$\d+\.\d{2}/g) || [];
    if (menuItemMatches.length < 3 && priceMatches.length < 3) {
      issues.push(`Only ${Math.max(menuItemMatches.length, priceMatches.length)} menu items detected (need 3+)`);
    }

    // Check 4: No "undefined" or "null" visible in rendered content
    // Strip HTML tags first to check visible text
    const visibleText = html.replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ");

    if (/\bundefined\b/i.test(visibleText)) {
      issues.push('"undefined" found in visible text');
    }
    if (/\bnull\b/i.test(visibleText)) {
      // Filter out false positives from JSON-LD or meta tags
      const nullInContent = visibleText.replace(/"[^"]*null[^"]*"/gi, "");
      if (/\bnull\b/i.test(nullInContent)) {
        issues.push('"null" found in visible text');
      }
    }

    // Check 5: Google rating displayed (look for star rating pattern)
    if (!/\d\.\d\s*star|rating|review/i.test(html)) {
      issues.push("No Google rating/review section detected");
    }

    // Check 6: Map section present
    if (!/map|google\.com\/maps|iframe.*maps|location/i.test(html)) {
      issues.push("No map/location section detected");
    }
  } catch (err) {
    issues.push(`Fetch failed: ${err instanceof Error ? err.message : String(err)}`);
  }

  const passed = issues.length === 0;
  return { slug, passed, issues };
}

// ---------------------------------------------------------------------------
// Email sending
// ---------------------------------------------------------------------------

/**
 * Send the initial pitch email to a prospect via Resend.
 */
async function sendPitchEmail(
  lead: Lead,
  prospect: ProspectResult,
  previewUrl: string,
  config: PipelineConfig
): Promise<void> {
  const senderName = config.senderName || SENDER_NAME_DEFAULT;
  const companyAddress = config.companyAddress || COMPANY_ADDRESS_DEFAULT;

  const emailCtx: EmailContext = {
    restaurantName: prospect.restaurant.name,
    city: prospect.restaurant.city,
    previewUrl,
    videoUrl: "",
    gifThumbnailUrl: "",
    googleRating: prospect.restaurant.googleRating,
    reviewCount: prospect.restaurant.googleReviewCount,
    cuisineType: prospect.restaurant.cuisineTypes?.[0] || "restaurant",
    senderName,
    senderTitle: "Founder",
    companyName: "NorthStar Synergy",
    companyAddress,
    unsubscribeUrl: `${config.baseUrl}/unsubscribe/${lead.id}`,
  };

  const email = generateInitialPitchEmail(emailCtx);
  const recipientEmail = prospect.restaurant.email;
  if (!recipientEmail) {
    console.warn(`[Pipeline] No email address for ${prospect.restaurant.name} -- skipping email`);
    return;
  }

  await sendViaResend({
    apiKey: config.resendApiKey!,
    from: `${senderName} <${config.senderEmail || SENDER_EMAIL_DEFAULT}>`,
    to: recipientEmail,
    subject: email.subject,
    text: email.body,
  });
}

/**
 * Send a follow-up email to an existing lead via Resend.
 */
async function sendFollowUpViaResend(
  lead: Lead,
  config: PipelineConfig
): Promise<void> {
  const senderName = config.senderName || SENDER_NAME_DEFAULT;
  const companyAddress = config.companyAddress || COMPANY_ADDRESS_DEFAULT;

  const subject = `Re: ${lead.restaurantName}'s website`;
  const body = `Hi there,

Just following up -- your preview site is still live:

${lead.previewUrl || config.baseUrl}

I built it with your actual menu, your real Google reviews, and your hours. It's not a template -- it's YOUR restaurant.

If there's anything you'd want changed, I'm happy to tweak it. Menu items, photos, colors -- whatever makes it feel right.

$99/month. No contract. Cancel anytime.

${senderName}
NorthStar Synergy
${companyAddress}

---
${config.baseUrl}/unsubscribe/${lead.id}`;

  await sendViaResend({
    apiKey: config.resendApiKey!,
    from: `${senderName} <${config.senderEmail || SENDER_EMAIL_DEFAULT}>`,
    to: lead.email!,
    subject,
    text: body,
  });
}

// ---------------------------------------------------------------------------
// Postcard sending
// ---------------------------------------------------------------------------

/**
 * Send a physical postcard to a prospect via Lob.
 */
async function sendProspectPostcard(
  prospect: ProspectResult,
  previewUrl: string,
  config: PipelineConfig
): Promise<void> {
  const r = prospect.restaurant;
  if (!r.address || !r.city || !r.state || !r.zip) {
    console.warn(`[Pipeline] Incomplete address for ${r.name} -- skipping postcard`);
    return;
  }

  const senderName = config.senderName || SENDER_NAME_DEFAULT;
  const companyAddress = config.companyAddress || COMPANY_ADDRESS_DEFAULT;
  const fromParts = companyAddress.split(",").map((s) => s.trim());

  const postcardConfig: PostcardConfig = {
    lobApiKey: config.lobApiKey!,
    restaurantName: r.name,
    restaurantAddress: r.address,
    restaurantCity: r.city,
    restaurantState: r.state,
    restaurantZip: r.zip,
    previewUrl,
    websiteScreenshotUrl: `${previewUrl}/og-image.png`,
    fromName: senderName,
    fromAddress: fromParts[0] || "",
    fromCity: fromParts[1] || "",
    fromState: (fromParts[2] || "").replace(/\s*\d{5}.*/, "").trim(),
    fromZip: (fromParts[2] || "").match(/\d{5}/)?.[0] || "",
  };

  const result = await lobSendPostcard(postcardConfig);
  console.warn(`[Pipeline] Postcard queued: ${result.id}, expected delivery: ${result.expectedDelivery}`);
}

// ---------------------------------------------------------------------------
// Resend API helper (matches existing outreach-pipeline.ts pattern)
// ---------------------------------------------------------------------------

async function sendViaResend(params: {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  text: string;
}): Promise<void> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${params.apiKey}`,
    },
    body: JSON.stringify({
      from: params.from,
      to: [params.to],
      subject: params.subject,
      text: params.text,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Resend API error: ${response.status} ${err}`);
  }

  const data = await response.json();
  console.warn(`[Pipeline] Email sent via Resend: ${data.id}`);
}
