// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { BaseFilterRequest, ContainsArchivedFilterRequest, TimeRangeRequest, baseFilterRequestSchema, containsArchivedFilterRequestSchema, timeRangeRequestSchema } from "./common.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface InvoiceDefaultSettingsRequest {
  companyId?: string;
  dueDays?: number;
  itemTypeId?: string;
  notes: string;
  subject: string;
  tax2Percent?: number;
  taxPercent?: number;
  taxType?: "COMPOUND" | "SIMPLE" | "NONE";
}
export interface InvoiceExportFieldsRequest {
  itemType?: boolean;
  quantity?: boolean;
  rtl?: boolean;
  tax?: boolean;
  tax2?: boolean;
  unitPrice?: boolean;
}
export interface InvoiceFilterRequest {
  clients?: ContainsArchivedFilterRequest;
  companies?: BaseFilterRequest;
  exactAmount?: number;
  exactBalance?: number;
  greaterThanAmount?: number;
  greaterThanBalance?: number;
  invoiceNumber?: string;
  issueDate?: TimeRangeRequest;
  lessThanAmount?: number;
  lessThanBalance?: number;
  page?: number;
  pageSize?: number;
  sortColumn?: "ID" | "CLIENT" | "DUE_ON" | "ISSUE_DATE" | "AMOUNT" | "BALANCE";
  sortOrder?: "ASCENDING" | "DESCENDING";
  statuses?: ("UNSENT" | "SENT" | "PAID" | "PARTIALLY_PAID" | "VOID" | "OVERDUE")[];
  strictSearch?: boolean;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const invoiceDefaultSettingsRequestSchema = z.object({
  companyId: z.string().optional(),
  dueDays: z.number().int().optional(),
  itemTypeId: z.string().optional(),
  notes: z.string(),
  subject: z.string(),
  tax2Percent: z.number().optional(),
  taxPercent: z.number().optional(),
  taxType: z.enum(["COMPOUND", "SIMPLE", "NONE"]).optional(),
});
export const invoiceExportFieldsRequestSchema = z.object({
  itemType: z.boolean().optional(),
  quantity: z.boolean().optional(),
  rtl: z.boolean().optional(),
  tax: z.boolean().optional(),
  tax2: z.boolean().optional(),
  unitPrice: z.boolean().optional(),
});
export const invoiceFilterRequestSchema = z.object({
  clients: z.lazy(() => containsArchivedFilterRequestSchema).optional(),
  companies: z.lazy(() => baseFilterRequestSchema).optional(),
  exactAmount: z.number().int().optional(),
  exactBalance: z.number().int().optional(),
  greaterThanAmount: z.number().int().optional(),
  greaterThanBalance: z.number().int().optional(),
  invoiceNumber: z.string().optional(),
  issueDate: z.lazy(() => timeRangeRequestSchema).optional(),
  lessThanAmount: z.number().int().optional(),
  lessThanBalance: z.number().int().optional(),
  page: z.number().int().optional(),
  pageSize: z.number().int().optional(),
  sortColumn: z.enum(["ID", "CLIENT", "DUE_ON", "ISSUE_DATE", "AMOUNT", "BALANCE"]).optional(),
  sortOrder: z.enum(["ASCENDING", "DESCENDING"]).optional(),
  statuses: z.array(z.enum(["UNSENT", "SENT", "PAID", "PARTIALLY_PAID", "VOID", "OVERDUE"])).optional(),
  strictSearch: z.boolean().optional(),
});
