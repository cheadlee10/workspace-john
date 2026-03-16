import { getSupabase, isTableNotFoundError } from "@/lib/db/supabase";
import { moveLeadToStage, searchLeads } from "@/lib/crm/lead-store";
import { slugify } from "@/lib/utils";
import type {
  OnboardingRecord,
  OnboardingRecordInput,
  OnboardingSubmitResponse,
  OnboardingPhotosInput,
  OnboardingMenuCategoryInput,
  OnboardingSocialLinksInput,
  ColorVibePreference,
  SquarePosPreference,
} from "@/types/onboarding";
import type { BusinessHours } from "@/types/restaurant";

const ONBOARDING_TABLE_MIGRATION_SQL = `create table if not exists onboarding_submissions (
  id text primary key,
  restaurant_slug text not null,
  restaurant_id text not null,
  lead_id text,
  restaurant_name text not null,
  owner_name text not null,
  owner_email text not null,
  owner_phone text not null,
  menu jsonb not null default '[]',
  photos jsonb not null default '{"logo":[],"food":[],"interior":[]}',
  hours jsonb not null default '[]',
  story text not null default '',
  color_vibe_preference text not null check (color_vibe_preference in ('keep_current', 'warmer', 'darker', 'brighter')),
  wants_online_ordering boolean not null default false,
  square_pos_preference text check (square_pos_preference in ('yes', 'no', 'dont_know')),
  social_links jsonb not null default '{}',
  anything_else text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_onboarding_restaurant_slug on onboarding_submissions (restaurant_slug);
create index if not exists idx_onboarding_lead_id on onboarding_submissions (lead_id);

alter table leads drop constraint if exists leads_stage_check;
alter table leads
  add constraint leads_stage_check
  check (stage in ('prospect', 'outreach', 'demo', 'proposal', 'close', 'onboarding', 'onboarding_complete', 'active', 'churned'));`;

interface DbOnboardingRecord {
  id: string;
  restaurant_slug: string;
  restaurant_id: string;
  lead_id: string | null;
  restaurant_name: string;
  owner_name: string;
  owner_email: string;
  owner_phone: string;
  menu: OnboardingMenuCategoryInput[];
  photos: OnboardingPhotosInput;
  hours: BusinessHours[];
  story: string;
  color_vibe_preference: ColorVibePreference;
  wants_online_ordering: boolean;
  square_pos_preference: SquarePosPreference | null;
  social_links: OnboardingSocialLinksInput;
  anything_else: string | null;
  created_at: string;
  updated_at: string;
}

export function getOnboardingMigrationSql(): string {
  return ONBOARDING_TABLE_MIGRATION_SQL;
}

