// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { AutomaticAccrual, AutomaticTimeEntryCreation, NegativeBalance, automaticAccrualSchema, automaticTimeEntryCreationSchema, negativeBalanceSchema } from "./common.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface PolicyApproval {
  requiresApproval?: boolean;
  specificMembers?: boolean;
  teamManagers?: boolean;
  userIds?: string[];
}
export interface Policy {
  allowHalfDay?: boolean;
  allowNegativeBalance?: boolean;
  approve?: PolicyApproval;
  archived?: boolean;
  automaticAccrual?: AutomaticAccrual;
  automaticTimeEntryCreation?: AutomaticTimeEntryCreation;
  everyoneIncludingNew?: boolean;
  id?: string;
  name?: string;
  negativeBalance?: NegativeBalance;
  projectId?: string;
  timeUnit?: "DAYS" | "HOURS";
  userGroupIds?: string[];
  userIds?: string[];
  workspaceId?: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const policyApprovalSchema = z.object({
  requiresApproval: z.boolean().optional(),
  specificMembers: z.boolean().optional(),
  teamManagers: z.boolean().optional(),
  userIds: z.array(z.string()).optional(),
});
export const policySchema = z.object({
  allowHalfDay: z.boolean().optional(),
  allowNegativeBalance: z.boolean().optional(),
  approve: policyApprovalSchema.optional(),
  archived: z.boolean().optional(),
  automaticAccrual: z.lazy(() => automaticAccrualSchema).optional(),
  automaticTimeEntryCreation: z.lazy(() => automaticTimeEntryCreationSchema).optional(),
  everyoneIncludingNew: z.boolean().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  negativeBalance: z.lazy(() => negativeBalanceSchema).optional(),
  projectId: z.string().optional(),
  timeUnit: z.enum(["DAYS", "HOURS"]).optional(),
  userGroupIds: z.array(z.string()).optional(),
  userIds: z.array(z.string()).optional(),
  workspaceId: z.string().optional(),
});
