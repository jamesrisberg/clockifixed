/**
 * Schema overrides — patches generated Zod schemas to match what the
 * Clockify API actually returns, as discovered by the verifier.
 *
 * Each override documents:
 *   - What the spec claims
 *   - What the API actually sends
 *   - When it was discovered
 *
 * These produce "reality" schemas that validate real API responses,
 * while the generated schemas remain the "spec" schemas for comparison.
 */

import { z } from "zod";

// ── Helpers ──────────────────────────────────────────────────────────

/** Make specific fields nullable in a Zod object schema */
function withNullable<T extends z.ZodObject<any>>(
  schema: T,
  fields: string[]
): z.ZodType {
  const shape = (schema as any)._zod?.def?.shape ?? (schema as any).shape;
  if (!shape) return schema;

  const newShape: Record<string, z.ZodType> = { ...shape };
  for (const field of fields) {
    if (newShape[field]) {
      newShape[field] = newShape[field].nullable();
    }
  }
  return z.object(newShape) as any;
}

/** Extend a Zod object schema with additional fields */
function withFields<T extends z.ZodObject<any>>(
  schema: T,
  extraFields: Record<string, z.ZodType>
): z.ZodType {
  const shape = (schema as any)._zod?.def?.shape ?? (schema as any).shape;
  if (!shape) return schema;
  return z.object({ ...shape, ...extraFields }) as any;
}

// ── Override Definitions ─────────────────────────────────────────────

export interface OverrideEntry {
  /** Which schema is being patched */
  schemaName: string;
  /** What was wrong */
  divergence: string;
  /** What the spec says */
  specBehavior: string;
  /** What the API actually does */
  actualBehavior: string;
  /** When this was discovered */
  discoveredAt: string;
}

/**
 * Registry of all known divergences between spec and reality.
 */
export const overrideRegistry: OverrideEntry[] = [
  // ── Nullable fields the spec doesn't mark as nullable ─────────────
  {
    schemaName: "MembershipDtoV1",
    divergence: "costRate and hourlyRate can be null",
    specBehavior: "costRate: object (required), hourlyRate: object (required)",
    actualBehavior: "Both fields return null when no rate is set",
    discoveredAt: "2026-03-18",
  },
  {
    schemaName: "WorkspaceSettingsDtoV1",
    divergence: "automaticLock, lockTimeEntries, lockTimeZone can be null",
    specBehavior: "All typed as required non-nullable",
    actualBehavior: "Return null when automatic lock is not configured",
    discoveredAt: "2026-03-18",
  },
  {
    schemaName: "WorkspaceSubdomainDtoV1",
    divergence: "name can be null",
    specBehavior: "name: string (required)",
    actualBehavior: "Returns null when workspace has no subdomain",
    discoveredAt: "2026-03-18",
  },
  {
    schemaName: "ProjectDtoV1",
    divergence: "budgetEstimate and costRate can be null",
    specBehavior: "Both typed as required objects",
    actualBehavior: "Return null when not configured on project",
    discoveredAt: "2026-03-18",
  },
  {
    schemaName: "ProjectDtoV1",
    divergence: "Undocumented fields: clientId, clientName, estimateReset",
    specBehavior: "Not in spec",
    actualBehavior: "clientId: string, clientName: string, estimateReset: null|object",
    discoveredAt: "2026-03-18",
  },
  {
    schemaName: "TimeEntryDtoImplV1 / TimeEntryWithRatesDtoV1",
    divergence: "kioskId and tagIds can be null",
    specBehavior: "kioskId: string (optional), tagIds: string[] (optional)",
    actualBehavior: "Both return null instead of being absent",
    discoveredAt: "2026-03-18",
  },
  {
    schemaName: "TimeEstimateDto",
    divergence: "resetOption returns empty string instead of enum value",
    specBehavior: 'resetOption: "WEEKLY" | "MONTHLY" | "YEARLY"',
    actualBehavior: "Returns empty string when no reset is configured",
    discoveredAt: "2026-03-18",
  },
  // ── Enum values not in spec ────────────────────────────────────────
  {
    schemaName: "Feature",
    divergence: "API returns feature values not in the spec's enum",
    specBehavior: "Enum with ~60 values",
    actualBehavior: "Additional values appear as Clockify adds features",
    discoveredAt: "2026-03-18",
  },
  {
    schemaName: "WorkspaceSettingsDtoV1",
    divergence: "adminOnlyPages returns values not in spec enum",
    specBehavior: 'adminOnlyPages: ("PROJECT" | "TEAM" | "REPORTS")[]',
    actualBehavior: "Returns additional page identifiers",
    discoveredAt: "2026-03-18",
  },
  {
    schemaName: "MemberProfileDtoV1",
    divergence: "workingDays returns values not in spec enum",
    specBehavior: 'workingDays: ("MONDAY" | ... | "SUNDAY")[]',
    actualBehavior: "Values match but schema was checking incorrectly — likely a nested array issue",
    discoveredAt: "2026-03-18",
  },
];

// ── Reality Schemas ──────────────────────────────────────────────────
// These are the patched versions that match what the API actually returns.
// Import and use these instead of the generated schemas when validating
// real API responses.

import {
  membershipSchema,
  workspaceSchema,
  workspaceSettingsSchema,
  workspaceSubdomainSchema,
  projectDtoV1Schema,
  timeEntryWithRatesSchema,
  timeEntryDtoImplV1Schema,
  timeEstimateSchema,
  memberProfileSchema,
} from "./index.js";

/**
 * Membership with nullable rate fields (spec says required, API sends null).
 */
