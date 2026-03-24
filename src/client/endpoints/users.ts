import { HttpClient } from "../http.js";
import type {
  UserDtoV1,
  MemberProfile,
  RoleDetails,
  UserCustomFieldValue,
  UploadFileResponse,
  GetUsersRequest,
  MemberProfileFullRequest,
  RoleRequest,
  UpsertUserCustomFieldRequestV1,
  User,
} from "../../types/index.js";

export interface GetAllUsersParams {
  page?: number;
  pageSize?: number;
  name?: string;
  email?: string;
  status?: "PENDING" | "ACTIVE" | "DECLINED" | "INACTIVE" | "ALL";
}

export class UserEndpoints {
  constructor(
    private http: HttpClient,
    private workspaceId: string
  ) {}

  /**
   * Get the currently authenticated user. Does not require a workspace ID.
   *
   * @returns The authenticated user
   *
   * @example
   * ```ts
   * const me = await clockify.users.getLoggedUser();
   * console.log(me.name, me.email, me.activeWorkspace);
   * ```
   */
  async getLoggedUser(): Promise<User> {
    return this.http.get<UserDtoV1>("/user");
  }

  /**
   * Upload a profile image for the authenticated user.
   *
   * @param body - The image data to upload
   * @returns The upload result with the file URL
   */
  async uploadImage(body: unknown): Promise<UploadFileResponse> {
    return this.http.post<UploadFileResponse>("/file/image", { body });
  }

  /**
   * Get all users in the workspace. Supports pagination and filtering
   * by name, email, and status.
   *
   * @param params - Optional pagination and filter parameters
   * @returns Array of users
   *
   * @example
   * ```ts
   * const active = await clockify.users.getAll({
   *   status: "ACTIVE",
   *   pageSize: 100,
   * });
   * ```
   */
  async getAll(params?: GetAllUsersParams): Promise<User[]> {
    return this.http.get<UserDtoV1[]>(
      `/workspaces/${this.workspaceId}/users`,
      {
        params: params
          ? {
              page: params.page,
              "page-size": params.pageSize,
              name: params.name,
              email: params.email,
              status: params.status,
            }
          : undefined,
      }
    );
  }

  /**
   * Filter users with advanced criteria via a POST body.
   *
   * @param body - The filter criteria
   * @returns Array of matching users
   */
  async filter(body: GetUsersRequest): Promise<User[]> {
    return this.http.post<UserDtoV1[]>(
      `/workspaces/${this.workspaceId}/users/info`,
      { body }
    );
  }

  /**
   * Get a member's profile in the workspace.
   *
   * @param userId - The user ID
   * @returns The member's workspace profile
   */
  async getMemberProfile(userId: string): Promise<MemberProfile> {
    return this.http.get<MemberProfile>(
      `/workspaces/${this.workspaceId}/member-profile/${userId}`
    );
  }

  /**
   * Update a member's profile in the workspace.
   *
   * @param userId - The user ID
   * @param body - The profile fields to update
   * @returns The updated member profile
   */
  async updateMemberProfile(
    userId: string,
    body: MemberProfileFullRequest
  ): Promise<MemberProfile> {
    return this.http.patch<MemberProfile>(
      `/workspaces/${this.workspaceId}/member-profile/${userId}`,
      { body }
    );
  }

  /**
   * Set or update a custom field value for a user. Creates the value
   * if it doesn't exist, or updates it if it does.
   *
   * @param userId - The user ID
   * @param customFieldId - The custom field ID
   * @param body - The value to set
   * @returns The upserted custom field value
   */
  async upsertCustomFieldValue(
    userId: string,
    customFieldId: string,
    body: UpsertUserCustomFieldRequestV1
  ): Promise<UserCustomFieldValue> {
    return this.http.put<UserCustomFieldValue>(
      `/workspaces/${this.workspaceId}/member-profile/${userId}/custom-field/${customFieldId}`,
      { body }
    );
  }

  /**
   * Get the managers assigned to a specific user.
   *
   * @param userId - The user ID
   * @returns Array of users who are managers of this user
   */
  async getManagers(userId: string): Promise<User[]> {
    return this.http.get<UserDtoV1[]>(
      `/workspaces/${this.workspaceId}/users/${userId}/managers`
    );
  }

  /**
   * Assign a role to a user (e.g. WORKSPACE_ADMIN, TEAM_MANAGER, PROJECT_MANAGER).
   *
   * @param userId - The user ID
   * @param body - The role assignment details
   * @returns The user's updated role assignments
   */
  async createRole(userId: string, body: RoleRequest): Promise<RoleDetails[]> {
    return this.http.post<RoleDetails[]>(
      `/workspaces/${this.workspaceId}/users/${userId}/roles`,
      { body }
    );
  }

  /**
   * Remove a role assignment from a user.
   *
   * @param userId - The user ID
   * @param body - The role to remove
   */
  async deleteRole(userId: string, body: RoleRequest): Promise<void> {
    return this.http.delete<void>(
      `/workspaces/${this.workspaceId}/users/${userId}/roles`,
      { body }
    );
  }
}
