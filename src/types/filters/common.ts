// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { DetailedOptions, detailedOptionsSchema } from "../models/common.js";
import { AttendanceFilter, attendanceFilterSchema } from "./attendance.js";
import { AuditFilter, auditFilterSchema } from "./audit.js";
import { CustomFieldFilter, customFieldFilterSchema } from "./custom-field.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface CompareBreakFilter {
  filtrationType?: "EXACTLY" | "LARGER_THAN" | "SMALLER_THAN";
  value?: string;
}
export interface CompareCapacityFilter {
  filtrationType?: "EXACTLY" | "LARGER_THAN" | "SMALLER_THAN";
  value?: string;
}
export interface CompareEndFilter {
  filtrationType?: "EXACTLY" | "LARGER_THAN" | "SMALLER_THAN";
  value?: string;
}
export interface CompareOvertimeFilter {
  filtrationType?: "EXACTLY" | "LARGER_THAN" | "SMALLER_THAN";
  value?: string;
}
export interface CompareStartFilter {
  filtrationType?: "EXACTLY" | "LARGER_THAN" | "SMALLER_THAN";
  value?: string;
}
export interface CompareWorkFilter {
  filtrationType?: "EXACTLY" | "LARGER_THAN" | "SMALLER_THAN";
  value?: string;
}
export interface ContainsArchivedFilter {
  contains?: "CONTAINS" | "DOES_NOT_CONTAIN" | "CONTAINS_ONLY";
  ids?: string[];
  status?: "ACTIVE" | "ARCHIVED" | "ALL";
}
export interface ContainsTagFilter {
  containedInTimeentry?: "CONTAINS" | "DOES_NOT_CONTAIN" | "CONTAINS_ONLY";
  contains?: "CONTAINS" | "DOES_NOT_CONTAIN" | "CONTAINS_ONLY";
  ids?: string[];
  status?: "ACTIVE" | "ARCHIVED" | "ALL";
}
export interface ContainsTaskFilter {
  contains?: "CONTAINS" | "DOES_NOT_CONTAIN" | "CONTAINS_ONLY";
  ids?: string[];
  status?: "ACTIVE" | "ARCHIVED" | "ALL";
}
export interface ContainsUsersFilter {
  contains?: "CONTAINS" | "DOES_NOT_CONTAIN" | "CONTAINS_ONLY";
  ids?: string[];
  status?: "ALL" | "ACTIVE_WITH_PENDING" | "ACTIVE" | "PENDING" | "INACTIVE";
}
export interface DetailedFilter {
  auditFilter?: AuditFilter;
  options?: DetailedOptions;
  page?: number;
  pageSize?: number;
  sortColumn?: "ID" | "DESCRIPTION" | "USER" | "DURATION" | "DATE" | "ZONED_DATE" | "NATURAL" | "USER_DATE";
}
export interface SummaryFilter {
  groups?: string[];
  sortColumn?: "GROUP" | "DURATION" | "AMOUNT" | "EARNED" | "COST" | "PROFIT";
  summaryChartType?: "BILLABILITY" | "PROJECT";
}
export interface WeeklyFilter {
  group?: string;
  subgroup?: string;
}
export interface DetailedReportFilter {
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
  detailedFilter: DetailedFilter;
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
export interface SummaryReportFilter {
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
  summaryFilter: SummaryFilter;
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
export interface WeeklyReportFilter {
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
  weeklyFilter: WeeklyFilter;
  withoutDescription?: boolean;
  zoomLevel?: "WEEK" | "MONTH" | "YEAR";
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const compareBreakFilterSchema = z.object({
  filtrationType: z.enum(["EXACTLY", "LARGER_THAN", "SMALLER_THAN"]).optional(),
  value: z.string().optional(),
});
export const compareCapacityFilterSchema = z.object({
  filtrationType: z.enum(["EXACTLY", "LARGER_THAN", "SMALLER_THAN"]).optional(),
  value: z.string().optional(),
});
export const compareEndFilterSchema = z.object({
  filtrationType: z.enum(["EXACTLY", "LARGER_THAN", "SMALLER_THAN"]).optional(),
  value: z.string().optional(),
});
export const compareOvertimeFilterSchema = z.object({
  filtrationType: z.enum(["EXACTLY", "LARGER_THAN", "SMALLER_THAN"]).optional(),
  value: z.string().optional(),
});
export const compareStartFilterSchema = z.object({
  filtrationType: z.enum(["EXACTLY", "LARGER_THAN", "SMALLER_THAN"]).optional(),
  value: z.string().optional(),
});
export const compareWorkFilterSchema = z.object({
  filtrationType: z.enum(["EXACTLY", "LARGER_THAN", "SMALLER_THAN"]).optional(),
  value: z.string().optional(),
});
export const containsArchivedFilterSchema = z.object({
  contains: z.enum(["CONTAINS", "DOES_NOT_CONTAIN", "CONTAINS_ONLY"]).optional(),
  ids: z.array(z.string()).optional(),
  status: z.enum(["ACTIVE", "ARCHIVED", "ALL"]).optional(),
});
export const containsTagFilterSchema = z.object({
  containedInTimeentry: z.enum(["CONTAINS", "DOES_NOT_CONTAIN", "CONTAINS_ONLY"]).optional(),
  contains: z.enum(["CONTAINS", "DOES_NOT_CONTAIN", "CONTAINS_ONLY"]).optional(),
  ids: z.array(z.string()).optional(),
  status: z.enum(["ACTIVE", "ARCHIVED", "ALL"]).optional(),
});
export const containsTaskFilterSchema = z.object({
  contains: z.enum(["CONTAINS", "DOES_NOT_CONTAIN", "CONTAINS_ONLY"]).optional(),
  ids: z.array(z.string()).optional(),
  status: z.enum(["ACTIVE", "ARCHIVED", "ALL"]).optional(),
});
export const containsUsersFilterSchema = z.object({
  contains: z.enum(["CONTAINS", "DOES_NOT_CONTAIN", "CONTAINS_ONLY"]).optional(),
  ids: z.array(z.string()).optional(),
  status: z.enum(["ALL", "ACTIVE_WITH_PENDING", "ACTIVE", "PENDING", "INACTIVE"]).optional(),
});
export const detailedFilterSchema = z.object({
  auditFilter: z.lazy(() => auditFilterSchema).optional(),
  options: z.lazy(() => detailedOptionsSchema).optional(),
  page: z.number().int().optional(),
  pageSize: z.number().int().optional(),
  sortColumn: z.enum(["ID", "DESCRIPTION", "USER", "DURATION", "DATE", "ZONED_DATE", "NATURAL", "USER_DATE"]).optional(),
});
export const summaryFilterSchema = z.object({
  groups: z.array(z.string()).optional(),
  sortColumn: z.enum(["GROUP", "DURATION", "AMOUNT", "EARNED", "COST", "PROFIT"]).optional(),
  summaryChartType: z.enum(["BILLABILITY", "PROJECT"]).optional(),
});
export const weeklyFilterSchema = z.object({
  group: z.string().optional(),
  subgroup: z.string().optional(),
});
export const detailedReportFilterSchema = z.object({
  amountShown: z.enum(["EARNED", "COST", "PROFIT", "HIDE_AMOUNT", "EXPORT"]).optional(),
  amounts: z.array(z.enum(["EARNED", "COST", "PROFIT", "HIDE_AMOUNT", "EXPORT"])).optional(),
  approvalState: z.enum(["APPROVED", "UNAPPROVED", "ALL"]).optional(),
  archived: z.boolean().optional(),
  attendanceFilter: z.lazy(() => attendanceFilterSchema).optional(),
  billable: z.boolean().optional(),
  clients: containsArchivedFilterSchema.optional(),
  currency: containsArchivedFilterSchema.optional(),
  customFields: z.array(z.lazy(() => customFieldFilterSchema)).optional(),
  dateFormat: z.string().optional(),
  dateRangeEnd: z.string(),
  dateRangeStart: z.string(),
  dateRangeType: z.enum(["ABSOLUTE", "TODAY", "YESTERDAY", "THIS_WEEK", "LAST_WEEK", "PAST_TWO_WEEKS", "THIS_MONTH", "LAST_MONTH", "THIS_YEAR", "LAST_YEAR"]).optional(),
  description: z.string().optional(),
  detailedFilter: detailedFilterSchema,
  exportType: z.enum(["JSON", "JSON_V1", "PDF", "CSV", "XLSX", "ZIP"]).optional(),
  invoicingState: z.enum(["INVOICED", "UNINVOICED", "ALL"]).optional(),
  projects: containsArchivedFilterSchema.optional(),
  rounding: z.boolean().optional(),
  sortOrder: z.enum(["ASCENDING", "DESCENDING"]).optional(),
  summaryFilter: summaryFilterSchema.optional(),
  tags: containsTagFilterSchema.optional(),
  tasks: containsTaskFilterSchema.optional(),
  timeFormat: z.string().optional(),
  timeZone: z.string().optional(),
  userCustomFields: z.array(z.lazy(() => customFieldFilterSchema)).optional(),
  userGroups: containsUsersFilterSchema.optional(),
  userLocale: z.string().optional(),
  users: containsUsersFilterSchema.optional(),
  weekStart: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]).optional(),
  weeklyFilter: weeklyFilterSchema.optional(),
  withoutDescription: z.boolean().optional(),
  zoomLevel: z.enum(["WEEK", "MONTH", "YEAR"]).optional(),
});
export const summaryReportFilterSchema = z.object({
  amountShown: z.enum(["EARNED", "COST", "PROFIT", "HIDE_AMOUNT", "EXPORT"]).optional(),
  amounts: z.array(z.enum(["EARNED", "COST", "PROFIT", "HIDE_AMOUNT", "EXPORT"])).optional(),
  approvalState: z.enum(["APPROVED", "UNAPPROVED", "ALL"]).optional(),
  archived: z.boolean().optional(),
  attendanceFilter: z.lazy(() => attendanceFilterSchema).optional(),
  billable: z.boolean().optional(),
  clients: containsArchivedFilterSchema.optional(),
  currency: containsArchivedFilterSchema.optional(),
  customFields: z.array(z.lazy(() => customFieldFilterSchema)).optional(),
  dateFormat: z.string().optional(),
  dateRangeEnd: z.string(),
  dateRangeStart: z.string(),
  dateRangeType: z.enum(["ABSOLUTE", "TODAY", "YESTERDAY", "THIS_WEEK", "LAST_WEEK", "PAST_TWO_WEEKS", "THIS_MONTH", "LAST_MONTH", "THIS_YEAR", "LAST_YEAR"]).optional(),
  description: z.string().optional(),
  detailedFilter: detailedFilterSchema.optional(),
  exportType: z.enum(["JSON", "JSON_V1", "PDF", "CSV", "XLSX", "ZIP"]).optional(),
  invoicingState: z.enum(["INVOICED", "UNINVOICED", "ALL"]).optional(),
  projects: containsArchivedFilterSchema.optional(),
  rounding: z.boolean().optional(),
  sortOrder: z.enum(["ASCENDING", "DESCENDING"]).optional(),
  summaryFilter: summaryFilterSchema,
  tags: containsTagFilterSchema.optional(),
  tasks: containsTaskFilterSchema.optional(),
  timeFormat: z.string().optional(),
  timeZone: z.string().optional(),
  userCustomFields: z.array(z.lazy(() => customFieldFilterSchema)).optional(),
  userGroups: containsUsersFilterSchema.optional(),
  userLocale: z.string().optional(),
  users: containsUsersFilterSchema.optional(),
  weekStart: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]).optional(),
  weeklyFilter: weeklyFilterSchema.optional(),
  withoutDescription: z.boolean().optional(),
  zoomLevel: z.enum(["WEEK", "MONTH", "YEAR"]).optional(),
});
export const weeklyReportFilterSchema = z.object({
  amountShown: z.enum(["EARNED", "COST", "PROFIT", "HIDE_AMOUNT", "EXPORT"]).optional(),
  amounts: z.array(z.enum(["EARNED", "COST", "PROFIT", "HIDE_AMOUNT", "EXPORT"])).optional(),
  approvalState: z.enum(["APPROVED", "UNAPPROVED", "ALL"]).optional(),
  archived: z.boolean().optional(),
  attendanceFilter: z.lazy(() => attendanceFilterSchema).optional(),
  billable: z.boolean().optional(),
  clients: containsArchivedFilterSchema.optional(),
  currency: containsArchivedFilterSchema.optional(),
  customFields: z.array(z.lazy(() => customFieldFilterSchema)).optional(),
  dateFormat: z.string().optional(),
  dateRangeEnd: z.string(),
  dateRangeStart: z.string(),
  dateRangeType: z.enum(["ABSOLUTE", "TODAY", "YESTERDAY", "THIS_WEEK", "LAST_WEEK", "PAST_TWO_WEEKS", "THIS_MONTH", "LAST_MONTH", "THIS_YEAR", "LAST_YEAR"]).optional(),
  description: z.string().optional(),
  detailedFilter: detailedFilterSchema.optional(),
  exportType: z.enum(["JSON", "JSON_V1", "PDF", "CSV", "XLSX", "ZIP"]).optional(),
  invoicingState: z.enum(["INVOICED", "UNINVOICED", "ALL"]).optional(),
  projects: containsArchivedFilterSchema.optional(),
  rounding: z.boolean().optional(),
  sortOrder: z.enum(["ASCENDING", "DESCENDING"]).optional(),
  summaryFilter: summaryFilterSchema.optional(),
  tags: containsTagFilterSchema.optional(),
  tasks: containsTaskFilterSchema.optional(),
  timeFormat: z.string().optional(),
  timeZone: z.string().optional(),
  userCustomFields: z.array(z.lazy(() => customFieldFilterSchema)).optional(),
  userGroups: containsUsersFilterSchema.optional(),
  userLocale: z.string().optional(),
  users: containsUsersFilterSchema.optional(),
  weekStart: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]).optional(),
  weeklyFilter: weeklyFilterSchema,
  withoutDescription: z.boolean().optional(),
  zoomLevel: z.enum(["WEEK", "MONTH", "YEAR"]).optional(),
});
