import { describe, it, expect } from "vitest";
import type { Clockify } from "../../../client/clockify.js";
import { customFieldSchema } from "../../../types/index.js";
import { realCustomFieldSchema } from "../../../types/overrides.js";
import type { TestContext, CleanupRegistry } from "../context.js";
import type { Reporter } from "../../reporter.js";
import { fixtures } from "../fixtures.js";
import { withRetry, validateResponse } from "../helpers.js";

export function registerCustomFieldTests(
  api: () => Clockify,
  ctx: () => TestContext,
  cleanup: () => CleanupRegistry,
  reporter: () => Reporter
) {
  describe("Custom Field lifecycle", () => {
    it("creates a custom field", async () => {
      const body = fixtures.customField();
      await withRetry(() => api().customFields.create(body));

      const all = await withRetry(() => api().customFields.getAll());
      const created = all.find((cf: any) => cf.name === body.name);
      expect(created).toBeDefined();
      ctx().customFieldId = created!.id!;
      cleanup().register(`custom-field:${ctx().customFieldId}`, () =>
        api().customFields.delete(ctx().customFieldId!)
      );

      reporter().addResult(validateResponse(all, {
        name: "List custom fields (after create)", tag: "Custom Fields", method: "GET",
        path: `/workspaces/${ctx().workspaceId}/custom-fields`,
        specSchema: customFieldSchema, realitySchema: realCustomFieldSchema,
        array: true,
      }));
    });

    it("updates the custom field", async () => {
      const result = await withRetry(() =>
        api().customFields.update(ctx().customFieldId!, {
          name: "_cfix_test_Priority Updated",
          type: "TXT",
        })
      );
      reporter().addResult(validateResponse(result, {
        name: "Update custom field", tag: "Custom Fields", method: "PUT",
        path: `/workspaces/${ctx().workspaceId}/custom-fields/${ctx().customFieldId}`,
        specSchema: customFieldSchema, realitySchema: realCustomFieldSchema,
      }));
    });

    it("deletes the custom field", async () => {
      await withRetry(() => api().customFields.delete(ctx().customFieldId!));
      cleanup().remove(`custom-field:${ctx().customFieldId}`);
    });
  });
}
