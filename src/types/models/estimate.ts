// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface Estimate {
  estimate?: string;
  type?: "AUTO" | "MANUAL";
}
export interface EstimateReset {
  dayOfMonth?: number;
  dayOfWeek?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  hour?: number;
  interval?: "WEEKLY" | "MONTHLY" | "YEARLY";
  month?: "JANUARY" | "FEBRUARY" | "MARCH" | "APRIL" | "MAY" | "JUNE" | "JULY" | "AUGUST" | "SEPTEMBER" | "OCTOBER" | "NOVEMBER" | "DECEMBER";
}
export interface EstimateWithOptions {
  active?: boolean;
  estimate?: number;
  includeExpenses?: boolean;
  resetOption?: "WEEKLY" | "MONTHLY" | "YEARLY";
  type?: "AUTO" | "MANUAL";
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const estimateSchema = z.object({
  estimate: z.string().optional(),
  type: z.enum(["AUTO", "MANUAL"]).optional(),
});
export const estimateResetSchema = z.object({
  dayOfMonth: z.number().int().optional(),
  dayOfWeek: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]).optional(),
  hour: z.number().int().optional(),
  interval: z.enum(["WEEKLY", "MONTHLY", "YEARLY"]).optional(),
  month: z.enum(["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]).optional(),
});
export const estimateWithOptionsSchema = z.object({
  active: z.boolean().optional(),
  estimate: z.number().int().optional(),
  includeExpenses: z.boolean().optional(),
  resetOption: z.enum(["WEEKLY", "MONTHLY", "YEARLY"]).optional(),
  type: z.enum(["AUTO", "MANUAL"]).optional(),
});
