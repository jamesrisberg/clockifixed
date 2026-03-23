// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { AuditMetadata, auditMetadataSchema } from "./audit.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface CustomFieldDefaultValues {
  projectId?: string;
  status?: string;
  value?: Record<string, unknown>;
}
export interface CustomField {
  allowedValues?: string[];
  description?: string;
  entityType?: string;
  id?: string;
  name?: string;
  onlyAdminCanEdit?: boolean;
  placeholder?: string;
  projectDefaultValues?: CustomFieldDefaultValues[];
  required?: boolean;
  status?: string;
  type?: string;
  workspaceDefaultValue?: Record<string, unknown>;
  workspaceId?: string;
}
export interface CustomFieldType {
  _value: "TXT" | "NUMBER" | "DROPDOWN_SINGLE" | "DROPDOWN_MULTIPLE" | "CHECKBOX" | "LINK";
}
export interface CustomFieldValueDto {
  customFieldId?: string;
  sourceType?: "WORKSPACE" | "PROJECT" | "TIMEENTRY";
  timeEntryId?: string;
  value?: Record<string, unknown>;
}
export interface CustomFieldValueDtoV1 {
  customFieldId?: string;
  name?: string;
  timeEntryId?: string;
  type?: string;
  value?: Record<string, unknown>;
}
export interface CustomFieldValueUpdatedInfo {
  auditMetadata?: AuditMetadata;
  customFieldId?: string;
  documentType?: "TIME_ENTRY" | "TIME_ENTRY_CUSTOM_FIELD_VALUE" | "CUSTOM_ATTRIBUTE" | "EXPENSE" | "CUSTOM_FIELDS" | "TIME_ENTRY_RATE";
  id?: string;
  sourceType?: string;
  timeEntryId?: string;
  value?: Record<string, unknown>;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const customFieldDefaultValuesSchema = z.object({
  projectId: z.string().optional(),
  status: z.string().optional(),
  value: z.record(z.string(), z.unknown()).optional(),
});
export const customFieldSchema = z.object({
  allowedValues: z.array(z.string()).optional(),
  description: z.string().optional(),
  entityType: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  onlyAdminCanEdit: z.boolean().optional(),
  placeholder: z.string().optional(),
  projectDefaultValues: z.array(customFieldDefaultValuesSchema).optional(),
  required: z.boolean().optional(),
  status: z.string().optional(),
  type: z.string().optional(),
  workspaceDefaultValue: z.record(z.string(), z.unknown()).optional(),
  workspaceId: z.string().optional(),
});
export const customFieldTypeSchema = z.enum(["TXT", "NUMBER", "DROPDOWN_SINGLE", "DROPDOWN_MULTIPLE", "CHECKBOX", "LINK"]);
export const customFieldValueDtoSchema = z.object({
  customFieldId: z.string().optional(),
  sourceType: z.enum(["WORKSPACE", "PROJECT", "TIMEENTRY"]).optional(),
  timeEntryId: z.string().optional(),
  value: z.record(z.string(), z.unknown()).optional(),
});
export const customFieldValueDtoV1Schema = z.object({
  customFieldId: z.string().optional(),
  name: z.string().optional(),
  timeEntryId: z.string().optional(),
  type: z.string().optional(),
  value: z.record(z.string(), z.unknown()).optional(),
});
export const customFieldValueUpdatedInfoSchema = z.object({
  auditMetadata: z.lazy(() => auditMetadataSchema).optional(),
  customFieldId: z.string().optional(),
  documentType: z.enum(["TIME_ENTRY", "TIME_ENTRY_CUSTOM_FIELD_VALUE", "CUSTOM_ATTRIBUTE", "EXPENSE", "CUSTOM_FIELDS", "TIME_ENTRY_RATE"]).optional(),
  id: z.string().optional(),
  sourceType: z.string().optional(),
  timeEntryId: z.string().optional(),
  value: z.record(z.string(), z.unknown()).optional(),
});
