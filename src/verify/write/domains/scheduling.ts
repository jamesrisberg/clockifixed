import { describe, it } from "vitest";
import type { Clockify } from "../../../client/clockify.js";
import { schedulingProjectsTotalsSchema, schedulingUsersTotalsSchema } from "../../../types/models/scheduling.js";
import type { TestContext } from "../context.js";
import type { Reporter } from "../../reporter.js";
import { withRetry, validateResponse } from "../helpers.js";

let skipped = false;

export function registerSchedulingTests(
  api: () => Clockify,
  ctx: () => TestContext,
  reporter: () => Reporter
) {
  describe("Scheduling operations", () => {
    it("gets project totals", async () => {
      try {
        const result = await withRetry(() =>
          api().scheduling.getProjectTotals({
            start: "2020-01-01T00:00:00Z",
            end: "2030-01-01T00:00:00Z",
          })
        );
        reporter().addResult(validateResponse(result, {
          name: "Get scheduling project totals (POST)", tag: "Scheduling", method: "POST",
          path: `/workspaces/${ctx().workspaceId}/scheduling/assignments/projects/totals`,
          specSchema: schedulingProjectsTotalsSchema,
          array: true,
        }));
      } catch (err: any) {
        if (err.message?.includes("403")) {
          skipped = true;
          console.log("    Scheduling endpoints require paid plan — skipping");
          return;
        }
        throw err;
      }
    });

    it("gets user totals", async () => {
      if (skipped) return;
      try {
        const result = await withRetry(() =>
          api().scheduling.getUserTotals({
            start: "2020-01-01T00:00:00Z",
            end: "2030-01-01T00:00:00Z",
          })
        );
        reporter().addResult(validateResponse(result, {
          name: "Get scheduling user totals (POST)", tag: "Scheduling", method: "POST",
          path: `/workspaces/${ctx().workspaceId}/scheduling/assignments/user-filter/totals`,
          specSchema: schedulingUsersTotalsSchema,
          array: true,
        }));
      } catch (err: any) {
        if (err.message?.includes("403")) return;
        throw err;
      }
    });
  });
}
