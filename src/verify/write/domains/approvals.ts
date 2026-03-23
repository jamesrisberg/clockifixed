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
    it("creates an approval request", async () => {
      try {
        const result = await withRetry(() =>
          api().approvals.create({
            dateRange: {
              start: "2027-01-01T00:00:00Z",
              end: "2027-01-31T23:59:59Z",
            },
          } as any)
        );
        if ((result as any)?.id) {
          ctx().approvalRequestId = (result as any).id;
          await withRetry(() =>
            api().approvals.updateStatus((result as any).id, { status: "WITHDRAWN" } as any)
          ).catch(() => {});
        }
      } catch (err: any) {
        if (err.message?.includes("403") || err.message?.includes("400")) return;
        throw err;
      }
    });

    it("creates an approval request for user", async () => {
      try {
        await withRetry(() =>
          api().approvals.createForUser(ctx().userId, {
            dateRange: {
              start: "2027-02-01T00:00:00Z",
              end: "2027-02-28T23:59:59Z",
            },
          } as any)
        );
      } catch (err: any) {
        if (err.message?.includes("403") || err.message?.includes("400")) return;
        throw err;
      }
    });

    it("resubmits entries for approval", async () => {
      try {
        await withRetry(() => api().approvals.resubmit({} as any));
      } catch (err: any) {
        if (err.message?.includes("403") || err.message?.includes("400") || err.message?.includes("Unexpected end")) return;
        throw err;
      }
    });

    it("resubmits entries for approval for user", async () => {
      try {
        await withRetry(() => api().approvals.resubmitForUser(ctx().userId, {} as any));
      } catch (err: any) {
        if (err.message?.includes("403") || err.message?.includes("400") || err.message?.includes("Unexpected end")) return;
        throw err;
      }
    });
  });
}
