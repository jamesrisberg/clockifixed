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

  /** Get created entities in a time range. */
  async getCreated(params: EntityChangesParams): Promise<unknown> {
    return this.http.get(
      `/workspaces/${this.workspaceId}/entities/created`,
      { params: this.buildParams(params) }
    );
  }

  /** Get updated entities in a time range. */
  async getUpdated(params: EntityChangesParams): Promise<unknown> {
    return this.http.get(
      `/workspaces/${this.workspaceId}/entities/updated`,
      { params: this.buildParams(params) }
    );
  }

  /** Get deleted entities in a time range. */
  async getDeleted(params: EntityChangesParams): Promise<PageableCollectionLogBinDocument> {
    return this.http.get<PageableCollectionLogBinDocument>(
      `/workspaces/${this.workspaceId}/entities/deleted`,
      { params: this.buildParams(params) }
    );
  }
}