export const realMembershipSchema = withNullable(membershipSchema as any, [
  "costRate",
  "hourlyRate",
]);

/**
 * Workspace settings with nullable lock fields.
 */
export const realWorkspaceSettingsSchema = (() => {
  const base = withNullable(workspaceSettingsSchema as any, [
    "automaticLock",
    "lockTimeEntries",
    "lockTimeZone",
  ]);
  return base;
})();

/**
 * Workspace subdomain with nullable name.
 */
export const realWorkspaceSubdomainSchema = withNullable(
  workspaceSubdomainSchema as any,
  ["name"]
);

/**
 * Membership with nullable rates (used inside projects, workspaces, etc.)
 */
const realMembershipItemSchema = z.object({
  hourlyRate: z.unknown().nullable().optional(),
  costRate: z.unknown().nullable().optional(),
  membershipStatus: z.string().optional(),
  membershipType: z.string().optional(),
  targetId: z.string().optional(),
  userId: z.string().optional(),
}).passthrough();

/**
 * TimeEstimate with resetOption allowing empty string.
 */
const realTimeEstimateInlineSchema = z.object({
  active: z.boolean().optional(),
  estimate: z.string().optional(),
  includeNonBillable: z.boolean().optional(),
  resetOption: z.string().nullable().optional(), // spec says enum, API sends "" or null
  type: z.string().optional(),
}).optional().nullable();

/**
 * Project with nullable budgetEstimate/costRate, relaxed nested types,
 * and undocumented fields.
 */
export const realProjectSchema = (() => {
  const shape = (projectDtoV1Schema as any)._zod?.def?.shape ?? (projectDtoV1Schema as any).shape;
  if (!shape) return projectDtoV1Schema;
  return z.object({
    ...shape,
    budgetEstimate: z.unknown().nullable().optional(),
    costRate: z.unknown().nullable().optional(),
    memberships: z.array(realMembershipItemSchema).optional(),
    timeEstimate: realTimeEstimateInlineSchema,
    // Undocumented fields
    clientId: z.string().optional(),
    clientName: z.string().optional(),
    estimateReset: z.unknown().optional(),
  });
})();

/**
 * Time entry with nullable kioskId and tagIds.
 */
export const realTimeEntryWithRatesSchema = withNullable(
  timeEntryWithRatesSchema as any,
  ["kioskId", "tagIds"]
);

export const realTimeEntrySchema = withNullable(
  timeEntryDtoImplV1Schema as any,
  ["kioskId", "tagIds"]
);

/**
 * Time estimate with resetOption allowing empty string.
 */
export const realTimeEstimateSchema = (() => {
  const shape = (timeEstimateSchema as any)._zod?.def?.shape ?? (timeEstimateSchema as any).shape;
  if (!shape) return timeEstimateSchema;
  return z.object({
    ...shape,
    resetOption: z.union([
      z.enum(["WEEKLY", "MONTHLY", "YEARLY"]),
      z.literal(""),
    ]).optional(),
  });
})();

/**
 * Feature enum — use string() instead of strict enum since Clockify
 * adds new feature flags without updating the spec.
 */
export const realFeatureSchema = z.string();

/**
 * Admin-only pages — use string() since spec enum is incomplete.
 */
export const realAdminOnlyPagesSchema = z.array(z.string());

/**
 * Workspace settings with nullable lock fields and relaxed enums.
 * - automaticLock, lockTimeEntries, lockTimeZone can be null
 * - adminOnlyPages has undeclared enum values
 */
const realWorkspaceSettingsInlineSchema = (() => {
  const shape = (workspaceSettingsSchema as any)._zod?.def?.shape ?? (workspaceSettingsSchema as any).shape;
  if (!shape) return workspaceSettingsSchema;
  return z.object({
    ...shape,
    adminOnlyPages: z.array(z.string()).optional(),
    automaticLock: z.unknown().nullable().optional(),
    lockTimeEntries: z.string().nullable().optional(),
    lockTimeZone: z.string().nullable().optional(),
  });
})();

/**
 * Workspace subdomain with nullable name.
 */
const realSubdomainInlineSchema = (() => {
  const shape = (workspaceSubdomainSchema as any)._zod?.def?.shape ?? (workspaceSubdomainSchema as any).shape;
  if (!shape) return workspaceSubdomainSchema;
  return z.object({
    ...shape,
    name: z.string().nullable().optional(),
  });
})();

/**
 * Full workspace with all known reality patches applied:
 * - features: relaxed to string[] (new feature flags appear without spec updates)
 * - memberships[].costRate/hourlyRate: nullable
 * - subdomain.name: nullable
 * - workspaceSettings: nullable lock fields, relaxed adminOnlyPages enum
 */
export const realWorkspaceSchema = (() => {
  const shape = (workspaceSchema as any)._zod?.def?.shape ?? (workspaceSchema as any).shape;
  if (!shape) return workspaceSchema;
  return z.object({
    ...shape,
    features: z.array(z.string()).optional(),
    memberships: z.array(realMembershipItemSchema).optional(),
    subdomain: realSubdomainInlineSchema.optional(),
    workspaceSettings: realWorkspaceSettingsInlineSchema.optional(),
  });
})();

/**
 * Member profile with relaxed workingDays.
 * The spec says workingDays is an enum array but validation fails —
 * the actual values match the enum but it may be sent as a different
 * structure or contain additional values.
 */
export const realMemberProfileSchema = (() => {
  const shape = (memberProfileSchema as any)._zod?.def?.shape ?? (memberProfileSchema as any).shape;
  if (!shape) return memberProfileSchema;
  return z.object({
    ...shape,
    workingDays: z.array(z.string()).optional(),
  });
})();
