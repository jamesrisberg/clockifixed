// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface TimeIntervalDto {
  duration?: string;
  end?: string;
  offsetEnd?: number;
  offsetStart?: number;
  start?: string;
  timeZone?: string;
  zonedEnd?: string;
  zonedStart?: string;
}
export interface TimeIntervalDtoV1 {
  duration?: string;
  end?: string;
  start?: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const timeIntervalDtoSchema = z.object({
  duration: z.string().optional(),
  end: z.string().datetime({ offset: true }).optional(),
  offsetEnd: z.number().int().optional(),
  offsetStart: z.number().int().optional(),
  start: z.string().datetime({ offset: true }).optional(),
  timeZone: z.string().optional(),
  zonedEnd: z.string().datetime({ offset: true }).optional(),
  zonedStart: z.string().datetime({ offset: true }).optional(),
});
export const timeIntervalDtoV1Schema = z.object({
  duration: z.string().optional(),
  end: z.string().datetime({ offset: true }).optional(),
  start: z.string().datetime({ offset: true }).optional(),
});
