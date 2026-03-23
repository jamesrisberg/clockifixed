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

  /** Get all invoices in the workspace. */
  async getAll(params?: Record<string, string | number | boolean | undefined>): Promise<InvoicesList> {
    return this.http.get<InvoicesList>(
      `/workspaces/${this.workspaceId}/invoices`,
      { params }
    );
  }

  /** Create a new invoice. */
  async create(body: CreateInvoiceRequest): Promise<CreateInvoice> {
    return this.http.post<CreateInvoice>(
      `/workspaces/${this.workspaceId}/invoices`,
      { body }
    );
  }

  /** Get invoice info using a filter. */
  async getInfo(body: InvoiceFilterRequest): Promise<InvoiceInfoResponse> {
    return this.http.post<InvoiceInfoResponse>(
      `/workspaces/${this.workspaceId}/invoices/info`,
      { body }
    );
  }

  /** Get an invoice by ID. */
  async get(invoiceId: string): Promise<InvoiceOverview> {
    return this.http.get<InvoiceOverview>(
      `/workspaces/${this.workspaceId}/invoices/${invoiceId}`
    );
  }

  /** Update an invoice. */
  async update(invoiceId: string, body: UpdateInvoiceRequest): Promise<InvoiceOverview> {
    return this.http.put<InvoiceOverview>(
      `/workspaces/${this.workspaceId}/invoices/${invoiceId}`,
      { body }
    );
  }

  /** Delete an invoice. */
  async delete(invoiceId: string): Promise<void> {
    return this.http.delete<void>(
      `/workspaces/${this.workspaceId}/invoices/${invoiceId}`
    );
  }

  /** Duplicate an invoice. */
  async duplicate(invoiceId: string): Promise<InvoiceOverview> {
    return this.http.post<InvoiceOverview>(
      `/workspaces/${this.workspaceId}/invoices/${invoiceId}/duplicate`
    );
  }

  /** Export an invoice. */
  async export(invoiceId: string): Promise<void> {
    return this.http.get<void>(
      `/workspaces/${this.workspaceId}/invoices/${invoiceId}/export`
    );
  }

  /** Add an item to an invoice. */
  async addItem(invoiceId: string, body: CreateInvoiceItemRequest): Promise<InvoiceOverview> {
    return this.http.post<InvoiceOverview>(
      `/workspaces/${this.workspaceId}/invoices/${invoiceId}/items`,
      { body }
    );
  }

  /** Import time entries and expenses into an invoice. */
  async importTimeEntriesAndExpenses(
    invoiceId: string,
    body: ImportTimeEntriesAndExpensesRequest
  ): Promise<InvoiceOverview> {
    return this.http.post<InvoiceOverview>(
      `/workspaces/${this.workspaceId}/invoices/${invoiceId}/items/import`,
      { body }
    );
  }

  /** Remove an item from an invoice by order. */
  async removeItem(invoiceId: string, order: number): Promise<InvoiceOverview> {
    return this.http.delete<InvoiceOverview>(
      `/workspaces/${this.workspaceId}/invoices/${invoiceId}/items/${order}`
    );
  }

  /** Get payments for an invoice. */
  async getPayments(invoiceId: string): Promise<InvoicePayment[]> {
    return this.http.get<InvoicePayment[]>(
      `/workspaces/${this.workspaceId}/invoices/${invoiceId}/payments`
    );
  }

  /** Create a payment for an invoice. */
  async createPayment(
    invoiceId: string,
    body: CreateInvoicePaymentRequest
  ): Promise<InvoiceOverview> {
    return this.http.post<InvoiceOverview>(
      `/workspaces/${this.workspaceId}/invoices/${invoiceId}/payments`,
      { body }
    );
  }

  /** Delete a payment from an invoice. */
  async deletePayment(invoiceId: string, paymentId: string): Promise<InvoiceOverview> {
    return this.http.delete<InvoiceOverview>(
      `/workspaces/${this.workspaceId}/invoices/${invoiceId}/payments/${paymentId}`
    );
  }

  /** Change the status of an invoice. */
  async changeStatus(invoiceId: string, body: ChangeInvoiceStatusRequest): Promise<void> {
    return this.http.patch<void>(
      `/workspaces/${this.workspaceId}/invoices/${invoiceId}/status`,
      { body }
    );
  }

  /** Get invoice settings for the workspace. */
  async getSettings(): Promise<InvoiceSettings> {
    return this.http.get<InvoiceSettings>(
      `/workspaces/${this.workspaceId}/invoices/settings`
    );
  }

  /** Update invoice settings for the workspace. */
  async updateSettings(body: UpdateInvoiceSettingsRequest): Promise<void> {
    return this.http.put<void>(
      `/workspaces/${this.workspaceId}/invoices/settings`,
      { body }
    );
  }
}
