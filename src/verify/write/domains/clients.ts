import { describe, it, expect } from "vitest";
import type { Clockify } from "../../../client/clockify.js";
import { clientWithCurrencySchema, clientSchema } from "../../../types/index.js";
import { realClientSchema } from "../../../types/overrides.js";
import type { TestContext, CleanupRegistry } from "../context.js";
import type { Reporter } from "../../reporter.js";
import { fixtures, updates } from "../fixtures.js";
import { withRetry, validateResponse } from "../helpers.js";

export function registerClientTests(
  api: () => Clockify,
  ctx: () => TestContext,
  cleanup: () => CleanupRegistry,
  reporter: () => Reporter
) {
  describe("Client lifecycle", () => {
    it("creates a client", async () => {
      const body = fixtures.client();
      const result = await withRetry(() => api().clients.create(body));
      cleanup().register(`client:${result.id}`, async () => { await api().clients.delete(result.id!); });
      ctx().clientId = result.id!;

      reporter().addResult(validateResponse(result, {
        name: "Create client", tag: "Client", method: "POST",
        path: `/workspaces/${ctx().workspaceId}/clients`,
        specSchema: clientWithCurrencySchema, realitySchema: realClientSchema,
      }));
      expect(result.id).toBeDefined();
      expect(result.name).toBe(body.name);
    });

    it("creates a persistent client for later phases", async () => {
      const body = fixtures.client();
      const result = await withRetry(() => api().clients.create(body));
      cleanup().register(`persist-client:${result.id}`, async () => { await api().clients.delete(result.id!); });
      ctx().persistClientId = result.id!;
      expect(result.id).toBeDefined();
    });

    it("reads back created client", async () => {
      const result = await withRetry(() => api().clients.get(ctx().clientId!));
      reporter().addResult(validateResponse(result, {
        name: "Get client (after create)", tag: "Client", method: "GET",
        path: `/workspaces/${ctx().workspaceId}/clients/${ctx().clientId}`,
        specSchema: clientWithCurrencySchema, realitySchema: realClientSchema,
      }));
      expect(result.id).toBe(ctx().clientId);
    });

    it("updates the client", async () => {
      const body = updates.client();
      const result = await withRetry(() => api().clients.update(ctx().clientId!, body));
      reporter().addResult(validateResponse(result, {
        name: "Update client", tag: "Client", method: "PUT",
        path: `/workspaces/${ctx().workspaceId}/clients/${ctx().clientId}`,
        specSchema: clientSchema,
      }));
      expect(result.name).toBe(body.name);
    });

    it("deletes the client", async () => {
      const result = await withRetry(() => api().clients.delete(ctx().clientId!));
      cleanup().remove(`client:${ctx().clientId}`);
      reporter().addResult(validateResponse(result, {
        name: "Delete client", tag: "Client", method: "DELETE",
        path: `/workspaces/${ctx().workspaceId}/clients/${ctx().clientId}`,
        specSchema: clientSchema,
      }));
    });

    it("verifies client is gone", async () => {
      await expect(withRetry(() => api().clients.get(ctx().clientId!))).rejects.toThrow();
    });
  });
}
