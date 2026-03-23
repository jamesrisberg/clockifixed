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
  });
}
