// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface EstimateRequest {
  estimate?: string;
  type?: "AUTO" | "MANUAL";
}
export interface EstimateResetRequest {
  active?: boolean;
  dayOfMonth?: number;
  dayOfWeek?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  hour?: number;
  interval?: "WEEKLY" | "MONTHLY" | "YEARLY";
  isActive?: boolean;
  month?: "JANUARY" | "FEBRUARY" | "MARCH" | "APRIL" | "MAY" | "JUNE" | "JULY" | "AUGUST" | "SEPTEMBER" | "OCTOBER" | "NOVEMBER" | "DECEMBER";
}
export interface EstimateWithOptionsRequest {
  active?: boolean;
  estimate?: number;
  includeExpenses?: boolean;
  resetOption?: "WEEKLY" | "MONTHLY" | "YEARLY";
  type?: "AUTO" | "MANUAL";
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const estimateRequestSchema = z.object({
  estimate: z.string().optional(),
  type: z.enum(["AUTO", "MANUAL"]).optional(),
});
export const estimateResetRequestSchema = z.object({
  active: z.boolean().optional(),
  dayOfMonth: z.number().int().optional(),
  dayOfWeek: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]).optional(),
  hour: z.number().int().optional(),
  interval: z.enum(["WEEKLY", "MONTHLY", "YEARLY"]).optional(),
  isActive: z.boolean().optional(),
  month: z.enum(["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]).optional(),
});
export const estimateWithOptionsRequestSchema = z.object({
  active: z.boolean().optional(),
  estimate: z.number().int().optional(),
  includeExpenses: z.boolean().optional(),
  resetOption: z.enum(["WEEKLY", "MONTHLY", "YEARLY"]).optional(),
  type: z.enum(["AUTO", "MANUAL"]).optional(),
});
