// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { RateDtoV1, rateDtoV1Schema } from "./rate.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface TaskStatus {
  _value: "ACTIVE" | "DONE" | "ALL";
}
export interface Task {
  assigneeId?: string;
  assigneeIds?: string[];
  billable?: boolean;
  budgetEstimate?: number;
  costRate?: RateDtoV1;
  duration?: string;
  estimate?: string;
  hourlyRate?: RateDtoV1;
  id?: string;
  name?: string;
  projectId?: string;
  status?: TaskStatus;
  userGroupIds?: string[];
}
export interface TaskInfo {
  id?: string;
  name?: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const taskStatusSchema = z.enum(["ACTIVE", "DONE", "ALL"]);
export const taskSchema = z.object({
  assigneeId: z.string().optional(),
  assigneeIds: z.array(z.string()).optional(),
  billable: z.boolean().optional(),
  budgetEstimate: z.number().int().optional(),
  costRate: z.lazy(() => rateDtoV1Schema).optional(),
  duration: z.string().optional(),
  estimate: z.string().optional(),
  hourlyRate: z.lazy(() => rateDtoV1Schema).optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  projectId: z.string().optional(),
  status: taskStatusSchema.optional(),
  userGroupIds: z.array(z.string()).optional(),
});
export const taskInfoSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});
