/**
 * Endpoint check definitions — describes which endpoints to verify
 * and what schemas to validate against.
 *
 * Coverage: every GET endpoint in the library (50 checks).
 */

import { z } from "zod";
import {
  workspaceSchema,
  userDtoV1Schema,
  clientWithCurrencySchema,
  clientSchema,
  projectDtoV1Schema,
  tagDtoV1Schema,
  taskSchema,
  userGroupSchema,
  timeEntryWithRatesSchema,
  timeEntryDtoImplV1Schema,
  customFieldSchema,
  holidayDtoV1Schema,
  policySchema,
  webhooksSchema,
  memberProfileSchema,
} from "../types/index.js";
import { approvalDetailsSchema } from "../types/models/approval.js";
import { expensesAndTotalsSchema, expenseSchema, expenseCategoriesWithCountSchema } from "../types/models/expense.js";
import { invoicesListSchema, invoiceOverviewSchema, invoicePaymentSchema, invoiceSettingsSchema } from "../types/models/invoice.js";
import { assignmentHydratedSchema } from "../types/models/assignment.js";
import { schedulingProjectsTotalsSchema, schedulingUsersTotalsSchema } from "../types/models/scheduling.js";
import { templateSchema } from "../types/models/template.js";
import { webhookSchema } from "../types/models/webhook.js";
import {
  realProjectSchema,
  realTimeEntryWithRatesSchema,
  realTimeEntrySchema,
  realWorkspaceSchema,
  realMemberProfileSchema,
  realClientSchema,
  realTaskSchema,
  realCustomFieldSchema,
  realPolicySchema,
} from "../types/overrides.js";

export type CheckMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface EndpointCheck {
  /** Human-readable name */
  name: string;
  /** API tag/domain */
  tag: string;
  /** HTTP method */
  method: CheckMethod;
  /** Path template (uses {workspaceId}, {id}, etc.) */
  path: string;
  /** Zod schema for the response (from OpenAPI spec) */
  schema: z.ZodType;
  /** Patched schema that matches what the API actually returns */
  realitySchema?: z.ZodType;
  /** If true, response is an array of schema items */
  array: boolean;
  /** If true, this is a read-only check (safe to run) */
  readonly: boolean;
  /** If set, this check requires an ID from a prior check */
  requiresIdFrom?: string;
  /** Request body for POST checks (filters/searches) */
  body?: unknown;
  /** Query params */
  params?: Record<string, string | number | boolean>;
  /** If true, skip this check (e.g., needs specific data) */
  skip?: boolean;
  /** Reason for skipping */
  skipReason?: string;
}

/**
 * All read-only endpoint checks — safe to run against any workspace.
 * Covers every GET endpoint in the library.
 */
