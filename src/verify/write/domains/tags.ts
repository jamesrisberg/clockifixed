import { describe, it, expect } from "vitest";
import type { Clockify } from "../../../client/clockify.js";
import { tagDtoV1Schema } from "../../../types/index.js";
import type { TestContext, CleanupRegistry } from "../context.js";
import type { Reporter } from "../../reporter.js";
import { fixtures, updates } from "../fixtures.js";
import { withRetry, validateResponse } from "../helpers.js";

export function registerTagTests(
  api: () => Clockify,
  ctx: () => TestContext,
  cleanup: () => CleanupRegistry,
  reporter: () => Reporter
) {
  describe("Tag lifecycle", () => {
    it("creates a tag", async () => {
      const body = fixtures.tag();
      const result = await withRetry(() => api().tags.create(body));
      cleanup().register(`tag:${result.id}`, () => api().tags.delete(result.id!));
      ctx().tagId = result.id!;

      reporter().addResult(validateResponse(result, {
        name: "Create tag", tag: "Tag", method: "POST",
        path: `/workspaces/${ctx().workspaceId}/tags`,
        specSchema: tagDtoV1Schema,
      }));
      expect(result.name).toBe(body.name);
    });

    it("reads back created tag", async () => {
      const result = await withRetry(() => api().tags.get(ctx().tagId!));
      expect(result.id).toBe(ctx().tagId);
    });

    it("updates the tag", async () => {
      const body = updates.tag();
      const result = await withRetry(() => api().tags.update(ctx().tagId!, body));
      reporter().addResult(validateResponse(result, {
        name: "Update tag", tag: "Tag", method: "PUT",
        path: `/workspaces/${ctx().workspaceId}/tags/${ctx().tagId}`,
        specSchema: tagDtoV1Schema,
      }));
      expect(result.name).toBe(body.name);
    });

    it("deletes the tag", async () => {
      const result = await withRetry(() => api().tags.delete(ctx().tagId!));
      cleanup().remove(`tag:${ctx().tagId}`);
      reporter().addResult(validateResponse(result, {
        name: "Delete tag", tag: "Tag", method: "DELETE",
        path: `/workspaces/${ctx().workspaceId}/tags/${ctx().tagId}`,
        specSchema: tagDtoV1Schema,
      }));
    });
  });
}
