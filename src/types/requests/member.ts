// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { HourlyRateRequest, UpsertUserCustomFieldRequest, hourlyRateRequestSchema, upsertUserCustomFieldRequestSchema } from "./common.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface MemberProfileFullRequest {
  imageUrl?: string;
  name?: string;
  removeProfileImage?: boolean;
  userCustomFields?: UpsertUserCustomFieldRequest[];
  weekStart?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  workCapacity?: string;
  workingDays?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
}
export interface MembershipRequest {
  hourlyRate?: HourlyRateRequest;
  membershipStatus?: "PENDING" | "ACTIVE" | "DECLINED" | "INACTIVE" | "ALL";
  membershipType?: "WORKSPACE" | "PROJECT" | "USERGROUP";
  userId?: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const memberProfileFullRequestSchema = z.object({
  imageUrl: z.string().optional(),
  name: z.string().optional(),
  removeProfileImage: z.boolean().optional(),
  userCustomFields: z.array(z.lazy(() => upsertUserCustomFieldRequestSchema)).optional(),
  weekStart: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]).optional(),
  workCapacity: z.string().optional(),
  workingDays: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]).optional(),
});
export const membershipRequestSchema = z.object({
  hourlyRate: z.lazy(() => hourlyRateRequestSchema).optional(),
  membershipStatus: z.enum(["PENDING", "ACTIVE", "DECLINED", "INACTIVE", "ALL"]).optional(),
  membershipType: z.enum(["WORKSPACE", "PROJECT", "USERGROUP"]).optional(),
  userId: z.string().optional(),
});
