// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { RecurringAssignmentRequest, recurringAssignmentRequestSchema } from "./common.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface AssignmentCreateRequest {
  billable?: boolean;
  end: string;
  hoursPerDay: number;
  includeNonWorkingDays?: boolean;
  note?: string;
  projectId: string;
  recurringAssignment?: RecurringAssignmentRequest;
  start: string;
  startTime?: string;
  taskId?: string;
  userId: string;
}
export interface AssignmentUpdateRequest {
  billable?: boolean;
  end: string;
  hoursPerDay?: number;
  includeNonWorkingDays?: boolean;
  note?: string;
  seriesUpdateOption?: "THIS_ONE" | "THIS_AND_FOLLOWING" | "ALL";
  start: string;
  startTime?: string;
  taskId?: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const assignmentCreateRequestSchema = z.object({
  billable: z.boolean().optional(),
  end: z.string(),
  hoursPerDay: z.number(),
  includeNonWorkingDays: z.boolean().optional(),
  note: z.string().optional(),
  projectId: z.string(),
  recurringAssignment: z.lazy(() => recurringAssignmentRequestSchema).optional(),
  start: z.string(),
  startTime: z.string().optional(),
  taskId: z.string().optional(),
  userId: z.string(),
});
export const assignmentUpdateRequestSchema = z.object({
  billable: z.boolean().optional(),
  end: z.string(),
  hoursPerDay: z.number().optional(),
  includeNonWorkingDays: z.boolean().optional(),
  note: z.string().optional(),
  seriesUpdateOption: z.enum(["THIS_ONE", "THIS_AND_FOLLOWING", "ALL"]).optional(),
  start: z.string(),
  startTime: z.string().optional(),
  taskId: z.string().optional(),
});
