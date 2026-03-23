import { describe, it, expect } from "vitest";
import type { Clockify } from "../../../client/clockify.js";
import { timeEntryDtoImplV1Schema, timeEntryWithRatesSchema } from "../../../types/index.js";
import { realTimeEntrySchema, realTimeEntryWithRatesSchema } from "../../../types/overrides.js";
import type { TestContext, CleanupRegistry } from "../context.js";
import type { Reporter } from "../../reporter.js";
import { fixtures, updates } from "../fixtures.js";
import { withRetry, validateResponse, delay } from "../helpers.js";

export function registerTimeEntryTests(
  api: () => Clockify,
  ctx: () => TestContext,
  cleanup: () => CleanupRegistry,
  reporter: () => Reporter
) {
  describe("Time Entry lifecycle", () => {
    it("creates a time entry", async () => {
      const body = fixtures.timeEntry(ctx().persistProjectId, ctx().persistTaskId);
      const result = await withRetry(() => api().timeEntries.create(body));
      cleanup().register(`time-entry:${result.id}`, () => api().timeEntries.delete(result.id!));
      ctx().timeEntryId = result.id!;
      ctx().persistTimeEntryId = result.id!;

      reporter().addResult(validateResponse(result, {
        name: "Create time entry", tag: "Time Entry", method: "POST",
        path: `/workspaces/${ctx().workspaceId}/time-entries`,
        specSchema: timeEntryDtoImplV1Schema, realitySchema: realTimeEntrySchema,
      }));
      expect(result.id).toBeDefined();
    });

    it("reads back created time entry", async () => {
      const result = await withRetry(() => api().timeEntries.get(ctx().timeEntryId!));
      reporter().addResult(validateResponse(result, {
        name: "Get time entry (after create)", tag: "Time Entry", method: "GET",
        path: `/workspaces/${ctx().workspaceId}/time-entries/${ctx().timeEntryId}`,
        specSchema: timeEntryWithRatesSchema, realitySchema: realTimeEntryWithRatesSchema,
      }));
      expect(result.id).toBe(ctx().timeEntryId);
    });

    it("updates the time entry", async () => {
      const body = {
        ...updates.timeEntry(),
        start: "2027-01-15T09:00:00Z",
        billable: true,
      };
      const result = await withRetry(() => api().timeEntries.update(ctx().timeEntryId!, body));
      reporter().addResult(validateResponse(result, {
        name: "Update time entry", tag: "Time Entry", method: "PUT",
        path: `/workspaces/${ctx().workspaceId}/time-entries/${ctx().timeEntryId}`,
        specSchema: timeEntryDtoImplV1Schema, realitySchema: realTimeEntrySchema,
      }));
    });

    it("creates a time entry for user", async () => {
      const body = fixtures.timeEntry(ctx().persistProjectId);
      body.start = "2027-01-16T09:00:00Z";
      body.end = "2027-01-16T11:00:00Z";
      const result = await withRetry(() => api().timeEntries.createForUser(ctx().userId, body));
      cleanup().register(`time-entry-user:${result.id}`, () => api().timeEntries.delete(result.id!));

      reporter().addResult(validateResponse(result, {
        name: "Create time entry for user", tag: "Time Entry", method: "POST",
        path: `/workspaces/${ctx().workspaceId}/user/${ctx().userId}/time-entries`,
        specSchema: timeEntryDtoImplV1Schema, realitySchema: realTimeEntrySchema,
      }));
    });

    it("duplicates a time entry", async () => {
      const result = await withRetry(() =>
        api().timeEntries.duplicate(ctx().userId, ctx().timeEntryId!)
      );
      cleanup().register(`time-entry-dup:${result.id}`, () => api().timeEntries.delete(result.id!));

      reporter().addResult(validateResponse(result, {
        name: "Duplicate time entry", tag: "Time Entry", method: "POST",
        path: `/workspaces/${ctx().workspaceId}/user/${ctx().userId}/time-entries/${ctx().timeEntryId}/duplicate`,
        specSchema: timeEntryDtoImplV1Schema, realitySchema: realTimeEntrySchema,
      }));
    });

    it("starts and stops a timer", async () => {
      // Start a timer (create with no end)
      const startResult = await withRetry(() =>
        api().timeEntries.create({
          start: new Date().toISOString(),
          description: "_cfix_test_timer",
          projectId: ctx().persistProjectId,
        })
      );
      cleanup().register(`timer:${startResult.id}`, () => api().timeEntries.delete(startResult.id!));

      await delay(1000);

      // Stop it
      const stopResult = await withRetry(() =>
        api().timeEntries.stopTimer(ctx().userId, { end: new Date().toISOString() })
      );
      reporter().addResult(validateResponse(stopResult, {
        name: "Stop timer", tag: "Time Entry", method: "PATCH",
        path: `/workspaces/${ctx().workspaceId}/user/${ctx().userId}/time-entries`,
        specSchema: timeEntryDtoImplV1Schema, realitySchema: realTimeEntrySchema,
      }));
    });
  });
}
