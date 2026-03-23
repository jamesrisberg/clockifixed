// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { CostRateRequestV1, HourlyRateRequestV1, costRateRequestV1Schema, hourlyRateRequestV1Schema } from "./common.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface UserGroupRequest {
  name?: string;
}
export interface UserGroupUserRequest {
  userId: string;
}
export interface UserIdWithRatesRequest {
  costRate?: CostRateRequestV1;
  hourlyRate?: HourlyRateRequestV1;
  userId: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const userGroupRequestSchema = z.object({
  name: z.string().optional(),
});
export const userGroupUserRequestSchema = z.object({
  userId: z.string(),
});
export const userIdWithRatesRequestSchema = z.object({
  costRate: z.lazy(() => costRateRequestV1Schema).optional(),
  hourlyRate: z.lazy(() => hourlyRateRequestV1Schema).optional(),
  userId: z.string(),
});
