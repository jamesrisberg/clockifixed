// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface RateDto {
  amount?: number;
  currency?: string;
}
export interface RateDtoV1 {
  amount?: number;
  currency?: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const rateDtoSchema = z.object({
  amount: z.number().int().optional(),
  currency: z.string().optional(),
});
export const rateDtoV1Schema = z.object({
  amount: z.number().int().optional(),
  currency: z.string().optional(),
});
