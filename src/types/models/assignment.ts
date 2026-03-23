// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { DateRange, RecurringAssignment, dateRangeSchema, recurringAssignmentSchema } from "./common.js";
import { SchedulingExcludeDay, schedulingExcludeDaySchema } from "./scheduling.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface Assignment {
  billable?: boolean;
  excludeDays?: SchedulingExcludeDay[];
  hoursPerDay?: number;
  id?: string;
  includeNonWorkingDays?: boolean;
  note?: string;
  period?: DateRange;
  projectId?: string;
  published?: boolean;
  recurring?: RecurringAssignment;
  startTime?: string;
  userId?: string;
  workspaceId?: string;
}
export interface AssignmentHydrated {
  billable?: boolean;
  clientId?: string;
  clientName?: string;
  hoursPerDay?: number;
  id?: string;
  note?: string;
  period?: DateRange;
  projectArchived?: boolean;
  projectBillable?: boolean;
  projectColor?: string;
  projectId?: string;
  projectName?: string;
  startTime?: string;
  userId?: string;
  userName?: string;
  workspaceId?: string;
}
export interface AssignmentPerDay {
  date?: string;
  hasAssignment?: boolean;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const assignmentSchema = z.object({
  billable: z.boolean().optional(),
  excludeDays: z.array(z.lazy(() => schedulingExcludeDaySchema)).optional(),
  hoursPerDay: z.number().optional(),
  id: z.string().optional(),
  includeNonWorkingDays: z.boolean().optional(),
  note: z.string().optional(),
  period: z.lazy(() => dateRangeSchema).optional(),
  projectId: z.string().optional(),
  published: z.boolean().optional(),
  recurring: z.lazy(() => recurringAssignmentSchema).optional(),
  startTime: z.string().optional(),
  userId: z.string().optional(),
  workspaceId: z.string().optional(),
});
export const assignmentHydratedSchema = z.object({
  billable: z.boolean().optional(),
  clientId: z.string().optional(),
  clientName: z.string().optional(),
  hoursPerDay: z.number().optional(),
  id: z.string().optional(),
  note: z.string().optional(),
  period: z.lazy(() => dateRangeSchema).optional(),
  projectArchived: z.boolean().optional(),
  projectBillable: z.boolean().optional(),
  projectColor: z.string().optional(),
  projectId: z.string().optional(),
  projectName: z.string().optional(),
  startTime: z.string().optional(),
  userId: z.string().optional(),
  userName: z.string().optional(),
  workspaceId: z.string().optional(),
});
export const assignmentPerDaySchema = z.object({
  date: z.string().datetime({ offset: true }).optional(),
  hasAssignment: z.boolean().optional(),
});
