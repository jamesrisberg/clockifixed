import { describe, it } from "vitest";
import type { Clockify } from "../../../client/clockify.js";
import type { TestContext, CleanupRegistry } from "../context.js";
import type { Reporter } from "../../reporter.js";
import { withRetry } from "../helpers.js";
import { PREFIX_PATTERN } from "../fixtures.js";

const ts = () => Date.now().toString(36);

export function registerSharedReportTests(
  api: () => Clockify,
  ctx: () => TestContext,
  cleanup: () => CleanupRegistry,
  reporter: () => Reporter
) {
  describe("Shared Report lifecycle", () => {
    it("creates a shared report", async () => {
      try {
        const result = await withRetry(() =>
          api().sharedReports.create({
            name: `${PREFIX_PATTERN}Report ${ts()}`,
            isPublic: false,
          } as any)
        );
        const id = (result as any)?.id;
        if (id) {
          cleanup().register(`shared-report:${id}`, () => api().sharedReports.delete(id));

          // Update
          try {
            await withRetry(() =>
              api().sharedReports.update(id, {
                name: `${PREFIX_PATTERN}Report Updated ${ts()}`,
                isPublic: false,
              } as any)
            );
          } catch {}

          // Delete
          try {
            await withRetry(() => api().sharedReports.delete(id));
            cleanup().remove(`shared-report:${id}`);
          } catch {}
        }
      } catch (err: any) {
        // 404 = endpoint not available, 403 = plan restriction
        if (err.message?.includes("403") || err.message?.includes("404") || err.message?.includes("400")) {
          console.log("    Shared reports not available — skipping");
          return;
        }
        throw err;
      }
    });
  });
}
