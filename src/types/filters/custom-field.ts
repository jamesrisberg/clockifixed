// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface CustomFieldFilter {
  id?: string;
  isEmpty?: boolean;
  numberCondition?: "EQUAL" | "GREATER_THAN" | "LESS_THAN";
  type?: "TXT" | "NUMBER" | "DROPDOWN_SINGLE" | "DROPDOWN_MULTIPLE" | "CHECKBOX" | "LINK";
  value?: Record<string, unknown>;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const customFieldFilterSchema = z.object({
  id: z.string().optional(),
  isEmpty: z.boolean().optional(),
  numberCondition: z.enum(["EQUAL", "GREATER_THAN", "LESS_THAN"]).optional(),
  type: z.enum(["TXT", "NUMBER", "DROPDOWN_SINGLE", "DROPDOWN_MULTIPLE", "CHECKBOX", "LINK"]).optional(),
  value: z.record(z.string(), z.unknown()).optional(),
});
