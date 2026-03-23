// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { AccountStatus, SummaryReportSettings, accountStatusSchema, summaryReportSettingsSchema } from "./common.js";
import { CustomField, CustomFieldType, customFieldSchema, customFieldTypeSchema } from "./custom-field.js";
import { Membership, membershipSchema } from "./member.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface UserCustomFieldValue {
  customFieldId?: string;
  customFieldName?: string;
  customFieldType?: CustomFieldType;
  userId?: string;
  value?: Record<string, unknown>;
}
export interface UserCustomFieldValueFull {
  customField?: CustomField;
  customFieldId?: string;
  name?: string;
  sourceType?: "WORKSPACE" | "USER";
  type?: "TXT" | "NUMBER" | "DROPDOWN_SINGLE" | "DROPDOWN_MULTIPLE" | "CHECKBOX" | "LINK";
  userId?: string;
  value?: Record<string, unknown>;
}
export interface UserSettings {
  alerts?: boolean;
  approval?: boolean;
  collapseAllProjectLists?: boolean;
  dashboardPinToTop?: boolean;
  dashboardSelection?: "ME" | "TEAM";
  dashboardViewType?: "PROJECT" | "BILLABILITY";
  dateFormat: string;
  groupSimilarEntriesDisabled?: boolean;
  invoiceReminders?: boolean;
  isCompactViewOn?: boolean;
  lang?: string;
  longRunning?: boolean;
  multiFactorEnabled?: boolean;
  myStartOfDay?: string;
  onboarding?: boolean;
  projectListCollapse?: number;
  projectPickerTaskFilter?: boolean;
  pto?: boolean;
  reminders?: boolean;
  scheduledReports?: boolean;
  scheduling?: boolean;
  sendNewsletter?: boolean;
  showOnlyWorkingDays?: boolean;
  summaryReportSettings?: SummaryReportSettings;
  theme?: "DARK" | "DEFAULT";
  timeFormat: "HOUR12" | "HOUR24";
  timeTrackingManual?: boolean;
  timeZone: string;
  weekStart?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  weeklyUpdates?: boolean;
}
export interface UserDtoV1 {
  activeWorkspace?: string;
  customFields?: UserCustomFieldValue[];
  defaultWorkspace?: string;
  email?: string;
  id?: string;
  memberships?: Membership[];
  name?: string;
  profilePicture?: string;
  settings?: UserSettings;
  status?: AccountStatus;
}
export interface UserRedacted {
  id?: string;
  name?: string;
}
export interface UserGroup {
  id?: string;
  name?: string;
  teamManagers?: UserRedacted[];
  userIds?: string[];
  workspaceId?: string;
}
export interface UserGroupIdsSchema {
  contains?: "CONTAINS" | "DOES_NOT_CONTAIN";
  ids?: string[];
  status?: "ALL" | "ACTIVE" | "INACTIVE";
}
export interface UserIdsSchema {
  contains?: "CONTAINS" | "DOES_NOT_CONTAIN";
  ids?: string[];
  status?: "ALL" | "ACTIVE" | "INACTIVE";
}
export interface UserDto {
  dateFormat?: string;
  email?: string;
  id?: string;
  name?: string;
  timeFormat?: string;
  timeZone?: string;
  weekStart?: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const userCustomFieldValueSchema = z.object({
  customFieldId: z.string().optional(),
  customFieldName: z.string().optional(),
  customFieldType: z.lazy(() => customFieldTypeSchema).optional(),
  userId: z.string().optional(),
  value: z.record(z.string(), z.unknown()).optional(),
});
export const userCustomFieldValueFullSchema = z.object({
  customField: z.lazy(() => customFieldSchema).optional(),
  customFieldId: z.string().optional(),
  name: z.string().optional(),
  sourceType: z.enum(["WORKSPACE", "USER"]).optional(),
  type: z.enum(["TXT", "NUMBER", "DROPDOWN_SINGLE", "DROPDOWN_MULTIPLE", "CHECKBOX", "LINK"]).optional(),
  userId: z.string().optional(),
  value: z.record(z.string(), z.unknown()).optional(),
});
export const userSettingsSchema = z.object({
  alerts: z.boolean().optional(),
  approval: z.boolean().optional(),
  collapseAllProjectLists: z.boolean().optional(),
  dashboardPinToTop: z.boolean().optional(),
  dashboardSelection: z.enum(["ME", "TEAM"]).optional(),
  dashboardViewType: z.enum(["PROJECT", "BILLABILITY"]).optional(),
  dateFormat: z.string(),
  groupSimilarEntriesDisabled: z.boolean().optional(),
  invoiceReminders: z.boolean().optional(),
  isCompactViewOn: z.boolean().optional(),
  lang: z.string().optional(),
  longRunning: z.boolean().optional(),
  multiFactorEnabled: z.boolean().optional(),
  myStartOfDay: z.string().optional(),
  onboarding: z.boolean().optional(),
  projectListCollapse: z.number().int().optional(),
  projectPickerTaskFilter: z.boolean().optional(),
  pto: z.boolean().optional(),
  reminders: z.boolean().optional(),
  scheduledReports: z.boolean().optional(),
  scheduling: z.boolean().optional(),
  sendNewsletter: z.boolean().optional(),
  showOnlyWorkingDays: z.boolean().optional(),
  summaryReportSettings: z.lazy(() => summaryReportSettingsSchema).optional(),
  theme: z.enum(["DARK", "DEFAULT"]).optional(),
  timeFormat: z.enum(["HOUR12", "HOUR24"]),
  timeTrackingManual: z.boolean().optional(),
  timeZone: z.string(),
  weekStart: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]).optional(),
  weeklyUpdates: z.boolean().optional(),
});
export const userDtoV1Schema = z.object({
  activeWorkspace: z.string().optional(),
  customFields: z.array(userCustomFieldValueSchema).optional(),
  defaultWorkspace: z.string().optional(),
  email: z.string().optional(),
  id: z.string().optional(),
  memberships: z.array(z.lazy(() => membershipSchema)).optional(),
  name: z.string().optional(),
  profilePicture: z.string().optional(),
  settings: userSettingsSchema.optional(),
  status: z.lazy(() => accountStatusSchema).optional(),
});
export const userRedactedSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});
export const userGroupSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  teamManagers: z.array(userRedactedSchema).optional(),
  userIds: z.array(z.string()).optional(),
  workspaceId: z.string().optional(),
});
export const userGroupIdsSchemaSchema = z.object({
  contains: z.enum(["CONTAINS", "DOES_NOT_CONTAIN"]).optional(),
  ids: z.array(z.string()).optional(),
  status: z.enum(["ALL", "ACTIVE", "INACTIVE"]).optional(),
});
export const userIdsSchemaSchema = z.object({
  contains: z.enum(["CONTAINS", "DOES_NOT_CONTAIN"]).optional(),
  ids: z.array(z.string()).optional(),
  status: z.enum(["ALL", "ACTIVE", "INACTIVE"]).optional(),
});
export const userDtoSchema = z.object({
  dateFormat: z.string().optional(),
  email: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  timeFormat: z.string().optional(),
  timeZone: z.string().optional(),
  weekStart: z.string().optional(),
});
