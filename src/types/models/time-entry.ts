// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { AuditMetadata, auditMetadataSchema } from "./audit.js";
import { Amount, DailyTotal, SummaryReportChart, amountSchema, dailyTotalSchema, summaryReportChartSchema } from "./common.js";
import { CustomFieldValueDto, CustomFieldValueDtoV1, customFieldValueDtoSchema, customFieldValueDtoV1Schema } from "./custom-field.js";
import { GroupOne, groupOneSchema } from "./group.js";
import { ProjectInfo, projectInfoSchema } from "./project.js";
import { RateDto, RateDtoV1, rateDtoSchema, rateDtoV1Schema } from "./rate.js";
import { ReportTag, ReportTimeInterval, reportTagSchema, reportTimeIntervalSchema } from "./report.js";
import { TagDto, tagDtoSchema } from "./tag.js";
import { TaskInfo, taskInfoSchema } from "./task.js";
import { TimeIntervalDto, TimeIntervalDtoV1, timeIntervalDtoSchema, timeIntervalDtoV1Schema } from "./time-interval.js";
import { UserDto, userDtoSchema } from "./user.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface TimeEntryDtoImplV1 {
  billable?: boolean;
  customFieldValues?: CustomFieldValueDtoV1[];
  description?: string;
  id?: string;
  isLocked?: boolean;
  kioskId?: string;
  projectId?: string;
  tagIds?: string[];
  taskId?: string;
  timeInterval?: TimeIntervalDtoV1;
  type?: "REGULAR" | "BREAK" | "HOLIDAY" | "TIME_OFF";
  userId?: string;
  workspaceId?: string;
}
export interface TimeEntryDtoV1 {
  billable?: boolean;
  customFieldValues?: CustomFieldValueDtoV1[];
  description?: string;
  id?: string;
  isLocked?: boolean;
  kioskId?: string;
  projectId?: string;
  tagIds?: string[];
  taskId?: string;
  timeInterval?: TimeIntervalDtoV1;
  type?: "REGULAR" | "BREAK" | "HOLIDAY" | "TIME_OFF";
  userId?: string;
  workspaceId?: string;
}
export interface TimeEntryId {
  dateOfCreationFromObjectId?: string;
}
export interface TimeEntryInfo {
  approvalRequestId?: string;
  billable?: boolean;
  costRate?: RateDto;
  customFieldValues?: CustomFieldValueDto[];
  description?: string;
  hourlyRate?: RateDto;
  id?: string;
  isLocked?: boolean;
  project?: ProjectInfo;
  tags?: TagDto[];
  task?: TaskInfo;
  timeInterval?: TimeIntervalDto;
  type?: "REGULAR" | "BREAK" | "HOLIDAY" | "TIME_OFF";
}
export interface TimeEntryUpdatedInfo {
  approvalStatus?: "PENDING" | "APPROVED" | "UNSUBMITTED";
  auditMetadata?: AuditMetadata;
  billable?: boolean;
  description?: string;
  documentType?: "TIME_ENTRY" | "TIME_ENTRY_CUSTOM_FIELD_VALUE" | "CUSTOM_ATTRIBUTE" | "EXPENSE" | "CUSTOM_FIELDS" | "TIME_ENTRY_RATE";
  id?: string;
  kioskId?: string;
  projectId?: string;
  tagIds?: string[];
  taskId?: string;
  timeInterval?: TimeIntervalDto;
  type?: string;
  userId?: string;
  workspaceId?: string;
}
export interface TimeEntryWithCustomFields {
  billable?: boolean;
  customFieldValues?: CustomFieldValueDto[];
  description?: string;
  id?: string;
  projectId?: string;
  tagIds?: string[];
  taskId?: string;
  timeInterval?: TimeIntervalDto;
  type?: "REGULAR" | "BREAK" | "HOLIDAY" | "TIME_OFF";
  userId?: string;
  workspaceId?: string;
}
export interface TimeEntryWithRates {
  billable?: boolean;
  costRate?: RateDtoV1;
  customFieldValues?: CustomFieldValueDtoV1[];
  description?: string;
  hourlyRate?: RateDtoV1;
  id?: string;
  isLocked?: boolean;
  kioskId?: string;
  projectId?: string;
  tagIds?: string[];
  taskId?: string;
  timeInterval?: TimeIntervalDtoV1;
  type?: "REGULAR" | "BREAK" | "HOLIDAY" | "TIME_OFF";
  userId?: string;
  workspaceId?: string;
}
export interface TimeEntryDto {
  approvalRequestId?: string;
  billable?: boolean;
  clientId?: string;
  clientName?: string;
  description?: string;
  get_id?: string;
  locked?: boolean;
  projectColor?: string;
  projectId?: string;
  projectName?: string;
  tags?: ReportTag[];
  taskId?: string;
  taskName?: string;
  timeInterval?: ReportTimeInterval;
  userEmail?: string;
  userId?: string;
  userName?: string;
}
export interface TimeEntryReportTotals {
  amounts?: Amount[];
  entriesCount?: number;
  id?: string;
  totalBillableTime?: number;
  totalTime?: number;
}
export interface TimeEntryDetailedReport {
  timeEntries?: TimeEntryDto[];
  totals?: TimeEntryReportTotals[];
}
export interface TimeEntrySummaryReport {
  chart?: SummaryReportChart[];
  groupOne?: GroupOne[];
  totals?: TimeEntryReportTotals[];
}
export interface TimeEntryWeeklyReport {
  decimalFormat?: boolean;
  groupOne?: GroupOne[];
  includeUsersWithoutTime?: boolean;
  totals?: TimeEntryReportTotals[];
  totalsByDay?: DailyTotal[];
  trackTimeDownToSeconds?: boolean;
  usersWithoutTime?: UserDto[];
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const timeEntryDtoImplV1Schema = z.object({
  billable: z.boolean().optional(),
  customFieldValues: z.array(z.lazy(() => customFieldValueDtoV1Schema)).optional(),
  description: z.string().optional(),
  id: z.string().optional(),
  isLocked: z.boolean().optional(),
  kioskId: z.string().optional(),
  projectId: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
  taskId: z.string().optional(),
  timeInterval: z.lazy(() => timeIntervalDtoV1Schema).optional(),
  type: z.enum(["REGULAR", "BREAK", "HOLIDAY", "TIME_OFF"]).optional(),
  userId: z.string().optional(),
  workspaceId: z.string().optional(),
});
export const timeEntryDtoV1Schema = z.object({
  billable: z.boolean().optional(),
  customFieldValues: z.array(z.lazy(() => customFieldValueDtoV1Schema)).optional(),
  description: z.string().optional(),
  id: z.string().optional(),
  isLocked: z.boolean().optional(),
  kioskId: z.string().optional(),
  projectId: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
  taskId: z.string().optional(),
  timeInterval: z.lazy(() => timeIntervalDtoV1Schema).optional(),
  type: z.enum(["REGULAR", "BREAK", "HOLIDAY", "TIME_OFF"]).optional(),
  userId: z.string().optional(),
  workspaceId: z.string().optional(),
});
export const timeEntryIdSchema = z.object({
  dateOfCreationFromObjectId: z.string().datetime({ offset: true }).optional(),
});
export const timeEntryInfoSchema = z.object({
  approvalRequestId: z.string().optional(),
  billable: z.boolean().optional(),
  costRate: z.lazy(() => rateDtoSchema).optional(),
  customFieldValues: z.array(z.lazy(() => customFieldValueDtoSchema)).optional(),
  description: z.string().optional(),
  hourlyRate: z.lazy(() => rateDtoSchema).optional(),
  id: z.string().optional(),
  isLocked: z.boolean().optional(),
  project: z.lazy(() => projectInfoSchema).optional(),
  tags: z.array(z.lazy(() => tagDtoSchema)).optional(),
  task: z.lazy(() => taskInfoSchema).optional(),
  timeInterval: z.lazy(() => timeIntervalDtoSchema).optional(),
  type: z.enum(["REGULAR", "BREAK", "HOLIDAY", "TIME_OFF"]).optional(),
});
export const timeEntryUpdatedInfoSchema = z.object({
  approvalStatus: z.enum(["PENDING", "APPROVED", "UNSUBMITTED"]).optional(),
  auditMetadata: z.lazy(() => auditMetadataSchema).optional(),
  billable: z.boolean().optional(),
  description: z.string().optional(),
  documentType: z.enum(["TIME_ENTRY", "TIME_ENTRY_CUSTOM_FIELD_VALUE", "CUSTOM_ATTRIBUTE", "EXPENSE", "CUSTOM_FIELDS", "TIME_ENTRY_RATE"]).optional(),
  id: z.string().optional(),
  kioskId: z.string().optional(),
  projectId: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
  taskId: z.string().optional(),
  timeInterval: z.lazy(() => timeIntervalDtoSchema).optional(),
  type: z.string().optional(),
  userId: z.string().optional(),
  workspaceId: z.string().optional(),
});
export const timeEntryWithCustomFieldsSchema = z.object({
  billable: z.boolean().optional(),
  customFieldValues: z.array(z.lazy(() => customFieldValueDtoSchema)).optional(),
  description: z.string().optional(),
  id: z.string().optional(),
  projectId: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
  taskId: z.string().optional(),
  timeInterval: z.lazy(() => timeIntervalDtoSchema).optional(),
  type: z.enum(["REGULAR", "BREAK", "HOLIDAY", "TIME_OFF"]).optional(),
  userId: z.string().optional(),
  workspaceId: z.string().optional(),
});
export const timeEntryWithRatesSchema = z.object({
  billable: z.boolean().optional(),
  costRate: z.lazy(() => rateDtoV1Schema).optional(),
  customFieldValues: z.array(z.lazy(() => customFieldValueDtoV1Schema)).optional(),
  description: z.string().optional(),
  hourlyRate: z.lazy(() => rateDtoV1Schema).optional(),
  id: z.string().optional(),
  isLocked: z.boolean().optional(),
  kioskId: z.string().optional(),
  projectId: z.string().optional(),
  tagIds: z.array(z.string()).optional(),
  taskId: z.string().optional(),
  timeInterval: z.lazy(() => timeIntervalDtoV1Schema).optional(),
  type: z.enum(["REGULAR", "BREAK", "HOLIDAY", "TIME_OFF"]).optional(),
  userId: z.string().optional(),
  workspaceId: z.string().optional(),
});
export const timeEntryDtoSchema = z.object({
  approvalRequestId: z.string().optional(),
  billable: z.boolean().optional(),
  clientId: z.string().optional(),
  clientName: z.string().optional(),
  description: z.string().optional(),
  get_id: z.string().optional(),
  locked: z.boolean().optional(),
  projectColor: z.string().optional(),
  projectId: z.string().optional(),
  projectName: z.string().optional(),
  tags: z.array(z.lazy(() => reportTagSchema)).optional(),
  taskId: z.string().optional(),
  taskName: z.string().optional(),
  timeInterval: z.lazy(() => reportTimeIntervalSchema).optional(),
  userEmail: z.string().optional(),
  userId: z.string().optional(),
  userName: z.string().optional(),
});
export const timeEntryReportTotalsSchema = z.object({
  amounts: z.array(z.lazy(() => amountSchema)).optional(),
  entriesCount: z.number().int().optional(),
  id: z.string().optional(),
  totalBillableTime: z.number().optional(),
  totalTime: z.number().optional(),
});
export const timeEntryDetailedReportSchema = z.object({
  timeEntries: z.array(timeEntryDtoSchema).optional(),
  totals: z.array(timeEntryReportTotalsSchema).optional(),
});
export const timeEntrySummaryReportSchema = z.object({
  chart: z.array(z.lazy(() => summaryReportChartSchema)).optional(),
  groupOne: z.array(z.lazy(() => groupOneSchema)).optional(),
  totals: z.array(timeEntryReportTotalsSchema).optional(),
});
export const timeEntryWeeklyReportSchema = z.object({
  decimalFormat: z.boolean().optional(),
  groupOne: z.array(z.lazy(() => groupOneSchema)).optional(),
  includeUsersWithoutTime: z.boolean().optional(),
  totals: z.array(timeEntryReportTotalsSchema).optional(),
  totalsByDay: z.array(z.lazy(() => dailyTotalSchema)).optional(),
  trackTimeDownToSeconds: z.boolean().optional(),
  usersWithoutTime: z.array(z.lazy(() => userDtoSchema)).optional(),
});
