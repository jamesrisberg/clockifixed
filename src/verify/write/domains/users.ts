import { describe, it } from "vitest";
import type { Clockify } from "../../../client/clockify.js";
import { memberProfileSchema, userDtoV1Schema } from "../../../types/index.js";
import { realMemberProfileSchema } from "../../../types/overrides.js";
import type { TestContext } from "../context.js";
import type { Reporter } from "../../reporter.js";
import { withRetry, validateResponse } from "../helpers.js";

export function registerUserTests(
  api: () => Clockify,
  ctx: () => TestContext,
  reporter: () => Reporter
) {
  describe("User operations (non-destructive)", () => {
    it("filters users", async () => {
      const result = await withRetry(() => api().users.filter({ email: "" }));
      reporter().addResult(validateResponse(result, {
        name: "Filter users", tag: "User", method: "POST",
        path: `/workspaces/${ctx().workspaceId}/users/info`,
        specSchema: userDtoV1Schema, array: true,
      }));
    });

    it("updates member profile", async () => {
      const result = await withRetry(() => api().users.updateMemberProfile(ctx().userId, {}));
      reporter().addResult(validateResponse(result, {
        name: "Update member profile", tag: "User", method: "PATCH",
        path: `/workspaces/${ctx().workspaceId}/member-profile/${ctx().userId}`,
        specSchema: memberProfileSchema, realitySchema: realMemberProfileSchema,
      }));
    });

    it("creates and deletes a user role", async () => {
      try {
        await withRetry(() =>
          api().users.createRole(ctx().userId, { entityId: ctx().userId, role: "TEAM_MANAGER" })
        );
        await withRetry(() =>
          api().users.deleteRole(ctx().userId, { entityId: ctx().userId, role: "TEAM_MANAGER" })
        );
      } catch (err: any) {
        // Role ops may fail on certain plans or if role already assigned
        if (err.message?.includes("403") || err.message?.includes("400")) return;
        throw err;
      }
    });

    it("upserts a user custom field value", async () => {
      if (!ctx().customFieldId) return;
      try {
        await withRetry(() =>
          api().users.upsertCustomFieldValue(ctx().userId, ctx().customFieldId!, {
            value: { value: "test-value" },
          })
        );
      } catch (err: any) {
        // May fail if custom field is not for users or already deleted
        if (err.message?.includes("403") || err.message?.includes("400") || err.message?.includes("404")) return;
        throw err;
      }
    });
  });
}
