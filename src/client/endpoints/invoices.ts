import { HttpClient } from "../http.js";
import type {
  InvoicesList,
  InvoiceOverview,
  InvoicePayment,
  InvoiceSettings,
  InvoiceInfoResponse,
  CreateInvoice,
  CreateInvoiceRequest,
  UpdateInvoiceRequest,
  InvoiceFilterRequest,
  CreateInvoiceItemRequest,
  ImportTimeEntriesAndExpensesRequest,
  CreateInvoicePaymentRequest,
  ChangeInvoiceStatusRequest,
  UpdateInvoiceSettingsRequest,
} from "../../types/index.js";

export class InvoiceEndpoints {
  constructor(
    private http: HttpClient,
    private workspaceId: string
  ) {}

  /**
   * Get all invoices in the workspace.
   *
   * @param params - Optional query parameters for filtering
   * @returns The invoices list
   */
  async getAll(params?: Record<string, string | number | boolean | undefined>): Promise<InvoicesList> {
    return this.http.get<InvoicesList>(
      `/workspaces/${this.workspaceId}/invoices`,
      { params }
    );
  }

  /**
   * Create a new invoice.
   *
   * @param body - The invoice details including client, currency, dates, and number
   * @returns The created invoice
   *
   * @example
   * ```ts
   * const invoice = await clockify.invoices.create({
   *   clientId: "64a1234567890abcdef12345",
   *   currency: "USD",
   *   issuedDate: "2026-03-01T00:00:00Z",
   *   dueDate: "2026-03-31T00:00:00Z",
   *   number: "INV-001",
   * });
   * ```
   */
  async create(body: CreateInvoiceRequest): Promise<CreateInvoice> {
    return this.http.post<CreateInvoice>(
      `/workspaces/${this.workspaceId}/invoices`,
      { body }
    );
  }

  /**
   * Filter invoices and get summary info via a POST body.
   *
   * @param body - The filter criteria
   * @returns Filtered invoice information
   */
  async getInfo(body: InvoiceFilterRequest): Promise<InvoiceInfoResponse> {
    return this.http.post<InvoiceInfoResponse>(
      `/workspaces/${this.workspaceId}/invoices/info`,
      { body }
    );
  }

  /**
   * Get an invoice by ID.
   *
   * @param invoiceId - The invoice ID
   * @returns The invoice overview with items and totals
   */
  async get(invoiceId: string): Promise<InvoiceOverview> {
    return this.http.get<InvoiceOverview>(
      `/workspaces/${this.workspaceId}/invoices/${invoiceId}`
    );
  }

  /**
   * Update an invoice.
   *
   * @param invoiceId - The invoice ID
   * @param body - The fields to update (number, currency, dates, taxes, etc.)
   * @returns The updated invoice overview
   */
  async update(invoiceId: string, body: UpdateInvoiceRequest): Promise<InvoiceOverview> {
    return this.http.put<InvoiceOverview>(
      `/workspaces/${this.workspaceId}/invoices/${invoiceId}`,
      { body }
    );
  }

  /**
   * Delete an invoice.
   *
   * @param invoiceId - The invoice ID
   */
  async delete(invoiceId: string): Promise<void> {
    return this.http.delete<void>(
      `/workspaces/${this.workspaceId}/invoices/${invoiceId}`
    );
  }

  /**
   * Duplicate an invoice, creating an identical copy.
   *
   * @param invoiceId - The invoice ID to duplicate
   * @returns The newly created duplicate invoice
   */
  async duplicate(invoiceId: string): Promise<InvoiceOverview> {
    return this.http.post<InvoiceOverview>(
      `/workspaces/${this.workspaceId}/invoices/${invoiceId}/duplicate`
    );
  }

  /**
   * Export an invoice as a binary download (e.g. PDF).
   *
   * @param invoiceId - The invoice ID
   */
  async export(invoiceId: string): Promise<void> {
    return this.http.get<void>(
      `/workspaces/${this.workspaceId}/invoices/${invoiceId}/export`
    );
  }

