// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface Balance {
  balance?: number;
  id?: string;
  negativeBalanceAmount?: number;
  negativeBalanceLimit?: boolean;
  policyArchived?: boolean;
  policyId?: string;
  policyName?: string;
  policyTimeUnit?: "DAYS" | "HOURS";
  total?: number;
  used?: number;
  userId?: string;
  userName?: string;
  workspaceId?: string;
}
export interface BalancesWithCount {
  balances?: Balance[];
  count?: number;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const balanceSchema = z.object({
  balance: z.number().optional(),
  id: z.string().optional(),
  negativeBalanceAmount: z.number().optional(),
  negativeBalanceLimit: z.boolean().optional(),
  policyArchived: z.boolean().optional(),
  policyId: z.string().optional(),
  policyName: z.string().optional(),
  policyTimeUnit: z.enum(["DAYS", "HOURS"]).optional(),
  total: z.number().optional(),
  used: z.number().optional(),
  userId: z.string().optional(),
  userName: z.string().optional(),
  workspaceId: z.string().optional(),
});
export const balancesWithCountSchema = z.object({
  balances: z.array(balanceSchema).optional(),
  count: z.number().int().optional(),
});
