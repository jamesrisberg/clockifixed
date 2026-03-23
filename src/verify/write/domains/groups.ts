import { describe, it, expect } from "vitest";
import type { Clockify } from "../../../client/clockify.js";
import { userGroupSchema } from "../../../types/index.js";
import type { TestContext, CleanupRegistry } from "../context.js";
import type { Reporter } from "../../reporter.js";
import { fixtures, updates } from "../fixtures.js";
import { withRetry, validateResponse } from "../helpers.js";

export function registerGroupTests(
  api: () => Clockify,
  ctx: () => TestContext,
  cleanup: () => CleanupRegistry,
  reporter: () => Reporter
) {
  describe("Group lifecycle", () => {
    it("creates a group", async () => {
      const body = fixtures.group();
      const result = await withRetry(() => api().groups.create(body));
      cleanup().register(`group:${result.id}`, () => api().groups.delete(result.id!));
      ctx().groupId = result.id!;

      reporter().addResult(validateResponse(result, {
        name: "Create group", tag: "Group", method: "POST",
        path: `/workspaces/${ctx().workspaceId}/user-groups`,
        specSchema: userGroupSchema,
      }));
      expect(result.name).toBe(body.name);
    });

    it("updates the group", async () => {
      const body = updates.group();
      const result = await withRetry(() => api().groups.update(ctx().groupId!, body));
      reporter().addResult(validateResponse(result, {
        name: "Update group", tag: "Group", method: "PUT",
        path: `/workspaces/${ctx().workspaceId}/user-groups/${ctx().groupId}`,
        specSchema: userGroupSchema,
      }));
      expect(result.name).toBe(body.name);
    });

    it("adds a user to the group", async () => {
      const result = await withRetry(() =>
        api().groups.addUsers(ctx().groupId!, { userId: ctx().userId })
      );
      reporter().addResult(validateResponse(result, {
        name: "Add user to group", tag: "Group", method: "POST",
        path: `/workspaces/${ctx().workspaceId}/user-groups/${ctx().groupId}/users`,
        specSchema: userGroupSchema,
      }));
    });

    it("removes a user from the group", async () => {
      const result = await withRetry(() =>
        api().groups.removeUser(ctx().groupId!, ctx().userId)
      );
      reporter().addResult(validateResponse(result, {
        name: "Remove user from group", tag: "Group", method: "DELETE",
        path: `/workspaces/${ctx().workspaceId}/user-groups/${ctx().groupId}/users/${ctx().userId}`,
        specSchema: userGroupSchema,
      }));
    });

    it("deletes the group", async () => {
      await withRetry(() => api().groups.delete(ctx().groupId!));
      cleanup().remove(`group:${ctx().groupId}`);
    });
  });
}
