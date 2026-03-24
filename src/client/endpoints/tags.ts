import { HttpClient } from "../http.js";
import type {
  TagRequest,
  UpdateTagRequest,
  Tag,
} from "../../types/index.js";

export interface GetAllTagsParams {
  page?: number;
  pageSize?: number;
  name?: string;
  archived?: boolean;
}

export class TagEndpoints {
  constructor(
    private http: HttpClient,
    private workspaceId: string
  ) {}

  /**
   * Get all tags in the workspace. Supports pagination and filtering
   * by name and archived status.
   *
   * @param params - Optional pagination and filter parameters
   * @returns Array of tags
   */
  async getAll(params?: GetAllTagsParams): Promise<Tag[]> {
    return this.http.get<Tag[]>(
      `/workspaces/${this.workspaceId}/tags`,
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
   * Create a new tag.
   *
   * @param body - The tag name
   * @returns The created tag
   */
  async create(body: TagRequest): Promise<Tag> {
    return this.http.post<Tag>(
      `/workspaces/${this.workspaceId}/tags`,
      { body }
    );
  }

  /**
   * Get a tag by ID.
   *
   * @param id - The tag ID
   * @returns The tag
   */
  async get(id: string): Promise<Tag> {
    return this.http.get<Tag>(
      `/workspaces/${this.workspaceId}/tags/${id}`
    );
  }

  /**
   * Update an existing tag.
   *
   * @param id - The tag ID
   * @param body - The fields to update
   * @returns The updated tag
   */
  async update(id: string, body: UpdateTagRequest): Promise<Tag> {
    return this.http.put<Tag>(
      `/workspaces/${this.workspaceId}/tags/${id}`,
      { body }
    );
  }

  /**
   * Delete a tag.
   *
   * @param id - The tag ID
   * @returns The deleted tag
   */
  async delete(id: string): Promise<Tag> {
    return this.http.delete<Tag>(
      `/workspaces/${this.workspaceId}/tags/${id}`
    );
  }
}
