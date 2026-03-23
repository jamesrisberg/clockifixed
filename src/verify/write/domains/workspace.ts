import { describe, it } from "vitest";
import type { Clockify } from "../../../client/clockify.js";
import { workspaceSchema } from "../../../types/index.js";
import { realWorkspaceSchema } from "../../../types/overrides.js";
import type { TestContext } from "../context.js";
import type { Reporter } from "../../reporter.js";
import { withRetry, validateResponse } from "../helpers.js";

export function registerWorkspaceTests(
  api: () => Clockify,
  ctx: () => TestContext,
  reporter: () => Reporter
) {
  describe("Workspace rates (non-destructive)", () => {
    it("sets workspace cost rate", async () => {
      const result = await withRetry(() => api().workspaces.setCostRate({ amount: 2500 }));
      reporter().addResult(validateResponse(result, {
        name: "Set workspace cost rate", tag: "Workspace", method: "PUT",
        path: `/workspaces/${ctx().workspaceId}/cost-rate`,
        specSchema: workspaceSchema, realitySchema: realWorkspaceSchema,
      }));
    });

    it("sets workspace hourly rate", async () => {
      const result = await withRetry(() => api().workspaces.setHourlyRate({ amount: 5000 }));
      reporter().addResult(validateResponse(result, {
        name: "Set workspace hourly rate", tag: "Workspace", method: "PUT",
        path: `/workspaces/${ctx().workspaceId}/hourly-rate`,
        specSchema: workspaceSchema, realitySchema: realWorkspaceSchema,
      }));
    });

    it("sets user cost rate on workspace", async () => {
      const result = await withRetry(() => api().workspaces.setUserCostRate(ctx().userId, { amount: 3000 }));
      reporter().addResult(validateResponse(result, {
        name: "Set user cost rate (workspace)", tag: "Workspace", method: "PUT",
        path: `/workspaces/${ctx().workspaceId}/users/${ctx().userId}/cost-rate`,
        specSchema: workspaceSchema, realitySchema: realWorkspaceSchema,
      }));
    });

    it("sets user hourly rate on workspace", async () => {
      const result = await withRetry(() => api().workspaces.setUserHourlyRate(ctx().userId, { amount: 6000 }));
      reporter().addResult(validateResponse(result, {
        name: "Set user hourly rate (workspace)", tag: "Workspace", method: "PUT",
        path: `/workspaces/${ctx().workspaceId}/users/${ctx().userId}/hourly-rate`,
        specSchema: workspaceSchema, realitySchema: realWorkspaceSchema,
      }));
    });
  });
}
