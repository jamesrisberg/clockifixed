// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { ContainsArchivedFilter, ContainsTaskFilter, ContainsUsersFilter, containsArchivedFilterSchema, containsTaskFilterSchema, containsUsersFilterSchema } from "./common.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface ExpenseReportFilter {
  approvalState?: "APPROVED" | "UNAPPROVED" | "ALL";
  billable?: boolean;
  categories?: ContainsArchivedFilter;
  clients?: ContainsArchivedFilter;
  currency?: ContainsArchivedFilter;
  dateRangeEnd: string;
  dateRangeStart: string;
  dateRangeType?: "ABSOLUTE" | "TODAY" | "YESTERDAY" | "THIS_WEEK" | "LAST_WEEK" | "PAST_TWO_WEEKS" | "THIS_MONTH" | "LAST_MONTH" | "THIS_YEAR" | "LAST_YEAR";
  exportType?: "JSON" | "JSON_V1" | "PDF" | "CSV" | "XLSX" | "ZIP";
  invoicingState?: "INVOICED" | "UNINVOICED" | "ALL";
  note?: string;
  page?: number;
  pageSize?: number;
  projects?: ContainsArchivedFilter;
  sortColumn?: "ID" | "PROJECT" | "USER" | "CATEGORY" | "DATE" | "AMOUNT";
  sortOrder?: "ASCENDING" | "DESCENDING";
  tasks?: ContainsTaskFilter;
  timeZone?: string;
  userGroups?: ContainsUsersFilter;
  userLocale?: string;
  users?: ContainsUsersFilter;
  weekStart?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  withoutNote?: boolean;
  zoomLevel?: "WEEK" | "MONTH" | "YEAR";
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const expenseReportFilterSchema = z.object({
  approvalState: z.enum(["APPROVED", "UNAPPROVED", "ALL"]).optional(),
  billable: z.boolean().optional(),
  categories: z.lazy(() => containsArchivedFilterSchema).optional(),
  clients: z.lazy(() => containsArchivedFilterSchema).optional(),
  currency: z.lazy(() => containsArchivedFilterSchema).optional(),
  dateRangeEnd: z.string(),
  dateRangeStart: z.string(),
  dateRangeType: z.enum(["ABSOLUTE", "TODAY", "YESTERDAY", "THIS_WEEK", "LAST_WEEK", "PAST_TWO_WEEKS", "THIS_MONTH", "LAST_MONTH", "THIS_YEAR", "LAST_YEAR"]).optional(),
  exportType: z.enum(["JSON", "JSON_V1", "PDF", "CSV", "XLSX", "ZIP"]).optional(),
  invoicingState: z.enum(["INVOICED", "UNINVOICED", "ALL"]).optional(),
  note: z.string().optional(),
  page: z.number().int().optional(),
  pageSize: z.number().int().optional(),
  projects: z.lazy(() => containsArchivedFilterSchema).optional(),
  sortColumn: z.enum(["ID", "PROJECT", "USER", "CATEGORY", "DATE", "AMOUNT"]).optional(),
  sortOrder: z.enum(["ASCENDING", "DESCENDING"]).optional(),
  tasks: z.lazy(() => containsTaskFilterSchema).optional(),
  timeZone: z.string().optional(),
  userGroups: z.lazy(() => containsUsersFilterSchema).optional(),
  userLocale: z.string().optional(),
  users: z.lazy(() => containsUsersFilterSchema).optional(),
  weekStart: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]).optional(),
  withoutNote: z.boolean().optional(),
  zoomLevel: z.enum(["WEEK", "MONTH", "YEAR"]).optional(),
});
