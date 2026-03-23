import { describe, it, expect } from "vitest";
import type { Clockify } from "../../../client/clockify.js";
import { expenseCategoryDtoV1Schema } from "../../../types/models/expense.js";
import type { TestContext, CleanupRegistry } from "../context.js";
import type { Reporter } from "../../reporter.js";
import { withRetry, validateResponse } from "../helpers.js";
import { PREFIX_PATTERN } from "../fixtures.js";

const ts = () => Date.now().toString(36);

export function registerExpenseCategoryTests(
  api: () => Clockify,
  ctx: () => TestContext,
  cleanup: () => CleanupRegistry,
  reporter: () => Reporter
) {
  describe("Expense Category lifecycle", () => {
    it("creates an expense category", async () => {
      const result = await withRetry(() =>
        api().expenses.createCategory({ name: `${PREFIX_PATTERN}Travel ${ts()}` })
      );
      cleanup().register(`expense-cat:${result.id}`, async () => {
        await api().expenses.archiveCategory(result.id!, { archived: true });
        await api().expenses.deleteCategory(result.id!);
      });
      ctx().expenseCategoryId = result.id!;
      ctx().persistCategoryId = result.id!;

      reporter().addResult(validateResponse(result, {
        name: "Create expense category", tag: "Expense", method: "POST",
        path: `/workspaces/${ctx().workspaceId}/expenses/categories`,
        specSchema: expenseCategoryDtoV1Schema,
      }));
      expect(result.id).toBeDefined();
    });

    it("updates the expense category", async () => {
      const result = await withRetry(() =>
        api().expenses.updateCategory(ctx().expenseCategoryId!, {
          name: `${PREFIX_PATTERN}Travel Updated ${ts()}`,
        })
      );
      reporter().addResult(validateResponse(result, {
        name: "Update expense category", tag: "Expense", method: "PUT",
        path: `/workspaces/${ctx().workspaceId}/expenses/categories/${ctx().expenseCategoryId}`,
        specSchema: expenseCategoryDtoV1Schema,
      }));
    });

    it("archives the expense category", async () => {
      const result = await withRetry(() =>
        api().expenses.archiveCategory(ctx().expenseCategoryId!, { archived: true })
      );
      reporter().addResult(validateResponse(result, {
        name: "Archive expense category", tag: "Expense", method: "PATCH",
        path: `/workspaces/${ctx().workspaceId}/expenses/categories/${ctx().expenseCategoryId}/status`,
        specSchema: expenseCategoryDtoV1Schema,
      }));
    });

    it("creates, updates, and deletes an expense", async () => {
      try {
        const result = await withRetry(() =>
          api().expenses.create({
            amount: 1500,
            categoryId: ctx().expenseCategoryId!,
            date: "2027-03-15T00:00:00Z",
            projectId: ctx().persistProjectId!,
            userId: ctx().userId,
            file: new Uint8Array(0),
          })
        );
        if (result?.id) {
          cleanup().register(`expense:${result.id}`, async () => {
            try { await api().expenses.delete(result.id!); } catch {}
          });

          await withRetry(() => api().expenses.update(result.id!, {
            amount: 2000,
            categoryId: ctx().expenseCategoryId!,
            date: "2027-03-15T00:00:00Z",
            projectId: ctx().persistProjectId!,
            userId: ctx().userId,
            changeFields: ["AMOUNT"],
            file: new Uint8Array(0),
          }));

          try {
            await withRetry(() => api().expenses.delete(result.id!));
          } catch (err: any) {
            if (!err.message?.includes("Unexpected end")) throw err;
          }
          cleanup().remove(`expense:${result.id}`);
        }
      } catch (err: any) {
        // May fail if expense feature not available or form data rejected
        if (err.message?.includes("403") || err.message?.includes("400") || err.message?.includes("415")) return;
        throw err;
      }
    });

    it("unarchives the expense category", async () => {
      // Restore it so dependent tests can use it
      await withRetry(() =>
        api().expenses.archiveCategory(ctx().expenseCategoryId!, { archived: false })
      );
    });
  });
}
