// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { CompareBreakFilter, CompareCapacityFilter, CompareEndFilter, CompareOvertimeFilter, CompareStartFilter, CompareWorkFilter, ContainsArchivedFilter, ContainsTagFilter, ContainsTaskFilter, ContainsUsersFilter, DetailedFilter, SummaryFilter, WeeklyFilter, compareBreakFilterSchema, compareCapacityFilterSchema, compareEndFilterSchema, compareOvertimeFilterSchema, compareStartFilterSchema, compareWorkFilterSchema, containsArchivedFilterSchema, containsTagFilterSchema, containsTaskFilterSchema, containsUsersFilterSchema, detailedFilterSchema, summaryFilterSchema, weeklyFilterSchema } from "./common.js";
import { CustomFieldFilter, customFieldFilterSchema } from "./custom-field.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface AttendanceFilter {
  breakFilters?: CompareBreakFilter[];
  capacityFilters?: CompareCapacityFilter[];
  endFilters?: CompareEndFilter[];
  hasTimeOff?: boolean;
  overtimeFilters?: CompareOvertimeFilter[];
  page?: number;
  pageSize?: number;
  sortColumn?: "USER" | "DATE" | "START" | "END" | "BREAK" | "WORK" | "CAPACITY" | "OVERTIME" | "TIME_OFF";
  startFilters?: CompareStartFilter[];
  workFilters?: CompareWorkFilter[];
}
export interface AttendanceReportFilter {
  amountShown?: "EARNED" | "COST" | "PROFIT" | "HIDE_AMOUNT" | "EXPORT";
  amounts?: ("EARNED" | "COST" | "PROFIT" | "HIDE_AMOUNT" | "EXPORT")[];
  approvalState?: "APPROVED" | "UNAPPROVED" | "ALL";
  archived?: boolean;
  attendanceFilter: AttendanceFilter;
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
  userGroups?: ContainsUsersFilter;
  userLocale?: string;
  users?: ContainsUsersFilter;
  weekStart?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  weeklyFilter?: WeeklyFilter;
  withoutDescription?: boolean;
  zoomLevel?: "WEEK" | "MONTH" | "YEAR";
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const attendanceFilterSchema = z.object({
  breakFilters: z.array(z.lazy(() => compareBreakFilterSchema)).optional(),
  capacityFilters: z.array(z.lazy(() => compareCapacityFilterSchema)).optional(),
  endFilters: z.array(z.lazy(() => compareEndFilterSchema)).optional(),
  hasTimeOff: z.boolean().optional(),
  overtimeFilters: z.array(z.lazy(() => compareOvertimeFilterSchema)).optional(),
  page: z.number().int().optional(),
  pageSize: z.number().int().optional(),
  sortColumn: z.enum(["USER", "DATE", "START", "END", "BREAK", "WORK", "CAPACITY", "OVERTIME", "TIME_OFF"]).optional(),
  startFilters: z.array(z.lazy(() => compareStartFilterSchema)).optional(),
  workFilters: z.array(z.lazy(() => compareWorkFilterSchema)).optional(),
});
export const attendanceReportFilterSchema = z.object({
  amountShown: z.enum(["EARNED", "COST", "PROFIT", "HIDE_AMOUNT", "EXPORT"]).optional(),
  amounts: z.array(z.enum(["EARNED", "COST", "PROFIT", "HIDE_AMOUNT", "EXPORT"])).optional(),
  approvalState: z.enum(["APPROVED", "UNAPPROVED", "ALL"]).optional(),
  archived: z.boolean().optional(),
  attendanceFilter: attendanceFilterSchema,
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
  userGroups: z.lazy(() => containsUsersFilterSchema).optional(),
  userLocale: z.string().optional(),
  users: z.lazy(() => containsUsersFilterSchema).optional(),
  weekStart: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]).optional(),
  weeklyFilter: z.lazy(() => weeklyFilterSchema).optional(),
  withoutDescription: z.boolean().optional(),
  zoomLevel: z.enum(["WEEK", "MONTH", "YEAR"]).optional(),
});
