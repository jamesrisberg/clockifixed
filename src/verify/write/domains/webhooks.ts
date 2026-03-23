import { describe, it, expect } from "vitest";
import type { Clockify } from "../../../client/clockify.js";
import { webhookSchema } from "../../../types/models/webhook.js";
import type { TestContext, CleanupRegistry } from "../context.js";
import type { Reporter } from "../../reporter.js";
import { fixtures, updates } from "../fixtures.js";
import { withRetry, validateResponse } from "../helpers.js";

export function registerWebhookTests(
  api: () => Clockify,
  ctx: () => TestContext,
  cleanup: () => CleanupRegistry,
  reporter: () => Reporter
) {
  describe("Webhook lifecycle", () => {
    it("creates a webhook", async () => {
      const body = fixtures.webhook(ctx().workspaceId);
      const result = await withRetry(() => api().webhooks.create(body));
      cleanup().register(`webhook:${result.id}`, () => api().webhooks.delete(result.id!));
      ctx().webhookId = result.id!;

      reporter().addResult(validateResponse(result, {
        name: "Create webhook", tag: "Webhook", method: "POST",
        path: `/workspaces/${ctx().workspaceId}/webhooks`,
        specSchema: webhookSchema,
      }));
      expect(result.id).toBeDefined();
    });

    it("reads back created webhook", async () => {
      const result = await withRetry(() => api().webhooks.get(ctx().webhookId!));
      reporter().addResult(validateResponse(result, {
        name: "Get webhook (after create)", tag: "Webhook", method: "GET",
        path: `/workspaces/${ctx().workspaceId}/webhooks/${ctx().webhookId}`,
        specSchema: webhookSchema,
      }));
      expect(result.id).toBe(ctx().webhookId);
    });

    it("updates the webhook", async () => {
      const body = updates.webhook(ctx().workspaceId);
      const result = await withRetry(() => api().webhooks.update(ctx().webhookId!, body));
      reporter().addResult(validateResponse(result, {
        name: "Update webhook", tag: "Webhook", method: "PUT",
        path: `/workspaces/${ctx().workspaceId}/webhooks/${ctx().webhookId}`,
        specSchema: webhookSchema,
      }));
    });

    it("regenerates webhook token", async () => {
      const result = await withRetry(() => api().webhooks.regenerateToken(ctx().webhookId!));
      reporter().addResult(validateResponse(result, {
        name: "Regenerate webhook token", tag: "Webhook", method: "PATCH",
        path: `/workspaces/${ctx().workspaceId}/webhooks/${ctx().webhookId}/token`,
        specSchema: webhookSchema,
      }));
    });

    it("gets webhook logs", async () => {
      try {
        await withRetry(() => api().webhooks.getLogs(ctx().webhookId!, {}));
      } catch (err: any) {
        if (err.message?.includes("403") || err.message?.includes("400")) return;
        throw err;
      }
    });

    it("deletes the webhook", async () => {
      try {
        await withRetry(() => api().webhooks.delete(ctx().webhookId!));
      } catch (err: any) {
        // Webhook delete may return empty body — that's OK if it's gone
        if (!err.message?.includes("Unexpected end of JSON")) throw err;
      }
      cleanup().remove(`webhook:${ctx().webhookId}`);
    });
  });
}
