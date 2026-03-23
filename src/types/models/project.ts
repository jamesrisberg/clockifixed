// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { TimeEstimate, timeEstimateSchema } from "./common.js";
import { Estimate, EstimateReset, EstimateWithOptions, estimateResetSchema, estimateSchema, estimateWithOptionsSchema } from "./estimate.js";
import { Membership, membershipSchema } from "./member.js";
import { RateDtoV1, rateDtoV1Schema } from "./rate.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface ProjectDtoImplV1 {
  archived?: boolean;
  billable?: boolean;
  budgetEstimate?: EstimateWithOptions;
  clientId?: string;
  clientName?: string;
  color?: string;
  costRate?: RateDtoV1;
  duration?: string;
  estimate?: Estimate;
  estimateReset?: EstimateReset;
  hourlyRate?: RateDtoV1;
  id?: string;
  isPublic?: boolean;
  isTemplate?: boolean;
  memberships?: Membership[];
  name?: string;
  note?: string;
  public?: boolean;
  template?: boolean;
  timeEstimate?: TimeEstimate;
  workspaceId?: string;
}
export interface ProjectDtoV1 {
  archived?: boolean;
  billable?: boolean;
  budgetEstimate?: EstimateWithOptions;
  color?: string;
  costRate?: RateDtoV1;
  duration?: string;
  estimate?: Estimate;
  hourlyRate?: RateDtoV1;
  id?: string;
  memberships?: Membership[];
  name?: string;
  note?: string;
  public?: boolean;
  template?: boolean;
  timeEstimate?: TimeEstimate;
  workspaceId?: string;
}
export interface ProjectInfo {
  clientId?: string;
  clientName?: string;
  color?: string;
  id?: string;
  name?: string;
}
export interface ProjectTaskTuple {
  projectId?: string;
  taskId?: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const projectDtoImplV1Schema = z.object({
  archived: z.boolean().optional(),
  billable: z.boolean().optional(),
  budgetEstimate: z.lazy(() => estimateWithOptionsSchema).optional(),
  clientId: z.string().optional(),
  clientName: z.string().optional(),
  color: z.string().optional(),
  costRate: z.lazy(() => rateDtoV1Schema).optional(),
  duration: z.string().optional(),
  estimate: z.lazy(() => estimateSchema).optional(),
  estimateReset: z.lazy(() => estimateResetSchema).optional(),
  hourlyRate: z.lazy(() => rateDtoV1Schema).optional(),
  id: z.string().optional(),
  isPublic: z.boolean().optional(),
  isTemplate: z.boolean().optional(),
  memberships: z.array(z.lazy(() => membershipSchema)).optional(),
  name: z.string().optional(),
  note: z.string().optional(),
  public: z.boolean().optional(),
  template: z.boolean().optional(),
  timeEstimate: z.lazy(() => timeEstimateSchema).optional(),
  workspaceId: z.string().optional(),
});
export const projectDtoV1Schema = z.object({
  archived: z.boolean().optional(),
  billable: z.boolean().optional(),
  budgetEstimate: z.lazy(() => estimateWithOptionsSchema).optional(),
  color: z.string().optional(),
  costRate: z.lazy(() => rateDtoV1Schema).optional(),
  duration: z.string().optional(),
  estimate: z.lazy(() => estimateSchema).optional(),
  hourlyRate: z.lazy(() => rateDtoV1Schema).optional(),
  id: z.string().optional(),
  memberships: z.array(z.lazy(() => membershipSchema)).optional(),
  name: z.string().optional(),
  note: z.string().optional(),
  public: z.boolean().optional(),
  template: z.boolean().optional(),
  timeEstimate: z.lazy(() => timeEstimateSchema).optional(),
  workspaceId: z.string().optional(),
});
export const projectInfoSchema = z.object({
  clientId: z.string().optional(),
  clientName: z.string().optional(),
  color: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
});
export const projectTaskTupleSchema = z.object({
  projectId: z.string().optional(),
  taskId: z.string().optional(),
});
