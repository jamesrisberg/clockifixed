// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { InvoicingInfo, invoicingInfoSchema } from "./common.js";
import { ProjectInfo, projectInfoSchema } from "./project.js";
import { TaskInfo, taskInfoSchema } from "./task.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface ExpenseCategoryDtoV1 {
  archived?: boolean;
  hasUnitPrice?: boolean;
  id?: string;
  name?: string;
  priceInCents?: number;
  unit?: string;
  workspaceId?: string;
}
export interface ExpenseCategoriesWithCount {
  categories?: ExpenseCategoryDtoV1[];
  count?: number;
}
export interface ExpenseCategoryDto {
  archived?: boolean;
  hasUnitPrice?: boolean;
  id?: string;
  name?: string;
  priceInCents?: number;
  unit?: string;
  workspaceId?: string;
}
export interface ExpenseDailyTotals {
  date?: string;
  dateAsInstant?: string;
  total?: number;
}
export interface Expense {
  billable?: boolean;
  categoryId?: string;
  date?: string;
  fileId?: string;
  id?: string;
  isLocked?: boolean;
  locked?: boolean;
  notes?: string;
  projectId?: string;
  quantity?: number;
  taskId?: string;
  total?: number;
  userId?: string;
  workspaceId?: string;
}
export interface ExpenseHydratedDto {
  approvalRequestId?: string;
  approvalStatus?: "PENDING" | "APPROVED" | "UNSUBMITTED";
  billable?: boolean;
  category?: ExpenseCategoryDto;
  currency?: string;
  date?: string;
  fileId?: string;
  fileName?: string;
  fileUrl?: string;
  id?: string;
  isLocked?: boolean;
  locked?: boolean;
  notes?: string;
  project?: ProjectInfo;
  quantity?: number;
  task?: TaskInfo;
  total?: number;
  userId?: string;
  workspaceId?: string;
}
export interface ExpenseHydratedDtoV1 {
  billable?: boolean;
  category?: ExpenseCategoryDto;
  date?: string;
  fileId?: string;
  fileName?: string;
  id?: string;
  isLocked?: boolean;
  locked?: boolean;
  notes?: string;
  project?: ProjectInfo;
  quantity?: number;
  task?: TaskInfo;
  total?: number;
  userId?: string;
  workspaceId?: string;
}
export interface ExpenseWeeklyTotals {
  date?: string;
  total?: number;
}
export interface ExpensesWithCount {
  count?: number;
  expenses?: ExpenseHydratedDtoV1[];
}
export interface ExpensesAndTotals {
  dailyTotals?: ExpenseDailyTotals[];
  expenses?: ExpensesWithCount;
  weeklyTotals?: ExpenseWeeklyTotals[];
}
export interface ExpenseReport {
  amount?: number;
  approvalRequestId?: string;
  billable?: boolean;
  categoryHasUnitPrice?: boolean;
  categoryId?: string;
  categoryName?: string;
  categoryUnit?: string;
  date?: string;
  exportFields?: ("PROJECT" | "CLIENT" | "TASK" | "DESCRIPTION" | "USER" | "TAGS" | "START_DATE" | "START_TIME" | "END_TIME" | "DURATION" | "BILLABLE_AMOUNT" | "COST_AMOUNT" | "PROFIT" | "EMAIL" | "BILLABLE" | "BILLABLE_H" | "NON_BILLABLE_H" | "END_DATE" | "DECIMAL_DURATION" | "BILLABLE_RATE" | "COST_RATE" | "APPROVAL" | "BAR_CHART" | "PIE_CHART_1" | "PIE_CHART_2" | "PIE_CHART_3" | "RTL" | "TOTAL" | "SUBGROUP" | "GROUP" | "DATE" | "TIME" | "CATEGORY" | "NOTE" | "AMOUNT" | "INVOICED" | "INVOICE_ID" | "CATEGORY_NO_OF_UNITS" | "CATEGORY_UNIT" | "KIOSK" | "KIOSK_QR_CODE" | "TYPE" | "BREAK" | "NOTES" | "BILLABLE_TOTAL" | "RECEIPTS" | "EXPENSE_TOTAL" | "DATE_OF_CREATION" | "DATE_OF_APPROVAL" | "NAME" | "ROLE" | "PROJECTS" | "STATUS" | "WEEK_START" | "WORKING_DAYS" | "TEAM_MANAGERS" | "TEAM_MEMBERS" | "DAILY_WORK_CAPACITY" | "VISIBILITY" | "BILLABILITY" | "TASKS" | "TRACKED_H" | "ESTIMATED_H" | "REMAINING_H" | "OVERAGE_H" | "TRACKED_BUDGET" | "ESTIMATED_BUDGET" | "REMAINING_BUDGET" | "OVERAGE_BUDGET" | "PROGRESS" | "RECURRING_ESTIMATE" | "EXPENSES" | "BILLABLE_EXPENSES" | "NON_BILLABLE_EXPENSES" | "ADDITIONAL_FIELDS" | "PROJECT_MEMBERS" | "PROJECT_MANAGER" | "APPROVED_BY" | "ISSUE_DATE" | "DUE_ON" | "BALANCE")[];
  fileId?: string;
  fileName?: string;
  id?: string;
  invoicingInfo?: InvoicingInfo;
  locked?: boolean;
  notes?: string;
  projectColor?: string;
  projectId?: string;
  projectName?: string;
  quantity?: number;
  reportName?: string;
  time?: string;
  userEmail?: string;
  userId?: string;
  userName?: string;
  userStatus?: string;
  workspaceId?: string;
}
export interface ExpenseTotals {
  expensesCount?: number;
  totalAmount?: number;
  totalAmountBillable?: number;
}
export interface ExpenseDetailedReport {
  expenses?: ExpenseReport[];
  totals?: ExpenseTotals;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const expenseCategoryDtoV1Schema = z.object({
  archived: z.boolean().optional(),
  hasUnitPrice: z.boolean().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  priceInCents: z.number().int().optional(),
  unit: z.string().optional(),
  workspaceId: z.string().optional(),
});
export const expenseCategoriesWithCountSchema = z.object({
  categories: z.array(expenseCategoryDtoV1Schema).optional(),
  count: z.number().int().optional(),
});
export const expenseCategoryDtoSchema = z.object({
  archived: z.boolean().optional(),
  hasUnitPrice: z.boolean().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  priceInCents: z.number().int().optional(),
  unit: z.string().optional(),
  workspaceId: z.string().optional(),
});
export const expenseDailyTotalsSchema = z.object({
  date: z.string().optional(),
  dateAsInstant: z.string().datetime({ offset: true }).optional(),
  total: z.number().optional(),
});
export const expenseSchema = z.object({
  billable: z.boolean().optional(),
  categoryId: z.string().optional(),
  date: z.string().optional(),
  fileId: z.string().optional(),
  id: z.string().optional(),
  isLocked: z.boolean().optional(),
  locked: z.boolean().optional(),
  notes: z.string().optional(),
  projectId: z.string().optional(),
  quantity: z.number().optional(),
  taskId: z.string().optional(),
  total: z.number().optional(),
  userId: z.string().optional(),
  workspaceId: z.string().optional(),
});
export const expenseHydratedDtoSchema = z.object({
  approvalRequestId: z.string().optional(),
  approvalStatus: z.enum(["PENDING", "APPROVED", "UNSUBMITTED"]).optional(),
  billable: z.boolean().optional(),
  category: expenseCategoryDtoSchema.optional(),
  currency: z.string().optional(),
  date: z.string().optional(),
  fileId: z.string().optional(),
  fileName: z.string().optional(),
  fileUrl: z.string().optional(),
  id: z.string().optional(),
  isLocked: z.boolean().optional(),
  locked: z.boolean().optional(),
  notes: z.string().optional(),
  project: z.lazy(() => projectInfoSchema).optional(),
  quantity: z.number().optional(),
  task: z.lazy(() => taskInfoSchema).optional(),
  total: z.number().optional(),
  userId: z.string().optional(),
  workspaceId: z.string().optional(),
});
export const expenseHydratedDtoV1Schema = z.object({
  billable: z.boolean().optional(),
  category: expenseCategoryDtoSchema.optional(),
  date: z.string().optional(),
  fileId: z.string().optional(),
  fileName: z.string().optional(),
  id: z.string().optional(),
  isLocked: z.boolean().optional(),
  locked: z.boolean().optional(),
  notes: z.string().optional(),
  project: z.lazy(() => projectInfoSchema).optional(),
  quantity: z.number().optional(),
  task: z.lazy(() => taskInfoSchema).optional(),
  total: z.number().optional(),
  userId: z.string().optional(),
  workspaceId: z.string().optional(),
});
export const expenseWeeklyTotalsSchema = z.object({
  date: z.string().optional(),
  total: z.number().optional(),
});
export const expensesWithCountSchema = z.object({
  count: z.number().int().optional(),
  expenses: z.array(expenseHydratedDtoV1Schema).optional(),
});
export const expensesAndTotalsSchema = z.object({
  dailyTotals: z.array(expenseDailyTotalsSchema).optional(),
  expenses: expensesWithCountSchema.optional(),
  weeklyTotals: z.array(expenseWeeklyTotalsSchema).optional(),
});
export const expenseReportSchema = z.object({
  amount: z.number().optional(),
  approvalRequestId: z.string().optional(),
  billable: z.boolean().optional(),
  categoryHasUnitPrice: z.boolean().optional(),
  categoryId: z.string().optional(),
  categoryName: z.string().optional(),
  categoryUnit: z.string().optional(),
  date: z.string().optional(),
  exportFields: z.array(z.enum(["PROJECT", "CLIENT", "TASK", "DESCRIPTION", "USER", "TAGS", "START_DATE", "START_TIME", "END_TIME", "DURATION", "BILLABLE_AMOUNT", "COST_AMOUNT", "PROFIT", "EMAIL", "BILLABLE", "BILLABLE_H", "NON_BILLABLE_H", "END_DATE", "DECIMAL_DURATION", "BILLABLE_RATE", "COST_RATE", "APPROVAL", "BAR_CHART", "PIE_CHART_1", "PIE_CHART_2", "PIE_CHART_3", "RTL", "TOTAL", "SUBGROUP", "GROUP", "DATE", "TIME", "CATEGORY", "NOTE", "AMOUNT", "INVOICED", "INVOICE_ID", "CATEGORY_NO_OF_UNITS", "CATEGORY_UNIT", "KIOSK", "KIOSK_QR_CODE", "TYPE", "BREAK", "NOTES", "BILLABLE_TOTAL", "RECEIPTS", "EXPENSE_TOTAL", "DATE_OF_CREATION", "DATE_OF_APPROVAL", "NAME", "ROLE", "PROJECTS", "STATUS", "WEEK_START", "WORKING_DAYS", "TEAM_MANAGERS", "TEAM_MEMBERS", "DAILY_WORK_CAPACITY", "VISIBILITY", "BILLABILITY", "TASKS", "TRACKED_H", "ESTIMATED_H", "REMAINING_H", "OVERAGE_H", "TRACKED_BUDGET", "ESTIMATED_BUDGET", "REMAINING_BUDGET", "OVERAGE_BUDGET", "PROGRESS", "RECURRING_ESTIMATE", "EXPENSES", "BILLABLE_EXPENSES", "NON_BILLABLE_EXPENSES", "ADDITIONAL_FIELDS", "PROJECT_MEMBERS", "PROJECT_MANAGER", "APPROVED_BY", "ISSUE_DATE", "DUE_ON", "BALANCE"])).optional(),
  fileId: z.string().optional(),
  fileName: z.string().optional(),
  id: z.string().optional(),
  invoicingInfo: z.lazy(() => invoicingInfoSchema).optional(),
  locked: z.boolean().optional(),
  notes: z.string().optional(),
  projectColor: z.string().optional(),
  projectId: z.string().optional(),
  projectName: z.string().optional(),
  quantity: z.number().optional(),
  reportName: z.string().optional(),
  time: z.string().optional(),
  userEmail: z.string().optional(),
  userId: z.string().optional(),
  userName: z.string().optional(),
  userStatus: z.string().optional(),
  workspaceId: z.string().optional(),
});
export const expenseTotalsSchema = z.object({
  expensesCount: z.number().int().optional(),
  totalAmount: z.number().optional(),
  totalAmountBillable: z.number().optional(),
});
export const expenseDetailedReportSchema = z.object({
  expenses: z.array(expenseReportSchema).optional(),
  totals: expenseTotalsSchema.optional(),
});
