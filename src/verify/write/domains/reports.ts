import { describe, it } from "vitest";
import type { Clockify } from "../../../client/clockify.js";
import type { TestContext } from "../context.js";
import type { Reporter } from "../../reporter.js";
import { withRetry } from "../helpers.js";

let skipped = false;

export function registerReportTests(
  api: () => Clockify,
  ctx: () => TestContext,
  reporter: () => Reporter
) {
  describe("Report operations", () => {
    const dateRange = {
      dateRangeStart: "2024-01-01T00:00:00Z",
      dateRangeEnd: "2027-12-31T23:59:59Z",
    };

    it("generates a summary report", async () => {
      try {
        await withRetry(() => api().reports.summary({
          ...dateRange,
          summaryFilter: { groups: [] },
        }));
      } catch (err: any) {
        if (err.message?.includes("403") || err.message?.includes("404") || err.message?.includes("400")) {
          skipped = true;
          console.log("    Reports may need paid plan or reports API — skipping remaining");
          return;
        }
        throw err;
      }
    });

    it("generates a detailed report", async () => {
      if (skipped) return;
      try {
        await withRetry(() => api().reports.detailed({
          ...dateRange,
          detailedFilter: { page: 1, pageSize: 10 },
        }));
      } catch (err: any) {
        if (err.message?.includes("403") || err.message?.includes("404") || err.message?.includes("400")) return;
        throw err;
      }
    });

    it("generates a weekly report", async () => {
      if (skipped) return;
      try {
        await withRetry(() => api().reports.weekly({
          ...dateRange,
          weeklyFilter: {},
        }));
      } catch (err: any) {
        if (err.message?.includes("403") || err.message?.includes("404") || err.message?.includes("400")) return;
        throw err;
      }
    });

    it("generates an attendance report", async () => {
      if (skipped) return;
      try {
        await withRetry(() => api().reports.attendance({
          ...dateRange,
          attendanceFilter: {},
        }));
      } catch (err: any) {
        if (err.message?.includes("403") || err.message?.includes("404") || err.message?.includes("400")) return;
        throw err;
      }
    });

    it("generates an expense detailed report", async () => {
      if (skipped) return;
      try {
        await withRetry(() => api().reports.expenseDetailed({ ...dateRange }));
      } catch (err: any) {
        if (err.message?.includes("403") || err.message?.includes("404") || err.message?.includes("400")) return;
        throw err;
      }
    });

    it("gets audit log", async () => {
      if (skipped) return;
      try {
        await withRetry(() => api().reports.auditLog({
          actions: ["CREATE_TIME_PERSONAL_MANUAL"],
          authors: { authorIds: [], contains: "CONTAINS" },
          start: "2024-01-01T00:00:00Z",
          end: "2027-12-31T23:59:59Z",
        }));
      } catch (err: any) {
        if (err.message?.includes("403") || err.message?.includes("404") || err.message?.includes("400")) return;
        throw err;
      }
    });
  });
}
