// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { Period, periodSchema } from "../models/common.js";
import { PeriodV1Request, periodV1RequestSchema } from "./common.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface TimeOffRequestStatus {
  changedAt?: string;
  changedByUserId?: string;
  changedByUserName?: string;
  changedForUserName?: string;
  note?: string;
  statusType?: "PENDING" | "APPROVED" | "REJECTED" | "ALL";
}
export interface TimeOffRequestPeriod {
  halfDay?: boolean;
  halfDayHours?: Period;
  halfDayPeriod?: string;
  period?: Period;
}
export interface TimeOffRequestFull {
  balance?: number;
  balanceDiff?: number;
  createdAt?: string;
  id?: string;
  note?: string;
  policyId?: string;
  policyName?: string;
  requesterUserId?: string;
  requesterUserName?: string;
  status?: TimeOffRequestStatus;
  timeOffPeriod?: TimeOffRequestPeriod;
  timeUnit?: "DAYS" | "HOURS";
  userEmail?: string;
  userId?: string;
  userName?: string;
  userTimeZone?: string;
  workspaceId?: string;
}
export interface TimeOffRequestPeriodV1Request {
  halfDayPeriod?: "FIRST_HALF" | "SECOND_HALF" | "NOT_DEFINED";
  isHalfDay?: boolean;
  period: PeriodV1Request;
  timeOffHalfDayPeriod?: "FIRST_HALF" | "SECOND_HALF" | "NOT_DEFINED";
}
export interface TimeOffRequest {
  balanceDiff?: number;
  createdAt?: string;
  id?: string;
  note?: string;
  policyId?: string;
  status?: TimeOffRequestStatus;
  timeOffPeriod?: TimeOffRequestPeriod;
  userId?: string;
  workspaceId?: string;
}
export interface TimeOffRequestsWithCount {
  count?: number;
  requests?: TimeOffRequestFull[];
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const timeOffRequestStatusSchema = z.object({
  changedAt: z.string().datetime({ offset: true }).optional(),
  changedByUserId: z.string().optional(),
  changedByUserName: z.string().optional(),
  changedForUserName: z.string().optional(),
  note: z.string().optional(),
  statusType: z.enum(["PENDING", "APPROVED", "REJECTED", "ALL"]).optional(),
});
export const timeOffRequestPeriodSchema = z.object({
  halfDay: z.boolean().optional(),
  halfDayHours: z.lazy(() => periodSchema).optional(),
  halfDayPeriod: z.string().optional(),
  period: z.lazy(() => periodSchema).optional(),
});
export const timeOffRequestFullSchema = z.object({
  balance: z.number().optional(),
  balanceDiff: z.number().optional(),
  createdAt: z.string().datetime({ offset: true }).optional(),
  id: z.string().optional(),
  note: z.string().optional(),
  policyId: z.string().optional(),
  policyName: z.string().optional(),
  requesterUserId: z.string().optional(),
  requesterUserName: z.string().optional(),
  status: timeOffRequestStatusSchema.optional(),
  timeOffPeriod: timeOffRequestPeriodSchema.optional(),
  timeUnit: z.enum(["DAYS", "HOURS"]).optional(),
  userEmail: z.string().optional(),
  userId: z.string().optional(),
  userName: z.string().optional(),
  userTimeZone: z.string().optional(),
  workspaceId: z.string().optional(),
});
export const timeOffRequestPeriodV1RequestSchema = z.object({
  halfDayPeriod: z.enum(["FIRST_HALF", "SECOND_HALF", "NOT_DEFINED"]).optional(),
  isHalfDay: z.boolean().optional(),
  period: z.lazy(() => periodV1RequestSchema),
  timeOffHalfDayPeriod: z.enum(["FIRST_HALF", "SECOND_HALF", "NOT_DEFINED"]).optional(),
});
export const timeOffRequestSchema = z.object({
  balanceDiff: z.number().optional(),
  createdAt: z.string().datetime({ offset: true }).optional(),
  id: z.string().optional(),
  note: z.string().optional(),
  policyId: z.string().optional(),
  status: timeOffRequestStatusSchema.optional(),
  timeOffPeriod: timeOffRequestPeriodSchema.optional(),
  userId: z.string().optional(),
  workspaceId: z.string().optional(),
});
export const timeOffRequestsWithCountSchema = z.object({
  count: z.number().int().optional(),
  requests: z.array(timeOffRequestFullSchema).optional(),
});
