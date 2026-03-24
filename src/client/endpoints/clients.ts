import { HttpClient } from "../http.js";
import type {
  Client,
  ClientWithCurrency,
  CreateClientRequest,
  UpdateClientRequest,
  ClockifyClient,
} from "../../types/index.js";

export interface GetAllClientsParams {
  page?: number;
  pageSize?: number;
  name?: string;
  archived?: boolean;
}

export class ClientEndpoints {
  constructor(
    private http: HttpClient,
    private workspaceId: string
  ) {}

  /**
   * Get all clients in the workspace. Supports pagination and filtering
   * by name and archived status.
   *
   * @param params - Optional pagination and filter parameters
   * @returns Array of clients
   *
   * @example
   * ```ts
   * const clients = await clockify.clients.getAll({ archived: false });
   * ```
   */
  async getAll(params?: GetAllClientsParams): Promise<ClockifyClient[]> {
    return this.http.get<ClientWithCurrency[]>(
      `/workspaces/${this.workspaceId}/clients`,
      {
        params: params
          ? {
              page: params.page,
              "page-size": params.pageSize,
              name: params.name,
              archived: params.archived,
            }
          : undefined,
      }
    );
  }

  /**
   * Create a new client.
   *
   * @param body - The client details
   * @returns The created client
   *
   * @example
   * ```ts
   * const client = await clockify.clients.create({
   *   name: "Acme Corp",
   *   email: "billing@acme.com",
   * });
   * ```
   */
  async create(body: CreateClientRequest): Promise<ClockifyClient> {
    return this.http.post<ClientWithCurrency>(
      `/workspaces/${this.workspaceId}/clients`,
      { body }
    );
  }

  /**
   * Get a client by ID.
   *
   * @param id - The client ID
   * @returns The client
   */
  async get(id: string): Promise<ClockifyClient> {
    return this.http.get<ClientWithCurrency>(
      `/workspaces/${this.workspaceId}/clients/${id}`
    );
  }

  /**
   * Update an existing client.
   *
   * @param id - The client ID
   * @param body - The fields to update
   * @returns The updated client
   */
  async update(id: string, body: UpdateClientRequest): Promise<ClockifyClient> {
    return this.http.put<Client>(
      `/workspaces/${this.workspaceId}/clients/${id}`,
      { body }
    );
  }

  /**
   * Delete a client. The client must be archived first.
   *
   * @param id - The client ID
   * @returns The deleted client
   */
  async delete(id: string): Promise<ClockifyClient> {
    return this.http.delete<Client>(
      `/workspaces/${this.workspaceId}/clients/${id}`
    );
  }
}
