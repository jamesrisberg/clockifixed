// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { TaxType, taxTypeSchema } from "../models/common.js";
import { PolicyApproval, policyApprovalSchema } from "../models/policy.js";
import { TimeEntryId, timeEntryIdSchema } from "../models/time-entry.js";
import { UserGroupIdsSchema, UserIdsSchema, userGroupIdsSchemaSchema, userIdsSchemaSchema } from "../models/user.js";
import { InvoiceDefaultSettingsRequest, InvoiceExportFieldsRequest, invoiceDefaultSettingsRequestSchema, invoiceExportFieldsRequestSchema } from "./invoice.js";
import { TimeOffRequestPeriodV1Request, timeOffRequestPeriodV1RequestSchema } from "./time-off.js";
import { UserIdWithRatesRequest, userIdWithRatesRequestSchema } from "./user.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface AddUserToWorkspaceRequest {
  email: string;
}
export interface AddUsersToProjectRequest {
  remove?: boolean;
  userGroups?: UserGroupIdsSchema;
  userIds?: string[];
}
export interface AutomaticAccrualRequest {
  amount: number;
  period?: "MONTH" | "YEAR";
  timeUnit?: "DAYS" | "HOURS";
}
export interface DefaultEntitiesRequest {
  projectId?: string;
  taskId?: string;
}
export interface AutomaticTimeEntryCreationRequest {
  defaultEntities: DefaultEntitiesRequest;
  enabled?: boolean;
}
export interface BaseFilterRequest {
  contains?: "CONTAINS" | "DOES_NOT_CONTAIN" | "CONTAINS_ONLY";
  ids?: string[];
}
export interface ChangeInvoiceStatusRequest {
  invoiceStatus?: "UNSENT" | "SENT" | "PAID" | "PARTIALLY_PAID" | "VOID" | "OVERDUE";
}
export interface ChangePolicyStatusRequest {
  status: "ACTIVE" | "ARCHIVED" | "ALL";
}
export interface ContainsArchivedFilterRequest {
  contains?: "CONTAINS" | "DOES_NOT_CONTAIN" | "CONTAINS_ONLY";
  ids?: string[];
  status?: "ACTIVE" | "ARCHIVED" | "ALL";
}
export interface ContainsUserGroupFilterRequest {
  contains?: "CONTAINS" | "DOES_NOT_CONTAIN" | "CONTAINS_ONLY";
  ids?: string[];
  status?: "PENDING" | "ACTIVE" | "DECLINED" | "INACTIVE" | "ALL";
}
export interface ContainsUserGroupFilterRequestV1 {
  contains?: "CONTAINS" | "DOES_NOT_CONTAIN" | "CONTAINS_ONLY";
  ids?: string[];
  status?: "PENDING" | "ACTIVE" | "DECLINED" | "INACTIVE" | "ALL";
}
export interface ContainsUsersFilterRequestForHoliday {
  contains?: "CONTAINS" | "DOES_NOT_CONTAIN" | "CONTAINS_ONLY";
  ids?: string[];
  status?: "ALL" | "ACTIVE" | "INACTIVE";
  statuses?: string[];
}
export interface ContainsUsersFilterRequest {
  contains?: "CONTAINS" | "DOES_NOT_CONTAIN" | "CONTAINS_ONLY";
  ids?: string[];
  sourceType?: "USER_GROUP";
  status?: "PENDING" | "ACTIVE" | "DECLINED" | "INACTIVE" | "ALL";
  statuses?: ("PENDING" | "ACTIVE" | "DECLINED" | "INACTIVE" | "ALL")[];
}
export interface CopyAssignmentRequest {
  seriesUpdateOption?: "THIS_ONE" | "THIS_AND_FOLLOWING" | "ALL";
  userId: string;
}
export interface CostRateRequest {
  amount?: number;
  since?: string;
  sinceAsInstant?: string;
}
export interface CostRateRequestV1 {
  amount: number;
  since?: string;
}
export interface CreateApprovalRequest {
  period?: "WEEKLY" | "SEMI_MONTHLY" | "MONTHLY";
  periodStart: string;
}
export interface CreateClientRequest {
  address?: string;
  email?: string;
  name?: string;
  note?: string;
}
export interface CreateCustomAttributeRequest {
  name: string;
  namespace: string;
  value: string;
}
export interface CreateExpenseV1Request {
  amount: number;
  billable?: boolean;
  categoryId: string;
  date: string;
  file: Blob | Uint8Array;
  notes?: string;
  projectId: string;
  taskId?: string;
  userId: string;
}
export interface DatePeriodRequest {
  endDate: string;
  startDate: string;
}
export interface CreateHolidayRequest {
  automaticTimeEntryCreation?: AutomaticTimeEntryCreationRequest;
  color?: string;
  datePeriod: DatePeriodRequest;
  everyoneIncludingNew?: boolean;
  name: string;
  occursAnnually?: boolean;
  userGroups?: UserGroupIdsSchema;
  users?: UserIdsSchema;
}
export interface CreateInvoiceItemRequest {
  applyTaxes: "TAX1" | "TAX2" | "TAX1TAX2" | "NONE";
  description: string;
  itemType: string;
  quantity: number;
  unitPrice: number;
}
export interface CreateInvoicePaymentRequest {
  amount?: number;
  note?: string;
  paymentDate?: string;
}
export interface CreateInvoiceRequest {
  clientId: string;
  currency: string;
  dueDate: string;
  issuedDate: string;
  number: string;
}
export interface NegativeBalanceRequest {
  amount: number;
  amountValidForTimeUnit?: boolean;
  period?: "MONTH" | "YEAR";
  shouldReset?: boolean;
  timeUnit?: "DAYS" | "HOURS";
}
export interface CreatePolicyRequest {
  allowHalfDay?: boolean;
  allowNegativeBalance?: boolean;
  approve: PolicyApproval;
  archived?: boolean;
  automaticAccrual?: AutomaticAccrualRequest;
  automaticTimeEntryCreation?: AutomaticTimeEntryCreationRequest;
  color?: string;
  everyoneIncludingNew?: boolean;
  hasExpiration?: boolean;
  icon?: "UMBRELLA" | "SNOWFLAKE" | "FAMILY" | "PLANE" | "STETHOSCOPE" | "HEALTH_METRICS" | "CHILDCARE" | "LUGGAGE" | "MONETIZATION" | "CALENDAR";
  name: string;
  negativeBalance?: NegativeBalanceRequest;
  timeUnit?: "DAYS" | "HOURS";
  userGroups?: UserGroupIdsSchema;
  users?: UserIdsSchema;
}
export interface UpdateCustomFieldRequest {
  customFieldId: string;
  sourceType?: "WORKSPACE" | "PROJECT" | "TIMEENTRY";
  value?: Record<string, unknown>;
}
export interface CreateTimeEntryRequest {
  billable?: boolean;
  customAttributes?: CreateCustomAttributeRequest[];
  customFields?: UpdateCustomFieldRequest[];
  description?: string;
  end?: string;
  projectId?: string;
  start?: string;
  tagIds?: string[];
  taskId?: string;
  type?: "REGULAR" | "BREAK";
}
export interface CreateTimeOffRequestV1Request {
  note?: string;
  timeOffPeriod: TimeOffRequestPeriodV1Request;
}
export interface CreateWebhookRequest {
  name?: string;
  triggerSource: string[];
  triggerSourceType: "PROJECT_ID" | "USER_ID" | "TAG_ID" | "TASK_ID" | "WORKSPACE_ID" | "ASSIGNMENT_ID" | "EXPENSE_ID";
  url: string;
  webhookEvent: "NEW_PROJECT" | "NEW_TASK" | "NEW_CLIENT" | "NEW_TIMER_STARTED" | "TIMER_STOPPED" | "TIME_ENTRY_UPDATED" | "TIME_ENTRY_DELETED" | "TIME_ENTRY_SPLIT" | "NEW_TIME_ENTRY" | "TIME_ENTRY_RESTORED" | "NEW_TAG" | "USER_DELETED_FROM_WORKSPACE" | "USER_JOINED_WORKSPACE" | "USER_DEACTIVATED_ON_WORKSPACE" | "USER_ACTIVATED_ON_WORKSPACE" | "USER_EMAIL_CHANGED" | "USER_UPDATED" | "NEW_INVOICE" | "INVOICE_UPDATED" | "NEW_APPROVAL_REQUEST" | "APPROVAL_REQUEST_STATUS_UPDATED" | "TIME_OFF_REQUESTED" | "TIME_OFF_REQUEST_UPDATED" | "TIME_OFF_REQUEST_APPROVED" | "TIME_OFF_REQUEST_REJECTED" | "TIME_OFF_REQUEST_WITHDRAWN" | "BALANCE_UPDATED" | "TAG_UPDATED" | "TAG_DELETED" | "TASK_UPDATED" | "CLIENT_UPDATED" | "TASK_DELETED" | "CLIENT_DELETED" | "EXPENSE_RESTORED" | "ASSIGNMENT_CREATED" | "ASSIGNMENT_DELETED" | "ASSIGNMENT_PUBLISHED" | "ASSIGNMENT_UPDATED" | "EXPENSE_CREATED" | "EXPENSE_DELETED" | "EXPENSE_UPDATED" | "PROJECT_UPDATED" | "PROJECT_DELETED" | "USER_GROUP_CREATED" | "USER_GROUP_UPDATED" | "USER_GROUP_DELETED" | "USERS_INVITED_TO_WORKSPACE" | "LIMITED_USERS_ADDED_TO_WORKSPACE" | "COST_RATE_UPDATED" | "BILLABLE_RATE_UPDATED";
}
export interface CreateWorkspaceRequest {
  name?: string;
  organizationId?: string;
}
export interface GetTimeOffRequestsV1Request {
  end?: string;
  page?: number;
  pageSize?: number;
  start?: string;
  statuses?: ("PENDING" | "APPROVED" | "REJECTED" | "ALL")[];
  userGroups?: string[];
  users?: string[];
}
export interface GetUserTotalsRequest {
  end: string;
  page?: number;
  pageSize?: number;
  search?: string;
  start: string;
  statusFilter?: "PUBLISHED" | "UNPUBLISHED" | "ALL";
  userFilter?: ContainsUsersFilterRequest;
  userGroupFilter?: ContainsUserGroupFilterRequestV1;
}
export interface GetUsersRequest {
  accountStatuses?: string[];
  email?: string;
  includeRoles?: boolean;
  memberships?: "ALL" | "NONE" | "WORKSPACE" | "PROJECT" | "USERGROUP";
  name?: string;
  page?: number;
  pageSize?: number;
  projectId?: string;
  roles?: ("WORKSPACE_ADMIN" | "OWNER" | "TEAM_MANAGER" | "PROJECT_MANAGER")[];
  sortColumn?: "ID" | "EMAIL" | "NAME" | "NAME_LOWERCASE" | "ACCESS" | "HOURLYRATE" | "COSTRATE";
  sortOrder?: "ASCENDING" | "DESCENDING";
  status?: "PENDING" | "ACTIVE" | "DECLINED" | "INACTIVE" | "ALL";
  userGroups?: string[];
}
export interface HourlyRateRequest {
  amount: number;
  since?: string;
}
export interface HourlyRateRequestV1 {
  amount: number;
  since?: string;
}
export interface ImportTimeEntriesAndExpensesRequest {
  expenseFieldsForDetailedGroup?: ("PROJECT" | "TASK" | "CATEGORY" | "NOTE" | "DATE" | "USER")[];
  expensesGroupBy?: "CATEGORY" | "PROJECT" | "USER";
  expensesGroupType?: "GROUPED" | "DETAILED";
  from: string;
  importExpenses: boolean;
  projectFilter: ContainsArchivedFilterRequest;
  roundTimeEntryDuration?: boolean;
  timeEntryFieldsForDetailedGroup?: ("PROJECT" | "TASK" | "TAGS" | "DESCRIPTION" | "DATE" | "USER")[];
  timeEntryGroupType: "SINGLE_ITEM" | "GROUPED" | "DETAILED";
  timeEntryPrimaryGroupBy?: "USER" | "PROJECT" | "DATE";
  timeEntrySecondaryGroupBy?: "PROJECT" | "USER" | "TASK" | "DATE" | "DESCRIPTION" | "NONE";
  to: string;
}
export interface LabelsCustomizationRequest {
  amount: string;
  billFrom: string;
  billTo: string;
  description: string;
  discount: string;
  dueDate: string;
  issueDate: string;
  itemType: string;
  notes: string;
  paid: string;
  quantity: string;
  subtotal: string;
  tax: string;
  tax2: string;
  total: string;
  totalAmountDue: string;
  unitPrice: string;
}
export interface PatchProjectTemplateRequest {
  isTemplate?: boolean;
}
export interface PeriodV1Request {
  days?: number;
  end?: string;
  start?: string;
}
export interface PublishAssignmentsRequest {
  end: string;
  notifyUsers?: boolean;
  search?: string;
  start: string;
  userFilter?: ContainsUsersFilterRequest;
  userGroupFilter?: ContainsUserGroupFilterRequestV1;
  viewType?: "PROJECTS" | "TEAM" | "ALL";
}
export interface RecurringAssignmentRequest {
  repeat?: boolean;
  weeks: number;
}
export interface StatusTimeOffRequestV1Request {
  note?: string;
  status?: "APPROVED" | "REJECTED";
}
export interface StopTimeEntryRequest {
  end: string;
}
export interface TimeEstimateRequest {
  active?: boolean;
  estimate?: string;
  includeNonBillable?: boolean;
  resetOption?: "WEEKLY" | "MONTHLY" | "YEARLY";
  type?: "AUTO" | "MANUAL";
}
export interface TimeRangeRequest {
  "issue-date-end"?: string;
  "issue-date-start"?: string;
}
export interface UpdateApprovalRequest {
  note?: string;
  state: "PENDING" | "APPROVED" | "WITHDRAWN_SUBMISSION" | "WITHDRAWN_APPROVAL" | "REJECTED";
}
export interface UpdateBalanceRequest {
  note?: string;
  userIds: string[];
  value: number;
}
export interface UpdateClientRequest {
  address?: string;
  archived?: boolean;
  ccEmails?: string[];
  currencyId?: string;
  email?: string;
  name?: string;
  note?: string;
}
export interface UpdateCustomFieldRequestV1 {
  allowedValues?: string[];
  description?: string;
  name: string;
  onlyAdminCanEdit?: boolean;
  placeholder?: string;
  required?: boolean;
  status?: "INACTIVE" | "VISIBLE" | "INVISIBLE";
  type: "TXT" | "NUMBER" | "DROPDOWN_SINGLE" | "DROPDOWN_MULTIPLE" | "CHECKBOX" | "LINK";
  workspaceDefaultValue?: Record<string, unknown>;
}
export interface UpdateExpenseV1Request {
  amount: number;
  billable?: boolean;
  categoryId: string;
  changeFields: ("USER" | "DATE" | "PROJECT" | "TASK" | "CATEGORY" | "NOTES" | "AMOUNT" | "BILLABLE" | "FILE")[];
  date: string;
  file: Blob | Uint8Array;
  notes?: string;
  projectId?: string;
  taskId?: string;
  userId: string;
}
export interface UpdateHolidayRequest {
  automaticTimeEntryCreation?: AutomaticTimeEntryCreationRequest;
  color?: string;
  datePeriod: DatePeriodRequest;
  everyoneIncludingNew?: boolean;
  name: string;
  occursAnnually: boolean;
  userGroups?: ContainsUserGroupFilterRequest;
  users?: ContainsUsersFilterRequestForHoliday;
}
export interface UpdateInvoiceRequest {
  clientId?: string;
  companyId?: string;
  currency: string;
  discountPercent: number;
  dueDate: string;
  issuedDate: string;
  note?: string;
  number: string;
  subject?: string;
  tax2Percent: number;
  taxPercent: number;
  taxType?: TaxType;
  visibleZeroFields?: "TAX" | "TAX_2" | "DISCOUNT";
}
export interface UpdateInvoiceSettingsRequest {
  defaults?: InvoiceDefaultSettingsRequest;
  exportFields?: InvoiceExportFieldsRequest;
  labels: LabelsCustomizationRequest;
}
export interface UpdateInvoicedStatusRequest {
  invoiced: boolean;
  timeEntryIds: TimeEntryId[];
}
export interface UpdatePolicyRequest {
  allowHalfDay: boolean;
  allowNegativeBalance: boolean;
  approve: PolicyApproval;
  archived: boolean;
  automaticAccrual?: AutomaticAccrualRequest;
  automaticTimeEntryCreation?: AutomaticTimeEntryCreationRequest;
  color?: string;
  everyoneIncludingNew: boolean;
  hasExpiration: boolean;
  icon?: "UMBRELLA" | "SNOWFLAKE" | "FAMILY" | "PLANE" | "STETHOSCOPE" | "HEALTH_METRICS" | "CHILDCARE" | "LUGGAGE" | "MONETIZATION" | "CALENDAR";
  name: string;
  negativeBalance?: NegativeBalanceRequest;
  userGroups: UserGroupIdsSchema;
  users: UserIdsSchema;
}
export interface UpdateProjectMembershipsRequest {
  memberships: UserIdWithRatesRequest[];
  userGroups?: UserGroupIdsSchema;
}
export interface UpdateProjectRequest {
  archived?: boolean;
  billable?: boolean;
  clientId?: string;
  color?: string;
  costRate?: CostRateRequestV1;
  hourlyRate?: HourlyRateRequestV1;
  isPublic?: boolean;
  name?: string;
  note?: string;
}
export interface UpdateTagRequest {
  archived?: boolean;
  name?: string;
}
export interface UpdateTaskRequest {
  assigneeId?: string;
  assigneeIds?: string[];
  billable?: boolean;
  budgetEstimate?: number;
  estimate?: string;
  name: string;
  status?: "ACTIVE" | "DONE" | "ALL";
  userGroupIds?: string[];
}
export interface UpdateTimeEntryBulkRequest {
  billable?: boolean;
  customFields?: UpdateCustomFieldRequest[];
  description?: string;
  end?: string;
  id: string;
  projectId?: string;
  start?: string;
  tagIds?: string[];
  taskId?: string;
  type?: "REGULAR" | "BREAK";
}
export interface UpdateTimeEntryRequest {
  billable?: boolean;
  customFields?: UpdateCustomFieldRequest[];
  description?: string;
  end?: string;
  projectId?: string;
  start: string;
  tagIds?: string[];
  taskId?: string;
  type?: "REGULAR" | "BREAK";
}
export interface UpdateUserGroupRequest {
  name?: string;
}
export interface UpdateUserStatusRequest {
  status: "ACTIVE" | "INACTIVE";
}
export interface UpdateWebhookRequest {
  name?: string;
  triggerSource: string[];
  triggerSourceType: "PROJECT_ID" | "USER_ID" | "TAG_ID" | "TASK_ID" | "WORKSPACE_ID" | "ASSIGNMENT_ID" | "EXPENSE_ID";
  url: string;
  webhookEvent: "NEW_PROJECT" | "NEW_TASK" | "NEW_CLIENT" | "NEW_TIMER_STARTED" | "TIMER_STOPPED" | "TIME_ENTRY_UPDATED" | "TIME_ENTRY_DELETED" | "TIME_ENTRY_SPLIT" | "NEW_TIME_ENTRY" | "TIME_ENTRY_RESTORED" | "NEW_TAG" | "USER_DELETED_FROM_WORKSPACE" | "USER_JOINED_WORKSPACE" | "USER_DEACTIVATED_ON_WORKSPACE" | "USER_ACTIVATED_ON_WORKSPACE" | "USER_EMAIL_CHANGED" | "USER_UPDATED" | "NEW_INVOICE" | "INVOICE_UPDATED" | "NEW_APPROVAL_REQUEST" | "APPROVAL_REQUEST_STATUS_UPDATED" | "TIME_OFF_REQUESTED" | "TIME_OFF_REQUEST_UPDATED" | "TIME_OFF_REQUEST_APPROVED" | "TIME_OFF_REQUEST_REJECTED" | "TIME_OFF_REQUEST_WITHDRAWN" | "BALANCE_UPDATED" | "TAG_UPDATED" | "TAG_DELETED" | "TASK_UPDATED" | "CLIENT_UPDATED" | "TASK_DELETED" | "CLIENT_DELETED" | "EXPENSE_RESTORED" | "ASSIGNMENT_CREATED" | "ASSIGNMENT_DELETED" | "ASSIGNMENT_PUBLISHED" | "ASSIGNMENT_UPDATED" | "EXPENSE_CREATED" | "EXPENSE_DELETED" | "EXPENSE_UPDATED" | "PROJECT_UPDATED" | "PROJECT_DELETED" | "USER_GROUP_CREATED" | "USER_GROUP_UPDATED" | "USER_GROUP_DELETED" | "USERS_INVITED_TO_WORKSPACE" | "LIMITED_USERS_ADDED_TO_WORKSPACE" | "COST_RATE_UPDATED" | "BILLABLE_RATE_UPDATED";
}
export interface UpsertUserCustomFieldRequest {
  customFieldId: string;
  value?: Record<string, unknown>;
}
export interface UpsertUserCustomFieldRequestV1 {
  value?: Record<string, unknown>;
}
export interface UpdateSharedReportRequest {
  fixedDate?: boolean;
  isPublic?: boolean;
  name: string;
  visibleToUserGroups?: string[];
  visibleToUsers?: string[];
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const addUserToWorkspaceRequestSchema = z.object({
  email: z.string(),
});
export const addUsersToProjectRequestSchema = z.object({
  remove: z.boolean().optional(),
  userGroups: z.lazy(() => userGroupIdsSchemaSchema).optional(),
  userIds: z.array(z.string()).optional(),
});
export const automaticAccrualRequestSchema = z.object({
  amount: z.number(),
  period: z.enum(["MONTH", "YEAR"]).optional(),
  timeUnit: z.enum(["DAYS", "HOURS"]).optional(),
});
export const defaultEntitiesRequestSchema = z.object({
  projectId: z.string().optional(),
  taskId: z.string().optional(),
});
export const automaticTimeEntryCreationRequestSchema = z.object({
  defaultEntities: defaultEntitiesRequestSchema,
  enabled: z.boolean().optional(),
});
export const baseFilterRequestSchema = z.object({
  contains: z.enum(["CONTAINS", "DOES_NOT_CONTAIN", "CONTAINS_ONLY"]).optional(),
  ids: z.array(z.string()).optional(),
});
export const changeInvoiceStatusRequestSchema = z.object({
  invoiceStatus: z.enum(["UNSENT", "SENT", "PAID", "PARTIALLY_PAID", "VOID", "OVERDUE"]).optional(),
});
export const changePolicyStatusRequestSchema = z.object({
  status: z.enum(["ACTIVE", "ARCHIVED", "ALL"]),
});
export const containsArchivedFilterRequestSchema = z.object({
  contains: z.enum(["CONTAINS", "DOES_NOT_CONTAIN", "CONTAINS_ONLY"]).optional(),
  ids: z.array(z.string()).optional(),
  status: z.enum(["ACTIVE", "ARCHIVED", "ALL"]).optional(),
});
export const containsUserGroupFilterRequestSchema = z.object({
  contains: z.enum(["CONTAINS", "DOES_NOT_CONTAIN", "CONTAINS_ONLY"]).optional(),
  ids: z.array(z.string()).optional(),
  status: z.enum(["PENDING", "ACTIVE", "DECLINED", "INACTIVE", "ALL"]).optional(),
});
export const containsUserGroupFilterRequestV1Schema = z.object({
  contains: z.enum(["CONTAINS", "DOES_NOT_CONTAIN", "CONTAINS_ONLY"]).optional(),
  ids: z.array(z.string()).optional(),
  status: z.enum(["PENDING", "ACTIVE", "DECLINED", "INACTIVE", "ALL"]).optional(),
});
export const containsUsersFilterRequestForHolidaySchema = z.object({
  contains: z.enum(["CONTAINS", "DOES_NOT_CONTAIN", "CONTAINS_ONLY"]).optional(),
  ids: z.array(z.string()).optional(),
  status: z.enum(["ALL", "ACTIVE", "INACTIVE"]).optional(),
  statuses: z.array(z.string()).optional(),
});
export const containsUsersFilterRequestSchema = z.object({
  contains: z.enum(["CONTAINS", "DOES_NOT_CONTAIN", "CONTAINS_ONLY"]).optional(),
  ids: z.array(z.string()).optional(),
  sourceType: z.enum(["USER_GROUP"]).optional(),
  status: z.enum(["PENDING", "ACTIVE", "DECLINED", "INACTIVE", "ALL"]).optional(),
  statuses: z.array(z.enum(["PENDING", "ACTIVE", "DECLINED", "INACTIVE", "ALL"])).optional(),
});
export const copyAssignmentRequestSchema = z.object({
  seriesUpdateOption: z.enum(["THIS_ONE", "THIS_AND_FOLLOWING", "ALL"]).optional(),
  userId: z.string(),
});
export const costRateRequestSchema = z.object({
  amount: z.number().int().optional(),
  since: z.string().optional(),
  sinceAsInstant: z.string().datetime({ offset: true }).optional(),
});
export const costRateRequestV1Schema = z.object({
  amount: z.number().int(),
  since: z.string().optional(),
});
export const createApprovalRequestSchema = z.object({
  period: z.enum(["WEEKLY", "SEMI_MONTHLY", "MONTHLY"]).optional(),
  periodStart: z.string(),
});
export const createClientRequestSchema = z.object({
  address: z.string().optional(),
  email: z.string().optional(),
  name: z.string().optional(),
  note: z.string().optional(),
});
export const createCustomAttributeRequestSchema = z.object({
  name: z.string(),
  namespace: z.string(),
  value: z.string(),
});
export const createExpenseV1RequestSchema = z.object({
  amount: z.number(),
  billable: z.boolean().optional(),
  categoryId: z.string(),
  date: z.string().datetime({ offset: true }),
  file: z.instanceof(Blob),
  notes: z.string().optional(),
  projectId: z.string(),
  taskId: z.string().optional(),
  userId: z.string(),
});
export const datePeriodRequestSchema = z.object({
  endDate: z.string(),
  startDate: z.string(),
});
export const createHolidayRequestSchema = z.object({
  automaticTimeEntryCreation: automaticTimeEntryCreationRequestSchema.optional(),
  color: z.string().optional(),
  datePeriod: datePeriodRequestSchema,
  everyoneIncludingNew: z.boolean().optional(),
  name: z.string(),
  occursAnnually: z.boolean().optional(),
  userGroups: z.lazy(() => userGroupIdsSchemaSchema).optional(),
  users: z.lazy(() => userIdsSchemaSchema).optional(),
});
export const createInvoiceItemRequestSchema = z.object({
  applyTaxes: z.enum(["TAX1", "TAX2", "TAX1TAX2", "NONE"]),
  description: z.string(),
  itemType: z.string(),
  quantity: z.number().int(),
  unitPrice: z.number().int(),
});
export const createInvoicePaymentRequestSchema = z.object({
  amount: z.number().int().optional(),
  note: z.string().optional(),
  paymentDate: z.string().optional(),
});
export const createInvoiceRequestSchema = z.object({
  clientId: z.string(),
  currency: z.string(),
  dueDate: z.string().datetime({ offset: true }),
  issuedDate: z.string().datetime({ offset: true }),
  number: z.string(),
});
export const negativeBalanceRequestSchema = z.object({
  amount: z.number(),
  amountValidForTimeUnit: z.boolean().optional(),
  period: z.enum(["MONTH", "YEAR"]).optional(),
  shouldReset: z.boolean().optional(),
  timeUnit: z.enum(["DAYS", "HOURS"]).optional(),
});
export const createPolicyRequestSchema = z.object({
  allowHalfDay: z.boolean().optional(),
  allowNegativeBalance: z.boolean().optional(),
  approve: z.lazy(() => policyApprovalSchema),
  archived: z.boolean().optional(),
  automaticAccrual: automaticAccrualRequestSchema.optional(),
  automaticTimeEntryCreation: automaticTimeEntryCreationRequestSchema.optional(),
  color: z.string().optional(),
  everyoneIncludingNew: z.boolean().optional(),
  hasExpiration: z.boolean().optional(),
  icon: z.enum(["UMBRELLA", "SNOWFLAKE", "FAMILY", "PLANE", "STETHOSCOPE", "HEALTH_METRICS", "CHILDCARE", "LUGGAGE", "MONETIZATION", "CALENDAR"]).optional(),
  name: z.string(),
  negativeBalance: negativeBalanceRequestSchema.optional(),
  timeUnit: z.enum(["DAYS", "HOURS"]).optional(),
  userGroups: z.lazy(() => userGroupIdsSchemaSchema).optional(),
  users: z.lazy(() => userIdsSchemaSchema).optional(),
});
export const updateCustomFieldRequestSchema = z.object({
  customFieldId: z.string(),
  sourceType: z.enum(["WORKSPACE", "PROJECT", "TIMEENTRY"]).optional(),
  value: z.record(z.string(), z.unknown()).optional(),
});
export const createTimeEntryRequestSchema = z.object({
  billable: z.boolean().optional(),
  customAttributes: z.array(createCustomAttributeRequestSchema).optional(),
  customFields: z.array(updateCustomFieldRequestSchema).optional(),
  description: z.string().optional(),
  end: z.string().datetime({ offset: true }).optional(),
  projectId: z.string().optional(),
  start: z.string().datetime({ offset: true }).optional(),
  tagIds: z.array(z.string()).optional(),
  taskId: z.string().optional(),
  type: z.enum(["REGULAR", "BREAK"]).optional(),
});
export const createTimeOffRequestV1RequestSchema = z.object({
  note: z.string().optional(),
  timeOffPeriod: z.lazy(() => timeOffRequestPeriodV1RequestSchema),
});
export const createWebhookRequestSchema = z.object({
  name: z.string().optional(),
  triggerSource: z.array(z.string()),
  triggerSourceType: z.enum(["PROJECT_ID", "USER_ID", "TAG_ID", "TASK_ID", "WORKSPACE_ID", "ASSIGNMENT_ID", "EXPENSE_ID"]),
  url: z.string(),
  webhookEvent: z.enum(["NEW_PROJECT", "NEW_TASK", "NEW_CLIENT", "NEW_TIMER_STARTED", "TIMER_STOPPED", "TIME_ENTRY_UPDATED", "TIME_ENTRY_DELETED", "TIME_ENTRY_SPLIT", "NEW_TIME_ENTRY", "TIME_ENTRY_RESTORED", "NEW_TAG", "USER_DELETED_FROM_WORKSPACE", "USER_JOINED_WORKSPACE", "USER_DEACTIVATED_ON_WORKSPACE", "USER_ACTIVATED_ON_WORKSPACE", "USER_EMAIL_CHANGED", "USER_UPDATED", "NEW_INVOICE", "INVOICE_UPDATED", "NEW_APPROVAL_REQUEST", "APPROVAL_REQUEST_STATUS_UPDATED", "TIME_OFF_REQUESTED", "TIME_OFF_REQUEST_UPDATED", "TIME_OFF_REQUEST_APPROVED", "TIME_OFF_REQUEST_REJECTED", "TIME_OFF_REQUEST_WITHDRAWN", "BALANCE_UPDATED", "TAG_UPDATED", "TAG_DELETED", "TASK_UPDATED", "CLIENT_UPDATED", "TASK_DELETED", "CLIENT_DELETED", "EXPENSE_RESTORED", "ASSIGNMENT_CREATED", "ASSIGNMENT_DELETED", "ASSIGNMENT_PUBLISHED", "ASSIGNMENT_UPDATED", "EXPENSE_CREATED", "EXPENSE_DELETED", "EXPENSE_UPDATED", "PROJECT_UPDATED", "PROJECT_DELETED", "USER_GROUP_CREATED", "USER_GROUP_UPDATED", "USER_GROUP_DELETED", "USERS_INVITED_TO_WORKSPACE", "LIMITED_USERS_ADDED_TO_WORKSPACE", "COST_RATE_UPDATED", "BILLABLE_RATE_UPDATED"]),
});
export const createWorkspaceRequestSchema = z.object({
  name: z.string().optional(),
  organizationId: z.string().optional(),
});
export const getTimeOffRequestsV1RequestSchema = z.object({
  end: z.string().datetime({ offset: true }).optional(),
  page: z.number().int().optional(),
  pageSize: z.number().int().optional(),
  start: z.string().datetime({ offset: true }).optional(),
  statuses: z.array(z.enum(["PENDING", "APPROVED", "REJECTED", "ALL"])).optional(),
  userGroups: z.array(z.string()).optional(),
  users: z.array(z.string()).optional(),
});
export const getUserTotalsRequestSchema = z.object({
  end: z.string().datetime({ offset: true }),
  page: z.number().int().optional(),
  pageSize: z.number().int().optional(),
  search: z.string().optional(),
  start: z.string().datetime({ offset: true }),
  statusFilter: z.enum(["PUBLISHED", "UNPUBLISHED", "ALL"]).optional(),
  userFilter: containsUsersFilterRequestSchema.optional(),
  userGroupFilter: containsUserGroupFilterRequestV1Schema.optional(),
});
export const getUsersRequestSchema = z.object({
  accountStatuses: z.array(z.string()).optional(),
  email: z.string().optional(),
  includeRoles: z.boolean().optional(),
  memberships: z.enum(["ALL", "NONE", "WORKSPACE", "PROJECT", "USERGROUP"]).optional(),
  name: z.string().optional(),
  page: z.number().int().optional(),
  pageSize: z.number().int().optional(),
  projectId: z.string().optional(),
  roles: z.array(z.enum(["WORKSPACE_ADMIN", "OWNER", "TEAM_MANAGER", "PROJECT_MANAGER"])).optional(),
  sortColumn: z.enum(["ID", "EMAIL", "NAME", "NAME_LOWERCASE", "ACCESS", "HOURLYRATE", "COSTRATE"]).optional(),
  sortOrder: z.enum(["ASCENDING", "DESCENDING"]).optional(),
  status: z.enum(["PENDING", "ACTIVE", "DECLINED", "INACTIVE", "ALL"]).optional(),
  userGroups: z.array(z.string()).optional(),
});
export const hourlyRateRequestSchema = z.object({
  amount: z.number().int(),
  since: z.string().optional(),
});
export const hourlyRateRequestV1Schema = z.object({
  amount: z.number().int(),
  since: z.string().optional(),
});
export const importTimeEntriesAndExpensesRequestSchema = z.object({
  expenseFieldsForDetailedGroup: z.array(z.enum(["PROJECT", "TASK", "CATEGORY", "NOTE", "DATE", "USER"])).optional(),
  expensesGroupBy: z.enum(["CATEGORY", "PROJECT", "USER"]).optional(),
  expensesGroupType: z.enum(["GROUPED", "DETAILED"]).optional(),
  from: z.string(),
  importExpenses: z.boolean(),
  projectFilter: containsArchivedFilterRequestSchema,
  roundTimeEntryDuration: z.boolean().optional(),
  timeEntryFieldsForDetailedGroup: z.array(z.enum(["PROJECT", "TASK", "TAGS", "DESCRIPTION", "DATE", "USER"])).optional(),
  timeEntryGroupType: z.enum(["SINGLE_ITEM", "GROUPED", "DETAILED"]),
  timeEntryPrimaryGroupBy: z.enum(["USER", "PROJECT", "DATE"]).optional(),
  timeEntrySecondaryGroupBy: z.enum(["PROJECT", "USER", "TASK", "DATE", "DESCRIPTION", "NONE"]).optional(),
  to: z.string(),
});
export const labelsCustomizationRequestSchema = z.object({
  amount: z.string(),
  billFrom: z.string(),
  billTo: z.string(),
  description: z.string(),
  discount: z.string(),
  dueDate: z.string(),
  issueDate: z.string(),
  itemType: z.string(),
  notes: z.string(),
  paid: z.string(),
  quantity: z.string(),
  subtotal: z.string(),
  tax: z.string(),
  tax2: z.string(),
  total: z.string(),
  totalAmountDue: z.string(),
  unitPrice: z.string(),
});
export const patchProjectTemplateRequestSchema = z.object({
  isTemplate: z.boolean().optional(),
});
export const periodV1RequestSchema = z.object({
  days: z.number().int().optional(),
  end: z.string().optional(),
  start: z.string().optional(),
});
export const publishAssignmentsRequestSchema = z.object({
  end: z.string(),
  notifyUsers: z.boolean().optional(),
  search: z.string().optional(),
  start: z.string(),
  userFilter: containsUsersFilterRequestSchema.optional(),
  userGroupFilter: containsUserGroupFilterRequestV1Schema.optional(),
  viewType: z.enum(["PROJECTS", "TEAM", "ALL"]).optional(),
});
export const recurringAssignmentRequestSchema = z.object({
  repeat: z.boolean().optional(),
  weeks: z.number().int(),
});
export const statusTimeOffRequestV1RequestSchema = z.object({
  note: z.string().optional(),
  status: z.enum(["APPROVED", "REJECTED"]).optional(),
});
export const stopTimeEntryRequestSchema = z.object({
  end: z.string().datetime({ offset: true }),
});
export const timeEstimateRequestSchema = z.object({
  active: z.boolean().optional(),
  estimate: z.string().optional(),
  includeNonBillable: z.boolean().optional(),
  resetOption: z.enum(["WEEKLY", "MONTHLY", "YEARLY"]).optional(),
  type: z.enum(["AUTO", "MANUAL"]).optional(),
});
export const timeRangeRequestSchema = z.object({
  "issue-date-end": z.string().optional(),
  "issue-date-start": z.string().optional(),
});
export const updateApprovalRequestSchema = z.object({
  note: z.string().optional(),
  state: z.enum(["PENDING", "APPROVED", "WITHDRAWN_SUBMISSION", "WITHDRAWN_APPROVAL", "REJECTED"]),
});
export const updateBalanceRequestSchema = z.object({
  note: z.string().optional(),
  userIds: z.array(z.string()),
  value: z.number(),
});
export const updateClientRequestSchema = z.object({
  address: z.string().optional(),
  archived: z.boolean().optional(),
  ccEmails: z.array(z.string()).optional(),
  currencyId: z.string().optional(),
  email: z.string().optional(),
  name: z.string().optional(),
  note: z.string().optional(),
});
export const updateCustomFieldRequestV1Schema = z.object({
  allowedValues: z.array(z.string()).optional(),
  description: z.string().optional(),
  name: z.string(),
  onlyAdminCanEdit: z.boolean().optional(),
  placeholder: z.string().optional(),
  required: z.boolean().optional(),
  status: z.enum(["INACTIVE", "VISIBLE", "INVISIBLE"]).optional(),
  type: z.enum(["TXT", "NUMBER", "DROPDOWN_SINGLE", "DROPDOWN_MULTIPLE", "CHECKBOX", "LINK"]),
  workspaceDefaultValue: z.record(z.string(), z.unknown()).optional(),
});
export const updateExpenseV1RequestSchema = z.object({
  amount: z.number(),
  billable: z.boolean().optional(),
  categoryId: z.string(),
  changeFields: z.array(z.enum(["USER", "DATE", "PROJECT", "TASK", "CATEGORY", "NOTES", "AMOUNT", "BILLABLE", "FILE"])),
  date: z.string().datetime({ offset: true }),
  file: z.instanceof(Blob),
  notes: z.string().optional(),
  projectId: z.string().optional(),
  taskId: z.string().optional(),
  userId: z.string(),
});
export const updateHolidayRequestSchema = z.object({
  automaticTimeEntryCreation: automaticTimeEntryCreationRequestSchema.optional(),
  color: z.string().optional(),
  datePeriod: datePeriodRequestSchema,
  everyoneIncludingNew: z.boolean().optional(),
  name: z.string(),
  occursAnnually: z.boolean(),
  userGroups: containsUserGroupFilterRequestSchema.optional(),
  users: containsUsersFilterRequestForHolidaySchema.optional(),
});
export const updateInvoiceRequestSchema = z.object({
  clientId: z.string().optional(),
  companyId: z.string().optional(),
  currency: z.string(),
  discountPercent: z.number(),
  dueDate: z.string().datetime({ offset: true }),
  issuedDate: z.string().datetime({ offset: true }),
  note: z.string().optional(),
  number: z.string(),
  subject: z.string().optional(),
  tax2Percent: z.number(),
  taxPercent: z.number(),
  taxType: z.lazy(() => taxTypeSchema).optional(),
  visibleZeroFields: z.enum(["TAX", "TAX_2", "DISCOUNT"]).optional(),
});
export const updateInvoiceSettingsRequestSchema = z.object({
  defaults: z.lazy(() => invoiceDefaultSettingsRequestSchema).optional(),
  exportFields: z.lazy(() => invoiceExportFieldsRequestSchema).optional(),
  labels: labelsCustomizationRequestSchema,
});
export const updateInvoicedStatusRequestSchema = z.object({
  invoiced: z.boolean(),
  timeEntryIds: z.array(z.lazy(() => timeEntryIdSchema)),
});
export const updatePolicyRequestSchema = z.object({
  allowHalfDay: z.boolean(),
  allowNegativeBalance: z.boolean(),
  approve: z.lazy(() => policyApprovalSchema),
  archived: z.boolean(),
  automaticAccrual: automaticAccrualRequestSchema.optional(),
  automaticTimeEntryCreation: automaticTimeEntryCreationRequestSchema.optional(),
  color: z.string().optional(),
  everyoneIncludingNew: z.boolean(),
  hasExpiration: z.boolean(),
  icon: z.enum(["UMBRELLA", "SNOWFLAKE", "FAMILY", "PLANE", "STETHOSCOPE", "HEALTH_METRICS", "CHILDCARE", "LUGGAGE", "MONETIZATION", "CALENDAR"]).optional(),
  name: z.string(),
  negativeBalance: negativeBalanceRequestSchema.optional(),
  userGroups: z.lazy(() => userGroupIdsSchemaSchema),
  users: z.lazy(() => userIdsSchemaSchema),
});
export const updateProjectMembershipsRequestSchema = z.object({
  memberships: z.array(z.lazy(() => userIdWithRatesRequestSchema)),
  userGroups: z.lazy(() => userGroupIdsSchemaSchema).optional(),
});
export const updateProjectRequestSchema = z.object({
  archived: z.boolean().optional(),
  billable: z.boolean().optional(),
  clientId: z.string().optional(),
  color: z.string().optional(),
  costRate: costRateRequestV1Schema.optional(),
  hourlyRate: hourlyRateRequestV1Schema.optional(),
  isPublic: z.boolean().optional(),
  name: z.string().optional(),
  note: z.string().optional(),
});
export const updateTagRequestSchema = z.object({
  archived: z.boolean().optional(),
  name: z.string().optional(),
});
export const updateTaskRequestSchema = z.object({
  assigneeId: z.string().optional(),
  assigneeIds: z.array(z.string()).optional(),
  billable: z.boolean().optional(),
  budgetEstimate: z.number().int().optional(),
  estimate: z.string().optional(),
  name: z.string(),
  status: z.enum(["ACTIVE", "DONE", "ALL"]).optional(),
  userGroupIds: z.array(z.string()).optional(),
});
export const updateTimeEntryBulkRequestSchema = z.object({
  billable: z.boolean().optional(),
  customFields: z.array(updateCustomFieldRequestSchema).optional(),
  description: z.string().optional(),
  end: z.string().datetime({ offset: true }).optional(),
  id: z.string(),
  projectId: z.string().optional(),
  start: z.string().datetime({ offset: true }).optional(),
  tagIds: z.array(z.string()).optional(),
  taskId: z.string().optional(),
  type: z.enum(["REGULAR", "BREAK"]).optional(),
});
export const updateTimeEntryRequestSchema = z.object({
  billable: z.boolean().optional(),
  customFields: z.array(updateCustomFieldRequestSchema).optional(),
  description: z.string().optional(),
  end: z.string().datetime({ offset: true }).optional(),
  projectId: z.string().optional(),
  start: z.string().datetime({ offset: true }),
  tagIds: z.array(z.string()).optional(),
  taskId: z.string().optional(),
  type: z.enum(["REGULAR", "BREAK"]).optional(),
});
export const updateUserGroupRequestSchema = z.object({
  name: z.string().optional(),
});
export const updateUserStatusRequestSchema = z.object({
  status: z.enum(["ACTIVE", "INACTIVE"]),
});
export const updateWebhookRequestSchema = z.object({
  name: z.string().optional(),
  triggerSource: z.array(z.string()),
  triggerSourceType: z.enum(["PROJECT_ID", "USER_ID", "TAG_ID", "TASK_ID", "WORKSPACE_ID", "ASSIGNMENT_ID", "EXPENSE_ID"]),
  url: z.string(),
  webhookEvent: z.enum(["NEW_PROJECT", "NEW_TASK", "NEW_CLIENT", "NEW_TIMER_STARTED", "TIMER_STOPPED", "TIME_ENTRY_UPDATED", "TIME_ENTRY_DELETED", "TIME_ENTRY_SPLIT", "NEW_TIME_ENTRY", "TIME_ENTRY_RESTORED", "NEW_TAG", "USER_DELETED_FROM_WORKSPACE", "USER_JOINED_WORKSPACE", "USER_DEACTIVATED_ON_WORKSPACE", "USER_ACTIVATED_ON_WORKSPACE", "USER_EMAIL_CHANGED", "USER_UPDATED", "NEW_INVOICE", "INVOICE_UPDATED", "NEW_APPROVAL_REQUEST", "APPROVAL_REQUEST_STATUS_UPDATED", "TIME_OFF_REQUESTED", "TIME_OFF_REQUEST_UPDATED", "TIME_OFF_REQUEST_APPROVED", "TIME_OFF_REQUEST_REJECTED", "TIME_OFF_REQUEST_WITHDRAWN", "BALANCE_UPDATED", "TAG_UPDATED", "TAG_DELETED", "TASK_UPDATED", "CLIENT_UPDATED", "TASK_DELETED", "CLIENT_DELETED", "EXPENSE_RESTORED", "ASSIGNMENT_CREATED", "ASSIGNMENT_DELETED", "ASSIGNMENT_PUBLISHED", "ASSIGNMENT_UPDATED", "EXPENSE_CREATED", "EXPENSE_DELETED", "EXPENSE_UPDATED", "PROJECT_UPDATED", "PROJECT_DELETED", "USER_GROUP_CREATED", "USER_GROUP_UPDATED", "USER_GROUP_DELETED", "USERS_INVITED_TO_WORKSPACE", "LIMITED_USERS_ADDED_TO_WORKSPACE", "COST_RATE_UPDATED", "BILLABLE_RATE_UPDATED"]),
});
export const upsertUserCustomFieldRequestSchema = z.object({
  customFieldId: z.string(),
  value: z.record(z.string(), z.unknown()).optional(),
});
export const upsertUserCustomFieldRequestV1Schema = z.object({
  value: z.record(z.string(), z.unknown()).optional(),
});
export const updateSharedReportRequestSchema = z.object({
  fixedDate: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  name: z.string(),
  visibleToUserGroups: z.array(z.string()).optional(),
  visibleToUsers: z.array(z.string()).optional(),
});
