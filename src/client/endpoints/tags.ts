import { HttpClient } from "../http.js";
import type {
  TagDtoV1,
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

  /** Get all tags in the workspace. */
  async getAll(params?: GetAllTagsParams): Promise<Tag[]> {
    return this.http.get<TagDtoV1[]>(
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

  /** Create a new tag. */
  async create(body: TagRequest): Promise<Tag> {
    return this.http.post<TagDtoV1>(
      `/workspaces/${this.workspaceId}/tags`,
      { body }
    );
  }

  /** Get a tag by ID. */
  async get(id: string): Promise<Tag> {
    return this.http.get<TagDtoV1>(
      `/workspaces/${this.workspaceId}/tags/${id}`
    );
  }

  /** Update an existing tag. */
  async update(id: string, body: UpdateTagRequest): Promise<Tag> {
    return this.http.put<TagDtoV1>(
      `/workspaces/${this.workspaceId}/tags/${id}`,
      { body }
    );
  }

  /** Delete a tag. */
  async delete(id: string): Promise<Tag> {
    return this.http.delete<TagDtoV1>(
      `/workspaces/${this.workspaceId}/tags/${id}`
    );
  }
}
