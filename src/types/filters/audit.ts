// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface AuditFilter {
  duration?: number;
  durationShorter?: boolean;
  withoutProject?: boolean;
  withoutTask?: boolean;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const auditFilterSchema = z.object({
  duration: z.number().int().optional(),
  durationShorter: z.boolean().optional(),
  withoutProject: z.boolean().optional(),
  withoutTask: z.boolean().optional(),
});
