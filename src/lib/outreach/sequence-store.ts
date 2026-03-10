/**
 * Email Sequence Store
 *
 * Manages automated email sequences and lead enrollments.
 * Supports Supabase database with in-memory fallback.
 */

import type { EmailSequence, EmailSequenceStep, EmailEnrollment } from "@/types/business";
import { getLead, addOutreachEvent } from "@/lib/crm/lead-store";
import { logActivity } from "@/lib/activity/activity-store";
import { isDbEnabled, getSupabase, isTableNotFoundError, markSchemaUnavailable } from "@/lib/db/supabase";

// === In-memory fallback ===
const memSequences = new Map<string, EmailSequence>();
const memEnrollments = new Map<string, EmailEnrollment>();

function generateId(): string {
  return "seq-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

function generateEnrollmentId(): string {
  return "enr-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

// === DB helpers ===
function toDbSequence(s: EmailSequence) {
  return {
    id: s.id,
    name: s.name,
    description: s.description,
    steps: s.steps,
    is_active: s.isActive,
    created_at: s.createdAt,
  };
}

function fromDbSequence(row: Record<string, unknown>): EmailSequence {
  return {
    id: row.id as string,
    name: row.name as string,
    description: row.description as string,
    steps: (row.steps as EmailSequenceStep[]) || [],
    isActive: row.is_active as boolean,
    createdAt: row.created_at as string,
  };
}

function toDbEnrollment(e: EmailEnrollment) {
  return {
    id: e.id,
    lead_id: e.leadId,
    sequence_id: e.sequenceId,
    current_step: e.currentStep,
    status: e.status,
    enrolled_at: e.enrolledAt,
    last_step_sent_at: e.lastStepSentAt || null,
    next_step_at: e.nextStepAt || null,
  };
}

function fromDbEnrollment(row: Record<string, unknown>): EmailEnrollment {
  return {
    id: row.id as string,
    leadId: row.lead_id as string,
    sequenceId: row.sequence_id as string,
    currentStep: row.current_step as number,
    status: row.status as EmailEnrollment["status"],
    enrolledAt: row.enrolled_at as string,
    lastStepSentAt: (row.last_step_sent_at as string) || undefined,
    nextStepAt: (row.next_step_at as string) || undefined,
  };
}

// === SEQUENCE CRUD ===

export async function createSequence(params: {
  name: string;
  description: string;
  steps: Omit<EmailSequenceStep, "id">[];
}): Promise<EmailSequence> {
  const id = generateId();
  const sequence: EmailSequence = {
    id,
    name: params.name,
    description: params.description,
    steps: params.steps.map((s) => ({ ...s, id: generateId() })),
    isActive: true,
    createdAt: new Date().toISOString(),
  };

  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { error } = await db.from("sequences").insert(toDbSequence(sequence));
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        memSequences.set(id, sequence);
      } else {
        throw new Error(`Failed to create sequence: ${error.message}`);
      }
    }
  } else {
    memSequences.set(id, sequence);
  }

  return sequence;
}

export async function getSequence(id: string): Promise<EmailSequence | undefined> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { data, error } = await db.from("sequences").select("*").eq("id", id).single();
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return undefined;
      }
    } else if (data) {
      return fromDbSequence(data);
    } else {
      return undefined;
    }
  }
  return memSequences.get(id);
}

export async function updateSequence(id: string, updates: Partial<EmailSequence>): Promise<EmailSequence | undefined> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const existing = await getSequence(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...updates };
    const { error } = await db.from("sequences").update(toDbSequence(updated)).eq("id", id);
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return undefined;
      }
    } else {
      return updated;
    }
  }
  const seq = memSequences.get(id);
  if (!seq) return undefined;
  const updated = { ...seq, ...updates };
  memSequences.set(id, updated);
  return updated;
}

export async function deleteSequence(id: string): Promise<boolean> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { error } = await db.from("sequences").delete().eq("id", id);
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  return memSequences.delete(id);
}

export async function getAllSequences(): Promise<EmailSequence[]> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { data, error } = await db.from("sequences").select("*");
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return [];
      }
    } else {
      return (data || []).map(fromDbSequence);
    }
  }
  return Array.from(memSequences.values());
}

// === ENROLLMENT ===

export async function enrollLead(leadId: string, sequenceId: string): Promise<EmailEnrollment | undefined> {
  const lead = await getLead(leadId);
  const sequence = await getSequence(sequenceId);
  if (!lead || !sequence) return undefined;

  // Don't double-enroll
  const allEnrollments = await getAllEnrollments();
  const existing = allEnrollments.find(
    (e) => e.leadId === leadId && e.sequenceId === sequenceId && e.status === "active"
  );
  if (existing) return existing;

  const id = generateEnrollmentId();
  const now = new Date();
  const firstStepAt = new Date(now);
  firstStepAt.setDate(firstStepAt.getDate() + (sequence.steps[0]?.dayOffset || 0));

  const enrollment: EmailEnrollment = {
    id,
    leadId,
    sequenceId,
    currentStep: 0,
    status: "active",
    enrolledAt: now.toISOString(),
    nextStepAt: firstStepAt.toISOString(),
  };

  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { error } = await db.from("enrollments").insert(toDbEnrollment(enrollment));
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        memEnrollments.set(id, enrollment);
      } else {
        throw new Error(`Failed to enroll lead: ${error.message}`);
      }
    }
  } else {
    memEnrollments.set(id, enrollment);
  }

  logActivity({
    type: "outreach",
    action: "sequence_enrolled",
    description: `${lead.restaurantName} enrolled in "${sequence.name}"`,
    entityId: leadId,
    entityName: lead.restaurantName,
  });

  return enrollment;
}

