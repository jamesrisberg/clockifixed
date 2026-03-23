// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { HourlyRate, hourlyRateSchema } from "./common.js";
import { RateDtoV1, rateDtoV1Schema } from "./rate.js";
import { UserCustomFieldValueFull, userCustomFieldValueFullSchema } from "./user.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface MemberProfile {
  email?: string;
  hasPassword?: boolean;
  hasPendingApprovalRequest?: boolean;
  imageUrl?: string;
  name?: string;
  userCustomFieldValues?: UserCustomFieldValueFull[];
  weekStart?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  workCapacity?: string;
  workingDays?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  workspaceNumber?: number;
}
export interface Membership {
  costRate?: RateDtoV1;
  hourlyRate?: HourlyRate;
  membershipStatus?: "PENDING" | "ACTIVE" | "DECLINED" | "INACTIVE" | "ALL";
  membershipType?: "WORKSPACE" | "PROJECT" | "USERGROUP";
  targetId?: string;
  userId?: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const memberProfileSchema = z.object({
  email: z.string().optional(),
  hasPassword: z.boolean().optional(),
  hasPendingApprovalRequest: z.boolean().optional(),
  imageUrl: z.string().optional(),
  name: z.string().optional(),
  userCustomFieldValues: z.array(z.lazy(() => userCustomFieldValueFullSchema)).optional(),
  weekStart: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]).optional(),
  workCapacity: z.string().optional(),
  workingDays: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]).optional(),
  workspaceNumber: z.number().int().optional(),
});
export const membershipSchema = z.object({
  costRate: z.lazy(() => rateDtoV1Schema).optional(),
  hourlyRate: z.lazy(() => hourlyRateSchema).optional(),
  membershipStatus: z.enum(["PENDING", "ACTIVE", "DECLINED", "INACTIVE", "ALL"]).optional(),
  membershipType: z.enum(["WORKSPACE", "PROJECT", "USERGROUP"]).optional(),
  targetId: z.string().optional(),
  userId: z.string().optional(),
});
