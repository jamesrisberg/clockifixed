import { describe, it } from "vitest";
import type { Clockify } from "../../../client/clockify.js";
import { approvalDetailsSchema } from "../../../types/models/approval.js";
import type { TestContext } from "../context.js";
import type { Reporter } from "../../reporter.js";
import { withRetry, validateResponse } from "../helpers.js";

export function registerApprovalTests(
  api: () => Clockify,
  ctx: () => TestContext,
  reporter: () => Reporter
) {
  describe("Approval operations", () => {
    it("lists approval requests", async () => {
      try {
        const result = await withRetry(() => api().approvals.getAll());
        reporter().addResult(validateResponse(result, {
          name: "List approval requests", tag: "Approval", method: "GET",
          path: `/workspaces/${ctx().workspaceId}/approval-requests`,
          specSchema: approvalDetailsSchema,
          array: true,
        }));
      } catch (err: any) {
        if (err.message?.includes("403")) {
          console.log("    Approval endpoints require paid plan — skipping");
          return;
        }
        throw err;
      }
    });
  });
}
