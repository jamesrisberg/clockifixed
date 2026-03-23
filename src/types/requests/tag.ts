// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface TagRequest {
  name?: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const tagRequestSchema = z.object({
  name: z.string().optional(),
});
