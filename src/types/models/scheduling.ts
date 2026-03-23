// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { AssignmentPerDay, assignmentPerDaySchema } from "./assignment.js";
import { Milestone, TotalsPerDay, milestoneSchema, totalsPerDaySchema } from "./common.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface SchedulingExcludeDay {
  date?: string;
  type?: "WEEKEND" | "HOLIDAY" | "TIME_OFF";
}
export interface SchedulingProjectsTotals {
  assignments?: AssignmentPerDay[];
  clientName?: string;
  milestones?: Milestone[];
  projectArchived?: boolean;
  projectBillable?: boolean;
  projectColor?: string;
  projectId?: string;
  projectName?: string;
  totalHours?: number;
  workspaceId?: string;
}
export interface SchedulingUsersTotals {
  capacityPerDay?: number;
  totalHoursPerDay?: TotalsPerDay[];
  userId?: string;
  userImage?: string;
  userName?: string;
  userStatus?: string;
  workingDays?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  workspaceId?: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const schedulingExcludeDaySchema = z.object({
  date: z.string().datetime({ offset: true }).optional(),
  type: z.enum(["WEEKEND", "HOLIDAY", "TIME_OFF"]).optional(),
});
export const schedulingProjectsTotalsSchema = z.object({
  assignments: z.array(z.lazy(() => assignmentPerDaySchema)).optional(),
  clientName: z.string().optional(),
  milestones: z.array(z.lazy(() => milestoneSchema)).optional(),
  projectArchived: z.boolean().optional(),
  projectBillable: z.boolean().optional(),
  projectColor: z.string().optional(),
  projectId: z.string().optional(),
  projectName: z.string().optional(),
  totalHours: z.number().optional(),
  workspaceId: z.string().optional(),
});
export const schedulingUsersTotalsSchema = z.object({
  capacityPerDay: z.number().optional(),
  totalHoursPerDay: z.array(z.lazy(() => totalsPerDaySchema)).optional(),
  userId: z.string().optional(),
  userImage: z.string().optional(),
  userName: z.string().optional(),
  userStatus: z.string().optional(),
  workingDays: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]).optional(),
  workspaceId: z.string().optional(),
});
