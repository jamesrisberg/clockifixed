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

  /**
   * Get all webhooks in the workspace. Returns webhooks with the
   * workspace webhook count.
   *
   * @returns Webhooks list with count
   */
  async getAll(): Promise<Webhooks> {
    return this.http.get<Webhooks>(
      `/workspaces/${this.workspaceId}/webhooks`
    );
  }

  /**
   * Get webhooks registered by a specific addon.
   *
   * @param addonId - The addon ID
   * @returns Webhooks list with count
   */
  async getForAddon(addonId: string): Promise<Webhooks> {
    return this.http.get<Webhooks>(
      `/workspaces/${this.workspaceId}/addons/${addonId}/webhooks`
    );
  }

  /**
   * Create a new webhook. Workspace admins can create up to 10 each,
   * with a total of 100 per workspace.
   *
   * @param body - The webhook configuration (URL, event type, trigger sources)
   * @returns The created webhook with its auth token
   *
   * @example
   * ```ts
   * const webhook = await clockify.webhooks.create({
   *   name: "Time entry tracker",
   *   url: "https://example.com/webhook",
   *   webhookEvent: "NEW_TIME_ENTRY",
   *   triggerSourceType: "PROJECT_ID",
   *   triggerSource: [projectId],
   * });
   * ```
   */
  async create(body: CreateWebhookRequest): Promise<Webhook> {
    return this.http.post<Webhook>(
      `/workspaces/${this.workspaceId}/webhooks`,
      { body }
    );
  }

  /**
   * Get a webhook by ID.
   *
   * @param webhookId - The webhook ID
   * @returns The webhook
   */
  async get(webhookId: string): Promise<Webhook> {
    return this.http.get<Webhook>(
      `/workspaces/${this.workspaceId}/webhooks/${webhookId}`
    );
  }

  /**
   * Update a webhook's configuration.
   *
   * @param webhookId - The webhook ID
   * @param body - The fields to update
   * @returns The updated webhook
   */
  async update(webhookId: string, body: UpdateWebhookRequest): Promise<Webhook> {
    return this.http.put<Webhook>(
      `/workspaces/${this.workspaceId}/webhooks/${webhookId}`,
      { body }
    );
  }

  /**
   * Delete a webhook.
   *
   * @param webhookId - The webhook ID
   */
  async delete(webhookId: string): Promise<void> {
    return this.http.delete<void>(
      `/workspaces/${this.workspaceId}/webhooks/${webhookId}`
    );
  }

  /**
   * Get delivery logs for a webhook. Useful for debugging failed deliveries.
   *
   * @param webhookId - The webhook ID
   * @param body - Search criteria for filtering logs
   * @returns Array of webhook delivery logs
   */
  async getLogs(webhookId: string, body: WebhookLogSearchRequest): Promise<WebhookLog[]> {
    return this.http.post<WebhookLog[]>(
      `/workspaces/${this.workspaceId}/webhooks/${webhookId}/logs`,
      { body }
    );
  }

  /**
   * Regenerate the auth token for a webhook. The old token is
   * immediately invalidated.
   *
   * @param webhookId - The webhook ID
   * @returns The webhook with its new auth token
   */
  async regenerateToken(webhookId: string): Promise<Webhook> {
    return this.http.patch<Webhook>(
      `/workspaces/${this.workspaceId}/webhooks/${webhookId}/token`
    );
  }
}
