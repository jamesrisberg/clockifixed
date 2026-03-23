// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface CustomFieldProjectDefaultValuesRequest {
  defaultValue?: Record<string, unknown>;
  status?: "INACTIVE" | "VISIBLE" | "INVISIBLE";
}
export interface CustomFieldRequest {
  allowedValues?: string[];
  description?: string;
  entityType?: "TIMEENTRY" | "USER";
  name: string;
  onlyAdminCanEdit?: boolean;
  placeholder?: string;
  status?: "INACTIVE" | "VISIBLE" | "INVISIBLE";
  type: "TXT" | "NUMBER" | "DROPDOWN_SINGLE" | "DROPDOWN_MULTIPLE" | "CHECKBOX" | "LINK";
  workspaceDefaultValue?: Record<string, unknown>;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const customFieldProjectDefaultValuesRequestSchema = z.object({
  defaultValue: z.record(z.string(), z.unknown()).optional(),
  status: z.enum(["INACTIVE", "VISIBLE", "INVISIBLE"]).optional(),
});
export const customFieldRequestSchema = z.object({
  allowedValues: z.array(z.string()).optional(),
  description: z.string().optional(),
  entityType: z.enum(["TIMEENTRY", "USER"]).optional(),
  name: z.string(),
  onlyAdminCanEdit: z.boolean().optional(),
  placeholder: z.string().optional(),
  status: z.enum(["INACTIVE", "VISIBLE", "INVISIBLE"]).optional(),
  type: z.enum(["TXT", "NUMBER", "DROPDOWN_SINGLE", "DROPDOWN_MULTIPLE", "CHECKBOX", "LINK"]),
  workspaceDefaultValue: z.record(z.string(), z.unknown()).optional(),
});