function generateOnboardingId(): string {
  return `onb-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function normalizeMenu(menu: OnboardingMenuCategoryInput[]): OnboardingMenuCategoryInput[] {
  return menu
    .map((category) => ({
      id: category.id,
      name: category.name.trim(),
      items: category.items.map((item) => ({
        id: item.id,
        name: item.name.trim(),
        description: item.description.trim(),
        price: item.price.trim(),
      })),
    }))
    .filter((category) => category.name.length > 0 && category.items.length > 0);
}

function normalizeHours(hours: BusinessHours[]): BusinessHours[] {
  return hours.map((hour) => ({
    day: hour.day,
    open: hour.open,
    close: hour.close,
    closed: hour.closed,
  }));
}

export function sanitizeOnboardingInput(input: OnboardingRecordInput): OnboardingRecordInput {
  return {
    restaurantSlug: slugify(input.restaurantSlug),
    restaurantId: input.restaurantId.trim(),
    leadId: input.leadId?.trim() || undefined,
    restaurantName: input.restaurantName.trim(),
    ownerName: input.ownerName.trim(),
    ownerEmail: input.ownerEmail.trim().toLowerCase(),
    ownerPhone: input.ownerPhone.trim(),
    menu: normalizeMenu(input.menu),
    photos: {
      logo: input.photos.logo.filter(Boolean),
      food: input.photos.food.filter(Boolean),
      interior: input.photos.interior.filter(Boolean),
    },
    hours: normalizeHours(input.hours),
    story: input.story.trim(),
    colorVibePreference: input.colorVibePreference,
    wantsOnlineOrdering: input.wantsOnlineOrdering,
    squarePosPreference: input.wantsOnlineOrdering ? input.squarePosPreference : undefined,
    socialLinks: {
      instagram: normalizeUrl(input.socialLinks.instagram),
      facebook: normalizeUrl(input.socialLinks.facebook),
    },
    anythingElse: input.anythingElse?.trim() || undefined,
  };
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidTime(value: string): boolean {
  return /^\d{2}:\d{2}$/.test(value);
}

function validateMenu(menu: OnboardingMenuCategoryInput[]): string | undefined {
  if (menu.length === 0) {
    return "Add at least one menu category.";
  }

  for (const category of menu) {
    if (!category.name) {
      return "Each menu category needs a name.";
    }
    if (category.items.length === 0) {
      return `Category "${category.name}" needs at least one menu item.`;
    }

    for (const item of category.items) {
      if (!item.name) {
        return `Every menu item in "${category.name}" needs a name.`;
      }
      if (!item.price || Number.isNaN(Number(item.price))) {
        return `Item "${item.name}" in "${category.name}" needs a valid price.`;
      }
    }
  }

  return undefined;
}

export function validateOnboardingInput(input: OnboardingRecordInput): string | undefined {
  if (!input.restaurantSlug) return "restaurantSlug is required.";
  if (!input.restaurantId) return "restaurantId is required.";
  if (!input.restaurantName) return "restaurantName is required.";
  if (!input.ownerName) return "ownerName is required.";
  if (!isValidEmail(input.ownerEmail)) return "A valid ownerEmail is required.";
  if (!input.ownerPhone) return "ownerPhone is required.";
  if (!input.story) return "About / story is required.";
  if (!input.colorVibePreference) return "colorVibePreference is required.";
  if (!Array.isArray(input.hours) || input.hours.length !== 7) return "hours must include all 7 days.";

  for (const hour of input.hours) {
    if (!hour.closed && (!isValidTime(hour.open) || !isValidTime(hour.close))) {
      return `Hours for ${hour.day} must use HH:MM format.`;
    }
  }

  const menuError = validateMenu(input.menu);
  if (menuError) return menuError;

  if (input.wantsOnlineOrdering && !input.squarePosPreference) {
    return "squarePosPreference is required when online ordering is enabled.";
  }

  return undefined;
}

function fromDbRecord(row: DbOnboardingRecord): OnboardingRecord {
  return {
    id: row.id,
    restaurantSlug: row.restaurant_slug,
    restaurantId: row.restaurant_id,
    leadId: row.lead_id ?? undefined,
    restaurantName: row.restaurant_name,
    ownerName: row.owner_name,
    ownerEmail: row.owner_email,
    ownerPhone: row.owner_phone,
    menu: row.menu,
    photos: row.photos,
    hours: row.hours,
    story: row.story,
    colorVibePreference: row.color_vibe_preference,
    wantsOnlineOrdering: row.wants_online_ordering,
    squarePosPreference: row.square_pos_preference ?? undefined,
    socialLinks: row.social_links,
    anythingElse: row.anything_else ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function findLeadForRestaurant(params: {
  restaurantName: string;
  restaurantSlug: string;
}): Promise<string | undefined> {
  const exactName = params.restaurantName.trim().toLowerCase();
  const leads = await searchLeads(params.restaurantName);
  const slug = params.restaurantSlug.trim().toLowerCase();

  const exactMatch = leads.find((lead) => lead.restaurantName.trim().toLowerCase() === exactName);
  if (exactMatch) return exactMatch.id;

  const previewMatch = leads.find((lead) => lead.previewUrl?.toLowerCase().includes(`/${slug}`));
  return previewMatch?.id;
}

export async function createOnboardingRecord(input: OnboardingRecordInput): Promise<OnboardingSubmitResponse> {
  const sanitized = sanitizeOnboardingInput(input);
  const validationError = validateOnboardingInput(sanitized);
  if (validationError) {
    return { error: validationError };
  }

  const supabase = getSupabase();
  if (!supabase) {
    return {
      error: "Supabase is not configured.",
      details: "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before submitting onboarding records.",
    };
  }

  const now = new Date().toISOString();
  const onboardingId = generateOnboardingId();
  const leadId = sanitized.leadId ?? await findLeadForRestaurant({
    restaurantName: sanitized.restaurantName,
    restaurantSlug: sanitized.restaurantSlug,
  });

  const row: Omit<DbOnboardingRecord, "created_at" | "updated_at"> = {
    id: onboardingId,
    restaurant_slug: sanitized.restaurantSlug,
    restaurant_id: sanitized.restaurantId,
    lead_id: leadId ?? null,
    restaurant_name: sanitized.restaurantName,
    owner_name: sanitized.ownerName,
    owner_email: sanitized.ownerEmail,
    owner_phone: sanitized.ownerPhone,
    menu: sanitized.menu,
    photos: sanitized.photos,
    hours: sanitized.hours,
    story: sanitized.story,
    color_vibe_preference: sanitized.colorVibePreference,
    wants_online_ordering: sanitized.wantsOnlineOrdering,
    square_pos_preference: sanitized.squarePosPreference ?? null,
    social_links: sanitized.socialLinks,
    anything_else: sanitized.anythingElse ?? null,
  };

  const { data, error } = await supabase
    .from("onboarding_submissions")
    .insert({
      ...row,
      created_at: now,
      updated_at: now,
    })
    .select("*")
    .single();

  if (error) {
    if (isTableNotFoundError(error)) {
      return {
        error: "Supabase table onboarding_submissions does not exist.",
        details: "Create the onboarding_submissions table and extend the leads stage constraint before retrying.",
        migrationSql: getOnboardingMigrationSql(),
      };
    }

    return {
      error: "Failed to save onboarding submission.",
      details: error.message,
    };
  }

  let warning: string | undefined;
  if (leadId) {
    try {
      await moveLeadToStage(leadId, "onboarding_complete");
    } catch (leadError) {
      warning = `Onboarding saved, but lead stage update failed: ${String(leadError)}`;
    }
  } else {
    warning = "Onboarding saved, but no matching lead was found to move to onboarding_complete.";
  }

  return {
    onboarding: fromDbRecord(data as DbOnboardingRecord),
    warning,
  };
}

export async function sendOnboardingNotificationEmail(record: OnboardingRecord): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  const recipients = [
    process.env.CRAIG_NOTIFICATION_EMAIL || "chead@me.com",
    process.env.JOHN_NOTIFICATION_EMAIL || "john@northstarsynergy.com",
  ];

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:640px;margin:0 auto;color:#172033">
      <h1 style="margin:0 0 16px;font-size:24px;">New onboarding submission</h1>
      <p style="margin:0 0 20px;font-size:15px;color:#4b5563;">
        ${record.restaurantName} submitted onboarding for slug <strong>${record.restaurantSlug}</strong>.
      </p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;color:#6b7280;width:180px;">Owner</td><td style="padding:8px 0;">${record.ownerName}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Email</td><td style="padding:8px 0;">${record.ownerEmail}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Phone</td><td style="padding:8px 0;">${record.ownerPhone}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Online ordering</td><td style="padding:8px 0;">${record.wantsOnlineOrdering ? "Yes" : "Not yet"}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Square POS</td><td style="padding:8px 0;">${record.squarePosPreference ?? "n/a"}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Menu categories</td><td style="padding:8px 0;">${record.menu.length}</td></tr>
        <tr><td style="padding:8px 0;color:#6b7280;">Photos</td><td style="padding:8px 0;">Logo ${record.photos.logo.length}, Food ${record.photos.food.length}, Interior ${record.photos.interior.length}</td></tr>
      </table>
      <div style="margin-top:20px;padding:16px;border-radius:12px;background:#f8fafc;">
        <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:0.08em;color:#6b7280;">Story</p>
        <p style="margin:0;white-space:pre-wrap;">${record.story}</p>
      </div>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "NorthStar Onboarding <onboarding@northstarsynergy.com>",
        to: recipients,
        reply_to: record.ownerEmail,
        subject: `Onboarding submitted: ${record.restaurantName}`,
        html,
      }),
    });

    if (response.ok) {
      return { success: true };
    }

    const result = await response.json() as { message?: string };
    return { success: false, error: result.message || "Failed to send onboarding email" };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}
