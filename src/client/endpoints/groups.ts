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

  /**
   * Get all user groups in the workspace.
   *
   * @returns Array of user groups
   */
  async getAll(): Promise<UserGroup[]> {
    return this.http.get<UserGroup[]>(
      `/workspaces/${this.workspaceId}/user-groups`
    );
  }

  /**
   * Create a new user group.
   *
   * @param body - The group name
   * @returns The created group
   */
  async create(body: UserGroupRequest): Promise<UserGroup> {
    return this.http.post<UserGroup>(
      `/workspaces/${this.workspaceId}/user-groups`,
      { body }
    );
  }

  /**
   * Update an existing user group.
   *
   * @param id - The group ID
   * @param body - The fields to update
   * @returns The updated group
   */
  async update(id: string, body: UpdateUserGroupRequest): Promise<UserGroup> {
    return this.http.put<UserGroup>(
      `/workspaces/${this.workspaceId}/user-groups/${id}`,
      { body }
    );
  }

  /**
   * Delete a user group.
   *
   * @param id - The group ID
   * @returns The deleted group
   */
  async delete(id: string): Promise<UserGroup> {
    return this.http.delete<UserGroup>(
      `/workspaces/${this.workspaceId}/user-groups/${id}`
    );
  }

  /**
   * Add a user to a group.
   *
   * @param groupId - The group ID
   * @param body - The user ID to add
   * @returns The updated group
   */
  async addUsers(
    groupId: string,
    body: UserGroupUserRequest
  ): Promise<UserGroup> {
    return this.http.post<UserGroup>(
      `/workspaces/${this.workspaceId}/user-groups/${groupId}/users`,
      { body }
    );
  }

  /**
   * Remove a user from a group.
   *
   * @param groupId - The group ID
   * @param userId - The user ID to remove
   * @returns The updated group
   */
  async removeUser(groupId: string, userId: string): Promise<UserGroup> {
    return this.http.delete<UserGroup>(
      `/workspaces/${this.workspaceId}/user-groups/${groupId}/users/${userId}`
    );
  }
}
