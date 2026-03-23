// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface WebhookEventTriggerSourceType {
  _value: "PROJECT_ID" | "USER_ID" | "TAG_ID" | "TASK_ID" | "WORKSPACE_ID" | "ASSIGNMENT_ID" | "EXPENSE_ID";
}
export interface WebhookEventType {
  _value: "NEW_PROJECT" | "NEW_TASK" | "NEW_CLIENT" | "NEW_TIMER_STARTED" | "TIMER_STOPPED" | "TIME_ENTRY_UPDATED" | "TIME_ENTRY_DELETED" | "TIME_ENTRY_SPLIT" | "NEW_TIME_ENTRY" | "TIME_ENTRY_RESTORED" | "NEW_TAG" | "USER_DELETED_FROM_WORKSPACE" | "USER_JOINED_WORKSPACE" | "USER_DEACTIVATED_ON_WORKSPACE" | "USER_ACTIVATED_ON_WORKSPACE" | "USER_EMAIL_CHANGED" | "USER_UPDATED" | "NEW_INVOICE" | "INVOICE_UPDATED" | "NEW_APPROVAL_REQUEST" | "APPROVAL_REQUEST_STATUS_UPDATED" | "TIME_OFF_REQUESTED" | "TIME_OFF_REQUEST_UPDATED" | "TIME_OFF_REQUEST_APPROVED" | "TIME_OFF_REQUEST_REJECTED" | "TIME_OFF_REQUEST_WITHDRAWN" | "BALANCE_UPDATED" | "TAG_UPDATED" | "TAG_DELETED" | "TASK_UPDATED" | "CLIENT_UPDATED" | "TASK_DELETED" | "CLIENT_DELETED" | "EXPENSE_RESTORED" | "ASSIGNMENT_CREATED" | "ASSIGNMENT_DELETED" | "ASSIGNMENT_PUBLISHED" | "ASSIGNMENT_UPDATED" | "EXPENSE_CREATED" | "EXPENSE_DELETED" | "EXPENSE_UPDATED" | "PROJECT_UPDATED" | "PROJECT_DELETED" | "USER_GROUP_CREATED" | "USER_GROUP_UPDATED" | "USER_GROUP_DELETED" | "USERS_INVITED_TO_WORKSPACE" | "LIMITED_USERS_ADDED_TO_WORKSPACE" | "COST_RATE_UPDATED" | "BILLABLE_RATE_UPDATED";
}
export interface Webhook {
  authToken?: string;
  deliveryEnabled?: boolean;
  enabled?: boolean;
  id?: string;
  name?: string;
  triggerSource?: string[];
  triggerSourceType?: WebhookEventTriggerSourceType;
  url?: string;
  userId?: string;
  webhookEvent?: WebhookEventType;
  workspaceId?: string;
}
export interface WebhookLog {
  id?: string;
  requestBody?: string;
  respondedAt?: string;
  responseBody?: string;
  statusCode?: number;
  webhookEventStatusId?: string;
  webhookId?: string;
}
export interface Webhooks {
  webhooks?: Webhook[];
  workspaceWebhookCount?: number;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const webhookEventTriggerSourceTypeSchema = z.enum(["PROJECT_ID", "USER_ID", "TAG_ID", "TASK_ID", "WORKSPACE_ID", "ASSIGNMENT_ID", "EXPENSE_ID"]);
export const webhookEventTypeSchema = z.enum(["NEW_PROJECT", "NEW_TASK", "NEW_CLIENT", "NEW_TIMER_STARTED", "TIMER_STOPPED", "TIME_ENTRY_UPDATED", "TIME_ENTRY_DELETED", "TIME_ENTRY_SPLIT", "NEW_TIME_ENTRY", "TIME_ENTRY_RESTORED", "NEW_TAG", "USER_DELETED_FROM_WORKSPACE", "USER_JOINED_WORKSPACE", "USER_DEACTIVATED_ON_WORKSPACE", "USER_ACTIVATED_ON_WORKSPACE", "USER_EMAIL_CHANGED", "USER_UPDATED", "NEW_INVOICE", "INVOICE_UPDATED", "NEW_APPROVAL_REQUEST", "APPROVAL_REQUEST_STATUS_UPDATED", "TIME_OFF_REQUESTED", "TIME_OFF_REQUEST_UPDATED", "TIME_OFF_REQUEST_APPROVED", "TIME_OFF_REQUEST_REJECTED", "TIME_OFF_REQUEST_WITHDRAWN", "BALANCE_UPDATED", "TAG_UPDATED", "TAG_DELETED", "TASK_UPDATED", "CLIENT_UPDATED", "TASK_DELETED", "CLIENT_DELETED", "EXPENSE_RESTORED", "ASSIGNMENT_CREATED", "ASSIGNMENT_DELETED", "ASSIGNMENT_PUBLISHED", "ASSIGNMENT_UPDATED", "EXPENSE_CREATED", "EXPENSE_DELETED", "EXPENSE_UPDATED", "PROJECT_UPDATED", "PROJECT_DELETED", "USER_GROUP_CREATED", "USER_GROUP_UPDATED", "USER_GROUP_DELETED", "USERS_INVITED_TO_WORKSPACE", "LIMITED_USERS_ADDED_TO_WORKSPACE", "COST_RATE_UPDATED", "BILLABLE_RATE_UPDATED"]);
export const webhookSchema = z.object({
  authToken: z.string().optional(),
  deliveryEnabled: z.boolean().optional(),
  enabled: z.boolean().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  triggerSource: z.array(z.string()).optional(),
  triggerSourceType: webhookEventTriggerSourceTypeSchema.optional(),
  url: z.string().optional(),
  userId: z.string().optional(),
  webhookEvent: webhookEventTypeSchema.optional(),
  workspaceId: z.string().optional(),
});
export const webhookLogSchema = z.object({
  id: z.string().optional(),
  requestBody: z.string().optional(),
  respondedAt: z.string().optional(),
  responseBody: z.string().optional(),
  statusCode: z.number().int().optional(),
  webhookEventStatusId: z.string().optional(),
  webhookId: z.string().optional(),
});
export const webhooksSchema = z.object({
  webhooks: z.array(webhookSchema).optional(),
  workspaceWebhookCount: z.number().int().optional(),
});
