import { HttpClient } from "../http.js";
import type {
  UserGroup,
  UserGroupRequest,
  UpdateUserGroupRequest,
  UserGroupUserRequest,
} from "../../types/index.js";

export class GroupEndpoints {
  constructor(
    private http: HttpClient,
    private workspaceId: string
  ) {}

  /** Get all user groups in the workspace. */
  async getAll(): Promise<UserGroup[]> {
    return this.http.get<UserGroup[]>(
      `/workspaces/${this.workspaceId}/user-groups`
    );
  }

  /** Create a new user group. */
  async create(body: UserGroupRequest): Promise<UserGroup> {
    return this.http.post<UserGroup>(
      `/workspaces/${this.workspaceId}/user-groups`,
      { body }
    );
  }

  /** Update an existing user group. */
  async update(id: string, body: UpdateUserGroupRequest): Promise<UserGroup> {
    return this.http.put<UserGroup>(
      `/workspaces/${this.workspaceId}/user-groups/${id}`,
      { body }
    );
  }

  /** Delete a user group. */
  async delete(id: string): Promise<UserGroup> {
    return this.http.delete<UserGroup>(
      `/workspaces/${this.workspaceId}/user-groups/${id}`
    );
  }

  /** Add a user to a group. */
  async addUsers(
    groupId: string,
    body: UserGroupUserRequest
  ): Promise<UserGroup> {
    return this.http.post<UserGroup>(
      `/workspaces/${this.workspaceId}/user-groups/${groupId}/users`,
      { body }
    );
  }

  /** Remove a user from a group. */
  async removeUser(groupId: string, userId: string): Promise<UserGroup> {
    return this.http.delete<UserGroup>(
      `/workspaces/${this.workspaceId}/user-groups/${groupId}/users/${userId}`
    );
  }
}
