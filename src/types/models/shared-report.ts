// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { ReportFilter, reportFilterSchema } from "../filters/report.js";
import { EntityName, entityNameSchema } from "./entity.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface SharedReportDtoV1 {
  fixedDate?: boolean;
  id?: string;
  isPublic?: boolean;
  link?: string;
  name?: string;
  reportAuthor?: string;
  type?: "DETAILED" | "WEEKLY" | "SUMMARY" | "SCHEDULED" | "EXPENSE_DETAILED" | "EXPENSE_RECEIPT" | "PTO_REQUESTS" | "PTO_BALANCE" | "ATTENDANCE" | "INVOICE_EXPENSE" | "INVOICE_TIME" | "PROJECT" | "TEAM_FULL" | "TEAM_LIMITED" | "TEAM_GROUPS" | "INVOICES" | "KIOSK_PIN_LIST" | "KIOSK_ASSIGNEES";
  visibleToUserGroups?: EntityName[];
  visibleToUsers?: EntityName[];
}
export interface SharedReportV1 {
  filter?: ReportFilter;
  fixedDate?: boolean;
  id?: string;
  isPublic?: boolean;
  name?: string;
  type?: "DETAILED" | "WEEKLY" | "SUMMARY" | "SCHEDULED" | "EXPENSE_DETAILED" | "EXPENSE_RECEIPT" | "PTO_REQUESTS" | "PTO_BALANCE" | "ATTENDANCE" | "INVOICE_EXPENSE" | "INVOICE_TIME" | "PROJECT" | "TEAM_FULL" | "TEAM_LIMITED" | "TEAM_GROUPS" | "INVOICES" | "KIOSK_PIN_LIST" | "KIOSK_ASSIGNEES";
  userId?: string;
  visibleToUserGroups?: string[];
  visibleToUsers?: string[];
  workspaceId?: string;
}
export interface SharedReportsAndCount {
  count?: number;
  reports?: SharedReportDtoV1[];
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const sharedReportDtoV1Schema = z.object({
  fixedDate: z.boolean().optional(),
  id: z.string().optional(),
  isPublic: z.boolean().optional(),
  link: z.string().optional(),
  name: z.string().optional(),
  reportAuthor: z.string().optional(),
  type: z.enum(["DETAILED", "WEEKLY", "SUMMARY", "SCHEDULED", "EXPENSE_DETAILED", "EXPENSE_RECEIPT", "PTO_REQUESTS", "PTO_BALANCE", "ATTENDANCE", "INVOICE_EXPENSE", "INVOICE_TIME", "PROJECT", "TEAM_FULL", "TEAM_LIMITED", "TEAM_GROUPS", "INVOICES", "KIOSK_PIN_LIST", "KIOSK_ASSIGNEES"]).optional(),
  visibleToUserGroups: z.array(z.lazy(() => entityNameSchema)).optional(),
  visibleToUsers: z.array(z.lazy(() => entityNameSchema)).optional(),
});
export const sharedReportV1Schema = z.object({
  filter: z.lazy(() => reportFilterSchema).optional(),
  fixedDate: z.boolean().optional(),
  id: z.string().optional(),
  isPublic: z.boolean().optional(),
  name: z.string().optional(),
  type: z.enum(["DETAILED", "WEEKLY", "SUMMARY", "SCHEDULED", "EXPENSE_DETAILED", "EXPENSE_RECEIPT", "PTO_REQUESTS", "PTO_BALANCE", "ATTENDANCE", "INVOICE_EXPENSE", "INVOICE_TIME", "PROJECT", "TEAM_FULL", "TEAM_LIMITED", "TEAM_GROUPS", "INVOICES", "KIOSK_PIN_LIST", "KIOSK_ASSIGNEES"]).optional(),
  userId: z.string().optional(),
  visibleToUserGroups: z.array(z.string()).optional(),
  visibleToUsers: z.array(z.string()).optional(),
  workspaceId: z.string().optional(),
});
export const sharedReportsAndCountSchema = z.object({
  count: z.number().int().optional(),
  reports: z.array(sharedReportDtoV1Schema).optional(),
});
