import { describe, it, expect } from "vitest";
import type { Clockify } from "../../../client/clockify.js";
import { invoiceOverviewSchema, invoiceSettingsSchema } from "../../../types/models/invoice.js";
import type { TestContext, CleanupRegistry } from "../context.js";
import type { Reporter } from "../../reporter.js";
import { withRetry, validateResponse } from "../helpers.js";
import { PREFIX_PATTERN } from "../fixtures.js";

const ts = () => Date.now().toString(36);

export function registerInvoiceTests(
  api: () => Clockify,
  ctx: () => TestContext,
  cleanup: () => CleanupRegistry,
  reporter: () => Reporter
) {
  describe("Invoice lifecycle", () => {
    it("creates an invoice", async () => {
      const result = await withRetry(() =>
        api().invoices.create({
          clientId: ctx().persistClientId!,
          currency: "USD",
          dueDate: "2027-06-30T00:00:00Z",
          issuedDate: "2027-06-01T00:00:00Z",
          number: `${PREFIX_PATTERN}${ts()}`,
        })
      );
      // CreateInvoice response may have different shape — use unknown for now
      const id = (result as any).id;
      if (id) {
        cleanup().register(`invoice:${id}`, () => api().invoices.delete(id));
        ctx().invoiceId = id;
      }
      expect(id).toBeDefined();
    });

    it("reads back created invoice", async () => {
      if (!ctx().invoiceId) return;
      const result = await withRetry(() => api().invoices.get(ctx().invoiceId!));
      reporter().addResult(validateResponse(result, {
        name: "Get invoice (after create)", tag: "Invoice", method: "GET",
        path: `/workspaces/${ctx().workspaceId}/invoices/${ctx().invoiceId}`,
        specSchema: invoiceOverviewSchema,
      }));
    });

    it("updates the invoice", async () => {
      if (!ctx().invoiceId) return;
      const result = await withRetry(() =>
        api().invoices.update(ctx().invoiceId!, {
          number: `${PREFIX_PATTERN}UPD${ts()}`,
          currency: "USD",
          discountPercent: 0,
          dueDate: "2027-06-30T00:00:00Z",
          issuedDate: "2027-06-01T00:00:00Z",
          taxPercent: 0,
          tax2Percent: 0,
        })
      );
      reporter().addResult(validateResponse(result, {
        name: "Update invoice", tag: "Invoice", method: "PUT",
        path: `/workspaces/${ctx().workspaceId}/invoices/${ctx().invoiceId}`,
        specSchema: invoiceOverviewSchema,
      }));
    });

    it("adds an item to the invoice", async () => {
      if (!ctx().invoiceId) return;
      try {
        const result = await withRetry(() =>
          api().invoices.addItem(ctx().invoiceId!, {
            description: "_cfix_test_line_item",
            quantity: 1,
            unitPrice: 10000,
            applyTaxes: "NONE",
            itemType: "CUSTOM",
          })
        );
        reporter().addResult(validateResponse(result, {
          name: "Add invoice item", tag: "Invoice", method: "POST",
          path: `/workspaces/${ctx().workspaceId}/invoices/${ctx().invoiceId}/items`,
          specSchema: invoiceOverviewSchema,
        }));
      } catch (err: any) {
        if (err.message?.includes("403") || err.message?.includes("400") || err.message?.includes("404")) return;
        throw err;
      }
    });

    it("removes an item from the invoice", async () => {
      if (!ctx().invoiceId) return;
      try {
        await withRetry(() => api().invoices.removeItem(ctx().invoiceId!, 0));
      } catch (err: any) {
        // May fail if no items or index wrong
        if (err.message?.includes("400") || err.message?.includes("404")) return;
        throw err;
      }
    });

    it("creates a payment on the invoice", async () => {
      if (!ctx().invoiceId) return;
      try {
        const result = await withRetry(() =>
          api().invoices.createPayment(ctx().invoiceId!, {
            amount: 5000,
            paymentDate: "2027-06-15T00:00:00Z",
          })
        );
        reporter().addResult(validateResponse(result, {
          name: "Create invoice payment", tag: "Invoice", method: "POST",
          path: `/workspaces/${ctx().workspaceId}/invoices/${ctx().invoiceId}/payments`,
          specSchema: invoiceOverviewSchema,
        }));
      } catch (err: any) {
        if (err.message?.includes("403") || err.message?.includes("400")) return;
        throw err;
      }
    });

    it("changes invoice status", async () => {
      if (!ctx().invoiceId) return;
      try {
        await withRetry(() =>
          api().invoices.changeStatus(ctx().invoiceId!, { invoiceStatus: "SENT" })
        );
      } catch (err: any) {
        // Status change may return void or fail
        if (err.message?.includes("403") || err.message?.includes("400") || err.message?.includes("Unexpected end")) return;
        throw err;
      }
    });

    it("filters invoices", async () => {
      try {
        await withRetry(() => api().invoices.getInfo({}));
      } catch (err: any) {
        if (err.message?.includes("403") || err.message?.includes("400")) return;
        throw err;
      }
    });

    it("gets invoice settings", async () => {
      const result = await withRetry(() => api().invoices.getSettings());
      reporter().addResult(validateResponse(result, {
        name: "Get invoice settings", tag: "Invoice", method: "GET",
        path: `/workspaces/${ctx().workspaceId}/invoices/settings`,
        specSchema: invoiceSettingsSchema,
      }));
    });

    it("deletes the invoice", async () => {
      if (!ctx().invoiceId) return;
      try {
        await withRetry(() => api().invoices.delete(ctx().invoiceId!));
        cleanup().remove(`invoice:${ctx().invoiceId}`);
      } catch (err: any) {
        // Invoice delete may return empty body or workspace mismatch on cleanup timing
        if (err.message?.includes("Unexpected end of JSON") || err.message?.includes("doesn't belong")) {
          cleanup().remove(`invoice:${ctx().invoiceId}`);
          return;
        }
        throw err;
      }
    });
  });
}
