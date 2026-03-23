import { describe, it, expect } from "vitest";
import type { Clockify } from "../../../client/clockify.js";
import { holidayDtoV1Schema } from "../../../types/index.js";
import type { TestContext, CleanupRegistry } from "../context.js";
import type { Reporter } from "../../reporter.js";
import { fixtures, updates } from "../fixtures.js";
import { withRetry, validateResponse } from "../helpers.js";

let skipped = false;

export function registerHolidayTests(
  api: () => Clockify,
  ctx: () => TestContext,
  cleanup: () => CleanupRegistry,
  reporter: () => Reporter
) {
  describe("Holiday lifecycle", () => {
    it("creates a holiday", async () => {
      try {
        const body = fixtures.holiday();
        const result = await withRetry(() => api().holidays.create(body));
        cleanup().register(`holiday:${result.id}`, () => api().holidays.delete(result.id!));
        ctx().holidayId = result.id!;

        reporter().addResult(validateResponse(result, {
          name: "Create holiday", tag: "Holiday", method: "POST",
          path: `/workspaces/${ctx().workspaceId}/holidays`,
          specSchema: holidayDtoV1Schema,
        }));
        expect(result.id).toBeDefined();
      } catch (err: any) {
        if (err.message?.includes("403")) {
          skipped = true;
          console.log("    Holiday endpoints require paid plan — skipping");
          return;
        }
        throw err;
      }
    });

    it("updates the holiday", async () => {
      if (skipped || !ctx().holidayId) return;
      const body = updates.holiday();
      const result = await withRetry(() =>
        api().holidays.update(ctx().holidayId!, body)
      );
      reporter().addResult(validateResponse(result, {
        name: "Update holiday", tag: "Holiday", method: "PUT",
        path: `/workspaces/${ctx().workspaceId}/holidays/${ctx().holidayId}`,
        specSchema: holidayDtoV1Schema,
      }));
    });

    it("deletes the holiday", async () => {
      if (skipped || !ctx().holidayId) return;
      const result = await withRetry(() => api().holidays.delete(ctx().holidayId!));
      cleanup().remove(`holiday:${ctx().holidayId}`);
      reporter().addResult(validateResponse(result, {
        name: "Delete holiday", tag: "Holiday", method: "DELETE",
        path: `/workspaces/${ctx().workspaceId}/holidays/${ctx().holidayId}`,
        specSchema: holidayDtoV1Schema,
      }));
    });
  });
}
