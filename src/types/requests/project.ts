// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { CostRateRequestV1, HourlyRateRequestV1, TimeEstimateRequest, costRateRequestV1Schema, hourlyRateRequestV1Schema, timeEstimateRequestSchema } from "./common.js";
import { EstimateRequest, EstimateResetRequest, EstimateWithOptionsRequest, estimateRequestSchema, estimateResetRequestSchema, estimateWithOptionsRequestSchema } from "./estimate.js";
import { MembershipRequest, membershipRequestSchema } from "./member.js";
import { TaskRequest, taskRequestSchema } from "./task.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface ProjectEstimateRequest {
  budgetEstimate?: EstimateWithOptionsRequest;
  estimateReset?: EstimateResetRequest;
  timeEstimate?: TimeEstimateRequest;
}
export interface ProjectRequest {
  billable?: boolean;
  clientId?: string;
  color?: string;
  costRate?: CostRateRequestV1;
  estimate?: EstimateRequest;
  hourlyRate?: HourlyRateRequestV1;
  isPublic?: boolean;
  memberships?: MembershipRequest[];
  name: string;
  note?: string;
  tasks?: TaskRequest[];
}
export interface ProjectTaskTupleRequest {
  projectId: string;
  taskId?: string;
  type?: string;
}
export interface ProjectTotalsRequest {
  end: string;
  page?: number;
  pageSize?: number;
  search?: string;
  start: string;
  statusFilter?: "PUBLISHED" | "UNPUBLISHED" | "ALL";
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const projectEstimateRequestSchema = z.object({
  budgetEstimate: z.lazy(() => estimateWithOptionsRequestSchema).optional(),
  estimateReset: z.lazy(() => estimateResetRequestSchema).optional(),
  timeEstimate: z.lazy(() => timeEstimateRequestSchema).optional(),
});
export const projectRequestSchema = z.object({
  billable: z.boolean().optional(),
  clientId: z.string().optional(),
  color: z.string().optional(),
  costRate: z.lazy(() => costRateRequestV1Schema).optional(),
  estimate: z.lazy(() => estimateRequestSchema).optional(),
  hourlyRate: z.lazy(() => hourlyRateRequestV1Schema).optional(),
  isPublic: z.boolean().optional(),
  memberships: z.array(z.lazy(() => membershipRequestSchema)).optional(),
  name: z.string(),
  note: z.string().optional(),
  tasks: z.array(z.lazy(() => taskRequestSchema)).optional(),
});
export const projectTaskTupleRequestSchema = z.object({
  projectId: z.string(),
  taskId: z.string().optional(),
  type: z.string().optional(),
});
export const projectTotalsRequestSchema = z.object({
  end: z.string().datetime({ offset: true }),
  page: z.number().int().optional(),
  pageSize: z.number().int().optional(),
  search: z.string().optional(),
  start: z.string().datetime({ offset: true }),
  statusFilter: z.enum(["PUBLISHED", "UNPUBLISHED", "ALL"]).optional(),
});
