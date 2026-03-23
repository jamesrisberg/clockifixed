// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface ExpenseCategoryArchiveV1Request {
  archived?: boolean;
}
export interface ExpenseCategoryV1Request {
  hasUnitPrice?: boolean;
  name: string;
  priceInCents?: number;
  unit?: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const expenseCategoryArchiveV1RequestSchema = z.object({
  archived: z.boolean().optional(),
});
export const expenseCategoryV1RequestSchema = z.object({
  hasUnitPrice: z.boolean().optional(),
  name: z.string(),
  priceInCents: z.number().int().optional(),
  unit: z.string().optional(),
});
