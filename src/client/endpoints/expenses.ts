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

  /** Get all expenses in the workspace. */
  async getAll(params?: Record<string, string | number | boolean | undefined>): Promise<ExpensesAndTotals> {
    return this.http.get<ExpensesAndTotals>(
      `/workspaces/${this.workspaceId}/expenses`,
      { params }
    );
  }

  /** Create a new expense. Sent as multipart/form-data (required by Clockify). */
  async create(body: CreateExpenseV1Request): Promise<Expense> {
    return this.http.post<Expense>(
      `/workspaces/${this.workspaceId}/expenses`,
      { body: body as any, multipart: true }
    );
  }

  /** Get an expense by ID. */
  async get(expenseId: string): Promise<Expense> {
    return this.http.get<Expense>(
      `/workspaces/${this.workspaceId}/expenses/${expenseId}`
    );
  }

  /** Update an expense. Sent as multipart/form-data (required by Clockify). */
  async update(expenseId: string, body: UpdateExpenseV1Request): Promise<Expense> {
    return this.http.put<Expense>(
      `/workspaces/${this.workspaceId}/expenses/${expenseId}`,
      { body: body as any, multipart: true }
    );
  }

  /** Delete an expense. */
  async delete(expenseId: string): Promise<void> {
    return this.http.delete<void>(
      `/workspaces/${this.workspaceId}/expenses/${expenseId}`
    );
  }

  /** Download a receipt file for an expense. */
  async downloadReceipt(expenseId: string, fileId: string): Promise<void> {
    return this.http.get<void>(
      `/workspaces/${this.workspaceId}/expenses/${expenseId}/files/${fileId}`
    );
  }

  /** Get all expense categories. */
  async getCategories(): Promise<ExpenseCategoriesWithCount> {
    return this.http.get<ExpenseCategoriesWithCount>(
      `/workspaces/${this.workspaceId}/expenses/categories`
    );
  }

  /** Create an expense category. */
  async createCategory(body: ExpenseCategoryV1Request): Promise<ExpenseCategory> {
    return this.http.post<ExpenseCategoryDtoV1>(
      `/workspaces/${this.workspaceId}/expenses/categories`,
      { body }
    );
  }

  /** Update an expense category. */
  async updateCategory(
    categoryId: string,
    body: ExpenseCategoryV1Request
  ): Promise<ExpenseCategory> {
    return this.http.put<ExpenseCategoryDtoV1>(
      `/workspaces/${this.workspaceId}/expenses/categories/${categoryId}`,
      { body }
    );
  }

  /** Delete an expense category. */
  async deleteCategory(categoryId: string): Promise<void> {
    return this.http.delete<void>(
      `/workspaces/${this.workspaceId}/expenses/categories/${categoryId}`
    );
  }

  /** Archive or unarchive an expense category. */
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
