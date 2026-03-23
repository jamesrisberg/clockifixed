// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { DailyTotal, dailyTotalSchema } from "./common.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface GroupOne {
  amount?: number;
  children?: GroupOne[];
  clientName?: string;
  days?: DailyTotal[];
  duration?: number;
  id?: string;
  name?: string;
  nameLowerCase?: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const groupOneSchema: z.ZodType<GroupOne> = z.lazy(() =>
  z.object({
  amount: z.number().optional(),
  children: z.array(groupOneSchema).optional(),
  clientName: z.string().optional(),
  days: z.array(z.lazy(() => dailyTotalSchema)).optional(),
  duration: z.number().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  nameLowerCase: z.string().optional(),
})
);
