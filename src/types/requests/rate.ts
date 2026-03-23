// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface RateWithCurrencyRequest {
  amount: number;
  currency: string;
  since?: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const rateWithCurrencyRequestSchema = z.object({
  amount: z.number().int(),
  currency: z.string(),
  since: z.string().optional(),
});
