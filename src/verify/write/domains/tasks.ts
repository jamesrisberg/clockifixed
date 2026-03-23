import { describe, it, expect } from "vitest";
import type { Clockify } from "../../../client/clockify.js";
import { taskSchema } from "../../../types/index.js";
import { realTaskSchema } from "../../../types/overrides.js";
import type { TestContext, CleanupRegistry } from "../context.js";
import type { Reporter } from "../../reporter.js";
import { fixtures, updates } from "../fixtures.js";
import { withRetry, validateResponse } from "../helpers.js";

export function registerTaskTests(
  api: () => Clockify,
  ctx: () => TestContext,
  cleanup: () => CleanupRegistry,
  reporter: () => Reporter
) {
  describe("Task lifecycle", () => {
    it("creates a task", async () => {
      const body = fixtures.task();
      const result = await withRetry(() => api().tasks.create(ctx().persistProjectId!, body));
      cleanup().register(`task:${result.id}`, () => api().tasks.delete(ctx().persistProjectId!, result.id!));
      ctx().taskId = result.id!;
      ctx().persistTaskId = result.id!;

      reporter().addResult(validateResponse(result, {
        name: "Create task", tag: "Task", method: "POST",
        path: `/workspaces/${ctx().workspaceId}/projects/${ctx().persistProjectId}/tasks`,
        specSchema: taskSchema, realitySchema: realTaskSchema,
      }));
      expect(result.name).toBe(body.name);
    });

    it("reads back created task", async () => {
      const result = await withRetry(() => api().tasks.get(ctx().persistProjectId!, ctx().taskId!));
      reporter().addResult(validateResponse(result, {
        name: "Get task (after create)", tag: "Task", method: "GET",
        path: `/workspaces/${ctx().workspaceId}/projects/${ctx().persistProjectId}/tasks/${ctx().taskId}`,
        specSchema: taskSchema, realitySchema: realTaskSchema,
      }));
      expect(result.id).toBe(ctx().taskId);
    });

    it("updates the task", async () => {
      const body = updates.task();
      const result = await withRetry(() => api().tasks.update(ctx().persistProjectId!, ctx().taskId!, body));
      reporter().addResult(validateResponse(result, {
        name: "Update task", tag: "Task", method: "PUT",
        path: `/workspaces/${ctx().workspaceId}/projects/${ctx().persistProjectId}/tasks/${ctx().taskId}`,
        specSchema: taskSchema, realitySchema: realTaskSchema,
      }));
      expect(result.name).toBe(body.name);
    });

    it("sets task cost rate", async () => {
      const result = await withRetry(() =>
        api().tasks.setCostRate(ctx().persistProjectId!, ctx().taskId!, { amount: 2500 })
      );
      reporter().addResult(validateResponse(result, {
        name: "Set task cost rate", tag: "Task", method: "PUT",
        path: `/workspaces/${ctx().workspaceId}/projects/${ctx().persistProjectId}/tasks/${ctx().taskId}/cost-rate`,
        specSchema: taskSchema, realitySchema: realTaskSchema,
      }));
    });

    it("sets task hourly rate", async () => {
      const result = await withRetry(() =>
        api().tasks.setHourlyRate(ctx().persistProjectId!, ctx().taskId!, { amount: 5000 })
      );
      reporter().addResult(validateResponse(result, {
        name: "Set task hourly rate", tag: "Task", method: "PUT",
        path: `/workspaces/${ctx().workspaceId}/projects/${ctx().persistProjectId}/tasks/${ctx().taskId}/hourly-rate`,
        specSchema: taskSchema, realitySchema: realTaskSchema,
      }));
    });
  });
}
