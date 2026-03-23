// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { AttendanceFilter, attendanceFilterSchema } from "./attendance.js";
import { ContainsArchivedFilter, ContainsTagFilter, ContainsTaskFilter, ContainsUsersFilter, DetailedFilter, SummaryFilter, WeeklyFilter, containsArchivedFilterSchema, containsTagFilterSchema, containsTaskFilterSchema, containsUsersFilterSchema, detailedFilterSchema, summaryFilterSchema, weeklyFilterSchema } from "./common.js";
import { CustomFieldFilter, customFieldFilterSchema } from "./custom-field.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface ReportFilter {
  amountShown?: "EARNED" | "COST" | "PROFIT" | "HIDE_AMOUNT" | "EXPORT";
  amounts?: ("EARNED" | "COST" | "PROFIT" | "HIDE_AMOUNT" | "EXPORT")[];
  approvalState?: "APPROVED" | "UNAPPROVED" | "ALL";
  archived?: boolean;
  attendanceFilter?: AttendanceFilter;
  billable?: boolean;
  clients?: ContainsArchivedFilter;
  currency?: ContainsArchivedFilter;
  customFields?: CustomFieldFilter[];
  dateFormat?: string;
  dateRangeEnd: string;
  dateRangeStart: string;
  dateRangeType?: "ABSOLUTE" | "TODAY" | "YESTERDAY" | "THIS_WEEK" | "LAST_WEEK" | "PAST_TWO_WEEKS" | "THIS_MONTH" | "LAST_MONTH" | "THIS_YEAR" | "LAST_YEAR";
  description?: string;
  detailedFilter?: DetailedFilter;
  exportType?: "JSON" | "JSON_V1" | "PDF" | "CSV" | "XLSX" | "ZIP";
  invoicingState?: "INVOICED" | "UNINVOICED" | "ALL";
  projects?: ContainsArchivedFilter;
  rounding?: boolean;
  sortOrder?: "ASCENDING" | "DESCENDING";
  summaryFilter?: SummaryFilter;
  tags?: ContainsTagFilter;
  tasks?: ContainsTaskFilter;
  timeFormat?: string;
  timeZone?: string;
  userCustomFields?: CustomFieldFilter[];
  userGroups?: ContainsUsersFilter;
  userLocale?: string;
  users?: ContainsUsersFilter;
  weekStart?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  weeklyFilter?: WeeklyFilter;
  withoutDescription?: boolean;
  zoomLevel?: "WEEK" | "MONTH" | "YEAR";
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const reportFilterSchema = z.object({
  amountShown: z.enum(["EARNED", "COST", "PROFIT", "HIDE_AMOUNT", "EXPORT"]).optional(),
  amounts: z.array(z.enum(["EARNED", "COST", "PROFIT", "HIDE_AMOUNT", "EXPORT"])).optional(),
  approvalState: z.enum(["APPROVED", "UNAPPROVED", "ALL"]).optional(),
  archived: z.boolean().optional(),
  attendanceFilter: z.lazy(() => attendanceFilterSchema).optional(),
  billable: z.boolean().optional(),
  clients: z.lazy(() => containsArchivedFilterSchema).optional(),
  currency: z.lazy(() => containsArchivedFilterSchema).optional(),
  customFields: z.array(z.lazy(() => customFieldFilterSchema)).optional(),
  dateFormat: z.string().optional(),
  dateRangeEnd: z.string(),
  dateRangeStart: z.string(),
  dateRangeType: z.enum(["ABSOLUTE", "TODAY", "YESTERDAY", "THIS_WEEK", "LAST_WEEK", "PAST_TWO_WEEKS", "THIS_MONTH", "LAST_MONTH", "THIS_YEAR", "LAST_YEAR"]).optional(),
  description: z.string().optional(),
  detailedFilter: z.lazy(() => detailedFilterSchema).optional(),
  exportType: z.enum(["JSON", "JSON_V1", "PDF", "CSV", "XLSX", "ZIP"]).optional(),
  invoicingState: z.enum(["INVOICED", "UNINVOICED", "ALL"]).optional(),
  projects: z.lazy(() => containsArchivedFilterSchema).optional(),
  rounding: z.boolean().optional(),
  sortOrder: z.enum(["ASCENDING", "DESCENDING"]).optional(),
  summaryFilter: z.lazy(() => summaryFilterSchema).optional(),
  tags: z.lazy(() => containsTagFilterSchema).optional(),
  tasks: z.lazy(() => containsTaskFilterSchema).optional(),
  timeFormat: z.string().optional(),
  timeZone: z.string().optional(),
  userCustomFields: z.array(z.lazy(() => customFieldFilterSchema)).optional(),
  userGroups: z.lazy(() => containsUsersFilterSchema).optional(),
  userLocale: z.string().optional(),
  users: z.lazy(() => containsUsersFilterSchema).optional(),
  weekStart: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]).optional(),
  weeklyFilter: z.lazy(() => weeklyFilterSchema).optional(),
  withoutDescription: z.boolean().optional(),
  zoomLevel: z.enum(["WEEK", "MONTH", "YEAR"]).optional(),
});