export const readOnlyChecks: EndpointCheck[] = [
  // ── Workspace ──────────────────────────────────────────────────────
  {
    name: "List workspaces",
    tag: "Workspace",
    method: "GET",
    path: "/workspaces",
    schema: workspaceSchema,
    realitySchema: realWorkspaceSchema,
    array: true,
    readonly: true,
  },
  {
    name: "Get workspace",
    tag: "Workspace",
    method: "GET",
    path: "/workspaces/{workspaceId}",
    schema: workspaceSchema,
    realitySchema: realWorkspaceSchema,
    array: false,
    readonly: true,
  },

  // ── User ───────────────────────────────────────────────────────────
  {
    name: "Get logged user",
    tag: "User",
    method: "GET",
    path: "/user",
    schema: userDtoV1Schema,
    array: false,
    readonly: true,
  },
  {
    name: "List workspace users",
    tag: "User",
    method: "GET",
    path: "/workspaces/{workspaceId}/users",
    schema: userDtoV1Schema,
    array: true,
    readonly: true,
  },
  {
    name: "Get member profile",
    tag: "User",
    method: "GET",
    path: "/workspaces/{workspaceId}/member-profile/{userId}",
    schema: memberProfileSchema,
    realitySchema: realMemberProfileSchema,
    array: false,
    readonly: true,
    requiresIdFrom: "Get logged user",
  },
  {
    name: "Get user managers",
    tag: "User",
    method: "GET",
    path: "/workspaces/{workspaceId}/users/{userId}/managers",
    schema: userDtoV1Schema,
    array: true,
    readonly: true,
    requiresIdFrom: "Get logged user",
  },

  // ── Client ─────────────────────────────────────────────────────────
  {
    name: "List clients",
    tag: "Client",
    method: "GET",
    path: "/workspaces/{workspaceId}/clients",
    schema: clientWithCurrencySchema,
    realitySchema: realClientSchema,
    array: true,
    readonly: true,
  },
  {
    name: "Get client by ID",
    tag: "Client",
    method: "GET",
    path: "/workspaces/{workspaceId}/clients/{id}",
    schema: clientWithCurrencySchema,
    realitySchema: realClientSchema,
    array: false,
    readonly: true,
    requiresIdFrom: "List clients",
  },

  // ── Project ────────────────────────────────────────────────────────
  {
    name: "List projects",
    tag: "Project",
    method: "GET",
    path: "/workspaces/{workspaceId}/projects",
    schema: projectDtoV1Schema,
    realitySchema: realProjectSchema,
    array: true,
    readonly: true,
  },
  {
    name: "Get project by ID",
    tag: "Project",
    method: "GET",
    path: "/workspaces/{workspaceId}/projects/{projectId}",
    schema: projectDtoV1Schema,
    realitySchema: realProjectSchema,
    array: false,
    readonly: true,
    requiresIdFrom: "List projects",
  },

  // ── Tag ────────────────────────────────────────────────────────────
  {
    name: "List tags",
    tag: "Tag",
    method: "GET",
    path: "/workspaces/{workspaceId}/tags",
    schema: tagDtoV1Schema,
    array: true,
    readonly: true,
  },
  {
    name: "Get tag by ID",
    tag: "Tag",
    method: "GET",
    path: "/workspaces/{workspaceId}/tags/{id}",
    schema: tagDtoV1Schema,
    array: false,
    readonly: true,
    requiresIdFrom: "List tags",
  },

  // ── Task ───────────────────────────────────────────────────────────
  {
    name: "List tasks on project",
    tag: "Task",
    method: "GET",
    path: "/workspaces/{workspaceId}/projects/{projectId}/tasks",
    schema: taskSchema,
    realitySchema: realTaskSchema,
    array: true,
    readonly: true,
    requiresIdFrom: "List projects",
  },
  {
    name: "Get task by ID",
    tag: "Task",
    method: "GET",
    path: "/workspaces/{workspaceId}/projects/{projectId}/tasks/{taskId}",
    schema: taskSchema,
    realitySchema: realTaskSchema,
    array: false,
    readonly: true,
    requiresIdFrom: "List tasks on project",
  },

  // ── Group ──────────────────────────────────────────────────────────
  {
    name: "List groups",
    tag: "Group",
    method: "GET",
    path: "/workspaces/{workspaceId}/user-groups",
    schema: userGroupSchema,
    array: true,
    readonly: true,
  },

  // ── Time Entry ─────────────────────────────────────────────────────
  {
    name: "Get time entries for user",
    tag: "Time Entry",
    method: "GET",
    path: "/workspaces/{workspaceId}/user/{userId}/time-entries",
    schema: timeEntryWithRatesSchema,
    realitySchema: realTimeEntryWithRatesSchema,
    array: true,
    readonly: true,
    requiresIdFrom: "Get logged user",
  },
  {
    name: "Get time entry by ID",
    tag: "Time Entry",
    method: "GET",
    path: "/workspaces/{workspaceId}/time-entries/{timeEntryId}",
    schema: timeEntryWithRatesSchema,
    realitySchema: realTimeEntryWithRatesSchema,
    array: false,
    readonly: true,
    requiresIdFrom: "Get time entries for user",
  },
  {
    name: "Get in-progress time entry",
    tag: "Time Entry",
    method: "GET",
    path: "/workspaces/{workspaceId}/time-entries/status/in-progress",
    schema: timeEntryDtoImplV1Schema,
    realitySchema: realTimeEntrySchema,
    array: true,
    readonly: true,
  },

  // ── Approval ───────────────────────────────────────────────────────
  {
    name: "List approval requests",
    tag: "Approval",
    method: "GET",
    path: "/workspaces/{workspaceId}/approval-requests",
    schema: approvalDetailsSchema,
    array: true,
    readonly: true,
  },

  // ── Expense ────────────────────────────────────────────────────────
  {
    name: "List expenses",
    tag: "Expense",
    method: "GET",
    path: "/workspaces/{workspaceId}/expenses",
    schema: expensesAndTotalsSchema,
    array: false,
    readonly: true,
  },
  {
    name: "Get expense by ID",
    tag: "Expense",
    method: "GET",
    path: "/workspaces/{workspaceId}/expenses/{expenseId}",
    schema: expenseSchema,
    array: false,
    readonly: true,
    requiresIdFrom: "List expenses",
  },
  {
    name: "List expense categories",
    tag: "Expense",
    method: "GET",
    path: "/workspaces/{workspaceId}/expenses/categories",
    schema: expenseCategoriesWithCountSchema,
    array: false,
    readonly: true,
  },

  // ── Invoice ────────────────────────────────────────────────────────
  {
    name: "List invoices",
    tag: "Invoice",
    method: "GET",
    path: "/workspaces/{workspaceId}/invoices",
    schema: invoicesListSchema,
    array: false,
    readonly: true,
  },
  {
    name: "Get invoice by ID",
    tag: "Invoice",
    method: "GET",
    path: "/workspaces/{workspaceId}/invoices/{invoiceId}",
    schema: invoiceOverviewSchema,
    array: false,
    readonly: true,
    requiresIdFrom: "List invoices",
  },
  {
    name: "Get invoice payments",
    tag: "Invoice",
    method: "GET",
    path: "/workspaces/{workspaceId}/invoices/{invoiceId}/payments",
    schema: invoicePaymentSchema,
    array: true,
    readonly: true,
    requiresIdFrom: "List invoices",
  },
  {
    name: "Get invoice settings",
    tag: "Invoice",
    method: "GET",
    path: "/workspaces/{workspaceId}/invoices/settings",
    schema: invoiceSettingsSchema,
    array: false,
    readonly: true,
  },

  // ── Webhook ────────────────────────────────────────────────────────
  {
    name: "List webhooks",
    tag: "Webhook",
    method: "GET",
    path: "/workspaces/{workspaceId}/webhooks",
    schema: webhooksSchema,
    array: false,
    readonly: true,
  },
  {
    name: "Get webhook by ID",
    tag: "Webhook",
    method: "GET",
    path: "/workspaces/{workspaceId}/webhooks/{webhookId}",
    schema: webhookSchema,
    array: false,
    readonly: true,
    requiresIdFrom: "List webhooks",
  },

  // ── Holiday ────────────────────────────────────────────────────────
  {
    name: "List holidays",
    tag: "Holiday",
    method: "GET",
    path: "/workspaces/{workspaceId}/holidays",
    schema: holidayDtoV1Schema,
    array: true,
    readonly: true,
  },
  // holidays/in-period skipped: requires dynamic assigned-to=userId param, same schema as List holidays

  // ── Custom Fields ──────────────────────────────────────────────────
  {
    name: "List custom fields",
    tag: "Custom Fields",
    method: "GET",
    path: "/workspaces/{workspaceId}/custom-fields",
    schema: customFieldSchema,
    realitySchema: realCustomFieldSchema,
    array: true,
    readonly: true,
  },
  {
    name: "List custom fields for project",
    tag: "Custom Fields",
    method: "GET",
    path: "/workspaces/{workspaceId}/projects/{projectId}/custom-fields",
    schema: customFieldSchema,
    realitySchema: realCustomFieldSchema,
    array: true,
    readonly: true,
    requiresIdFrom: "List projects",
  },

  // ── Policy ─────────────────────────────────────────────────────────
  {
    name: "List time-off policies",
    tag: "Policy",
    method: "GET",
    path: "/workspaces/{workspaceId}/time-off/policies",
    schema: policySchema,
    realitySchema: realPolicySchema,
    array: true,
    readonly: true,
  },
  {
    name: "Get time-off policy by ID",
    tag: "Policy",
    method: "GET",
    path: "/workspaces/{workspaceId}/time-off/policies/{policyId}",
    schema: policySchema,
    realitySchema: realPolicySchema,
    array: false,
    readonly: true,
    requiresIdFrom: "List time-off policies",
  },

  // ── Scheduling ─────────────────────────────────────────────────────
  {
    name: "List all assignments",
    tag: "Scheduling",
    method: "GET",
    path: "/workspaces/{workspaceId}/scheduling/assignments/all",
    schema: assignmentHydratedSchema,
    array: true,
    readonly: true,
    params: { start: "2020-01-01T00:00:00Z", end: "2030-01-01T00:00:00Z" },
  },
  {
    name: "Get scheduling project totals",
    tag: "Scheduling",
    method: "GET",
    path: "/workspaces/{workspaceId}/scheduling/assignments/projects/totals/{projectId}",
    schema: schedulingProjectsTotalsSchema,
    array: false,
    readonly: true,
    requiresIdFrom: "List projects",
    params: { start: "2020-01-01T00:00:00Z", end: "2030-01-01T00:00:00Z" },
  },
  {
    name: "Get scheduling user totals",
    tag: "Scheduling",
    method: "GET",
    path: "/workspaces/{workspaceId}/scheduling/assignments/users/{userId}/totals",
    schema: schedulingUsersTotalsSchema,
    array: false,
    readonly: true,
    requiresIdFrom: "Get logged user",
    params: { start: "2020-01-01T00:00:00Z", end: "2030-01-01T00:00:00Z" },
  },

  // ── Shared Reports ─────────────────────────────────────────────────
  {
    name: "List shared reports",
    tag: "Shared Reports",
    method: "GET",
    path: "/workspaces/{workspaceId}/shared-reports",
    schema: z.unknown(),
    array: true,
    readonly: true,
  },
  {
    name: "Get shared report by ID",
    tag: "Shared Reports",
    method: "GET",
    path: "/shared-reports/{sharedReportId}",
    schema: z.unknown(),
    array: false,
    readonly: true,
    requiresIdFrom: "List shared reports",
  },

  // ── Templates ──────────────────────────────────────────────────────
  {
    name: "List templates",
    tag: "Templates",
    method: "GET",
    path: "/workspaces/{workspaceId}/templates",
    schema: templateSchema,
    array: true,
    readonly: true,
  },
  {
    name: "Get template by ID",
    tag: "Templates",
    method: "GET",
    path: "/workspaces/{workspaceId}/templates/{templateId}",
    schema: templateSchema,
    array: false,
    readonly: true,
    requiresIdFrom: "List templates",
  },

  // ── Entity Changes ─────────────────────────────────────────────────
  {
    name: "Get created entities",
    tag: "Entity Changes",
    method: "GET",
    path: "/workspaces/{workspaceId}/entities/created",
    schema: z.unknown(),
    array: false,
    readonly: true,
    params: { type: "TIME_ENTRY", start: "2020-01-01T00:00:00Z", end: "2030-01-01T00:00:00Z" },
  },
  {
    name: "Get updated entities",
    tag: "Entity Changes",
    method: "GET",
    path: "/workspaces/{workspaceId}/entities/updated",
    schema: z.unknown(),
    array: false,
    readonly: true,
    params: { type: "TIME_ENTRY", start: "2020-01-01T00:00:00Z", end: "2030-01-01T00:00:00Z" },
  },
  {
    name: "Get deleted entities",
    tag: "Entity Changes",
    method: "GET",
    path: "/workspaces/{workspaceId}/entities/deleted",
    schema: z.unknown(),
    array: false,
    readonly: true,
    params: { type: "TIME_ENTRY", start: "2020-01-01T00:00:00Z", end: "2030-01-01T00:00:00Z" },
  },

  // ── Balances ───────────────────────────────────────────────────────
  {
    name: "Get balances for user",
    tag: "Balance",
    method: "GET",
    path: "/workspaces/{workspaceId}/time-off/balance/user/{userId}",
    schema: z.unknown(),
    array: false,
    readonly: true,
    requiresIdFrom: "Get logged user",
  },
  {
    name: "Get balances for policy",
    tag: "Balance",
    method: "GET",
    path: "/workspaces/{workspaceId}/time-off/balance/policy/{policyId}",
    schema: z.unknown(),
    array: false,
    readonly: true,
    requiresIdFrom: "List time-off policies",
  },
];
