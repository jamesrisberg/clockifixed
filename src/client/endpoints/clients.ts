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

  /** Get all clients in the workspace. */
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

  /** Create a new client. */
  async create(body: CreateClientRequest): Promise<ClockifyClient> {
    return this.http.post<ClientWithCurrency>(
      `/workspaces/${this.workspaceId}/clients`,
      { body }
    );
  }

  /** Get a client by ID. */
  async get(id: string): Promise<ClockifyClient> {
    return this.http.get<ClientWithCurrency>(
      `/workspaces/${this.workspaceId}/clients/${id}`
    );
  }

  /** Update an existing client. */
  async update(id: string, body: UpdateClientRequest): Promise<ClockifyClient> {
    return this.http.put<Client>(
      `/workspaces/${this.workspaceId}/clients/${id}`,
      { body }
    );
  }

  /** Delete a client. */
  async delete(id: string): Promise<ClockifyClient> {
    return this.http.delete<Client>(
      `/workspaces/${this.workspaceId}/clients/${id}`
    );
  }
}
