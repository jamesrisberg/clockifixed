// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface ReportTag {
  id?: string;
  name?: string;
}
export interface ReportTimeInterval {
  duration?: number;
  end?: string;
  start?: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const reportTagSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});
export const reportTimeIntervalSchema = z.object({
  duration: z.number().int().optional(),
  end: z.string().optional(),
  start: z.string().optional(),
});
