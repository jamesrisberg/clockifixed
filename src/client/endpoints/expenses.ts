import { HttpClient } from "../http.js";
import type {
  Expense,
  ExpensesAndTotals,
  ExpenseCategoriesWithCount,
  ExpenseCategoryDtoV1,
  CreateExpenseV1Request,
  UpdateExpenseV1Request,
  ExpenseCategoryV1Request,
  ExpenseCategoryArchiveV1Request,
  ExpenseCategory,
} from "../../types/index.js";

export class ExpenseEndpoints {
  constructor(
    private http: HttpClient,
    private workspaceId: string
  ) {}

  /**
   * Get all expenses in the workspace. Returns expenses wrapped with
   * daily and weekly totals.
   *
   * @param params - Optional query parameters for filtering
   * @returns Expenses with daily and weekly totals
   */
  async getAll(params?: Record<string, string | number | boolean | undefined>): Promise<ExpensesAndTotals> {
    return this.http.get<ExpensesAndTotals>(
      `/workspaces/${this.workspaceId}/expenses`,
      { params }
    );
  }

  /**
   * Create a new expense. Sent as multipart/form-data as required by
   * the Clockify API (supports receipt file upload).
   *
   * @param body - The expense details including amount (in cents), category, date, and receipt file
   * @returns The created expense
   *
   * @example
   * ```ts
   * const expense = await clockify.expenses.create({
   *   amount: 2500,
   *   categoryId: "cat123",
   *   date: "2026-03-15T00:00:00Z",
   *   projectId: "proj123",
   *   userId: "user123",
   *   file: receiptBlob,
   * });
   * ```
   */
  async create(body: CreateExpenseV1Request): Promise<Expense> {
    return this.http.post<Expense>(
      `/workspaces/${this.workspaceId}/expenses`,
      { body: body as any, multipart: true }
    );
  }

  /**
   * Get an expense by ID.
   *
   * @param expenseId - The expense ID
   * @returns The expense
   */
  async get(expenseId: string): Promise<Expense> {
    return this.http.get<Expense>(
      `/workspaces/${this.workspaceId}/expenses/${expenseId}`
    );
  }

  /**
   * Update an expense. Sent as multipart/form-data as required by
   * the Clockify API.
   *
   * @param expenseId - The expense ID
   * @param body - The fields to update
   * @returns The updated expense
   */
  async update(expenseId: string, body: UpdateExpenseV1Request): Promise<Expense> {
    return this.http.put<Expense>(
      `/workspaces/${this.workspaceId}/expenses/${expenseId}`,
      { body: body as any, multipart: true }
    );
  }

  /**
   * Delete an expense.
   *
   * @param expenseId - The expense ID
   */
  async delete(expenseId: string): Promise<void> {
    return this.http.delete<void>(
      `/workspaces/${this.workspaceId}/expenses/${expenseId}`
    );
  }

  /**
   * Download a receipt file attached to an expense (binary download).
   *
   * @param expenseId - The expense ID
   * @param fileId - The file ID of the receipt
   */
  async downloadReceipt(expenseId: string, fileId: string): Promise<void> {
    return this.http.get<void>(
      `/workspaces/${this.workspaceId}/expenses/${expenseId}/files/${fileId}`
    );
  }

  /**
   * Get all expense categories with their count.
   *
   * @returns Categories wrapped with a total count
   */
  async getCategories(): Promise<ExpenseCategoriesWithCount> {
    return this.http.get<ExpenseCategoriesWithCount>(
      `/workspaces/${this.workspaceId}/expenses/categories`
    );
  }

  /**
   * Create an expense category.
   *
   * @param body - The category name
   * @returns The created category
   */
  async createCategory(body: ExpenseCategoryV1Request): Promise<ExpenseCategory> {
    return this.http.post<ExpenseCategoryDtoV1>(
      `/workspaces/${this.workspaceId}/expenses/categories`,
      { body }
    );
  }

  /**
   * Update an expense category.
   *
   * @param categoryId - The category ID
   * @param body - The fields to update
   * @returns The updated category
   */
  async updateCategory(
    categoryId: string,
    body: ExpenseCategoryV1Request
  ): Promise<ExpenseCategory> {
    return this.http.put<ExpenseCategoryDtoV1>(
      `/workspaces/${this.workspaceId}/expenses/categories/${categoryId}`,
      { body }
    );
  }

  /**
   * Delete an expense category. Must be archived first.
   *
   * @param categoryId - The category ID
   */
  async deleteCategory(categoryId: string): Promise<void> {
    return this.http.delete<void>(
      `/workspaces/${this.workspaceId}/expenses/categories/${categoryId}`
    );
  }

  /**
   * Archive or unarchive an expense category.
   *
   * @param categoryId - The category ID
   * @param body - The archive status to set
   * @returns The updated category
   */
  async archiveCategory(
    categoryId: string,
    body: ExpenseCategoryArchiveV1Request
  ): Promise<ExpenseCategory> {
    return this.http.patch<ExpenseCategoryDtoV1>(
      `/workspaces/${this.workspaceId}/expenses/categories/${categoryId}/status`,
      { body }
    );
  }
}
