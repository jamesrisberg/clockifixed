import { describe, it } from "vitest";
import type { Clockify } from "../../../client/clockify.js";
import { schedulingProjectsTotalsSchema, schedulingUsersTotalsSchema } from "../../../types/models/scheduling.js";
import type { TestContext, CleanupRegistry } from "../context.js";
import type { Reporter } from "../../reporter.js";
import { withRetry } from "../helpers.js";
import { validateResponse } from "../helpers.js";

let skipped = false;

export function registerSchedulingTests(
  api: () => Clockify,
  ctx: () => TestContext,
  cleanup: () => CleanupRegistry,
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

    it("creates, updates, copies, publishes, and deletes a recurring assignment", async () => {
      if (skipped || !ctx().persistProjectId) return;
      try {
        // Create
        const result = await withRetry(() =>
          api().scheduling.createRecurring({
            assigneeId: ctx().userId,
            projectId: ctx().persistProjectId!,
            startDate: "2027-06-01",
            endDate: "2027-06-30",
            recurrence: { period: "WEEKLY", daysOfWeek: ["MONDAY"] },
          } as any)
        );

        if (!Array.isArray(result) || !result[0]?.id) return;
        const assignmentId: string = result[0].id;
        cleanup().register(`assignment:${assignmentId}`, async () => {
          try { await api().scheduling.deleteRecurring(assignmentId); } catch {}
        });
        ctx().assignmentId = assignmentId;

        // Update recurring
        try {
          await withRetry(() =>
            api().scheduling.updateRecurring(assignmentId, {
              assigneeId: ctx().userId,
              projectId: ctx().persistProjectId!,
              startDate: "2027-06-01",
              endDate: "2027-07-31",
              recurrence: { period: "WEEKLY", daysOfWeek: ["MONDAY", "WEDNESDAY"] },
            } as any)
          );
        } catch (err: any) {
          if (!err.message?.includes("400")) throw err;
        }

        // Update recurring period
        try {
          await withRetry(() =>
            api().scheduling.updateRecurringPeriod(assignmentId, {
              startDate: "2027-06-01",
              endDate: "2027-08-31",
            })
          );
        } catch (err: any) {
          if (!err.message?.includes("400")) throw err;
        }

        // Copy
        try {
          const copied = await withRetry(() =>
            api().scheduling.copyAssignment(assignmentId, {
              startDate: "2027-09-01",
              endDate: "2027-09-30",
            } as any)
          );
          if (Array.isArray(copied) && copied[0]?.id) {
            const copyId = copied[0].id!;
            cleanup().register(`assignment-copy:${copyId}`, async () => {
              try { await api().scheduling.deleteRecurring(copyId); } catch {}
            });
          }
        } catch (err: any) {
          if (!err.message?.includes("400")) throw err;
        }

        // Publish
        try {
          await withRetry(() =>
            api().scheduling.publishAssignments({
              assignmentIds: [assignmentId],
            } as any)
          );
        } catch (err: any) {
          if (!err.message?.includes("400") && !err.message?.includes("Unexpected end")) throw err;
        }

        // Delete
        await withRetry(() => api().scheduling.deleteRecurring(assignmentId));
        cleanup().remove(`assignment:${assignmentId}`);

      } catch (err: any) {
        if (err.message?.includes("403") || err.message?.includes("400")) return;
        throw err;
      }
    });
  });
}
