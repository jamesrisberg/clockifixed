import { describe, it, expect } from "vitest";

import {
  type Workspace,
  workspaceSchema,
  type ClientWithCurrency,
  clientWithCurrencySchema,
  type ProjectDtoV1,
  projectDtoV1Schema,
  type TimeEntryDtoImplV1,
  timeEntryDtoImplV1Schema,
  type TagDtoV1,
  tagDtoV1Schema,
  type UserDtoV1,
  userDtoV1Schema,
  type Task,
  taskSchema,
  type UserGroup,
  userGroupSchema,
  // Unified types
  type Project,
  projectSchema,
  type TimeEntry,
  timeEntrySchema,
  type ClockifyClient,
  clockifyClientSchema,
  type Holiday,
  holidaySchema,
} from "./index.js";

describe("Zod schemas validate correctly shaped data", () => {
  it("should validate a workspace", () => {
    const data = { id: "ws-123", name: "Test Workspace" };
    expect(workspaceSchema.safeParse(data).success).toBe(true);
  });

  it("should validate a client", () => {
    const data = { id: "cl-123", name: "Acme Corp", workspaceId: "ws-123" };
    expect(clientWithCurrencySchema.safeParse(data).success).toBe(true);
  });

  it("should validate a project", () => {
    const data = { id: "proj-123", name: "Website Redesign", workspaceId: "ws-123" };
    expect(projectDtoV1Schema.safeParse(data).success).toBe(true);
  });

  it("should validate a time entry", () => {
    const data = { id: "te-123", description: "Working on feature", billable: true, projectId: "proj-123" };
    expect(timeEntryDtoImplV1Schema.safeParse(data).success).toBe(true);
  });

  it("should validate a tag", () => {
    const data = { id: "tag-123", name: "urgent", workspaceId: "ws-123" };
    expect(tagDtoV1Schema.safeParse(data).success).toBe(true);
  });

  it("should validate a user", () => {
    const data = { id: "user-123", name: "Jane Doe", email: "jane@example.com" };
    expect(userDtoV1Schema.safeParse(data).success).toBe(true);
  });

});

describe("Unified schemas accept all variant payloads", () => {
  it("projectSchema accepts ProjectDtoV1 payload (GET response)", () => {
    const data = {
      id: "proj-1", name: "My Project", archived: false, billable: true,
      color: "#2196F3", workspaceId: "ws-1", public: true, template: false,
      budgetEstimate: null, costRate: null, timeEstimate: null,
      memberships: [{ userId: "u-1", costRate: null, hourlyRate: null }],
    };
    expect(projectSchema.safeParse(data).success).toBe(true);
  });

  it("projectSchema accepts ProjectDtoImplV1 payload (POST response)", () => {
    const data = {
      id: "proj-1", name: "My Project", archived: false, billable: true,
      color: "#2196F3", workspaceId: "ws-1", public: true, template: false,
      // ImplV1-only fields
      clientId: "cl-1", clientName: "Acme", isPublic: true, isTemplate: false,
      estimateReset: null,
      budgetEstimate: null, costRate: null, timeEstimate: null,
      memberships: [{ userId: "u-1", costRate: null, hourlyRate: null }],
    };
    expect(projectSchema.safeParse(data).success).toBe(true);
  });

  it("timeEntrySchema accepts TimeEntryDtoImplV1 payload (write response)", () => {
    const data = {
      id: "te-1", billable: true, description: "Working",
      projectId: "proj-1", taskId: null, userId: "u-1",
      workspaceId: "ws-1", tagIds: null, kioskId: null,
      isLocked: false, type: "REGULAR",
    };
    expect(timeEntrySchema.safeParse(data).success).toBe(true);
  });

  it("timeEntrySchema accepts TimeEntryWithRates payload (GET response)", () => {
    const data = {
      id: "te-1", billable: true, description: "Working",
      projectId: "proj-1", taskId: "task-1", userId: "u-1",
      workspaceId: "ws-1", tagIds: ["tag-1"], kioskId: null,
      isLocked: false, type: "REGULAR",
      // WithRates-only fields
      costRate: { amount: 2500, currency: "USD" },
      hourlyRate: { amount: 5000, currency: "USD" },
    };
    expect(timeEntrySchema.safeParse(data).success).toBe(true);
  });

  it("timeEntrySchema accepts null costRate/hourlyRate", () => {
    const data = {
      id: "te-1", billable: true, costRate: null, hourlyRate: null,
      projectId: null, taskId: null, tagIds: null, kioskId: null,
    };
    expect(timeEntrySchema.safeParse(data).success).toBe(true);
  });

  it("clockifyClientSchema accepts ClientWithCurrency payload (GET response)", () => {
    const data = {
      id: "cl-1", name: "Acme Corp", archived: false,
      address: null, email: null, ccEmails: null, note: null,
      workspaceId: "ws-1", currencyId: "cur-1",
      currencyCode: "USD",
    };
    expect(clockifyClientSchema.safeParse(data).success).toBe(true);
  });

  it("clockifyClientSchema accepts Client payload (update response — no currencyCode)", () => {
    const data = {
      id: "cl-1", name: "Acme Corp", archived: false,
      address: "123 Main St", email: "info@acme.com",
      ccEmails: ["billing@acme.com"], note: "VIP",
      workspaceId: "ws-1", currencyId: "cur-1",
      // no currencyCode — that's the Client variant
    };
    expect(clockifyClientSchema.safeParse(data).success).toBe(true);
  });

  it("holidaySchema accepts HolidayDtoV1 payload (boolean automaticTimeEntryCreation)", () => {
    const data = {
      id: "h-1", name: "Christmas", workspaceId: "ws-1",
      everyoneIncludingNew: true, occursAnnually: true,
      automaticTimeEntryCreation: false,
      projectId: "proj-1", taskId: "task-1",
      userIds: ["u-1"], userGroupIds: [],
    };
    expect(holidaySchema.safeParse(data).success).toBe(true);
  });

  it("holidaySchema accepts HolidayDto payload (object automaticTimeEntryCreation, color)", () => {
    const data = {
      id: "h-1", name: "Christmas", workspaceId: "ws-1",
      everyoneIncludingNew: true, occursAnnually: true,
      automaticTimeEntryCreation: { projectId: "proj-1", taskId: "task-1" },
      color: "#FF0000",
      userIds: ["u-1"], userGroupIds: [],
      // no projectId/taskId — that's the Dto variant
    };
    expect(holidaySchema.safeParse(data).success).toBe(true);
  });

  it("should reject invalid data with proper error details", () => {
    const result = workspaceSchema.safeParse("not an object");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThan(0);
    }
  });
});
