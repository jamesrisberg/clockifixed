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

    // Expense create/update/delete require multipart/form-data (file upload)
    // which our JSON-only HttpClient doesn't support. Skipped.
    it("skips expense CRUD (requires multipart upload)", () => {
      // Documented gap: expenses.create/update/delete need multipart form data
    });

    it("unarchives the expense category", async () => {
      // Restore it so dependent tests can use it
      await withRetry(() =>
        api().expenses.archiveCategory(ctx().expenseCategoryId!, { archived: false })
      );
    });
  });
}