  /**
   * Add a line item to an invoice.
   *
   * @param invoiceId - The invoice ID
   * @param body - The line item details (description, quantity, unit price in cents)
   * @returns The updated invoice overview
   */
  async addItem(invoiceId: string, body: CreateInvoiceItemRequest): Promise<InvoiceOverview> {
    return this.http.post<InvoiceOverview>(
      `/workspaces/${this.workspaceId}/invoices/${invoiceId}/items`,
      { body }
    );
  }

  /**
   * Import time entries and expenses into an invoice as line items.
   *
   * @param invoiceId - The invoice ID
   * @param body - The import criteria (date range, users, projects, etc.)
   * @returns The updated invoice overview with imported items
   */
  async importTimeEntriesAndExpenses(
    invoiceId: string,
    body: ImportTimeEntriesAndExpensesRequest
  ): Promise<InvoiceOverview> {
    return this.http.post<InvoiceOverview>(
      `/workspaces/${this.workspaceId}/invoices/${invoiceId}/items/import`,
      { body }
    );
  }

  /**
   * Remove a line item from an invoice by its order position.
   *
   * @param invoiceId - The invoice ID
   * @param order - The zero-based order index of the item to remove
   * @returns The updated invoice overview
   */
  async removeItem(invoiceId: string, order: number): Promise<InvoiceOverview> {
    return this.http.delete<InvoiceOverview>(
      `/workspaces/${this.workspaceId}/invoices/${invoiceId}/items/${order}`
    );
  }

  /**
   * Get all payments recorded for an invoice.
   *
   * @param invoiceId - The invoice ID
   * @returns Array of payments
   */
  async getPayments(invoiceId: string): Promise<InvoicePayment[]> {
    return this.http.get<InvoicePayment[]>(
      `/workspaces/${this.workspaceId}/invoices/${invoiceId}/payments`
    );
  }

  /**
   * Record a payment against an invoice.
   *
   * @param invoiceId - The invoice ID
   * @param body - The payment details
   * @returns The updated invoice overview
   */
  async createPayment(
    invoiceId: string,
    body: CreateInvoicePaymentRequest
  ): Promise<InvoiceOverview> {
    return this.http.post<InvoiceOverview>(
      `/workspaces/${this.workspaceId}/invoices/${invoiceId}/payments`,
      { body }
    );
  }

  /**
   * Delete a payment from an invoice.
   *
   * @param invoiceId - The invoice ID
   * @param paymentId - The payment ID to delete
   * @returns The updated invoice overview
   */
  async deletePayment(invoiceId: string, paymentId: string): Promise<InvoiceOverview> {
    return this.http.delete<InvoiceOverview>(
      `/workspaces/${this.workspaceId}/invoices/${invoiceId}/payments/${paymentId}`
    );
  }

  /**
   * Change the status of an invoice (e.g. UNSENT, SENT, PAID, VOID).
   *
   * @param invoiceId - The invoice ID
   * @param body - The new status
   */
  async changeStatus(invoiceId: string, body: ChangeInvoiceStatusRequest): Promise<void> {
    return this.http.patch<void>(
      `/workspaces/${this.workspaceId}/invoices/${invoiceId}/status`,
      { body }
    );
  }

  /**
   * Get the invoice settings for the workspace (default currency, tax rates, etc.).
   *
   * @returns The invoice settings
   */
  async getSettings(): Promise<InvoiceSettings> {
    return this.http.get<InvoiceSettings>(
      `/workspaces/${this.workspaceId}/invoices/settings`
    );
  }

  /**
   * Update the invoice settings for the workspace.
   *
   * @param body - The settings to update
   */
  async updateSettings(body: UpdateInvoiceSettingsRequest): Promise<void> {
    return this.http.put<void>(
      `/workspaces/${this.workspaceId}/invoices/settings`,
      { body }
    );
  }
}
