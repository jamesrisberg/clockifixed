/**
 * Unified response types — clean names for consumers.
 *
 * Each unified type is a superset of all API response variants for that entity,
 * with variant-specific fields marked optional. This means:
 *   - `projects.getAll()` returns `Project[]` (not `ProjectDtoV1[]`)
 *   - `projects.create()` returns `Project` (not `ProjectDtoImplV1`)
 *   - Consumers import `Project` and it works everywhere
 *
 * Old type names remain exported from the models barrel for backward compat.
 */

import { z } from "zod";
import type {
  RateDtoV1,
  Membership,
  Estimate,
  EstimateWithOptions,
  EstimateReset,
  TimeEstimate,
  TimeIntervalDtoV1,
  CustomFieldValueDtoV1,
  DatePeriod,
  AutomaticTimeEntryCreation,
  ReportTag,
  ReportTimeInterval,
} from "./index.js";

// Re-export generated types for deep-path imports
import type { TagDtoV1 } from "./models/tag.js";
import type { UserDtoV1 } from "./models/user.js";
import type { ExpenseCategoryDtoV1 } from "./models/expense.js";
import type { TemplateDtoImpl } from "./models/template.js";
import type { TimeEntryDto } from "./models/time-entry.js";

// ── Unified Types ────────────────────────────────────────────────────

/**
 * Unified project — superset of ProjectDtoV1 (GET) and ProjectDtoImplV1 (POST/PUT/DELETE).
 *
 * Fields only present on mutation responses: `clientId`, `clientName`, `isPublic`, `isTemplate`, `estimateReset`.
 * Fields only present on GET responses: none (GET is a subset of mutation responses).
 */
export interface Project {
  id?: string;
  name?: string;
  archived?: boolean;
  billable?: boolean;
  budgetEstimate?: EstimateWithOptions | null;
  clientId?: string;
  clientName?: string;
  color?: string;
  costRate?: RateDtoV1 | null;
  duration?: string | null;
  estimate?: Estimate | null;
  estimateReset?: EstimateReset | null;
  hourlyRate?: RateDtoV1 | null;
  isPublic?: boolean;
  isTemplate?: boolean;
  memberships?: Membership[];
  note?: string;
  public?: boolean;
  template?: boolean;
  timeEstimate?: TimeEstimate | null;
  workspaceId?: string;
}

/**
 * Unified time entry — superset of TimeEntryDtoImplV1 (write), TimeEntryDtoV1 (bulk), and TimeEntryWithRates (GET).
 *
 * Fields only present on GET responses: `costRate`, `hourlyRate`.
 */
export interface TimeEntry {
  id?: string;
  billable?: boolean;
  costRate?: RateDtoV1 | null;
  customFieldValues?: CustomFieldValueDtoV1[];
  description?: string;
  hourlyRate?: RateDtoV1 | null;
  isLocked?: boolean;
  kioskId?: string | null;
  projectId?: string | null;
  tagIds?: string[] | null;
  taskId?: string | null;
  timeInterval?: TimeIntervalDtoV1;
  type?: "REGULAR" | "BREAK" | "HOLIDAY" | "TIME_OFF";
  userId?: string;
  workspaceId?: string;
}

/**
 * Unified client — superset of ClientWithCurrency (GET/create) and Client (update/delete).
 *
 * Field only present on GET/create: `currencyCode`.
 */
export interface ClockifyClient {
  id?: string;
  name?: string;
  address?: string | null;
  archived?: boolean;
  ccEmails?: string[] | null;
  currencyCode?: string;
  currencyId?: string;
  email?: string | null;
  note?: string | null;
  workspaceId?: string;
}

/**
 * Unified holiday — superset of HolidayDtoV1 (GET/create/update) and HolidayDto (delete).
 *
 * `automaticTimeEntryCreation` is `boolean` on V1 responses and `object` on Dto (delete) responses.
 * Fields only on V1: `projectId`, `taskId`. Fields only on Dto: `color`.
 */
export interface Holiday {
  id?: string;
  name?: string;
  automaticTimeEntryCreation?: boolean | AutomaticTimeEntryCreation;
  color?: string;
  datePeriod?: DatePeriod;
  everyoneIncludingNew?: boolean;
  occursAnnually?: boolean;
  projectId?: string;
  taskId?: string;
  userGroupIds?: string[];
  userIds?: string[];
  workspaceId?: string;
}

// ── Clean Aliases ────────────────────────────────────────────────────

/** Tag — clean alias for TagDtoV1. */
export type Tag = TagDtoV1;

/** User — clean alias for UserDtoV1. */
export type User = UserDtoV1;

/** ExpenseCategory — clean alias for ExpenseCategoryDtoV1. */
export type ExpenseCategory = ExpenseCategoryDtoV1;

/** TemplateResult — clean alias for TemplateDtoImpl (returned by create/update/delete). */
export type TemplateResult = TemplateDtoImpl;

/** ReportTimeEntry — clean alias for TimeEntryDto (report-specific shape, structurally different from TimeEntry). */
export type ReportTimeEntry = TimeEntryDto;

// ── Zod Schemas ──────────────────────────────────────────────────────

export const projectSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  archived: z.boolean().optional(),
  billable: z.boolean().optional(),
  budgetEstimate: z.unknown().nullable().optional(),
  clientId: z.string().optional(),
  clientName: z.string().optional(),
  color: z.string().optional(),
  costRate: z.unknown().nullable().optional(),
  duration: z.string().nullable().optional(),
  estimate: z.unknown().nullable().optional(),
  estimateReset: z.unknown().nullable().optional(),
  hourlyRate: z.unknown().nullable().optional(),
  isPublic: z.boolean().optional(),
  isTemplate: z.boolean().optional(),
  memberships: z.array(z.unknown()).optional(),
  note: z.string().optional(),
  public: z.boolean().optional(),
  template: z.boolean().optional(),
  timeEstimate: z.unknown().nullable().optional(),
  workspaceId: z.string().optional(),
}).passthrough();

export const timeEntrySchema = z.object({
  id: z.string().optional(),
  billable: z.boolean().optional(),
  costRate: z.unknown().nullable().optional(),
  customFieldValues: z.array(z.unknown()).nullable().optional(),
  description: z.string().optional(),
  hourlyRate: z.unknown().nullable().optional(),
  isLocked: z.boolean().optional(),
  kioskId: z.string().nullable().optional(),
  projectId: z.string().nullable().optional(),
  tagIds: z.array(z.string()).nullable().optional(),
  taskId: z.string().nullable().optional(),
  timeInterval: z.unknown().optional(),
  type: z.string().optional(),
  userId: z.string().optional(),
  workspaceId: z.string().optional(),
}).passthrough();

export const clockifyClientSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  address: z.string().nullable().optional(),
  archived: z.boolean().optional(),
  ccEmails: z.array(z.string()).nullable().optional(),
  currencyCode: z.string().optional(),
  currencyId: z.string().optional(),
  email: z.string().nullable().optional(),
  note: z.string().nullable().optional(),
  workspaceId: z.string().optional(),
}).passthrough();

export const holidaySchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  automaticTimeEntryCreation: z.union([z.boolean(), z.unknown()]).optional(),
  color: z.string().optional(),
  datePeriod: z.unknown().optional(),
  everyoneIncludingNew: z.boolean().optional(),
  occursAnnually: z.boolean().optional(),
  projectId: z.string().optional(),
  taskId: z.string().optional(),
  userGroupIds: z.array(z.string()).optional(),
  userIds: z.array(z.string()).optional(),
  workspaceId: z.string().optional(),
}).passthrough();
