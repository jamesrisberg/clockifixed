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

  it("should reject invalid data with proper error details", () => {
    const result = workspaceSchema.safeParse("not an object");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThan(0);
    }
  });
});
