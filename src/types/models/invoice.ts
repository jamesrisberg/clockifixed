// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { ApplyTaxes, CalculationType, LabelsCustomization, TaxType, VisibleZeroFieldsInvoice, applyTaxesSchema, calculationTypeSchema, labelsCustomizationSchema, taxTypeSchema, visibleZeroFieldsInvoiceSchema } from "./common.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface InvoiceDefaultSettings {
  companyId?: string;
  defaultImportExpenseItemTypeId?: string;
  defaultImportTimeItemTypeId?: string;
  dueDays?: number;
  itemType?: string;
  itemTypeId?: string;
  notes?: string;
  subject?: string;
  tax?: number;
  tax2?: number;
  tax2Percent?: number;
  taxPercent?: number;
  taxType?: "COMPOUND" | "SIMPLE" | "NONE";
}
export interface Invoice {
  amount?: number;
  balance?: number;
  clientId?: string;
  clientName?: string;
  currency?: string;
  dueDate?: string;
  id?: string;
  issuedDate?: string;
  number?: string;
  paid?: number;
  status?: "UNSENT" | "SENT" | "PAID" | "PARTIALLY_PAID" | "VOID" | "OVERDUE";
}
export interface InvoiceExportFields {
  RTL?: boolean;
  itemType?: boolean;
  quantity?: boolean;
  rtl?: boolean;
  tax?: boolean;
  tax2?: boolean;
  unitPrice?: boolean;
}
export interface InvoiceInfo {
  amount?: number;
  balance?: number;
  billFrom?: string;
  clientId?: string;
  clientName?: string;
  currency?: string;
  daysOverdue?: number;
  dueDate?: string;
  id?: string;
  issuedDate?: string;
  number?: string;
  paid?: number;
  status?: "UNSENT" | "SENT" | "PAID" | "PARTIALLY_PAID" | "VOID" | "OVERDUE";
  visibleZeroFields?: VisibleZeroFieldsInvoice;
}
export interface InvoiceInfoResponse {
  invoices?: InvoiceInfo[];
  total?: number;
}
export interface InvoiceItem {
  amount?: number;
  applyTaxes?: ApplyTaxes;
  description?: string;
  expenseIds?: string[];
  importType?: "NOT_IMPORTED" | "TIME_ENTRY_IMPORT" | "EXPENSE_IMPORT";
  itemType?: string;
  order?: number;
  quantity?: number;
  timeEntryIds?: string[];
  unitPrice?: number;
}
export interface InvoiceOverview {
  amount?: number;
  balance?: number;
  billFrom?: string;
  calculationType?: CalculationType;
  clientAddress?: string;
  clientId?: string;
  clientName?: string;
  companyId?: string;
  containsImportedExpenses?: boolean;
  containsImportedTimes?: boolean;
  currency?: string;
  discount?: number;
  discountAmount?: number;
  dueDate?: string;
  id?: string;
  issuedDate?: string;
  items?: InvoiceItem[];
  note?: string;
  number?: string;
  paid?: number;
  status?: "UNSENT" | "SENT" | "PAID" | "PARTIALLY_PAID" | "VOID" | "OVERDUE";
  subject?: string;
  subtotal?: number;
  tax?: number;
  tax2?: number;
  tax2Amount?: number;
  taxAmount?: number;
  taxType?: TaxType;
  userId?: string;
  visibleZeroFields?: VisibleZeroFieldsInvoice;
}
export interface InvoicePayment {
  amount?: number;
  author?: string;
  date?: string;
  id?: string;
  note?: string;
}
export interface InvoiceSettings {
  defaults?: InvoiceDefaultSettings;
  exportFields?: InvoiceExportFields;
  labels?: LabelsCustomization;
}
export interface InvoicesList {
  invoices?: Invoice[];
  total?: number;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const invoiceDefaultSettingsSchema = z.object({
  companyId: z.string().optional(),
  defaultImportExpenseItemTypeId: z.string().optional(),
  defaultImportTimeItemTypeId: z.string().optional(),
  dueDays: z.number().int().optional(),
  itemType: z.string().optional(),
  itemTypeId: z.string().optional(),
  notes: z.string().optional(),
  subject: z.string().optional(),
  tax: z.number().int().optional(),
  tax2: z.number().int().optional(),
  tax2Percent: z.number().optional(),
  taxPercent: z.number().optional(),
  taxType: z.enum(["COMPOUND", "SIMPLE", "NONE"]).optional(),
});
export const invoiceSchema = z.object({
  amount: z.number().int().optional(),
  balance: z.number().int().optional(),
  clientId: z.string().optional(),
  clientName: z.string().optional(),
  currency: z.string().optional(),
  dueDate: z.string().datetime({ offset: true }).optional(),
  id: z.string().optional(),
  issuedDate: z.string().datetime({ offset: true }).optional(),
  number: z.string().optional(),
  paid: z.number().int().optional(),
  status: z.enum(["UNSENT", "SENT", "PAID", "PARTIALLY_PAID", "VOID", "OVERDUE"]).optional(),
});
export const invoiceExportFieldsSchema = z.object({
  RTL: z.boolean().optional(),
  itemType: z.boolean().optional(),
  quantity: z.boolean().optional(),
  rtl: z.boolean().optional(),
  tax: z.boolean().optional(),
  tax2: z.boolean().optional(),
  unitPrice: z.boolean().optional(),
});
export const invoiceInfoSchema = z.object({
  amount: z.number().int().optional(),
  balance: z.number().int().optional(),
  billFrom: z.string().optional(),
  clientId: z.string().optional(),
  clientName: z.string().optional(),
  currency: z.string().optional(),
  daysOverdue: z.number().int().optional(),
  dueDate: z.string().datetime({ offset: true }).optional(),
  id: z.string().optional(),
  issuedDate: z.string().datetime({ offset: true }).optional(),
  number: z.string().optional(),
  paid: z.number().int().optional(),
  status: z.enum(["UNSENT", "SENT", "PAID", "PARTIALLY_PAID", "VOID", "OVERDUE"]).optional(),
  visibleZeroFields: z.lazy(() => visibleZeroFieldsInvoiceSchema).optional(),
});
export const invoiceInfoResponseSchema = z.object({
  invoices: z.array(invoiceInfoSchema).optional(),
  total: z.number().int().optional(),
});
export const invoiceItemSchema = z.object({
  amount: z.number().int().optional(),
  applyTaxes: z.lazy(() => applyTaxesSchema).optional(),
  description: z.string().optional(),
  expenseIds: z.array(z.string()).optional(),
  importType: z.enum(["NOT_IMPORTED", "TIME_ENTRY_IMPORT", "EXPENSE_IMPORT"]).optional(),
  itemType: z.string().optional(),
  order: z.number().int().optional(),
  quantity: z.number().int().optional(),
  timeEntryIds: z.array(z.string()).optional(),
  unitPrice: z.number().int().optional(),
});
export const invoiceOverviewSchema = z.object({
  amount: z.number().int().optional(),
  balance: z.number().int().optional(),
  billFrom: z.string().optional(),
  calculationType: z.lazy(() => calculationTypeSchema).optional(),
  clientAddress: z.string().optional(),
  clientId: z.string().optional(),
  clientName: z.string().optional(),
  companyId: z.string().optional(),
  containsImportedExpenses: z.boolean().optional(),
  containsImportedTimes: z.boolean().optional(),
  currency: z.string().optional(),
  discount: z.number().optional(),
  discountAmount: z.number().int().optional(),
  dueDate: z.string().datetime({ offset: true }).optional(),
  id: z.string().optional(),
  issuedDate: z.string().datetime({ offset: true }).optional(),
  items: z.array(invoiceItemSchema).optional(),
  note: z.string().optional(),
  number: z.string().optional(),
  paid: z.number().int().optional(),
  status: z.enum(["UNSENT", "SENT", "PAID", "PARTIALLY_PAID", "VOID", "OVERDUE"]).optional(),
  subject: z.string().optional(),
  subtotal: z.number().int().optional(),
  tax: z.number().optional(),
  tax2: z.number().optional(),
  tax2Amount: z.number().int().optional(),
  taxAmount: z.number().int().optional(),
  taxType: z.lazy(() => taxTypeSchema).optional(),
  userId: z.string().optional(),
  visibleZeroFields: z.lazy(() => visibleZeroFieldsInvoiceSchema).optional(),
});
export const invoicePaymentSchema = z.object({
  amount: z.number().int().optional(),
  author: z.string().optional(),
  date: z.string().datetime({ offset: true }).optional(),
  id: z.string().optional(),
  note: z.string().optional(),
});
export const invoiceSettingsSchema = z.object({
  defaults: invoiceDefaultSettingsSchema.optional(),
  exportFields: invoiceExportFieldsSchema.optional(),
  labels: z.lazy(() => labelsCustomizationSchema).optional(),
});
export const invoicesListSchema = z.object({
  invoices: z.array(invoiceSchema).optional(),
  total: z.number().int().optional(),
});
