import { HttpClient } from "../http.js";
import type {
  PageableCollectionLogBinDocument,
} from "../../types/index.js";

export interface EntityChangesParams {
  type: string;
  start: string;
  end: string;
  limit?: number;
  page?: number;
}

export class EntityChangeEndpoints {
  constructor(
    private http: HttpClient,
    private workspaceId: string
  ) {}

  private buildParams(params: EntityChangesParams): Record<string, string | number | boolean | undefined> {
    return {
      type: params.type,
      start: params.start,
      end: params.end,
      limit: params.limit,
      page: params.page,
    };
  }

  /**
   * Get entities created within a time range. This is an experimental API.
   *
   * @param params - The entity type, date range, and optional pagination
   * @returns Created entities matching the criteria
   */
  async getCreated(params: EntityChangesParams): Promise<unknown> {
    return this.http.get(
      `/workspaces/${this.workspaceId}/entities/created`,
      { params: this.buildParams(params) }
    );
  }

  /**
   * Get entities updated within a time range. This is an experimental API.
   *
   * @param params - The entity type, date range, and optional pagination
   * @returns Updated entities matching the criteria
   */
  async getUpdated(params: EntityChangesParams): Promise<unknown> {
    return this.http.get(
      `/workspaces/${this.workspaceId}/entities/updated`,
      { params: this.buildParams(params) }
    );
  }

  /**
   * Get entities deleted within a time range. This is an experimental API.
   *
   * @param params - The entity type, date range, and optional pagination
   * @returns Paginated collection of deleted entity records
   */
  async getDeleted(params: EntityChangesParams): Promise<PageableCollectionLogBinDocument> {
    return this.http.get<PageableCollectionLogBinDocument>(
      `/workspaces/${this.workspaceId}/entities/deleted`,
      { params: this.buildParams(params) }
    );
  }
}
