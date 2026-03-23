import { describe, it, expect } from "vitest";
import type { Clockify } from "../../../client/clockify.js";
import { policySchema } from "../../../types/index.js";
import { realPolicySchema } from "../../../types/overrides.js";
import type { TestContext, CleanupRegistry } from "../context.js";
import type { Reporter } from "../../reporter.js";
import { withRetry, validateResponse } from "../helpers.js";
import { PREFIX_PATTERN } from "../fixtures.js";

const ts = () => Date.now().toString(36);
let skipped = false;

export function registerPolicyTests(
  api: () => Clockify,
  ctx: () => TestContext,
  cleanup: () => CleanupRegistry,
  reporter: () => Reporter
) {
  describe("Time-off Policy lifecycle", () => {
    it("creates a policy", async () => {
      try {
        const result = await withRetry(() =>
          api().policies.create({
            name: `${PREFIX_PATTERN}PTO ${ts()}`,
            timeUnit: "DAYS",
            approve: {},
          })
        );
        cleanup().register(`policy:${result.id}`, () => api().policies.delete(result.id!));
        ctx().policyId = result.id!;
        ctx().persistPolicyId = result.id!;

        reporter().addResult(validateResponse(result, {
          name: "Create policy", tag: "Policy", method: "POST",
          path: `/workspaces/${ctx().workspaceId}/time-off/policies`,
          specSchema: policySchema, realitySchema: realPolicySchema,
        }));
        expect(result.id).toBeDefined();
      } catch (err: any) {
        if (err.message?.includes("403")) {
          skipped = true;
          console.log("    Time-off policy endpoints require paid plan — skipping");
          return;
        }
        throw err;
      }
    });

    it("reads back created policy", async () => {
      if (skipped || !ctx().policyId) return;
      const result = await withRetry(() => api().policies.get(ctx().policyId!));
      reporter().addResult(validateResponse(result, {
        name: "Get policy (after create)", tag: "Policy", method: "GET",
        path: `/workspaces/${ctx().workspaceId}/time-off/policies/${ctx().policyId}`,
        specSchema: policySchema, realitySchema: realPolicySchema,
      }));
    });

    it("updates the policy", async () => {
      if (skipped || !ctx().policyId) return;
      const result = await withRetry(() =>
        api().policies.update(ctx().policyId!, {
          name: `${PREFIX_PATTERN}PTO Updated ${ts()}`,
          allowHalfDay: false,
          allowNegativeBalance: false,
          approve: {},
          archived: false,
          everyoneIncludingNew: false,
          hasExpiration: false,
          userGroups: { ids: [] },
          users: { ids: [] },
        })
      );
      reporter().addResult(validateResponse(result, {
        name: "Update policy", tag: "Policy", method: "PUT",
        path: `/workspaces/${ctx().workspaceId}/time-off/policies/${ctx().policyId}`,
        specSchema: policySchema, realitySchema: realPolicySchema,
      }));
    });

    it("deletes the policy", async () => {
      if (skipped || !ctx().policyId) return;
      await withRetry(() => api().policies.delete(ctx().policyId!));
      cleanup().remove(`policy:${ctx().policyId}`);
    });
  });
}
