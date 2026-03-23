// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { AuditLog, auditLogSchema } from "./audit.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface AccountStatus {
  _value: "ACTIVE" | "PENDING_EMAIL_VERIFICATION" | "DELETED" | "NOT_REGISTERED" | "LIMITED" | "LIMITED_DELETED";
}
export interface ApplyTaxes {
  _value: "TAX1" | "TAX2" | "TAX1TAX2" | "NONE";
}
export interface AuthorizationSource {
  id?: string;
  type?: "USER_GROUP";
}
export interface AutomaticAccrual {
  amount?: number;
  period?: "MONTH" | "YEAR";
  timeUnit?: "DAYS" | "HOURS";
}
export interface AutomaticLock {
  changeDay?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  dayOfMonth?: number;
  firstDay?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  olderThanPeriod?: "DAYS" | "WEEKS" | "MONTHS";
  olderThanValue?: number;
  type?: "WEEKLY" | "MONTHLY" | "OLDER_THAN";
}
export interface DefaultEntities {
  projectId?: string;
  taskId?: string;
}
export interface AutomaticTimeEntryCreation {
  defaultEntities?: DefaultEntities;
  enabled?: boolean;
}
export interface CalculationType {
  _value: "INVOICE_BASED" | "ITEM_BASED";
}
export interface CreateInvoice {
  billFrom?: string;
  clientId?: string;
  currency?: string;
  dueDate?: string;
  id?: string;
  issuedDate?: string;
  number?: string;
}
export interface CreateProjectFromTemplate {
  clientId?: string;
  color?: string;
  isPublic?: boolean;
  name: string;
  templateProjectId: string;
}
export interface CurrencyWithDefaultInfo {
  code?: string;
  id?: string;
  isDefault?: boolean;
}
export interface DatePeriod {
  endDate?: string;
  startDate?: string;
}
export interface DateRange {
  end?: string;
  start?: string;
}
export interface Feature {
  _value: "ADD_TIME_FOR_OTHERS" | "ADMIN_PANEL" | "ALERTS" | "APPROVAL" | "AUDIT_LOG" | "AUTOMATIC_LOCK" | "BRANDED_REPORTS" | "BULK_EDIT" | "CUSTOM_FIELDS" | "CUSTOM_REPORTING" | "CUSTOM_SUBDOMAIN" | "DECIMAL_FORMAT" | "DISABLE_MANUAL_MODE" | "EDIT_MEMBER_PROFILE" | "EXCLUDE_NON_BILLABLE_FROM_ESTIMATE" | "EXPENSES" | "FILE_IMPORT" | "TIMESHEET_IMPORT" | "USER_IMPORT" | "HIDE_PAGES" | "HISTORIC_RATES" | "INVOICING" | "INVOICE_EMAILS" | "INVOICE_REMINDERS" | "LABOR_COST" | "LOCATIONS" | "MANAGER_ROLE" | "MULTI_FACTOR_AUTHENTICATION" | "PROJECT_BUDGET" | "PROJECT_TEMPLATES" | "QUICKBOOKS_INTEGRATION" | "RECURRING_ESTIMATES" | "RECURRING_INVOICES" | "REQUIRED_FIELDS" | "SCHEDULED_REPORTS" | "SCHEDULING" | "SCREENSHOTS" | "SSO" | "SUMMARY_ESTIMATE" | "TARGETS_AND_REMINDERS" | "TASK_RATES" | "TIME_OFF" | "UNLIMITED_REPORTS" | "USER_CUSTOM_FIELDS" | "WHO_CAN_CHANGE_TIMEENTRY_BILLABILITY" | "BREAKS" | "KIOSK_SESSION_DURATION" | "KIOSK_PIN_REQUIRED" | "WHO_CAN_SEE_ALL_TIME_ENTRIES" | "WHO_CAN_SEE_PROJECT_STATUS" | "WHO_CAN_SEE_PUBLIC_PROJECTS_ENTRIES" | "WHO_CAN_SEE_TEAMS_DASHBOARD" | "WORKSPACE_LOCK_TIMEENTRIES" | "WORKSPACE_TIME_AUDIT" | "WORKSPACE_TIME_ROUNDING" | "KIOSK" | "KIOSK_SIX_DIGIT_PIN" | "KIOSK_QR_CODE" | "FORECASTING" | "TIME_TRACKING" | "ATTENDANCE_REPORT" | "WORKSPACE_TRANSFER" | "FAVORITE_ENTRIES" | "SPLIT_TIME_ENTRY" | "CLIENT_CURRENCY" | "SCHEDULING_FORECASTING";
}
export interface FeatureSubscriptionType {
  _value: "PREMIUM" | "PREMIUM_YEAR" | "SPECIAL" | "SPECIAL_YEAR" | "TRIAL" | "ENTERPRISE" | "ENTERPRISE_YEAR" | "BASIC_2021" | "BASIC_YEAR_2021" | "STANDARD_2021" | "STANDARD_YEAR_2021" | "PRO_2021" | "PRO_YEAR_2021" | "ENTERPRISE_2021" | "ENTERPRISE_YEAR_2021" | "BUNDLE_2024" | "BUNDLE_YEAR_2024" | "SELF_HOSTED" | "FREE";
}
export interface HourlyRate {
  amount?: number;
  currency?: string;
}
export interface LabelsCustomization {
  amount?: string;
  billFrom?: string;
  billTo?: string;
  description?: string;
  discount?: string;
  dueDate?: string;
  issueDate?: string;
  itemType?: string;
  notes?: string;
  paid?: string;
  quantity?: string;
  subtotal?: string;
  tax?: string;
  tax2?: string;
  total?: string;
  totalAmount?: string;
  unitPrice?: string;
}
export interface LogBinDocument {
  deletedAt?: string;
  deletionBinId?: string;
  document?: Record<string, unknown>;
  documentType?: "TIME_ENTRY" | "TIME_ENTRY_CUSTOM_FIELD_VALUE" | "CUSTOM_ATTRIBUTE" | "EXPENSE" | "CUSTOM_FIELDS" | "TIME_ENTRY_RATE";
  eligibleForRestore?: boolean;
  id?: string;
}
export interface Milestone {
  date?: string;
  id?: string;
  name?: string;
  projectId?: string;
  workspaceId?: string;
}
export interface NegativeBalance {
  amount?: number;
  period?: string;
  shouldReset?: boolean;
  timeUnit?: string;
}
export interface PageableCollectionLogBinDocument {
  response?: LogBinDocument[];
}
export interface Period {
  end?: string;
  start?: string;
}
export interface RecurringAssignment {
  repeat?: boolean;
  seriesId?: string;
  weeks?: number;
}
export interface Round {
  minutes?: string;
  round?: string;
}
export interface SummaryReportSettings {
  group: string;
  subgroup: string;
}
export interface TaxType {
  _value: "COMPOUND" | "SIMPLE" | "NONE";
}
export interface TimeEstimate {
  active?: boolean;
  estimate?: string;
  includeNonBillable?: boolean;
  resetOption?: "WEEKLY" | "MONTHLY" | "YEARLY";
  type?: "AUTO" | "MANUAL";
}
export interface TotalsPerDay {
  date?: string;
  totalHours?: number;
}
export interface UploadFileResponse {
  name?: string;
  url?: string;
}
export interface VisibleZeroFieldsInvoice {
  _value: "TAX" | "TAX_2" | "DISCOUNT";
}
export interface Amount {
  type?: "EARNED" | "COST" | "PROFIT" | "HIDE_AMOUNT" | "EXPORT";
  value?: number;
}
export interface DailyTotal {
  amount?: number;
  date?: string;
  duration?: number;
}
export interface DetailedOptions {
  totals?: "CALCULATE" | "EXCLUDE";
}
export interface SummaryReportChart {
  earned?: number;
  id?: string;
  totalAmount?: number;
  totalBillableTime?: number;
  totalTime?: number;
}
export interface InvoicingInfo {
  invoiceId?: string;
  manuallyInvoiced?: boolean;
}
export interface PageableV1ListAuditLog {
  response?: AuditLog[];
}
export interface Authors {
  authorIds: string[];
  contains: "CONTAINS" | "DOES_NOT_CONTAIN";
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const accountStatusSchema = z.enum(["ACTIVE", "PENDING_EMAIL_VERIFICATION", "DELETED", "NOT_REGISTERED", "LIMITED", "LIMITED_DELETED"]);
export const applyTaxesSchema = z.enum(["TAX1", "TAX2", "TAX1TAX2", "NONE"]);
export const authorizationSourceSchema = z.object({
  id: z.string().optional(),
  type: z.enum(["USER_GROUP"]).optional(),
});
export const automaticAccrualSchema = z.object({
  amount: z.number().optional(),
  period: z.enum(["MONTH", "YEAR"]).optional(),
  timeUnit: z.enum(["DAYS", "HOURS"]).optional(),
});
export const automaticLockSchema = z.object({
  changeDay: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]).optional(),
  dayOfMonth: z.number().int().optional(),
  firstDay: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]).optional(),
  olderThanPeriod: z.enum(["DAYS", "WEEKS", "MONTHS"]).optional(),
  olderThanValue: z.number().int().optional(),
  type: z.enum(["WEEKLY", "MONTHLY", "OLDER_THAN"]).optional(),
});
export const defaultEntitiesSchema = z.object({
  projectId: z.string().optional(),
  taskId: z.string().optional(),
});
export const automaticTimeEntryCreationSchema = z.object({
  defaultEntities: defaultEntitiesSchema.optional(),
  enabled: z.boolean().optional(),
});
export const calculationTypeSchema = z.enum(["INVOICE_BASED", "ITEM_BASED"]);
export const createInvoiceSchema = z.object({
  billFrom: z.string().optional(),
  clientId: z.string().optional(),
  currency: z.string().optional(),
  dueDate: z.string().datetime({ offset: true }).optional(),
  id: z.string().optional(),
  issuedDate: z.string().datetime({ offset: true }).optional(),
  number: z.string().optional(),
});
export const createProjectFromTemplateSchema = z.object({
  clientId: z.string().optional(),
  color: z.string().optional(),
  isPublic: z.boolean().optional(),
  name: z.string(),
  templateProjectId: z.string(),
});
export const currencyWithDefaultInfoSchema = z.object({
  code: z.string().optional(),
  id: z.string().optional(),
  isDefault: z.boolean().optional(),
});
export const datePeriodSchema = z.object({
  endDate: z.string().optional(),
  startDate: z.string().optional(),
});
export const dateRangeSchema = z.object({
  end: z.string().datetime({ offset: true }).optional(),
  start: z.string().datetime({ offset: true }).optional(),
});
export const featureSchema = z.enum(["ADD_TIME_FOR_OTHERS", "ADMIN_PANEL", "ALERTS", "APPROVAL", "AUDIT_LOG", "AUTOMATIC_LOCK", "BRANDED_REPORTS", "BULK_EDIT", "CUSTOM_FIELDS", "CUSTOM_REPORTING", "CUSTOM_SUBDOMAIN", "DECIMAL_FORMAT", "DISABLE_MANUAL_MODE", "EDIT_MEMBER_PROFILE", "EXCLUDE_NON_BILLABLE_FROM_ESTIMATE", "EXPENSES", "FILE_IMPORT", "TIMESHEET_IMPORT", "USER_IMPORT", "HIDE_PAGES", "HISTORIC_RATES", "INVOICING", "INVOICE_EMAILS", "INVOICE_REMINDERS", "LABOR_COST", "LOCATIONS", "MANAGER_ROLE", "MULTI_FACTOR_AUTHENTICATION", "PROJECT_BUDGET", "PROJECT_TEMPLATES", "QUICKBOOKS_INTEGRATION", "RECURRING_ESTIMATES", "RECURRING_INVOICES", "REQUIRED_FIELDS", "SCHEDULED_REPORTS", "SCHEDULING", "SCREENSHOTS", "SSO", "SUMMARY_ESTIMATE", "TARGETS_AND_REMINDERS", "TASK_RATES", "TIME_OFF", "UNLIMITED_REPORTS", "USER_CUSTOM_FIELDS", "WHO_CAN_CHANGE_TIMEENTRY_BILLABILITY", "BREAKS", "KIOSK_SESSION_DURATION", "KIOSK_PIN_REQUIRED", "WHO_CAN_SEE_ALL_TIME_ENTRIES", "WHO_CAN_SEE_PROJECT_STATUS", "WHO_CAN_SEE_PUBLIC_PROJECTS_ENTRIES", "WHO_CAN_SEE_TEAMS_DASHBOARD", "WORKSPACE_LOCK_TIMEENTRIES", "WORKSPACE_TIME_AUDIT", "WORKSPACE_TIME_ROUNDING", "KIOSK", "KIOSK_SIX_DIGIT_PIN", "KIOSK_QR_CODE", "FORECASTING", "TIME_TRACKING", "ATTENDANCE_REPORT", "WORKSPACE_TRANSFER", "FAVORITE_ENTRIES", "SPLIT_TIME_ENTRY", "CLIENT_CURRENCY", "SCHEDULING_FORECASTING"]);
export const featureSubscriptionTypeSchema = z.enum(["PREMIUM", "PREMIUM_YEAR", "SPECIAL", "SPECIAL_YEAR", "TRIAL", "ENTERPRISE", "ENTERPRISE_YEAR", "BASIC_2021", "BASIC_YEAR_2021", "STANDARD_2021", "STANDARD_YEAR_2021", "PRO_2021", "PRO_YEAR_2021", "ENTERPRISE_2021", "ENTERPRISE_YEAR_2021", "BUNDLE_2024", "BUNDLE_YEAR_2024", "SELF_HOSTED", "FREE"]);
export const hourlyRateSchema = z.object({
  amount: z.number().int().optional(),
  currency: z.string().optional(),
});
export const labelsCustomizationSchema = z.object({
  amount: z.string().optional(),
  billFrom: z.string().optional(),
  billTo: z.string().optional(),
  description: z.string().optional(),
  discount: z.string().optional(),
  dueDate: z.string().optional(),
  issueDate: z.string().optional(),
  itemType: z.string().optional(),
  notes: z.string().optional(),
  paid: z.string().optional(),
  quantity: z.string().optional(),
  subtotal: z.string().optional(),
  tax: z.string().optional(),
  tax2: z.string().optional(),
  total: z.string().optional(),
  totalAmount: z.string().optional(),
  unitPrice: z.string().optional(),
});
export const logBinDocumentSchema = z.object({
  deletedAt: z.string().datetime({ offset: true }).optional(),
  deletionBinId: z.string().optional(),
  document: z.record(z.string(), z.unknown()).optional(),
  documentType: z.enum(["TIME_ENTRY", "TIME_ENTRY_CUSTOM_FIELD_VALUE", "CUSTOM_ATTRIBUTE", "EXPENSE", "CUSTOM_FIELDS", "TIME_ENTRY_RATE"]).optional(),
  eligibleForRestore: z.boolean().optional(),
  id: z.string().optional(),
});
export const milestoneSchema = z.object({
  date: z.string().datetime({ offset: true }).optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  projectId: z.string().optional(),
  workspaceId: z.string().optional(),
});
export const negativeBalanceSchema = z.object({
  amount: z.number().optional(),
  period: z.string().optional(),
  shouldReset: z.boolean().optional(),
  timeUnit: z.string().optional(),
});
export const pageableCollectionLogBinDocumentSchema = z.object({
  response: z.array(logBinDocumentSchema).optional(),
});
export const periodSchema = z.object({
  end: z.string().datetime({ offset: true }).optional(),
  start: z.string().datetime({ offset: true }).optional(),
});
export const recurringAssignmentSchema = z.object({
  repeat: z.boolean().optional(),
  seriesId: z.string().optional(),
  weeks: z.number().int().optional(),
});
export const roundSchema = z.object({
  minutes: z.string().optional(),
  round: z.string().optional(),
});
export const summaryReportSettingsSchema = z.object({
  group: z.string(),
  subgroup: z.string(),
});
export const taxTypeSchema = z.enum(["COMPOUND", "SIMPLE", "NONE"]);
export const timeEstimateSchema = z.object({
  active: z.boolean().optional(),
  estimate: z.string().optional(),
  includeNonBillable: z.boolean().optional(),
  resetOption: z.enum(["WEEKLY", "MONTHLY", "YEARLY"]).optional(),
  type: z.enum(["AUTO", "MANUAL"]).optional(),
});
export const totalsPerDaySchema = z.object({
  date: z.string().datetime({ offset: true }).optional(),
  totalHours: z.number().optional(),
});
export const uploadFileResponseSchema = z.object({
  name: z.string().optional(),
  url: z.string().optional(),
});
export const visibleZeroFieldsInvoiceSchema = z.enum(["TAX", "TAX_2", "DISCOUNT"]);
export const amountSchema = z.object({
  type: z.enum(["EARNED", "COST", "PROFIT", "HIDE_AMOUNT", "EXPORT"]).optional(),
  value: z.number().optional(),
});
export const dailyTotalSchema = z.object({
  amount: z.number().optional(),
  date: z.string().optional(),
  duration: z.number().optional(),
});
export const detailedOptionsSchema = z.object({
  totals: z.enum(["CALCULATE", "EXCLUDE"]).optional(),
});
export const summaryReportChartSchema = z.object({
  earned: z.number().optional(),
  id: z.string().optional(),
  totalAmount: z.number().optional(),
  totalBillableTime: z.number().optional(),
  totalTime: z.number().optional(),
});
export const invoicingInfoSchema = z.object({
  invoiceId: z.string().optional(),
  manuallyInvoiced: z.boolean().optional(),
});
export const pageableV1ListAuditLogSchema = z.object({
  response: z.array(z.lazy(() => auditLogSchema)).optional(),
});
export const authorsSchema = z.object({
  authorIds: z.array(z.string()),
  contains: z.enum(["CONTAINS", "DOES_NOT_CONTAIN"]),
});
