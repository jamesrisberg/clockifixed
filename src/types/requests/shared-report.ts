// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { ReportFilter, reportFilterSchema } from "../filters/report.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface SharedReportRequest {
  filter?: ReportFilter;
  fixedDate?: boolean;
  isPublic?: boolean;
  name?: string;
  type?: "DETAILED" | "WEEKLY" | "SUMMARY" | "SCHEDULED" | "EXPENSE_DETAILED" | "EXPENSE_RECEIPT" | "PTO_REQUESTS" | "PTO_BALANCE" | "ATTENDANCE" | "INVOICE_EXPENSE" | "INVOICE_TIME" | "PROJECT" | "TEAM_FULL" | "TEAM_LIMITED" | "TEAM_GROUPS" | "INVOICES" | "KIOSK_PIN_LIST" | "KIOSK_ASSIGNEES";
  visibleToUserGroups?: string[];
  visibleToUsers?: string[];
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const sharedReportRequestSchema = z.object({
  filter: z.lazy(() => reportFilterSchema).optional(),
  fixedDate: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  name: z.string().optional(),
  type: z.enum(["DETAILED", "WEEKLY", "SUMMARY", "SCHEDULED", "EXPENSE_DETAILED", "EXPENSE_RECEIPT", "PTO_REQUESTS", "PTO_BALANCE", "ATTENDANCE", "INVOICE_EXPENSE", "INVOICE_TIME", "PROJECT", "TEAM_FULL", "TEAM_LIMITED", "TEAM_GROUPS", "INVOICES", "KIOSK_PIN_LIST", "KIOSK_ASSIGNEES"]).optional(),
  visibleToUserGroups: z.array(z.string()).optional(),
  visibleToUsers: z.array(z.string()).optional(),
});
