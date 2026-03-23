// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { ApprovalRequest, approvalRequestSchema } from "../requests/approval.js";
import { ExpenseHydratedDto, expenseHydratedDtoSchema } from "./expense.js";
import { TimeEntryInfo, timeEntryInfoSchema } from "./time-entry.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface ApprovalDetails {
  approvalRequest?: ApprovalRequest;
  approvedTime?: string;
  billableAmount?: number;
  billableTime?: string;
  breakTime?: string;
  costAmount?: number;
  entries?: TimeEntryInfo[];
  expenseTotal?: number;
  expenses?: ExpenseHydratedDto[];
  pendingTime?: string;
  trackedTime?: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const approvalDetailsSchema = z.object({
  approvalRequest: z.lazy(() => approvalRequestSchema).optional(),
  approvedTime: z.string().optional(),
  billableAmount: z.number().optional(),
  billableTime: z.string().optional(),
  breakTime: z.string().optional(),
  costAmount: z.number().optional(),
  entries: z.array(z.lazy(() => timeEntryInfoSchema)).optional(),
  expenseTotal: z.number().optional(),
  expenses: z.array(z.lazy(() => expenseHydratedDtoSchema)).optional(),
  pendingTime: z.string().optional(),
  trackedTime: z.string().optional(),
});
