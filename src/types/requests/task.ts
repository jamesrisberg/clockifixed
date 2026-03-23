// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { CostRateRequest, HourlyRateRequest, costRateRequestSchema, hourlyRateRequestSchema } from "./common.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface TaskRequest {
  assigneeId?: string;
  assigneeIds?: string[];
  billable?: boolean;
  budgetEstimate?: number;
  costRate?: CostRateRequest;
  estimate?: string;
  hourlyRate?: HourlyRateRequest;
  id?: string;
  name: string;
  projectId?: string;
  status?: string;
  userGroupIds?: string[];
}
export interface TaskRequestV1 {
  assigneeId?: string;
  assigneeIds?: string[];
  budgetEstimate?: number;
  estimate?: string;
  id?: string;
  name: string;
  status?: "ACTIVE" | "DONE" | "ALL";
  userGroupIds?: string[];
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const taskRequestSchema = z.object({
  assigneeId: z.string().optional(),
  assigneeIds: z.array(z.string()).optional(),
  billable: z.boolean().optional(),
  budgetEstimate: z.number().int().optional(),
  costRate: z.lazy(() => costRateRequestSchema).optional(),
  estimate: z.string().optional(),
  hourlyRate: z.lazy(() => hourlyRateRequestSchema).optional(),
  id: z.string().optional(),
  name: z.string(),
  projectId: z.string().optional(),
  status: z.string().optional(),
  userGroupIds: z.array(z.string()).optional(),
});
export const taskRequestV1Schema = z.object({
  assigneeId: z.string().optional(),
  assigneeIds: z.array(z.string()).optional(),
  budgetEstimate: z.number().int().optional(),
  estimate: z.string().optional(),
  id: z.string().optional(),
  name: z.string(),
  status: z.enum(["ACTIVE", "DONE", "ALL"]).optional(),
  userGroupIds: z.array(z.string()).optional(),
});
