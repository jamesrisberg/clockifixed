// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface WebhookLogSearchRequest {
  from?: string;
  sortByNewest?: boolean;
  status?: "ALL" | "SUCCEEDED" | "FAILED";
  to?: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const webhookLogSearchRequestSchema = z.object({
  from: z.string().datetime({ offset: true }).optional(),
  sortByNewest: z.boolean().optional(),
  status: z.enum(["ALL", "SUCCEEDED", "FAILED"]).optional(),
  to: z.string().datetime({ offset: true }).optional(),
});
