import { HttpClient } from "../http.js";
import type {
  Webhook,
  Webhooks,
  WebhookLog,
  CreateWebhookRequest,
  UpdateWebhookRequest,
  WebhookLogSearchRequest,
} from "../../types/index.js";

export class WebhookEndpoints {
  constructor(
    private http: HttpClient,
    private workspaceId: string
  ) {}

  /** Get all webhooks in the workspace. */
  async getAll(): Promise<Webhooks> {
    return this.http.get<Webhooks>(
      `/workspaces/${this.workspaceId}/webhooks`
    );
  }

  /** Get webhooks for a specific addon. */
  async getForAddon(addonId: string): Promise<Webhooks> {
    return this.http.get<Webhooks>(
      `/workspaces/${this.workspaceId}/addons/${addonId}/webhooks`
    );
  }

  /** Create a new webhook. */
  async create(body: CreateWebhookRequest): Promise<Webhook> {
    return this.http.post<Webhook>(
      `/workspaces/${this.workspaceId}/webhooks`,
      { body }
    );
  }

  /** Get a webhook by ID. */
  async get(webhookId: string): Promise<Webhook> {
    return this.http.get<Webhook>(
      `/workspaces/${this.workspaceId}/webhooks/${webhookId}`
    );
  }

  /** Update a webhook. */
  async update(webhookId: string, body: UpdateWebhookRequest): Promise<Webhook> {
    return this.http.put<Webhook>(
      `/workspaces/${this.workspaceId}/webhooks/${webhookId}`,
      { body }
    );
  }

  /** Delete a webhook. */
  async delete(webhookId: string): Promise<void> {
    return this.http.delete<void>(
      `/workspaces/${this.workspaceId}/webhooks/${webhookId}`
    );
  }

  /** Get logs for a webhook. */
  async getLogs(webhookId: string, body: WebhookLogSearchRequest): Promise<WebhookLog[]> {
    return this.http.post<WebhookLog[]>(
      `/workspaces/${this.workspaceId}/webhooks/${webhookId}/logs`,
      { body }
    );
  }

  /** Regenerate the auth token for a webhook. */
  async regenerateToken(webhookId: string): Promise<Webhook> {
    return this.http.patch<Webhook>(
      `/workspaces/${this.workspaceId}/webhooks/${webhookId}/token`
    );
  }
}
