/**
 * Endpoint check definitions — describes which endpoints to verify
 * and what schemas to validate against.
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
import {
  realProjectSchema,
  realTimeEntryWithRatesSchema,
  realWorkspaceSchema,
  realMemberProfileSchema,
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

  // ── Client ─────────────────────────────────────────────────────────
  {
    name: "List clients",
    tag: "Client",
    method: "GET",
    path: "/workspaces/{workspaceId}/clients",
    schema: clientWithCurrencySchema,
    array: true,
    readonly: true,
  },
  {
    name: "Get client by ID",
    tag: "Client",
    method: "GET",
    path: "/workspaces/{workspaceId}/clients/{id}",
    schema: clientWithCurrencySchema,
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
    array: true,
    readonly: true,
    requiresIdFrom: "List projects",
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

  // ── Custom Fields ──────────────────────────────────────────────────
  {
    name: "List custom fields",
    tag: "Custom Fields",
    method: "GET",
    path: "/workspaces/{workspaceId}/custom-fields",
    schema: customFieldSchema,
    array: true,
    readonly: true,
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

  // ── Policy ─────────────────────────────────────────────────────────
  {
    name: "List time-off policies",
    tag: "Policy",
    method: "GET",
    path: "/workspaces/{workspaceId}/time-off/policies",
    schema: policySchema,
    array: true,
    readonly: true,
  },

  // ── Webhooks ───────────────────────────────────────────────────────
  {
    name: "List webhooks",
    tag: "Webhook",
    method: "GET",
    path: "/workspaces/{workspaceId}/webhooks",
    schema: webhooksSchema,
    array: false,
    readonly: true,
  },

  // ── Member Profile ─────────────────────────────────────────────────
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
];
