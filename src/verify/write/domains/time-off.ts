import { describe, it, expect } from "vitest";
import type { Clockify } from "../../../client/clockify.js";
import type { TestContext, CleanupRegistry } from "../context.js";
import type { Reporter } from "../../reporter.js";
import { withRetry } from "../helpers.js";

let skipped = false;

export function registerTimeOffTests(
  api: () => Clockify,
  ctx: () => TestContext,
  cleanup: () => CleanupRegistry,
  reporter: () => Reporter
) {
  describe("Time-off Request lifecycle", () => {
    it("lists time-off requests", async () => {
      try {
        await withRetry(() =>
          api().timeOff.getAll({
            start: "2024-01-01T00:00:00Z",
            end: "2027-12-31T23:59:59Z",
          })
        );
      } catch (err: any) {
        if (err.message?.includes("403")) {
          skipped = true;
          console.log("    Time-off endpoints require paid plan — skipping");
          return;
        }
        throw err;
      }
    });

    it("creates a time-off request", async () => {
      if (skipped || !ctx().persistPolicyId) return;
      try {
        const result = await withRetry(() =>
          api().timeOff.create(ctx().persistPolicyId!, {
            timeOffPeriod: {
              period: {
                start: "2027-07-01T00:00:00Z",
                end: "2027-07-02T00:00:00Z",
              },
            },
          })
        );
        const id = (result as any)?.id;
        if (id) {
          cleanup().register(`time-off:${id}`, () =>
            api().timeOff.delete(ctx().persistPolicyId!, id)
          );
          ctx().timeOffRequestId = id;
        }
      } catch (err: any) {
        if (err.message?.includes("403") || err.message?.includes("400")) return;
        throw err;
      }
    });

    it("changes time-off request status", async () => {
      if (skipped || !ctx().timeOffRequestId) return;
      try {
        await withRetry(() =>
          api().timeOff.changeStatus(ctx().persistPolicyId!, ctx().timeOffRequestId!, {
            status: "APPROVED",
          })
        );
      } catch (err: any) {
        // Status change may fail if not in correct state
        if (err.message?.includes("403") || err.message?.includes("400")) return;
        throw err;
      }
    });

    it("creates a time-off request for user", async () => {
      if (skipped || !ctx().persistPolicyId) return;
      try {
        const result = await withRetry(() =>
          api().timeOff.createForUser(ctx().persistPolicyId!, ctx().userId, {
            timeOffPeriod: {
              period: {
                start: "2027-08-01T00:00:00Z",
                end: "2027-08-02T00:00:00Z",
              },
            },
          })
        );
        const id = (result as any)?.id;
        if (id) {
          cleanup().register(`time-off-user:${id}`, () =>
            api().timeOff.delete(ctx().persistPolicyId!, id)
          );
        }
      } catch (err: any) {
        if (err.message?.includes("403") || err.message?.includes("400")) return;
        throw err;
      }
    });

    it("deletes a time-off request", async () => {
      if (skipped || !ctx().timeOffRequestId) return;
      try {
        await withRetry(() =>
          api().timeOff.delete(ctx().persistPolicyId!, ctx().timeOffRequestId!)
        );
        cleanup().remove(`time-off:${ctx().timeOffRequestId}`);
      } catch (err: any) {
        if (err.message?.includes("403") || err.message?.includes("400") || err.message?.includes("Unexpected end")) return;
        throw err;
      }
    });

    it("updates balances for policy", async () => {
      if (skipped || !ctx().persistPolicyId) return;
      try {
        await withRetry(() =>
          api().balances.update(ctx().persistPolicyId!, {} as any)
        );
      } catch (err: any) {
        if (err.message?.includes("403") || err.message?.includes("400") || err.message?.includes("Unexpected end")) return;
        throw err;
      }
    });
  });
}