export async function getEnrollment(id: string): Promise<EmailEnrollment | undefined> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { data, error } = await db.from("enrollments").select("*").eq("id", id).single();
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return undefined;
      }
    } else if (data) {
      return fromDbEnrollment(data);
    } else {
      return undefined;
    }
  }
  return memEnrollments.get(id);
}

export async function getAllEnrollments(): Promise<EmailEnrollment[]> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { data, error } = await db.from("enrollments").select("*");
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return [];
      }
    } else {
      return (data || []).map(fromDbEnrollment);
    }
  }
  return Array.from(memEnrollments.values());
}

export async function getActiveEnrollments(): Promise<EmailEnrollment[]> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { data, error } = await db.from("enrollments").select("*").eq("status", "active");
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return [];
      }
    } else {
      return (data || []).map(fromDbEnrollment);
    }
  }
  const all = await getAllEnrollments();
  return all.filter((e) => e.status === "active");
}

export async function getEnrollmentsForLead(leadId: string): Promise<EmailEnrollment[]> {
  if (isDbEnabled()) {
    const db = getSupabase()!;
    const { data, error } = await db.from("enrollments").select("*").eq("lead_id", leadId);
    if (error) {
      if (isTableNotFoundError(error)) {
        markSchemaUnavailable();
        // Fall through to in-memory
      } else {
        return [];
      }
    } else {
      return (data || []).map(fromDbEnrollment);
    }
  }
  const all = await getAllEnrollments();
  return all.filter((e) => e.leadId === leadId);
}

/**
 * Process all pending enrollment steps.
 */
export async function processEnrollments(): Promise<{
  processed: number;
  emails: Array<{ leadId: string; restaurantName: string; subject: string; step: number }>;
}> {
  const now = new Date();
  const result: {
    processed: number;
    emails: Array<{ leadId: string; restaurantName: string; subject: string; step: number }>;
  } = { processed: 0, emails: [] };

  const active = await getActiveEnrollments();

  for (const enrollment of active) {
    if (!enrollment.nextStepAt) continue;
    if (new Date(enrollment.nextStepAt) > now) continue;

    const sequence = await getSequence(enrollment.sequenceId);
    const lead = await getLead(enrollment.leadId);
    if (!sequence || !lead) continue;

    const step = sequence.steps[enrollment.currentStep];
    if (!step) {
      // Sequence complete
      const completed = { ...enrollment, status: "completed" as const };
      if (isDbEnabled()) {
        const db = getSupabase()!;
        const { error } = await db.from("enrollments").update(toDbEnrollment(completed)).eq("id", enrollment.id);
        if (error) {
          if (isTableNotFoundError(error)) {
            markSchemaUnavailable();
            memEnrollments.set(enrollment.id, completed);
          }
        }
      } else {
        memEnrollments.set(enrollment.id, completed);
      }
      continue;
    }

    const subject = renderTemplate(step.subject, lead);
    await addOutreachEvent(lead.id, {
      type: "email",
      subject,
      status: "sent",
      sentAt: now.toISOString(),
      metadata: { sequenceId: sequence.id, stepIndex: String(enrollment.currentStep) },
    });

    result.emails.push({
      leadId: lead.id,
      restaurantName: lead.restaurantName,
      subject,
      step: enrollment.currentStep + 1,
    });

    const nextStepIndex = enrollment.currentStep + 1;
    const nextStep = sequence.steps[nextStepIndex];
    let nextStepAt: string | undefined;
    if (nextStep) {
      const next = new Date(now);
      next.setDate(next.getDate() + nextStep.dayOffset);
      nextStepAt = next.toISOString();
    }

    const advanced = {
      ...enrollment,
      currentStep: nextStepIndex,
      lastStepSentAt: now.toISOString(),
      nextStepAt,
      status: (nextStep ? "active" : "completed") as EmailEnrollment["status"],
    };

    if (isDbEnabled()) {
      const db = getSupabase()!;
      const { error } = await db.from("enrollments").update(toDbEnrollment(advanced)).eq("id", enrollment.id);
      if (error) {
        if (isTableNotFoundError(error)) {
          markSchemaUnavailable();
          memEnrollments.set(enrollment.id, advanced);
        }
      }
    } else {
      memEnrollments.set(enrollment.id, advanced);
    }

    result.processed++;
  }

  if (result.processed > 0) {
    logActivity({
      type: "outreach",
      action: "sequences_processed",
      description: `Processed ${result.processed} outreach emails`,
    });
  }

  return result;
}

function renderTemplate(template: string, lead: { restaurantName: string; contactName?: string; city: string; previewUrl?: string }): string {
  return template
    .replace(/\{\{restaurantName\}\}/g, lead.restaurantName)
    .replace(/\{\{contactName\}\}/g, lead.contactName || "there")
    .replace(/\{\{city\}\}/g, lead.city)
    .replace(/\{\{previewUrl\}\}/g, lead.previewUrl || "#");
}

export async function getSequenceStats(sequenceId: string): Promise<{
  enrolled: number;
  active: number;
  completed: number;
  emailsSent: number;
}> {
  const all = await getAllEnrollments();
  const related = all.filter((e) => e.sequenceId === sequenceId);
  return {
    enrolled: related.length,
    active: related.filter((e) => e.status === "active").length,
    completed: related.filter((e) => e.status === "completed").length,
    emailsSent: related.reduce((sum, e) => sum + e.currentStep, 0),
  };
}
